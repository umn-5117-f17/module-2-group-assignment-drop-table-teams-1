var months = new Array(12);
months[0] = "January";
months[1] = "February";
months[2] = "March";
months[3] = "April";
months[4] = "May";
months[5] = "June";
months[6] = "July";
months[7] = "August";
months[8] = "September";
months[9] = "October";
months[10] = "November";
months[11] = "December";

$(function() {
	$('.date-span').each(function(index,el){
	var tmp = el.innerHTML;
	console.log(tmp);
	var new_date = convertDate(tmp);
	console.log(new_date);
	el.innerHTML =new_date;
	});
	$(".project").each(function(index, el) {
		var proj_id = $(el).attr('id');
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
			window.location.href = "https://agile-lake-41083.herokuapp.com/";
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

function convertDate(dateStr){
	var timestamp = new Date(dateStr);
	var month = timestamp.getMonth();
	var day = timestamp.getDay();
	var year = timestamp.getFullYear();
	var result = "".concat(months[month]);
	result = result +", ";
	result = result + String(day) +", " + String(year);

	return result;
};


function myFunction(x) {
    x.classList.toggle("change");
    $(".menulist").toggle();
};
