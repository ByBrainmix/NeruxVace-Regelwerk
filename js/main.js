page(baseroute, function() {
  $('#content').html($('#default').html());
});

page(baseroute + '/:id', function(context) {
  var id = context.params.id;
  loadSite(id, renderMarkdown);
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

function loadSite(site, callback) {
  $.ajax({
    url: baseroute + '/getrules.php?page=' + site,
    success: callback,
    error: function() {
      callback('###something went wrong...');
    }
  });

}

function renderMarkdown(data) {
  var converted = converter.makeHtml(data);
  $('#content').html(converted);
  if(isInvisible()) $('#content').fadeTo(fadeDuration, 1);
}

function isInvisible() {
  return $('#content').css('opacity') === '0';
}

$('.nav > li > a').click(function(e) {
  var href = $(this).attr('href');
  var fadedOut = false;
  loadSite(href.substring(2), function(data) {
    if(fadedOut) {
      renderMarkdown(data);
    } else {
      var interval = setInterval(function() {
        if(fadedOut) {
          renderMarkdown(data);
          clearInterval(interval);
        }
      }, 1, 1);
    }
  });

  $('#content').fadeTo(fadeDuration, 0, function() {
    fadedOut = true;
    window.history.pushState('test', '', baseroute + href.substring(1));
  });
  return false;
});
