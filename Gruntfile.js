/*

Available grunt commands

# Compiles Frontsize
# is uses [minify, lint]
$ grunt frontsize
$ grunt watch:frontsize

# Compiles Frontsize, it copy its assets and lint the CSS
# it uses [assets, minify, lint]
$ grunt frontsize-assets
$ grunt watch:frontsize-assets

# Generates the CSS file optimized with uncss
$ grunt uncss
$ grunt watch:uncss

# Tests FRONTsize theme with all mixins, it's for development
$ grunt test
$ grunt watch:test

*/

'use strict';

module.exports = function(grunt) {

    grunt.initConfig({
        f : grunt.file.readYAML('frontsize.yml'),

        sass : {
            production : {
                options : {
                    sourcemap : 'auto',
                    cleancss : false,
                    style : 'expanded'
                },
                files : {
                    '<%= f.prodCssPath %><%= f.prodCssName %>' : '<%= f.compile %>'
                }
            },
            lint : {
                options : {
                    cleancss : false,
                    style : 'expanded'
                },
                files : {
                    '<%= f.frontsizePath %><%= f.testCssPath %><%= f.testCssName %>' : '<%= f.compileTest %>'
                }
            },
            test : {
                options : {
                    cleancss : false,
                    style : 'expanded'
                },
                files : {
                    'test/csslint/frontsize.test.css' : 'test/frontsize/test.scss'
                }
            }
        },

        watch: {
            options : {
                atBegin : true
            },
            frontsize : {
                files: [ '*.scss', '**/*.scss' ],
                tasks: [ 'frontsize' ]
            },
            'frontsize-assets' : {
                files: [ '*.scss', '**/*.scss' ],
                tasks: [ 'frnAssets' ]
            },
            test : {
                files: [ '*.scss', '**/*.scss' ],
                tasks: [ 'test' ]
            },
            uncss : {
                files: [ '*.html', '**/*.html' ],
                tasks: [ 'uncss' ]
            }
        },

        csslint: {
            options: {
                csslintrc: '.csslintrc'
            },
            lint: {
                options: {
                    csslintrc: '.csslintrc'
                },
                src: [ '<%= f.frontsizePath %><%= f.testCssPath %><%= f.testCssName %>' ]
            },
            test: {
                options: {
                    csslintrc: 'test/.csslintrc'
                },
                src: [ 'test/csslint/frontsize.test.css' ]
            }
        },

        cssmin: {
            options: {
                shorthandCompacting: false,
                roundingPrecision: -1,
                report:'min'
            },
            target: {
                files: {
                    '<%= f.prodCssPath %><%= f.prodCssName %>': ['<%= f.prodCssPath %><%= f.prodCssName %>']
                }
            }
        },

        clean: {
            assets: {
                src: [
                    '<%= f.prodImgPath %>*',
                    '<%= f.prodFontsPath %>*'
                ]
            },
            removeEmpty: {
                src:[
                    '<%= f.prodImgPath %>empty',
                    '<%= f.prodFontsPath %>empty',
                ]
            }
        },

        copy: {
            assets: {
                files: [
                    {
                        expand  : true,
                        flatten : true,
                        src     : [ '<%= f.frontsizePath %>themes/<%= f.themeName %>/img/*' ],
                        dest    : '<%= f.prodImgPath %>',
                        filter  : 'isFile'
                    },{
                        expand  : true,
                        flatten : true,
                        src     : [ '<%= f.frontsizePath %>themes/<%= f.themeName %>/fonts/*' ],
                        dest    : '<%= f.prodFontsPath %>',
                        filter  : 'isFile'
                    }
                ]
            }
        },

        uncss: {
            dist: {
                files: {
                    '<%= f.uncss %>': '<%= f.uncssTemplates %>'
                }
            }
        },

        stylestats: {
            options: {
                size                   : true,
                gzippedSize            : false,
                simplicity             : true,
                rules                  : true,
                selectors              : true,
                lowestCohesion         : true,
                lowestCohesionSelector : true,
                totalUniqueFontSizes   : true,
                uniqueFontSize         : true,
                totalUniqueColors      : true,
                uniqueColor            : true,
                idSelectors            : true,
                universalSelectors     : true,
                importantKeywords      : true,
                mediaQueries           : true
            },
            src: [ '<%= f.frontsizePath %><%= f.testCssPath %><%= f.testCssName %>' ]
        }
    });

    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.registerTask('default', [
        'watch:frontsize'
    ]);

    grunt.registerTask('frontsize', [
        'sass:production',
        'minify',
        'lint'
    ]);

    grunt.registerTask('frontsize-assets', [
        'sass:production',
        'clean',
        'assets',
        'minify',
        'lint'
    ]);

    grunt.registerTask('assets', [
        'clean:assets',
        'copy:assets'
    ]);

    grunt.registerTask('minify', [
        'cssmin',
        'stylestats'
    ]);

    grunt.registerTask('lint', [
        'sass:lint',
        'csslint:lint'
    ]);

    grunt.registerTask('test', [
        'sass:test',
        'csslint:test'
    ]);

};
