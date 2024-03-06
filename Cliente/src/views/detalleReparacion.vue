<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const ruta = useRoute()

    let idDetalle = ruta.params.id;
    let listaReparaciones = [];
    let detalle;
    let mostrarDetalle = ref(false);

    onMounted(() => {
        verLista();
    });

    function verLista() {
        if(JSON.parse(localStorage.getItem("Reparaciones"))) {
            listaReparaciones = JSON.parse(localStorage.getItem("Reparaciones"))
            listaReparaciones.forEach(element => {
                if(element.id == idDetalle) {
                    detalle = element;
                    console.log(detalle)
                    mostrarDetalle.value = true;
                }
            });
        }
    }

</script>

<template>
    <h1>Detalle Reparacion</h1>
    <ul v-if="mostrarDetalle">
        <li v-for="item in detalle">
            {{ item }}
        </li>
    </ul>
    <form id='uploadForm' action='http://localhost:3000/upload' method='post' encType="multipart/form-data">
        <input className="text-light" type="file" name="sampleFile" title="" />
        <input type='submit' value='Upload!' />
    </form> 
    
</template>