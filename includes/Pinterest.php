<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if( !class_exists( 'bPinterestFeed' ) ){

    class bPinterestFeed {

        function __construct(){
            add_action( 'init', [$this, 'onInit'] );
            add_action( 'wp_ajax_bPinterestAjaxRequest', [$this, 'bpinterest_ajaxRequest'] );
            add_action( 'wp_ajax_nopriv_bPinterestAjaxRequest', [$this, 'bpinterest_ajaxRequest'] );
        }         

        public function bpinterest_ajaxRequest() {
            $nonce = isset($_GET['nonce']) ? sanitize_text_field( wp_unslash( $_GET['nonce'] ) ) : '';
            if (!wp_verify_nonce($nonce, 'wp_rest')) {
                wp_send_json_error('Invalid request');
            }

            // Restrict to safe URL-path characters so the fixed Pinterest host/path cannot be manipulated.
            $userName  = isset($_GET['userName']) ? preg_replace( '/[^A-Za-z0-9_.\-]/', '', sanitize_text_field( wp_unslash( $_GET['userName'] ) ) ) : '';
            $boardName = isset($_GET['boardName']) ? preg_replace( '/[^A-Za-z0-9_.\-]/', '', sanitize_text_field( wp_unslash( $_GET['boardName'] ) ) ) : '';

            if ( empty( $userName ) || empty( $boardName ) ) {
                wp_send_json_error( 'Missing board information' );
            }

            $url = 'https://api.pinterest.com/v3/pidgets/boards/' . rawurlencode( $userName ) . '/' . rawurlencode( $boardName ) . '/pins';

            $response = $this->get_pinterest_data($url);

            if (is_wp_error($response)) {
                wp_send_json_error($response->get_error_message());
            } else {
                $response_code = wp_remote_retrieve_response_code($response);
                if ($response_code != 200) {
                    wp_send_json_error( $response_code);
                }

                $body = wp_remote_retrieve_body($response);
                $data = json_decode($body, true);
        
                if (json_last_error() === JSON_ERROR_NONE) {
                    wp_send_json_success($data);
                } else {
                    wp_send_json_error('Error decoding JSON response.');
                }
            }
        
            wp_die();
        }
        
        private function get_pinterest_data($url, $retries = 3) {
            $response = wp_remote_get($url, ['timeout' => 15]);
        
            if (is_wp_error($response)) {
                if ($retries > 0) {
                    sleep(2); // wait for 2 seconds before retrying
                    return $this->get_pinterest_data($url, $retries - 1);
                } else {
                    return $response;
                }
            }
        
            return $response;
        }        

        public function onInit()
        {
            wp_register_script('ttp-script', MSFBP_PUBLIC_URL . 'js/ttp_script.js', [], MSFBP_VERSION, true);

            wp_localize_script('ttp-script', 'bPinterestData', [
                'ajaxUrl' => admin_url('admin-ajax.php'),
                'nonce' => wp_create_nonce('wp_rest'),
            ]);
        }
    }
    new bPinterestFeed;

     
}