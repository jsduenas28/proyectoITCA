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

        <template v-if="cargando">
            <div class="contenedorSpinner">
              <div class="spinner"></div>
            </div>
        </template>
        <template v-else>
          <div v-if="arrayCarpetas.length === 0" style="text-align: center;">
            <br><br>
            <svg width="140" height="124" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M416 221.25V416C416 428.73 410.943 440.939 401.941 449.941C392.939 458.943 380.73 464 368 464H144C131.27 464 119.061 458.943 110.059 449.941C101.057 440.939 96 428.73 96 416V96C96 83.2696 101.057 71.0606 110.059 62.0589C119.061 53.0571 131.27 48 144 48H242.75C251.234 48.0013 259.37 51.3716 265.37 57.37L406.63 198.63C412.628 204.63 415.999 212.766 416 221.25Z" stroke="#393939" stroke-width="32" stroke-linejoin="round"/>
              <path d="M256 56V176C256 184.487 259.371 192.626 265.373 198.627C271.374 204.629 279.513 208 288 208H408" stroke="#393939" stroke-width="32" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M147.998 286.654H364.056" stroke="#393939" stroke-width="32" stroke-linecap="round"/>
              <path d="M148 363H364.058" stroke="#393939" stroke-width="32" stroke-linecap="round"/>
            </svg>

            <h1 style="color: #9aa0a6;">Parece que no tienes carpetas</h1>
            <h3 style="color: #9aa0a6;">Crea una para poder guardar tus apuntes</h3>
          </div>
          <ion-list @click="selectCarpeta(carpeta.id)" :inset="true" style="border-radius: 20px;" v-for="(carpeta, i) in arrayCarpetas" :key="i">
            <CarpetaListNota :color="carpeta.color_carpeta" :name="carpeta.nombre_carpeta" />
          </ion-list>

        </template>
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
        arrayCarpetas: [],
        cargando: false
      };
    },
    methods: {
      regresarVista() {
        this.$router.push({path: '/tabs/inicio'})
      },
      async getCarpetas() {
        try {
          await this.obtenerToken()
          this.cargando = true
          axios.get('/api/carpeta/index', {
            headers: {
                'Authorization': 'Bearer ' + this.token
            }
          })
          .then(response => {
            this.arrayCarpetas = response.data
          })
          .catch(error => console.error(error))
          .then(() => {this.cargando = false})
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
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500&display=swap');
  *{
      font-family: 'Poppins',sans-serif;
    }

.contenedorSpinner{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 10vh; /* Ajusta esto según tus necesidades */
  }

  .spinner {
    width: 11.2px;
    height: 11.2px;
    border-radius: 11.2px;
    box-shadow: 28px 0px 0 0 rgba(71,75,255,0.2), 22.7px 16.5px 0 0 rgba(71,75,255,0.4), 8.68px 26.6px 0 0 rgba(71,75,255,0.6), -8.68px 26.6px 0 0 rgba(71,75,255,0.8), -22.7px 16.5px 0 0 #474bff;
    animation: spinner-b87k6z 1s infinite linear;
  }

  @keyframes spinner-b87k6z {
    to {
        transform: rotate(360deg);
    }
  }
</style>
  