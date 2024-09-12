<?php
/**
 * Plugin Name: My Social Feeds
 * Description: My Social Feeds short description of the plugin
 * Version: 1.0.0
 * Author: bPlugins
 * Author URI: https://bplugins.com
 * License: GPLv3
 * License URI: https://www.gnu.org/licenses/gpl-3.0.txt
 * Text Domain: my-social-feeds
 * @fs_premium_only /freemius, /inc/pro.php, /inc/AdminMenu.php, /dist/admin.css, /dist/admin.css.map, /dist/admin.js, /dist/admin.js.map
 * @fs_free_only, bsdk_config.json
 */

// ABS PATH
if ( !defined( 'ABSPATH' ) ) { exit; }

if ( function_exists('msfbp_fs') ) {
    register_activation_hook(__FILE__, function () {
        if (is_plugin_active('my-social-feeds/my-social-feeds.php')) {
            deactivate_plugins('my-social-feeds/my-social-feeds.php');
        }
        if (is_plugin_active('my-social-feeds-pro/my-social-feeds.php')) {
            deactivate_plugins('my-social-feeds-pro/my-social-feeds.php');
        }
    });
} else {
	// Constant
	define( 'MSFBP_VERSION', isset( $_SERVER['HTTP_HOST'] ) && 'localhost' === $_SERVER['HTTP_HOST'] ? time() : '1.0.0' );
	define( 'MSFBP_DIR_URL', plugin_dir_url( __FILE__ ) );
	define( 'MSFBP_DIR_PATH', plugin_dir_path( __FILE__ ) );
	define( 'MSFBP_PUBLIC_URL', MSFBP_DIR_URL . 'public/');
	define( 'MSFBP_ADMIN_URL', MSFBP_DIR_URL . 'admin/');

	if ( ! function_exists( 'msfbp_fs' ) ) {
		// Create a helper function for easy SDK access.
		function msfbp_fs() {
			global $msfbp_fs;
	
			if ( ! isset( $msfbp_fs ) ) {
				 // Include Freemius SDK.
				require_once dirname(__FILE__) . '/freemius/start.php';
	
				$msfbp_fs = fs_dynamic_init( array(
					'id'                  => '16150',
					'slug'                => 'my-social-feeds',
					'premium_slug' 		  => 'my-social-feeds-pro',
					'type'                => 'plugin',
					'public_key'          => 'pk_5a1e06dcd48a4bcb7184e0d809e08',
					'is_premium'          => true,
					'premium_suffix' 	  => 'Pro',
					// If your plugin is a serviceware, set this option to false.
					'has_premium_version' => true,
					'has_addons'          => false,
					'has_paid_plans'      => true,
					'trial' 			  => array(
                    		'days' => 7,
                    		'is_require_payment' => false,
                	),
					'menu' 				  => array(
                    	'slug' => 'my-social-feeds.php',
                    	'contact' => false,
                    	'support' => false,
                	),
				) );
			}
	
			return $msfbp_fs;
		}
	
		// Init Freemius.
		msfbp_fs();
		// Signal that SDK was initiated.
		do_action( 'msfbp_fs_loaded' );
	}

	if( function_exists( 'msfbp_fs' ) ){
		msfbp_fs()->add_filter( 'freemius_pricing_js_path', function() {
			return MSFBP_DIR_PATH . '/includes/freemius-pricing/freemius-pricing.js';
		} );
	}

    require_once MSFBP_DIR_PATH . 'includes/AdminMenu.php';
	require_once MSFBP_DIR_PATH . 'includes/TiktokAPI.php';
	require_once MSFBP_DIR_PATH . 'includes/Instagram.php';
	require_once MSFBP_DIR_PATH . 'includes/Pinterest.php';

	if( !class_exists( 'MSFBPPlugin' ) ){
		class MSFBPPlugin{
			function __construct(){
				add_action( 'init', [ $this, 'onInit' ] );
				add_action('enqueue_block_assets', [$this, 'enqueueTiktokAssets']);
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

				wp_localize_script('ttp-script', 'ttpData', [
					'ajaxUrl' => admin_url('admin-ajax.php'),
					'tiktokAuthorized' => false !== get_transient('ttp_tiktok_authorized_data'),
					'nonce' => wp_create_nonce('wp_rest'),
				]);

				wp_localize_script('ttp-tiktok-player-editor-script', 'ttpPatters', [
					'patternsImagePath' => MSFBP_PUBLIC_URL . 'images/patterns/',
				]);

			}

			function onInit(){
				register_block_type( __DIR__ . '/build/instagram' );
				register_block_type( __DIR__ . '/build/tiktok-player' );
				register_block_type( __DIR__ . '/build/b-pinterest-feed' );
			}
		}
		new MSFBPPlugin();
	}
}