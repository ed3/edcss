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
	var $target = $this.attr('data-target');
	$('#'+$target).hide();
	if ($this.is('a')) e.preventDefault();
	$("body").css("overflow","hidden");
	$('#'+$target).show();
	$('#'+$target).on('click','[data-dismiss="modal"]', function(){
	$("body").css("overflow","auto");
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
var w = $(window).width();
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
