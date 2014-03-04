var ListView = Backbone.View.extend({
  
  tagName: 'a',

  className: 'list-view list-group-item clearfix',

  initialize: function() {
    this.setHref();
    this.render();
    $('.list-viewer').append( this.el );
  },

  renderTemplate: _.template($('#list-view-template').text()),

  render: function () {
    this.$el.html(this.renderTemplate(this.model));
  },

  setHref: function(){
    var id = this.model.get('listing_id');
    var link = '#/items/' + id;
    this.$el.attr({href: link});
  }

});