module.exports = function(grunt) {
	grunt.initConfig({
		// running `grunt sass` will compile once
		sass: {
			development: {
				options: {
					compress          : false,
                    cleancss          : false,
                    strictUnits       : true,
                    dumpLineNumbers   : "comments",
                    sourceMap         : true,
                    sourceMapFilename : "test/frontsize.map.css"
				},
				files: {
					"test/frontsize.css" : "compile.scss"
				}
			},
            test: {
                options: {
                    compress          : false,
                    cleancss          : false,
                    strictUnits       : true,
                    dumpLineNumbers   : "comments",
                    sourceMap         : true,
                    sourceMapFilename : "test/frontsize.test.map.css"
                },
                files: {
                    "test/frontsize.test.css" : "test.scss"
                }
            },
            testAutoprefixer: {
                options: {
                    compress          : false,
                    cleancss          : false,
                    strictUnits       : true,
                    dumpLineNumbers   : "comments",
                    sourceMap         : true,
                    sourceMapFilename : "test/frontsize.autoprefixer.map.css",
                    modifyVars: {
                        "use-css-prefix": false
                    }
                },
                files: {
                    "test/frontsize.test.autoprefixed.css" : "test_autoprefixed.scss"
                }
            }
		},

        autoprefixer: {
              options: {
                    // browsers: ['> 1%', 'Firefox > 3.6', 'last 10 versions', 'ie 8', 'ie 7', 'Firefox ESR', 'Opera > 10.1'],
                    diff: true
              },
              test: {
                    src: "test/frontsize.test.autoprefixed.css",
                    dest: "test/frontsize.autoprefixed.css"
              }  
        },
        
		csso: {
            options: {
                restructure: true
            },
            production: {
                files: {
                    "test/frontsize.min.css": ["test/frontsize.css"]
                }
            },
            test: {
                files: {
                    "test/frontsize.test.min.css": ["test/frontsize.test.css"]
                }
            },
            testAutoprefixer: {
                files: {
                    "test/frontsize.test.min.css": ["test/frontsize.test.autoprefixer.css"]
                }
            },
            autoprefixer: {
                files: {
                    "test/frontsize.autoprefixer.min.css": ["test/frontsize.autoprefixer.css"]
                }
            }
        },

		watch: {
			development : {
                files: [
                    "*.scss",
                    "**/*.scss"
                ],
                tasks: [
                    "sass:development",
                    "csso:production"
                ]
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
            },
            testMin: {
                options: {
                  csslintrc: '.csslintrc'
                },
                src: ['test/frontsize.test.min.css']
            },
            testPrefixed: {
                options: {
                  csslintrc: '.csslintrc'
                },
                src: ['test/frontsize.prefixed.css']

            }
        },

        phantomcss: {
            options: {},
            your_target: {
                options: {
                    screenshots: 'test/screenshots/',
                    results: 'results/'
                },
                src: [
                    'test/**/*.js'
                ]
            }
        }
	});

	require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

    grunt.registerTask("prefix", [ 
        "sass:test", 
        "autoprefixer:default",
        "csslint:testPrefixed" 
    ]);

    grunt.registerTask("test_all", [
        "test",
        "testAutoprefixer",
        "test_min",
        "production"
    ]);

	grunt.registerTask("test", [
        "sass:test",
        "csso:test",
        "csslint:test"
    ]);

    grunt.registerTask("testAutoprefixer", [
        "sass:testAutoprefixer",
        "autoprefixer",
        "csso:testAutoprefixer",
        "csso:autoprefixer",
        "csslint:test"
    ]);

    grunt.registerTask("test_min", [
        "sass:test",
        "csso:test",
        "csslint:testMin"
    ]);

    grunt.registerTask("production", [
        "sass:development",
        "csso:production"
    ]);

};
