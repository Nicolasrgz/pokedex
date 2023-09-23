<script setup>
import { ref, onMounted, computed } from 'vue'

const pokemons = ref([])
const isLoading = ref(true)
const initialLoad = ref(true)
const search = ref('')
const showFavourites = ref(false)
const showAll = ref(true)
const selectedPokemon = ref(null)
const showModal = ref(false)
const name = ref('')
const height = ref('')
const weight = ref('')
const type = ref('')


onMounted(async () => {
  // Simula un tiempo de carga inicial
  setTimeout(async () => {
    initialLoad.value = false
    const response = await fetch('https://pokeapi.co/api/v2/pokemon')
    const data = await response.json()
    pokemons.value = data.results.map(pokemon => ({ ...pokemon, isFavourite: false }))
  }, 2000) // Ajusta este valor según el tiempo de carga que desees
  console.log(pokemons)
})

const getPokemonDetails = async (pokemonName) => {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
    const data = await response.json()
    selectedPokemon.value = data
    showModal.value = true
    name.value = selectedPokemon.value.name
    weight.value = selectedPokemon.value.weight
    height.value = selectedPokemon.value.height
    type.value = selectedPokemon.value.types.map(type => type.type.name).join(', ')
    console.log(name.value)
    console.log(weight.value)
    console.log(height.value)
    console.log(type.value)
  } catch (error) {
    console.error(error)
  }
}


const loadPokemons = () => {
  isLoading.value = false
}

const backToHome = () => {
  window.location.href = "index.html"
}

const toggleFavourite = async (pokemon) => {
  pokemon.isFavourite = !pokemon.isFavourite
}

const toggleShowFavourites = () => {
  showFavourites.value = true
  showAll.value = false
}

const toggleShowAll = () => {
  showAll.value = true
  showFavourites.value = false
}

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
</script>

<template>
  <div v-if="initialLoad" class="d-flex justify-content-center align-items-center " style="height: 100vh;">
    <svg class="spinner" width="106" height="106" viewBox="0 0 106 106" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="53" cy="53" r="51" fill="white" stroke="#333333" stroke-width="4"/>
      <mask id="mask0_12_49" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="106" height="53">
        <rect width="106" height="53" fill="#C4C4C4"/>
      </mask>
      <g mask="url(#mask0_12_49)">
        <circle cx="53" cy="53" r="51" fill="#F22539" stroke="#333333" stroke-width="4"/>
      </g>
      <path d="M0.392578 53H105.607" stroke="#333333" stroke-width="4"/>
      <circle cx="53" cy="52.9998" r="20.8074" fill="white"/>
      <circle cx="53" cy="52.9998" r="18.8074" stroke="#333333" stroke-width="4"/>
      <path d="M91.731 36.7077C86.9398 25.3318 77.283 16.5081 65.3667 12.8428" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="53" cy="53.0004" r="10.3852" stroke="#808080" stroke-width="2"/>
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
      <div class="container-pokemons d-flex justify-content-between align-items-center">
        <button @click="getPokemonDetails(pokemon.name)">
          <h4 class="color-p-favourite">{{ pokemon.name }}</h4>
        </button>
        <i role="button" class="bi bi-star-fill" :class="{ 'favourite': pokemon.isFavourite }" @click="toggleFavourite(pokemon)"></i>
      </div>
    </div>

    <div v-if="showModal" class="modal">
      <button @click="showModal = false">Cerrar</button>
      <h2>{{ name }}</h2>
      <p>Peso: {{ weight }}</p>
      <p>Altura: {{ height }}</p>
      <p>Tipo: {{ type }}</p>
    </div>

    <!-- Botón para abrir el modal de prueba -->
    <button @click="showTestModal = true">Abrir Modal</button>

    <!-- Modal de prueba -->
    <div v-if="showTestModal" class="modal">
      <button @click="showTestModal = false">Cerrar</button>
      <h2>Título del Modal de Prueba</h2>
      <p>Contenido del modal de prueba...</p>
    </div>


    <div class="" v-if="displayedPokemons.length <= 0">
      <h3>UH-OH</h3>
      <h4>You look lost on your journey!</h4>
      <button class="all-button" @click="backToHome"><i class="bi bi-star-fill"></i> Go back home</button>
    </div>

    <div class="buttons-footer d-flex" v-if="!displayedPokemons.length <= 0">
      <div>
        <button class="all-button" @click="toggleShowAll"><i class="bi bi-list-ul"></i> All</button>
      </div>
      <div>
        <button class="favourites-btn" @click="toggleShowFavourites"><i class="bi bi-star-fill"></i> Favourites</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Estilos para el modal y su contenido */
.modal {
  display: none;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.7);
}

.modal-content {
  background-color: #fff;
  margin: 10% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
}

/* Estilos para el botón de cierre (×) en el modal */
.close {
  position: absolute;
  top: 0;
  right: 0;
  padding: 10px;
  cursor: pointer;
}
</style>
