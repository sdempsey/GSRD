<section class="masthead">
	<div class="images" id="masthead-images">
		<?php if (have_rows('homepage_carousel')): ?>
			<?php while (have_rows('homepage_carousel')): the_row();
				//image variables
				$masthead = get_sub_field('image');
				$masthead_600 = $masthead['sizes']['masthead_600'];
				$masthead_1000 = $masthead['sizes']['masthead_1000'];
				$masthead_full = $masthead['url'];
				$alt = $masthead['alt']; ?>
					<div class="slide">
						<picture>
							<source srcset="<?php echo $masthead_full; ?>" media="(min-width: 1000px)">
							<source srcset="<?php echo $masthead_1000; ?>" media="(min-width: 600px)">
							<img srcset="<?php echo $masthead_600; ?>" alt="<?php echo $alt; ?>">
						</picture>
					</div>
			<?php endwhile; ?>

		<?php endif; ?>
	</div>
	<aside class="stats">
	<?php if (have_rows('stats')): ?>
		<?php while(have_rows('stats')): the_row();
			//stats variables
			$stat = get_sub_field('stat');
			$quantity = get_sub_field('quantity');
			$stat_id = $stat;
			$stat_id = strtolower($stat_id);
		?>
			<?php if ($stat): ?>
				<div id="<?php echo str_replace(" ", "-", $stat_id); ?>"><span class="quantity"><?php echo $quantity; ?></span> <span class="stat"><?php echo $stat; ?></span></div>
			<?php endif; ?>
		<?php endwhile;?>
	<?php endif; ?>
	</aside>
	<section class="toggle-feeds" id="toggle-feeds">
		<div class="our-next-bout" id="bout-tab">
			<div class="feed-tab bout">
				<h2>Our Next Bout!</h2>
				<div class="controls"><i class="icon icon-skate"></i><a href="#" class="toggle"><i class="icon icon-plus"></i></a></div>
			</div>
		</div>
		<div class="twitter" id="twitter-tab">
			<div class="feed-tab twitter">
				<h2>Twitter</h2>
				<div class="controls"><i class="icon icon-twitter"></i><a href="#" class="toggle"><i class="icon icon-plus"></i></a></div>
			</div>
		</div>
	</section>
</section>