var EtsyItem = Backbone.Model.extend({

  idAttribute: 'listing_id', 

  initialize: function () {
  }

});

var EtsyItemsCollection = Backbone.Collection.extend({
  
  model: EtsyItem,

  initialize: function(){
    this.endpoint = 'https://openapi.etsy.com/v2/listings/active.js?callback=randomFunction';
    this.limit = 20;
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
      $('.list-viewer').empty();
      this.each(function(item){
        new ListView({model: item});      
      })
      if(etsyItems.first()){
        new ItemView({model: etsyItems.first()})
        location.hash = 'items/' + etsyItems.first().get('listing_id');
      };
    };

    this.hipstermaticFetch = function(fetchObject){
      var twoHipsterWords = hipsterWords.sample(2);
      etsyItems.keywords = twoHipsterWords.join('+'); //that + took forever to figure out
      //the following lines should eventually come from a template
      $('.search-controls').html('Searching for <span class="keywords">' + twoHipsterWords.join(' and ') + '</span>. . .');
      $('.search-controls').append('<span class="small search-again cleared-out"><br>too many people know about this already?     <button type="button" class="btn btn-default btn-lg hipstermatic-search-btn">Be Unique-er</button></span>');
      etsyItems.fetch(fetchObject);
    }
  },

  parse: function(payload) {
    return payload.results
  },

  comparator: function(item){
    return -(item.get('price')); // to sort by price descending! also a query string param for etsy
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