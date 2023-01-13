import data from "./pokedex.json" assert {type:"json"};

//initializing the amount of pokemons to show on screen on load
let loadPokemon = 12;
//loading the pokemons to the screen
document.querySelector("body").onload = loadPokemons();

const modal = document.getElementById("myModal");
const modalContent = document.getElementById("modal-pokemon-card");
const loadMoreButton = document.getElementById("load-more-button");
let clicksOpenOrClose = 0;
const navBarOptions =document.getElementById("navbar-options");
const menuBarHome = document.getElementById("menu-bar-home");



//Load pokemon cards by loadPokemon variable
function loadPokemons(){
    //getting the container div to append every pokemon item to
    const pokemonGallery = document.getElementById("pokemon-gallery");
    //going through the data to insert values to the pokemon element 
    // const amount = ifLoadMoreClicked ? 12:24 ;
    for (let i = loadPokemon-12; i <loadPokemon ; i++) {
        //creating the pokemon element
        const pokemonItem = document.createElement("div");
        const pokemonID = document.createElement("div");
        const pokemonName = document.createElement("div");
        const pokemonImage = document.createElement("img");
        pokemonName.innerHTML = data[i].name.english
        pokemonImage.src = data[i].image.thumbnail;
        data[i].inFavorite;
    //getting the id number 
    pokemonID.innerHTML = getPokemonID(i);
    //adding each item of the element its own class name
    pokemonID.className="pokemon-Id";
    pokemonName.className = "pokemon-name";
    pokemonItem.className = "pokemon-item";
    pokemonItem.id = `pokemon-item${i}`;
    
    //creating the final element
    pokemonItem.appendChild(pokemonID);
    pokemonItem.appendChild(pokemonImage);
    pokemonItem.appendChild(pokemonName);
    //adding the pokemon to the pokemon gallery
    pokemonGallery.appendChild(pokemonItem);
}
}
pokemonCardClick();

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

//Load more button
loadMoreButton.addEventListener("click",function(){
    addPokemonsCards();
})

//add the next 12 pokemon cards
function addPokemonsCards(){
    loadPokemon+=12;
    loadPokemons();
    pokemonCardClick();
}
//add the on click attribute to each pokemon card
function pokemonCardClick(){
    for (let i = loadPokemon-12; i < loadPokemon; i++) {
        //get the specific pokemon card
        const pokemonCard = document.getElementById(`pokemon-item${i}`);
        pokemonCard.addEventListener("click",function(){
            //sending the specific pokemon that has been clicked to the addContentToPokemonCard function to create it
            addContentToPokemonCard(data[i])
        });
    }
}

//creating the pokemon card content for the specific pokemon that has been clicked
function addContentToPokemonCard(SpecificPokemonClicked){
        //creating all the elements to show in pokemon card
        //adding each element a class name for designing its properties
        const cardLeftSide =document.createElement("div");
        const cardHeading =document.createElement("header");
        cardHeading.className=`card-heading`;
        const pokemonID = document.createElement("div");
        pokemonID.className=`pokemon-ID`;
        cardLeftSide.className=`card-left-side`;
        const pokemonName = document.createElement("div");
        pokemonName.className=`pokemon-name`;
        const pokemonImage = document.createElement("img");
        pokemonImage.className=`pokemon-image`;
        const pokemonType = document.createElement("div");
        pokemonType.className=`pokemon-type`
        const cardRightSide =document.createElement("div");
        cardRightSide.className =`card-right-side`;
        const pokemonDescription =document.createElement("div");
        pokemonDescription.classList =`pokemon-description`
        const pokemonDescriptionHeading =document.createElement("h1");
        pokemonDescriptionHeading.className =`description-heading`;
        const pokemonStatus = document.createElement("div");
        const pokemonStatusHeading =document.createElement("h1");
        pokemonStatusHeading.className=`status-heading`;
        pokemonStatus.className= `pokemon-status`;
        const favoriteHeart =  document.createElement("div");
        const favoriteImg =  document.createElement("img");

        
        //creating a container fot the whole pokemon card
        const pokemonCardContainer = document.createElement("div");
        //assigning data in the element of the pokemon card container

        pokemonName.innerHTML = SpecificPokemonClicked.name.english;
        pokemonImage.src = SpecificPokemonClicked.image.thumbnail;

        pokemonDescription.innerHTML =SpecificPokemonClicked.description;
        pokemonDescriptionHeading.innerHTML="Description";
        cardRightSide.appendChild(pokemonDescriptionHeading);

        pokemonID.innerHTML = getPokemonID(SpecificPokemonClicked.id-1);
        for (let j = 0; j < SpecificPokemonClicked.type.length; j++) {
            const typeElement = document.createElement("div");
            typeElement.innerHTML = SpecificPokemonClicked.type[j];
            typeElement.id =`${SpecificPokemonClicked.type[j].toLowerCase()}`;
            pokemonType.appendChild(typeElement);
        }
        pokemonStatusHeading.innerHTML=`Status`;
        
        for (const element in SpecificPokemonClicked.base ){
            const baseElement=document.createElement("div");
            baseElement.innerHTML = `${element}:${SpecificPokemonClicked.base[element]}`
            pokemonStatus.appendChild(baseElement);
        }

        SpecificPokemonClicked.inFavorite =(localStorage.getItem(`favorites${SpecificPokemonClicked.id}`.inFavorite))|| false;
        // /-------------------------------------------------------------------------------

        favoriteHeart.className=`favorite-heart`;
        favoriteImg.className=`heart-img`;
        

        if(!SpecificPokemonClicked.inFavorite){
            favoriteImg.src="/assets/heart_outline.png"; 
        }else{
            favoriteImg.className = 'heart-img-active';
        }
        favoriteHeart.appendChild(favoriteImg);

        favoriteImg.addEventListener('click',function(){
            if(!SpecificPokemonClicked.inFavorite){
                favoriteImg.classList.remove('heart-img');
                favoriteImg.className = 'heart-img-active';
                SpecificPokemonClicked.inFavorite=true;
                addToFavorites(SpecificPokemonClicked);
            }else{
                favoriteImg.classList.remove('heart-img-active');
                favoriteImg.className = 'heart-img';
                SpecificPokemonClicked.inFavorite = false;
                removeFromFavorites(SpecificPokemonClicked);
            }
        });
        
        //appending all the elements in the modal content div
        cardLeftSide.appendChild(pokemonImage);
        cardLeftSide.appendChild(pokemonName);
        cardLeftSide.appendChild(pokemonType);
        cardRightSide.appendChild(pokemonDescription);
        cardRightSide.appendChild(pokemonStatusHeading);
        cardRightSide.appendChild(pokemonStatus);
        cardHeading.appendChild(pokemonID);
        cardHeading.appendChild(favoriteHeart);
        pokemonCardContainer.appendChild(cardLeftSide);
        pokemonCardContainer.appendChild(cardRightSide);
        pokemonCardContainer.className=`pokemon-card-container`
        modalContent.appendChild(cardHeading);
        modalContent.appendChild(pokemonCardContainer);
        modal.style.display="block";

        // Get the <span> element that closes the modal
        const div = document.getElementById("close");
        // When the user clicks on <span> (x), close the modal
        div.onclick = function() {
            modal.style.display = "none";
            modalContent.removeChild(pokemonCardContainer);
            modalContent.removeChild(cardHeading);
        }
        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
                modalContent.removeChild(pokemonCardContainer);
                modalContent.removeChild(cardHeading);
            }}
     
            
        }
             
function openCloseMenu(){
    clicksOpenOrClose++;
    if(clicksOpenOrClose%2===0){
        navBarOptions.style.display="none";
    }else{
        navBarOptions.style.display="flex";
    }
}

menuBarHome.addEventListener("click",function(){
    openCloseMenu();
});

const favoritesGallery =document.getElementById("favorites-gallery");

function renderFavorites(){
    // for (let i = 0; i < favorites.length; i++) {
    //     const pokeCard = document.createElement("div");
    //     pokeCard.innerHTML = favorites[i];
    //     favoritesGallery.appendChild(pokeCard);
    // }
}

function addToFavorites(SpecificPokemonClicked){
    localStorage.setItem(`favorites${SpecificPokemonClicked.id}`, JSON.stringify(SpecificPokemonClicked));
    renderFavorites();
}

function removeFromFavorites(SpecificPokemonClicked){
    localStorage.removeItem(`favorites${SpecificPokemonClicked.id}`, JSON.stringify(SpecificPokemonClicked));
    renderFavorites();
}
        
