<?php
	/* Template Name: Homepage Template */

get_header(); ?>
<?php

 // So much going on here I broke out into smaller parts for easier management. 

 get_template_part('parts/homepage/masthead'); 

 get_template_part('parts/homepage/feeds');

 get_template_part('parts/homepage/tickets');

?>

<?php get_footer(); ?>
