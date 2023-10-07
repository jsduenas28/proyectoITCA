<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-buttons slot="start">
                        <ion-button @click="regresarVista" class="ion-margin-top" expand="full" style="color: #A2B2EE;">Cancelar</ion-button>
                    </ion-buttons>
                </ion-buttons>
                <ion-title>Generar un cuestionario</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content class="ion-padding">
            <div id="content">
                <ion-label style="font-size: 25px; text-align: center  ;"><strong>Seleccione una nota para generar un cuestionario</strong></ion-label>
                <div class="line"></div>
            </div>
            
            <ion-list :inset="true" style="border-radius: 20px;" v-for="(carpeta, i) in arrayCarpetas" :key="i">
                <CarpetaList :name="carpeta.nombre_carpeta" :color="carpeta.color_carpeta" :toggleListName="i" :idCarpeta="carpeta.id" :metodoToggleList="toggleList" />
                <ion-item-group v-if="activeList === i">
                    <ion-item @click="editar(notas.id)" v-for="(notas, j) in carpeta.notas" :key="j">
                        <ion-label>{{ notas.titulo_nota }}</ion-label>
                    </ion-item>
                </ion-item-group>
            </ion-list>
        </ion-content>
        
    </ion-page>
</template>
<script>
import { IonPage, IonContent, IonHeader, IonToolbar, IonButton, IonButtons, IonBackButton, IonTitle, IonList, IonListHeader, IonLabel, IonItemGroup, IonItem } from "@ionic/vue";
import CarpetaList from '../views/CarpetaList.vue'

import axios from '../api/api.js'
import { Drivers, Storage } from '@ionic/storage';
import CordovaSQLiteDriver from 'localforage-cordovasqlitedriver'
const store = new Storage({
  driverOrder: [CordovaSQLiteDriver._driver, Drivers.IndexedDB, Drivers.LocalStorage]
});

store.create()

export default {
    name: 'ComponenteArchivo',
    components: {
        IonPage, IonContent, IonHeader, IonToolbar, IonButton, IonButtons, IonBackButton, IonTitle, IonList, IonListHeader, IonLabel, IonItemGroup, IonItem, CarpetaList
    },
    data(){
        return {
            activeList: null,
            arrayCarpetas: [],
            arrayNotas: [],
            token: ''
        };
    },
    methods: {
        regresarVista() {
            window.history.back();
        },
        editar(id) {
            this.$router.push({path: `/examenCreado/${id}`})
        },
        toggleList(listName) {
          this.activeList = this.activeList === listName ? null : listName;
        },
        async getCarpetas() {
            try {
                await this.obtenerToken()
            
                axios.get('/api/carpeta/carpetaNota', {
                    headers: {
                        'Authorization': 'Bearer ' + this.token
                    }
                })
                .then(response => {
                    this.arrayCarpetas = response.data
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
    },
    mounted() {
        this.getCarpetas()
    }
}
</script>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@1,300&display=swap');

* {
  font-family: 'Open Sans', sans-serif;
}

#content {
    display: flex;
    flex-direction: column;
    justify-content: center; 
    align-items: center;
    height: 15%; 
}

</style>