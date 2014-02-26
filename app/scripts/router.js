var MainRouter = Backbone.Router.extend({


  //ROUTES MUST START WITH NO SLASH
  routes: {
    "" : "listView",
    'items/:id' : 'itemView'
  },

  initialize: function() {
    // console.log('the router is born');
  },

  listView: function(){
    $('.list-viewer').empty();
    etsyItems.each(function(item){
      new ListView({model: item});      
    })
  },

  itemView: function(id) {
      
    var item = etsyItems.find(function(item){
      return item.get('listing_id') == id;
    });

    // console.log('switched to viewing item number', id, 'model       ', item);
    new ItemView({model: item});

  }

});