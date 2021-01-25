(function(){//alert close
var alerts=document.querySelectorAll('.alert .close');
[].forEach.call(alerts,function(alert){
alert.addEventListener('click',function(e){
e.preventDefault();
e.target.parentNode.parentNode.removeChild(e.target.parentNode);
});
});
})();

(function(){//nav hamburger
var navs=document.querySelector('.navbar-toggle');
navs.addEventListener('click',function(e){
e.preventDefault();
document.querySelector('.navbar-nav').classList.toggle('nav-open');
});
})();

(function(){//nav dropdown
var nav_dds=document.querySelectorAll('.dropdown-toggle');
[].forEach.call(nav_dds,function(nav_dd){
nav_dd.addEventListener('click',function(e){
e.preventDefault();
var nextEl=this.nextElementSibling;
//mobile
if(nextEl.classList.contains('dropdown-menu')) nextEl.classList.add('dropdown-open');
else nextEl.classList.remove('dropdown-open');
//desktop: @media (min-width:768px){.dropdown:hover>.dropdown-menu {display:block}}
});
});
})();

(function(){//tab
var tabs=document.querySelectorAll('.nav-tabs li');
[].forEach.call(tabs,function(tab){
tab.addEventListener('click',function(e){
e.preventDefault();
var self=this;
if(self.classList.contains('disabled')==false){
[].forEach.call(self.parentNode.children,function(el){
el.classList.remove('active');
});
self.classList.add('active');
var id=e.target.getAttribute('href').replace(/.*(?=#[^\s]*$)/,'');
var tabnext=self.parentNode.nextElementSibling;
[].forEach.call(tabnext.children,function(el){
el.style.display="none";
});
tabnext.querySelector(id).style.display="block";
}
});
});
})();

(function(){//modal
var modals=document.querySelectorAll('[data-toggle="modal"]');
[].forEach.call(modals,function(modal){
modal.addEventListener('click',function(e){
var modal_target=this.getAttribute('data-target');
var tagetEl=document.getElementById(modal_target);
tagetEl.style.display="none";
if(this.tagName=='A') e.preventDefault();
document.body.style.overflow="hidden";
tagetEl.style.display="block";
var dismiss=tagetEl.querySelectorAll('[data-dismiss="modal"]');
[].forEach.call(dismiss,function(dismis){
dismis.addEventListener('click',function(e){
document.body.style.overflow="auto";
tagetEl.style.display="none";
});
});
});
});
})();

(function(){//carousel
var time=5000;
var carouselTimer=setInterval(function(){carousel();},time);
var indicators=document.querySelectorAll('.indicator');
[].forEach.call(indicators,function(indicator){
indicator.addEventListener('click',function(e){
var idx=Array.from(this.parentNode.children).indexOf(this);
carousel(idx);
clearInterval(carouselTimer);
carouselTimer=setInterval(function(){carousel();},time);
});
});
function carousel(idx){//slide
var items=document.querySelectorAll('.carousel-inner .item');
var active=Array.from(items).indexOf(document.querySelector('.carousel-inner .item.active'));
[].forEach.call(items,function(item){
item.classList.remove('active');
});
if(active >= items.length-1) active=-1;
active=active+1;
if(idx != null) active=idx;
items[active].classList.add('active');
var indicators=document.querySelectorAll('.carousel-indicators .indicator');
[].forEach.call(indicators,function(indicator){
indicator.classList.remove('active');
});
indicators[active].classList.add('active');
}
})();

(function(){//gallery
var prevImg=document.querySelector('#previous-img'), nextImg=document.querySelector('#next-img');
var winSize=function(){
var w=window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth;
var h=window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight;
return w+'x'+h;
}
function disableButtons(count_max,count_current){
prevImg.style.display="block";
nextImg.style.display="block";
if(count_max == count_current){
nextImg.style.display="none";
}else if(count_current == 1){
prevImg.style.display="none";
}
}
var curr_img,selector,count=0,setIDs=true,setClick='a.thumbnail',target;
prevImg.addEventListener('click',function(){
curr_img--;
selector=document.querySelector('[data-id="'+curr_img+'"]');
updateGallery(selector);
});
nextImg.addEventListener('click',function(){
curr_img++;
selector=document.querySelector('[data-id="'+curr_img+'"]');
updateGallery(selector);
});
function key(e){
if(e.keyCode==27 || e.which==27){
document.querySelector('#'+target).style.display="none";
document.body.style.overflow="auto";
document.removeEventListener('keyup', key);
}
if(curr_img >= count && (e.keyCode==39||e.which==39)) return false;
if(e.keyCode==39||e.which==39){
curr_img++;
selector=document.querySelector('[data-id="'+curr_img+'"]');
updateGallery(selector);
}
if(curr_img <= 1 && (e.keyCode==37||e.which==37)) return false;
else if(e.keyCode==37||e.which==37){
curr_img--;
selector=document.querySelector('[data-id="'+curr_img+'"]');
updateGallery(selector);
}
}
function size(sel){
var img=new Image();
img.src=sel.children[0].getAttribute("src");
var imgW=img.width,imgH=img.height,siz=winSize().split('x'),w=siz[0],h=siz[1],left=(imgW<w ? (w/2-imgW/2):0);
document.querySelector('#'+target+' .gallery-img').setAttribute('style','width:'+(imgW<w?imgW:w)+'px;left:'+left+'px;height:'+h+'px;background-image:url("'+img.src+'");background-repeat:no-repeat;background-position:center;background-size:contain');
}
function updateGallery(selector){
var sel=selector;
curr_img=sel.getAttribute('data-id');
disableButtons(count,curr_img);
size(sel);
window.addEventListener("resize",function(){size(sel)});
document.addEventListener('keyup',key);
}
var thumbs=document.querySelectorAll(setClick);
[].forEach.call(thumbs,function(thumb){
count++;
if(setIDs==true){
var attr=document.createAttribute('data-id');
attr.value=count;
thumb.setAttributeNode(attr);
}else thumb.setAttribute('data-id',count);
thumb.addEventListener('click',function(){
var id=this.getAttribute('data-id');
target=this.getAttribute('data-target');
updateGallery(document.querySelector('[data-id="'+id+'"]'));
});
});
})();