var MainRouter = Backbone.Router.extend({


  //ROUTES MUST START WITH NO SLASH
  routes: {
    "" : "listView",
    'items/:id' : 'itemView'
  },

  initialize: function() {
    console.log('the router is born');
    etsyItems.hipstermaticFetch(fetchObject);
  },

  listView: function(){
    etsyItems.fillItemList();
  },

  itemView: function(listing_id) {
    var item = etsyItems.findWhere({listing_id: Number(listing_id)}) //that didn't work without Number() because it was trying to match a string
    if(item) new ItemView({model: item}); else location.hash='';    
    // $('.list-viewer').height($('.item-viewer').height()-20);

  }

});