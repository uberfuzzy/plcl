$(document).ready(doMenu);
  
function scaleUp(itemToScale, scaleAmount) {
  if (scaleAmount > 1) scaleAmount = 1;
  itemToScale.css("-webkit-transform", "scale(" + scaleAmount + ")");
  itemToScale.css("-moz-transform", "scale(" + scaleAmount + ")");
  itemToScale.css("transform", "scale(" + scaleAmount + ")");
  itemToScale.css("opacity", scaleAmount);
  if (scaleAmount < 1)
    setTimeout(function() { scaleUp(itemToScale, scaleAmount + 0.20) }, 7);
  else
    itemToScale.css("opacity", 1);  
}

function doMenu() {

	/*
    $("a").each(function() {
      var href = $(this).attr("href");
      if (href != "#") {
        $(this).click(function(event) { 
          var top = event.pageY;
          var left = event.pageX;
          var menu = $(href);
          if (menu && menu.hasClass("radial")) {
            //top = $(this).position().top;
            //left = left - $(this).offset().left;
            var menu_width = menu.outerWidth();
            menu.stop().css("top", top - menu_width / 2).css("left", left - 25);
            menu.css("-webkit-transform", "scale(0.25)");
            menu.css("-moz-transform", "scale(0.25)");
            menu.css("transform", "scale(0.25)");
            menu.css("opacity", 0.25);
            menu.show();
            setTimeout(function() { scaleUp(menu, 0.25) }, 10);
            return false;
          }
        });
      }
    }); 
	*/
    
    $("ul.radial").each(function() {
      var itemCount = $(this).children("li").length;
      var max_height = 100;
      var max_width = 100;
      var border_width = 25;
      
      $(this).children("li").each(function() {
        if ($(this).width() > max_width) max_width = $(this).width();
        if ($(this).height() > max_height) max_height = $(this).height(); 
      });
      
      var area = (max_width * max_height) * itemCount * Math.PI;
      var radius = Math.sqrt(area / 4);
      var diameter = radius * 2;
      var circumference = Math.PI * diameter;
      $(this).width(diameter).height(diameter).css("border-radius", diameter).css("-moz-border-radius", diameter); //.css("margin-left", -(diameter/2));
      
      var alpha = (Math.PI * 2) / itemCount; 
      var top = 0;
      var left = 0;
      
      $(this).children("li").each(function(i) {
        $(this).width(max_width);
        $(this).height(max_height);
        var theta = (alpha * i) - (Math.PI / 2);
        var deg = (alpha * i) * (180 / Math.PI);
        var extra_margin = 0;
        //if (deg == 0) extra_margin = 10;
        //if (deg == 180) extra_margin = -10;
        top = Math.sin(theta) * (radius - ($(this).height() * 0.75));
        left = Math.cos(theta) * (radius - ($(this).width() * 0.75));
        $(this).css("top", top).css("left", left).css("margin-left", radius - ($(this).outerWidth() / 2)).css("margin-top", radius - ($(this).outerWidth() / 2) - extra_margin);
        
        if ($(this).children("span").length > 0) {
          var label = $(this).children("span").eq(0);
          var label_width = circumference / itemCount;
          $(this).after(label.addClass("radial_label"));
          label.width(label_width).css("text-align", "center").css("line-height", border_width + "px");
          if (deg > 90 && deg < 270) deg = deg - 180;
          top = Math.sin(theta) * (radius + (border_width / 2));
          left = Math.cos(theta) * (radius + (border_width / 2));
          label.css("top", top).css("left", left).css("margin-left", radius - label_width / 2).css("margin-top", radius - (border_width / 2)).css("position", "absolute");
          label.css("-webkit-transform", "rotate(" + deg + "deg)").css("-moz-transform", "rotate(" + deg + "deg)");
          
          $(this).hover(function() {
            label.css("text-shadow", "0px 0px 5px #fff");
          }, function() {
            label.css("text-shadow", "none");
          });
        }
        
        $(this).wrapInner("<div class='aligner'></div>");
        var aligner = $(this).children("div.aligner")
        var aligner_height = aligner.outerHeight();
        aligner.css("position", "absolute").css("width", "100%").css("top", "50%").css("margin-top", -(aligner_height / 2)).css("display", "block"); 
      });
      
    });
  }