$(function() {
	$(".project").each(function(index, el) {
		var proj_id = $(el).attr('id');
		console.log(proj_id);
		//@TODO
		//Query mongo for project rating, compute mean, set means for html 
	});
	$('label').click(function() {
    $('label').removeClass('active');
    $(this).addClass('active');
});
});

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



$("#project").click(function(){
//@TODO implement this
//redirect to project the user clicked on
//this.getid
//query mongo
//request get to project page.

});




function myFunction(x) {
    x.classList.toggle("change");
    $(".menulist").toggle();
};

