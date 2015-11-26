/**
contains the javascript methods that are design specific
*/
var lastSelectedButtonId;

var themes = {
    "default":["#1ADFEF","#16C0CE"],
    "grey":["silver","grey"],
    "mensa":["#0099FF","#E5F4FF"],
    "vasttrafik":["#00AEEC","#E5F4FF"],
    "gbg":["#1b78cc","#E5F4FF"],
    "green":["#118F99","#16C0CE"],
    "yellow":["#E6A335","#FFEC82"]
};
var sunDegrees = 0;

function populateMenu(mnuRows) {

    populateSubMenu(mnuRows);

/*
  $("#menu").html("");
  for (var i = 0; i< mnuRows.length; i++){
    var mnuRow = mnuRows[i];
    var html="<div class='btnBigSun' id='"+mnuRow["id"]+"' href='#"+mnuRow["id"]+"' title='"+mnuRow["label"]+"'>"+mnuRow["label"]+"</div>\n";
    $("#menu").append(html);
    $("#"+mnuRow["id"]).hide().fadeIn(200+100*i);
    $("#"+mnuRow["id"]).click(mnuRow["function"]);
    //setTimeout(function() {$("#"+mnuRow["id"]).fadeIn();}, 100*i);
  }
*/
}

function doWindowResize() {
  var w = $(this).width();

  var gbgH = (373/1959)*$("#goteborg").width();
  if (gbgH>100) gbgH=100;
  $("#goteborg").height(gbgH);
}

function menuClose(btnId) {
    $("#"+lastSelectedButtonId).removeClass("selected");
    if (btnId!==undefined) {
        $("#"+btnId).addClass("selected");
        lastSelectedButtonId=btnId;
    }
  // $("#menu").fadeOut();
}


function initDesign() {
    changeTheme("green");
    $("#bottom-content").animate({bottom: "10px"}, 3000);
    // setTimeout(rotateSun, 100);
}

function changeTheme(theme) {
    
    var colors = themes[theme];
    if (colors) {
        $("body").animate({'backgroundColor': colors[0]}, 1000);
        $("#bkgplate").animate({'backgroundColor': colors[1]}, 1000);
        $(".button").animate({'border-color': colors[0]}, 500);
        //$(".button.selected").animate({backgroundColor: colors[1]}, 500);
        $('.title').animate({'color': colors[0]}, 500);
        
        $('head').append('<style>.button {border-color:'+colors[0]+'} .button:hover {background-color: '+colors[0]+';}</style>');
        
    }
}

function changeLogo(name) {
    $('#logo').fadeOut();
    var html="<img src='images/glenn/"+name+".png' >";
    setTimeout(function() {$('#logo').html(html).fadeIn(500)}, 500);
}


function rotateSun() {
    sunDegrees+=.2;
    $("#sol1").css("transform", "rotate("+sunDegrees+"deg)");
    $("#sol2").css("transform", "rotate("+(0-sunDegrees)+"deg)");
    setTimeout(rotateSun, 200);
}