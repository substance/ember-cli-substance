import Ember from 'ember';
import Substance from 'substance';
import NodeProxy from './node-proxy';

var NodeArray = Ember.ArrayProxy.extend({

  doc: null,
  path: null,
  componentPrefix: '',

  setup: function() {
    this.set('content', Ember.A());
    var doc = this.get('doc');
    doc.connect(this, {
      'document:changed': this.onDocumentChange
    });
    this.rebuild();
  }.on('init'),

  dispose: function() {
    var doc = this.get('doc');
    doc.disconnect(this);
  },

  rebuild: function() {
    var doc = this.get('doc');
    var path = this.get('path');
    var nodeIds = doc.get(path);
    this.clear();
    for (var i = 0; i < nodeIds.length; i++) {
      var node = doc.get(nodeIds[i]);
      this.pushObject(this.wrapNode(node));
    }
  },

  wrapNode: function(node) {
    // console.log('Wrapping node', node.toJSON());
    Ember.assert('Node should not be null', node != null );

    var componentPrefix = this.get('componentPrefix');
    var componentName = componentPrefix ? (componentPrefix+"/"+node.type) : node.type;
    var nodeProxy = NodeProxy.create(node, componentName);
    return nodeProxy;
  },

  onDocumentChange: function(change) {
    var path = this.get('path');
    if (!change.isAffected(path)) {
      return;
    }
    // go through the ops and apply the change to this array
    for (var i = 0; i < change.ops.length; i++) {
      var op = change.ops[i];
      if (Substance.isEqual(op.path, path)) {
        if (op.type === "update") {
          this.applyDiff(op.diff);
        } else if (op.type === "set") {
          this.rebuild();
        }
      }
    }
  },

  applyDiff: function(op) {
    var doc = this.get('doc');
    var offset = op.getOffset();
    var nodeId = op.getValue();
    if (op.isInsert()) {
      var node = doc.get(nodeId);
      this.insertAt(offset, this.wrapNode(node));
    } else if (op.isDelete()) {
      var wrapper = this.objectAt(offset);
      Ember.assert('NodeArray should contain a wrapper with the same id at position ' + offset,
        wrapper.get('id') === nodeId );
      this.removeAt(offset);
     }
  },

});

export default NodeArray;
