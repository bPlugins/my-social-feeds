<?php
if (!defined('ABSPATH')) {exit;}

if(!class_exists('msfbp_AdminMenuFree')) {
    class msfbp_AdminMenuFree{

        public function __construct(){
            add_action( 'admin_enqueue_scripts', [$this, 'adminEnqueueScripts'] );
            add_action('admin_menu', [$this, 'adminMenu']);
        }

        public function adminMenu(){

            add_submenu_page(
                'tools.php',
                __('My Social Feeds', 'my-social-feeds'),
                __('My Social Feeds', 'my-social-feeds'),
                'manage_options',
                'my-social-feeds',
                [$this, 'helpPage'],
            );
        }

        function adminEnqueueScripts( $hook ) {
            if( strpos( $hook, 'my-social-feeds' ) ){
                wp_enqueue_style( 'msf-admin-dashboard', MSFBP_DIR_URL . 'build/admin-dashboard.css', [], MSFBP_VERSION );
                wp_enqueue_script( 'msf-admin-dashboard', MSFBP_DIR_URL . 'build/admin-dashboard.js', [ 'react', 'react-dom' ], MSFBP_VERSION, true );
                wp_set_script_translations( 'msf-admin-dashboard', 'tiktok', MSFBP_DIR_PATH . 'languages' );
            }
	    }

        public function helpPage()
        {?>
            <div
                id='msfbpDashboard'
                data-info='<?php echo esc_attr( wp_json_encode( [
                    'version' => MSFBP_VERSION,
                    'isPremium' => msfbpIsPremium(),
                    'hasPro' => MSFBP_IS_PRO
                ] ) ); ?>'
            >
            </div>
        <?php }  
    }
    new msfbp_AdminMenuFree();
}