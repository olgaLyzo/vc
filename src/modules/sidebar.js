const sidebarItems = document.querySelectorAll(".scrollmenu-items a");
	
function initSidebar() {
	sidebarItems.forEach(el=>{
		el.addEventListener("click",(event)=>{
        document.querySelector('.active-sidebar-item').classList.remove('active-sidebar-item');
      	event.target.classList.add('active-sidebar-item');
		});
	})
}

document.addEventListener("DOMContentLoaded",initSidebar);
