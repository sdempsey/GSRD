<header class="body-header">
	<div class="container">
		<a href="<?php echo site_url('/');?>" class="logo">
			<?php get_template_part('parts/svg/logo'); ?>
		</a>

		<div class="toggles">
			<a href="#toggle-links" class="links-toggle">
				<div class="content">
					<i class="icon icon-star"></i>
				</div>								
			</a>
			<a href="#toggle-nav" class="nav-toggle">
				<div class="content">
					<i class="icon icon-menu"></i>
				</div>	
			</a>
		</div>	
	</div>
</header>
<div class="top-links">
	<?php if ( is_active_sidebar( 'top-links' ) ) : ?>
		<?php dynamic_sidebar( 'top-links' ); ?>
	<?php endif; ?>
</div>