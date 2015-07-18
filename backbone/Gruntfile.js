module.exports = function (grunt) {

  require('jit-grunt')(grunt);
  require('time-grunt')(grunt);

  grunt.initConfig({

    path: {
      src: './src',
      env: './dev'
    },

    clean: {
      all: ['<%= path.env %>']
    },

    eslint: {
      options: {
      },
      target: ['<%= path.src %>/js/**/*.js']
    },

    assemble: {
      options: {
        layoutdir: '<%= path.src %>/layouts',
        partials: ['<%= path.src %>/partials/*.hbs'],
        helpers: [
          'handlebars-helper-prettify'
        ]
      },
      all: {
        options: {
          layout: 'default.hbs'
        },
        files: [
          {
            expand: true,
            cwd: '<%= path.src %>/pages',
            src: '**/*.hbs',
            dest: '<%= path.env %>'
          }
        ]
      }
    },

    browserify: {
      all: {
        files: [
          {
            expand: true,
            cwd: '<%= path.src %>/js',
            src: ['*.js'],
            dest: '<%= path.env %>/js/'
          }
        ]
      }
    },

    watch: {
      options: {
        spawn: false
      },
      html: {
        files: ['<%= path.src %>/**/*.hbs'],
        tasks: ['assemble']
      },
      js: {
        files: ['<%= path.src %>/js/**/*.js'],
        tasks: ['browserify']
      }
    },

    browserSync: {
      all: {
        options: {
          watchTask: true,
          server: {
            baseDir: '<%= path.env %>'
          }
        },
        bsFiles: {
          src: [
            '<%= path.env %>/**/*.html'
          ]
        }
      }
    }
  });


  grunt.registerTask('default', ['clean', 'eslint']);

  grunt.registerTask('serve', 'local server', function () {
    grunt.config.set('path.env', './dev');
    grunt.task.run(['clean', 'eslint', 'assemble', 'browserify', 'browserSync', 'watch']);
  });
};
