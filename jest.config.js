import { mount } from '@vue/test-utils'
import MyComponent from '@/components/MyComponent.vue' // Asegúrate de importar tu componente o archivo principal aquí



describe('toggleFavourite', () => {
  it('debería cambiar el estado de favorito de un Pokémon', async () => {
    // Crea un montaje de tu componente o crea un objeto de datos simulado
    const wrapper = mount(MyComponent) // Ajusta esto según tu estructura de componentes

    // Simula un Pokémon y agrégalo a la lista de pokemons.value
    const pokemon = { name: 'Pikachu', isFavourite: false }
    wrapper.vm.pokemons.push(pokemon)

    // Llama a la función toggleFavourite para cambiar el estado de favorito
    await wrapper.vm.toggleFavourite(pokemon)

    // Verifica si el estado de favorito se ha cambiado correctamente
    expect(pokemon.isFavourite).toBe(true)

    // Llama a la función toggleFavourite nuevamente para revertir el cambio
    await wrapper.vm.toggleFavourite(pokemon)

    // Verifica si el estado de favorito se ha revertido correctamente
    expect(pokemon.isFavourite).toBe(false)
  })
})
