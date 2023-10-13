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
            <ion-row>
                <ion-col><p>{{ objetoPregunta.question }}</p></ion-col>
            </ion-row>
            <ion-row>
                <ion-radio-group allow-empty-selection="true" value="space-between">
                    <ion-item v-for="(respuestas, i) in objetoPregunta.options" :key="i">
                        <ion-radio :value="respuestas" justify="space-between" @click="seleccionarRes(respuestas)">{{ respuestas }}</ion-radio> 
                    </ion-item>
                </ion-radio-group>
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
        </ion-content>
    </ion-page>
</template>
<script>
import { IonPage, IonContent, IonHeader, IonToolbar, IonTitle, IonRow, IonCol, IonRadio, IonRadioGroup, IonButton, IonButtons } from "@ionic/vue";

import axios from '../api/api.js'
import { Drivers, Storage } from '@ionic/storage';
import CordovaSQLiteDriver from 'localforage-cordovasqlitedriver'
const store = new Storage({
  driverOrder: [CordovaSQLiteDriver._driver, Drivers.IndexedDB, Drivers.LocalStorage]
});

store.create()

export default {
    name: 'ComponenteExamenCreado',
    component: {
        IonPage, IonContent, IonRow, IonCol, IonRadio, IonRadioGroup, IonHeader, IonToolbar, IonTitle, IonButton, IonButtons
    },
    data() {
        return {
            objectoRes:  [
                {
                    "id": "pDgnjdMzOt9",
                    "question": "¿Cuál fue la mayor contienda bélica de la historia?",
                    "answer": "Segunda Guerra Mundial",
                    "options": ["Primera Guerra Mundial", "Guerra de Vietnam", "Guerra de los Balcanes", "Segunda Guerra Mundial", "Guerra Fría"]
                },
                {
                    "id": "GZG49mXC3Jy",
                    "question": "¿Cuántos militares se movilizaron en la Segunda Guerra Mundial?",
                    "answer": "100 millones",
                    "options": ["100 millones", "50 millones", "70 millones", "80 millones", "120 millones"]
                },
                {
                    "id": "r0SclR9bOYf",
                    "question": "¿Cuáles fueron las dos alianzas militares enfrentadas en la Segunda Guerra Mundial?",
                    "answer": "Aliados y Potencias del Eje",
                    "options": ["Aliados y Comunistas", "Alemania y Francia", "Unión Soviética y Japón", "Aliados y Potencias del Eje", "Estados Unidos y Rusia"]
                },
                {
                    "id": "Tjadx7EYWKL",
                    "question": "¿Qué reivindicación expansionista llevó a Hitler a invadir Polonia?",
                    "answer": "El Corredor Polaco",
                    "options": ["Anexión de Alsacia-Lorena", "El Corredor Polaco", "Anexión de los Sudetes", "Anexión de Austria", "Anexión de Eslovaquia"]
                },
                {
                    "id": "Z9TxfwpFzvN",
                    "question": "¿Qué técnica militar desarrolló Alemania en la Segunda Guerra Mundial?",
                    "answer": "Blitzkrieg",
                    "options": ["Guerra de trincheras", "Guerra de mentira", "Guerra de guerrillas", "Guerra psicológica", "Blitzkrieg"]
                }
            ],
            objetoPregunta: {},
            indicePreguntaActual: 0,
            resolverPregunta: false,
            respuestaSelect: null,
            respuestasCorrectas: 0,
            contenidoNota: []
        }
    },
    methods: {
        regresarVista() {
            this.$router.push('/tabs/inicio')
        },
        async getNota() {
            try {
                await this.obtenerToken()
                const idNota = this.$route.params.nota
            
                axios.get(`/api/nota/edit/${idNota}`, {
                    headers: {
                        'Authorization': 'Bearer ' + this.token
                    }
                })
                .then(response => {
                    this.contenidoNota = response.data[0].contenido_nota
                })
                .catch(error => console.error(error))
            } catch (error) {
                console.error(error);
            }
        },
        async obtenerToken() {
            try {
                this.token = await store.get('accessToken');
            } catch (error) {
                console.error("Error al obtener el token:", error);
                throw error; // Manejo de errores, si es necesario
            }
        },
        obtenerCuestionario() {
            const peticion = {
                "type": "contextBased",
                "context": "La Segunda Guerra Mundial (también escrito II Guerra Mundial)1​ fue un conflicto militar global que se desarrolló entre 1939 y 1945. En ella se vieron implicadas la mayor parte de las naciones del mundo —incluidas todas las grandes potencias, así como prácticamente todas las naciones europeas— agrupadas en dos alianzas militares enfrentadas: los Aliados, por un lado, y las Potencias del Eje, por otro. Fue la mayor contienda bélica de la historia, con más de 100 millones de militares movilizados y un estado de guerra total en que los grandes contendientes destinaron toda su capacidad económica, militar y científica al servicio del esfuerzo bélico, borrando la distinción entre recursos civiles y militares. Marcada por hechos de enorme repercusión que incluyeron la muerte masiva de civiles (el Holocausto, los bombardeos masivos sobre ciudades y el uso, por primera vez en un conflicto militar, de armas nucleares), la Segunda Guerra Mundial fue la más mortífera de la historia, con un resultado de entre 50 y 70 millones de víctimas, el 2,5 % de la población mundial.2​ ",
                "questionType": "MCQ",
                "language": "spanish"
            }

            var apiKey = "sk20YuH47nKzolYdmxdHDz30CAv58eD"

            axios.post('https://api.opexams.com/questions-generator', JSON.stringify(peticion), {
                headers: {
                    "Access-Control-Allow-Headers": "Content-Type",
                    "api-key": apiKey,
                    "request-type": "test",
                    "Content-Type": "application/json"
                }
            })
            .then(response => {
                console.log(respose.data)
            })
            .catch(error => console.error(error))
        },
        generarCuestionario() {
            if(this.indicePreguntaActual < this.objectoRes.length) {
                this.respuestaSelect = null
                this.resolverPregunta = false
                this.objetoPregunta = this.objectoRes[this.indicePreguntaActual]
                this.indicePreguntaActual++
            } else {
                alert('Respondidas: ' + this.respuestasCorrectas + '/' + this.objectoRes.length)
            }
        },
        validarPregunta() {
            if(this.respuestaSelect == this.objetoPregunta.answer) {
                alert('Correcto')
                this.respuestasCorrectas++
                this.resolverPregunta = true
            } else {
                alert('Incorrecto')
                this.resolverPregunta = true
            }
        },
        seleccionarRes(respuesta) {
            this.respuestaSelect = respuesta
        }
    },
    mounted() {
        //this.obtenerCuestionario()
        this.generarCuestionario()
        this.getNota()
    },
}
</script>
<style>
    
</style>