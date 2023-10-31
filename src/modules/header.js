const menuElements = document.querySelectorAll(".menu-element");
const header = document.querySelector(".header");
	const headerHeight = header.offsetHeight;
	const main = document.querySelector(".main-wrapper");
	const mainHeight = main.offsetHeight;

function initHeader(){
	let el = menuElements[0];
	menuElements.forEach(element => {
		element.addEventListener("click", event => {	
			if(!element.classList.contains(".active")){
				element.classList.add("active");
				el.classList.remove("active");
				el = element;	
			}
			element.classList.add("active");
		})
	});
	window.addEventListener("scroll",function(){
		let scrollDistance = window.scrollY;
		if(scrollDistance >= headerHeight){
			header.classList.add("header-poz-fixed");
			main.style.marginTop = "${headerHeight}px";
		}else{
			header.classList.remove("header-poz-fixed");
			main.style.marginTop = null;
		}
	})
}
document.addEventListener("DOMContentLoaded",initHeader);
