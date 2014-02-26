// console.log('\'Allo \'Allo!');

router = new MainRouter();

etsyItems = new EtsyItemsCollection();
getAjaxData();


// etsyItems.fetch({
//   success: function(){
//     console.log('fetch is complete. etsyItems contains: ', etsyItems); 
//     etsyItems.each(function(item){
//       new ListView({model: item});
//     });
//     getAjaxData();

//   },

//   error: function(){
//     console.log('there was a problem with fetch');
//   }

// });

function getAjaxData(){
  console.log('getting data from etsy api...');
  $.ajax({

    dataType: 'jsonp',

    url:'https://openapi.etsy.com/v2/listings/active.js?callback=etsyResults&fields=title,price,description,listing_id,url&includes=Images',

    data: {
      api_key: 'kr9rjq7dc9c24jv6fccq2hus',
      limit: 100,
      sort_by: 'price',
      sort_order: 'down',
      // min_price: 500.00,
      keywords: 'bowtie, mens'
    },

    success: function (responsePayload) {
      etsyItems.add(responsePayload.results);
      console.log('post ajax etsy items:    ', etsyItems);
      etsyItems.each(function(item){
        new ListView({model: item});
      })

      Backbone.history.start();

    },

    error: function (msg) {
      console.log('error', msg.statusText);
    }

  });
}


function erasedb () {
  $.get('http://tiny-pizza-server.herokuapp.com/collections/EtsyItemCollection',function(res){
    // console.log(res);
    for ( i=0; i<res.length; i+=1){
      console.log('http://tiny-pizza-server.herokuapp.com/collections/EtsyItemCollection/' + res[i]._id);
      var url = 'http://tiny-pizza-server.herokuapp.com/collections/EtsyItemCollection/' + res[i]._id;
      $.ajax({
        url: url,
        type: 'delete'
      })
    }
  })
}

// $.getJSON('https://openapi.etsy.com/v2/listings/active.js?callback=?&api_key=kr9rjq7dc9c24jv6fccq2hus',
//   function(results) {
    // console.log('getJSON results       ', results);
//   })