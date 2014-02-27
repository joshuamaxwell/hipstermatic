// console.log('\'Allo \'Allo!');
Parse.initialize("gCR9KS7rXD7MlaTjdrGcf9DdDcoDZG5lqIZiVoPe", "4XKF3hLDAceJzKDSAne42qDm2AJTKgNGXxnH9Nlg");
var TestObject = Parse.Object.extend("TestObject");
var testObject = new TestObject();
testObject.save({foo: "bar"}).then(function(object) {
  console.log("yay! Parse worked");
});

etsyItems = new EtsyItemsCollection();

fetchObject = {
  success: function(){
    etsyItems.fillItemList()
    console.log('fetch is complete. etsyItems contains: ', etsyItems); 
  },
  error: function(){
    console.log('there was a problem with fetch');
  },
  remove: false,
  dataType: 'jsonp' // have to do this to make etsy happy?
}

router = new MainRouter();
Backbone.history.start();

$.ajax({
  dataType: 'jsonp',
  url: 'http://jsonp.jit.su/?callback=?&url=http://hipsterjesus.com/api/?paras=1&type=hipster-centric&html=false',
  success: function(payload){
    payload = payload.text.split(' ').slice(1,-1)

    payload = _.reject(payload, function(word){
      return word == ''
    })

    payload = _.sample(payload, 2);

    etsyItems.keywords = payload.join('+'); //that + took forever to figure out
    console.log('keywords   ' , etsyItems.keywords);
    $('.page-title').html('Hipstermatic<br>Etsy <span class="keywords">' + payload.join(' and ') + '</span> Browser');
    console.log('url   ', etsyItems.url());
    etsyItems.fetch(fetchObject);
  },
  error: function(){
    console.log('error');
  }
});


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
