const hamburger = document.querySelector('.hamburger');
const nav_bar = document.querySelector('.nav_bar');
hamburger.addEventListener('click', () =>{
    nav_bar.classList.toggle("acitve")
})