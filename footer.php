	<footer class="body-footer" id="body-footer">
	 	<?php get_template_part('parts/homepage/bruise-letter'); ?>
		<section class="wftda">
			<div class="image">
				<a href="//wftda.com" target="_blank">
					<img src="<?php bloginfo('template_directory') ?>/images/svg/WFTDA-logo.svg" alt="WFTDA Logo" title="Women's Flat Track Derby Association">
				</a>
			</div>
			<div class="text">
				<span class="gsrd">Granite State Roller Derby</span> is a proud member of the Women's Flat Track Derby Association.
			</div>
		</section>
		<section class="footer-nav">
			<?php wp_nav_menu( array('theme_location'  => 'footer_nav','menu' => 'Footer Navigation')); ?>
		</section>
		<section class="copyright">
			<p>&copy; <?php echo date('Y'); ?> Granite State Roller Derby.</p>
			<p>All Rights Reserved</p>
		</section>
		<section class="photo-credit">
			Photos &copy; Walter Romero // Hispanic Attack
		</section>
	</footer>
	</div> <!-- End of .main -->
</div> <!-- End of #root -->
    <?php wp_footer(); ?>
</body>
</html

