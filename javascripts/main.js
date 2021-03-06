"use strict";

$(document).ready(function() {

  //Insert Chartbeat Module
  var module = new bloomberg.common.analytics.chartbeat.View({
    domain: "www.businessweek.com",
    uid: 15087
  });

  $('body').append(module.render().el)


  //Initiate responsive nav
    var navigation = responsiveNav(".nav-collapse", {
      animate: false,                    // Boolean: Use CSS3 transitions, true or false
      transition: 284,                  // Integer: Speed of the transition, in milliseconds
      label: "",                    // String: Label for the navigation toggle
      insert: "after",                  // String: Insert the toggle before or after the navigation
      customToggle: "",                 // Selector: Specify the ID of a custom toggle
      closeOnNavClick: true,           // Boolean: Close the navigation when one of the links are clicked
      openPos: "relative",              // String: Position of the opened nav, relative or static
      navClass: "nav-collapse",         // String: Default CSS class. If changed, you need to edit the CSS too!
      navActiveClass: "js-nav-active",  // String: Class that is added to <html> element when nav is active
      jsClass: "js",                    // String: 'JS enabled' class which is added to <html> element
      init: function(){},               // Function: Init callback
      open: function(){},               // Function: Open callback
      close: function(){}               // Function: Close callback
    });

  // Set up listener for search bar
  $('.search').keyup(function(e) {
    if (e.which == 13) {
      var text = $(e.target).val()
      var tokens = text.split(' ').join('+')
      window.location = "http://www.businessweek.com/search?q=" + tokens
    }
  })











});

