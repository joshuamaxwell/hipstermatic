var EtsyItem = Backbone.Model.extend({


})


var EtsyItemsCollection = Backbone.Collection.extend({

  model: EtsyItem,

  url: 'http://tiny-pizza-server.herokuapp.com/collections/EtsyItemCollection'
})