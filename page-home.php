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
						<picture>
							<source media="(min-width: 62.5em)" srcset="<?php echo $masthead_full; ?>">
							<source media="(min-width: 37.5em)" srcset="<?php echo $masthead_1000; ?>">
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
		<div class="our-next-bout">
			<div class="feed-tab bout" id="bout-tab">
				<h2>Our Next Bout!</h2>
				<div class="controls"><i class="icon icon-skate"></i><a href="#" class="toggle"><i class="icon icon-plus"></i></a></div>
			</div>
		</div>
		<div class="twitter">
			<div class="feed-tab twitter" id="twitter-tab">
				<h2>Twitter</h2>
				<div class="controls"><i class="icon icon-twitter"></i><a href="#" class="toggle"><i class="icon icon-plus"></i></a></div>
			</div>
		</div>
	</section>
</section>
	<section class="feeds" id="feeds">
		<div class="feed bout-feed" id="bout-feed">
			<header class="tab-header">
				<div class="close-feed" id="close-bout"><i class="icon icon-plus"></i></div>
				<h2>Our Next Bout!</h2>
			</header>
			<section class="bout-details">
				<?php if (have_rows('events', 'option')): ?>
					<div class="events" id="feed-events">
						<?php while (have_rows('events', 'option')): the_row(); ?>
							<?php if (have_rows('games', 'option')): ?>
								<?php while(have_rows('games', 'option')): the_row();
									$visitor = get_sub_field('visitor');
									$host = get_sub_field('host_team');
									$visitor_avatar = get_sub_field('visitor_avatar');
									$visitor_avatar_url = $visitor_avatar['url'];
									$visitor_avatar_alt = $visitor_avatar['alt'];
									$host_avatar = get_sub_field('host_avatar');
									$host_avatar_url = $host_avatar['url'];
									$host_avatar_alt = $host_avatar['alt'];
									$game_type = get_sub_field('game_type');
									$ribbon_class = strtolower($game_type); ?>

									<div class="slide">
										<div class="ribbon <?php echo str_replace(" ", "-", $ribbon_class);?>">
											<div class="banner">
												<div class="text"><?php echo $game_type; ?></div>
											</div>
										</div> <!-- end ribbon -->
										<div class="content">
											<div class="visitor">
												<div class="avatar">
													<img width="136" height="143" src="<?php echo $visitor_avatar_url;?>" alt="<?php echo $visitor_avatar_alt; ?>">
												</div>
												<?php echo $visitor; ?>
											</div>
											<div class="vs">VS</div>
											<div class="home-team">
												<div class="avatar">
													<img width="136" height="143" src="<?php echo $host_avatar_url; ?>" alt="<?php echo $host_avatar_alt; ?>">
												</div>
												<?php echo $host; ?>
											</div>
										</div>
									</div>
								<?php endwhile; ?>
							<?php endif; ?>
						<?php endwhile; ?>
					</div>
				<?php endif; ?>
			</section>
		</div>
		<div class="feed twitter-feed" id="twitter-feed">
			<header class="tab-header">
				<div class="close-feed" id="close-bout"><i class="icon icon-plus"></i></div>
				<h2>Twitter</h2>
				<a href="#" class="button">Follow GSRD</a>
			</header>
			<section class="twitter-details">
				
			</section>
		</div>
	</section>
<section class="tickets">
	<div class="accordion" id="tickets">
	    <div class="accordion-title"><span>Get Tickets</span><i class="icon icon-accordion-toggle"></i><a href="#" class="button">Full Schedule</a></div>
	    <div class="accordion-content open-on-init">
				<div class="event-calendar" id="event-calendar">
					<div class="month-overlay" id="month-overlay">
						<a href="" role="month" data-month="0">Jan</a><a href="" role="month" data-month="1">Feb</a><a href="" role="month" data-month="2">Mar</a><a href="" role="month" data-month="3">Apr</a><a href="" role="month" data-month="4">May</a><a href="" role="month" data-month="5">Jun</a><a href="" role="month" data-month="6">Jul</a><a href="" role="month" data-month="7">Aug</a><a href="" role="month" data-month="8">Sep</a><a href="" role="month" data-month="9">Oct</a><a href="" role="month" data-month="10">Nov</a><a href="" class="active" role="month" data-month="11">Dec</a>
					</div>
					<div class="shadow"></div>
					<?php if (have_rows('events', 'option')): ?>
						<div class="event-tabs" id="event-tabs">
							<?php while (have_rows('events', 'option')): the_row();
								$venue = get_sub_field('venue');
								$address = get_sub_field('address');
								$map = str_replace(" ", "+", $address);
								$date = get_sub_field('date');
								$time = get_sub_field('time');
								$tickets = get_sub_field('tickets_link'); ?>
								<div class="event">
									<?php if (have_rows('games', 'option')): ?>
										<?php while(have_rows('games', 'option')): the_row();
											$visitor = get_sub_field('visitor');
											$host = get_sub_field('host_team');
											$visitor_avatar = get_sub_field('visitor_avatar');
											$visitor_avatar_url = $visitor_avatar['url'];
											$visitor_avatar_alt = $visitor_avatar['alt'];
											$host_avatar = get_sub_field('host_avatar');
											$host_avatar_url = $host_avatar['url'];
											$host_avatar_alt = $host_avatar['alt'];
											$game_type = get_sub_field('game_type');
											$ribbon_class = strtolower($game_type); ?>

											<div class="tab">
												<div class="ribbon <?php echo str_replace(" ", "-", $ribbon_class);?>">
													<div class="banner">
														<div class="text"><?php echo $game_type; ?></div>
													</div>
												</div> <!-- end ribbon -->
												<div class="content">
													<div class="visitor">
														<div class="avatar">
															<img width="136" height="143" src="<?php echo $visitor_avatar_url;?>" alt="<?php echo $visitor_avatar_alt; ?>">
														</div>
														<?php echo $visitor; ?>
													</div>
													<div class="vs">VS</div>
													<div class="home-team">
														<div class="avatar">
															<img width="136" height="143" src="<?php echo $host_avatar_url; ?>" alt="<?php echo $host_avatar_alt; ?>">
														</div>
														<?php echo $host; ?>
													</div>
												</div>
											</div>
										<?php endwhile; ?>
									<?php endif; ?>
									<div class="data-details" data-venue="<?php echo $venue;?>" data-address="<?php echo $address; ?>" data-date="<?php echo $date; ?>" data-map="//www.google.com/maps/place/<?php echo $map;?>" data-time="<?php echo $time; ?>" data-tickets="<?php echo $tickets;?>"></div>
								</div>
							<?php endwhile;?>
						</div>
					<?php endif;?>
				</div>
				<section class="event-details">
					<div class="location event-accordion">
						<div class="event-title">
							<span>Location</span>
							<i class="icon icon-accordion-toggle"></i>
						</div>
						<div class="event-content details">
							<section><span class="venue" id="venue"></span><a href="#" class="map" id="map" target="_blank">Map</a><a href="#" class="call">Call</a></section>
							<section><span class="address" id="address"></span></section>
							<section><span class="date" id="date"></span> <span class="date" id="time"></span></section>
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
						<a id="tickets-info" href="#" target="_blank">Tickets &amp; Info</a>
					</div>
					<div class="right">
						<a id="more-info" href="#" target="_blank">More Info</a>
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
</section>
<section class="bruise-letter">
	<div class="accordion" id="bruise-letter">
	    <div class="accordion-title">Bruiseletter<i class="icon icon-accordion-toggle"></i></div>
	    <div class="accordion-content open-on-init">
			<?php get_template_part('parts/checkbox'); ?>
			<input type="email" class="email-field" placeholder="Email Address">
			<a href="#" class="submit"><i class="icon icon-send"></i></a>
	    </div>
	</div>
</section>
<?php get_footer(); ?>
