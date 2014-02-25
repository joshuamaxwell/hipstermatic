console.log('\'Allo \'Allo!');

$.ajax({

  dataType: 'jsonp',

  url:'https://openapi.etsy.com/v2/listings/active.js?callback=etsyResults&fields=title,price,description,listing_id,url&includes=Images&api_key=kr9rjq7dc9c24jv6fccq2hus',

  data: '',

  success: function (results) {
    console.log(results.results);
    var etsyItems = new EtsyItemsCollection(results.results);
    etsyItems.each( function(item) {
      new ItemView(item);
    })
  },

  error: function (msg) {
    console.log('error', msg.statusText);
  }

})

// $.getJSON('https://openapi.etsy.com/v2/listings/active.js?callback=?&api_key=kr9rjq7dc9c24jv6fccq2hus',
//   function(results) {
//     console.log('getJSON results       ', results);
//   })