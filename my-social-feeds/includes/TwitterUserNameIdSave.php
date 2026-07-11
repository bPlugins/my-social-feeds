<?php

namespace NameCredentials;
if(!defined('ABSPATH')){
    exit;
}

class MSFBP_TWITTER_CREDENTIAL{
    
    function __construct()
    {
        add_action( 'wp_ajax_msfbp-get-twitter-credentials', [$this, 'msfbp_get_twitter_credentials'] );
        add_action( 'wp_ajax_msfbp-set-twitter-credentials', [$this, 'msfbp_set_twitter_credentials'] );
        add_action( 'wp_ajax_msfbp-delete-twitter-credentials', [$this,'msfbp_delete_twitter_credentials'] );
    }

    public function msfbp_delete_twitter_credentials(){

        check_ajax_referer("msf_authorization_nonce", "nonce");

        if ( ! current_user_can( 'manage_options' ) ) {
            wp_send_json_error( 'Unauthorized', 403 );
        }

        $index = isset( $_GET['index'] ) ? absint( $_GET['index'] ) : -1;
        if ( $index < 0 ) {
            wp_send_json_error( 'Invalid index' );
        }

        $names = get_option('msfbp_twitter_credentials', []);

        array_splice($names, $index, 1);
        update_option('msfbp_twitter_credentials', $names);

        wp_send_json_success([
            'message' => 'Deleted successfully',
            'tokens' => $names,
            'success' => true
        ]);
    }


    public function msfbp_get_twitter_credentials(){
        // check nonce
        check_ajax_referer("msf_authorization_nonce", "nonce");
        if ( ! current_user_can( 'manage_options' ) ) {
            wp_send_json_error( 'Unauthorized', 403 );
        }

        $tokens = get_option('msfbp_twitter_credentials', []);

        wp_send_json_success($tokens);
    }

    public function msfbp_set_twitter_credentials(){

        // check nonce
        check_ajax_referer("msf_authorization_nonce", "nonce");
        if ( ! current_user_can( 'manage_options' ) ) {
            wp_send_json_error( 'Unauthorized', 403 );
        }
        $label = isset( $_GET['label'] ) ? sanitize_text_field( wp_unslash( $_GET['label'] ) ) : '';
        $value = isset( $_GET['value'] ) ? sanitize_text_field( wp_unslash( $_GET['value'] ) ) : '';
        $isPostId = isset($_GET['is_post_id']) ? rest_sanitize_boolean( wp_unslash( $_GET['is_post_id'] ) ) : false;
        
        if(!$value){
            wp_send_json_error("Input Field Required");
        }
        
        // get existing options array
        $saved_credentials = get_option('msfbp_twitter_credentials', []);
        
        //Ensure it's an array
        if( !is_array($saved_credentials) ){
            $saved_credentials = [];
        }

        $obj = [
            "label"=>$label,
            "value"=>$value,
            "isPostId" => $isPostId
        ];
        
        // Add  new token if not already saved
        if(!in_array($value, $saved_credentials)){
            $saved_credentials[] = $obj;
        }

        // Save the updated array
        update_option('msfbp_twitter_credentials', $saved_credentials);

        wp_send_json_success([
            "message" => "Credentials saved successfully",
            "names"  => $saved_credentials,
            "success" => true
        ]);
    } 
}