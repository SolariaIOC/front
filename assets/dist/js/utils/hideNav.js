export function hideNav(){


const body = document.body;

let ultimoScroll = 0;

window.addEventListener('scroll', (e)=>{
 
   if(scrollY <= 0){
        body.classList.remove("scroll-up")   
   }

    if(scrollY > ultimoScroll &&  !body.classList.contains("scroll-down")){
       body.classList.add("scroll-down")
        body.classList.remove("scroll-up")
    }
    if ( scrollY < ultimoScroll && body.classList.contains("scroll-down")){
        body.classList.add("scroll-up")
       body.classList.remove("scroll-down")
    }
     
    ultimoScroll = scrollY
   

}) }