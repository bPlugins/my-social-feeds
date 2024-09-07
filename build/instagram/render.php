<?php
extract( $attributes );

$className = $className ?? '';
$blockClassName = 'wp-block-ifb-instagram ' . $className . ' align' . $align;

$ifbData = json_decode( get_option( 'ifbData' ), true );
$accounts = $ifbData['iAccounts'] ?? [];

?>
<div class='<?php echo esc_attr( $blockClassName ); ?>' id='ifbInstagramFeed-<?php echo esc_attr( $cId ) ?>' data-attributes='<?php echo esc_attr( wp_json_encode( $attributes ) ); ?>' data-accounts='<?php echo esc_attr( wp_json_encode( $accounts ) ); ?>'></div>