const { mount } = require('@vue/test-utils');

import App from '../src/App.vue'

describe('toggleFavourite', () => {
  it('debería cambiar el estado de favorito de un Pokémon', async () => {
    // Crea un montaje de tu componente App
    const wrapper = mount(App)

    // Obtén la referencia a la lista de pokemons
    const pokemons = wrapper.vm.pokemons

    // Simula un Pokémon y agrégalo a la lista de pokemons
    const pokemon = { name: 'Pikachu', isFavourite: false }
    pokemons.push(pokemon)

    // Llama a la función toggleFavourite para cambiar el estado de favorito
    await wrapper.vm.toggleFavourite(pokemon)

    // Espera a que se actualice el estado en el ciclo de vida de Vue
    await wrapper.vm.$nextTick()

    // Verifica si el estado de favorito se ha cambiado correctamente
    expect(pokemon.isFavourite).toBe(true)

    // Llama a la función toggleFavourite nuevamente para revertir el cambio
    await wrapper.vm.toggleFavourite(pokemon)

    // Espera a que se actualice el estado en el ciclo de vida de Vue
    await wrapper.vm.$nextTick()

    // Verifica si el estado de favorito se ha revertido correctamente
    expect(pokemon.isFavourite).toBe(false)

    // Limpia el montaje después de la prueba
    wrapper.destroy()
  })
})
