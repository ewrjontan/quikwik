
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
        $("#list-container").append("<h1 id='no-results'>No Results Found</h1>");
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
    var $name = "<h1 class='item-name'>" + arrayInput[i].name; + "</h1>";
    var $description = "<p class='item-description'>" + arrayInput[i].description + "</p>";
    var $link = arrayInput[i].link;
    
    //$("#list-container").append("<div class='list-item'>" + $name + $description + "</div>");
    
    $("#list-container").append("<a target= '_blank' href=" + $link + "><div class='list-item'>" + $name + $description + "</div></a>");
    
  }; 
  
  //hover for list items
  $('.list-item').hover(
    function(){
      //console.log("entered element");
      $(this).css("background-color", "#e6e6e6");
    },
    function(){
      //console.log("left element");
      $(this).css("background-color", "white");
  });
  
  css_on_search();
  
};

function css_on_search(){
  $(".main-container").addClass("flex");
  $("#heading").css("font-size", "2em");
  $("#button-container").css("width", "125px")
  $("#submit-button").css("display", "none");
};

function css_on_clear(){
  $(".main-container").removeClass("flex");
  $("#heading").css("font-size", "5em");
  $("#button-container").css("width", "500px")
  $("#submit-button").css("display", "inline");
}

//jquery 
$(document).ready(function(){
  //submit and surprise button hovers
  $(".button").mouseenter(function(){
    
    $(this).css("background-color","#a3c2c2");
  });
  $(".button").mouseleave(function(){
    $(this).css("background-color", "#c2d6d6");
  });
  
  // clear button hover
  $("#clear-input").hover(
    function(){
      $(this).css("color", "black");
    },
    function(){
      $(this).css("color", "white");
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
    
    
});

