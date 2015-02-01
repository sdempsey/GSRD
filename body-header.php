<?php 
	//needed for velocity scroll effect
	//we don't want a page refresh if the user is already on the homepage. 

	//check if the user is on the front page
	if (is_front_page()):
		$ticket_link = '#tickets';
	else:
		//no?
		$ticket_link = site_url('/#tickets');
	endif;
?>
<header class="body-header" id="body-header">
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
		<a class="top-link" href="<?php echo site_url('/schedule');?>">
			<img src="<?php bloginfo('template_directory') ?>/images/svg/skate-white.svg" alt="Skate Icon" title="Join GSRD">
		</a>
		<a class="top-link" href="<?php echo site_url('/');?>#">
			<img src="<?php bloginfo('template_directory') ?>/images/svg/helmet.svg" alt="Helmet Icon" title="Schedule">
		</a>
		<a class="top-link" href="<?php echo $ticket_link; ?>" id="ticket-anchor">
			<img src="<?php bloginfo('template_directory') ?>/images/svg/tickets.svg" alt="Ticket Icon" title="Get Tickets">
		</a>
		<a class="top-link" href="//www.twitter.com/gsrollerderby" target="_blank">
			<img src="<?php bloginfo('template_directory') ?>/images/svg/twitter.svg" alt="Twitter Icon" title="Granite State Roller Derby on Twitter">
		</a>
		<a class="top-link" href="//www.facebook.com/GraniteStateRollerDerby" target="_blank">
			<img src="<?php bloginfo('template_directory') ?>/images/svg/facebook.svg" alt="Facebook Icon" title="Granite State Roller Derby on Facebook">
		</a>
	</div>
</div>