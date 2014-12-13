<?php get_header(); ?>

    <?php if ( have_posts() ): ?>

        <?php if ( is_month() ) : ?>
        <h2><?php echo  get_the_date( 'F Y' ); ?></h2>
        <?php else if ( is_year() ) : ?>
        <h2><?php echo  get_the_date( 'Y' ); ?></h2>
        <?php else : ?>
        <h2>Archive</h2>
        <?php endif; ?>

        <?php while ( have_posts() ) : the_post(); ?>

        <article id="post-<?php the_ID(); ?>">
            <h3><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h3>
            <?php get_template_part( 'parts/meta' ); ?>
            <?php get_template_part( 'parts/excerpt' ); ?>
        </article>

        <?php endwhile; ?>

    <?php else: ?>

        <h3>No posts to display</h3>

    <?php endif; ?>

    <?php pagination(); ?>

<?php get_footer(); ?>