import data from "./pokedex.json" assert {type:"json"};


let clicksOpenOrClose = 0;
const navBarOptions =document.getElementById("navbar-options");
const menuBarFavorites = document.getElementById("menu-bar-favorites");



function openCloseMenu(){
    clicksOpenOrClose++;
    if(clicksOpenOrClose%2===0){
        navBarOptions.style.display="none";
    }else{
        navBarOptions.style.display="flex";
    }
}

menuBarFavorites.addEventListener("click",function(){
    openCloseMenu();
});
       


