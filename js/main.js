page(baseroute, function() {
  $('#content').html($('#default').html());
});

page(baseroute + '/:id', function(context) {
  var id = context.params.id;
  load(id);
});

page.start();

var converter = new showdown.Converter();
function load(site) {
  $('#content').load('./sites/' + site + '.md', function(response, status, xhr) {
    if (status === 'error') {
      $('#content').html('<h3>Ein Fehler ist aufgetreten</h3><br><p>' + xhr.status + ' ' + xhr.statusText + '</p>');
    } else {
      $('#content').html(converter.makeHtml($('#content').html()));
    }
  });
}
