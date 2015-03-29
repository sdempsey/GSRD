var timer = require("grunt-timer");

module.exports = function(grunt) {
	timer.init(grunt, {deferLogs: true, friendlyTime: true});
  	"use strict";

	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),
		autoprefixer: {
			main: {
				options: {
					map:true
				},
				expand: true,
				flatten: true,
				src: 'css/src/style.css',
				dest: '.'
			},
			editor: {
				expand: true,
				flatten: true,
				src: ['css/src/*.css', '!css/src/style.css'],
				dest: 'css/'
			}
		},		
		clean: { //removes src files after tasks are completed
			debug: {
				src: ["css/src"]
			}
		},
		concat: { //concatenates .js files into one.
			debug: {
				src: 'scripts/src/*.js',
				dest: 'scripts/site/global.js'
			}
		},		
		imagemin: { //optimizes images
			debug: {
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
		jshint: { // stops compiling when you write bad js.
			all: ['scripts/src/*.js']
		},
		watch: { //checks for specified changes, refreshes browser if plugin is installed
			options: { livereload: true},
			icon: {
				files: 'fonts/fontcustom/src/*.svg',
				tasks: ['webfont', 'css']
			},			
			scripts: {
				files: 'scripts/src/*.js',
				tasks: ['js']
			},
			css: {
				files: ['scss/**/*.scss'],
				tasks: ['css']
			},
			img: {
				files: 'images/src/**/*.{jpg,gif,png,svg}',
				tasks: ['img']
			},
			php: {
				files: ['*.php', '**/**/*.php'],
				tasks: []
			}
		},		
		sass: {
			main: {
				options: {
					sourceMap: true
				},
				files: {
					'css/src/style.css': 'scss/style.scss'
				}
			},
			editor: {
				files: {
					'css/src/editor-style.css': 'scss/editor-style.scss',
					'css/src/fonts.css': 'scss/fonts.scss'
				}
			}
		},
		webfont: { // I use this, you don't have to.  It generates icon fonts using fontforge.
			icons: {
				src: 'fonts/fontcustom/src/*.svg',
				dest: 'fonts/fontcustom',
				destCss: 'scss/global/icon-font',
				options: {
					engine: 'node', //if you're on a mac I suggest installing fontforge and setting this to fontforge.
					font: 'fontcustom',
					hashes: false,
					stylesheet: 'scss',
					relativeFontPath: 'fonts/fontcustom/',
					htmlDemo: false,
					template: 'fonts/fontcustom/template/template.css',
					templateOptions: {
						classPrefix: 'icon-',
						mixinPrefix: 'icon-'
					}
				}
			}
		}
	});

	require("load-grunt-tasks")(grunt);
	grunt.registerTask('js', ['jshint', 'concat']);
	grunt.registerTask('css', ['sass', 'autoprefixer', 'clean']);
	grunt.registerTask('img', ['newer:imagemin']);
	grunt.registerTask('default', ['js', 'css', 'img']);
}