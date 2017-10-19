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
  console.log('local.js ready');
});});

$("#project").click(function(){
//@TODO implement this
//redirect to project the user clicked on
//this.getid
//query mongo
//request get to project page.
});



/*$(function() {
    $('.toggle-nav').click(function(e) {
        $(this).toggleClass('active');
        $('.menu ul').toggleClass('active');
 
        e.preventDefault();
    });
});
*/
function myFunction(x) {
    x.classList.toggle("change");
    $(".menulist").toggle();
};

