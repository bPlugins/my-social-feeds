<?php
if( !class_exists( 'bpinterest_CustomPostType' ) ){

    class bpinterest_CustomPostType {

        function __construct(){
            if(msfbp_fs()->can_use_premium_code()) {
                add_action( 'init', [$this, 'bpinterest_custom_post_type'] );
                add_shortcode( 'b-bpinterest-feed', [$this,'bpinterest_feed_shortcode'] );
                add_filter( 'manage_b_pinterest_feed_posts_columns', [$this, 'bpinterest_Manage_Columns'], 10 );
                add_action( 'manage_b_pinterest_feed_posts_custom_column', [$this, 'bpinterest_Manage_Custom_Columns'], 10, 2 );
                add_action('admin_enqueue_scripts', [$this, 'bpinterest_adminEnqueueScripts']);
            }
        }

        public function bpinterest_adminEnqueueScripts($hook)
        {
            global $post;
            $current_post_type = get_post_type( $post );

            // Load scripts only for the custom post type 'b_pinterest_feed'
            if ( 'b_pinterest_feed' === $current_post_type ) {
                wp_enqueue_style('bpinterestAdmin', MSFBP_ADMIN_URL . 'css/bpmsf-admin.css', [], MSFBP_VERSION);
                wp_enqueue_script('bpinterestAdmin', MSFBP_ADMIN_URL . 'js/bpmsf-admin.js', ['wp-i18n'], MSFBP_VERSION, true);
                
            }
                
        }
        
        function bpinterest_feed_shortcode( $attributes ){
            $postID = $attributes['id'];
            $post = get_post( $postID );
            $blocks = parse_blocks( $post->post_content );
        
            ob_start();
            echo render_block( $blocks[0] );
        
            return ob_get_clean();
        }
        
        function bpinterest_Manage_Columns( $defaults ) {
            unset( $defaults['date'] );
            $defaults['shortcode'] = 'ShortCode';
            $defaults['date'] = 'Date';
            return $defaults;
        }
        
        function bpinterest_Manage_Custom_Columns( $column_name, $post_ID ) {
            if ( $column_name == 'shortcode' ) {
                echo '<div class="bsbFrontShortcode" id="bsbFrontShortcode-' . esc_attr( $post_ID ) . '">
                    <input value="[b-bpinterest-feed id=' . esc_attr( $post_ID ) . ']" onclick="bsbHandleShortcode(\'' . esc_attr( $post_ID ) . '\')">
                    <span class="tooltip">' . esc_html__( 'Copy To Clipboard' ) . '</span>
                </div>';

                 
            }
        }

        public function bpinterest_custom_post_type(){

            $menuIcon = "<svg fill='#000000' width='20px' height='20px' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'><path id='primary' d='M7,22H6.85A1,1,0,0,1,6,20.85l2-13a1,1,0,1,1,2,.3l-.73,4.73a5.36,5.36,0,0,0,3,1.57c2.89.33,5.38-.92,6.06-3,.84-2.66-1.32-5.78-4.81-7a7.42,7.42,0,0,0-5.64.21A4.16,4.16,0,0,0,5.68,7.11a3.79,3.79,0,0,0-.17,1.47,1,1,0,1,1-2,.14A5.91,5.91,0,0,1,3.77,6.5,6.2,6.2,0,0,1,7,2.88a9.33,9.33,0,0,1,7.18-.32c4.52,1.52,7.24,5.76,6.08,9.45-1,3.05-4.34,4.88-8.18,4.43A6.89,6.89,0,0,1,8.9,15.19l-.91,6A1,1,0,0,1,7,22Z' style='fill: rgb(0, 0, 0);'></path></svg>";
            
            register_post_type( 'b_pinterest_feed', [
                'label' => 'Pinterest feed',
                'labels' => [
                    'add_new'       => 'Add New', // Global page
                    'add_new_item'  => 'Add New', // When click on new post
                    'edit_item'		=> __( 'Edit', 'b-pinterest-feed' ),
                    'new_item'		=> __( 'New', 'b-pinterest-feed' ),
                    'view_item'		=> __( 'View', 'b-pinterest-feed' ),
                    'search_items'	=> __( 'Search', 'b-pinterest-feed'),
                    'not_found'		=> __( 'Sorry, we couldn\'t find the that you are looking for.', 'b-pinterest-feed' )
                ],
                'template'		        => [ ['bpf/b-pinterest-feed']],
                'public'				=> true,
                'show_ui'				=> true, 		
                'show_in_rest'			=> true,							
                'publicly_queryable'	=> false,
                'exclude_from_search'	=> true,
                'menu_icon'				=> 'data:image/svg+xml;base64,' . base64_encode( $menuIcon ),		
                'has_archive'			=> false,
                'hierarchical'			=> false,
                'capability_type'		=> 'page',
                'rewrite'				=> [ 'slug' => 'msf' ],
                'supports'				=> [ 'title', 'editor' ],
                'template_lock'			=> 'all',
                'menu_position'			=> null,
                'show_in_menu'          => false // 'my-social-feeds.php'

            ] );
        }  
    }
    new bpinterest_CustomPostType();
}
