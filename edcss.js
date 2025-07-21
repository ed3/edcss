(function() {
'use strict';

//alert
let alerts=document.querySelectorAll('.alert .close');
[].forEach.call(alerts,function(alert){
alert.addEventListener('click',function(e){
e.preventDefault();
e.target.parentNode.parentNode.removeChild(e.target.parentNode);
});
});

//toggler
const tgl=document.querySelector('.navbar-toggler');
const navbarNavs=document.querySelectorAll('.navbar-nav');
if (tgl != null && navbarNavs.length > 0) {
tgl.addEventListener('click', function(e) {
e.stopPropagation();
const isExpanded=tgl.getAttribute('aria-expanded') === 'true';
tgl.setAttribute('aria-expanded', !isExpanded);
[].forEach.call(navbarNavs, function(navbar) {
navbar.classList.toggle('show');
if (navbar.classList.contains('show')) {
navbar.style.display='flex';
navbar.style.flexDirection='column';
} else {
navbar.style.display='none';
}
navbar.querySelectorAll('.dropdown-menu.show').forEach(openMenu => {
openMenu.classList.remove('show');
});
});
});
}

//nav show/hide
document.addEventListener('click',function(e){
const clickedEl=e.target;
const clickedToggle=clickedEl.closest('.dropdown-toggle');
if(clickedToggle){
e.preventDefault();
const parentDropdown=clickedToggle.closest('.dropdown');
const dropdownMenu=parentDropdown.querySelector('.dropdown-menu');
if(dropdownMenu){
const isCurrentlyOpen=dropdownMenu.classList.contains('show');
document.querySelectorAll('.dropdown-menu.show').forEach(openMenu=>{
if(openMenu !== dropdownMenu && !openMenu.closest('.dropdown').contains(clickedToggle)){
openMenu.classList.remove('show');
}
});
if(!isCurrentlyOpen){
dropdownMenu.classList.add('show');
}else{
dropdownMenu.classList.remove('show');
}
}
}else{
document.querySelectorAll('.dropdown-menu.show').forEach(openMenu=>{
const openMenuParentDropdown=openMenu.closest('.dropdown');
if(openMenuParentDropdown && !openMenuParentDropdown.contains(clickedEl)){
openMenu.classList.remove('show');
}
});
}
if(tgl && window.getComputedStyle(tgl).display !== 'none'){
const isClickInsideNavbar=clickedEl.closest('.navbar');
const isNavbarNavOpen=[].some.call(navbarNavs,nav=>nav.classList.contains('show'));
if(isNavbarNavOpen && !isClickInsideNavbar){
tgl.setAttribute('aria-expanded',false);
[].forEach.call(navbarNavs, function(navbar){
navbar.classList.remove('show');
navbar.style.display='none';
});
}
}
});

function navOverflow() {
    const navbar=document.querySelector('.navbar');
    if(!navbar) return;
    const container=navbar.querySelector('.container');
    const brand=navbar.querySelector('.navbar-brand');
    const toggler=navbar.querySelector('.navbar-toggler');
    const navs=navbar.querySelectorAll('.navbar-nav');
    if(!container || !brand || !toggler || navs.length === 0) return;
    const originalNavStyles=[];
    navs.forEach(nav=>{
    originalNavStyles.push({display:nav.style.display,flexDirection:nav.style.flexDirection,width:nav.style.width,whiteSpace:nav.style.whiteSpace,overflowX:nav.style.overflowX});
    });
    toggler.style.display='none';
    navs.forEach(nav=>nav.style.cssText="display:flex;flex-direction:row;width:auto;white-space:nowrap;overflow-x:visible");
    let requiredContentWidth=0;
    [].forEach.call(container.children,child=>{
        if(child === brand || Array.from(navs).includes(child)){
            const style=window.getComputedStyle(child);
            const marginLeft=parseFloat(style.marginLeft) || 0;
            const marginRight=parseFloat(style.marginRight) || 0;
            requiredContentWidth += child.offsetWidth + marginLeft + marginRight;
        }
    });
    const availableContainerWidth=container.clientWidth;
    if(requiredContentWidth > availableContainerWidth){
        toggler.style.display='block';
        navs.forEach(nav=>{
			nav.style.cssText="flex-direction:column;width:100%;white-space:normal";
            if(!nav.classList.contains('show')){
                nav.style.display='none';
            }else{
                nav.style.display='flex';
            }
        });
    }else{
        toggler.style.display='none';
        navs.forEach(nav=>{
            nav.classList.remove('show');
            nav.style.cssText="display:flex;flex-direction:row;width:auto;white-space:normal";
        });
    }
    navs.forEach((nav,index)=>{
        nav.style.overflowX=originalNavStyles[index].overflowX;
    });
}
window.addEventListener('load', navOverflow);
window.addEventListener('resize', navOverflow);


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
let curr_img,selector,count=0,setIDs=true,setClick='a.img-thumbnail',target;
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

function isObj(val) {
return val !== null && typeof val === 'object' && !Array.isArray(val);
}
function isJson(str){
if(typeof str !== 'string'){
return false;
}
try{
const parsed=JSON.parse(str);
if(parsed === null || typeof parsed === 'undefined'){
return false;
}
if(typeof parsed !== 'object' && !Array.isArray(parsed)){
return false;
}
return true;
}catch(e){
return false;
}
}

//ajax
window.ajax=function(opt){
opt.type=(opt.type || 'GET').toUpperCase();
opt.async=opt.async !== undefined ? opt.async : true;
opt.data=opt.data || null;
let xhr;
if(window.XMLHttpRequest){
xhr=new XMLHttpRequest();
}else{
if(opt.fail) opt.fail("Browser does not support XMLHttpRequest.");
return;
}
xhr.onreadystatechange=function(){
if(xhr.readyState===4){
const status=xhr.status;
if(status >= 200 && status < 300){
if(opt.success){
opt.success(xhr.responseText,xhr.responseXML);
}
}else{
if(opt.fail){
opt.fail(status);
}
}
}
};
xhr.onerror=function(){
if(opt.fail){
opt.fail('Network Error or CORS issue');
}
};
let requestData=null;
let contentType="application/x-www-form-urlencoded";
if(isObj(opt.data) && !isJson(opt.data)){
if(opt.json && opt.type === "POST"){
requestData=JSON.stringify(opt.data);
contentType="application/json";
}else{
let arr=[];
for(let name in opt.data){
if(Object.prototype.hasOwnProperty.call(opt.data, name)){
arr.push(encodeURIComponent(name) + "=" + encodeURIComponent(opt.data[name]));
}
}
requestData=arr.join("&");
}
}else if(isJson(opt.data)){
requestData=JSON.stringify(opt.data);
contentType="application/json";
}else if(typeof opt.data==='string'){
requestData=opt.data;
}
if(opt.type==="GET"){
const url=opt.url+(requestData ? "?"+requestData : "");
xhr.open("GET",url,opt.async);
xhr.send(null);
}else if(opt.type==="POST"){
xhr.open("POST",opt.url,opt.async);
xhr.setRequestHeader("Content-Type",contentType);
xhr.send(requestData);
}
};

})();