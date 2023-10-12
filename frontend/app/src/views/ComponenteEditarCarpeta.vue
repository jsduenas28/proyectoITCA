<template>
    <ion-page>
        <ion-header>
                <ion-toolbar>
                    <ion-buttons slot="start">
                        <ion-button @click="regresarVista" class="ion-margin-top" expand="full" style="color: #A2B2EE;">Cancelar</ion-button>
                    </ion-buttons>
                    <ion-title style="margin-left: 0px;">Edita Carpeta</ion-title>
                    <ion-buttons slot="end">
                        <ion-button @click="editarCarpeta" class="ion-margin-top" expand="full" style="color: #A2B2EE;">Editar</ion-button>
                    </ion-buttons>
                </ion-toolbar>
            </ion-header>

            <ion-content class="ion-padding">
                <ion-input v-model="nombre_carpeta" label="Nombre nuevo" labelPlacement="floating" fill="outline" shape="round" 
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
            arrayCarpetas: [],
            carpeta: '',
            nombre_carpeta: '',
            color_carpeta: ''
        };
    },
    methods: {
        regresarVista() {
            this.$router.push({path: '/tabs/inicio'})
        },
        async editarCarpeta() {
            await this.obtenerToken()
            const datos = {
                nombre_carpeta: this.nombre_carpeta,
                color_carpeta: this.color_carpeta
            }

            axios.put(`/api/carpeta/update/${this.carpeta}`, JSON.stringify(datos), {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + this.token
                }
            })
            .then(response => {
                console.log(response.data);
                this.$router.push({path: '/tabs/inicio'})
            })
            .catch(error => console.error(error))
        },
        async getCarpetas() {
            try {
                await this.obtenerToken()
                const idCarpeta = this.$route.params.id
                
                axios.get(`/api/carpeta/edit/${idCarpeta}`, {
                    headers: {
                        'Authorization': 'Bearer ' + this.token
                    }
                })
                .then(response => {
                    this.carpeta = response.data[0].id
                    this.nombre_carpeta = response.data[0].nombre_carpeta
                    this.color_carpeta = response.data[0].color_carpeta
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
        }
    },
    mounted() {
        this.getCarpetas()
    },
}
</script>
<style>
    
</style>