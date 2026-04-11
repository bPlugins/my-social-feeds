<?php
if (!defined('ABSPATH')) {exit;}

class MSFBPCustomPost{
	public $post_type = 'msfbp';

	public function __construct(){
		add_action( 'init', [$this, 'onInit'], 20 );
		add_shortcode( 'msfbp-social-feeds', [$this, 'onAddShortcode'], 20 );
		add_filter( 'manage_msfbp_posts_columns', [$this, 'manageLPBPostsColumns'], 10 );
		add_action( 'manage_msfbp_posts_custom_column', [$this, 'manageBSBPostsCustomColumns'], 10, 2 );
		add_action( 'use_block_editor_for_post', [$this, 'useBlockEditorForPost'], 999, 2 );
		add_action('admin_enqueue_scripts', [$this, 'wp_admin_scripts']);
	}

	function onInit(){
		$menuIcon = "<svg xmlns='http://www.w3.org/2000/svg' fill='#fff' width='30px' height='30px' viewBox='0 0 24 24'><path d='M8.5,17H5.91406l.293-.293A.99989.99989,0,0,0,4.793,15.293l-1.9997,1.99969a1.00354,1.00354,0,0,0,0,1.41468L4.793,20.707A.99989.99989,0,0,0,6.207,19.293L5.91406,19H8.5a1,1,0,0,0,0-2Zm12.70673.29266L19.207,15.293A.99989.99989,0,0,0,17.793,16.707l.293.293H15.5a1,1,0,0,0,0,2h2.58594l-.293.293A.99989.99989,0,1,0,19.207,20.707l1.9997-1.99969a1.00354,1.00354,0,0,0,0-1.41468Zm-.56647-7.52087A3.46849,3.46849,0,0,0,21.5,7.5a3.5,3.5,0,0,0-7,0,3.46849,3.46849,0,0,0,.85974,2.27179A4.98821,4.98821,0,0,0,13,14a1,1,0,0,0,2,0,3,3,0,0,1,6,0,1,1,0,0,0,2,0A4.98821,4.98821,0,0,0,20.64026,9.77179ZM18,9a1.5,1.5,0,1,1,1.5-1.5A1.50164,1.50164,0,0,1,18,9Zm-9.35974.77179A3.46849,3.46849,0,0,0,9.5,7.5a3.5,3.5,0,0,0-7,0,3.46849,3.46849,0,0,0,.85974,2.27179A4.98821,4.98821,0,0,0,1,14a1,1,0,0,0,2,0,3,3,0,0,1,6,0,1,1,0,0,0,2,0A4.98821,4.98821,0,0,0,8.64026,9.77179ZM6,9A1.5,1.5,0,1,1,7.5,7.5,1.50164,1.50164,0,0,1,6,9Z' /></svg>";

		register_post_type( $this->post_type, [ 
			'labels'				=> [
				'name'			=> __( 'My Social Feeds', 'my-social-feeds' ),
				'singular_name'	=> __( 'My Social Feeds', 'my-social-feeds' ),
				'menu_name'     => __( 'My Social Feeds', 'my-social-feeds' ), // Main menu
    			'all_items'     => __( 'All Social Feeds', 'my-social-feeds' ), // Submenu: List all
				'add_new'		=> __( 'Add New', 'my-social-feeds' ),
				'add_new_item'	=> __( ' &#8627; Add New', 'my-social-feeds' ),
				'edit_item'		=> __( 'Edit', 'my-social-feeds' ), 
				'new_item'		=> __( 'New', 'my-social-feeds' ),
				'view_item'		=> __( 'View', 'my-social-feeds' ),
				'item_published' => __('Publish List Social Feeds', 'my-social-feeds'),
				'item_updated'	=> __('Update Social Feed', 'my-social-feeds'),
				'item_trashed'  => __('List Social Feeds trashed', 'my-social-feeds'),
				'search_items'	=> __( 'Search', 'my-social-feeds'),
				'not_found'		=> __( 'Sorry, we couldn\'t find the that you are looking for.', 'my-social-feeds' )
			],
			'public'				=> false,
			'show_ui'				=> true, 
			'show_in_menu'          => true,	
			'show_in_rest'			=> true,							
			'publicly_queryable'	=> false,
			'exclude_from_search'	=> true,
			'menu_position'			=> 14,
			'menu_icon'				=> 'data:image/svg+xml;base64,' . base64_encode( $menuIcon ),		
			'has_archive'			=> false,
			'hierarchical'			=> false,
			'capability_type'		=> 'page',
			'rewrite'				=> [ 'slug' => 'msfbp' ],
			'supports'				=> [ 'title', 'editor' ],
			'template'				=> [ ['msfbp/my-social-feeds'] ],
			'template_lock'			=> 'all',
		]); // Register Post Type
	}

	public function onAddShortcode( $atts ) {
        $post_id = $atts['id'];
        $post = get_post( $post_id );
        if ( !$post ) {
            return '';
        }
        if ( post_password_required( $post ) ) {
            return get_the_password_form( $post );
        }
        switch ( $post->post_status ) {
            case 'publish':
                return $this->displayContent( $post );
            case 'private':
                if (current_user_can('read_private_posts')) {
                    return $this->displayContent( $post );
                }
                return '';
            case 'draft':
            case 'pending':
            case 'future':
                if ( current_user_can( 'edit_post', $post_id ) ) {
                    return $this->displayContent( $post );
                }
                return '';
            default:
                return '';
        }
    }
	
    public function displayContent( $post ){
        $blocks = parse_blocks( $post->post_content );
        return render_block( $blocks[0] );
    }

	function manageLPBPostsColumns( $defaults ) {
		unset( $defaults['date'] );
		$defaults['shortcode'] = 'ShortCode';
		$defaults['date'] = 'Date';
		return $defaults;
	}

	function manageBSBPostsCustomColumns( $column_name, $post_ID ) {
		if ( $column_name == 'shortcode' ) {
			echo "<div class='bsbFrontShortcode' id='bsbFrontShortcode-$post_ID'>
				<input value='[msfbp-social-feeds id=$post_ID]' onclick='bsbHandleShortcode( $post_ID )'>
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

	public function wp_admin_scripts( $hook ) {
		$screen = get_current_screen();
		if ( $screen && $screen->post_type === 'msfbp' ) {
			wp_enqueue_style( 'msfbp-shortcode', MSFBP_DIR_URL . 'assets/css/shortcode.css', [], MSFBP_VERSION );
			wp_enqueue_script( 'msfbp-shortcode', MSFBP_DIR_URL . 'assets/js/shortcode.js', [], MSFBP_VERSION, true );
		} 
	}
}
new MSFBPCustomPost();