<template>
    <nav class="navbar navbar-expand-lg bg-light">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">{{titulo}} ({{mode}})</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
            <router-link to="/">_Inicio_</router-link> 
        </li>
        <li class="nav-item">
            <router-link to="/">Acercade</router-link>
        </li>
        <li class="nav-item">
            <router-link to="/Libros">Libros</router-link>
        </li>
          <li class="nav-item">
            <router-link to="/Categorias">Categorias</router-link>
        </li>
          <li class="nav-item">
            <router-link to="/Digitalizados">_Libros Digitalizados_</router-link>
        </li>
          <li class="nav-item">
            <router-link to="/ImagenesLibro">_ImagenesLibro_</router-link>
        </li>
      </ul>

    </div>
  </div>
</nav>
<app-alert></app-alert>
</template>

<script>
import AppAlert from '@/components/AppAlert.vue';
    export default {
        name: 'appMenu',
        data(){
            return {
              mode:null
            }
        },
        props:["titulo"],
        methods: {
        },
        computed: {
        },
        mounted(){
          this.mode = process.env.VUE_APP_MODE
        },
        components: {
          AppAlert
        }
    }
</script>

<style>

</style>