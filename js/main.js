$(document).ready(function() {
//$("#srch").focus();
  var api = 'http://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages&titles=&generator=search&&gsrlimit=5&gsrsearch=';
  var cb = '&callback=?';

  $("#randomButton").click(function(){
    $(".results").html('<object data="https://en.wikipedia.org/wiki/Special:Random"/>');
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
        var dataServer = data.query.pages;
        console.log(dataServer);
        $.each(dataServer, function(k, v) {
          var $title = $("<div>").text(v.title);
          var $link = $("<object data='https://en.wikipedia.org/?curid='/>").html($title);
          $link.attr('data', $link.attr('data') + v.pageid);
          $(".results").hide();
          $(".results").append($link).fadeIn();
        });
      }
    });
  });
  
});
