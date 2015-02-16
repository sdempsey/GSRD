var timer = require("grunt-timer");

module.exports = function(grunt) {
  timer.init(grunt, {deferLogs: true, friendlyTime: true});
  "use strict";

	grunt.initConfig({
		jshint: { // stops compiling when you write bad js.
			all: ['scripts/src/*.js']
		},
		concat: { //concatenates .js files into one.
			debug: {
				src: 'scripts/src/*.js',
				dest: 'scripts/site/global.js'
			}
		},
		sass: {
			debug: {
				options: {
					sourceMap: true
				},
				files: {
					'css/src/editor-styles.css': 'scss/modules/editor-styles.scss',
					'css/src/style.css': ['scss/style.scss']
				}
			}
		},
		autoprefixer: {
			editor: {
				expand:true,
				flatten: true,
				src: 'css/src/editor-styles.css',
				dest: 'css/'
			},
			base: {
				options: {
					map:true
				},
				expand:true,
				flatten: true,
				src: 'css/src/style.css',
				dest: '.'
			}
		},
		cmq: { //combines media queries
			debug: {
				files: {
					'css/src/style.css': ['css/src/style.css']
				}
			}
		},
		clean: {
			css_src: {
				src: ["css/src"]
			}			
		},	
		imagemin: { //optimizes images
			dynamic: {
				options: {
					optimizationLevel: 7
				},
				files: [{
					expand: true,
					cwd: 'images/src/',
					src: '**/*.{jpg,png,gif,svg}',
					dest: 'images/'
				}]
			}
		},
		webfont: { //I use this, you don't have to.  It generates icon fonts using fontforge.
			icons: {
				src: 'fonts/src/*.svg',
				dest: 'fonts',
				destCss: 'scss/modules',
				options: {
					engine: 'node',
					font: 'fontcustom',
					htmlDemo: false,
					hashes: false,
					stylesheet: 'scss',
					relativeFontPath: 'fonts/',
					template: 'fonts/fontcustom/fontcustom.css',
					templateOptions: {
						classPrefix: 'icon-',
						mixinPrefix: 'icon-'
					}
				}
			}
		},		
		watch: { //checks for specified changes, refreshes browser if plugin is installed
			options: { livereload: true},
			scripts: {
				files: 'scripts/src/*.js',
				tasks: ['js']
			},
			css: {
				files: 'scss/*.scss',
				tasks: ['css']
			},
			img: {
				files: 'images/src/**/*.{jpg,gif,png,svg}',
				tasks: ['img']
			},
			php: {
				files: '*.php',
				tasks: []
			}
		}
	});
	
	require("load-grunt-tasks")(grunt);
	grunt.registerTask('js', ['jshint', 'concat']);
	grunt.registerTask('css', ['sass', 'cmq', 'autoprefixer', 'clean']);
	grunt.registerTask('img', ['newer:imagemin']);
	grunt.registerTask('default', ['js', 'css', 'img']);
}