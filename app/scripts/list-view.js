var ListView = Backbone.View.extend({
  
  tagName: 'a',

  className: 'list-view list-group-item clearfix',

  initialize: function(model) {
    this.setHref(model);
    this.render();
    $('.list-viewer').append( this.el );
  },

  renderTemplate: _.template($('#list-view-template').text()),

  render: function () {
    this.$el.html(this.renderTemplate(this.model));
  },

  setHref: function(model){
    // console.log(model);
    var id = model.get('listing_id'); 
    var link = '#/items/' + id
    this.$el.attr({href: link});
  }

})