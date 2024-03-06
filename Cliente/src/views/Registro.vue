<script setup>

import { ref, onMounted } from 'vue';
import listaPresupuestos from './listaPresupuestos.vue';

import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:4000';

const socket = io(URL);

let Descripcion = ref("");
let Completado = ref(false);
let Categoria = ref("Lavadora");
let listaReparaciones = [];
let id = 0;
let cantidadUsuario = ref(0);

onMounted(() => {
    mostrarUsuarios();
});

function mostrarUsuarios() {
    socket.emit('verUsuarios');
}

function guardarReparacion() {
    var Fecha = new Date()
    var FechaActual = Fecha.getDate() + "/" + Fecha.getMonth() + "/" + Fecha.getFullYear();

    let lista = {
        id: id,
        Descripcion: Descripcion.value,
        Completado: Completado.value,
        Categoria: Categoria.value,
        Fecha: FechaActual
    }

    listaReparaciones.push(lista);
    console.log(listaReparaciones)

    localStorage.setItem("Reparaciones",JSON.stringify(listaReparaciones));
    id++;
}

socket.on('mostrarUsuarios', (datos) => {
    console.log("Técnicos Conectados: " + datos);
    cantidadUsuario.value = datos;

})

</script>

<template>
    <h1>Registrar reparaciones</h1>

    <form @submit.prevent="guardarReparacion">
        <label>Descripción:</label>
        <input v-model="Descripcion" type="text" required>
        <br><br>
        <label>Completado:</label>
        <input v-model="Completado" type="checkbox">
        <br><br>
        <label>Categoría:</label>
        <select v-model="Categoria" required>
            <option>Lavadora</option>
            <option>Microondas</option>
            <option> Lavavajillas</option>
            <option>Frigorífico</option>
        </select>
        <input type="submit" value="Enviar">
    </form>
    <p>Técnicos Conectados: {{ cantidadUsuario }}</p>
    <listaPresupuestos></listaPresupuestos>
</template>

<style scoped>

</style>