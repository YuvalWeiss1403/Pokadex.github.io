import data from "./pokedex.json" assert {type:"json"};


let clicksOpenOrClose = 0;
const navBarOptions =document.getElementById("navbar-options");
const menuBarFavorites = document.getElementById("menu-bar-favorites");
const favoritesGallery = document.getElementById("favorites-gallery");



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
    for (let i = 0; i < localStorage.length; i++) {
        const myKey = localStorage.key(i);
        const myValue = localStorage.getItem(myKey);
        const myPokemon = data[myValue-1];
        console.log(myPokemon);
        const pokemonItem = document.createElement("div");
        const pokemonHeader = document.createElement("div");
        const pokemonID = document.createElement("div");
        const pokemonName = document.createElement("div");
        pokemonName.className = `favorite-name`;
        const pokemonImage = document.createElement("img");
        const removeFavorite = document.createElement("div");
        pokemonName.innerHTML = myPokemon.name.english;
        pokemonImage.src = myPokemon.image.thumbnail;
        pokemonID.innerHTML = getPokemonID(myPokemon.id-1);
        removeFavorite.innerHTML =`&#x78;`;
        pokemonItem.className = "favorite-item";
        pokemonItem.id =`favorite-item-${myPokemon.id}`;
        pokemonHeader.id = 'favorite-card-header';
        removeFavorite.addEventListener('click',function(){
            removeFromFavorites(myPokemon.id)});
        removeFavorite.style.cursor="pointer";
        pokemonHeader.appendChild(pokemonID);
        pokemonHeader.appendChild(removeFavorite);
        pokemonItem.appendChild(pokemonHeader);
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

function removeFromFavorites(myID){
    console.log(myID);
    localStorage.removeItem(`favorites${myID}`, JSON.stringify(myID));
    favoritesGallery.removeChild(document.querySelector(`#favorite-item-${myID}`));
}
    


       

