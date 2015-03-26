<?php

/**
 * SETUP THEME DEFAULTS AND FEATURES
 */

function nucleus_setup() {

    // Switch default core markup for search form, comment form, and comments
    // to output valid HTML5.
    add_theme_support('html5', array(
        'search-form', 'comment-form', 'comment-list', 'gallery', 'caption',
    ));

    // WordPress will manage our <title> tag
    add_theme_support('title-tag');

    // Enable featured image support (Add more post types to the array if needed)
    add_theme_support('post-thumbnails', array('post'));

    // Set maximum oembed width
    if (!isset($content_width)) {
        $content_width = 700;
    }

    // Tell TinyMCE editor to use our stylesheets
    add_editor_style(array('css/editor-style.css', 'css/fonts.css'));

}
add_action('after_setup_theme', 'nucleus_setup');

/**
 * Add required meta tags to head
 */
function nucleus_add_meta() {
    echo '<meta charset="' . get_bloginfo('charset') . '">' . "\n";
    echo '<meta name="viewport" content="width=device-width, initial-scale=1">' . "\n";
}
add_action('wp_head', 'nucleus_add_meta', 0);

/**
 * Add RSS feed link to head
 */
function nucleus_add_feed() {
    echo '<link rel="alternate" type="application/rss+xml" title="' . get_bloginfo('name') . ' Feed" href="' . get_bloginfo('rss2_url') . '">' . "\n";
}
add_action('wp_head', 'nucleus_add_feed', 1);

/**
 * Increase JPG compression (default is 90)
 */
function nucleus_jpeg_quality($quality) {
    return 60;
}
add_filter('jpeg_quality', 'nucleus_jpeg_quality');

/**
 * Local jQuery fallback if Google CDN's copy doesn't load
 */
function nucleus_jquery_local_fallback($src, $handle = null) {
    static $add_jquery_fallback = false;
    if ($add_jquery_fallback) {
        echo '<script>window.jQuery || document.write(\'<script src="' . home_url() . '/wp-includes/js/jquery/jquery.js"><\/script>\')</script>' . "\n";
        $add_jquery_fallback = false;
    }
    if ($handle === 'jquery') {
        $add_jquery_fallback = true;
    }
    return $src;
}
add_action('wp_head', 'nucleus_jquery_local_fallback');

/**
 * Tell WordPress to use searchform.php from the parts/ directory
 */
function nucleus_get_search_form() {
    $form = '';
    locate_template('/parts/searchform.php', true, false);
    return $form;
}
add_filter('get_search_form', 'nucleus_get_search_form');

    class GSRD_Nav_Walker extends Walker_Nav_Menu {


        function start_el( &$output, $item, $depth = 0, $args = array(), $id = 0 ) {

            $default_classes = empty ( $item->classes ) ? array () : (array) $item->classes;

            $custom_classes = (array)get_post_meta( $item->ID, '_menu_item_classes', true );

            // Is this a top-level menu item?
            if ($depth == 0)
                $custom_classes[] = 'menu-item-top-level';

            // Does this menu item have children?
            if (in_array('menu-item-has-children', $default_classes))
                $custom_classes[] = 'menu-item-has-children';

            // Is this menu item active? (Top level only)
            $active_classes = array('current-menu-item', 'current-menu-parent', 'current-menu-ancestor', 'current_page_item', 'current-page-parent', 'current-page-ancestor');
            if ($depth == 0 && array_intersect($default_classes, $active_classes))
                $custom_classes[] = 'menu-item-active';

            // Give menu item a class based on its level/depth
            $level = $depth + 1;
            if ($depth > 0)
                $custom_classes[] = "menu-item-level-$level";

            $classes = join(' ', $custom_classes);

            ! empty ( $classes )
                and $classes = ' class="'. trim(esc_attr( $classes )) . '"';

            $output .= "<li $classes>";

            $attributes  = '';

            ! empty( $item->attr_title )
                and $attributes .= ' title="'  . esc_attr( $item->attr_title ) .'"';
            ! empty( $item->target )
                and $attributes .= ' target="' . esc_attr( $item->target     ) .'"';
            ! empty( $item->xfn )
                and $attributes .= ' rel="'    . esc_attr( $item->xfn        ) .'"';
            ! empty( $item->url )
                and $attributes .= ' href="'   . esc_attr( $item->url        ) .'"';
            ! empty( $item->object_id )
                and $attributes .= ' id="'     . esc_attr( $item->object_id        ) .'"';     

            $title = apply_filters( 'the_title', $item->title, $item->ID );


            $item_output = $args->before
                . "<a $attributes>"
                . $args->link_before
                . $title
                . '</a> '
                . $args->link_after
                . $args->after;

            $output .= apply_filters(
                'walker_nav_menu_start_el'
            ,   $item_output
            ,   $item
            ,   $depth
            ,   $args
            );            
        }
    }    

?>