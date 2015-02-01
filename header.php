<!DOCTYPE html>
<html <?php language_attributes(); ?> class="no-js">
<head>

    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title><?php ( is_front_page() ? wp_title() : wp_title( '|', true, 'right' ) ) ?></title>
    <?php if (is_front_page()): ?>
    	<script async type="text/javascript" src="<?php echo get_template_directory_uri()?>/scripts/libraries/picturefill.min.js?ver=2.1.0"></script>
    <?php endif;?>
    <?php wp_head(); ?>

</head>

<body <?php body_class(); ?>>
	<div id="root">
		<?php get_template_part('body-header'); ?>
		<?php get_template_part('nav'); ?>
		<div class="main" id="main">