<!DOCTYPE html>
<html <?php language_attributes(); ?> class="no-js">
<head>

    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title><?php ( is_front_page() ? wp_title() : wp_title( '|', true, 'right' ) ) ?></title>
    <?php wp_head(); ?>

</head>

<body <?php body_class(); ?>>
	<div id="root">
		<?php get_template_part('body-header'); ?>
		<?php get_template_part('nav'); ?>
		<div class="main" id="main">