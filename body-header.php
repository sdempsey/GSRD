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
	<?php if (have_rows('top_links', 'option')): 
		while (have_rows('top_links', 'option')): the_row(); 
				$image = get_sub_field('image', 'options');
				$url = $image['url'];
				$title = $image['title'];
			while (have_rows('link_layout')): the_row();
				if (get_row_layout() == 'internal_link'): 
					$page_link = get_sub_field('page_link', 'option'); ?>
		
					<a href="<?php echo $page_link; ?>">
						<img src="<?php echo $url; ?>" alt="Top Link Icon" title="<?php echo $title; ?>">
					</a>
				<?php elseif (get_row_layout() == 'external_link'):
					$link = get_sub_field('link', 'option'); ?>

					<a href="<?php echo $link; ?>" target="_blank">
						<img src="<?php echo $url; ?>" alt="Top Link Icon" title="<?php echo $title; ?>">
					</a>
				<?php endif;?>
			<?php endwhile; ?>
		<?php endwhile; ?>
	<?php endif;?>
</div>