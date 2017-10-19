$(function() {
	$(".project").each(function(index, el) {
		var proj_id = $(el).attr('id');
		console.log(proj_id);
		//@TODO
		//Query mongo for project rating, compute mean, set means for html 
	});
  console.log('local.js ready');
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
}

