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
                <ion-col><p>{{ objectoRes.pregunta }}</p></ion-col>
            </ion-row>
            <ion-row>
                    <ion-radio-group allow-empty-selection="true" value="space-between">
                        <ion-item v-for="(respuestas, i) in objectoRes.respuestas" :key="i">
                            <ion-radio :value="i" justify="space-between">{{ objectoRes.respuestas }}</ion-radio> 
                        </ion-item>
                    </ion-radio-group>
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
            objectoRes: '',
            resMezcladas: [],
            resSeleccionada: ''
        }
    },
    methods: {
        regresarVista() {
            window.history.back();
        },
        async getCuestionario() {
            await this.obtenerToken()
            const nota = this.$route.params.nota

            axios.get(`/api/genCuestionario/${nota}`, {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + this.token
                }
            })
            .then(response => {
                this.objectoRes = response.data
                console.log(this.objectoRes)
            })
            .catch(error => console.error(error))
        },
        async obtenerToken() {
            try {
                this.token = await store.get('accessToken');
            } catch (error) {
                console.error("Error al obtener el token:", error);
                throw error; // Manejo de errores, si es necesario
            }
        },
        shuffleArray(array) {
            array.sort(() => Math.random() - 0.5)
        }
    },
    mounted() {
        this.getCuestionario()
    }
}
</script>
<style>
    
</style>