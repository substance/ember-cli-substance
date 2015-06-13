import Ember from 'ember';

var NodeProxy = {};

NodeProxy.create = function(node, componentName) {
  return Ember.Object.create({
    originalNode: Object.create(node),

    componentName: componentName,

    unknownProperty: function (key) {
      var val = this.get('originalNode')[key]
      return val;
    },

    getDocument: function() {
      return this.get('originalNode').getDocument();
    }
  });
};

export default NodeProxy;
