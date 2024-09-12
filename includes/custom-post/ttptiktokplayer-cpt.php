<?php
if(!class_exists('TTPTikTokPlayerCustomPost')) {
    class TTPTikTokPlayerCustomPost{
        public $post_type = 'ttp-tiktok-feed';

        public function __construct(){
            if(msfbp_fs()->can_use_premium_code()) {
                add_action( 'init', [$this, 'onInit'], 20 );
                add_shortcode( 'ttp-tiktok-feed', [$this, 'onAddShortcode'], 20 );
                add_filter( 'manage_ttp-tiktok-feed_posts_columns', [$this, 'manageTTPPostsColumns'], 10 );
                add_action( 'manage_ttp-tiktok-feed_posts_custom_column', [$this, 'manageTTPPostsCustomColumns'], 10, 2 );
                add_action('admin_enqueue_scripts', [$this, 'ttp_adminEnqueueScripts']);
                add_action( 'use_block_editor_for_post', [$this, 'useBlockEditorForPost'], 999, 2 );
            }
            
        }

        public function ttp_adminEnqueueScripts($hook)
        {
            global $post;
            $current_post_type = get_post_type( $post );

            // Load scripts only for the custom post type 'b_pinterest_feed'
            if ( 'ttp-tiktok-feed' === $current_post_type ) {
                wp_enqueue_style('bpinterestAdmin', MSFBP_ADMIN_URL . 'css/bpmsf-admin.css', [], MSFBP_VERSION);
                wp_enqueue_script('bpinterestAdmin', MSFBP_ADMIN_URL . 'js/bpmsf-admin.js', ['wp-i18n'], MSFBP_VERSION, true);
            }
                
        }

        function onInit(){
            $menuIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="-32 0 512 512" fill="#fff"><path d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z" /></svg>';

            register_post_type( $this->post_type, [
                'labels'				=> [
                    'name'			=> __( 'Tiktok Feed', 'tiktok'),
                    'singular_name'	=> __( 'Tiktok Feed', 'tiktok' ),
                    'add_new'		=> __( 'Add New', 'tiktok' ),
                    'add_new_item'	=> __( 'Add New', 'tiktok' ),
                    'edit_item'		=> __( 'Edit', 'tiktok' ),
                    'new_item'		=> __( 'New', 'tiktok' ),
                    'view_item'		=> __( 'View', 'tiktok' ),
                    'search_items'	=> __( 'Search', 'tiktok'),
                    'not_found'		=> __( 'Sorry, we couldn\'t find the that you are looking for.', 'tiktok' )
                ],
                'public'				=> false,
                'show_ui'				=> true, 		
                'show_in_rest'			=> true,							
                'publicly_queryable'	=> false,
                'exclude_from_search'	=> true,
                'menu_icon'				=> 'data:image/svg+xml;base64,' . base64_encode( $menuIcon ),		
                'has_archive'			=> false,
                'hierarchical'			=> false,
                'capability_type'		=> 'page',
                'rewrite'				=> [ 'slug' => 'ttp-tiktok-feed' ],
                'supports'				=> [ 'title', 'editor' ],
                'template'				=> [ ['ttp/tiktok-player'] ],
                'template_lock'			=> 'all',
                'menu_position'			=> null,
                'show_in_menu'          => false
            ]); // Register Post Type
        }

        function onAddShortcode( $atts ) {
            $post_id = $atts['id'];
            $post = get_post( $post_id );

            $blocks = parse_blocks( $post->post_content );

            return render_block( $blocks[0] );
        }

        function manageTTPPostsColumns( $defaults ) {
            unset( $defaults['date'] );
            $defaults['shortcode'] = 'ShortCode';
            $defaults['date'] = 'Date';
            return $defaults;
        }

        function manageTTPPostsCustomColumns( $column_name, $post_ID ) {
            if ( $column_name == 'shortcode' ) {
                echo "<div class='bsbFrontShortcode' id='bsbFrontShortcode-$post_ID'>
                    <input value='[ttp-tiktok-feed id=$post_ID]' onclick='bsbHandleShortcode( $post_ID )'>
                    <span class='tooltip'>Copy To Clipboard</span>
                </div>";
            }
        }

        function useBlockEditorForPost($use, $post){
            if ($this->post_type === $post->post_type) {
                return true;
            }
            return $use;
        }
	}
    new TTPTikTokPlayerCustomPost();
}
