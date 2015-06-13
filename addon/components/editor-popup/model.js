import Ember from 'ember';
import NodeProxy from '../../lib/node-proxy';

var EditorPopupModel = Ember.Object.extend({

  popup: null,
  mode: 'hidden',
  tool: null,
  node: null,

  componentName: function() {
    var tool = this.get('tool');
    return (tool?"popup/"+tool.getName():"popup/default");
  }.property('tool'),

  preview: function() {
    return (this.get('mode') === 'preview');
  }.property('mode'),

  edit: function() {
    return (this.get('mode') === 'edit');
  }.property('mode'),

  setup: function() {
    var tool = this.get('tool');
    if (tool) {
      var toolState = tool.getToolState();
      if (toolState.annos.length === 1) {
        var node = toolState.annos[0];
        var nodeProxy = NodeProxy.create(node);
        this.set('node', nodeProxy);
      } else {
        this.set('node', null);
      }
    } else {
      this.set('node', null);
    }
  }.observes('tool')
});

export default EditorPopupModel;
