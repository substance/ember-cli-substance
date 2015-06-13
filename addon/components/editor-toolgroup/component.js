import Ember from 'ember';

var EditorToolgroup = Ember.Component.extend({
  isToolGroup: true,

  classNames: ['editor-toolgroup'],
  isDisabled: true,
  disabledBinding: 'isDisabled',
  classNameBindings: ['isDisabled:disabled:enabled'],

  update: function() {
    var children = this.get('childViews');
    var isDisabled = true;
    children.forEach(function(child) {
      if (child.get('isEnabled')) {
        isDisabled = false;
      }
    });
    this.set('isDisabled', isDisabled);
  },
});

export default EditorToolgroup;
