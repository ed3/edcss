(function(){//alert close
var alerts = document.querySelectorAll('.alert .close');
[].forEach.call(alerts, function(alert){
alert.addEventListener('click', function (e){
e.preventDefault();
e.target.parentNode.parentNode.removeChild(e.target.parentNode);
});
});
})();

(function(){//nav hamburger
var navs = document.querySelector('.navbar-toggle');
navs.addEventListener('click', function (e){
e.preventDefault();
document.querySelector('.navbar-nav').classList.toggle('nav-open');
});
})();

(function(){//nav dropdown
var nav_dds = document.querySelectorAll('.dropdown-toggle');
[].forEach.call(nav_dds, function(nav_dd){
nav_dd.addEventListener('click', function (e){
e.preventDefault();
var nextEl = this.nextElementSibling;
//mobile
if(nextEl.classList.contains('dropdown-menu')) nextEl.classList.add('dropdown-open');
else nextEl.classList.remove('dropdown-open');
//desktop => @media (min-width:768px) {.dropdown:hover>.dropdown-menu {display:block}}
});
});
})();

(function(){//tab
var tabs = document.querySelectorAll('.nav-tabs li');
[].forEach.call(tabs, function(tab){
tab.addEventListener('click', function(e){
e.preventDefault();
var self=this;
if(self.classList.contains('disabled')==false){
[].forEach.call(self.parentNode.children, function(el){
el.classList.remove('active');
});
self.classList.add('active');
var id = e.target.getAttribute('href').replace(/.*(?=#[^\s]*$)/,'');
var next = self.parentNode.nextElementSibling;
[].forEach.call(next.children, function(el){
el.style.display = "none";
});
next.querySelector(id).style.display = "block";
}
});
});
})();

(function(){//modal
var modals = document.querySelectorAll('[data-toggle="modal"]');
[].forEach.call(modals, function(modal){
modal.addEventListener('click', function(e){
var modal_target = this.getAttribute('data-target');
var tagetEl = document.getElementById(modal_target);
tagetEl.style.display = "none";
if(this.tagName == 'A') e.preventDefault();
document.body.style.overflow = "hidden";
tagetEl.style.display = "block";
var dismiss = tagetEl.querySelectorAll('[data-dismiss="modal"]');
for (var j = 0; j < dismiss.length; j++){
dismiss[j].addEventListener('click', function(e){
document.body.style.overflow = "auto";
tagetEl.style.display = "none";
});
}
});
});
})();

(function(){//carousel
var time = 5000;
var carouselTimer = setInterval(function(){carousel();}, time);
var indicators = document.querySelectorAll('.indicator');
[].forEach.call(indicators, function(indicator){
indicator.addEventListener('click', function(e){
var idx = Array.from(this.parentNode.children).indexOf(this);
carousel(idx);
clearInterval(carouselTimer);
carouselTimer = setInterval(function(){carousel();}, time);
});
});
function carousel(idx){//slide
var items = document.querySelectorAll('.carousel-inner .item');
var active = Array.from(items).indexOf(document.querySelector('.carousel-inner .item.active'));
[].forEach.call(items, function(item){
item.classList.remove('active');
});
if(active >= items.length-1) active = -1;
active = active+1;
if(idx != null) active = idx;
items[active].classList.add('active');
var indicators = document.querySelectorAll('.carousel-indicators .indicator');
[].forEach.call(indicators, function(indicator){
indicator.classList.remove('active');
});
indicators[active].classList.add('active');
}
})();