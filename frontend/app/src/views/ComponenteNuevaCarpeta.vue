<template>
    <ion-page>
        <ion-header>
                <ion-toolbar>
                    <ion-buttons slot="start">
                        <ion-button @click="regresarVista" class="ion-margin-top" expand="full" style="color: #A2B2EE;">Cancelar</ion-button>
                    </ion-buttons>
                    <ion-title style="margin-left: 0px;">Crear una nueva carpeta</ion-title>
                    <ion-buttons slot="end">
                        <ion-button @click="crearCarpeta" class="ion-margin-top" expand="full" style="color: #A2B2EE;">Crear carpeta</ion-button>
                    </ion-buttons>
                </ion-toolbar>
            </ion-header>

            <ion-content class="ion-padding">
                <ion-input v-model="nombre_carpeta" label="Nombre de la carpeta" labelPlacement="floating" fill="outline" shape="round" 
                    style="--highlight-color-focused: #A2B2EE; margin-top: 40px;"
                ></ion-input>

                <ion-select v-model="color_carpeta" label="Elige el color de tu carpeta" labelPlacement="floating" fill="outline" shape="round" style="margin-top: 10px;">
                    <ion-select-option value="red">Rojo</ion-select-option>
                    <ion-select-option value="blue">Azul</ion-select-option>
                    <ion-select-option value="green">Verde</ion-select-option>
                    <ion-select-option value="yellow">Amarillo</ion-select-option>
                    <ion-select-option value="black">Negro</ion-select-option>
                    <ion-select-option value="white">Blanco</ion-select-option>
                </ion-select>
            </ion-content>
    </ion-page>
</template>
<script>
import { IonPage, IonHeader, IonToolbar, IonButton, IonButtons, IonContent, IonSelect, IonSelectOption, IonInput } from "@ionic/vue";

import axios from '../api/api.js'
import { Drivers, Storage } from '@ionic/storage';
import CordovaSQLiteDriver from 'localforage-cordovasqlitedriver'
const store = new Storage({
  driverOrder: [CordovaSQLiteDriver._driver, Drivers.IndexedDB, Drivers.LocalStorage]
});

store.create()

export default {
    name: 'ComponenteEditarCarpeta',
    components: {
        IonPage, IonHeader, IonToolbar, IonButton, IonButtons, IonContent, IonSelect, IonSelectOption, IonInput
    },
    data(){
        return {
            token: '',
            nombre_carpeta: '',
            color_carpeta: ''
        };
    },
    methods: {
        regresarVista() {
            this.$router.push({path: '/tabs/inicio'})
        },
        async crearCarpeta() {
            await this.obtenerToken()

            axios.post('/api/carpeta/store', {
                nombre_carpeta: this.nombre_carpeta,
                color_carpeta: this.color_carpeta
            }, {
                headers: {
                    'Authorization': 'Bearer ' + this.token
                }
            })
            .then(response => {
                this.$router.push({path: '/tabs/inicio', query: {showCarpetaCreate: 'true'}})
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
        }
    }
}
</script>
<style>
    
</style>