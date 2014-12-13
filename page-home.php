<?php
	/* Template Name: Homepage Template */

get_header(); ?>
<section class="masthead">
	<div class="images">
		<?php if (have_rows('banner_images')): ?>
			<?php while (have_rows('banner_images')): the_row();
				//image variables
				$small = get_sub_field('slider_image_small');
				$medium = get_sub_field('slider_image_medium');
				$large = get_sub_field('slider_image_large');
			?>
				<div class="slide">
					<picture>
						<?php if($large):?>
							<source srcset="<?php echo $large['url']; ?>" media="(min-width: 1200px)">
						<?php endif; ?>

						<?php if($medium):?>
							<source srcset="<?php echo $medium['url']; ?>" media="(min-width: 600px)">
						<?php endif;?>

						<?php if($small /* small is required */ ):?>
							<img srcset="<?php echo $small['url']; ?>" alt="<?php echo $small['alt']; ?>">
						<?php endif;?>

					</picture>
				</div>
			<?php endwhile; ?>

		<?php endif; ?>
	</div>
	<aside class="stats">
	<?php if (have_rows('stats')): ?>
		<?php while(have_rows('stats')): the_row();
			//stats variables
			$noun = get_sub_field('noun');
			$quantity = get_sub_field('quantity');
			$noun_id = $noun;
			$noun_id = strtolower($noun_id);
		?>
			<?php if ($noun): ?>
				<div id="<?php echo str_replace(" ", "-", $noun_id) ?>"><span><?php echo $quantity; ?></span> <?php echo $noun; ?></div>
			<?php endif; ?>
		<?php endwhile;?>
	<?php endif; ?>
	</aside>
</section>
<div class="tickets">
	<div class="accordion">
	    <div class="accordion-title">Get Tickets<i class="icon icon-accordion-toggle"></i></div>
	    <div class="accordion-content open-on-init">
			<div class="event-calendar">
				<div class="month-overlay">
					<a href="" data-month="0">Jan</a><a href="" data-month="1">Feb</a><a href="" data-month="2">Mar</a><a href="" data-month="3">Apr</a><a href="" data-month="4">May</a><a href="" data-month="5">Jun</a><a href="" data-month="6">Jul</a><a href="" data-month="7">Aug</a><a href="" data-month="8">Sep</a><a href="" data-month="9">Oct</a><a href="" data-month="10">Nov</a><a href="" class="active" data-month="11">Dec</a>
				</div>
			</div>

	    </div>
	</div>
</div>
<div class="bruise-letter">
	<div class="accordion">
	    <div class="accordion-title">Bruiseletter<i class="icon icon-accordion-toggle"></i></div>
	    <div class="accordion-content">
			<?php get_template_part('parts/checkbox'); ?>
			<input type="email" placeholder="Email Address">
			<a href="#" class="submit"><i class="icon icon-send"></i></a>
	    </div>
	</div>
</div>
<?php get_footer(); ?>