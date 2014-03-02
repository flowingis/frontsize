
module.exports = function(grunt) {
	grunt.initConfig({
		// running `grunt sass` will compile once
		sass: {
			development: {
				options: {
					style: "expanded" // nested compact compressed expanded
				},
				files: {
					"./css/frontsize.css" : "./compile.scss"
				}
			}
		},
		csso: {
            options: {
                restructure: true
            },
            production: {
                files: {
                    "css/frontsize.min.css": ["css/frontsize.css"]
                }
            }
        },
		watch: {
			files: [
				"./**/*.scss"
			],
			tasks: [
				"sass:development"
			]
		},
        csslint: {
            options: {
                csslintrc: '.csslintrc'
            },
            test: {
                options: {
                  csslintrc: '.csslintrc'
                },
                src: ['css/frontsize.css']
            }
        }
	});
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks("grunt-contrib-csslint");
	grunt.loadNpmTasks("grunt-csso");

	grunt.registerTask("test", [
        "sass:development",
        "csso:production",
        "csslint:test"
    ]);
};