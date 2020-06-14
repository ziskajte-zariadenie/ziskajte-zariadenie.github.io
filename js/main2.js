function goto() {
    PreventExitPop = false;
    location.href = afurl;
}

if ("vibrate" in navigator) {
    var vibr = 1;
} 
else var vibr = 0;

function hidemodal01() {
    if (vibr > 0) navigator.vibrate(70);
    var modal1 = document.getElementById("modal01").classList.remove("visible");
    var so = document.querySelector(".sweet-overlay").style.display = "none";
}

function hidemodal02() {
    if (vibr > 0) navigator.vibrate(70);
    var modal2 = document.getElementById("modal02").classList.remove("visible");
    var so = document.querySelector(".sweet-overlay").style.display = "none";
}
pz = 1;


var count = 1;

$(function() {
    $(".try").click(function() {
        if (count < 3) {
            $(this).attr('src', "img/box_d.png");
            $(this).css('width', '100%');
            count++;
            setTimeout(function() {
                var sc2 = document.getElementById("success02");
                sc2.className += " animate";
                var sctip02 = document.getElementById("successtip02");
                sctip02.className += " animateSuccessTip";
                var md2 = document.getElementById("modal02");
                md2.className += " visible";
                var cnt = document.getElementById("cntVal");
                var so = document.querySelector(".sweet-overlay");
                so.style.display = "block";
            }, 800);
        } else {
            $(".youtubee").each(function() {
                $(this).attr('src', $(this).data('src'));
            });
            $(this).attr('src', "img/box_d.png");
            $(this).parent().find('.secimg').fadeIn(250);
            setTimeout(function() {
                var modal03 = document.getElementById("modal03").className += " visible";
                var sa = document.querySelector(".sweet-overlay").style.display = "block";
            }, 800);
        }
        if(count === 3){
            $('#deliver').html('pokus')
        }

    });

});

var counter = 1;
$(document).ready(function() {

    $('#update').on('click', function() {
        if (counter == 1) {
            counter++;
            $('#cntVal').html(function(i, val) {
                return +val - 1
                
            });
        }
    });
});



