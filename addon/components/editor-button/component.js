import Ember from 'ember';

var EditorButton = Ember.Component.extend({
  tagName: 'a',
  href: '#',
  classNames: ['editor-button', 'btn'],
  action: "none",

  bindNativeMouseDown: function() {
    this.element.addEventListener('mousedown', function(e) {
      e.preventDefault();
      e.stopPropagation();
      this.get('parentView').send(this.get('action'));
    }.bind(this), false);
  }.on('willInsertElement'),

});

export default EditorButton;
