<template>
    <div class="container">
        <div class="abs-center">
            
            <form action="" @submit.prevent="guardar()">
                <div class="mb-3">
                    <label class="form-label">Categoria</label>
                    <input type="text" v-model="libro.categoria" class="form-control">
                </div>
                <texlibro style="width: 100%" v-model="libro.contenido"></texlibro>
                <button type="submit" class="btn btn-primary m-2">Guardar</button>
                <button class="btn btn-light m-2">Cancelar</button>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    name: 'editarLibroView',
    data() {
        return {
            libro:{
                categoria: null,
                contenido: null
            }
        }
    },
    methods: {
        getLibro(){
            axios({
                method: "get",
                url: process.env.VUE_APP_RUTA_API+"/libros/"+this.$route.params.id
            })
            .then(response => {
                this.libro = response.data;
            console.log(response);
            })
            .catch(e => console.log(e));
        },
        guardar(){
            axios({
                method: "patch",
                url: process.env.VUE_APP_RUTA_API+"/libros/"+this.$route.params.id,
                data: this.libro
            })
            .then(response => {
                this.$store.state.mensaje = {
                    texto: "El Libro se Modifico exitosamente",
                    tipo: "exito"
                };
                this.$store.dispatch('addMensajeAction');
                this.$router.push({name: 'libros'});
            })
            .catch(e => console.log(e));
        }
    },
    computed: {
    },
    mounted() {
        this.getLibro()
    },
    components: {
    }
}
</script>

<style scoped>
form {
    max-width: 400px;
}
</style>