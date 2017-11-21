$(document).ready(function() {
//$("#srch").focus();
  var api = 'http://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages&titles=&generator=search&&gsrlimit=10&gsrsearch=';
  var cb = '&callback=';

  $("#randomButton").click(function(){

    $(".results").html('<object data="https://en.wikipedia.org/wiki/Special:Random"/>');


  });

  $("#iform").submit(function(e) {
    e.preventDefault();
    //$(".results").empty();
    var input = $("#srch").val();

    $.ajax({
      type: "POST",
      url: api + input + cb,
      dataType: 'jsonp',
      headers: {
        'Api-User-Agent': "wikiSearch"
      },
      contentType: "application/json",
      success: function(data) {
        var dataServer = data.query.pages;

        $.each(dataServer, function(k, v) {
          var $p = $("<p>");
          var $title = $("<button class='btn btn-danger'>").text(v.title);
          var $link = $("<a href='https://en.wikipedia.org/?curid='></a>").html($title);

          $link.attr('href', $link.attr('href') + v.pageid);

          $(".results").hide();
          $(".results").append($p, $link).fadeIn();


        });

      }
    });
  });
});
