$(function() {
  console.log('file-upload.js ready');

  $('#theinputfield').change(function() {
    var f = $('#theinputfield')[0].files[0];
    $('#fn').html( f.name );
  });

  $('#insertProject').click(function(e) {
    // how to select the file itself
    var f = $('#theinputfield')[0].files[0];
    if (!f) {
      alert('pick a file');
      return;
    }

    // send post http request to the server
    var fd = new FormData();
    fd.append('ajaxfile', f);
    console.log('subject before ', $('#subject').val());
    fd.append('title',$('#title').val());
    fd.append('subject',$('#subject').val());
    fd.append('tags',$('#tags').val());
    fd.append('description',$('#description').val());
    console.log('form data');
    console.log("title " + fd.get('title'));

    $.ajax({
      url: '/api/insertProject',
      data: fd,
      processData: false,
      contentType: false,
      type: 'POST',
      success: function(res) {
        console.log('response', res);
        $('#ajaxResponse').html(JSON.stringify(res));
      }
    });
  });

});
