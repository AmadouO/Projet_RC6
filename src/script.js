const hamburger = document.querySelector('.hamburger');
const nav_bar = document.querySelector('.nav_bar');
const wrapper = document.querySelector('.wrapper');
const login_link = document.querySelector('.login_link');
const resister_link = document.querySelector('.resister_link');
const btn_login = document.querySelector('.btn_login');
const icon_close = document.querySelector('.icon_close');


hamburger.addEventListener('click', () =>{
    nav_bar.classList.toggle("acitve")
})

window.addEventListener('scroll', () =>{
    const footer = document.querySelector('footer');
    const scrol_position = window.scrollY;

    if(scrol_position > 70){
        footer.classList.add('hidden');
    }else{
        footer.classList.remove('hidden');
    }
})

resister_link.addEventListener('click', () => {
    wrapper.classList.add('active');
});
login_link.addEventListener('click', () => {
    wrapper.classList.remove('active');
});

btn_login.addEventListener('click', () =>{
    wrapper.classList.add('active-popup');
});

icon_close.addEventListener('click', () =>{
    wrapper.classList.remove('active-popup');
});

