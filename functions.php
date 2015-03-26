<?php
/**
 * Setup Theme Defaults and Features
 */
require_once locate_template('/functions/setup.php');

/**
 * Administration Functions
 */
require_once locate_template('/functions/admin.php');

/**
 * Security
 */
require_once locate_template('/functions/security.php');

/**
 * Tidying-up WordPress
 */
require_once locate_template('/functions/cleanup.php');

/**
 * Widgets Setup
 */
require_once locate_template('/functions/widgets.php');

/**
 * Custom Functions (Independent of theme template)
 */
require_once locate_template('/functions/extras.php');

/**
 * Script and Stylesheet Enqueuer
 */

function nucleus_script_enqueuer() {

    // Use Google CDN's jQuery in the frontend
    if (!is_admin()) {
        wp_deregister_script('jquery');
        wp_register_script('jquery', '//ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js');
        add_filter('script_loader_src', 'nucleus_jquery_local_fallback', 10, 2);
    }

    wp_enqueue_style("exo-font", 'http://fonts.googleapis.com/css?family=Exo+2:400,100,200,300,500,700', null, null, "screen");
    wp_enqueue_style('style', get_stylesheet_uri());

    if (is_front_page() ) {
        wp_enqueue_script('picturefill', get_template_directory_uri() . '/scripts/libraries/picturefill.min.js', null, '2.1.0', true);
        wp_enqueue_script( 'moment', get_template_directory_uri() . '/scripts/libraries/moment.min.js', null, '2.8.1', true );
        wp_enqueue_script( 'fullcalender', get_template_directory_uri() . '/scripts/libraries/fullcalendar.min.js', null, '2.1.1', true );
        wp_enqueue_script('bxSlider', get_template_directory_uri() . '/scripts/libraries/jquery.bxslider.min.js', null, '4.1.2', true);
    }
    wp_enqueue_script( 'velocity', get_template_directory_uri() . '/scripts/libraries/velocity.min.js', null, '1.2.1', true );
    wp_enqueue_script('modernizr', get_template_directory_uri() . '/scripts/libraries/modernizr.js', array(), null, true);
    wp_enqueue_script('global', get_template_directory_uri() . '/scripts/site/global.js', array('jquery'), null, true);

    /**
     * Localize site URLs for use in JavaScripts
     * Usage: SiteInfo.theme_directory + '/scripts/widget.js'
     */
    $site_info = array(
        'home_url'        => get_home_url(),
        'theme_directory' => get_template_directory_uri(),
    );
    wp_localize_script('global', 'SiteInfo', $site_info);

}
add_action('wp_enqueue_scripts', 'nucleus_script_enqueuer');


// Register menu locations
register_nav_menus(array(
    'main_nav' => 'Main Navigation',
    'footer_nav' => 'Footer Navigation'
));


// Custom Image Sizes
add_image_size('masthead_600', 600, 372, true);
add_image_size('masthead_1000', 1000, 619, true);


// Custom Login Page
function nucleus_login_logo() {
    echo "<style>
    body.login #login h1 a {
         background: url('" . get_template_directory_uri() . "/images/wp-logo.png') no-repeat scroll center top transparent;
         width: 80px;
         height: 80px;
    }
    </style>";
}
add_filter('login_headerurl', create_function(false,"return '" . home_url() . "';"));
add_filter('login_headertitle', create_function(false,"return '" . get_bloginfo('name') . "';"));
add_action('login_head', 'nucleus_login_logo');


/*   Advanced Custom Fields Options Page
    -------------------------------------------------------------------------- */

if( function_exists('acf_add_options_page') ) {     
    acf_add_options_page(array(
        'page_title'    => 'Events',
        'menu_title'    => 'Events',
        'menu_slug'     => 'events',
        'capability'    => 'edit_posts',
        'position'      => '63.3',
        'icon_url'      => 'dashicons-calendar-alt',
        'redirect'      => false
    ));        
}
?>