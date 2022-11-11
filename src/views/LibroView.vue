<template>
    <div>
        <h1>Libros</h1>
        <form @submit.prevent="agregarLibro()">
            <div class="input-group mb-3">
                <input type="text" class="form-control" v-model="Libro.titulo" placeholder="Nuevo Libro"
                    aria-describedby="button-addon2">
                <button class="btn btn-outline-secondary" type="submit">Agregar</button>
            </div>
        </form>
        <h5>Buscador de Libros {{textoABuscar}}</h5>
        <form action="">
        <div class="input-group mb-3">
            <input type="text" v-model="textoABuscar" class="form-control" placeholder="Buscar Libros" >
            <button class="btn btn-outline-secondary" @click.prevent="getLibros()">Buscar</button>
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
    name: 'LibroView',
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
        agregarLibro() {
            axios({
                method: "post",
                url: process.env.VUE_APP_RUTA_API+"/Libros",
                data: this.Libro
            })
                .then(response => {
                    console.log(response);
                    this.Libro.titulo = null;
                    this.getLibros();
                })
                .catch(e => console.log(e));
        },
        getLibros() {
            axios({
                method: "get",
                url: process.env.VUE_APP_RUTA_API+"/Libros/?q="+this.textoABuscar
            })
                .then(response => {
                    this.Libros = response.data;
                    console.log(response);
                })
                .catch(e => console.log(e));
        },
        setearCheckbox(terminado, id) {
            axios({
                method: "patch",
                url: process.env.VUE_APP_RUTA_API+"/Libros/" + id,
                data: {
                    terminado: !terminado
                }
            })
                .then(response => {
                    console.log(response);
                })
                .catch(e => console.log(e));
        },
        irA(opcion, Libro_id) {
            if (opcion === 'editar') {
                this.$router.push({ name: 'editarLibro', params: { id: Libro_id } });
            } else {
                if (confirm("Esta seguro de eliminar Libro")) {
                    axios({
                        method: "delete",
                        url: process.env.VUE_APP_RUTA_API+"/Libros/" + Libro_id
                    })
                        .then(response => {
                            this.getLibros();
                            console.log(response);
                        })
                        .catch(e => console.log(e));
                }
            }
        },
        lista_(){
            
            if(this.$store.state.soloTerminado){
                return this.Libros.filter(item =>{
                    return item.terminado;
                });
            }
            return this.Libros;
        }
    },
    computed: {
        lista(){
            if(this.$store.state.soloTerminado){
                return this.Libros.filter(item =>{
                    return item.terminado;
                });
            }
            return this.Libros;
        }
    },
    mounted() {
        this.getLibros()
    },
    components: {
        AppAcciones
    }
}
</script>

<style>

</style>