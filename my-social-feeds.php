<?php
/**
 * Plugin Name: My Social Feeds
 * Description: Embed social feeds 
 * Version: 1.0.2
 * Author: bPlugins
 * Author URI: https://bplugins.com
 * License: GPLv3
 * License URI: https://www.gnu.org/licenses/gpl-3.0.txt
 * Text Domain: my-social-feeds
 * @fs_premium_only /freemius, /old-pinterest-feed, /includes/menu/admin-menu-pro.php, /includes/custom-post, /
 */

// ABS PATH
if ( !defined( 'ABSPATH' ) ) { exit; }

register_activation_hook(__FILE__, function () {
	if (function_exists('msfbp_fs') && is_plugin_active('my-social-feeds/my-social-feeds.php')) {
		deactivate_plugins('my-social-feeds/my-social-feeds.php');
	}

	if (is_plugin_active('b-tiktok-feed/index.php')) {
		deactivate_plugins('b-tiktok-feed/index.php');
	}

	if (is_plugin_active('b-pinterest-feed/b-pinterest-feed.php')) {
		deactivate_plugins('b-pinterest-feed/b-pinterest-feed.php');
	}
	 
});

if ( function_exists( 'msfbp_fs' ) ) {
    msfbp_fs()->set_basename( false, __FILE__ );
} else {

	define( 'MSFBP_VERSION', isset( $_SERVER['HTTP_HOST'] ) && 'localhost' === $_SERVER['HTTP_HOST'] ? time() : '1.0.2' );
	define( 'MSFBP_DIR_URL', plugin_dir_url( __FILE__ ) );
	define( 'MSFBP_DIR_PATH', plugin_dir_path( __FILE__ ) );
	define( 'MSFBP_PUBLIC_URL', MSFBP_DIR_URL . 'public/');
	define( 'MSFBP_ADMIN_URL', MSFBP_DIR_URL . 'admin/');
	define( 'MSFBP_IS_PRO', file_exists( dirname( __FILE__ ) . '/freemius/start.php' ) );

	if ( !function_exists( 'msfbp_fs' ) ) {
        // Create a helper function for easy SDK access.
        function msfbp_fs() {
            global $msfbp_fs;
            if ( !isset( $msfbp_fs ) ) {
                // Include Freemius SDK.
                if ( MSFBP_IS_PRO ) {
                    require_once dirname( __FILE__ ) . '/freemius/start.php';
                } else {
                    require_once dirname( __FILE__ ) . '/freemius-lite/start.php';
                }

                $msfbpConfig = array(
                    'id'                  => '16150',
					'slug'                => 'my-social-feeds',
					'premium_slug'        => 'my-social-feeds-pro',
					'type'                => 'plugin',
					'public_key'          => 'pk_5a1e06dcd48a4bcb7184e0d809e08',
					'is_premium'          => true,
					'premium_suffix'      => 'Pro',
					// If your plugin is a serviceware, set this option to false.
					'has_premium_version' => true,
					'has_addons'          => false,
					'has_paid_plans'      => true,
					'trial'               => array(
						'days'               => 7,
						'is_require_payment' => true,
					),
					'menu' => MSFBP_IS_PRO ?
						array(
							'slug'        => 'my-social-feeds',
							// 'first-path'  =>  'admin.php?page=my-social-feeds#/pricing',
							'support'     => false,
						)
						: array(
							'slug'           => 'my-social-feeds',
							'first-path'     => 'tools.php?page=my-social-feeds#/pricing',
							'support'        => false,
							'parent'         => array(
								'slug' => 'tools.php',
							),
						),
                );
                $msfbp_fs = ( MSFBP_IS_PRO ? fs_dynamic_init( $msfbpConfig ) : fs_lite_dynamic_init( $msfbpConfig ) );
            }
            return $msfbp_fs;
        }

        // // Init Freemius.
        msfbp_fs();
        // Signal that SDK was initiated.
        do_action( 'msfbp_fs_loaded' );
    }

    function msfbpIsPremium() {
        return ( MSFBP_IS_PRO ? msfbp_fs()->can_use_premium_code() : false );
    }
	
	require_once MSFBP_DIR_PATH . 'includes/TiktokAPI.php';
	require_once MSFBP_DIR_PATH . 'includes/Instagram.php';
	require_once MSFBP_DIR_PATH . 'includes/Pinterest.php';

	if( !class_exists( 'MSFBPPlugin' ) ){
		class MSFBPPlugin{
			function __construct(){
				$this->load_classes();
				add_action( 'init', [ $this, 'onInit' ] );
				add_action('enqueue_block_assets', [$this, 'enqueueTiktokAssets']);
				add_action('admin_enqueue_scripts', [$this, 'wp_admin_scripts']);
				add_action('admin_footer', [$this, 'load_tiktok_script'], 10);
				add_action('wp_footer', [$this, 'load_tiktok_script'], 10);
				add_action('wp_ajax_msfbPipeChecker', [$this, 'msfbPipeChecker']);
                add_action('wp_ajax_nopriv_msfbPipeChecker', [$this, 'msfbPipeChecker']);
                add_action('admin_init', [$this, 'registerSettings']);
                add_action('rest_api_init', [$this, 'registerSettings']);
			}

			public function msfbPipeChecker()
            {
                $nonce = $_POST['_wpnonce'];

                if (!wp_verify_nonce($nonce, 'wp_ajax')) {
                    wp_send_json_error('Invalid Request');
                }

                wp_send_json_success([
                    'isPipe' => msfbp_fs()->can_use_premium_code() ?? false,
                ]);
            }

            public function registerSettings()
            {
                register_setting('msfbpUtils', 'msfbpUtils', [
                    'show_in_rest' => [
                        'name' => 'msfbpUtils',
                        'schema' => ['type' => 'string'],
                    ],
                    'type' => 'string',
                    'default' => wp_json_encode(['nonce' => wp_create_nonce('wp_ajax')]),
                    'sanitize_callback' => 'sanitize_text_field',
                ]);
            }

			//Class loaded
			public function load_classes () {
				
				require_once MSFBP_DIR_PATH . 'includes/InstagramAccessTokenSave.php';
				require_once MSFBP_DIR_PATH . 'includes/PinterestAccessTokenSave.php';
				require_once MSFBP_DIR_PATH . 'includes/TwitterUserNameIdSave.php';
				new AccessToken\MSFBP_INSTAGRAM_ACCESS_TOKEN_SAVE();
				new NameCredentials\MSFBP_PINTEREST_FEED_CREDENTIAL();
				new NameCredentials\MSFBP_TWITTER_CREDENTIAL();

				// check premium 
				if( MSFBP_IS_PRO ) {
					require_once MSFBP_DIR_PATH . 'includes/menu/admin-menu-pro.php'; 
				}else {
					require_once MSFBP_DIR_PATH . 'includes/menu/admin-menu-free.php'; 
				}

				if ( MSFBP_IS_PRO && msfbpIsPremium()) {
					require_once MSFBP_DIR_PATH . 'old-pinterest-feed/b-pinterest-feed.php';
				}
			}

			public function load_tiktok_script()
			{
			?>
				<script async src="https://www.tiktok.com/embed.js"></script>
			<?php
			}

			public function enqueueTiktokAssets()
			{
				wp_register_style('fancyapps', MSFBP_PUBLIC_URL . 'css/fancyapps.min.css');
				wp_register_style('justified', MSFBP_PUBLIC_URL . 'css/justifiedGallery.min.css');
				wp_register_script('fancyapps', MSFBP_PUBLIC_URL . 'js/fancyapps.min.js', [], MSFBP_VERSION);
				wp_register_script('justified', MSFBP_PUBLIC_URL . 'js/justifiedGallery.min.js', ['jquery'], MSFBP_VERSION);
				wp_register_script('ttp-script', MSFBP_PUBLIC_URL . 'js/ttp_script.js', [], MSFBP_VERSION);


				wp_localize_script('ttp-tiktok-player-editor-script', 'ttpPatters', [
					'patternsImagePath' => MSFBP_PUBLIC_URL . 'images/patterns/',
				]);
			}

			public function wp_admin_scripts() {

				wp_enqueue_script( 'ttp-script', MSFBP_PUBLIC_URL . 'js/ttp_script.js', [], MSFBP_VERSION );

				wp_localize_script('ttp-script', 'msfAuthorization', [
					'ajaxUrl' => admin_url('admin-ajax.php'),
					'nonce' => wp_create_nonce('msf_authorization_nonce')
				] );

				wp_localize_script('ttp-script', 'ttpData', [
					'ajaxUrl' => admin_url('admin-ajax.php'),
					'tiktokAuthorized' => false !== get_transient('ttp_tiktok_authorized_data'),
					'nonce' => wp_create_nonce('wp_rest'),
				]);
			}

			function onInit(){
				register_block_type( __DIR__ . '/build' );
				register_block_type( __DIR__ . '/build/instagram' );
				register_block_type( __DIR__ . '/build/tiktok-player' );
				register_block_type( __DIR__ . '/build/b-pinterest-feed' );
				register_block_type( __DIR__ . '/build/twitter' );
			}
		}
		new MSFBPPlugin();
	}
}