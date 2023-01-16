import data from "./pokedex.json" assert {type:"json"};

let loadPokemon = localStorage.length;
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






//function to create the right id format 
function getPokemonID(index){
    if(index<10){
        return `#00${data[index].id}`;  
    }else if(index>9 && index<100){
        return `#0${data[index].id}`;  
    }else{
        return `#${data[index].id}`;  
    }
}
       


