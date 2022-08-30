module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage'),
      require('@angular-devkit/build-angular/plugins/karma'),
    ],
    client: {
      jasmine: {
        failSpecWithNoExpectations: true,
      },
      clearContext: false, // leave Jasmine Spec Runner output visible in browser
    },
    jasmineHtmlReporter: {
      suppressAll: true, // removes the duplicated traces
    },
    fixWebpackSourcePaths: true,
    preprocessors: {
      'src/**/*.js': ['coverage'],
    },
    coverageReporter: {
      dir: require('path').join(__dirname, 'dist/coverage/tiger_template'),
      subdir: '.',
      reporters: [{ type: 'html' }, { type: 'text-summary' }],
      check: {
        global: {
          statements: 80,
          branches: 80,
          functions: 80,
          lines: 80,
        },
      },
    },
    htmlReporter: {
      outputFile: 'reports/ut/index.html',
      pageTitle: 'Unit Tests',
      subPageTitle: 'SR-Dashboard',
      groupSuites: true,
      useCompactStyle: true,
      useLegacyStyle: true,
    },
    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    restartOnFileChange: true,
  });
};
