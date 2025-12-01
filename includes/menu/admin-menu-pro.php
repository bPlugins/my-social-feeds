<?php
if (!defined('ABSPATH')) {exit;}

if(!class_exists('msfbp_AdminMenuPro')) {

    class msfbp_AdminMenuPro {

        public function __construct() {
            add_action( 'admin_enqueue_scripts', [$this, 'adminEnqueueScripts'] );
            add_action( 'admin_menu', [$this, 'adminMenu'] );
        }

        public function adminEnqueueScripts($hook) {
            if( strpos( $hook, 'my-social-feeds' ) ){
                wp_enqueue_style( 'msf-admin-dashboard', MSFBP_DIR_URL . 'build/admin-dashboard.css', [], MSFBP_VERSION );
                wp_enqueue_script( 'msf-admin-dashboard', MSFBP_DIR_URL . 'build/admin-dashboard.js', [ 'react', 'react-dom' ], MSFBP_VERSION, true );
                wp_set_script_translations( 'msf-admin-dashboard', 'tiktok', MSFBP_DIR_PATH . 'languages' );
            }
        }

        public function adminMenu(){
            $menuIcon = "<svg xmlns='http://www.w3.org/2000/svg' width='24px' height='24px' id='bsbSlider' viewBox='0 0 24 24' fill='none' ><path d='M8.5 9.5L6 12L8.5 14.5' stroke='#fff' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' /><path d='M15.5 9.5L18 12L15.5 14.5' stroke='#fff' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' /><path d='M2 15V9C2 6.79086 3.79086 5 6 5H18C20.2091 5 22 6.79086 22 9V15C22 17.2091 20.2091 19 18 19H6C3.79086 19 2 17.2091 2 15Z' stroke='#fff' strokeWidth='1.5' /></svg>";

            add_menu_page(
                __('My Social Feeds', 'my-social-feeds'),
                __('My Social Feeds', 'my-social-feeds'),
                'manage_options',
                'my-social-feeds',
                [$this, 'bsbHelpPage'],
                'data:image/svg+xml;base64,' . base64_encode($menuIcon),
                6
            );

            // if( BSB_IS_PRO && bsbIsPremium() ){
            //     add_submenu_page(
            //         'b-slider-dashboard',
            //         __('Demo and Help', 'slider'),
            //         __('Demo and Help', 'slider'),
            //         'manage_options',
            //         'b-slider-dashboard',
            //         [$this, 'bsbHelpPage'],
            //     );   
            // }
        }

        public function bsbHelpPage()
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
    new msfbp_AdminMenuPro();
}