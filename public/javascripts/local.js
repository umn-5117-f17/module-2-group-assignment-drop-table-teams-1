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



$(".projects").click(function(){
	var projid = $(this).attr('id').substring(7);
	console.log(projid);
	//$.get( "/api/project/" + projid);
	window.location.href = "http://localhost:5000/api/project/"+ projid;
});




function myFunction(x) {
    x.classList.toggle("change");
    $(".menulist").toggle();
};
