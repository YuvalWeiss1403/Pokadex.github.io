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


function renderFavorites(){
    const favoritesGallery = document.getElementById("favorites-gallery");
    for (let i = 0; i < localStorage.length; i++) {
        const myKey = localStorage.key(i);
        const myValue = localStorage.getItem(myKey);
        const myPokemon = data[myValue];
        const pokemonItem = document.createElement("div");
        const pokemonID = document.createElement("div");
        const pokemonName = document.createElement("div");
        const pokemonImage = document.createElement("img");
        pokemonName.innerHTML = myPokemon.name.english;
        pokemonImage.src = myPokemon.image.thumbnail;
        pokemonID.innerHTML = getPokemonID(myPokemon.id);
        pokemonItem.appendChild(pokemonID);
        pokemonItem.appendChild(pokemonImage);
        pokemonItem.appendChild(pokemonName);
        //adding the pokemon to the pokemon gallery
        favoritesGallery.appendChild(pokemonItem);
    }
}

renderFavorites();



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
       


