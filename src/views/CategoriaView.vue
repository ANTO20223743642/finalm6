<template>
    <div>
        <h1>Categoria</h1>
        <form @submit.prevent="agregarCategoria()">
            <div class="input-group mb-3">
                <input type="text" class="form-control" v-model="Categoria.titulo" placeholder="Nueva Categoria"
                    aria-describedby="button-addon2">
                <button class="btn btn-outline-secondary" type="submit">Agregar</button>
            </div>
        </form>
        <h5>Buscador de Categorias {{textoABuscar}}</h5>
        <form action="">
        <div class="input-group mb-3">
            <input type="text" v-model="textoABuscar" class="form-control" placeholder="Buscar Libros" >
            <button class="btn btn-outline-secondary" @click.prevent="getCategoria()">Buscar</button>
        </div>
       </form> 

       <div class="form-check form-switch">
            <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked"
                :checked="$store.state.soloTerminado" v-on:input="$store.state.soloTerminado = $event.target.checked">
            <label class="form-check-label" for="flexSwitchCheckChecked">Mostrar solo terminados
            </label>
        </div>

        <div class="accordion" id="accordionExample">

            <div class="accordion-item" v-for="(value, index) in lista">
                <h2 class="accordion-header" id="headingTwo">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        :data-bs-target="`#collapseTwo${index}`" aria-expanded="false"
                        :aria-controls="`collapseTwo${index}`">
                        <input type="checkbox" :checked="value.terminado"
                            @click="setearCheckbox(value.terminado, value.id)">
                        {{value.titulo}}
                    </button>
                </h2>
                <div :id="`collapseTwo${index}`" class="accordion-collapse collapse" aria-labelledby="headingTwo"
                    data-bs-parent="#accordionExample">
                    <div class="accordion-body">
                        {{value.contenido}}

                        <app-acciones @onAccion="irA($event, value.id)"></app-acciones>

                    </div>
                </div>
            </div>

        </div>


    </div>
</template>

<script>
import AppAcciones from '@/components/AppAcciones.vue';
export default {
    name: 'CategoriaView',
    data() {
        return {
            soloTeminado: false,
            textoABuscar: '',
            Libro: {
                titulo: null,
                contenido: null,
                terminado: false
            },
            Libros: []
        }
    },
    methods: {
        agregarCategoria() {
            axios({
                method: "post",
                url: process.env.VUE_APP_RUTA_API+"/Categorias",
                data: this.Categoria
            })
                .then(response => {
                    console.log(response);
                    this.Categoria.titulo = null;
                    this.getCategorias();
                })
                .catch(e => console.log(e));
        },
        getCategorias() {
            axios({
                method: "get",
                url: process.env.VUE_APP_RUTA_API+"/Categorias/?q="+this.textoABuscar
            })
                .then(response => {
                    this.Categorias = response.data;
                    console.log(response);
                })
                .catch(e => console.log(e));
        },
        setearCheckbox(terminado, id) {
            axios({
                method: "patch",
                url: process.env.VUE_APP_RUTA_API+"/Categorias/" + id,
                data: {
                    terminado: !terminado
                }
            })
                .then(response => {
                    console.log(response);
                })
                .catch(e => console.log(e));
        },
        irA(opcion, Categoria_id) {
            if (opcion === 'editar') {
                this.$router.push({ name: 'editarCategoria', params: { id: Libro_id } });
            } else {
                if (confirm("Esta seguro de eliminar Categoria")) {
                    axios({
                        method: "delete",
                        url: process.env.VUE_APP_RUTA_API+"/Categorias/" + Categoria_id
                    })
                        .then(response => {
                            this.getCategorias();
                            console.log(response);
                        })
                        .catch(e => console.log(e));
                }
            }
        },
        lista_(){
            
            if(this.$store.state.soloTerminado){
                return this.Categorias.filter(item =>{
                    return item.terminado;
                });
            }
            return this.Categorias;
        }
    },
    computed: {
        lista(){
            if(this.$store.state.soloTerminado){
                return this.Categorias.filter(item =>{
                    return item.terminado;
                });
            }
            return this.Categorias;
        }
    },
    mounted() {
        this.getCategorias()
    },
    components: {
        AppAcciones
    }
}
</script>

<style>

</style>