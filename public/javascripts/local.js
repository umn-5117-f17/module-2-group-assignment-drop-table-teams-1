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


$(".subject-button").click(function(){
	var sub = $(this).attr('id');
	// $.get("/" + sub);
	// call search based on subject load index
});
$(".tag-button").click(function(){
	// call search based on subject load index
});
$(".delete-project").click(function(){
	console.log("in delete local")
	var projid = $(this).attr('id');

	$.ajax({
		url: '/api/deleteProject/'+projid,
		type: 'get',
		success: function(res) {
			window.location.href = "http://localhost:5000";
		}
	});
});

$(".update-description").click(function(){
	console.log("in update desc local")
	var projid = $(this).attr('id');
	var newDescription = $('#newDesc').val();
	console.log(newDescription);
	js = {
		id: projid,
		item: "description",
		value: newDescription
	}

	$.ajax({
		url: '/api/updateDescription',
		type: 'post',
		data: js,
		success: function(res) {
			location.reload();
		}
	});
});

$(".add-tag-button").click(function(){
	console.log("in add tag local")
	var projid = $(this).attr('id');
	console.log("id = " + projid)
	var newTag = $('#tagsInput').val();
	console.log(newTag);
	js = {
		id: projid,
		value: newTag
	}

	$.ajax({
		url: '/api/addTag',
		type: 'post',
		data: js,
		success: function(res) {
			location.reload();
		}
	});
});


function myFunction(x) {
    x.classList.toggle("change");
    $(".menulist").toggle();
};
