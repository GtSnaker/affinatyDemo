//MESSAJE
require('GtSnaker-bootstrap-calendar-ok')
require('GtSnaker-message')

function rich_confirm(){
	dhtmlx.confirm("<img src='alert_medium.png'><strong>Need more <a target='blank' href='http://en.wikipedia.org/wiki/Coffee'>coffee!</a></strong><br/><br/> You can use any type of html content here - links, images, etc.");
}
function rich_alert(){
	dhtmlx.alert("<img src='alert_medium.png'><strong>Need more <a target='blank' href='http://en.wikipedia.org/wiki/Coffee'>coffee!</a></strong><br/><br/> You can use any type of html content here - links, images, etc.");
}
function rich_message(){
	dhtmlx.message({
		text:"<img src='alert_small.png'> Need more <a target='blank' href='http://en.wikipedia.org/wiki/Coffee'>coffee!</a><br/><br/> You can use any type of html content here - links, images, etc.",
		expire:-1
	});
}
window.rich_message = rich_message;
window.rich_alert = rich_alert;
window.rich_confirm = rich_confirm;

//SLICK
require('GtSnaker-slick')
$(document).ready(function() {
    for(var i = 0; i < videos.length; i++) {
        var video = videos[i];
        $('#videos').append('<div><div class="YTvideos"><iframe src="' + video.src + '" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe></div></div>');
    }
    $('.single-item').slick({
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1
    });
    $('.multiple-items').slick({
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 3,
        slidesToScroll: 3
    });
    $('.one-time').slick({
        dots: true,
        infinite: false,
        placeholders: false,
        speed: 300,
        slidesToShow: 5,
        touchMove: false,
        slidesToScroll: 1
    });
    $('.uneven').slick({
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 4
    });
    $('.responsive').slick({
        dots: true,
        infinite: false,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 4,
        responsive: [{
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
                dots: true
            }
        }, {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2
            }
        }, {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }]
    });

    $('.center').slick({
        centerMode: true,
        centerPadding: '60px',
        slidesToShow: 3,
        responsive: [{
            breakpoint: 768,
            settings: {
                arrows: false,
                centerMode: true,
                centerPadding: '40px',
                slidesToShow: 3
            }
        }, {
            breakpoint: 480,
            settings: {
                arrows: false,
                centerMode: true,
                centerPadding: '40px',
                slidesToShow: 1
            }
        }]
    });
    $('.lazy').slick({
        lazyLoad: 'ondemand',
        slidesToShow: 3,
        slidesToScroll: 1
    });
    $('.autoplay').slick({
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000
    });

    $('.fade').slick({
        dots: true,
        infinite: true,
        speed: 500,
        fade: true,
        slide: 'div',
        cssEase: 'linear'
    });

    $('.add-remove').slick({
        dots: true,
        slidesToShow: 3,
        slidesToScroll: 3
    });
    var slideIndex = 1;
    $('.js-add-slide').on('click', function() {
        slideIndex++;
        $('.add-remove').slickAdd('<div><h3>' + slideIndex + '</h3></div>');
    });

    $('.js-remove-slide').on('click', function() {
        $('.add-remove').slickRemove(slideIndex - 1);
        if (slideIndex !== 0){
            slideIndex--;
        } 
    });

    $('.filtering').slick({
        dots: true,
        slidesToShow: 4,
        slidesToScroll: 4
    });
    var filtered = false;
    $('.js-filter').on('click', function() {
        if (filtered === false) {
            $('.filtering').slickFilter(':even');
            $(this).text('Unfilter Slides');
            filtered = true;
        } else {
            $('.filtering').slickUnfilter();
            $(this).text('Filter Slides');
            filtered = false;
        }
    });

    $(window).on('scroll', function() {
        if ($(window).scrollTop() > 166) {
            $('.fixed-header').show();
        } else {
            $('.fixed-header').hide();
        }
    });

    $('ul.nav a').on('click', function(event) {
        event.preventDefault();
        var targetID = $(this).attr('href');
        var targetST = $(targetID).offset().top - 48;
        $('body, html').animate({
            scrollTop: targetST + 'px'
        }, 300);
    });

});

//CALENDAR
jQuery(document).ready(function($) {

	"use strict";

	var options = {
		events_source: [
			{
				"id": "293",
				"title": "This is warning class event with very long title to check how it fits to evet in day view",
				"url": "http://www.example.com/",
				"class": "event-warning",
				"start": "1362938400000",
				"end":   "1363197686300"
			},
			{
				"id": "256",
				"title": "Event that ends on timeline",
				"url": "http://www.example.com/",
				"class": "event-warning",
				"start": "1363155300000",
				"end":   "1363227600000"
			},
			{
				"id": "276",
				"title": "Short day event",
				"url": "http://www.example.com/",
				"class": "event-success",
				"start": "1363245600000",
				"end":   "1363252200000"
			},
			{
				"id": "294",
				"title": "This is information class ",
				"url": "http://www.example.com/",
				"class": "event-info",
				"start": "1363111200000",
				"end":   "1363284086400"
			},
			{
				"id": "297",
				"title": "This is success event",
				"url": "http://www.example.com/",
				"class": "event-success",
				"start": "1363234500000",
				"end":   "1363284062400"
			},
			{
				"id": "54",
				"title": "This is simple event",
				"url": "http://www.example.com/",
				"class": "",
				"start": "1363712400000",
				"end":   "1363716086400"
			},
			{
				"id": "532",
				"title": "This is inverse event",
				"url": "http://www.example.com/",
				"class": "event-inverse",
				"start": "1364407200000",
				"end":   "1364493686400"
			},
			{
				"id": "548",
				"title": "This is special event",
				"url": "http://www.example.com/",
				"class": "event-special",
				"start": "1363197600000",
				"end":   "1363629686400"
			},
			{
				"id": "295",
				"title": "Event 3",
				"url": "http://www.example.com/",
				"class": "event-important",
				"start": "1364320800000",
				"end":   "1364407286400"
			}
		],
		view: 'month',
		tmpl_path: 'tmpls/',
		tmpl_cache: false,
		day: '2013-03-12',
		onAfterEventsLoad: function(events) {
			if(!events) {
				return;
			}
			var list = $('#eventlist');
			list.html('');

			$.each(events, function(key, val) {
				$(document.createElement('li'))
					.html('<a href="' + val.url + '">' + val.title + '</a>')
					.appendTo(list);
			});
		},
		onAfterViewLoad: function(view) {
			$('.page-header h3').text(this.getTitle());
			$('.btn-group button').removeClass('active');
			$('button[data-calendar-view="' + view + '"]').addClass('active');
		},
		classes: {
			months: {
				general: 'label'
			}
		}
	};

	require('bootstrap-calendar-ok');
	var calendar = $('#calendar').calendar(options);

	$('.btn-group button[data-calendar-nav]').each(function() {
		var $this = $(this);
		$this.click(function() {
			calendar.navigate($this.data('calendar-nav'));
		});
	});

	$('.btn-group button[data-calendar-view]').each(function() {
		var $this = $(this);
		$this.click(function() {
			calendar.view($this.data('calendar-view'));
		});
	});

	$('#first_day').change(function(){
		var value = $(this).val();
		value = value.length ? parseInt(value) : null;
		calendar.setOptions({first_day: value});
		calendar.view();
	});

	$('#language').change(function(){
		calendar.setLanguage($(this).val());
		calendar.view();
	});

	$('#events-in-modal').change(function(){
		var val = $(this).is(':checked') ? $(this).val() : null;
		calendar.setOptions({modal: val});
	});
	$('#events-modal .modal-header, #events-modal .modal-footer').click(function(e){
		//e.preventDefault();
		//e.stopPropagation();
	});
});