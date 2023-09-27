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
                  <div class="element">
                    <svg width="70%" height="75%" viewBox="0 0 80 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="&#240;&#159;&#166;&#134; icon &#34;folder outline&#34;">
                        <g id="Group">
                        <path class="color__etiqueta" d="M5 5H28V20H5V5Z" fill="white"/>
                        <path class="color__etiqueta" d="M28 9H75V20H28V9Z" fill="white"/>
                        <path id="Vector" d="M69.9921 60.7971H9.56786C7.82595 60.7971 6.15539 60.1052 4.92368 58.8735C3.69197 57.6418 3 55.9712 3 54.2293V9.56786C3 7.82595 3.69197 6.15539 4.92368 4.92368C6.15539 3.69197 7.82595 3 9.56786 3H22.0287C23.3255 3.00003 24.5933 3.38396 25.6722 4.1034L30.2435 7.15089C31.3224 7.87032 32.5902 8.25425 33.887 8.25429H69.9921C71.734 8.25429 73.4046 8.94625 74.6363 10.178C75.868 11.4097 76.56 13.0802 76.56 14.8221V54.2293C76.56 55.9712 75.868 57.6418 74.6363 58.8735C73.4046 60.1052 71.734 60.7971 69.9921 60.7971Z" stroke="white" stroke-width="3.25429" stroke-linecap="round" stroke-linejoin="round"/>
                        <path id="Vector_2" d="M3 21.39H76.56" stroke="white" stroke-width="3.25429" stroke-linecap="round" stroke-linejoin="round"/>
                        </g>
                        </g>
                    </svg> 
                      <p class="texto">Ciencias</p>
                  </div>
                  <div class="element">
                      <img src="../../public/folder.svg" alt="">
                      <h4 class="texto">Matematias</h4>
                  </div>
                  <div class="element">
                      <img src="../../public/folder.svg" alt="">
                      <h4 class="texto">DAM</h4>
                  </div>
                  <div class="element">
                      <img src="../../public/folder.svg" alt="">
                      <p class="texto">Metodologias agiles</p>
                  </div>
                  <div class="element">
                      <img src="../../public/folder.svg" alt="">
                      <h4 class="texto">Lenguaje</h4>
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
      IonPage, IonContent, IonFab, IonFabButton, IonFabList, IonRow, IonCol, ComponenteMenu
    },
    data(){
        return {
            briefcaseSharp,
            addOutline, add, documentTextOutline,
            mensajeSaludo: '',
            token: ''
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
            console.log(response.data)
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