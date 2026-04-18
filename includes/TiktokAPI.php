<?php
if ( ! defined('ABSPATH') ) exit;

if ( ! class_exists('TTPTiktokAPI') ) {
    class TTPTiktokAPI {

    protected $user_info_endpoint  = 'https://open.tiktokapis.com/v2/user/info/';
    protected $video_list_endpoint = 'https://open.tiktokapis.com/v2/video/list/';

    protected $user_info_fields;
    protected $video_list_fields;

    public function __construct() {

        $this->migrate_old_single_account();

        $this->user_info_fields  = 'open_id,avatar_url,display_name,bio_description,profile_deep_link,is_verified,follower_count,following_count,likes_count,video_count';
        $this->video_list_fields = 'id,cover_image_url,create_time,share_url,video_description,like_count,comment_count,share_count,view_count';

        add_action('admin_init', [$this, 'handle_oauth_callback']);
        add_action('init', [$this, 'refresh_tokens']);

        // AJAX
        add_action('wp_ajax_ttp_get_accounts', [$this, 'get_accounts']);
        add_action('wp_ajax_ttp_tiktok_videos', [$this, 'get_videos']);
        add_action('wp_ajax_nopriv_ttp_tiktok_videos', [$this, 'get_videos']);

        add_action('wp_ajax_ttp_tiktok_clear', [$this, 'clear_cache']);
        add_action('wp_ajax_ttp_remove_account', [$this, 'remove_account']);
    }
    
    private function migrate_old_single_account() {

        // ✅ one-time
        if ( get_option('ttp_tiktok_accounts_migrated') ) {
            return;
        }

        // Old transients (single account system)
        $old_data  = get_transient('ttp_tiktok_authorized_data');
        $old_token = get_transient('ttp_tiktok_access_token');

        if ( ! $old_data || ! $old_token ) {
            update_option('ttp_tiktok_accounts_migrated', true);
            return;
        }

        // old_data structure maybe has data wrapper
        if ( isset($old_data['data']) ) {
            $old_data = $old_data['data'];
        }

        // open_id না থাকলে migrate না
        if ( empty($old_data['open_id']) ) {
            update_option('ttp_tiktok_accounts_migrated', true);
            return;
        }

        $accounts = get_option('ttp_tiktok_accounts', []);
        if ( ! is_array($accounts) ) $accounts = [];

        $open_id = sanitize_text_field($old_data['open_id']);

        $accounts[$open_id] = [
            'account_id'     => $open_id,
            'display_name'   => sanitize_text_field($old_data['display_name'] ?? ''),
            'avatar_url'     => esc_url_raw($old_data['avatar_url'] ?? ''),
            'follower_count' => intval($old_data['follower_count'] ?? 0),
            'access_token'   => sanitize_text_field($old_token),
            'refresh_token'  => sanitize_text_field($old_data['refresh_token'] ?? ''),
            'expires_at'     => time() + (60 * 60 * 20),
            'created_at'     => time(),
        ];

        update_option('ttp_tiktok_accounts', $accounts);

        // Clean old transients
        delete_transient('ttp_tiktok_authorized_data');
        delete_transient('ttp_tiktok_access_token');
        delete_transient('ttp_tiktok_user_info');
        delete_transient('ttp_tiktok_videos');

        update_option('ttp_tiktok_accounts_migrated', true);
    }

    /* =====================================================
     * OAUTH CALLBACK (SAVE ACCOUNT)
     * ===================================================== */
    public function handle_oauth_callback() {

        // ✅ Correct nonce check (missing OR invalid)
        $nonce = isset($_GET['nonce']) ? sanitize_text_field($_GET['nonce']) : '';
        if ( empty($nonce) || ! wp_verify_nonce($nonce, 'ttp_data_get_nonce') ) {
            return;
        }

        if ( ! isset($_GET['data']) ) return;

        // sanitize_text_field strips json chars; don't use it here
        $raw = wp_unslash($_GET['data']);
        $payload = json_decode($raw, true);
        $data = $payload['data'] ?? $payload;

        if ( empty($data['open_id']) || empty($data['access_token']) ) return;

        $open_id = sanitize_text_field($data['open_id']);
        $access  = sanitize_text_field($data['access_token']);
        $refresh = sanitize_text_field($data['refresh_token'] ?? '');

        $accounts = get_option('ttp_tiktok_accounts', []);
        if ( ! is_array($accounts) ) $accounts = [];

        // ✅ Fetch user info now (for table display_name/avatar)
        $user_response = wp_remote_get(
            add_query_arg(['fields' => $this->user_info_fields], $this->user_info_endpoint),
            [
                'timeout' => 45,
                'headers' => [
                    'Authorization' => 'Bearer ' . $access,
                    'Content-Type'  => 'application/json',
                ],
            ]
        );

        $user = [];
        if ( ! is_wp_error($user_response) ) {
            $user_body = json_decode(wp_remote_retrieve_body($user_response), true);
            // IMPORTANT: data.user
            $user = $user_body['data']['user'] ?? [];
        }

        $accounts[$open_id] = [
            'account_id'     => $open_id,
            'display_name'   => sanitize_text_field($user['display_name'] ?? ''),
            'avatar_url'     => esc_url_raw($user['avatar_url'] ?? ''),
            'follower_count' => intval($user['follower_count'] ?? 0),
            'access_token'   => $access,
            'refresh_token'  => $refresh,
            'expires_at'     => time() + (60 * 60 * 20),
            'created_at'     => time(),
        ];

        update_option('ttp_tiktok_accounts', $accounts);

        // ✅ also mark migrated (so old transient path doesn't rerun)
        update_option('ttp_tiktok_accounts_migrated', true);
    }

    /* =====================================================
     * REFRESH TOKENS (MULTI)
     * ===================================================== */
    public function refresh_tokens() {

        $accounts = get_option('ttp_tiktok_accounts', []);
        if ( ! is_array($accounts) ) return;

        foreach ( $accounts as $id => $acc ) {

            $expires = intval($acc['expires_at'] ?? 0);
            if ( time() < $expires ) continue;

            $refresh = $acc['refresh_token'] ?? '';
            if ( empty($refresh) ) continue;

            $response = wp_remote_post(
                'https://api.bplugins.com/wp-json/tiktok/v1/refresh-token',
                [
                    'timeout' => 45,
                    'body'    => ['refresh_token' => $refresh],
                ]
            );

            if ( is_wp_error($response) ) continue;

            $body = json_decode(wp_remote_retrieve_body($response), true);
            if ( empty($body['access_token']) ) continue;

            $accounts[$id]['access_token'] = sanitize_text_field($body['access_token']);
            $accounts[$id]['expires_at']   = time() + (60 * 60 * 20);
        }
        update_option('ttp_tiktok_accounts', $accounts);
    }

    public function get_accounts() {

        if ( ! current_user_can( 'manage_options' ) ) {
            wp_send_json_error( [ 'message' => 'Unauthorized' ], 403 ); 
        }

        check_ajax_referer( 'ttp_fetch_data_nonce', 'nonce' );

        $accounts = get_option('ttp_tiktok_accounts', []);
        if ( empty($accounts) ) {
            $this->migrate_old_single_account();
            $accounts = get_option('ttp_tiktok_accounts', []);
        }
        wp_send_json_success(array_values($accounts));
    }

    /* =====================================================
     * GET VIDEOS + USER INFO (ACCOUNT-WISE)
     * ===================================================== */
    public function get_videos() {

        // ✅ frontend/backend both must use same nonce key
        $nonce = sanitize_text_field($_GET['nonce'] ?? '');
        if ( ! wp_verify_nonce($nonce, 'ttp_fetch_data_nonce') ) {
            wp_send_json_error(['message' => 'Invalid nonce']);
        }

        $account_id = sanitize_text_field($_GET['account_id'] ?? '');
        $accounts   = get_option('ttp_tiktok_accounts', []);
        if ( ! is_array($accounts) ) $accounts = [];

        if ( empty($account_id) || ! isset($accounts[$account_id]) ) {
            wp_send_json_success(['videos' => [], 'user_info' => ['user' => []]]);
        }

        $token = $accounts[$account_id]['access_token'] ?? '';
        if ( empty($token) ) {
            wp_send_json_error(['message' => 'Missing access token']);
        }

        $profileCacheTime = intval($_GET['profileCacheTime'] ?? HOUR_IN_SECONDS);
        $videoCacheTime   = intval($_GET['videoCacheTime'] ?? HOUR_IN_SECONDS);

        /* ---------- USER INFO ---------- */
        $user_info = get_transient("ttp_tiktok_user_{$account_id}");
        if ( $user_info === false ) {

            $response = wp_remote_get(
                add_query_arg(['fields' => $this->user_info_fields], $this->user_info_endpoint),
                [
                    'timeout' => 45,
                    'headers' => [
                        'Authorization' => "Bearer {$token}",
                        'Content-Type'  => 'application/json',
                    ],
                ]
            );

            if ( is_wp_error($response) ) {
                wp_send_json_error(['message' => $response->get_error_message()]);
            }

            $body = json_decode(wp_remote_retrieve_body($response), true);

            // ✅ IMPORTANT: data.user (not data)
            $user_info = $body['data']['user'] ?? [];

            set_transient("ttp_tiktok_user_{$account_id}", $user_info, $profileCacheTime);
        }

        /* ---------- VIDEOS ---------- */
        $cursor = ! empty($_GET['cursor']) ? sanitize_text_field($_GET['cursor']) : '';
        $videos = get_transient("ttp_tiktok_videos_{$account_id}");

        // cursor থাকলে cache ব্যবহার না করে fresh আনবে
        if ( $videos === false || $cursor ) {

            $payload = [
                'max_count' => intval($_GET['max_count'] ?? 12),
            ];
            if ( $cursor ) $payload['cursor'] = $cursor;

            $response = wp_remote_post(
                add_query_arg(['fields' => $this->video_list_fields], $this->video_list_endpoint),
                [
                    'timeout' => 45,
                    'headers' => [
                        'Authorization' => "Bearer {$token}",
                        'Content-Type'  => 'application/json',
                    ],
                    'body' => wp_json_encode($payload),
                ]
            );

            if ( is_wp_error($response) ) {
                wp_send_json_error(['message' => $response->get_error_message()]);
            }

            $body   = json_decode(wp_remote_retrieve_body($response), true);
            $videos = $body['data'] ?? [];

            // ✅ only cache first page
            if ( ! $cursor ) {
                set_transient("ttp_tiktok_videos_{$account_id}", $videos, $videoCacheTime);
            }
        }

        wp_send_json_success([
            'videos' => $videos,
            'user_info' => [
                'user' => $user_info,
            ],
        ]);
    }

    public function clear_cache() {

        if ( ! current_user_can( 'manage_options' ) ) {
            wp_send_json_error( [ 'message' => 'Unauthorized' ], 403 );
        }

        $nonce = sanitize_text_field($_GET['nonce'] ?? '');
        if ( ! wp_verify_nonce($nonce, 'ttp_fetch_data_nonce') ) {
            wp_send_json_error(['message' => 'Invalid nonce']);
        }

        $action     = sanitize_text_field($_GET['action_type'] ?? 'clear_cache');
        $account_id = sanitize_text_field($_GET['account_id'] ?? '');

        if ( $action === 'clear_cache' ) {
            if ( empty($account_id) ) {
                wp_send_json_error(['message' => 'Missing account id']);
            }

            delete_transient("ttp_tiktok_user_{$account_id}");
            delete_transient("ttp_tiktok_videos_{$account_id}");

            wp_send_json_success(['cleared' => true, 'account_id' => $account_id]);
        }

        wp_send_json_success(['cleared' => false]);
    }

    public function remove_account() {

        $account_id = sanitize_text_field($_POST['account_id'] ?? '');
        $accounts   = get_option('ttp_tiktok_accounts', []);
        if ( ! is_array($accounts) ) $accounts = [];

        if ( $account_id && isset($accounts[$account_id]) ) {
            unset($accounts[$account_id]);
            update_option('ttp_tiktok_accounts', $accounts);

            delete_transient("ttp_tiktok_user_{$account_id}");
            delete_transient("ttp_tiktok_videos_{$account_id}");
        }
        wp_send_json_success();
    }
    }
new TTPTiktokAPI();
}
