<?php
if( !class_exists( 'ifbinstagram_CustomPostType' ) ){

    class ifbinstagram_CustomPostType {

        function __construct(){
            if(msfbp_fs()->can_use_premium_code()) {
                add_action( 'init', [$this, 'ifbinstagram_custom_post_type'] );
                add_shortcode( 'instagram-feed', [$this,'ifbinstagram_feed_shortcode'] );
                add_filter( 'manage_ifbinstagram_feed_posts_columns', [$this, 'ifbinstagram_Manage_Columns'], 10 );
                add_action( 'manage_ifbinstagram_feed_posts_custom_column', [$this, 'ifbinstagram_Manage_Custom_Columns'], 10, 2 );
                add_action('admin_enqueue_scripts', [$this, 'ifbinstagram_adminEnqueueScripts']);
            }
        }

        public function ifbinstagram_adminEnqueueScripts($hook)
        {
            global $post;
            $current_post_type = get_post_type( $post );

            // Load scripts only for the custom post type 'b_pinterest_feed'
            if ( 'ifbinstagram_feed' === $current_post_type ) {
                wp_enqueue_style('bpinterestAdmin', MSFBP_ADMIN_URL . 'css/bpmsf-admin.css', [], MSFBP_VERSION);
                wp_enqueue_script('bpinterestAdmin', MSFBP_ADMIN_URL . 'js/bpmsf-admin.js', ['wp-i18n'], MSFBP_VERSION, true);
            }
                
        }
        
        function ifbinstagram_feed_shortcode( $attributes ){
            $postID = $attributes['id'];
            $post = get_post( $postID );
            $blocks = parse_blocks( $post->post_content );
        
            ob_start();
            echo render_block( $blocks[0] );
        
            return ob_get_clean();
        }
        
        function ifbinstagram_Manage_Columns( $defaults ) {
            unset( $defaults['date'] );
            $defaults['shortcode'] = 'ShortCode';
            $defaults['date'] = 'Date';
            return $defaults;
        }
        
        function ifbinstagram_Manage_Custom_Columns( $column_name, $post_ID ) {
            if ( $column_name == 'shortcode' ) {
                echo '<div class="bsbFrontShortcode" id="bsbFrontShortcode-' . esc_attr( $post_ID ) . '">
                    <input value="[instagram-feed id=' . esc_attr( $post_ID ) . ']" onclick="bsbHandleShortcode(\'' . esc_attr( $post_ID ) . '\')">
                    <span class="tooltip">' . esc_html__( 'Copy To Clipboard' ) . '</span>
                </div>';
            }
        }

        public function ifbinstagram_custom_post_type(){

            $menuIcon = "<svg fill='#fff' width='20px' height='20px' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg' data-name='Layer 1'><path d='M17.34,5.46h0a1.2,1.2,0,1,0,1.2,1.2A1.2,1.2,0,0,0,17.34,5.46Zm4.6,2.42a7.59,7.59,0,0,0-.46-2.43,4.94,4.94,0,0,0-1.16-1.77,4.7,4.7,0,0,0-1.77-1.15,7.3,7.3,0,0,0-2.43-.47C15.06,2,14.72,2,12,2s-3.06,0-4.12.06a7.3,7.3,0,0,0-2.43.47A4.78,4.78,0,0,0,3.68,3.68,4.7,4.7,0,0,0,2.53,5.45a7.3,7.3,0,0,0-.47,2.43C2,8.94,2,9.28,2,12s0,3.06.06,4.12a7.3,7.3,0,0,0,.47,2.43,4.7,4.7,0,0,0,1.15,1.77,4.78,4.78,0,0,0,1.77,1.15,7.3,7.3,0,0,0,2.43.47C8.94,22,9.28,22,12,22s3.06,0,4.12-.06a7.3,7.3,0,0,0,2.43-.47,4.7,4.7,0,0,0,1.77-1.15,4.85,4.85,0,0,0,1.16-1.77,7.59,7.59,0,0,0,.46-2.43c0-1.06.06-1.4.06-4.12S22,8.94,21.94,7.88ZM20.14,16a5.61,5.61,0,0,1-.34,1.86,3.06,3.06,0,0,1-.75,1.15,3.19,3.19,0,0,1-1.15.75,5.61,5.61,0,0,1-1.86.34c-1,.05-1.37.06-4,.06s-3,0-4-.06A5.73,5.73,0,0,1,6.1,19.8,3.27,3.27,0,0,1,5,19.05a3,3,0,0,1-.74-1.15A5.54,5.54,0,0,1,3.86,16c0-1-.06-1.37-.06-4s0-3,.06-4A5.54,5.54,0,0,1,4.21,6.1,3,3,0,0,1,5,5,3.14,3.14,0,0,1,6.1,4.2,5.73,5.73,0,0,1,8,3.86c1,0,1.37-.06,4-.06s3,0,4,.06a5.61,5.61,0,0,1,1.86.34A3.06,3.06,0,0,1,19.05,5,3.06,3.06,0,0,1,19.8,6.1,5.61,5.61,0,0,1,20.14,8c.05,1,.06,1.37.06,4S20.19,15,20.14,16ZM12,6.87A5.13,5.13,0,1,0,17.14,12,5.12,5.12,0,0,0,12,6.87Zm0,8.46A3.33,3.33,0,1,1,15.33,12,3.33,3.33,0,0,1,12,15.33Z'/></svg>";
            
            register_post_type( 'ifbinstagram_feed', [
                'label' => 'Instagram Feed',
                'labels' => [
                    'add_new'       => 'Add New Feed', // Global page
                    'add_new_item'  => 'Add New Feed', // When click on new post
                    'edit_item'		=> __( 'Edit', 'ifb-instagram-feed' ),
                    'new_item'		=> __( 'New', 'ifb-instagram-feed' ),
                    'view_item'		=> __( 'View', 'ifb-instagram-feed' ),
                    'search_items'	=> __( 'Search', 'ifb-instagram-feed'),
                    'not_found'		=> __( 'Sorry, we couldn\'t find the that you are looking for.', 'ifb-instagram-feed' )
                ],
                'template'		        => [ ['ifb/instagram']],
                'public'				=> true,
                'show_ui'				=> true, 		
                'show_in_rest'			=> true,							
                'publicly_queryable'	=> false,
                'exclude_from_search'	=> true,
                'menu_icon'				=> 'data:image/svg+xml;base64,' . base64_encode( $menuIcon ),		
                'has_archive'			=> false,
                'hierarchical'			=> false,
                'capability_type'		=> 'page',
                'rewrite'				=> [ 'slug' => 'ifb' ],
                'supports'				=> [ 'title', 'editor' ],
                'template_lock'			=> 'all',
                'menu_position'			=> null,
                'show_in_menu'          => false
            ] );
        }  
    }
    new ifbinstagram_CustomPostType();
}
