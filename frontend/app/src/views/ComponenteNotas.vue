<template>
    <ion-page>
        <ion-header>
                <ion-toolbar>
                    <ion-buttons slot="start">
                        <ion-button @click="regresarVista" class="ion-margin-top" expand="full" style="color: #A2B2EE;">Cancelar</ion-button>
                    </ion-buttons>
                    <ion-title style="margin-left: 0px;">Nueva Nota</ion-title>
                </ion-toolbar>
            </ion-header>

      <ion-content class="ion-padding">
        <div style="text-align: center;">
          <h1>Elige la carpeta donde guardarás tu nota</h1>
        </div> <br>
         
        <ion-list @click="selectCarpeta(carpeta.id)" :inset="true" style="border-radius: 20px;" v-for="(carpeta, i) in arrayCarpetas" :key="i">
          <CarpetaListNota :color="carpeta.color_carpeta" :name="carpeta.nombre_carpeta" />
        </ion-list>

      </ion-content>
    </ion-page>
  </template>
  
  <script>
  import { IonPage, IonHeader, IonToolbar, IonTitle, IonButton, IonContent, IonInput, IonSelect, IonSelectOption, IonList, IonListHeader, IonLabel, IonItemGroup, IonItem } from "@ionic/vue";
  import CarpetaListNota from '../views/CarpetaListNota.vue'

  import axios from '../api/api.js'
  import { Drivers, Storage } from '@ionic/storage';
  import CordovaSQLiteDriver from 'localforage-cordovasqlitedriver'
  const store = new Storage({
    driverOrder: [CordovaSQLiteDriver._driver, Drivers.IndexedDB, Drivers.LocalStorage]
  });

  store.create()
  
  export default {
    name: 'ComponenteNotas',
    components: {
        IonPage, IonHeader, IonToolbar, IonTitle, IonButton, IonContent, IonInput, IonSelect, IonSelectOption, IonList, IonListHeader, IonLabel, IonItemGroup, IonItem, CarpetaListNota
    },
    data() {
      return {
        token: '',
        arrayCarpetas: []
      };
    },
    methods: {
      regresarVista() {
        window.history.back();
      },
      async getCarpetas() {
        try {
          await this.obtenerToken()
          
          axios.get('/api/carpeta/index', {
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
      selectCarpeta(id) {
        this.$router.push({path: `/editor/${id}`})
      }
    },
    mounted() {
      this.getCarpetas()
    }
  };
  </script>
  
  <style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@1,300&display=swap');

* {
  font-family: 'Open Sans', sans-serif;
}
  </style>
  