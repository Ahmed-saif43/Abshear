/**
 * Global Functions
 */
// import Glide, { Controls, Breakpoints } from '@glidejs/glide/dist/glide.modular.esm'
// const width = window.screen.width;
// const SIZE = 565;

const elements = {
  megaMenuToggler: document.querySelectorAll(".megaMenuToggler"),
  megaMenu: document.querySelector(".mega-menu"),
  searchToggler: document.querySelector(".search-toggler"),
  searchMenu: document.querySelector(".ab-search"),
  searchResults: document.querySelector(".ab-search .results"),
  subMenu: document.querySelector(".mega-menu .sub-menu"),
};

// [1] Toggle Mega Menu
function toggleMegaMenu() {
  elements.megaMenu.classList.toggle("open");
  elements.subMenu.classList.remove("open");
}

// [2] Open sub menu
function toggleSubMenu() {
  elements.subMenu.classList.toggle("open");
}
// [2] Toggle Search
function toggleSearch() {
  const input = document.querySelector(".ab-search input");
  elements.searchMenu.classList.toggle("open");
  //hide search results and empty search input
  elements.searchResults.setAttribute("hidden", true);
  input.value = "";
}

// [3] Show Search Results
function showSearchResults(e) {
  e.preventDefault();
  elements.searchResults.removeAttribute("hidden");
}

// [5] change serach results display from grid to row
function changeDisplay() {
  //toggle class "d-row" and "d-grid"
  document.querySelector(".d-grid").classList.toggle("d-row");
  //toggle between grid and row buttons
  document.querySelector(".grid").classList.toggle("list");
  //toggle attribute "flex" value between "row" and "null"
  const abCard = document.querySelectorAll(".results_body ab-card");
  abCard.forEach((card) => {
    if (card.hasAttribute("flex")) {
      card.removeAttribute("flex");
    } else {
      card.setAttribute("flex", "row");
    }
  });
}

Number.prototype.format = function(n) {
  var r = new RegExp('\\d(?=(\\d{3})+' + (n > 0 ? '\\.' : '$') + ')', 'g');
  return this.toFixed(Math.max(0, Math.floor(n))).replace(r, '$&,');
};

const elementIsVisibleInViewport = (el, partiallyVisible = false) => {
  if(!!el){
    const { top, left, bottom, right } = el.getBoundingClientRect();
    const { innerHeight, innerWidth } = window;
    return partiallyVisible
      ? ((top > 0 && top < innerHeight) ||
          (bottom > 0 && bottom < innerHeight)) &&
          ((left > 0 && left < innerWidth) || (right > 0 && right < innerWidth))
      : top >= 0 && left >= 0 && bottom <= innerHeight && right <= innerWidth;

  }
};
var countElements = document.querySelectorAll('.count');
 

 let baanerState = []
 let isVisible = false;  
 let shownOnce = false;
 window.addEventListener('scroll', (e) =>{
   isVisible = elementIsVisibleInViewport(countElements[0], true)
     if(isVisible && !shownOnce){
      shownOnce = true
      countElements.forEach(function(element) {
        var counter = 0.0;
        var targetValue = parseFloat(element.textContent);
        var animation = setInterval(function() {
          counter = counter + 1.0;
          if (counter > targetValue) {
            clearInterval(animation);
          } else {
            element.textContent = targetValue //.format();
          }
          if(counter >! targetValue){
            if(counter >= targetValue){
              element.textContent = targetValue 
            }else{
              element.textContent = counter 
            }
          }
        }, 100 / (targetValue));
      });
    }  
 })
 window.onload = function(){
  if(document.documentElement.dir === 'rtl'){
    document.querySelector('.offcanvas') && document.querySelector('.offcanvas').classList.remove('offcanvas-start')
    document.querySelector('.offcanvas') && document.querySelector('.offcanvas').classList.add('offcanvas-end')
  }else{
    document.querySelector('.offcanvas') && document.querySelector('.offcanvas').classList.remove('offcanvas-end')
    document.querySelector('.offcanvas') && document.querySelector('.offcanvas').classList.add('offcanvas-start')
  }
   let sliderImagesBox =  document.querySelectorAll('.cards-box');
	sliderImagesBox.forEach(el => {
   
		let imageNodes = el.querySelectorAll('.card:not(.hide)')
     // Creat Same Length Pagination 
    let pagination_container = document.querySelector('.banner_pagination')
    for(let i = 0; i < imageNodes.length; i++){
      const page = document.createElement('span');
      page.classList.add('pagination-bullet')
      if(i === 0){
        page.classList.add('pagination-bullet-active')
        page.setAttribute('aria-current','true')
      }
      pagination_container.appendChild(page)
    }
   
		let arrIndexes = []; // Index array
		(() => {
			// The loop that added values to the arrIndexes array for the first time
			let start = 0;
			while (imageNodes.length > start) {
        if(start === 0){
          baanerState.push(true)
          arrIndexes.push(start++);
        }else{
          arrIndexes.push(start++);
          baanerState.push(false)
        }
			}
		})();

		let setIndex = (arr) => {
			for(let i = 0; i < imageNodes.length; i++) {
				imageNodes[i].dataset.slide = arr[i] // Set indexes
			}
		}
    let counter = 0;
 
		el.addEventListener('click', () => {
      const poppedElement = arrIndexes.pop()
      baanerState.unshift(baanerState.pop());
			arrIndexes.unshift(poppedElement);
      if(baanerState.length !== baanerState.indexOf(true)){
        pages[baanerState.indexOf(true)].classList.add('pagination-bullet-active')
        for(let j = 0; j < baanerState.length ; j++){
          if(j != baanerState.indexOf(true) ){
            counter++
            pages[j].classList.remove('pagination-bullet-active')
          }
        }
      }
			setIndex(arrIndexes)
		})
    
    let pages = pagination_container.querySelectorAll('span');
    let newIndex = [...arrIndexes]
   
    for(let i = 0; i < pages.length; i++){
      pages[i].addEventListener('click', () =>{
        
       
        for(let index = 0; index < i; index++){
            newIndex.unshift(newIndex.pop())
        }
        pages[i].classList.add('pagination-bullet-active')
         for(let j = 0; j < pages.length; j++){
          if(i != j ){
            counter++
            pages[j].classList.remove('pagination-bullet-active')
          }

        }
        
        setIndex(newIndex)
      })
    }
		setIndex(arrIndexes) // The first indexes addition
	});
  const businessBannerSwiper = new Swiper('.new_business_landing_banner', {
    direction: 'horizontal',
    enabled:true,
    loop: true,
    autoplay:false,
    lazy: true,
    // crossFade: true,
    slidesPerView:1,
    // spaceBetween: 50,
    pagination: {
      el: '.swiper-pagination',
    },
    // Navigation arrows
    navigation: {
      nextEl: '.banner-swiper-button-next',
      prevEl: '.banner-swiper-button-prev',
    },
  })
   if(businessBannerSwiper.initialized){
    document.querySelectorAll('.skeleton-loader').forEach((el) =>{
      el.remove()
    })
   }
  //  document.querySelector('.swiper_cards_new_services').style = 'display: none !important' 
  const swiper_new_services = new Swiper('.swiper_cards_new_services', {
    direction: 'horizontal',
    lazy: true,
    // slidesPerView: 3,
    // spaceBetween: 30,
    breakpoints: {
      // when window width is >= 320px
      320: {
        slidesPerView: 1.2,
        spaceBetween: 10
        // spaceBetween: 20
      },
      // when window width is >= 480px
      480: {
        slidesPerView: 1.2,
        spaceBetween: 10
      },
      // when window width is >= 640px
      640: {
        slidesPerView: 2,
        spaceBetween: 20
      },
      964: { // tablet
        slidesPerView: 3,
        spaceBetween: 20
      },
      1200: {
        slidesPerView: 3,
        spaceBetween: 20
      }
    },
    autoplay:false,
    loop:false,
    // crossFade:true,
    stopOnLastSlide:true,
    // mousewheel: true,
    // keyboard: true,
    navigation: {
      nextEl: ".swiper-button-prev",
      prevEl: ".swiper-button-next",
    },
    // controller: {
    //     inverse: true,
    //   },
  });
  if(swiper_new_services.initialized){
    document.querySelectorAll('.skeleton-loader-cards').forEach((el) =>{
      el.remove()
    })
   }

  const swiper_news = new Swiper('.swiper_cards_latest_news', {
    direction: 'horizontal',
    // slidesPerView: 3,
    // spaceBetween: 30,
    lazy: true,
    breakpoints: {
      // when window width is >= 320px
      320: {
        slidesPerView: 1.2,
        spaceBetween: 10
        // spaceBetween: 20
      },
      // when window width is >= 480px
      480: {
        slidesPerView: 1.2,
        spaceBetween: 10
      },
      // when window width is >= 640px
      640: {
        slidesPerView: 2,
        spaceBetween: 20
      },
      964: { // tablet
        slidesPerView: 4,
        spaceBetween: 20
      },
      1200: {
        slidesPerView: 4,
        spaceBetween: 20
      }
    },
    autoplay:false,
    loop:false,
    // crossFade:true,
    stopOnLastSlide:true,
    // mousewheel: true,
    // keyboard: true,
    navigation: {
      nextEl: ".swiper-button-news-prev",
      prevEl: ".swiper-button-news-next",
    }
  });
  if(swiper_news.initialized){
    document.querySelectorAll('.skeleton-loader-cards-long').forEach((el) =>{
      el.remove()
    })
  }

 
  // if(document.querySelector('.saudi-arabia-map-svg')){
  //   document.querySelector('.saudi-arabia-map-svg')
  //   .querySelector('g')
  //   .querySelectorAll('a')
  //   .forEach((el, i) =>{
  //       el.addEventListener('click', (e) =>{
  //         console.log(e.target.getAttribute('data-region'))
  //         getRegion(e)
  //       })
  //   })
  // }
}
// function getRegion(name){
//   console.log('name')
//   console.log(name)
// }


// function dropdown(){
//   const selectedItem = document.querySelector('.ab-select_btn');
//   console.log('selectedItem')
//   console.log(selectedItem)
// }
 
function getSelect(e) {
  // const selectedItem = e.target.closest("button");
  // const selectBtnText = e.target
  //   .closest(".dropdown")
  //   .querySelector("div span");
  // selectedItem.classList.add("selected");
  // //remove selected class from other items
  // const items = document.querySelectorAll("button");
  // items.forEach((item) => {
  //   if (item !== selectedItem) {
  //     item.classList.remove("selected");
  //   }
  // });
  // selectBtnText.textContent = selectedItem.textContent;
}

  // Create an input radio element for each item in the list
  let items = document.querySelectorAll(".ab-select_menu label[slot='item']");

  // loop through all items
  items.forEach((item) => {
    // Check if an input radio element already exists for this item
    let existingInput = item.querySelector("input[type='radio']");

    // If no existing input, create one and add it to the item
    if (!existingInput) {
      let input = document.createElement("input");
      let labelName = item.getAttribute("for");
      input.setAttribute("type", "radio");
      input.setAttribute("id", `${labelName}`);
      input.setAttribute("value", item.textContent);
      item.appendChild(input);
    }
  });

  //set name attribute for each input in the list
  let list = document.querySelectorAll("ab-select");
  list.forEach((select) => {
    let labelName = select.querySelector("label").textContent;
    let inputs = select.querySelectorAll("input");
    inputs.forEach((input) => {
      input.setAttribute("name", `${labelName}`);
    });
  });

  function showSurveyReasons() {
    //check if reasons div is hidden
    const hidden = document.querySelector(".ab-survey--form_reason").hidden;
    if (hidden) {
      document.querySelector(".ab-survey--form_reason").hidden = false;
    }
  }
  function showSurveyMsg(e) {
    e.preventDefault();
    // Hide survery reasons body
    document.querySelector(".ab-survey--form").hidden = true;
    //show survey success Msg
    document.querySelector(".ab-survey--form_msg").hidden = false;
  }

  function showhidePassword(){
    console.log('clicked')
      const pwdInpute = document.getElementById('LoginPortletSecretField1');

      const type = pwdInpute.getAttribute('type');

      if(type === 'text'){
        pwdInpute.setAttribute('type','password')
        document.getElementById('hidePassword').style.display ='block'
        document.getElementById('showPassword').style.display ='none'

      }else{
        pwdInpute.setAttribute('type','text')
        document.getElementById('hidePassword').style.display = 'none'
        document.getElementById('showPassword').style.display = 'block'
      }
  }
 

  