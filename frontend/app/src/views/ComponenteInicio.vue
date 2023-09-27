<template>
 
    <ion-page>
      <ComponenteMenu/>
      <ion-content class="ion-padding">
        <div class="center-container">
          <h1 class="title"><strong>{{ mensajeSaludo }}</strong></h1>
          <p>token: {{ token }}</p>
          <div class="line"></div>
        </div>  

        <div style="display: flex;">
          <ion-icon :icon="briefcaseSharp" size="large" color="ligth"></ion-icon>   
              <p style="margin-top: 30px; ">Tus carpetas</p> 
        </div>

        <ion-row>
          <ion-col> 
              <div class="carrusel">
                  <div class="element" v-for="(carpeta, i) in arrayCarpetas" :key="i">
                      <CarpetaSlider :nombre="carpeta.nombre_carpeta" :color="carpeta.color_carpeta" />
                  </div>
              </div>
          </ion-col>
        </ion-row>      
      </ion-content>
    </ion-page>

  </template>
  <script>
  import { IonPage, IonContent, IonFab, IonFabButton, IonFabList, IonRow, IonCol } from "@ionic/vue";
  import { briefcaseSharp, addOutline, add, documentTextOutline } from 'ionicons/icons';
  import  ComponenteMenu  from '../views/ComponenteMenu.vue'
  import CarpetaSlider from '../views/CarpetaSlider.vue'
  import axios from '../api/api.js'
  import { Drivers, Storage } from '@ionic/storage';

  import CordovaSQLiteDriver from 'localforage-cordovasqlitedriver'

  const store = new Storage({
    driverOrder: [CordovaSQLiteDriver._driver, Drivers.IndexedDB, Drivers.LocalStorage]
  });

  await store.create()

  export default {
    name: 'ComponenteInicio',
    components: {
      IonPage, IonContent, IonFab, IonFabButton, IonFabList, IonRow, IonCol, ComponenteMenu, CarpetaSlider
    },
    data(){
        return {
            briefcaseSharp,
            addOutline, add, documentTextOutline,
            mensajeSaludo: '',
            token: '',
            arrayCarpetas: []
        }
    },
    mounted() {
      this.actualizarSaludo();
      this.getCarpetas()
    },
    methods: {
      actualizarSaludo() {
          const horaActual = new Date().getHours();
  
          if (horaActual >= 5 && horaActual < 12) {
              this.mensajeSaludo = '¡Buenos días!';
          } else if (horaActual >= 12 && horaActual < 18) {
              this.mensajeSaludo = '¡Buenas tardes!';
          } else {
              this.mensajeSaludo = '¡Buenas noches!';
          }
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
      }
    }
  }
  </script>

  <style >
  @import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@1,300&display=swap');

  * {
    font-family: 'Open Sans', sans-serif;
  }

  .center-container {
    display: flex;
    flex-direction: column;
    justify-content: center; 
    align-items: center;
    height: 55%; 
  }
  
  .title {
    font-size: 35px;
    color: #fff; 
  }
  
  .line {
    width: 70px; 
    height: 2px; 
    background-color: #333; 
    margin-top: 20px; 
    animation: pulse 1s infinite alternate; 
  }
  
  @keyframes pulse {
    0% {
      transform: scaleX(2);
    }
    100% {
      transform: scaleX(5.0); 
    }
  }

  .carrusel {
      display: flex;
      flex-wrap: nowrap;
      overflow: scroll;
      margin-top: 25px;
  }
  
  .carrusel::-webkit-scrollbar {
      display: none;
  }
  
  .element {
      flex: 1 0 auto;
      margin: 0 10px;
      width: 115px;
      height: 135px;
      border-radius: 10px;
      overflow: hidden;
      position: relative;
      display: inline-block;
      text-align: center;
  }
   .texto {
      color: white;
      position: absolute;
      top: 75%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: small;
      width: 80%;
   }
  .element > img {
      width: 100%;
      height: 80%;
  }


    .color__etiqueta {
        fill: green;
    }
  </style>