var ItemView = Backbone.View.extend({

  className: 'item-view panel panel-default',

  initialize: function() {
    this.render();
    $('.item-viewer').html( this.el );
  },

  renderTemplate: _.template($('#item-view-template').text()),

  render: function () {
    this.$el.html(this.renderTemplate(this.model));
  }

})