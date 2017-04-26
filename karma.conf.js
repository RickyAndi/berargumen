const stringify = require('stringify');

module.exports = config => {
  config.set({
    basePath: './',
    frameworks: ['mocha', 'sinon', 'browserify'],
    files: [
        './client-src/tests/**/*Spec.js',
    ],
    exclude: [
    ],
    browserify: {
      configure: bundle => {
        bundle.once('prebundle', () => {
          bundle
            .transform("babelify", { presets: ["es2015"]})
            .transform(stringify, {
                appliesTo: { includeExtensions: ['.html'] }
            });
        });
      }
    },
    preprocessors: {
        'client-src/**/*.js' : ['browserify']
    },
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    concurrency: Infinity,
    customLaunchers: {
      'PhantomJS_custom': {
        base: 'PhantomJS',
        options: {
          windowName: 'my-window',
          settings: {
            webSecurityEnabled: false
          },
        },
        flags: ['--load-images=true'],
        debug: true
      }
    },
 
    phantomjsLauncher: {
      exitOnResourceError: true
    }
  });
};

