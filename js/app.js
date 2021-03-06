//MESSAJE
// debugger
require('bootstrap-calendar')
require('message')

var slick_array = [];

function rich_confirm(){
	dhtmlx.confirm("<img src='alert_medium.png'><strong>Need more <a target='blank' href='http://en.wikipedia.org/wiki/Coffee'>coffee!</a></strong><br/><br/> You can use any type of html content here - links, images, etc.");
}
function rich_alert(){
	dhtmlx.alert("<img src='alert_medium.png'><strong>Need more <a target='blank' href='http://en.wikipedia.org/wiki/Coffee'>coffee!</a></strong><br/><br/> You can use any type of html content here - links, images, etc.");
}
function rich_message(){
	dhtmlx.message({
		text: "<img src='alert_small.png'> Need more <a target='blank' href='http://en.wikipedia.org/wiki/Coffee'>coffee!</a><br/><br/> You can use any type of html content here - links, images, etc.",
		expire: -1
	});
}
window.rich_message = rich_message;
window.rich_alert = rich_alert;
window.rich_confirm = rich_confirm;

// ripped from:
// http://stackoverflow.com/questions/3452546/javascript-regex-how-to-get-youtube-video-id-from-url
var vimeo_regex = /https?:\/\/(?:www\.)?vimeo.com\/(?:channels\/|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|)(\d+)(?:$|\/|\?)/;
function vimeo_parse(url) {
	var match;
	if((match = url.match(vimeo_regex)) && typeof match[3] === 'string') {
		return match[3];
	} else return null;
}

var yt_regex = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
function youtube_parse(url) {
	var match;
	if((match = url.match(yt_regex)) && match[7].length === 11) {
		return match[7];
	} else return null;
}

var vine_regex = /^http(?:s?):\/\/(?:www\.)?vine\.co\/v\/([a-zA-Z0-9]{1,13})$/;
function vine_parse(url) {
	var match; 
	if((match = url.match(vine_regex)) && match[1].length === 11) {
		return match[1];
	} else return null;
}

var slick_count = 0;
function slick_add(el, html, c) {
	if(typeof c === 'number') {
		var addBefore = true
		if(c === el[0].slick.slideCount) {
			addBefore = false;
			if(c > 0) {
				c--;
			} else {
				c = void(8);
			}
		}
			el.slickAdd(html, c, addBefore);
			slick_array.push(html);
			console.log(slick_array);
	} else {
		el.slickAdd(html);
	}
	slick_count++;
}


var url_regex = /(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/;
function parse_msg_txt(text, el) {
	var v, s;
	var newText;
	var array = [];

	if((v = url_regex.exec(text)) && ~(s = text.indexOf(v[0]))) {
		var url = text.substr(s);
		var end;
		if(~(end = url.indexOf(' '))) {
			// if url has a space, we only want till the the space
			//end = null;
			url = url.substr(0, end);
		}

		//console.log(newText);
		if((newText = text.substr(0, s-1).trim()).length > 0) {
			// el.slickRemove(array.length);
			// array.push(newText);
			//slick_add(el, '<div><p>'+newText+'</p></div>');
		}

		var id;
		if(~url.indexOf('youtube.com')) {
			// parse for youtube urls
			id = youtube_parse(url);
			// array.push({youtube: id});
			var video_name;
			$.ajax("http://gdata.youtube.com/feeds/api/videos/"+id+"?v=2&alt=json", {
				complete: function(e) {
					video_name = e.responseJSON.entry.title.$t;
					//console.log(video_name);
				}
			});
			var vid_parent;
			debugger
			slick_add(el,
				vid_parent = cE('div', {data: {id:id}},
					cE('img', {
						src: 'http://img.youtube.com/vi/'+id+'/mqdefault.jpg',
						onclick: (el[0].id === 'theOne' ? function(event) {
							var modal;
							// aC(null,
							$(modal = cE('div', {c: "modal fade", id:"myModal", tabindex:"-1", role:"dialog", aria: {labelledby:"myModalLabel", hidden:"true"}},
								cE('div', {c: "modal-dialog"},
									cE('div', {c: "modal-content"},
										cE('div', {c: "modal-header"},
											cE('button', {type:"button", c:"close", data: {dismiss:"modal"}, aria: {hidden:"true"}, html: "&times;"}),
											cE('h4', {c:"modal-title", id:"myModalLabel"}, video_name)
										),
										cE('div', {c: "modal-body"},
											cE('div', {c: "YTvideos"},
												cE('iframe', {
													src:'http://www.youtube.com/embed/'+vid_parent.dataset.id,
													frameborder: 10,
													webkitallowfullscreen: true,
													mozallowfullscreen: true,
													allowfullscreen: true
												})
											)
										),
										cE('div', {c: "modal-footer"},
											cE('button', {type:"button", c:"btn btn-default", data: {dismiss:"modal"}}, "Close"),
											cE('button', {type:"button", c:"btn btn-primary"}, "Favorite me!")
										)
									)
								)
							)).modal({
								onremove: null
							});
							$(modal).on('hidden.bs.modal', function (e) {
								// dumb hack
								rC(modal);
							})
						} : null)
					})
				)
			);
			//slick_add(el, '<div><img src="http://img.youtube.com/vi/'+id+'/mqdefault.jpg"/></div>');
		} else if(~url.indexOf('vimeo.com')) {
			id = vimeo_parse(url);
			console.log("loading at", slick_count)
			var update_vimeo = function(c) {
				$.ajax("http://vimeo.com/api/v2/video/"+id+".json", {
					complete: function(e) {
						var video_info = e.responseJSON[0];
						console.log("remove:", c)
						el.slickRemove(c);
						slick_add(el, vid_parent = cE('div', {data: {id:id}},
							cE('img', {
								src: video_info.thumbnail_large,
								onclick: (el[0].id === 'theOne' ? function(event) {
									var modal;
									// aC(null,
									$(modal = cE('div', {c: "modal fade", id:"myModal", tabindex:"-1", role:"dialog", aria: {labelledby:"myModalLabel", hidden:"true"}},
										cE('div', {c: "modal-dialog"},
											cE('div', {c: "modal-content"},
												cE('div', {c: "modal-header"},
													cE('button', {type:"button", c:"close", data: {dismiss:"modal"}, aria: {hidden:"true"}, html: "&times;"}),
													cE('h4', {c:"modal-title", id:"myModalLabel"}, video_info.title)
												),
												cE('div', {c: "modal-body"},
													cE('div', {c: "YTvideos"},
														cE('iframe', {
															src:'http://player.vimeo.com/video/'+vid_parent.dataset.id,
															frameborder: 0,
															webkitallowfullscreen: true,
															mozallowfullscreen: true,
															allowfullscreen: true
														})
													)
												),
												cE('div', {c: "modal-footer"},
													cE('button', {type:"button", c:"btn btn-default", data: {dismiss:"modal"}}, "Close"),
													cE('button', {type:"button", c:"btn btn-primary"}, "Favorite me!")
												)
											)
										)
									)).modal({
										onremove: null
									});
									$(modal).on('hidden.bs.modal', function (e) {
										// dumb hack
										rC(modal);
									})
								} : null)
							})
						)
						);
						//slick_add(el, '<div><img src="'+e.responseJSON[0].thumbnail_large+'"/></div>', c);
						slick_add(el, ' ');
					}
				});
			};
			update_vimeo(slick_count);
			slick_add(el, '<div>loading...</div>');
			// array.push({vimeo: id});
			//slick_add(el, '<div>vimeo: '+id+'</div>');

		} else if (~url.indexOf('vine.co')) {
			id = vine_parse(url);
			//console.log(id);

			var video_name;
			// $.ajax("http://gdata.vine.com/feeds/api/videos/"+id+"?v=2&alt=json", {
			// 	complete: function(e) {
			// 		debugger
			// 		video_name = e.responseJSON.entry.title.$t;
			// 		console.log(video_name);
			// 	}
			// });

			var vid_parent;

			slick_add(el,
				vid_parent = cE('div', {data: {id:id}},
					cE('img', {
						src: 'https://pbs.twimg.com/profile_images/3578238864/50d7e05aa6fe5d477e48a63047e38ce7_400x400.png',
						onclick: (el[0].id === 'theOne' ? function(event) {
							var iframe;
							var modal;
							// aC(null,
							$(modal = cE('div', {c: "modal fade", id:"myModal", tabindex:"-1", role:"dialog", aria: {labelledby:"myModalLabel", hidden:"true"}},
								cE('div', {c: "modal-dialog"},
									cE('div', {c: "modal-content"},
										cE('div', {c: "modal-header"},
											cE('button', {type:"button", c:"close", data: {dismiss:"modal"}, aria: {hidden:"true"}, html: "&times;"}),
											cE('h4', {c:"modal-title", id:"myModalLabel"}, " ")
										),
										cE('div', {c: "modal-body"},
											cE('div', {c: "YTvideos"},
												iframe = cE('iframe', {										
													src:'https://vine.co/v/'+vid_parent.dataset.id+'/embed/simple',
													frameborder: 0,
													webkitallowfullscreen: true,
													mozallowfullscreen: true,
													allowfullscreen: true
												})
											)
										),
										cE('div', {c: "modal-footer"},
											cE('button', {type:"button", c:"btn btn-default", data: {dismiss:"modal"}}, "Close"),
											cE('button', {type:"button", c:"btn btn-primary"}, "Favorite me!")
										)
									)
								)
							)).modal({
								onremove: null
							});
							$(modal).on('hidden.bs.modal', function (e) {
								// dumb hack
								rC(modal);
							})
						} : null)
					})
				)
			);
			//'<div><img src="http://www.rocketfishltd.co.uk/blog/wp-content/uploads/2014/02/vine-logo.jpg" /></div>');		
		} else {
			// array.push({url: url});
			var n = url.lastIndexOf('.');
			var normal_url = true;
			if(~n){
				switch(url.substr(n).toLowerCase()){
					case '.jpg':
					case '.bmp':
					case '.cgm':
					case '.g3':
					case '.gif':
					case '.ief':
					case '.jpeg':
					case '.ktx':
					case '.png':
					case '.btif':
					case '.sgi':
					case '.svg':
					case '.tiff':
					case '.psd':
					case '.uvi':
					case '.sub':
					case '.djvu':
					case '.dwg':
					case '.dxf':
					case '.fbs':
					case '.fpx':
					case '.fst':
					case '.mmr':
					case '.rlc':
					case '.mdi':
					case '.wdp':
					case '.npx':
					case '.wbmp':
					case '.xif':
					case '.webp':
					case '.3ds':
					case '.ras':
					case '.cmx':
					case '.fh':
					case '.ico':
					case '.sid':
					case '.pcx':
					case '.pic':
					case '.pnm':
					case '.pbm':
					case '.pgm':
					case '.ppm':
					case '.rgb':
					case '.tga':
					case '.xbm':
					case '.xpm':
					case '.xwd':
						slick_add(el, '<div><img src="'+url+'" /></div>');
						normal_url = false;
						break
					case '.adp':
					case '.au':
					case '.mid':
					case '.mp4a':
					case '.mpga':
					case '.oga':
					case '.s3m':
					case '.sil':
					case '.uva':
					case '.eol':
					case '.dra':
					case '.dts':
					case '.dtshd':
					case '.lvp':
					case '.pya':
					case '.rip':
					case '.weba':
					case '.aac':
					case '.aif':
					case '.caf':
					case '.flac':
					case '.mka':
					case '.m3u':
					case '.wax':
					case '.wma':
					case '.ram':
					case '.rmp':
					case '.wav':
					case '.xm':
						slick_add(el, '<div><audio src="'+url+'" controls preload/></div>');
						normal_url = false;
						break
					case '.3gp':
					case '.3g2':
					case '.h261':
					case '.h263':
					case '.h264':
					case '.jpgv':
					case '.jpm':
					case '.mj2':
					case '.mp4':
					case '.mpeg':
					case '.ogv':
					case '.qt':
					case '.uvh':
					case '.uvm':
					case '.uvp':
					case '.uvs':
					case '.uvv':
					case '.dvb':
					case '.fvt':
					case '.mxu':
					case '.pyv':
					case '.uvu':
					case '.viv':
					case '.webm':
					case '.f4v':
					case '.fli':
					case '.flv':
					case '.m4v':
					case '.mkv':
					case '.mng':
					case '.asf':
					case '.vob':
					case '.wm':
					case '.wmv':
					case '.wmx':
					case '.wvx':
					case '.avi':
					case '.movie':
					case '.smv':
						slick_add(el, '<div><video src=" '+url+' " width="320" height="200" controls preload></video>></div>');
						normal_url = false;
						break
				}
			}
			// if(url.substr(-4) === '.jpg') {
			// 	slick_add(el, '<div><img src="'+url+'" /></div>');
			// } 
			// else if (url.substr(-4) === '.png'){
			// 	slick_add(el, '<div><img src="'+url+'" /></div>');
			// } 
			// else if (url.substr(-4) === '.gif'){
			// 	slick_add(el, '<div><img src="'+url+'" /></div>');
			// }
			// else if (url.substr(-4) === '.JPG'){
			// 	slick_add(el, '<div><img src="'+url+'" /></div>');
			// }
			if(normal_url) {
				slick_add(el, '<div> <a href="'+(~url.indexOf('://') ? url : 'http://'+url)+'"> <p>'+url+'</p> </a> </div>');
			}
		}

		if(~end && (id = text.substr(s+end).trim()).length > 0) {
			parse_msg_txt(id, el);
		}
		// array.push();
	} else if((text = text.trim()).length > 0) {
		// array.push(text.trim());
		// slick_add(el, '<p>'+id+'</p>');
		//slick_add(el, '<div><p>'+text+'</p></div>');
	}

	// if(array[0].length) {
	// 	console.log("TWEXT", array[0])
	// }
	// var o, id;
	// if(typeof (o = array[1]) === 'object') {
	// 	if(id = o.youtube) {
	// 		console.log("youtube!!!", id)
	// 	} else if(id = o.url) {
	// 		console.log("url!!!!", id)
	// 	}
	// }
	// if(typeof (id = array[2]) === 'string' && id.length) {
	// 	parse_msg_txt(id, el);
	// }
	// console.log('returning...', array)
	// return array;
}
window.parse_msg_txt = parse_msg_txt;
window.youtube_parse = youtube_parse;
//parse_msg_txt('lkjlkj  http://www.youtube.com/watch?v=7J6VXuEVmio more text');


//SLICK
require('slick')
$(document).ready(function() {
	var videos = [
		{src:"http://www.youtube.com/embed/moSFlvxnbgk"},
		{src:"http://www.youtube.com/embed/1ggPgTNvw_k"},
		{src:"http://player.vimeo.com/video/92512296"},
		{src:"http://player.vimeo.com/video/92224516?badge=0"},
		{src:"https://vine.co/v/MilH1uzQlUK/embed/simple"},
		{src:"https://vine.co/v/bjHh0zHdgZT/embed/simple"}
	];
	var imgs = [
		{src:"http://lorempixel.com/400/200/abstract/"},
		{src:"http://lorempixel.com/420/300/abstract/"},
		{src:"http://lorempixel.com/460/400/abstract/"}
	];
	/*
	for(var i = 0; i < videos.length; i++) {
		var video = videos[i];
		$('#videos').append('<div><div class="YTvideos"><iframe src="' + video.src + '" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe></div></div>');
	}
	//*/


	// ... everything you need to do, here
function update_slick(text) {	
	var la = $('#theOne').slickRemove();
	while(la.slickRemove(0)[0].slick.slideCount) {}
	slick_count = 0;
	
	parse_msg_txt(text.trim(), la);

	var el = $('#videos').slickRemove();
	while(el.slickRemove(0)[0].slick.slideCount) {}
	slick_count = 0;
	parse_msg_txt(text.trim(), el);
}

var updater;
var _ = require('underscore');
	$('textarea.form-control').bind("keyup", function(e) {		
		clearTimeout(updater);
		updater = setTimeout(function(){
			update_slick(e.target.value);
		}, 2000);	
	});

	// for(var i=0; i < array.length; i++) {
	// 	if(!_.isDeepEqual(array[i], old_array[i])) {
	// 		// updte the element
	// 	}
	// }

	///*
	for(var i = 0; i < imgs.length; i++) {
		var img = imgs[i];
		$('#videos').append('<div><div class="YTvideos"><img src="' + img.src + '"></img></div></div>');
	}

	for(var i = 0; i < imgs.length; i++) {
		var img = imgs[i];
		$('#theOne').append('<div><div class="YTvideos"><img src="' + img.src + '"></img></div></div>');
	}
	//*/
	$('#videos').slick({
		dots: true,
		infinite: true,
		speed: 300,
		slidesToShow: 5,
		slidesToScroll: 1
	});
	$('#videos').bind("click", function (event) {
		var lala = $(event.target).parent().index();
		if (typeof lala === 'number') {
		$('#theOne').slickGoTo(lala);
		}
	})
	$('#theOne').slick({
		dots: false,
		infinite: false,
		speed: 300,
		slidesToShow: 1,
		slidesToScroll: 1
	});
	$('.add-remove').slick({
		dots: true,
		slidesToShow: 3,
		slidesToScroll: 3
	});
	var slideIndex = 1;
	$('.js-add-slide').on('click', function() {
		slideIndex++;
		$('.add-remove').slickAdd('<div><p>' + texto + '</p></div>');
	});

	$('.js-remove-slide').on('click', function() {
		$('.add-remove').slickRemove(slideIndex - 1);
		if (slideIndex !== 0){
			slideIndex--;
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
