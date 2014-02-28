Parse.initialize("gCR9KS7rXD7MlaTjdrGcf9DdDcoDZG5lqIZiVoPe", "4XKF3hLDAceJzKDSAne42qDm2AJTKgNGXxnH9Nlg");
var TestObject = Parse.Object.extend("TestObject");
var testObject = new TestObject();
testObject.save({foo: "bar"}).then(function(object) {
  console.log("yay! Parse worked");
});

//to get the chart context
var ctx = $("#myChart").get(0).getContext("2d");


//Get the canvas &
var c = $('#myChart');
var ct = c.get(0).getContext('2d');
var container = $(c).parent();

//Run function when browser resizes
$(window).resize( myChart );

function myChart(){ 
    c.attr('width', $(container).width() ); //max width
    // c.attr('height', $(container).height() ); //max height

    //Call a function to redraw other content (texts, images etc)
    var myNewChart = new Chart(ctx).Bar(dataFunc());
}

//tell the button what to do when clicked
$('.page-title').on('click','.hipstermatic-search-btn', function(){
  etsyItems.hipstermaticFetch(fetchObject);
})

//define fetch parameters in a handy object one time
fetchObject = {
  success: function(){
    if ( etsyItems.isEmpty() ){
        console.log('no results... let us try something else...');
        $('.search-again').addClass('cleared-out');
        etsyItems.hipstermaticFetch(fetchObject);
        //get the next two terms and search again
      } else {
        etsyItems.fillItemList()
        //Initial chart call 
        myChart();
        // var myNewChart = new Chart(ctx).Bar(dataFunc()); // I don't think I need this
        console.log('fetch is complete. etsyItems contains: ', etsyItems); 
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



// commented out because i don't want to wait for a string. I just copy-pasted one from hipsteripsum
// $.ajax({
//   dataType: 'jsonp',
//   url: 'http://jsonp.jit.su/?callback=?&url=http://hipsterjesus.com/api/?paras=1&type=hipster-centric&html=false',
//   success: function(payload){
//     hipsterWords.paragraph = payload.text;

//     etsyItems.hipstermaticFetch(fetchObject);

//   },
//   error: function(){
//     console.log('error');
//   }
// });


function dataFunc(){
    data = {
      labels: ["<20", "20-50", "50-150", "150-300", ">300"],

      datasets: [
        {
          fillColor : "rgba(220,220,220,0.5)",
          strokeColor : "rgba(220,220,220,1)",
          data: []
        }
      ]
    }

    var group1 = etsyItems.filter(function(item){
      return (item.get('price') < 20)
    })
    var group2 = etsyItems.filter(function(item){
      return (item.get('price') > 20 && item.get('price') < 50)
    })
    var group3 = etsyItems.filter(function(item){
      return (item.get('price') > 50 && item.get('price') < 150)
    })
    var group4 = etsyItems.filter(function(item){
      return (item.get('price') > 150 && item.get('price') < 300)
    })
    var group5 = etsyItems.filter(function(item){
      return (item.get('price') > 300)
    })

    data.datasets[0].data[0] = group1.length;
    data.datasets[0].data[1] = group2.length;
    data.datasets[0].data[2] = group3.length;
    data.datasets[0].data[3] = group4.length;
    data.datasets[0].data[4] = group5.length;

  return data;
}


//so i can erase tiny-pizza-server collections from console
function erasedb (collectionName) {
  var url = 'http://tiny-pizza-server.herokuapp.com/collections/' + collectionName;

  $.get(url, function(res){
    // console.log(res);
    for ( i=0; i<res.length; i+=1){
      console.log('DELETING:   http://tiny-pizza-server.herokuapp.com/collections/EtsyItemCollection/' + res[i]._id);
      var url = 'http://tiny-pizza-server.herokuapp.com/collections/EtsyItemCollection/' + res[i]._id;
      $.ajax({
        url: url,
        type: 'delete'
      })
    }
  })
}
