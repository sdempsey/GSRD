<!DOCTYPE html>
<html <?php language_attributes(); ?> class="no-js" >

<head>

    <?php if (is_front_page()): ?>
    <script>document.createElement( "picture" );</script>
    <?php endif; wp_head();?>

</head>

<body <?php body_class(); ?>>
	<div id="root" class="root">
		<?php get_template_part('body-header'); ?>
		<?php get_template_part('nav'); ?>
		<div class="main" id="main">