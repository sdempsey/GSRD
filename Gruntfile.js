module.exports = function(grunt) {
	grunt.initConfig({
		jshint: { // stops compiling when you write bad js.
			all: ['scripts/src/**/*.js']
		},
		concat: { //concatenates .js files into one.
			debug: {
				src: 'scripts/src/*.js',
				dest: 'scripts/site/global.js'
			}
		},
		sass: {
			dubug: {
				options: {
					style: 'expanded',
					require: 'susy',
					noCache: true
				},
				files: {
					'css/src/editor-styles.css': 'scss/modules/editor-styles.scss',
					'css/src/style.css': 'scss/style.scss'
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
				expand:true,
				flatten: true,
				src: 'css/src/style.css',
				dest: '.',
				options: {
					map:true
				},
			}
		},
		cmq: { //combines media queries
			debug: {
				files: { 'css/src/style.css': ['css/src/style.css'] }
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
		webfont: {
			icons: {
				src: 'fonts/src/*.svg',
				dest: 'fonts',
				destCss: 'scss/modules',
				options: {
					engine: 'node',
					font: 'fontcustom',
					hashes: false,
					stylesheet: 'scss',
					relativeFontPath: 'fonts/',
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
				files: 'scss/**/*.scss',
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
	
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-sass')
	grunt.loadNpmTasks('grunt-combine-media-queries');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-newer');
	grunt.loadNpmTasks('grunt-webfont');
	grunt.loadNpmTasks('grunt-autoprefixer');

	grunt.registerTask('js', ['jshint', 'concat']);
	grunt.registerTask('css', ['sass', /*'cmq',*/ 'autoprefixer']);
	grunt.registerTask('img', ['newer:imagemin']);
	grunt.registerTask('default', ['js', 'css', 'img']);	
}