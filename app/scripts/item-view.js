var ItemView = Backbone.View.extend({

  className: 'item-view panel panel-default',

  initialize: function() {
    this.render();
    $('.jumbotron').append( this.el );
  },

  renderTemplate: _.template($('#item-view-template').text()),

  render: function () {
    this.$el.html(this.renderTemplate(this.model));
  }
})