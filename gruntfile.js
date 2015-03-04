module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        
        sass: {
            dist: {
                options: {
                    //style: 'compressed',
                    precision: 10
                },
                files: {
                    'web/assets/src/css/main.css': 'web/assets/src/scss/style.scss',
                }
            },
            dev: {
                options: {
                    precision: 10
                },
                files: {
                    'web/assets/css/main.css': 'web/assets/src/scss/style.scss',
                }
            }
        },

        autoprefixer: {
            options: {
              browsers: ['last 2 version', 'ie 9']
            },
            multiple_files: {
              expand: true,
              flatten: true,
              src: 'web/assets/css/*.css',
              dest: 'web/assets/css/' 
            },
        },

        cssmin: {
                'web/assets/css/min/main.min.css': ['web/assets/css/main.css']
        },

        uglify: {
            dist: {
                options: {
                    compress: false,
                    beautify: true,
                    mangle: false
                },
                files: {
                    'web/assets/js/main.min.js': ['web/assets/src/js/*.js', 'web/assets/src/js/components/*/*.js']
                }
            },
            dev: {
                options: {
                    mangle: false,
                    compress: false,
                    beautify: true
                },
                files: {
                    '../js/main.min.js': 'js/*.js'
                }
            }
        },

        html2js: {
                /**
                * These are the templates from `src/app`.
                */
                options: {
                    //base: 'src/app'
                },
                main: {
                    src: ['web/assets/src/js/components/*/*.tpl.html'],
                    dest: 'web/assets/js/templates-app.js'
                },
        },

        watch: {
            files: ['web/assets/src/scss/**/*', 'web/assets/src/js/*.js', 'web/assets/src/js/components/*/*.js', 'web/assets/src/js/components/*/*.tpl.html'],
            tasks: 'default'
        }
    });

    // Load plugin(s) needed for task(s)
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-css');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-html2js');


    // Register task(s)
    grunt.registerTask('default', ['sass:dist','autoprefixer', 'cssmin', 'html2js', 'uglify:dist']);

};
