
//tell the button what to do when clicked
$('.search-controls').on('click','.hipstermatic-search-btn', function(){
  etsyItems.hipstermaticFetch(fetchObject);
})

//define fetch parameters in a handy object one time
fetchObject = {
  success: function(){
    if ( etsyItems.isEmpty() ){
        console.log('no results... let\'s try something else...');
        $('.search-again').addClass('cleared-out');
        etsyItems.hipstermaticFetch(fetchObject);
        //get the next two terms and search again
      } else {
        etsyItems.fillItemList()
        console.log('fetch is complete. etsyItems contains: ', etsyItems.models.length); 
        //make button show up after a couple seconds...
        $('.search-again').removeClass('cleared-out');
      }
  },
  error: function(){
    console.log('there was a problem with fetch');
  },
  // remove: false, // i have removed this because i want my entire collection to reset
  dataType: 'jsonp' // have to do this to make etsy happy?
}


//get the party started
etsyItems = new EtsyItemsCollection();
router = new MainRouter();
Backbone.history.start();
