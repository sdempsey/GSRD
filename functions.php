<?php
    require_once locate_template('/functions/admin.php');
    require_once locate_template('/functions/extras.php');
    require_once locate_template('/functions/cleanup.php');

/*  ==========================================================================
     SCRIPTS, STYLESHEETS, AND FAVICONS
    ========================================================================== */

/*   Frontend Enqueuer
    --------------------------------------------------------------------------  */

    function frontend_enqueuer() {

        wp_enqueue_style( 'fonts', get_template_directory_uri() . '/css/fonts.css', null, '1.0' );
        wp_enqueue_style( 'style', get_stylesheet_uri(), null, '1.0', 'all' );

        // if ( is_singular() ) {
        //     wp_enqueue_script( 'comment-reply' );
        // }

        if (is_front_page() ) {
            wp_enqueue_script( 'moment', get_template_directory_uri() . '/scripts/libraries/moment.min.js', null, '2.8.1', true );
            wp_enqueue_script( 'fullcalender', get_template_directory_uri() . '/scripts/libraries/fullcalendar.min.js', null, '2.1.1', true );
            wp_enqueue_script( 'picturefill', get_template_directory_uri() . '/scripts/libraries/picturefill.min.js', null, '2.1.0' );
            wp_enqueue_script('bxSlider', get_template_directory_uri() . '/scripts/libraries/jquery.bxslider.min.js', null, '4.1.2', true);
        }
        wp_enqueue_script( 'velocity', get_template_directory_uri() . '/scripts/libraries/velocity.min.js', null, '1.1.0', true );
        wp_enqueue_script( 'global', get_template_directory_uri() . '/scripts/site/global.js', array('jquery'), '1.0', true );

        /**
         * Localize site URLs for use in JavaScripts
         * Usage: SiteInfo.theme_directory + '/scripts/widget.js'
         */
        $site_info = array(
            'home_url'        => get_home_url(),
            'theme_directory' => get_template_directory_uri(),
            'the_title'       => get_the_title()
        );
        wp_localize_script( 'polyfills', 'SiteInfo', $site_info );
        wp_localize_script( 'global', 'SiteInfo', $site_info );
    }
    add_action( 'wp_enqueue_scripts', 'frontend_enqueuer' );


/*  ==========================================================================
     IMAGES & MEDIA
    ========================================================================== */

    add_theme_support( 'post-thumbnails' );

    //add svg upload support
    function cc_mime_types($mimes) {
        $mimes['svg'] = 'image/svg+xml';
        return $mimes;
    }

    add_filter('upload_mimes', 'cc_mime_types');

/*   Oembed object maximum width
    --------------------------------------------------------------------------  */

    if ( !isset( $content_width ) )
        $content_width = 660;

/*   Custom image sizes
    -------------------------------------------------------------------------- */

    //add_image_size('your_custom_size', 1000, 500, true);


/*   Add custom image sizes as choices when inserting media
    -------------------------------------------------------------------------- */

    //function vtl_custom_sizes( $sizes ) {
    //    return array_merge( $sizes, array(
    //        'your_custom_size' => __('Your Custom Size Name'),
    //    ) );
    //}
    //add_filter( 'image_size_names_choose', 'vtl_custom_sizes' );


/*  ==========================================================================
     MENUS
    ========================================================================== */

    register_nav_menus(array(
        'main_nav' => 'Main Nav',
        'footer_nav' => 'Footer Nav'
    ));

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

/*  ==========================================================================
     WIDGETS
    ========================================================================== */


function gsrd_widgets_init() {
  register_sidebar( array(
    'name'      => __( 'Top Links', 'gsrd'),
    'id'            => 'top-links',
    'description'   => __( 'Sitemap on Application Pages', 'GSRD' ),
    'before_widget' => '<aside id="%1$s" class="widget %2$s">',
    'after_widget'  => '</aside>',
    'before_title'  => '<h3 class="widget-title">',
    'after_title'   => '</h3>',
  )); 
}

add_action( 'widgets_init', 'gsrd_widgets_init' );

/*  ==========================================================================
     SHORTCODES
    ========================================================================== */


/*  ==========================================================================
     SITE-SPECIFIC CUSTOMIZATIONS
    ========================================================================== */

/*   Customize login
    -------------------------------------------------------------------------- */

    // function custom_login_logo() {
    //     echo "<style>
    //     body.login #login h1 a {
    //          background: url('".get_template_directory_uri()."/images/custom-logo.png') no-repeat scroll center top transparent;
    //          width: 320px;
    //          height: 100px;
    //     }
    //     </style>";
    // }
    // add_filter('login_headerurl', create_function(false,"return '".home_url()."';"));
    // add_filter('login_headertitle', create_function(false,"return '".get_bloginfo('name')."';"));
    // add_action('login_head', 'custom_login_logo');


/*  ==========================================================================
     EDITOR CUSTOMIZATIONS
    ==========================================================================  */

/*   Custom Styles
     http://codex.wordpress.org/TinyMCE_Custom_Styles#Style_Format_Arguments
    -------------------------------------------------------------------------- */

    // function custom_tinymce_styles($custom_styles) {
    //     $styles = array(
    //         array(
    //             'title' => 'Text',
    //             'items' => array(
    //                 array(
    //                     'title' => 'Intro Text',
    //                     'selector' => 'p',
    //                     'classes' => 'intro-text',
    //                     'wrapper' => false
    //                     ),
    //                 array(
    //                     'title' => 'Pull Quote',
    //                     'selector' => 'p',
    //                     'classes' => 'pull-quote',
    //                     'wrapper' => false
    //                     )
    //                 )
    //             ),
    //         array(
    //             'title' => 'Buttons',
    //             'items' => array(
    //                 array(
    //                     'title' => 'Red Button',
    //                     'selector' => 'a',
    //                     'classes' => 'red-button',
    //                     'wrapper' => false
    //                     ),
    //                 array(
    //                     'title' => 'Blue Button',
    //                     'selector' => 'a',
    //                     'classes' => 'blue-button',
    //                     'wrapper' => false
    //                     )
    //                 )
    //             ),
    //         array(
    //             'title' => 'Blocks',
    //             'items' => array(
    //                 array(
    //                     'title' => 'Call to Action',
    //                     'block' => 'div',
    //                     'classes' => 'cta',
    //                     'wrapper' => true
    //                     )
    //                 )
    //             )
    //         );

    //     $custom_styles['style_formats'] = json_encode( $styles );
    //     return $custom_styles;
    // }
    // add_filter( 'tiny_mce_before_init', 'custom_tinymce_styles' );


/*   Options & Buttons
    -------------------------------------------------------------------------- */

    function custom_editor_styles() {
        add_editor_style( get_template_directory_uri() . '/css/editor-style.css' );
    }
    add_action( 'init', 'custom_editor_styles' );

    function custom_tinymce($options) {
        $options['wordpress_adv_hidden'] = false;
        $options['toolbar1'] = 'bold,italic,underline,superscript,forecolor,alignleft,aligncenter,alignright,outdent,indent,bullist,numlist,hr,link,unlink,wp_more,fullscreen';
        $options['toolbar2'] = 'formatselect,fontselect,fontsizeselect,styleselect,pastetext,charmap,removeformat,undo,redo,wp_help';
        $options['block_formats'] = 'Paragraph=p; Blockquote=blockquote; Heading 1=h1; Heading 2=h2; Heading 3=h3; Heading 4=h4; Heading 5=h5; Heading 6=h6';
        $options['fontsize_formats'] = '0.75em 0.875em 1em 1.125em 1.25em 1.375em 1.5em 1.75em 1.875em 2em';

        // Color Picker
        $options['textcolor_map'] = '['.'
            "ffffff", "White",
            "000000", "Black"
        '.']';

        // Font Families
        // The last family listed must NOT have a semicolon before the closing quote
        $options['font_formats'] = 'Helvetica=Helvetica, Arial, sans-serif;'.
                                   'Georgia=Georgia, Cambria, Times New Roman, Times, serif';

        return $options;
    }
    add_filter('tiny_mce_before_init', 'custom_tinymce');


/*   Advanced Custom Fields WYSIWYG Buttons
    -------------------------------------------------------------------------- */

    function custom_acf_toolbars($toolbars) {
        $toolbars['Basic' ][1] = array( 'bold,italic,underline,superscript,forecolor,alignleft,aligncenter,alignright,outdent,indent,bullist,numlist,hr,link,unlink,wp_more,code,fullscreen' );
        $toolbars['Full' ][1] = array( 'bold,italic,underline,superscript,forecolor,alignleft,aligncenter,alignright,outdent,indent,bullist,numlist,hr,link,unlink,wp_more,fullscreen' );
        $toolbars['Full' ][2] = array('formatselect,fontselect,fontsizeselect,styleselect,pastetext,charmap,removeformat,undo,redo,code,wp_help' );
        return $toolbars;
    }
    add_filter('acf/fields/wysiwyg/toolbars', 'custom_acf_toolbars');
?>