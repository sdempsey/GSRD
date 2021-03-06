<section class="tickets">
	<div class="accordion" id="tickets">
	    <div class="accordion-title"><span>Get Tickets</span><i class="icon icon-accordion-toggle"></i><a href="#" class="button">Full Schedule</a></div>
	    <div class="accordion-content open-on-init">
	    	<div class="calendar-container" id="event-calendar">
				<div class="month-overlay" id="month-overlay">
					<a href="" role="month" data-month="0">Jan</a><a href="" role="month" data-month="1">Feb</a><a href="" role="month" data-month="2">Mar</a><a href="" role="month" data-month="3">Apr</a><a href="" role="month" data-month="4">May</a><a href="" role="month" data-month="5">Jun</a><a href="" role="month" data-month="6">Jul</a><a href="" role="month" data-month="7">Aug</a><a href="" role="month" data-month="8">Sep</a><a href="" role="month" data-month="9">Oct</a><a href="" role="month" data-month="10">Nov</a><a href="" class="active" role="month" data-month="11">Dec</a>
				</div>	    		
	    	</div>
	    	<div class="overlay" id="event-overlay"></div>
			<div class="event-calendar">
				<?php if (have_rows('events', 'option')): ?>
					<div class="event-tabs" id="event-tabs">
						<?php while (have_rows('events', 'option')): the_row();
							$venue = get_sub_field('venue');
							$address = get_sub_field('address');
							$map = str_replace(" ", "+", $address);
							$time = get_sub_field('time');
							$tickets = get_sub_field('tickets_link'); 
							$date = get_sub_field('date');
							//I need the date formatted numerically for the calendar
							//the following formats it's display for the user
							$y = substr($date, 0, 4);
							$m = substr($date, 4, 2);
							$d = substr($date, 6, 2);
							$formatted = strtotime("{$d}-{$m}-{$y}"); ?>

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
													<div class="inner">
														<div class="avatar">
															<img src="<?php echo $visitor_avatar_url;?>" alt="<?php echo $visitor_avatar_alt; ?>">
														</div>
														<span class="name"><?php echo $visitor; ?></span>
													</div>
												</div>
												<div class="vs">
													<div class="inner">
														VS
													</div>
												</div>
												<div class="home-team">
													<div class="inner">
														<div class="avatar">
															<img src="<?php echo $host_avatar_url; ?>" alt="<?php echo $host_avatar_alt; ?>">
														</div>
														<span class="name"><?php echo $host; ?></span>
													</div>
												</div>
											</div>
										</div>
									<?php endwhile; ?>
								<?php endif; ?>
								<div class="data-details" data-venue="<?php echo $venue;?>" data-address="<?php echo $address; ?>" data-event-date="<?php echo $date; ?>" data-formatted-date="<?php echo date('F n Y', $formatted); ?>" data-map="//www.google.com/maps/place/<?php echo $map;?>" data-time="<?php echo $time; ?>" data-tickets="<?php echo $tickets;?>"></div>
							</div>
						<?php endwhile;?>
					</div>
				<?php endif;?>
			</div>
			<footer class="tickets-footer">
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
							<a id="tickets-info" href="#" target="_blank">Tickets<span class="and-info"> &amp; Info</span></a>
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
			</footer>
	    </div>
	</div>
</section>