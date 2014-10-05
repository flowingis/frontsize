/*

Available grunt commands

$ grunt watch:develop
$ grunt watch:fullDev
$ grunt watch:autoprefix
$ grunt watch:fullAutoprefix
$ grunt watch:all

$ grunt develop
$ grunt fullDev
$ grunt autoprefix
$ grunt fullAutoprefix
$ grunt all

*/


module.exports = function(grunt) {
	grunt.initConfig({

        compileFile     : "compile.scss",
        compileFileTest : "compile-test.scss",
        themeName       : "default",
        themeImg        : "themes/default/img/",
        testCss         : "test/frontsize.test.css",
        autoprefixerCss : "test/frontsize.autoprefixer.css",
        productionCss   : "test/frontsize.min.css",
        productionImg   : "img/theme/",

		sass: {
            production: {
                options: {
                    cleancss          : false
                },
                files: {
                    "<%= productionCss %>" : "<%= compileFile %>"
                }
            },
            autoprefixer: {
                options: {
                    cleancss          : false
                },
                files: {
                    "<%= autoprefixerCss %>" : "<%= compileFile %>"
                }
            },
            test: {
                options: {
                    cleancss          : false
                },
                files: {
                    "<%= testCss %>" : "<%= compileFileTest %>"
                }
            }
		},

        autoprefixer: {
              options: {
                    // browsers: ['> 1%', 'Firefox > 3.6', 'last 10 versions', 'ie 8', 'ie 7', 'Firefox ESR', 'Opera > 10.1'],
                    diff: true
              },
              test: {
                    src  : "<%= autoprefixerCss %>",
                    dest : "<%= autoprefixerCss %>"
              }  
        },

		watch: {
            develop : {
                files: [ "*.scss", "**/*.scss" ],
                tasks: [ "develop" ]
            },
            fullDev : {
                files: [ "*.scss", "**/*.scss" ],
                tasks: [ "fullDev" ]
            },
            autoprefix : {
                files: [ "*.scss", "**/*.scss" ],
                tasks: [ "autoprefix" ]
            },
            fullAutoprefix : {
                files: [ "*.scss", "**/*.scss" ],
                tasks: [ "fullAutoprefix" ]
            },
            all : {
                files: [ "*.scss", "**/*.scss" ],
                tasks: [ "all" ]
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
                    "<%= productionImg %>*"
                ]
            }
        },

        copy: {
            assets: {
                files: [
                    {
                        expand  : true,
                        flatten : true,
                        src     : [ "<%= themeImg %>*" ],
                        dest    : "<%= productionImg %>",
                        filter  : "isFile"
                    }
                ]
            }
        }
	});

	require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

    grunt.registerTask("develop", [
        "sass:production",
        "test"
    ]);

    grunt.registerTask("fullDev", [
        "sass:production",
        "test",
        "assets"
    ]);

    grunt.registerTask("autoprefix", [
        "sass:autoprefixer",
        "test",
        "autoprefixer"
    ]);

    grunt.registerTask("fullAutoprefix", [
        "sass:autoprefixer",
        "test",
        "autoprefixer",
        "assets"
    ]);

    grunt.registerTask("all", [
        "sass:production",
        "sass:autoprefixer",
        "test",
        "autoprefixer",
        "assets"
    ]);

    grunt.registerTask("assets", [
        "clean:assets",
        "copy:assets"
    ]);

    grunt.registerTask("test", [
        "sass:test",
        "csslint:test"
    ]);
};
