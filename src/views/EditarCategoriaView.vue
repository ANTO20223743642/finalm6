<template>
    <div class="container">
        <div class="abs-center">
            
            <form action="" @submit.prevent="guardar()">
                <div class="mb-3">
                    <label class="form-label">Categoria</label>
                    <input type="text" v-model="Categoria.categoria" class="form-control">
                </div>
                <texcategoria style="width: 100%" v-model="Categoria.contenido"></texcategoria>
                <button type="submit" class="btn btn-primary m-2">Guardar</button>
                <button class="btn btn-light m-2">Cancelar</button>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    name: 'editarCategoriaView',
    data() {
        return {
            categoria:{
                categoria: null,
                contenido: null
            }
        }
    },
    methods: {
        getCategoria(){
            axios({
                method: "get",
                url: process.env.VUE_APP_RUTA_API+"/categoria/"+this.$route.params.id
            })
            .then(response => {
                this.categoria = response.data;
            console.log(response);
            })
            .catch(e => console.log(e));
        },
        guardar(){
            axios({
                method: "patch",
                url: process.env.VUE_APP_RUTA_API+"/categoria/"+this.$route.params.id,
                data: this.categoria
            })
            .then(response => {
                this.$store.state.mensaje = {
                    texto: "La Categoria se Modifico exitosamente",
                    tipo: "exito"
                };
                this.$store.dispatch('addMensajeAction');
                this.$router.push({name: 'categoria'});
            })
            .catch(e => console.log(e));
        }
    },
    computed: {
    },
    mounted() {
        this.getCategoria()
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