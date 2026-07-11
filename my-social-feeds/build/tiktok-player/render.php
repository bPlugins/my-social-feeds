<?php
// phpcs:disable WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedVariableFound -- Variables are local to the block render scope, not truly global.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
    $id = wp_unique_id( 'ttpTiktok-' );

    $className = $attributes['className'] ?? '';
    $align     = $attributes['align'] ?? '';
    $ttpBlockClassName = 'wp-block-ttp-tiktok-player ' . $className . ' align' . $align;

    $videos = get_transient('ttp_tiktok_videos');
    $user_info = get_transient('ttp_tiktok_user_info');

    wp_enqueue_style('ttp-style');
    wp_enqueue_script('ttp-script');
?>

<div class='<?php echo esc_attr($ttpBlockClassName); ?>' data-data="<?php echo esc_attr(wp_json_encode(compact('videos', 'user_info'))) ?>"  id='<?php echo esc_attr( $id ) ?>' data-attributes='<?php echo esc_attr(wp_json_encode($attributes)); ?>'></div>