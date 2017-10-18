$(function() {
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
