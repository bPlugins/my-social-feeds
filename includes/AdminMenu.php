<?php
class AdminMenu
{
    public function __construct()
    {
        add_action('admin_enqueue_scripts', [$this, 'adminEnqueueScripts']);
        add_action('admin_menu', [$this, 'adminMenu']);
    }

    public function adminEnqueueScripts($hook)
    {
        if ('toplevel_page_my-social-feeds' === $hook) {
            wp_enqueue_style('msf-freemius-style', MSFBP_DIR_URL . 'build/admin-help.css', false, MSFBP_VERSION);
            wp_enqueue_script('msf-freemius-script', MSFBP_DIR_URL . 'build/admin-help.js', ['react', 'react-dom'], MSFBP_VERSION);
        }
    }

    public function adminMenu()
    {
        $menuIcon = "<svg xmlns='http://www.w3.org/2000/svg' width='20px' height='20px' viewBox='0 0 16 16'>
  <path fill='#fff' d='M13,1 C14.1046,1 15,1.89543 15,3 L15,13 C15,14.1046 14.1046,15 13,15 L3,15 C1.89543,15 1,14.1046 1,13 L1,3 C1,1.89543 1.89543,1 3,1 L13,1 Z M13,3 L3,3 L3,13 L13,13 L13,3 Z M9.5,8 L12,10.8571 L12,12 L4,12 L4,10.8 L5.5,9 L7.02439,10.8293 L9.5,8 Z M6.5,5 C7.32843,5 8,5.67157 8,6.5 C8,7.32843 7.32843,8 6.5,8 C5.67157,8 5,7.32843 5,6.5 C5,5.67157 5.67157,5 6.5,5 Z'/></svg>";

        add_menu_page(
            __('My social feeds', 'my-social-feeds'),
            __('My social feeds', 'my-social-feeds'),
            'manage_options',
            'my-social-feeds',
            [$this, 'helpPage'],
            'data:image/svg+xml;base64,' . base64_encode($menuIcon),
            6
        );

        if( msfbp_fs()->can_use_premium_code() ){
            add_submenu_page(
                'my-social-feeds',
                __('Tiktok Feed', 'tiktok'),
                __('Tiktok Feed', 'tiktok'),
                'manage_options',
                'edit.php?post_type=ttp-tiktok-feed'
            );
         
            add_submenu_page(
                'my-social-feeds',
                __('Pinterest Feed', 'b-pinterest-feed'),
                __('Pinterest Feed', 'b-pinterest-feed'),
                'manage_options',
                'edit.php?post_type=b_pinterest_feed'
            );
        
            add_submenu_page(
                'my-social-feeds',
                __('Instagram Feed', 'ifb-instagram-feed'),
                __('Instagram Feed', 'ifb-instagram-feed'),
                'manage_options',
                'edit.php?post_type=ifbinstagram_feed'
            );

            add_submenu_page(
                'my-social-feeds',
                __('Pinterest Feed (Old User)', 'b-pinterest-feed'),
                __('Pinterest Feed (Old User)', 'b-pinterest-feed'),
                'manage_options',
                'edit.php?post_type=kpp_pinterest'
            );
        }
    }

    public function helpPage()
    {?>
		<div class='msfAdminHelpPage'></div>
	<?php }
}
new AdminMenu();