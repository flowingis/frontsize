/*

Available grunt commands

$ grunt watch:assets     # Copy images inside frontsize/themes/default/img into production images folder
$ grunt watch:frontsize  # Compiles Frontsize
$ grunt watch:frnAssets  # Compiles Frontsize and copy images
$ grunt watch:autoprefix # Compiles Frontsize using Autoprefixer and disabling Frontsize prefixes
$ grunt watch:autoAssets # Compiles Frontsize using Autoprefixer disabling Frontsize prefixes and copy images
$ grunt watch:all        # Performs assets, frontsize and autoprefix tasks

$ grunt assets           # Copy images inside frontsize/themes/default/img into production images folder
$ grunt frontsize        # Compiles Frontsize
$ grunt frnAssets        # Compiles Frontsize and copy images
$ grunt autoprefix       # Compiles Frontsize using Autoprefixer and disabling Frontsize prefixes
$ grunt autoAssets       # Compiles Frontsize using Autoprefixer disabling Frontsize prefixes and copy images
$ grunt all              # Performs assets, frontsize and autoprefix tasks

*/

'use strict';

module.exports = function(grunt) {

    //frontsize : grunt.file.readJSON('frontsize.json'),

	grunt.initConfig({

        compileFile     : 'compile.scss',
        compileFileTest : 'compile-test.scss',
        themeName       : 'default',
        themeImg        : 'themes/default/img/',
        path            : 'test/',
        testCss         : '<%= path %>/frontsize.test.css',
        autoprefixerCss : '<%= path %>/frontsize.autoprefixer.min.css',
        minifiedCss     : '<%= path %>/frontsize.min.css',
        productionImg   : '<%= path %>/img/theme/',

        productionCss   : '<%= path %>/frontsize.3.0.0.min.css',
        prodAutoCss     : '<%= path %>/frontsize.3.0.0.autoprefixer.min.css',

		sass: {
            production: {
                options: {
                    cleancss          : false
                },
                files: {
                    '<%= productionCss %>' : '<%= compileFile %>'
                }
            },
            autoprefixer: {
                options: {
                    cleancss          : false
                },
                files: {
                    '<%= autoprefixerCss %>' : '<%= compileFile %>'
                }
            },
            test: {
                options: {
                    cleancss          : false
                },
                files: {
                    '<%= testCss %>' : '<%= compileFileTest %>'
                }
            }
		},

        autoprefixer: {
              options: {
                    // browsers: ['> 1%', 'Firefox > 3.6', 'last 10 versions', 'ie 8', 'ie 7', 'Firefox ESR', 'Opera > 10.1'],
                    diff: true
              },
              test: {
                    src  : '<%= autoprefixerCss %>',
                    dest : '<%= autoprefixerCss %'
              }  
        },

		watch: {
            frontsize : {
                files: [ '*.scss', '**/*.scss' ],
                tasks: [ 'frontsize' ]
            },
            devAssets : {
                files: [ '*.scss', '**/*.scss' ],
                tasks: [ 'devAssets' ]
            },
            autoprefix : {
                files: [ '*.scss', '**/*.scss' ],
                tasks: [ 'autoprefix' ]
            },
            autoAssets : {
                files: [ '*.scss', '**/*.scss' ],
                tasks: [ 'autoAssets' ]
            },
            all : {
                files: [ '*.scss', '**/*.scss' ],
                tasks: [ 'all' ]
            }
		},

        csslint: {
            options: {
                csslintrc: '.csslintrc'
            },
            test: {
                options: {
                    csslintrc: '.csslintrc'
                },
                src: ['test/frontsize.test.css']
            }
        },

        clean: {
            assets: {
                src: [
                    '<%= productionImg %>*'
                ]
            }
        },

        copy: {
            assets: {
                files: [
                    {
                        expand  : true,
                        flatten : true,
                        src     : [ '<%= themeImg %>*' ],
                        dest    : '<%= productionImg %>',
                        filter  : 'isFile'
                    }
                ]
            }
        }
	});

	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.registerTask('frontsize', [
        'sass:production',
        'test'
    ]);

    grunt.registerTask('devAssets', [
        'sass:production',
        'test',
        'assets'
    ]);

    grunt.registerTask('autoprefix', [
        'sass:autoprefixer',
        'test',
        'autoprefixer'
    ]);

    grunt.registerTask('autoAssets', [
        'sass:autoprefixer',
        'test',
        'autoprefixer',
        'assets'
    ]);

    grunt.registerTask('all', [
        'sass:production',
        'sass:autoprefixer',
        'test',
        'autoprefixer',
        'assets'
    ]);

    grunt.registerTask('assets', [
        'clean:assets',
        'copy:assets'
    ]);

    grunt.registerTask('test', [
        'sass:test',
        'csslint:test'
    ]);
};
