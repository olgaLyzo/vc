const sliderImages = [{
	url: "./assets/banner-1.svg",
	title: "Black friday"
},{
	url: "./assets/banner-2.svg",
	title: "Top 10 books"
},{
	url: "./assets/banner-3.svg",
	title: "Cozy book selection"
}];

let sliderDots = document.querySelector(".slider__dots");
let imgSection = document.querySelector(".slider-img");
 
function initSlider(options) {
	if (!sliderImages || !sliderImages.length) return;
	options = options || {
    dots: true,
    autoplay: false
	};

  initImages();
	
	if (options.dots) {
    initDots();
  }
	if (options.autoplay) {
    initAutoplay();
  }

	function initImages() {
    sliderImages.forEach((image, index) => {
      let imageDiv = `<img class="image n${index} ${index === 0? "active" : ""}" src="${sliderImages[index].url}" data-index="${index}"></img>`;
      imgSection.innerHTML += imageDiv;
    });
	}
	function initDots() {
    sliderImages.forEach((image, index) => {
      let dot = `<div class="slider__dots-item n${index} ${index === 0? "active" : ""}" data-index="${index}"></div>`;
      sliderDots.innerHTML += dot;
    });
    sliderDots.querySelectorAll(".slider__dots-item").forEach(dot => {
      dot.addEventListener("click", function() {
        moveSlider(this.dataset.index);
      })
    })
  }
	function moveSlider(num) {
    imgSection.querySelector(".active").classList.remove("active");
    imgSection.querySelector(".n" + num).classList.add("active");
    if (options.dots) {
      sliderDots.querySelector(".active").classList.remove("active");
      sliderDots.querySelector(".n" + num).classList.add("active");
    }
  }
	function initAutoplay() {
    setInterval(() => {
      let curNumber = +imgSection.querySelector(".active").dataset.index;
      let nextNumber = curNumber === sliderImages.length - 1? 0 : curNumber + 1;
      moveSlider(nextNumber);
    }, options.autoplayInterval);
  }
}

let sliderOptions = {
  dots: true,
  autoplay: true,
  autoplayInterval: 5000
};
document.addEventListener("DOMContentLoaded", function() {
  initSlider(sliderOptions);
});



