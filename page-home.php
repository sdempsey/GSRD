<?php
	/* Template Name: Homepage Template */

get_header(); ?>
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
						<img sizes="(min-width: 40em) 80vw, 100vw"
							 srcset="<?php echo $masthead_600; ?> 640w,  <?php echo $masthead_1000; ?> 1000w, <?php echo $masthead_full; ?> 1280w"
							 alt="<?php echo $alt; ?>">
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
				<div id="<?php echo str_replace(" ", "-", $stat_id) ?>"><span class="quantity"><?php echo $quantity; ?></span> <span class="stat"><?php echo $stat; ?></span></div>
			<?php endif; ?>
		<?php endwhile;?>
	<?php endif; ?>
	</aside>
</section>
<div class="tickets">
	<div class="accordion" id="tickets">
	    <div class="accordion-title">Get Tickets<i class="icon icon-accordion-toggle"></i></div>
	    <div class="accordion-content open-on-init">
			<div class="event-calendar" id="event-calendar">
				<div class="month-overlay" id="month-overlay">
					<a href="" role="month" data-month="0">Jan</a><a href="" role="month" data-month="1">Feb</a><a href="" role="month" data-month="2">Mar</a><a href="" role="month" data-month="3">Apr</a><a href="" role="month" data-month="4">May</a><a href="" role="month" data-month="5">Jun</a><a href="" role="month" data-month="6">Jul</a><a href="" role="month" data-month="7">Aug</a><a href="" role="month" data-month="8">Sep</a><a href="" role="month" data-month="9">Oct</a><a href="" role="month" data-month="10">Nov</a><a href="" class="active" role="month" data-month="11">Dec</a>
				</div>
				<div class="shadow"></div>
				<div class="event-tabs" id="event-tabs">
					<div class="tab">
						<div class="ribbon regulation">
							<div class="banner">
								<div class="text">Regulation</div>
							</div>
						</div> <!-- end ribbon -->
						<div class="content">
							<div class="visitor">Green Mountain Derby Dames Black Ice Brawlers</div>
							<div class="vs">VS</div>
							<div class="home-team">Granite State Roller Derby All-Stars</div>
						</div>
					</div>
					<div class="tab">
						<div class="ribbon sanctioned">
							<div class="banner">
								<div class="text">Sanctioned</div>
							</div>
						</div> <!-- end ribbon -->
						<div class="content">
							<div class="visitor">Green Mountain Derby Dames Grade A Fancy</div>
							<div class="vs">VS</div>
							<div class="home-team">Granite State Roller Derby All-Stars</div>
						</div>
					</div>
					<div class="tab">
						<div class="ribbon expo">
							<div class="banner">
								<div class="text">Home Teams</div>
							</div>
						</div> <!-- end ribbon -->
						<div class="content">
							<div class="visitor">Demolition Dames</div>
							<div class="vs">VS</div>
							<div class="home-team">Fighting Finches</div>
						</div>
					</div>
				</div>
			</div>
			<section class="event-details">
				<div class="location event-accordion">
					<div class="event-title">
						<span>Location</span>
						<i class="icon icon-accordion-toggle"></i>
					</div>
					<div class="event-content details">
						<section><span class="venue">Everett Arena</span><a href="#" class="map">Map</a><a href="#" class="call">Call</a></section>
						<section><span class="address">15 Loudon Road, Concord, NH 03301</span></section>
						<section><span class="date">September, 30, 5:00pm</span></section>
					</div>
				</div>
				<div class="share event-accordion">
					<div class="event-title">
						<span>Share</span>
						<i class="icon icon-accordion-toggle"></i>
					</div>
					<div class="event-content social">
						<div class="social-icons">
							<?php if (function_exists('share_buttons')) { share_buttons(); } ?>
						</div>
					</div>
				</div>
			</section>
			<section class="tickets-and-info">
				<header class="buy-tickets">
					<div class="left">
						<a href="#">Tickets &amp; Info</a>
					</div>
					<div class="right">
						<a href="#">More Info</a>
					</div>
				</header>
				<div class="image">
					<a href="http://www.brownpapertickets.com/producer/44889" target="_blank">
						<img src="<?php bloginfo('template_directory') ?>/images/svg/bpt.svg" alt="Brown Paper Tickets Logo">
						<span>Buy Tickets</span>
					</a>
				</div>
			</section>
	    </div>
	</div>
</div>
<div class="bruise-letter">
	<div class="accordion" id="bruise-letter">
	    <div class="accordion-title">Bruiseletter<i class="icon icon-accordion-toggle"></i></div>
	    <div class="accordion-content">
			<?php get_template_part('parts/checkbox'); ?>
			<input type="email" placeholder="Email Address">
			<a href="#" class="submit"><i class="icon icon-send"></i></a>
	    </div>
	</div>
</div>
<?php get_footer(); ?>