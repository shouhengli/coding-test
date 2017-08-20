/* eslint-env node */
'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  let app = new EmberApp(defaults, {
    'ember-cli-babel': {
      includePolyfill: true
    }
  });

  app.import({
    development: 'vendor/store.js',
    production: 'vendor/store.js'
  });

  app.import({
    development: 'bower_components/d3/d3.js',
    production: 'bower_components/d3/d3.min.js'
  });

  app.import({
    development: 'bower_components/d3-tip/index.js',
    production: 'bower_components/d3-tip/index.js'
  });

  app.import({
    development: 'bower_components/crossfilter/crossfilter.js',
    production: 'bower_components/crossfilter/crossfilter.min.js'
  });

  app.import({
    development: 'bower_components/dcjs/dc.js',
    production: 'bower_components/dcjs/dc.min.js'
  });

  app.import({
    development:
      'bower_components/dc-addons/dist/bubble-cloud/dc-bubble-cloud.js',
    production:
      'bower_components/dc-addons/dist/bubble-cloud/dc-bubble-cloud.min.js'
  });

  app.import({
    development: 'bower_components/dc-addons/dist/tooltip/dc-tooltip-mixin.js',
    production:
      'bower_components/dc-addons/dist/tooltip/dc-tooltip-mixin.min.js'
  });

  app.import({
    development: 'bower_components/dc/dc.css',
    production: 'bower_components/d3/dc.min.css'
  });

  app.import({
    development: 'bower_components/dc-addons/dist/tooltip/dc-tooltip-mixin.css',
    production:
      'bower_components/dc-addons/dist/tooltip/dc-tooltip-mixin.min.css'
  });

  return app.toTree();
};
