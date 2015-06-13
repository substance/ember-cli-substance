import Ember from 'ember';
import Substance from 'substance';
var _ = Substance._;

var EditorToolbar = Ember.Component.extend({
  classNames: ['editor-toolbar'],

  tools: null,

  toolComponents: null,
  toolGroups: null,

  extractComponents: function() {
    console.log('Extracting tool components');
    var toolComponents = [];
    var toolGroups = [];
    function _extractToolComponents(view) {
      // HACK: check if the view is an Ember.Component
      if (!view.get) {
        return;
      }
      if (view.isTool) {
        toolComponents.push(view);
        return;
      }
      if (view.isToolGroup) {
        toolGroups.push(view);
      }
      var childViews = view.get('childViews');
      if (childViews) {
        childViews.forEach(function(childView) {
          _extractToolComponents(childView);
        });
      }
    }
    _extractToolComponents(this);
    this.set('toolComponents', toolComponents);
    this.set('toolGroups', toolGroups);
  }.on('didInsertElement'),

  attachTools: function() {
    var tools = this.get('tools');
    var toolComponents = this.get('toolComponents');
    _.each(toolComponents, function(toolComponent) {
      var command = toolComponent.get('command');
      var tool = tools[command];
      if (tool) {
        toolComponent.set('tool', tool);
      }
    });
  }.observes('tools', 'toolComponents'),

  update: function(surface, sel) {
    var tools = this.get('tools');
    // Update tool states which will trigger events which the ToolComponents
    // should listen to
    _.each(tools, function(tool) {
      //TODO: check if the tool has been blacklisted
      tool.update(surface, sel);
    });

    // Update tool groups which will be disabled when no tool is active
    var toolGroups = this.get('toolGroups');
    _.each(toolGroups, function(toolGroup) {
      toolGroup.update(surface, sel);
    });
  },
});

export default EditorToolbar;
