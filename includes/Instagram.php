<?php
// ABS PATH
if ( !defined( 'ABSPATH' ) ) { exit; }

// define( 'MSFBP_DIR_URL', plugin_dir_url( __FILE__ ) );
// define( 'MSFBP_PUBLIC_URL', MSFBP_DIR_URL . 'public/');
// Instagram Feed
if( !class_exists( 'IFBInstagramFeed' ) ){
	class IFBInstagramFeed{
		private $graphFBUrl = 'https://graph.facebook.com';
		private $graphIGUrl = 'https://graph.instagram.com';

		private $businessUserFields = 'biography,id,ig_id,followers_count,follows_count,name,profile_picture_url,username,website';
		private $personalUserFields = 'account_type,id,media_count,username';

		private $businessMediaFields = 'caption,comments_count,id,ig_id,is_comment_enabled,is_shared_to_feed,like_count,media_product_type,media_type,media_url,permalink,shortcode,thumbnail_url,timestamp,username,children{id,ig_id,media_type,media_url,permalink,shortcode,thumbnail_url,timestamp},comments{from,hidden,id,like_count,media,text,timestamp,replies{from,hidden,id,like_count,media,parent_id,text,timestamp}}';
		private $personalMediaFields = 'caption,id,is_shared_to_feed,media_type,media_url,permalink,thumbnail_url,timestamp,username,children{id,media_type,media_url,permalink,thumbnail_url,timestamp}';

		private function getUserURL( $accessToken, $user_id, $connectType ){
			return 'business' === $connectType ?
			"$this->graphFBUrl/$user_id?fields=$this->businessUserFields&access_token=$accessToken" :
			"$this->graphIGUrl/me?fields=$this->personalUserFields&access_token=$accessToken";
		}

		private function getMediaURL( $accessToken, $user_id, $connectType, $limit = 200 ){
			return 'business' === $connectType ?
			"$this->graphFBUrl/$user_id/media?fields=$this->businessMediaFields&limit=$limit&access_token=$accessToken" :
			"$this->graphIGUrl/me/media?fields=$this->personalMediaFields&limit=$limit&access_token=$accessToken";
		}

		function __construct(){
			add_action( 'init', [$this, 'onInit'] );
			add_action( 'wp_ajax_ifbAjaxRequest', [$this, 'ajaxRequest'] );
			add_action( 'wp_ajax_nopriv_ifbAjaxRequest', [$this, 'ajaxRequest'] );
			// Cache clearing is a privileged, state-changing action - no nopriv handler.
			add_action( 'wp_ajax_ifbDeleteTransient', [$this, 'deleteTransient'] );
		}

		function ajaxRequest() {
			// Public feed endpoint - verify the localized nonce (non-fatal for logged-out visitors on cached pages).
			check_ajax_referer( 'ifb_instagram_nonce', 'nonce' );

			$ifbData = json_decode( get_option( 'ifbData' ), true );
			$accounts = $ifbData['iAccounts'] ?? [];
			$cacheTime = $ifbData['iCacheTime'] ?? 1800;
		
			$key = 'ifbInstagramData';
		
			// Check if transient data exists
			$transientData = get_transient( $key );
		
			if ( !empty( $transientData ) && empty( $transientData['error'] ) ) {
				$response = [
					'success' => true,
					'data'    => $transientData,
				];
			} else {
				$users = [];
				$usersData = [];
				$error = '';

				foreach ( $accounts as $account ) {
					$access_token = $account['access_token'] ?? '';
					$user_id      = $account['user_id'] ?? '';
					$connectType  = $account['connectType'] ?? '';

					// Retrieve user data
					$userURL = $this->getUserURL( $access_token, $user_id, $connectType );
					$userRes = wp_remote_get( $userURL );
					$user = json_decode( wp_remote_retrieve_body( $userRes ), true );
					$user['connectType'] = $connectType;
					
					// Retrieve media data
					$userDataURL = $this->getMediaURL( $access_token, $user_id, $connectType );
					$userDataRes = wp_remote_get( $userDataURL );
					$userData = json_decode( wp_remote_retrieve_body( $userDataRes ), true );


					// Set to array
					if( ! empty( $user['username'] ) ){
						$users[] = $user;

						$username = $user['username'];
						$usersData[$username] = [
							'media' => $userData['data'] ?? [],
							'page' => $userData['paging']['cursors'] ?? []
						];
					}else if( ! empty( $user['error'] ) ){
						$error = $user['error']['message'];
					}
				}

				$instagramData = array_filter([ 'users' => $users, 'usersData' => $usersData, 'error' => $error ], function ( $value ) {
					return !empty($value);
				});
		
				// Store the Instagram Data in the transient
				set_transient( $key, $instagramData, $cacheTime );
		
				$response = [
					'success' => $error ? false : true,
					'data'    => $instagramData
				];
			}
		
			wp_send_json( $response );
		}

		function deleteTransient() {
			check_ajax_referer( 'ifb_instagram_nonce', 'nonce' );

			if ( ! current_user_can( 'manage_options' ) ) {
				wp_send_json_error( 'Unauthorized', 403 );
			}

			delete_transient('ifbInstagramData');

			wp_send_json_success();
		}

		function onInit() {
			wp_register_script( 'fancyapps', MSFBP_PUBLIC_URL . 'js/fancyapps.min.js', [], '3.5.7', true );
			wp_register_style( 'fancyapps', MSFBP_PUBLIC_URL . 'css/fancyapps.min.css', [], '3.5.7' );

			wp_register_script( 'swiper', MSFBP_PUBLIC_URL . 'js/swiper.min.js', [], '9.3.2', true );
			wp_register_style( 'swiper', MSFBP_PUBLIC_URL . 'css/swiper.min.css', [], '9.3.2' );

			wp_register_script('ttp-script', MSFBP_PUBLIC_URL . 'js/ttp_script.js', [], MSFBP_VERSION, true);
			wp_localize_script( 'ttp-script', 'ifbLocal', [
				'ajaxURL' => admin_url( 'admin-ajax.php' ),
				'nonce'   => wp_create_nonce( 'ifb_instagram_nonce' ),
			] );

		}
	}
	new IFBInstagramFeed;
}