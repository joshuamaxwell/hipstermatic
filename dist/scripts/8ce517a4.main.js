var EtsyItem=Backbone.Model.extend({}),EtsyItemsCollection=Backbone.Collection.extend({model:EtsyItem,url:"http://tiny-pizza-server.herokuapp.com/collections/EtsyItemCollection"}),ItemView=Backbone.View.extend({className:"item-view panel panel-default",initialize:function(){this.render(),$(".jumbotron").append(this.el)},renderTemplate:_.template($("#item-view-template").text()),render:function(){this.$el.html(this.renderTemplate(this.model))}});console.log("'Allo 'Allo!"),$.ajax({dataType:"jsonp",url:"https://openapi.etsy.com/v2/listings/active.js?callback=etsyResults&fields=title,price,description,listing_id,url&includes=Images&api_key=kr9rjq7dc9c24jv6fccq2hus",data:"",success:function(a){console.log(a.results);var b=new EtsyItemsCollection(a.results);b.each(function(a){new ItemView(a)})},error:function(a){console.log("error",a.statusText)}});