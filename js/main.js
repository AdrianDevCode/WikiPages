$(document).ready(function() {
  $("#wikiSearch").focus();
  var api = 'https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages&titles=&generator=search&mobileformat=&gsrlimit=7&gsrsearch=';
  var cb = '&callback=?';
  var dataServer;
  var windowWidth = $(window).width();

  $("#randomButton").click(function(){
    $(".results").html('<object data="https://en.m.wikipedia.org/wiki/Special:Random"/>');
  });

  $("form").submit(function(e) {
    e.preventDefault();
    $(".results").empty();
    var input = $("#wikiSearch").val();

    $.ajax({
      type: "GET",
      url: api + input + cb,
      dataType: 'json',
      headers: {
        'Api-User-Agent': "wikiSearch"
      },
      contentType: "application/json; charset=utf-8",
      success: function(data) {
        dataServer = data.query.pages;
        $.each(dataServer, function(k, v) {
          var $title = $("<div>").text(v.title);
            if(windowWidth < 700 ){
              var $link = $("<object data='https://en.m.wikipedia.org/?curid='/>").html($title);
            }
            else {
              var $link = $("<object data='https://en.wikipedia.org/?curid='/>").html($title);
            }
          $link.attr('data', $link.attr('data') + v.pageid);
          $(".results").append($link).fadeIn(1000);
        });
      }
    });
  });

});
