page(baseroute, function() {
  $('#content').html($('#default').html());
});

page(baseroute + '/*', function(context) {
  var id = window.location.pathname.substring(baseroute.length);
  load(id);
});

page.start();

var converter = new showdown.Converter();
/*function load(site) {
  $('#content').load('./sites/' + site + '.md', function(response, status, xhr) {
    if (status === 'error') {
      $('#content').html('<h3>Ein Fehler ist aufgetreten</h3><br><p>' + xhr.status + ' ' + xhr.statusText + '</p>');
    } else {
      $('#content').html(converter.makeHtml($('#content').html()));
    }
  });
}
*/

var fadeDuration = 100;

function load(site) {
  $.ajax({
    url: '../getrules.php?page=' + site,
    success: function(data) {
      var converted = converter.makeHtml(data);
      $('#content').html(converted);
    },
    error: function() {
      $('#content').html('something went wrong...');
    }
  });
  if($('#content').css('opacity') === '0') $('#content').fadeTo(fadeDuration, 1);
}

$('.nav > li > a').click(function(e) {
  var href = $(this).attr('href');
  $('#content').fadeTo(fadeDuration, 0, function() {
    load(href.substring(1));
    window.history.pushState('test1', 'test2', baseroute + href);
  });
  return false;
});
