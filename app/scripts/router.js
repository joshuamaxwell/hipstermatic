var MainRouter = Backbone.Router.extend({
  
  routes: {
    "about" : "aboutPage",
    "about/:name" : "aboutPage"
  },

  initialize: function () {
    console.log('This MainRouter just got initialized');
  },

  aboutPage: function (name) {
    if (name) {
      console.log("Heres a page about", name);
    } else {
      console.log("This page is about noone.");
    }

  }

})