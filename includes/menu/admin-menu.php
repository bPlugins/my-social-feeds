<?php
if (!defined('ABSPATH')) { exit; }

if (!class_exists('msfbp_AdminMenu')) {

	class msfbp_AdminMenu {

		private $parent_slug = 'edit.php?post_type=msfbp';

		public function __construct() {
			add_action('admin_menu', [$this, 'adminMenu']);
			add_action('admin_enqueue_scripts', [$this, 'adminEnqueueScripts']);

			// duplicate CPT "All items" hide (UI only)
			// add_action('admin_head', [$this, 'hideCPTListSubmenu']);

			// ✅ Active menu highlight fix
			add_filter('parent_file', [$this, 'fixActiveParentMenu']);
			add_filter('submenu_file', [$this, 'fixActiveSubmenuMenu']);
		}

		public function adminEnqueueScripts($hook) {
			if (empty($_GET['page'])) return;

			$page = sanitize_text_field(wp_unslash($_GET['page']));

			// ✅ React pages
			if (in_array($page, ['my-social-feeds', 'my-social-feeds-settings'], true)) {

				wp_enqueue_style('msf-admin-dashboard', MSFBP_DIR_URL . 'build/admin-dashboard.css', [], MSFBP_VERSION);

				wp_enqueue_script('msf-admin-dashboard', MSFBP_DIR_URL . 'build/admin-dashboard.js', ['react', 'react-dom', 'wp-data', "wp-api", "wp-util", "wp-i18n"], MSFBP_VERSION, true);

				wp_set_script_translations('msf-admin-dashboard', 'my-social-feeds', MSFBP_DIR_PATH . 'languages');

				// ✅ React কে জানান কোন menu থেকে এসেছে
				wp_localize_script('msf-admin-dashboard', 'msfbpAdmin', [
					'page'     => $page,
					'postType' => isset($_GET['post_type']) ? sanitize_text_field(wp_unslash($_GET['post_type'])) : '',
				]);
			}
		}

		public function adminMenu() {

			// Settings
			add_submenu_page(
				$this->parent_slug,
				__('Settings', 'my-social-feeds'),
				__('Settings', 'my-social-feeds'),
				'manage_options',
				'my-social-feeds-settings',
				[$this, 'renderReactRoot'],
				9999999
			);

			// Help & Demos
			add_submenu_page(
				$this->parent_slug,
				__('Help & Demos', 'my-social-feeds'),
				__('Help & Demos', 'my-social-feeds'),
				'manage_options',
				'my-social-feeds',
				[$this, 'renderReactRoot'],
				999
			);
		} 

		// public function hideCPTListSubmenu() {
		// 	echo '<style>
		// 		#menu-posts-msfbp .wp-submenu li.wp-first-item { display:none !important; }
		// 	</style>';
		// }

		public function fixActiveParentMenu($parent_file) {
			if (!empty($_GET['post_type']) && $_GET['post_type'] === 'msfbp' && !empty($_GET['page'])) {
				return $this->parent_slug; // edit.php?post_type=msfbp
			}
			return $parent_file;
		}

		public function fixActiveSubmenuMenu($submenu_file) {
			if (!empty($_GET['post_type']) && $_GET['post_type'] === 'msfbp' && !empty($_GET['page'])) {
				$page = sanitize_text_field(wp_unslash($_GET['page']));

				if ($page === 'my-social-feeds-settings') return 'my-social-feeds-settings';
				if ($page === 'my-social-feeds')         return 'my-social-feeds';
			}
			return $submenu_file;
		}

		public function renderReactRoot() { ?>
			<div
				id="msfbpDashboard"
				data-info="<?php echo esc_attr(wp_json_encode([
					'version'   => MSFBP_VERSION,
					'isPremium' => msfbpIsPremium(),
					'hasPro'    => MSFBP_IS_PRO,
					'nonce' => wp_create_nonce( 'apbCreatePage' ),
		            'licenseActiveNonce' => wp_create_nonce( 'bPlLicenseActivation' )
				])); ?>"
			></div>
		<?php }
	}
	new msfbp_AdminMenu();
}


 