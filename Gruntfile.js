module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    watch: {
      files: '<%= jshint.files %>',
      tasks: ['default', 'unit']
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

    bgShell: {
      coverage: {
        cmd: 'node node_modules/istanbul/lib/cli.js cover --dir build/coverage jasmine-node -- . --forceexit'
      },
      coverage_travis: {
        cmd: 'istanbul cover --dir build/coverage jasmine-node -- . --forceexit'
      },
      codeclimate: {
        cmd: 'CODECLIMATE_REPO_TOKEN=33713e494c429b445b85aa1ae1036c30fc601b89275a720ce27b78eee330fdf4 codeclimate < ./build/coverage/lcov.info'
      }
    },

    jasmine_node: {
      options: {
        forceExit: true,
        extensions: 'js',
        specNameMatcher: '_spec',
        growl: true,
        isVerbose: false
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

  grunt.registerTask('default', ['jshint']);
  grunt.registerTask('unit', ['env:test', 'jasmine_node:unit']);
  grunt.registerTask('integration', ['env:test', 'jasmine_node:integration']);
  grunt.registerTask('test', ['unit', 'integration']);
  grunt.registerTask('cover', ['bgShell:coverage']);
  grunt.registerTask('codeclimate', ['bgShell:coverage_travis', 'bgShell:codeclimate']);

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-jasmine-node');
  grunt.loadNpmTasks('grunt-bg-shell');
  grunt.loadNpmTasks('grunt-env');
};
