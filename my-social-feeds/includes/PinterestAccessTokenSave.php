<?php

namespace NameCredentials;
if(!defined('ABSPATH')){
    exit;
}

class MSFBP_PINTEREST_FEED_CREDENTIAL{

    
    function __construct()
    {
        add_action( 'wp_ajax_msfbp-get-pinterest-credentials', [$this, 'msfbp_get_pinterest_credentials'] );
        add_action( 'wp_ajax_msfbp-set-pinterest-credentials', [$this, 'msfbp_set_pinterest_credentials'] );
        add_action( 'wp_ajax_msfbp-delete-pinterest-credentials', [$this,'msfbp_delete_pinterest_credentials'] );
    }

    public function msfbp_delete_pinterest_credentials(){

        check_ajax_referer("msf_authorization_nonce", "nonce");

        if ( ! current_user_can( 'manage_options' ) ) {
            wp_send_json_error( 'Unauthorized', 403 );
        }

        $index = isset( $_GET['index'] ) ? absint( $_GET['index'] ) : -1;
        if ( $index < 0 ) {
            wp_send_json_error( 'Invalid index' );
        }

        $names = get_option('msfbp_pinterest_feeds_credentials', []);

        array_splice($names, $index, 1);
        update_option('msfbp_pinterest_feeds_credentials', $names);

        wp_send_json_success([
            'message' => 'Deleted successfully',
            'tokens' => $names,
            'success' => true
        ]);
    }


    public function msfbp_get_pinterest_credentials(){
        // check nonce
        check_ajax_referer("msf_authorization_nonce", "nonce");
        if ( ! current_user_can( 'manage_options' ) ) {
            wp_send_json_error( 'Unauthorized', 403 );
        }
        $tokens = get_option('msfbp_pinterest_feeds_credentials', []);
        wp_send_json_success($tokens);
    }

    public function msfbp_set_pinterest_credentials(){
        // check nonce
        check_ajax_referer("msf_authorization_nonce", "nonce");
        if ( ! current_user_can( 'manage_options' ) ) {
            wp_send_json_error( 'Unauthorized', 403 );
        }
        $label = isset( $_GET['label'] ) ? sanitize_text_field( wp_unslash( $_GET['label'] ) ) : '';
        $value = isset( $_GET['value'] ) ? sanitize_text_field( wp_unslash( $_GET['value'] ) ) : '';
        
        if(!$value){
            wp_send_json_error("Name missing");
        }
        
        // get existing options array
        $saved_credentials = get_option('msfbp_pinterest_feeds_credentials', []);
        
        //Ensure it's an array
        if( !is_array($saved_credentials) ){
            $saved_credentials = [];
        }
         

        $obj = [
            "label"=>$label,
            "value"=>$value
        ];
        
        // Add  new token if not already saved
        if(!in_array($value, $saved_credentials)){
            $saved_credentials[] = $obj;
        }

        // Save the updated array
        update_option('msfbp_pinterest_feeds_credentials', $saved_credentials);

        wp_send_json_success([
            "message" => "Credentials saved successfully",
            "names"  => $saved_credentials,
            "success" => true
        ]);
    } 
}