<script setup>
import router from '@/router';
import { ref,onMounted } from 'vue';

let lista = ref([]);
let mostrarLista = ref(false);

onMounted(() => {
    verLista();
});

function verLista() {
    lista.value = JSON.parse(localStorage.getItem("Reparaciones"));
    mostrarLista.value = true;
}

function verDetalle(id) {
    console.log(id);
    router.push(`/detalle/${id}`);
}

function borrarReparacion(id) {
    for(let i = 0; i < lista.value.length; i++) {
        if(lista.value[i].id === id) {
            lista.value.splice(i, 1);
            localStorage.setItem("Reparaciones", JSON.stringify(lista.value));
            break;
        }
    }
}
</script>

<template>
    <h1>Lista de Presupuestos</h1>
    <ul v-if="mostrarLista">
        <li v-for="item in lista" :key="item.id">
            <span @click="verDetalle(item.id)">
                {{ item.Descripcion }}
                {{ item.Fecha }}
            </span>
            <button @click="borrarReparacion(item.id)">Borrar</button>
        </li>
    </ul>
</template>
