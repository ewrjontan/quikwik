//detect if touch screen
function hasTouch() {
    return 'ontouchstart' in document.documentElement
           || navigator.maxTouchPoints > 0
           || navigator.msMaxTouchPoints > 0;
};


//get window width
var $portrait = window.matchMedia("(orientation: portrait)").matches;
var $landscape = window.matchMedia("(orientation: landscape)").matches; 
var $deviceWidth = $(window).width();
var $deviceHeight = $(window).height();
var $searched = false;


//wiki json object constructor
function wikiObject(name, description, link){
  this.name = name;
  this.description = description;
  this.link = link;
}

function submitSearch(callback){
  //var inputValue = document.getElementById("search-input").value;
  var inputValue = $("#search-input").val();
  //console.log("input val: " + inputValue);

  var url="https://en.wikipedia.org//w/api.php?action=opensearch&format=json&origin=*&search=" + inputValue + "&limit=10";
  
  //console.log("url is: " + url);
  
  callback(url);
}

function sendRequest(url, callback){
  //console.log("send request func test");
  var xmlHttp = new XMLHttpRequest();
  
  xmlHttp.onreadystatechange = function(){
    if (xmlHttp.readyState==4 && xmlHttp.status==200){
      var responseData = JSON.parse(xmlHttp.responseText);
      //console.log("response data: " + responseData);
    
      if (responseData[1].length>0){
        //parseData(responseData);
        callback(responseData);
      }else{
        //console.log("No results");
        $("#list-container").append("<p id='no-results'>No Results Found!</p>");

        /*if ($searched){
          $("#no-results").css("bottom", "40%");
        }*/
        
      };
    };
  };
  xmlHttp.open("GET", url, true);
  xmlHttp.send();
};

function parseData(input, callback){
  
  var wikiArray = [];
  //console.log("Current blank array: " + wikiArray);
  for (i=0; i<input[1].length; i++){
    wikiArray.push(new wikiObject(input[1][i], input[2][i], input[3][i]));
  }
  
  //console.log("# of results is: " + input[1].length);
  //console.log("new filled array: " + wikiArray);
  
  
  //console.log("Wiki arr: " + wikiArray);
  //return wikiArray;
  callback(wikiArray);
} 

function appendData(arrayInput){
  //console.log("this is the array input: " + arrayInput[0].name);
  //console.log("this is the array input: " + arrayInput[0].description);
 
  for (i=0; i<arrayInput.length; i++){
    //var $name = "<h1 class='item-name'>" + arrayInput[i].name; + "</h1>";
    //var $description = "<p class='item-description'>" + arrayInput[i].description + "</p>";
    var $name = arrayInput[i].name;
    var $description = arrayInput[i].description;
    var $link = arrayInput[i].link;
    
    
    //$("#list-container").append("<a class='MainItemContainer' target= '_blank' href=" + $link + "><div class='list-item'>" + $name + $description + "</div></a></div>");
    
    //$("#list-container").append("<a class='MainItemContainer' target= '_blank' href=" + $link + "><div class='list-item'>" + "<h1 class='item-name'>THIS IS MY ITEM NAME</h1>" + "<p class='item-description'>THIS IS MY DESCRIPTION</p>" + "</div></a></div>");
    //$("#list-container").append("<a class='MainItemContainer' target= '_blank' href=" + $link + "><div class='list-item'>" + "<h1 class='item-name'>THIS IS MY ITEM NAME<p class='item-description'>THIS IS MY DESCRIPTION</p></h1>" + "</div></a></div>");

    $("#list-container").append("<a class='MainItemContainer' target= '_blank' href=" + $link + "><div class='list-item'><h1 class='item-name'>" + $name + "</h1><p class='item-description'>" + $description + "</p></div></a></div>");


  }; 
  
  //hover for list items
  $('.list-item').hover(
    function(){
      if ($("body").hasClass("HasHover")){
        $(this).css("background-color", "#f2f2f2");  
      };
      //console.log("entered element");
      
    },
    function(){
      //console.log("left element");
      $(this).css("background-color", "white");
  });
  
  css_on_search();
  
};

function css_on_search(){
  $searched = true;
  $(".main-container").addClass("flex");
  //$(".main-container").css("background-color", "yellow");
  $("#heading").css({"font-size": "1.2em", "top": "25px", "width": "15%"});

  if ($deviceWidth<700){
    $("#button-container").css("display", "none");
    $("#search-input-container").css("width", "85%");
  }else{
    $("#button-container").css({"margin-top": "50px", "width": "30%"});
    $("#search-input-container").css("width", "55%");
  }
  //$("#button-container").css("display", "none");
  

  //$("#button-container").css("margin-top", "50px");
  //$("#button-container").css("background-color", "red");
  //$("#button-container").css("width", "20%");
  //$("#submit-button").css("display", "none");
  
  //$("#heading").css("top", "25px");
  //$("#heading").css("width", "20%");
  

  /*$("#heading").css("font-size", "2em");
  $("#heading").css("top", "25px");
  $("#heading").css("background-color", "red");
  $("#button-container").css("width", "125px");
  $("#button-container").css("background-color", "green");
  $("#button-container").css("margin-top", "50px");
  $("#submit-button").css("display", "none");
  $("#surprise-button").css("background-color", "red");
  $("#surprise-button").css("left", "50px");*/
  //$("#search-input-container").css("width", "50%");
};

function css_on_clear(){
  $searched = false;
  $(".main-container").removeClass("flex");
  $("#heading").css({"font-size": "4em", "top": "", "width": "100%"});
  //$("#button-container").css("width", "500px")
  $("#button-container").css("display", "flex");
  $("#search-input-container").css("width", "95%");
  //$("#submit-button").css("display", "inline");
  $("#button-container").css({"margin-top": "30px", "width": "100%"});
}

//jquery 
$(document).ready(function(){
  //adds HasHover class to body to allow for hovering over elements
  if (!hasTouch()) {
    console.log("Not a touch screen, adding hover class!");
    $("body").addClass("HasHover");
    $("#clear-input").css("padding-top", "5px");

  }

  //submit and surprise button hovers
  $(".button").hover(
    function(){
      if ($("body").hasClass("HasHover")){
        $(this).css({"background-color": "#a3c2c2", "border": "1px solid #a3c2c2"});  
      };
      
    },
    function(){
      $(this).css({"background-color": "#c2d6d6", "border": "1px solid white"});
    });
  
  // clear button hover
  $("#clear-input").hover(
    function(){
      $(this).css("color", "black");
    },
    function(){
      $(this).css("color", "gray");
    });
  
  //Clear input value and input list
  $("#clear-input").click(function(){
    $("#search-input").val('');
    $("#list-container").empty();
    $("#clear-input").css("display", "none");
    css_on_clear()
  });
  
  //submit button functions
  $("#submit-button").click(function(){
    if ((document.getElementById("search-input").value).length>0){
      $("#clear-input").css("display", "inline");
      $("#list-container").empty();

      submitSearch(function(result){
        //console.log("this is my result: " + result);
        sendRequest(result, function(responseData){
          //console.log("my response: " + responseData);
          parseData(responseData, function(wikiArray){
            //console.log("my arr: " + wikiArray[0].name);

      appendData(wikiArray);

          });
        });
      });
     }else{
       //console.log("no input");
     };
 });
  
  //enter key submit functions
  $("#search-input").keypress(function(e){
    if (e.which==13){
      if ((document.getElementById("search-input").value).length>0){
        $("#clear-input").css("display", "inline");
        $("#list-container").empty();

        submitSearch(function(result){
          //console.log("this is my result: " + result);
          sendRequest(result, function(responseData){
            //console.log("my response: " + responseData);
            parseData(responseData, function(wikiArray){
              //console.log("my arr: " + wikiArray[0].name);

        appendData(wikiArray);

                });
              });
            });
      }else{
        console.log("no input");
      };
      
    };
      
  });

    //xxxxxxxxxxxxxxxxxx Check Initial Display xxxxxxxxxxxxxxxxxxxxxxxxxxxx
    //check initial orientation

    console.log("Portrait: " + $portrait);
    console.log("Landscape: " + $landscape);
    console.log("initial device width: " + $deviceWidth);



  //xxxxxxxxxxxxx Recheck device orientation and reload projects xxxxxxxxxxxxxxxxxxxxxxxx

    $(window).resize(function() {
      // This will fire each time the window is resized:
      console.log("Window has been resized!");
  
      //Check device width
      $deviceWidth = $(window).width();
      console.log("new device width: " + $deviceWidth);
      
      //check new orientation
      $portrait = window.matchMedia("(orientation: portrait)").matches;
      $landscape = window.matchMedia("(orientation: landscape)").matches;
      
      console.log("New Portrait: " + $portrait);
      console.log("New Landscape: " + $landscape);

      if ($deviceWidth<600 && $searched){
        $("#button-container").css("display", "none");
      }else if ($deviceWidth>=600 && $searched){
        $("#button-container").css("display", "flex");
        $("#button-container").css("margin-top", "50px");
      }
    });
    
    
});

