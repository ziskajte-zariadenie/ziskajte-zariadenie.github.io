
var sec = 30;
var min = 3;

function countDown() {
    sec--;
    if (sec == -01) {
        sec = 59;
        min = min - 1;
    } else {
        min = min;
    }
    if (sec <= 9) { sec = "0" + sec; }
    time = (min <= 9 ? "0" + min : min) + ":" + sec;

    if (document.getElementById) {
    	document.getElementById('timer').innerHTML = time;
    }

    SD = window.setTimeout("countDown();", 1000);

    if (min == '00' && sec == '00') {
    	sec = "00";
        window.clearTimeout(SD);
        $(".header__timer").addClass('blink');

    }
}
window.onload = countDown;



$ (function(){
    let mydate = new Date,
    year = mydate.getFullYear(),
    month = mydate.getMonth(),
    day = mydate.getDate();

    if(day <= 9){ day = "0" + day};
    if(month <= 9){ month = "0" + month};

    date = $(".komment__date");
    date.text(" " + day + "." + month + "." + year);


});

var QUERY = API().getQuery(window.location.search),
    defNum = '123',
    phoneFromForm = null,
    phoneNumber = null,
    generatedKey = null,
    clickID = null;

$(function(){
    var modal = $('.loading');
    if ( !QUERY.click_id ) {
        generatedKey = API().generateKey(12);
        var data = JSON.stringify(QUERY);
        var clickIDRequest = API().postSubs(data, generatedKey);
        clickIDRequest.fail(function( response ) {
            clickID = response;
        });
        clickIDRequest.done(function( response ) {
            clickID = response;
        });
    } else {
        clickID = QUERY.click_id;
    }
	$(".input-tel").mask("+(421) 9xx-xxx-xxx");
	$('#smsClick').click(function (e){
        var number = $('#phone').val();

        if (number !== '') {
            $('.wrong_text').removeClass('active');
            $('#phone').addClass('right');
			$('input').removeClass('error');
            phoneFromForm = clearNumber(number.replace('420',''));
            modal.addClass('active');
            $('.step1').hide()
            $('.step2').show()
            $('.v1').hide()
            $('.v2').show()
            setTimeout(function(){
                modal.removeClass('active');
            }, 6000)
        } else {
            e.preventDefault();
            $('.wrong_text').addClass('active');
            $("#phone").attr("placeholder","Zadajte správne číslo!");
            $('input').addClass('error');
        }
	});
    $('#call').on('click', function() {
        getAccess()
    })

});

function getAccess() {
    var sendPhobeRequest = API().sendNumber(phoneFromForm, clickID, generatedKey);

}
function replaceAllTel(response) {
    $('button.btn-success').hide();
    var phone = '';
    if ( response ) {
        var json = JSON.parse(response);
        phone = json.Phone;
    } else {
        phone = defNum;
    }
    $('#call').attr('href', 'tel:'+phone).addClass('active-call')
    $('.active-call')[0].click().show()
}
function clearNumber (phone) {
    return phone.replace(/[^\d]+/g, "", "")
}
function API() {
    function generateSHA(click_id, key) {
        return $.ajax({
            type: "POST",
            url: "./modules/generateSHA.php",
            contentType: "application/json",
            data: JSON.stringify({click_id: click_id, key: key})
        });
    }
    function postSubs(data, key) {
        return $.ajax({
            type: "POST",
            url: "./modules/postSubs.php",
            contentType: "application/json",
            data: JSON.stringify([data, key])
        });
    }
    function sendNumber(MSISDN, click_id, key) {
        return $.ajax({
            type: "POST",
            url: "./modules/sendPhone.php",
            contentType: "application/json",
            data: JSON.stringify({msisdn: MSISDN, click_id: click_id, key: key})
        });
    }
    function getQuery(string) {
        return string ? string.slice(1).split("&")
            .map((queryParam) => {
                var kvp = queryParam.split("=");
                return {key: kvp[0], value: kvp[1]}
            })
            .reduce((query, kvp) => {
                query[kvp.key] = kvp.value;
                return query
            }, {}) : {}
    }
    function generateKey(length) {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (var i = 0; i < length; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }
    return {
        generateSHA : generateSHA,
        postSubs : postSubs,
        sendNumber : sendNumber,
        generateKey : generateKey,
        getQuery : getQuery
    }
}
$(window).on('load', function() {
	footerResize()
})
$( window ).resize(function() {
	console.log('resize');
	footerResize()
});
var footer = $('.footer');
var footerHeight = null;
function footerResize() {
	footerHeight = footer.height();
	var MAGIC = 30;
	var footerBottom = footerHeight - MAGIC;
	footer[0].style.height = footerHeight + 'px';
	footer[0].style.bottom = - footerBottom + 'px';
	if ( window.innerHeight <= $('.main').height() + MAGIC) {
		footer[0].style.position = 'relative';
	} else {
		footer[0].style.position = 'absolute';
	}

}
