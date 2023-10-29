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
                    
                    <template v-if="contestarCuestionario === true">
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
                    <template v-else>
                        <div class="container">
                            <div class="cardTerminado">
                                <h1>Tu cuestionario se ha generado</h1>
                                <h2>¿Que quieres hacer?</h2>
    
                                <div class="btnOps">
                                    <span>Si generas el PDF podras ver las respuestas correctas</span>
                                    <button class="btnClass" @click="generarPDF"><svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="35" height="35" viewBox="0 0 550.801 550.801" style="enable-background:new 0 0 550.801 550.801;" xml:space="preserve">
                                        <g>
                                            <path d="M160.381,282.225c0-14.832-10.299-23.684-28.474-23.684c-7.414,0-12.437,0.715-15.071,1.432V307.6   c3.114,0.707,6.942,0.949,12.192,0.949C148.419,308.549,160.381,298.74,160.381,282.225z"/>
                                            <path d="M272.875,259.019c-8.145,0-13.397,0.717-16.519,1.435v105.523c3.116,0.729,8.142,0.729,12.69,0.729   c33.017,0.231,54.554-17.946,54.554-56.474C323.842,276.719,304.215,259.019,272.875,259.019z"/>
                                            <path d="M488.426,197.019H475.2v-63.816c0-0.398-0.063-0.799-0.116-1.202c-0.021-2.534-0.827-5.023-2.562-6.995L366.325,3.694   c-0.032-0.031-0.063-0.042-0.085-0.076c-0.633-0.707-1.371-1.295-2.151-1.804c-0.231-0.155-0.464-0.285-0.706-0.419   c-0.676-0.369-1.393-0.675-2.131-0.896c-0.2-0.056-0.38-0.138-0.58-0.19C359.87,0.119,359.037,0,358.193,0H97.2   c-11.918,0-21.6,9.693-21.6,21.601v175.413H62.377c-17.049,0-30.873,13.818-30.873,30.873v160.545   c0,17.043,13.824,30.87,30.873,30.87h13.224V529.2c0,11.907,9.682,21.601,21.6,21.601h356.4c11.907,0,21.6-9.693,21.6-21.601   V419.302h13.226c17.044,0,30.871-13.827,30.871-30.87v-160.54C519.297,210.838,505.47,197.019,488.426,197.019z M97.2,21.605   h250.193v110.513c0,5.967,4.841,10.8,10.8,10.8h95.407v54.108H97.2V21.605z M362.359,309.023c0,30.876-11.243,52.165-26.82,65.333   c-16.971,14.117-42.82,20.814-74.396,20.814c-18.9,0-32.297-1.197-41.401-2.389V234.365c13.399-2.149,30.878-3.346,49.304-3.346   c30.612,0,50.478,5.508,66.039,17.226C351.828,260.69,362.359,280.547,362.359,309.023z M80.7,393.499V234.365   c11.241-1.904,27.042-3.346,49.296-3.346c22.491,0,38.527,4.308,49.291,12.928c10.292,8.131,17.215,21.534,17.215,37.328   c0,15.799-5.25,29.198-14.829,38.285c-12.442,11.728-30.865,16.996-52.407,16.996c-4.778,0-9.1-0.243-12.435-0.723v57.67H80.7   V393.499z M453.601,523.353H97.2V419.302h356.4V523.353z M484.898,262.127h-61.989v36.851h57.913v29.674h-57.913v64.848h-36.593   V232.216h98.582V262.127z"/>
                                        </g>
                                    </svg> Obtener PDF</button>
                                    <button class="btnClass" @click="contestarCuestionario = true"><svg xmlns="http://www.w3.org/2000/svg" height="35" viewBox="0 -960 960 960" width="35"><path d="M320-240h320v-80H320v80Zm0-160h320v-80H320v80ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520v-200H240v640h480v-440H520ZM240-800v200-200 640-640Z"/></svg> Responder cuestionario</button>
                                </div>
                            </div>
                        </div>
                    </template>
                </template>
            </template>

        </ion-content>
    </ion-page>
</template>
<script>
import { IonPage, IonContent, IonHeader, IonToolbar, IonTitle, IonGrid, IonRow, IonCol, IonRadio, IonRadioGroup, IonButton, IonButtons } from "@ionic/vue";
import ComponenteCuestionario from '../views/ComponenteCuestionario.vue'

import jsPDF from 'jspdf';

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
            contestarCuestionario: false
        }
    },
    methods: {
        generarPDF(){
            let doc = new jsPDF();
            doc.setFontSize(10);
            let y = 10; // Posición inicial en el eje y
            this.objectoRes.data.forEach((obj, index) => {
                let lines = doc.splitTextToSize(`Pregunta ${index + 1}: ${obj.question}`, 180); // Divide el texto en líneas que caben dentro de 180 unidades.
                for (let i = 0; i < lines.length; i++) {
                    if (y > 280) { // Si la posición y es mayor que 280, agrega un salto de página
                        doc.addPage();
                        y = 10;
                    }
                    doc.text(lines[i], 10, y);
                    y += 10;
                }
                obj.options.forEach((opcion, opcionIndex) => {
                    lines = doc.splitTextToSize(`${opcionIndex + 1}. ${opcion} ${opcion === obj.answer ? '(correcta)' : ''}`, 180);
                    for (let i = 0; i < lines.length; i++) {
                        if (y > 280) { // Si la posición y es mayor que 280, agrega un salto de página
                            doc.addPage();
                            y = 10;
                        }
                        doc.text(lines[i], 20, y); // Indenta las opciones
                        y += 10;
                    }
                });
                y += 20; // Deja un espacio antes de la siguiente pregunta
            });
            doc.save('preguntas.pdf');
        },
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
        generarCuestionario() {
            if(this.indicePreguntaActual < this.objectoRes.data.length) {
                this.respuestaSelect = null
                this.estadoRes = ''
                this.resolverPregunta = false
                this.objetoPregunta = this.objectoRes.data[this.indicePreguntaActual]
                this.indicePreguntaActual++
            } 
            else {
                this.cuestionarioFinalizado = true
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