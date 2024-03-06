import { createRouter, createWebHistory } from 'vue-router'
import Registro from "../views/Registro.vue";
import listaPresupuestos from "../views/listaPresupuestos.vue";
import detalleReparacion from "../views/detalleReparacion.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'registro',
      component: Registro
    }, {
      path: "/lista",
      name: 'lista',
      component: listaPresupuestos
    },
    {
      path: "/detalle/:id",
      component: detalleReparacion,
    }
  ]
})

export default router
