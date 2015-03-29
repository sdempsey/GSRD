	<section class="feeds" id="feeds">
		<div class="feed bout-feed" id="bout-feed">
			<header class="tab-header">
				<div class="close-feed" id="close-bout"><i class="icon icon-feed-close"></i></div>
				<h2>Our Next Bout!</h2>
			</header>
			<section class="details bout">
				<?php if (have_rows('events', 'option')): ?>
					<div class="custom-controls">
						<span class="prev" id="feed-prev"></span>
						<span class="next" id="feed-next"></span>
					</div>					
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
										<footer class="bout-footer">
											<div class="event-social">
												<h3>Share</h3>
												<div class="social-icons">
													<?php if (function_exists('share_buttons')) { share_buttons(); } ?>
												</div>
											</div>
											<div class="event-tickets">
												<h3>Tickets</h3>
												<div class="bpt">
													<a href="http://www.brownpapertickets.com/producer/44889" target="_blank">
														<img src="<?php bloginfo('template_directory') ?>/images/svg/bpt.svg" alt="Brown Paper Tickets Logo">
														<span>Buy Tickets Now</span>
													</a>
												</div>
											</div>
										</footer>
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
				<div class="close-feed" id="close-twitter"><i class="icon icon-feed-close"></i></div>
				<h2>Twitter</h2><a href="#" class="button">Follow GSRD</a>
			</header>
			<section class="details twitter">
				<div id="feed-container"></div>
			</section>
		</div>
	</section>