<?php
namespace AccessToken;

if(!defined('ABSPATH')){
    return;
}

class MSFBP_INSTAGRAM_ACCESS_TOKEN_SAVE{
     
    function __construct()
    {
        add_action( 'wp_ajax_msfbp-get-instagram-access-token', [$this, 'msfbp_get_instagram_access_token'] );
        add_action( 'wp_ajax_msfbp-set-instagram-access-token', [$this, 'msfbp_set_instagram_access_token_save'] );
        add_action( 'wp_ajax_msfbp-delete-instagram-access-token', [$this,'msfbp_delete_instagram_access_token'] );
    }

    public function msfbp_delete_instagram_access_token(){
        
        check_ajax_referer("msf_authorization_nonce", "nonce");

        $index = intval($_GET['index']);

        $tokens = get_option('msfbp_instagram_access_tokens', []);

        array_splice($tokens, $index, 1);
        update_option('msfbp_instagram_access_tokens', $tokens);

        wp_send_json_success([
            'message' => 'Deleted successfully',
            'tokens' => $tokens,
            'success' => true
        ]);
    }


    public function msfbp_get_instagram_access_token(){
        // check nonce 
        check_ajax_referer("msf_authorization_nonce", "nonce");
        $tokens = get_option('msfbp_instagram_access_tokens', []);  
        wp_send_json_success($tokens);
    }

    public function msfbp_set_instagram_access_token_save(){
        // check nonce
        check_ajax_referer("msf_authorization_nonce", "nonce");
        $label = isset( $_GET['label'] ) ? sanitize_text_field( $_GET['label'] ) : '';
        $value = isset( $_GET['value'] ) ? sanitize_text_field( $_GET['value'] ) : '';

        
        if(!$value){
            wp_send_json_error("Token missing");
        }
        
        // get existing options array
        $saved_tokens = get_option('msfbp_instagram_access_tokens', []);
        
        //Ensure it's an array
        if( !is_array($saved_tokens) ){
            $saved_tokens = [];
        }

        $obj = [
            "label"=>$label,
            "value"=>$value
        ];
        
        // Add  new token if not already saved
        if(!in_array($value, $saved_tokens)){
            $saved_tokens[] = $obj;
        }

        // Save the updated array
        update_option('msfbp_instagram_access_tokens', $saved_tokens);

        wp_send_json_success([
            "message" => "Token saved successfully",
            "tokens"  => $saved_tokens,
            "success" => true
        ]);
    }  
}