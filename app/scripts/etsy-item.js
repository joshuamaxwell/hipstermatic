var EtsyItem = Backbone.Model.extend({

  idAttribute: '_id', // listing_id is not what i need here

  initialize: function () {
    // this.set({id: this.get('listing_id')});
  }

});

var EtsyItemsCollection = Backbone.Collection.extend({

  model: EtsyItem,

  comparator: function(item){
    return -(item.get('price')); // to sort by price descending!
  },

  url: 'http://tiny-pizza-server.herokuapp.com/collections/EtsyItemCollection'
});