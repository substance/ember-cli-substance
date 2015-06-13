import EditorToolgroup from '../editor-toolgroup/component';
import layout from './template';

var EditorDropdownComponent = EditorToolgroup.extend({
  layout: layout,
  classNames: ['editor-dropdown', 'dropdown'],

  mouseDown: function() {
    return false;
  }
});

export default EditorDropdownComponent;
