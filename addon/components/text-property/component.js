/* global $ */
import Ember from 'ember';
import Substance from 'substance';

var TextProperty = Substance.Surface.TextProperty;

var TextPropertyComponent = Ember.Component.extend(TextProperty.prototype, {

  surface: null,
  nodeId: null,
  property: null,

  path: function() {
    return [this.get('nodeId'), this.get('property')];
  }.property('nodeId', 'property'),

  getSurface: function() { return this.get('surface'); },

  getPath: function() { return this.get('path'); },

  getElement: function() { return this.element; },

  willInsertElement: function() {
    var path = this.getPath();
    var $element = $(this.element);
    $element.addClass('text-property')
      .css({
        whiteSpace: "pre-wrap"
      })
      .attr('data-path', path.join('.'));
    if (this.get('contenteditable') === true) {
      $element.prop('contentEditable', 'true');
    }
    // start listening to document changes
    this.attach();
    // render for the first time
    this.renderContent();
  },

  willDestroyElement: function() {
    this.detach();
    var doc = this.getDocument();
    var path = this.get('path');
    doc.getEventProxy('path').remove(path, this);
  },

});

export default TextPropertyComponent;