import Ember from 'ember';
import EditorPopupModel from './model';
import Substance from 'substance';
var _ = Substance._;

var EditorPopupComponent = Ember.Component.extend({
  classNames: ['editor-popup'],

  tools: null,

  $anchor: null,
  $container: null,
  $target: null,
  nodeId: null,
  popupState: null,

  isVisible: false,
  name: null,

  setupState: function() {
    this.set('popupState', EditorPopupModel.create({
      popup: this
    }));
  }.on('init'),

  initialize: function() {
    var $element = this.$(this.element);
    $element.css({display: 'none'})
      //# prevent bubbling of mouse down events up to the surface
      .on('mousedown', function(e) {
        e.stopPropagation();
      });
    var $anchor = $element.find('.editor-popup-anchor');
    var $container = $element.find('.editor-popup-container');
    // HACK: as I could not figure out how to use the component's template
    // together with paper/edit/route.render this check is done to be sure
    // the elements are there
    if ($anchor.length === 0 || $container.length === 0) {
      throw new Error('FIXME: expecting ".editor-popup-anchor" and ".editor-popup-container" inside this element.');
    }
    this.set('$anchor', $anchor);
    this.set('$container', $container);
  }.on('willInsertElement'),

  updateSurfaceMode: function() {
    var state = this.get('popupState');
    var tool = this.get('popupState.tool');
    if (!tool) {
      return;
    }
    if (state.mode === 'edit') {
      tool.getSurface().freeze();
    } else {
      tool.getSurface().unfreeze();
    }
  }.observes('popupState.mode'),

  attach: function() {
    _.each(this.get('tools'), function(tool) {
      if (tool.popup) {
        tool.connect(this, {
          "toolstate:changed": this.onStateChange
        });
      }
    }, this);
  }.on('init'),

  detach: function() {
    _.each(this.get('tools'), function(tool) {
      tool.disconnect(this);
    }, this);
  }.on('willDestroyElement'),

  onStateChange: function(toolState, tool) {
    // console.log('EditorPopupComponent.onStateChange', toolState, tool.getName(), @get('name'), @get('nodeId'))
    var isVisible = this.get('isVisible');
    if (toolState.showPopup) {
      if (this.get('name') !== tool.getName()) {
        this.closePopup(tool);
      }
      if (!isVisible) {
        this.showPopup(tool);
      } else if (this.get('nodeId') !== toolState.annos[0].id) {
        this.closePopup(tool);
        this.showPopup(tool);
      } else {
        tool.getSurface().updateCaretElement();
        this.updatePosition();
      }
    } else if (isVisible && tool.getName() === this.get('name')  && !toolState.enabled) {
      this.closePopup(tool);
    }
  },

  showPopup: function(tool) {
    var $element = this.$(this.element);
    $element.css({ display:'block', visibility: 'hidden'});
    var $container = this.get('$container');

    // retrieve the element in the manuscript which this popup is bound to
    // - when an new node is created, we need to insert an anchor element
    //   into the surface (view only)
    // - otherwise we use the node of the edited annotation
    var toolState = tool.getToolState();
    var surface = tool.getSurface();
    surface.$element.append($element);
    console.log('Show popup for surface', surface.__id__);
    var $target = surface.placeCaretElement();
    this.set('$target', $target);
    this.set('popupState.tool', tool);
    this.set('popupState.mode', 'preview');

    var nodeId;
    if (toolState.mode === 'create') {
      nodeId = "new";
    } else {
      nodeId = toolState.annos[0].id;
    }
    // Note: your route needs to implement an action handler 'renderToolPopup'
    // wich  let sombody render the popup content
    // HACK: using @sendAction does not have an effect
    // TODO: how to do this using @sendAction?
    this.get('parentView').send('renderToolPopup', this, tool);

    $element.append($container);
    this.updatePosition();
    this.updateDimensions();

    this.set('isVisible', true);
    this.set('name', tool.getName());
    this.set('nodeId', nodeId);
  },

  closePopup: function(tool) {
    // console.log('Closing popup', @get('name'))
    var $element = this.$(this.element);
    $element.css({ display: 'none' });
    var surface = tool.getSurface();
    surface.removeCaretElement();
    surface.unfreeze();

    this.set('popupState.tool', null);
    this.set('popupState.mode', 'hidden');

    this.set('isVisible', false);
    this.set('name', null);
    this.set( 'nodeId', null);
    this.set('$target', null);
  },

  updateDimensions: function() {
    var $element = this.$(this.element);
    var $container = this.get('$container');
    setTimeout( function() {
      var width = $container.width();
      $container.css({ position: 'relative', left:-(0.5*width) });
      $element.css({ visibility: '' });
    }, 25);
  },

  updatePosition: function() {
    var tool = this.get('popupState.tool');
    if (!tool) { return; }
    var $element = this.$(this.element);
    var $anchor = this.get('$target');
    var surface = tool.getSurface();
    var offset = Substance.getRelativeOffset($anchor, surface.$element);
    // console.log('EditorPopupComponent.updatePosition(): offset=', offset, surface.$element.offset(), $anchor.offset());
    var top = offset.top + $anchor.height() + 5; // plus 5px margin
    var left = offset.left - $anchor.width();
    $element.css({ top: top, left: left});
  },

});

export default EditorPopupComponent;
