/*
Dawson Reid
Glavin Wiechert
*/

module.exports = function(grunt) {

    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // server
        express: {
            all: {
                options: {
                    port: 8123, 
                    hostname: '0.0.0.0',
                    bases: [ "dist", "tests", "bower_components" ],
                    livereload: true
                }
            }
        },
        open: {
            all: {
                path: 'http://localhost:8123/docs/index.html'
            }
        },

        // Compile 
        uglify : {
            compile: {
                files: {
                    'dist/streamlyne.min.js': [ 'src/streamlyne.js' ]
                    , 'dist/streamlyne.tests.min.js': [ 'src/streamlyne.tests.js' ]
                }
            }
        },

        // Documentation
        jsdoc: {
            dist: {
                src: [
                    "src/*.js"
                    , "README.md"
                ]
                , options: {
                    destination: 'dist/docs/'
                    , recurse: true
                    , tutorials: 'tutorials'
                    , configure: "./docs-conf.json"
                }
            }
        },

        // file watchers
        watch: {
            options: {
                livereload: true
            },
            js: {
                files: [
                    'src/*.js'
                ],
                tasks: [
                    'uglify:compile'
                ]
            },

            // server reload
            server: {
                options: {
                    nospawn: true
                },
                files: [
                    'README.md'
                    , 'src/*.js'
                    , 'tests/*.html'
                    , 'tutorials/*.md'
                    
                ], 
                tasks: [
                    'jsdoc:dist',
                    'express'
                ]
            }

        }
  });

  grunt.registerTask('compile', [
    'uglify:compile',
    'jsdoc:dist'
  ]);

  // Default task(s).
  grunt.registerTask('server', [
    'express',
    'open',
    'watch'
  ]);
  grunt.registerTask('default', [
    'compile',
    'server'
  ]);

  grunt.loadNpmTasks('grunt-contrib-watch');
  
};

