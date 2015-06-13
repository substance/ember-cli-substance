import Ember from 'ember';

var HeadingComponent = Ember.Component.extend({
  level: 1,
  tagName: "h1",
  inititalize: function() {
    var level = this.get('level');
    this.set('tagName', "h" + level);
  }.on('init'),
});

export default HeadingComponent;
