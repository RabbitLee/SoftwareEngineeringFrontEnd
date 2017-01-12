/**
 * Created by zhaoangyouyou on 24/12/2016.
 */
function animate() {
    $('#paper-plane').removeClass('plane float').addClass('flyaway ' + 'pushOut').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
        $('#paper-plane').addClass('plane float').removeClass('flyaway ' + 'pushOut');
    });
};
//
// $(document).ready(function() {
//     $('.mySlideshow').edslider({
//         width : '100%',
//         height: 700,
//         progress: false,
//         interval: 4000,
//     });
//
// });

//headroom
$(function() {
    $(".nav").headroom({
            tolerance: 5,
            offset: 100,
            classes: {
                initial: "animated",
                pinned: "slideDown",
                unpinned: "slideUp"
            }
    });

//mobile adaptive
    $(".nav-on").click(function(){
        $(".nav>ul").toggle();
    });
//paper-plane animat 这个好像没实现= =
    $('#paper-plane').click(function(e) {
        e.preventDefault();
        animate();
    });


})

