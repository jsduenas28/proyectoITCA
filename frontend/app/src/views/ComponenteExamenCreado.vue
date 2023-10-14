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
            objectoRes:  [],
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
        async obtenerCuestionario() {
            try {
                await this.obtenerToken()
                var nota = this.$route.params.nota

                axios.get(`/api/genCuestionario/${nota}`, {
                    headers: {
                        'Authorization': 'Bearer ' + this.token
                    }
                })
                .then(response => {
                    this.objectoRes = response.data
                    this.generarCuestionario()
                })
                .catch(error => console.error(error))
            } catch (error) {
                console.error(error);
            }
        },
        generarCuestionario() {
            if(this.indicePreguntaActual < this.objectoRes.data.length) {
                this.respuestaSelect = null
                this.resolverPregunta = false
                this.objetoPregunta = this.objectoRes.data[this.indicePreguntaActual]
                this.indicePreguntaActual++
            } 
            else {
                alert('Respondidas: ' + this.respuestasCorrectas + '/' + this.objectoRes.data.length)
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
        this.obtenerCuestionario()
        this.getNota()
    },
}
</script>
<style>
    
</style>