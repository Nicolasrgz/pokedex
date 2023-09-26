#tecnologias.
Para la realización de esta prueba, utilicé las siguientes tecnologías: Vue.js 3, Vite, CSS3, HTML5, Bootstrap 5 y la libreria de SweetAlert2. Además, intenté implementar pruebas unitarias en la web utilizando Jest(no lo logre).

#logica y uso de metodos.
Opté por utilizar condicionales para adaptar el contenido de la página según las necesidades. Intenté adherirme al principio KISS (Keep It Simple, Stupid) para mantener las funciones simples y comprensibles. Cada función tiene un propósito claro, ya sea cargar datos, mostrar detalles de Pokémon o gestionar favoritos. 

El código comienza importando las funciones y variables necesarias de Vue 3, así como la biblioteca SweetAlert2 para mostrar mensajes emergentes.Las variables reactivas que use en este caso:
 
pokemons: Almacena una lista de Pokémon.
isLoading: Indica si la aplicación está cargando datos.
initialLoad: Indica si la aplicación está en su carga inicial.
search: Almacena el valor del campo de búsqueda.
showFavourites: Indica si se están mostrando los Pokémon favoritos.
showAll: Indica si se están mostrando todos los Pokémon.
selectedPokemon: Almacena los detalles del Pokémon seleccionado.
showModal: Indica si se debe mostrar el modal de detalles de Pokémon.
El gancho de ciclo de vida onMounted se utiliza para cargar datos después de que la instancia de Vue se ha montado. Se simula una carga de datos durante 2 segundos utilizando setTimeout y luego se obtienen datos de la API de Pokémon y se almacenan en pokemons.

La función getPokemonDetails se utiliza para obtener detalles de un Pokémon específico cuando se hace clic en su nombre. Los detalles se almacenan en selectedPokemon.

La función copyPokemonInfoToClipboard se utiliza para copiar la información del Pokémon seleccionado al portapapeles del usuario.

La función loadPokemons establece isLoading en false para indicar que la carga ha terminado.

La función updateLocalStorage actualiza la lista de Pokémon favoritos en el almacenamiento local del navegador.

La función toggleFavourite cambia el estado de favorito de un Pokémon y actualiza la lista principal de Pokémon y el almacenamiento local en consecuencia.

Las funciones toggleShowFavourites y toggleShowAll muestran solo los Pokémon favoritos o todos los Pokémon, respectivamente, y deshabilitan la otra opción si es necesario.

La propiedad computada displayedPokemons calcula la lista de Pokémon que se mostrarán en función de la búsqueda, la opción “Favoritos” y la opción “Todos”.

La función backToHome redirige al usuario a la página de inicio.

En el bloque template, se muestra una interfaz de usuario que incluye un campo de búsqueda, una lista de Pokémon, botones para filtrar entre “Favoritos” y “Todos”, y un modal para mostrar los detalles de un Pokémon. El botón “Todos” cambia su color de fondo según si se muestra la lista completa o los favoritos. Los Pokémon se muestran en una lista y se pueden marcar como favoritos haciendo clic en una estrella. El modal muestra los detalles del Pokémon seleccionado y permite copiar su información al portapapeles.

#observacion y autocritica
A pesar de mis esfuerzos, no logré implementar las pruebas unitarias. Investigué exhaustivamente y consulté numerosos documentos, pero no pude identificar el error que impedía su funcionamiento. 

Aparte de este contratiempo, me esforcé por respetar al máximo el diseño de la interfaz de usuario y seguir la guía proporcionada en Figma.

(note que esta api, no incluia a pikachu)