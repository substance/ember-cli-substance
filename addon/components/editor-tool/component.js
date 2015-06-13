import Ember from 'ember';

var EditorToolComponent = Ember.Component.extend({
  isTool: true,

  classNames: ['editor-tool'],
  tagName: 'a',
  href: '#',

  isVisible: true,
  isEnabled: false,
  isSelected: false,
  classNameBindings: ['isVisible::hidden', 'isEnabled:enabled:disabled', 'isSelected:selected:'],

  // defined in template
  command: null,

  // injested by toolbar
  tool: null,

  attach: function() {
    var tool =this.get('tool');
    if (tool) {
      tool.connect(this, {
        "toolstate:changed": this.updateState
      });
    }
  }.observes('tool'),

  detach: function() {
    var tool = this.get('tool');
    if (tool) {
      tool.disconnect(this);
    }
  }.on('willDestroyElement'),

  updateState: function(toolState) {
    this.set('isEnabled', toolState.enabled);
    this.set('isActive', toolState.selected);
  },

  mouseDown: function(e) {
    e.preventDefault();
    e.stopPropagation();
    var tool = this.get('tool');
    if (tool) {
      tool.performAction();
    } else {
      console.error('Tool not attached.');
    }
  },
});

export default EditorToolComponent;
