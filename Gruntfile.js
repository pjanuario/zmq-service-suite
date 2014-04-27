module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    watch: {
      files: '<%= jshint.files %>',
      tasks: ['default', 'test']
    },

    jshint: {
      files: ['Gruntfile.js', 'index.js', '**/spec/**/*.js'],
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        browser: true,
        jquery: true,
        globals: {
          _: false,
          console: false,
          expect: false,
          describe: false,
          before: false,
          beforeEach: false,
          afterEach: false,
          it: false,
          setup: false,
          suite: false,
          teardown: false,
          test: false,
          jasmine: false,
          module: false,
          spyOn: false,
          require: false,
          __dirname: false,
          waitsFor: false,
          runs: false,
          exports: false,
          process: false
        }
      }
    },

    jasmine_node: {
      coverage: {},
      options: {
        forceExit: true,
        match: '.',
        matchall: false,
        extensions: 'js',
        specNameMatcher: '_spec'
      }
    },

    env: {
      test: {
        NODE_ENV : 'test'
      }
    }
  });

  grunt.registerTask('default', ['jshint']);
  grunt.registerTask('test', ['jasmine_node']);

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-jasmine-node-coverage');
};
