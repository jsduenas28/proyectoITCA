<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-button @click="regresarVista" class="ion-margin-top" expand="full" style="color: #A2B2EE;">Cancelar</ion-button>
                </ion-buttons>

                <ion-title>Cuestionario</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content class="ion-padding">
            <template v-if="cargando">
                <ComponenteCuestionario />
            </template>
            <template v-else>
                <template v-if="cuestionarioFinalizado">
                    <div class="container">
                        <div class="cardTerminado">
                            <h1>Cuestionario completado</h1>

                            <h3>Puntuación</h3>
                            <h3>{{ respuestasCorrectas }} / {{ cantPreguntas }}</h3>

                            <ion-button @click="regresarVista">Generar otro cuestionario</ion-button>
                        </div>
                    </div>
                </template>
                <template v-else>
                    <ion-grid>
                        <div class="container">
                            <div class="cardOptions">
                                <ion-row>
                                    <ion-col>
                                        <template v-if="estadoRes === ''">
                                            <div class="bannerRes">
                                                <h2>{{ indicePreguntaActual }}/{{ cantPreguntas }}</h2>
                                            </div>
                                        </template>
                                        <template v-else>
                                            <ion-col>
                                                <div class="bannerRes" v-if="estadoRes === 'Correcto'" style="background-color: green;">
                                                    <h2>{{ estadoRes }}</h2>
                                                </div>
                                                <div class="bannerRes" v-if="estadoRes === 'Incorrecto'" style="background-color: red;">
                                                    <h2>{{ estadoRes }}</h2>
                                                </div>
                                            </ion-col>
                                        </template>
                                    </ion-col>
                                </ion-row>
                                <ion-row>
                                    <ion-col><h2>{{ objetoPregunta.question }}</h2></ion-col>
                                </ion-row>
                                <ion-row>
                                    <ion-col>
                                        <div v-for="(respuestas, i) in objetoPregunta.options" :key="i">
                                            <div class="itemOptions" :class="getClass(respuestas)" @click="seleccionarRes(respuestas)">{{ respuestas }}</div>
                                        </div>
                                    </ion-col>
                                </ion-row>
                                <ion-row>
                                    <ion-col>
                                        <template v-if="(resolverPregunta === false)">
                                            <ion-button @click="validarPregunta">Resolver Pregunta</ion-button>
                                        </template>
                                        <template v-else>
                                            <ion-button @click="generarCuestionario">Siguiente Pregunta</ion-button>
                                        </template>
                                    </ion-col>
                                </ion-row>
                            </div>
                        </div>
                    </ion-grid>
                </template>
            </template>

        </ion-content>
    </ion-page>
</template>
<script>
import { IonPage, IonContent, IonHeader, IonToolbar, IonTitle, IonGrid, IonRow, IonCol, IonRadio, IonRadioGroup, IonButton, IonButtons } from "@ionic/vue";
import ComponenteCuestionario from '../views/ComponenteCuestionario.vue'

import axios from '../api/api.js'
import { Drivers, Storage } from '@ionic/storage';
import CordovaSQLiteDriver from 'localforage-cordovasqlitedriver'
const store = new Storage({
  driverOrder: [CordovaSQLiteDriver._driver, Drivers.IndexedDB, Drivers.LocalStorage]
});

store.create()

export default {
    name: 'ComponenteExamenCreado',
    components: {
        IonPage, IonContent, IonGrid, IonRow, IonCol, IonRadio, IonRadioGroup, IonHeader, IonToolbar, IonTitle, IonButton, IonButtons, ComponenteCuestionario
    },
    data() {
        return {
            cargando: false,
            objectoRes:  [],
            objetoPregunta: {},
            indicePreguntaActual: 0,
            resolverPregunta: false,
            respuestaSelect: null,
            respuestasCorrectas: 0,
            contenidoNota: [],
            estadoRes: '',
            cantPreguntas: '',
            cuestionarioFinalizado: false,
            datosCuestionario: [],
        }
    },
    methods: {
        regresarVista() {
            this.$router.push('/crearExamen')
        },
        async obtenerToken() {
            try {
                this.token = await store.get('accessToken');
            } catch (error) {
                console.error("Error al obtener el token:", error);
                throw error; // Manejo de errores, si es necesario
            }
        },
        async obtenerCuestionario() {
            try {
                await this.obtenerToken()
                var nota = this.$route.params.nota
                this.cargando = true

                axios.get(`/api/genCuestionario/${nota}`, {
                    headers: {
                        'Authorization': 'Bearer ' + this.token
                    }
                })
                .then(response => {
                    this.objectoRes = response.data
                    this.cantPreguntas = this.objectoRes.data.length
                    this.generarCuestionario()
                })
                .catch(error => console.error(error))
                .then(() => {this.cargando = false})
            } catch (error) {
                console.error(error);
            }
        },
        async setCuestionario() {
            try {
                await this.obtenerToken()
                var idNota = this.$route.params.nota

                let data = {
                    nota_id: idNota,
                    resultados: this.datosCuestionario,
                    nota_cuestionario: this.respuestasCorrectas
                }

                axios.post('/api/resEstadisticos/store', data, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + this.token,
                    }
                })
                .then()
                .catch(error => console.error(error))
            } catch (error) {
                console.error(error);
            }
        },
        generarCuestionario() {
            if(this.indicePreguntaActual < this.objectoRes.data.length) {
                this.respuestaSelect = ''
                this.estadoRes = ''
                this.resolverPregunta = false
                this.objetoPregunta = this.objectoRes.data[this.indicePreguntaActual]
                this.indicePreguntaActual++
            } 
            else {
                this.cuestionarioFinalizado = true
                this.setCuestionario()
            }
        },
        validarPregunta() {
            if(this.respuestaSelect == this.objetoPregunta.answer) {
                this.respuestasCorrectas++
                this.estadoRes = 'Correcto'
            } else {
                this.estadoRes = 'Incorrecto'
            }

            this.resolverPregunta = true
            let datos = {
                pregunta: this.objetoPregunta.question,
                res_correcta: this.objetoPregunta.answer,
                res_select: this.respuestaSelect
            }

            this.datosCuestionario.push(datos)
        },
        seleccionarRes(respuesta) {
            this.respuestaSelect = respuesta
        },
        getClass(respuesta) {
            if(this.resolverPregunta) {
                if(respuesta === this.objetoPregunta.answer) {
                    return 'correct'
                } else if(this.respuestaSelect === respuesta) {
                    return 'incorrect'
                }
            } else if(this.respuestaSelect === respuesta) {
                return 'selected'
            }

            return ''
        }
    },
    mounted() {
        this.obtenerCuestionario()
    },
}
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500&display=swap');
  *{
      font-family: 'Poppins',sans-serif;
    }
    .cardOptions {
        border-radius: 10px;
        text-align: center;
        padding: 20px;
        width: 400px;
        background-color: #202020;
    }

    .cardTerminado {
        border-radius: 10px;
        text-align: center;
        padding: 20px;
        width: 400px;
        background-color: #202020;
    }

    .container {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .itemOptions {
        background-color: #333333;
        padding: 10px;
        border-radius: 10px;
        margin: 15px;
        border: 3px solid transparent;
    }
    .itemOptions.selected {
        border-color: rgb(1, 122, 170);
    }

    .itemOptions.correct {
        border-color: green;
    }

    .itemOptions.incorrect {
        border-color: red;
    }

    .bannerRes {
        border-radius: 5px;
        padding: 5px;
    }

    .btnOps {
        margin-top: 60px;
    }

    .btnOps button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 300px;
        height: 70px;
        margin: 5px;
        padding: 20px;
        background-color: transparent;
        border: 2px solid white;
        border-radius: 10px;
        text-align: center;
        font-size: 17px;
    }

    .btnOps button:hover {
        border: 2px solid rgb(0, 95, 112);
        color: rgb(0, 95, 112);
    }

    .btnOps svg {
        margin-right: 15px;
        fill: white;
    }

    .btnOps button:hover svg{
        fill: rgb(0, 95, 112);
    }
</style>