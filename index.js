/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-cli-substance',
  included: function(app) {
    this._super.included.apply(this, arguments);
    app.import('vendor/substance/substance.js');
  },
  isDevelopingAddon: function() {
    return true;
  },
};
