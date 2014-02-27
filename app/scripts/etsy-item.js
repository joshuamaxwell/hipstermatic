var EtsyItem = Backbone.Model.extend({

  idAttribute: 'listing_id', // listing_id is not what i need here

  initialize: function () {
    // this.set({id: this.get('listing_id')});
  }

});

var EtsyItemsCollection = Backbone.Collection.extend({
  
  model: EtsyItem,

  initialize: function(){
    this.endpoint = 'https://openapi.etsy.com/v2/listings/active.js?callback=randomFunction';
    this.limit = 100;
    this.sort_by = 'price';
    this.sort_order = 'down';
    this.keywords = 'bowtie,mens';
    this.fields = 'title,price,description,listing_id,url';
    this.includes = 'Images';

    this.api_key = 'kr9rjq7dc9c24jv6fccq2hus';

    this.on('add', function(item){
      new ListView({model: item});
    });

    this.fillItemList = function(){
      $('.list-viewer').removeClass('hide');
      $('.list-viewer').empty();
      this.each(function(item){
        new ListView({model: item});      
      })
      if(etsyItems.first()){
        new ItemView({model: etsyItems.first()})
      };
    }
  },

  parse: function(payload) {
    return payload.results
  },

  comparator: function(item){
    return -(item.get('price')); // to sort by price descending!
  },

  url: function() {
    var url = this.endpoint
    if (this.limit) {
      url += '&limit=' + this.limit;
    }
    if (this.sort_by) {
      url += '&sorty_by=' + this.sorty_by;
    }
    if (this.sort_order) {
      url += '&sort_order=' + this.sort_order;
    }
    if (this.keywords) {
      url += '&keywords=' + this.keywords;
    }
    if (this.fields) {
      url += '&fields=' + this.fields;
    }
    if (this.includes) {
      url += '&includes=' + this.includes;
    }

    return url + '&api_key=' + this.api_key;

  }
});