!function(g,f){
"object"==typeof exports&&"undefined"!=typeof module?module.exports=f():"function"==typeof define&&define.amd?define(f):g.edcss=f()
}(this,function(){
'use strict';

//alert
let alerts=document.querySelectorAll('.alert .close');
[].forEach.call(alerts,function(alert){
alert.addEventListener('click',function(e){
e.preventDefault();
e.target.parentNode.parentNode.removeChild(e.target.parentNode);
});
});

//nav
let navs=document.querySelector('.navbar-toggle');
if(navs!=null){
navs.addEventListener('click',function(e){
e.preventDefault();
let navbars=document.querySelectorAll('.navbar-nav');
[].forEach.call(navbars,function(navbar){
navbar.classList.toggle('nav-open');
});
});
}
//dropdown
let nav_dds=document.querySelectorAll('.dropdown-toggle');
[].forEach.call(nav_dds,function(nav_dd){
nav_dd.addEventListener('click',function(e){
e.preventDefault();
let nextEl=this.nextElementSibling;
//mobile
nextEl.classList.toggle('dropdown-open');
//desktop: @media(min-width:768px){.dropdown:hover>.dropdown-menu{display:block}}
});
});

//tab
let tabs=document.querySelectorAll('.nav-tabs li');
[].forEach.call(tabs,function(tab){
tab.addEventListener('click',function(e){
e.preventDefault();
let self=this;
if(self.classList.contains('disabled')==false){
[].forEach.call(self.parentNode.children,function(el){
el.classList.remove('active');
});
self.classList.add('active');
let id=e.target.getAttribute('href').replace(/.*(?=#[^\s]*$)/,'');
let tabnext=self.parentNode.nextElementSibling;
[].forEach.call(tabnext.children,function(el){
el.classList.remove('active');
});
tabnext.querySelector(id).classList.add('active');
}
});
});

//modal
let modals=document.querySelectorAll('[data-toggle="modal"]');
[].forEach.call(modals,function(modal){
modal.addEventListener('click',function(e){
let modal_target=this.getAttribute('data-target');
let tagetEl=document.getElementById(modal_target);
tagetEl.style.display="none";
if(this.tagName=='A') e.preventDefault();
document.body.style.overflow="hidden";
tagetEl.style.display="block";
let dismiss=tagetEl.querySelectorAll('[data-dismiss="modal"]');
[].forEach.call(dismiss,function(dismis){
dismis.addEventListener('click',function(e){
document.body.style.overflow="auto";
tagetEl.style.display="none";
});
});
});
});

//carousel
let time=7000;
let carouselTimer=setInterval(function(){carousel();},time);
let indicators=document.querySelectorAll('.indicator');
[].forEach.call(indicators,function(indicator){
indicator.addEventListener('click',function(e){
let idx=Array.from(this.parentNode.children).indexOf(this);
carousel(idx);
clearInterval(carouselTimer);
carouselTimer=setInterval(function(){carousel();},time);
});
});
function carousel(idx){//slide
let items=document.querySelectorAll('.carousel-inner .item'), activEl=document.querySelector('.carousel-inner .item.active');
if(activEl!=null){
let active=Array.from(items).indexOf(activEl);
[].forEach.call(items,function(item){
item.classList.remove('active');
});
if(active >= items.length-1) active=-1;
active=active+1;
if(idx != null) active=idx;
items[active].classList.add('active');
let indicators=document.querySelectorAll('.carousel-indicators .indicator');
[].forEach.call(indicators,function(indicator){
indicator.classList.remove('active');
});
indicators[active].classList.add('active');
}
}

//gallery
let prevImg=document.querySelector('#previous-img'), nextImg=document.querySelector('#next-img');
let winSize=function(){
let w=window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth;
let h=window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight;
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
if(count_max==1){
prevImg.style.display="none";
nextImg.style.display="none";
}
}
let curr_img,selector,count=0,setIDs=true,setClick='a.thumbnail',target;
if(prevImg!=null){
prevImg.addEventListener('click',function(){
curr_img--;
selector=document.querySelector('[data-id="'+curr_img+'"]');
updateGallery(selector);
});
}
if(nextImg!=null){
nextImg.addEventListener('click',function(){
curr_img++;
selector=document.querySelector('[data-id="'+curr_img+'"]');
updateGallery(selector);
});
}
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
let img=new Image();
img.src=sel.children[0].getAttribute("src");
let imgW=img.width,imgH=img.height,siz=winSize().split('x'),w=siz[0],h=siz[1],left=(imgW<w ? (w/2-imgW/2):0);
document.querySelector('#'+target+' .gallery-img').setAttribute('style','width:'+(imgW<w?imgW:w)+'px;left:'+left+'px;height:'+h+'px;background:center / contain no-repeat url("'+img.src+'")');
}
function updateGallery(sel){
curr_img=sel.getAttribute('data-id');
disableButtons(count,curr_img);
size(sel);
window.addEventListener("resize",function(){size(sel)});
document.addEventListener('keyup',key);
}
let thumbs=document.querySelectorAll(setClick);
[].forEach.call(thumbs,function(thumb){
count++;
if(setIDs==true){
let attr=document.createAttribute('data-id');
attr.value=count;
thumb.setAttributeNode(attr);
}else thumb.setAttribute('data-id',count);
thumb.addEventListener('click',function(){
let id=this.getAttribute('data-id');
target=this.getAttribute('data-target');
updateGallery(document.querySelector('[data-id="'+id+'"]'));
});
});

var isObj=function(str){
return str instanceof Object ? true : false;
}

//ajax
return {
ajax:function(opt){
opt.type=(opt.type || 'GET').toUpperCase();
opt.async=opt.async != null ? opt.async : true;
let xhr=window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
xhr.onreadystatechange=function(){
if(xhr.readyState==4){
let status = xhr.status;
if(status >= 200 && status < 300){
opt.success && opt.success(xhr.responseText,xhr.responseXML);
}else{
opt.fail && opt.fail(status);
}
}
}
if(isObj(opt.data)){
let arr=[];
for(let name in opt.data) arr.push(encodeURIComponent(name)+"="+encodeURIComponent(opt.data[name]));
opt.data=arr.join("&");
}
if(opt.type=="GET"){
xhr.open("GET",opt.url+"?"+opt.data,opt.async);
xhr.send(null);
}else if (opt.type == "POST"){
xhr.open("POST",opt.url,opt.async);
xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
xhr.send(opt.data);
}
}
}

});