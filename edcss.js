(function($){
//close alert
$('.alert .close').on('click',function(e){
	e.preventDefault();
	$(this).parent().remove();
});

//nav
nav();
$(window).resize(function(){nav();});
$('.navbar-toggle').on('click',function(){
$('.navbar-nav').toggleClass('nav-open');
});

//tab
if($(".nav-tabs")){
$('.nav-tabs li').on('click',function(e){
	e.preventDefault();
	if($(this).hasClass("disabled")==false) {
	$(this).siblings().removeClass("active");
	$(this).addClass("active");
	var id = $(this).find("a").prop("href").replace(/.*(?=#[^\s]*$)/, '');
	var el = $(this).parent().next(".tab-content").find(id);
	$(el).siblings().hide();
	$(el).show();
	}
});
}

//modal
if($(".modal")){
$(document).on('click', '[data-toggle="modal"]', function(e){
	var $this = $(this);
	var $target = $this.data('target');
	$('#'+$target).hide();
	if ($this.is('a')) e.preventDefault();
	$("html,body").css("overflow","hidden");
	$('#'+$target).show();
	$('#'+$target).on('click','[data-dismiss="modal"]', function(){
	$("html,body").css("overflow","auto");
	$('#'+$target).hide();
	});
});
}

//carousel indicator
if($(".carousel")){
var time = 5000;
var carouselTimer = setInterval(function(){carousel();}, time);
$(".indicator").on('click',function(){
	var idx = $(".indicator").index(this);
	carousel(idx);
	clearInterval(carouselTimer);
	carouselTimer = setInterval(function(){carousel();}, time);
});
}

//gallery
$.fn.gallery = function(options) {
var settings = $.extend({}, options);
var winSize= function(){
	var w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	var h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
	return w+'x'+h;
}
function disableButtons(count_max, count_current){
	$('#previous-img, #next-img').show();
	if(count_max == count_current){
	$('#next-img').hide();
	}else if(count_current == 1){
	$('#previous-img').hide();
	}
}
function loadGallery(setIDs, setClick){
	var current_image, selector, count = 0;
	$(document).bind("keydown",function(e){
		if(e.keyCode==27 || e.which==27){
		$(".modal").hide();
		$("html,body").css("overflow","auto");
		}
		if(current_image >= count && (e.keyCode==39 || e.which==39)) return false;
		if(e.keyCode==39 || e.which==39){
		current_image++;
		selector = $('[data-id="' + current_image + '"]');
		updateGallery(selector);
		}
		if(current_image <= 1 && (e.keyCode==37 || e.which==37)) return false;
		else if(e.keyCode==37 || e.which==37){
		current_image--;
		selector = $('[data-id="' + current_image + '"]');
		updateGallery(selector);
		}
	});
	$('#next-img, #previous-img').click(function(){
		if($(this).attr('id') == 'previous-img'){
		current_image--;
		} else {
		current_image++;
		}
		selector = $('[data-id="' + current_image + '"]');
		updateGallery(selector);
	});
	function size(sel){
		var img = new Image();
		img.src = sel.children().prop("src");
		var imgW= img.width, imgH= img.height;
		var siz = winSize().split('x');
		var w=siz[0],h=siz[1];
		var left = (imgW<w ? (w/2-imgW/2):0);
		$('.gallery-img').css({'width':(imgW<w?imgW:w),'left':left,'height':h,'background-image':'url("'+sel.children().prop("src")+'")','background-repeat':'no-repeat','background-position':'center','background-size':'contain'});
	}
	function updateGallery(selector){
		var $sel = selector;
		current_image = $sel.data('id');
		disableButtons(count, $sel.data('id'));
		size($sel);
		$(window).resize(function(){size($sel)});
	}
	if(setIDs == true){
		$('[data-id]').each(function(){
		count++;
		$(this).attr('data-id',count);
		});
	}
	$(setClick).on('click',function(){
		updateGallery($(this));
	});
}
return loadGallery(true, this);
};

$('a.thumbnail').gallery();

})(jQuery);



//carousel slide
function carousel(idx){
var it = $(".carousel-inner .item");
var act = $(".carousel-inner .item.active").index();
it.fadeOut(0, function(){$(this).removeClass("active");});
if(act >= it.length-1) act = -1;
act = act+1;
if(idx != null) act = idx;
$(".carousel-inner .item:eq("+act+")").fadeIn(500, function(){$(this).addClass("active");});
//indicator
$(".carousel-indicators .indicator").removeClass("active");
$(".carousel-indicators .indicator:eq("+act+")").addClass("active");
}

//fn nav
function nav(){
var w = window.innerWidth;
if(w > 767) {
	$('.dropdown').hover(
	function(){$(this).children('.dropdown-menu').css('display','block');},
	function(){$(this).children('.dropdown-menu').css('display','none');}
	);
}
if(w <= 767) {
	$('.dropdown-toggle').on('click',function(){
	var el = $(this).next('.dropdown-menu');
	if(el.is(":hidden")) el.addClass('dropdown-open');
	else el.removeClass('dropdown-open');
	});
}
}