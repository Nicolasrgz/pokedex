<script setup>
import { ref, onMounted, computed } from 'vue'
import Swal from 'sweetalert2';

const pokemons = ref([])
const isLoading = ref(true)
const initialLoad = ref(true)
const search = ref('')
const showFavourites = ref(false)
const showAll = ref(true)
const selectedPokemon = ref({})
const showModal = ref(false)

onMounted(async () => {

  setTimeout(async () => {
    initialLoad.value = false;
    const response = await fetch('https://pokeapi.co/api/v2/pokemon');
    const data = await response.json();
    pokemons.value = data.results.map(pokemon => ({ ...pokemon, isFavourite: false }));

    const favouritesFromLocalStorage = JSON.parse(localStorage.getItem('favourites'));
    if (Array.isArray(favouritesFromLocalStorage)) {
      pokemons.value.forEach(pokemon => {
        if (favouritesFromLocalStorage.includes(pokemon.name)) {
          pokemon.isFavourite = true;
        }
      });
    }
  }, 2000);
});

const getPokemonDetails = async (pokemonName) => {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
    const data = await response.json()
    selectedPokemon.value = data;
    
    // Actualizar el estado de favoritos en el modal
    const mainListPokemon = pokemons.value.find(p => p.name === pokemonName);
    if (mainListPokemon) {
      selectedPokemon.value.isFavourite = mainListPokemon.isFavourite;
    }

    showModal.value = true;
    // Llamar a copyPokemonInfoToClipboard después de que selectedPokemon se actualice
  } catch (error) {
    console.error(error)
  }
};


const copyPokemonInfoToClipboard = () => {
  // Verificar si selectedPokemon tiene datos antes de copiar al portapapeles
  if (selectedPokemon.value) {
    const pokemonInfo = [
      `Nombre: ${selectedPokemon.value.name}`,
      `Peso: ${selectedPokemon.value.weight}`,
      `Altura: ${selectedPokemon.value.height}`,
      `Tipo: ${selectedPokemon.value.types ? selectedPokemon.value.types.map(type => type.type.name).join(', ') : ''}`,
    ].join(', ');

    // Crear un elemento de texto temporal para copiar al portapapeles
    const tempInput = document.createElement('input');
    tempInput.value = pokemonInfo;
    document.body.appendChild(tempInput);
    tempInput.select();

    try {
      // Intentar copiar el texto al portapapeles
      document.execCommand('copy');
      Swal.fire({
        title: 'Información del Pokémon copiada al portapapeles',
        text: pokemonInfo,
        icon: 'success',
        confirmButtonText: 'Aceptar',
      });
    } catch (error) {
      console.error('Error al copiar al portapapeles:', error);
      Swal.fire({
        title: 'Error al copiar al portapapeles',
        text: 'No se pudo copiar la información al portapapeles.',
        icon: 'error',
        confirmButtonText: 'Aceptar',
      });
    } finally {
      // Eliminar el elemento de texto temporal
      document.body.removeChild(tempInput);
    }
  }
};

const loadPokemons = () => {
  isLoading.value = false
}

const updateLocalStorage = () => {
  const favourites = pokemons.value.filter(pokemon => pokemon.isFavourite).map(pokemon => pokemon.name);
  localStorage.setItem('favourites', JSON.stringify(favourites));
};

const toggleFavourite = (pokemon) => {
  const isFavourite = pokemon.isFavourite;
  pokemon.isFavourite = !isFavourite;

  // Actualizar el estado de favoritos en la lista principal
  const mainListPokemon = pokemons.value.find(p => p.name === pokemon.name);
  if (mainListPokemon) {
    mainListPokemon.isFavourite = !isFavourite;
  }

  updateLocalStorage();
};

const toggleShowFavourites = () => {
  if (pokemons.value.some(pokemon => pokemon.isFavourite)) {
    showFavourites.value = true;
    showAll.value = false;
  }
};

const toggleShowAll = () => {
  if (!showAll.value) {
    if (pokemons.value.some(pokemon => !pokemon.isFavourite)) {
      showAll.value = true;
      showFavourites.value = false;
    }
  }
};



const displayedPokemons = computed(() => {
  let results = pokemons.value
  console.log(results)

  if (search.value) {
    results = results.filter(pokemon => pokemon.name.includes(search.value))
  }

  if (showFavourites.value) {
    if (pokemons.value.some(pokemon => pokemon.isFavourite)) {
      results = results.filter(pokemon => pokemon.isFavourite)
    } else {
      showFavourites.value = false
    }
  }

  return results
})

const backToHome = () => {
  window.location.href = "index.html"
}

</script>

<template>
  <div v-if="initialLoad" class="d-flex justify-content-center align-items-center " style="height: 100vh;">
    <svg class="spinner" width="106" height="106" viewBox="0 0 106 106" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="53" cy="53" r="51" fill="white" stroke="#333333" stroke-width="4"/><mask id="mask0_12_49" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="106" height="53"><rect width="106" height="53" fill="#C4C4C4"/></mask><g mask="url(#mask0_12_49)">
        <circle cx="53" cy="53" r="51" fill="#F22539" stroke="#333333" stroke-width="4"/></g><path d="M0.392578 53H105.607" stroke="#333333" stroke-width="4"/><circle cx="53" cy="52.9998" r="20.8074" fill="white"/><circle cx="53" cy="52.9998" r="18.8074" stroke="#333333" stroke-width="4"/><path d="M91.731 36.7077C86.9398 25.3318 77.283 16.5081 65.3667 12.8428" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><circle cx="53" cy="53.0004" r="10.3852" stroke="#808080" stroke-width="2"/>
    </svg>
  </div>

  <div v-else-if="isLoading" class="welcome-page d-flex flex-column justify-content-center align-items-center g-5" style="height: 100vh;">
    <img class="pikachu-img-welcome" src="./assets/img/pikachu-welcome.png" alt="">
    <h1>Welcome to Pokédex</h1>
    <div class="div-p-welcome">
      <p class="text-center font-p-welcome"> The digital encyclopedia created by Professor Oak is an invaluable tool to Trainers in the Pokémon world</p>
    </div>
    <button class="button-welcome" @click="loadPokemons">Get Started</button>
  </div>

  <div v-else class="d-flex flex-column justify-content-center align-items-center">
    <div class="group d-flex align-items-center">
      <svg class="icon" aria-hidden="true" viewBox="0 0 24 24"><g><path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5-7.5z"></path></g></svg>
      <input placeholder="Search" type="search" class="input" v-model="search">
    </div>

    <div v-for="pokemon in displayedPokemons" :key="pokemon.name">
      <div class="container-pokemons d-flex align-items-center justify-content-between">
        <button class="btn-name-pokemon d-flex" @click="getPokemonDetails(pokemon.name)">
          {{ pokemon.name }}
        </button>
        <i role="button" class="bi bi-star-fill stars text-center d-flex justify-content-center align-items-center" :class="{ 'favourite': pokemon.isFavourite }" @click="toggleFavourite(pokemon)"></i>
      </div>
    </div>

    <div class="div-no-found d-flex flex-column justify-content-center align-items-center" v-if="displayedPokemons.length <= 0">
      <h3>Uh-Oh!</h3>
      <h4>You look lost on your journey!</h4>
      <button class="all-button" @click="backToHome"> Go back home</button>
    </div>

    <div class="buttons-footer d-flex" v-if="!displayedPokemons.length <= 0">
      <div>
        <button class="all-button" @click="toggleShowAll" :style="{ backgroundColor: showAll ? '#F22539' : '#BFBFBF' }">
          <div class="d-flex justify-content-center align-items-center"><i class="bi bi-list-ul i-all"></i>All</div>
        </button>
      </div>
      <div>
        <button class="favourites-btn" @click="toggleShowFavourites" :style="{ backgroundColor: showFavourites ? '#F22539' : '#BFBFBF' }">
          <div class="d-flex justify-content-center align-items-center"><i class="bi bi-star-fill i-favourite i-all"></i>Favorites</div>
        </button>
      </div>
    </div>




    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <i class="bi bi-x-circle-fill close" role="button" @click="showModal = false"></i>
        <div class="d-flex justify-content-center align-items-center">
          <img class="img-modal" :src="selectedPokemon.sprites.front_default" alt="">
          <img class="fondo-img" src="./assets/img/fondo.png" alt="">
        </div>
        <div class="div-p-modal">
          <p class="border-p-modal"><b>Name:</b> {{ selectedPokemon.name }}</p>
          <p class="border-p-modal"><b>Weight:</b>  {{ selectedPokemon.weight }}</p>
          <p class="border-p-modal"><b>Height:</b> {{ selectedPokemon.height }}</p>
          <p class="border-p-modal"><b>types:</b> {{ selectedPokemon.types ? selectedPokemon.types.map(type => type.type.name).join(', ') : '' }}</p>
        </div>
        <div class="d-flex justify-content-between align-items-center">
          <button class="btn-copy" @click="copyPokemonInfoToClipboard();">Share to my friends</button>
          <i role="button" class="bi bi-star-fill stars text-center d-flex justify-content-center align-items-center i-favorite-modal" :class="{ 'favourite': selectedPokemon.isFavourite }" @click="toggleFavourite(selectedPokemon)"></i>
        </div>
      </div>
    </div>


</div>

</template>