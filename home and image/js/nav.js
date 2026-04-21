const headerSize = 565;
const logo = document.querySelector('#logo')
var navigation = document.getElementById("mainNav");
var sticky = 100;
let isHnadlingScroll = false;
 
const handleScroll = () =>{
  window.requestAnimationFrame(() =>{
    let navigation = document.getElementById("mainNav");
    if (window.scrollY > sticky && !navigation.classList.contains('fixed')) {
          navigation.classList.add("fixed");
    } else if(window.scrollY < 90 && navigation.classList.contains('fixed')) {
            navigation.classList.remove("fixed");
    }
    isHnadlingScroll = false;
  })
  isHnadlingScroll = true;
}
window.addEventListener('scroll',handleScroll, {passive: true})
 
 

 