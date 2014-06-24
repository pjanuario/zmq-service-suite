module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    watch: {
      files: '<%= jshint.files %>',
      tasks: ['jshint', 'unit']
    },

    jshint: {
      files: [
        'Gruntfile.js',
        'client/lib/**/*.js', 'client/spec/**/*.js',
        'core/lib/**/*.js', 'core/spec/**/*.js',
        'service_directory/lib/**/*.js', 'service_directory/spec/**/*.js'
      ],
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
          global: false,
          expect: false,
          describe: false,
          before: false,
          beforeEach: false,
          afterEach: false,
          it: false,
          xit: false,
          setup: false,
          suite: false,
          teardown: false,
          test: false,
          jasmine: false,
          module: false,
          spyOn: false,
          require: false,
          __dirname: false,
          waits: false,
          waitsFor: false,
          runs: false,
          exports: false,
          process: false
        }
      }
    },

    jasmine_node: {
      coverage: {
        options : {
          failTask: true,
          branches : 100 ,
          functions: 100,
          statements: 100,
          lines: 100
        }
      },
      options: {
        forceExit: true,
        match: '.',
        matchall: false,
        extensions: 'js',
        specNameMatcher: '_spec',
        growl: true
      },
      unit: ['core/spec/unit/', 'client/spec/unit/', 'service_directory/spec/unit/'],
      integration: ['core/spec/integration/', 'client/spec/integration/', 'service_directory/spec/integration/']
    },

    env: {
      test: {
        NODE_ENV : 'test'
      }
    }
  });

  grunt.loadNpmTasks('grunt-jasmine-node-coverage-validation');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-env');

  grunt.registerTask('default', ['watch']);
  grunt.registerTask('unit', ['env:test', 'jasmine_node:unit']);
  grunt.registerTask('integration', ['env:test', 'jasmine_node:integration']);
  grunt.registerTask('test', ['jshint', 'unit', 'integration']);
};
