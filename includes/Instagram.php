<?php
// ABS PATH
if ( !defined( 'ABSPATH' ) ) { exit; }

// define( 'MSFBP_DIR_URL', plugin_dir_url( __FILE__ ) );
// define( 'MSFBP_PUBLIC_URL', MSFBP_DIR_URL . 'public/');
// Instagram Feed
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
		add_action( 'wp_ajax_ifbDeleteTransient', [$this, 'deleteTransient'] );
		add_action( 'wp_ajax_nopriv_ifbDeleteTransient', [$this, 'deleteTransient'] );
	}

	function ajaxRequest() {
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
				extract( $account );
				
				// Retrieve user data
				$userURL = $this->getUserURL( $access_token, $user_id, $connectType );
				$userRes = wp_remote_get( $userURL );
				$user = json_decode( wp_remote_retrieve_body( $userRes ), true );
				$user['connectType'] = $connectType;
				
				// Retrieve media data
				$userDataURL = $this->getMediaURL( $access_token, $user_id, $connectType );
				$userDataRes = wp_remote_get( $userDataURL );
				$userData = json_decode( wp_remote_retrieve_body( $userDataRes ), true );

				// Fetch comment count and like count for each media item
				// foreach ($userData['data'] as $mediaItem) {
				// 	$mediaID = $mediaItem['id'];
				// 	$commentsURL = "https://graph.instagram.com/$mediaID/comments?summary=true&access_token=$access_token";
				// 	$commentsRes = wp_remote_get($commentsURL);
				// 	$commentsData = json_decode(wp_remote_retrieve_body($commentsRes), true);
				// 	$mediaItem['comment_count'] = $commentsData['summary']['total_count'];
	
				// 	$likesURL = "https://graph.instagram.com/$mediaID/likes?summary=true&access_token=$access_token";
				// 	$likesRes = wp_remote_get($likesURL);
				// 	$likesData = json_decode(wp_remote_retrieve_body($likesRes), true);
				// 	$mediaItem['like_count'] = $likesData['summary']['total_count'];
				// }

				// Set to array
				if( $user['username'] ){
					$users[] = $user;

					$username = $user['username'];
					$usersData[$username] = [
						'media' => $userData['data'],
						'page' => $userData['paging']['cursors']
					];
				}else if( $user['error'] ){
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
		delete_transient('ifbInstagramData');

		die();
	}

	function onInit() {
		wp_register_script( 'fancyapps', MSFBP_PUBLIC_URL . 'js/fancyapps.min.js', [], '3.5.7', true );
		wp_register_style( 'fancyapps', MSFBP_PUBLIC_URL . 'css/fancyapps.min.css', [], '3.5.7' );

		wp_register_script( 'swiper', MSFBP_PUBLIC_URL . 'js/swiper.min.js', [], '9.3.2', true );
		wp_register_style( 'swiper', MSFBP_PUBLIC_URL . 'css/swiper.min.css', [], '9.3.2' );

		wp_register_script('ttp-script', MSFBP_PUBLIC_URL . 'js/ttp_script.js', [], MSFBP_VERSION);
		wp_localize_script( 'ttp-script', 'ifbLocal', [ 'ajaxURL' => admin_url( 'admin-ajax.php' ) ] );

	}
}
new IFBInstagramFeed;