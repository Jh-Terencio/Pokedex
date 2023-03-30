const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__image');
const form = document.querySelector('.form');
const input = document.querySelector('.input__search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let searchPokemon = 1;

/*O que essa função faz?
Nos temos a função fetch pokemon que possui como argumento um pokemon, após isso possuimos uma const APIResponse que vai pegar de uma API o pokemon desejado. Porém como a API é apenas uma promessa de algum, não temos garantias de que vamos conseguir receber o pokemon desejado, então para resolver isso tornamos essa função assincrona (async) e botamos um await na const APIResponse*/
const fetchPokemon = async (pokemon) => {

    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}`);

    if(APIResponse.status == 200){
        /*Como o que nos interessa é o json, pois é ele que vai fornecer os dados dos pokemons, criamos essa const data para receber o APIResponse.json, e novamente usamos o await por ser assincrono*/
        const data = await APIResponse.json();
        return data;
    }
}

const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = 'Loading...';
    pokemonNumber.innerHTML = '';

    const data = await fetchPokemon(pokemon);
    if(data && data.id < 650){
        pokemonImage.style.display = 'block';
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        input.value = '';
        searchPokemon = data.id;
    } else if(data && data.id < 899) {
        pokemonImage.style.display = 'block';
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImage.src = data['sprites']['versions']['generation-viii']['icons']['front_default'];
        input.value = '';
        searchPokemon = data.id;
    } else {
        pokemonName.innerHTML = 'Not found :C';
        pokemonNumber.innerHTML = '';
        pokemonImage.style.display = 'none';
        input.value = '';
    }
    

}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value);
})

buttonPrev.addEventListener('click', () => {
    if(searchPokemon > 1){
        searchPokemon -= 1;
        renderPokemon(searchPokemon.toString());
    }
})

buttonNext.addEventListener('click', () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon.toString());
})

renderPokemon(searchPokemon.toString());

