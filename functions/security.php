<?php
/**
 * SECURITY
 */

/**
 * Disable pingback XMLRPC method
 */
function nucleus_filter_xmlrpc_method($methods) {
    unset($methods['pingback.ping']);
    return $methods;
}
add_filter('xmlrpc_methods', 'nucleus_filter_xmlrpc_method', 10, 1);

/**
 * Remove pingback header
 */
function nucleus_filter_headers($headers) {
    if (isset($headers['X-Pingback'])) {
        unset($headers['X-Pingback']);
    }
    return $headers;
}
add_filter('wp_headers', 'nucleus_filter_headers', 10, 1);

/**
 * Kill trackback rewrite rule
 */
function nucleus_filter_rewrites($rules) {
    foreach($rules as $rule => $rewrite) {
        if (preg_match('/trackback\/\?\$$/i', $rule)) {
          unset($rules[$rule]);
      }
  }
  return $rules;
}
add_filter('rewrite_rules_array', 'nucleus_filter_rewrites');

/**
 * Kill bloginfo('pingback_url')
 */
function nucleus_kill_pingback_url($output, $show) {
    if ($show === 'pingback_url') {
        $output = '';
    }
    return $output;
}
add_filter('bloginfo_url', 'nucleus_kill_pingback_url', 10, 2);

/**
 * Disable XMLRPC call
 */
function nucleus_kill_xmlrpc($action) {
    if ($action === 'pingback.ping') {
        wp_die('Pingbacks are not supported', 'Not Allowed!', array('response' => 403));
    }
}
add_action('xmlrpc_call', 'nucleus_kill_xmlrpc');
?>