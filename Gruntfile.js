module.exports = function(grunt) {
	grunt.initConfig({
		// running `grunt sass` will compile once
		sass: {
			development: {
				options: {
					compress: false,
                    cleancss: false
				},
				files: {
					"test/frontsize.css" : "compile.scss"
				}
			},
            test: {
                options: {
                    compress: false,
                    cleancss: false
                },
                files: {
                    "test/frontsize.css" : "test.scss"
                }
            }
		},

        autoprefixer: {
              options: {
                    // browsers: ['> 1%', 'Firefox > 3.6', 'last 10 versions', 'ie 8', 'ie 7', 'Firefox ESR', 'Opera > 10.1'],
                    diff: true
              },
              default: {
                    src: "test/frontsize.css",
                    dest: "test/frontsize.prefixed.css"
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
                src: ['test/frontsize.css']
            },
            test_min: {
                options: {
                  csslintrc: '.csslintrc'
                },
                src: ['test/frontsize.min.css']
            },
            test_prefixed: {
                options: {
                  csslintrc: '.csslintrc'
                },
                src: ['test/frontsize.prefixed.css']
            }
        }
	});

	require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

    grunt.registerTask("prefix", [ 
        "sass:test", 
        "autoprefixer:default",
        "csslint:test_prefixed" 
    ]);

	grunt.registerTask("test", [
        "sass:test",
        "csslint:test"
    ]);

    grunt.registerTask("test_min", [
        "sass:test",
        "csso:production",
        "csslint:test_min"
    ]);
};