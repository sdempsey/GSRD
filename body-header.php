<header class="body-header">
	<div class="container">
		<a href="<?php echo site_url('/');?>" class="logo">
			<?php get_template_part('parts/svg/logo'); ?>
		</a>
		<div class="control-wrapper">
			<div class="social">
				<div class="flex-container" id="desktop-container"></div>
			</div>
			<div class="toggles">
				<a href="#toggle-links" class="links-toggle" id="links-toggle">
					<div class="content">
						<i id="links-icon" class="icon icon-star"></i>
					</div>								
				</a>
				<a href="#toggle-nav" class="nav-toggle" id="nav-toggle">
					<div class="content">
						<i id="nav-icon" class="icon icon-menu"></i>
					</div>	
				</a>
			</div>
		</div>	
	</div>
</header>
<div class="top-links" id="top-links">
	<div class="flex-container" id="mobile-container">
		<?php if (have_rows('top_links', 'option')): 
			while (have_rows('top_links', 'option')): the_row(); 
					$image = get_sub_field('image', 'options');
					$url = $image['url'];
					$title = $image['title'];
				while (have_rows('link_layout')): the_row();
					if (get_row_layout() == 'internal_link'): 
						$page_link = get_sub_field('page_link', 'option'); ?>
			
						<a class="top-link" href="<?php echo $page_link; ?>">
							<img src="<?php echo $url; ?>" alt="Top Link Icon" title="<?php echo $title; ?>">
						</a>
					<?php elseif (get_row_layout() == 'external_link'):
						$link = get_sub_field('link', 'option'); ?>

						<a class="top-link" href="<?php echo $link; ?>" target="_blank">
							<img src="<?php echo $url; ?>" alt="Top Link Icon" title="<?php echo $title; ?>">
						</a>
					<?php endif;?>
				<?php endwhile; ?>
			<?php endwhile; ?>
		<?php endif;?>
	</div>
</div>