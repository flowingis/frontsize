'use strict';

module.exports = function(grunt) {

    var cssTestFileName = 'frontsize.csslint.css';

    var frontsize = grunt.file.readYAML('frontsize.yml');
    if (frontsize.vendors !== undefined && frontsize.vendors.css !== undefined) {
        frontsize.css = frontsize.vendors.css.slice(0);
        frontsize.css.push(frontsize.path.test + cssTestFileName);
    }

    frontsize.watchFiles = [
        frontsize.path.frontsize + 'themes/**/*.scss',
        frontsize.path.frontsize + 'themes/**/img/**/*',
        frontsize.path.frontsize + 'themes/**/fonts/**/*'
    ];

    if (frontsize.js !== undefined && frontsize.js.watch !== undefined) {
        frontsize.watchFiles.push(frontsize.js.watch);
    }

    grunt.initConfig({

        f                   : frontsize,
        cssFileName         : 'frontsize-theme.min.css',
        cssTestFileName     : cssTestFileName,
        compileFile         : 'compile.scss',
        cssVendorsFileName  : 'vendors.min.css',
        jsFileName          : 'frontsize.min.js',
        cssMergeFileName    : 'frontsize.min.css',

        sass : {
            dist : {
                options : {
                    sourcemap : 'auto',
                    cleancss : false,
                    style : 'expanded'
                },
                files : {
                    '<%= f.path.css %><%= cssFileName %>' : '<%= f.path.frontsize %><%= compileFile %>'
                }
            },
            lint : {
                options : {
                    cleancss : false,
                    style : 'expanded'
                },
                files : {
                    '<%= f.path.test %><%= cssTestFileName %>' : '<%= f.path.frontsize %><%= compileFile %>'
                }
            },
            test : {
                options : {
                    cleancss : false,
                    style : 'expanded'
                },
                files : {
                    '<%= f.path.test %>frontsize.test.css' : 'test/frontsize/test.scss',
                    'test/html/css/frontsize.test.css' : 'test/frontsize/test.scss',
                }
            }
        },

        cssmin: {
            vendors: {
                files: {
                    '<%= f.path.css %><%= cssVendorsFileName %>': '<%= f.vendors.css %>'
                }
            },
            merge: {
                files: {
                    '<%= f.path.css %><%= cssMergeFileName %>': '<%= f.css %>'
                }
            }
        },

        uglify: {
            options: {
                sourceMap: true
            },
            vendors: {
                files: {
                    '<%= f.path.js %><%= jsFileName %>': '<%= f.js.files %>'
                }
            }
        },

        watch: {
            options : {
                atBegin : true
            },
            frontsize : {
                files: '<%= f.watchFiles %>',
                tasks: [ 'frontsize:build' ]
            }
        },

        csslint: {
            options: {
                csslintrc: '.csslintrc'
            },
            dist: {
                options: {
                    csslintrc: '.csslintrc'
                },
                src: [ '<%= f.path.test %><%= cssTestFileName %>' ]
            },
            test: {
                options: {
                    csslintrc: 'test/.csslintrc'
                },
                src: [ '<%= f.path.test %>frontsize.test.css' ]
            }
        },

        copy: {
            themeAssets: {
                files: [
                    {
                        expand  : true,
                        flatten : true,
                        src     : [ '<%= f.path.frontsize %>themes/<%= f.theme %>/img/*' ],
                        dest    : '<%= f.path.images %>',
                        filter  : 'isFile'
                    },{
                        expand  : true,
                        flatten : true,
                        src     : [ '<%= f.path.frontsize %>themes/<%= f.theme %>/fonts/*' ],
                        dest    : '<%= f.path.fonts %>',
                        filter  : 'isFile'
                    }
                ]
            },
            vendorsFontAssets: {
                files: [
                    {
                        expand  : true,
                        flatten : true,
                        src     : '<%= f.vendors.images %>',
                        dest    : '<%= f.path.images %>',
                        filter  : 'isFile'
                    },
                    {
                        expand  : true,
                        flatten : true,
                        src     : '<%= f.vendors.fonts %>',
                        dest    : '<%= f.path.fonts %>',
                        filter  : 'isFile'
                    }
                ]
            },
            vendorsImageAssets: {
                files: [
                    {
                        expand  : true,
                        flatten : true,
                        src     : '<%= f.vendors.images %>',
                        dest    : '<%= f.path.images %>',
                        filter  : 'isFile'
                    }
                ]
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
            src: [ '<%= f.path.test %><%= cssTestFileName %>' ]
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-stylestats');

    grunt.registerTask('default', [
        'frontsize:watch'
    ]);

    grunt.registerTask('frontsize:build', [
        'frontsize:assets',
        'frontsize:vendors',
        'frontsize:js',
        'frontsize:css',
        'frontsize:merge',
        'frontsize:report'
    ]);

    grunt.registerTask('frontsize:watch', [
        'watch:frontsize'
    ]);

    grunt.registerTask('frontsize:report', [
        'stylestats'
    ]);

    grunt.registerTask('frontsize:test', [
        'sass:test',
        'csslint:test',
    ]);

    grunt.registerTask('frontsize:css', [
        'sass:dist',
        'csslint:dist',
    ]);

    if (frontsize.vendors !== undefined) {
        var vendorTasks = [];
        if (frontsize.vendors.css !== undefined) {
            vendorTasks.push('frontsize:vendors:css');
            grunt.registerTask('frontsize:vendors:css', [
                'cssmin:vendors'
            ]);
            grunt.registerTask('frontsize:merge', [
                'cssmin:merge'
            ]);
        } else {
            grunt.registerTask('frontsize:vendors:css', []);
            grunt.registerTask('frontsize:merge', []);
        }

        if (frontsize.vendors.fonts !== undefined) {
            vendorTasks.push('frontsize:vendors:fonts');
            grunt.registerTask('frontsize:vendors:fonts', [
                'copy:vendorsFontAssets'
            ]);
        } else {
            grunt.registerTask('frontsize:vendors:fonts', []);
        }

        if (frontsize.vendors.images !== undefined) {
            vendorTasks.push('frontsize:vendors:images');
            grunt.registerTask('frontsize:vendors:images', [
                'copy:vendorsImageAssets'
            ]);
        } else {
            grunt.registerTask('frontsize:vendors:images', []);
        }
        grunt.registerTask('frontsize:vendors', vendorTasks);
    } else {
        grunt.registerTask('frontsize:vendors', []);
    }

    if (frontsize.js !== undefined && frontsize.js.files !== undefined) {
        grunt.registerTask('frontsize:js', [
            'uglify:vendors'
        ]);
    } else {
        grunt.registerTask('frontsize:js', []);
    }

    grunt.registerTask('frontsize:assets', [
        'copy:themeAssets'
    ]);

};
