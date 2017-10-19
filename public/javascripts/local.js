$(function() {
  console.log('local.js ready');
  $('#deleteButton').click(function(e) {
    $.ajax({
      url: '/user/delete',
      type: 'get',
      success: function(res) {
        $('#deleteConfirm').html('Profile Deleted');
      }
    });
  });

  $('#readButton').click(function(e) {
    $.ajax({
      url: '/user/read',
      type: 'get',
      success: function(res) {
        // $('#deleteConfirm').html('Profile Deleted');
      }
    });
  });

  $('#createButton').click(function(e) {
    $.ajax({
      url: '/user/create',
      type: 'get',
      success: function(res) {
        // $('#deleteConfirm').html('Profile Deleted');
      }
    });
  });
});
