<?php
// phpcs:disable WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedVariableFound -- Variables are local to the block render scope, not truly global.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$cId = $attributes['cId'] ?? '';
$ifbData = json_decode( get_option( 'ifbData' ), true );
$accounts = $ifbData['iAccounts'] ?? [];

?>
<div <?php echo wp_kses_post( get_block_wrapper_attributes() ); ?>
id='ifbInstagramFeed-<?php echo esc_attr( $cId ) ?>' data-attributes='<?php echo esc_attr( wp_json_encode( $attributes ) ); ?>' data-accounts='<?php echo esc_attr( wp_json_encode( $accounts ) ); ?>'></div>