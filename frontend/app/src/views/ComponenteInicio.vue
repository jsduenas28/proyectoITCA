<template>
    <ion-page>
      <ion-content class="ion-padding">
        <div class="center-container">
          <h1 class="title"><strong>{{ mensajeSaludo }}</strong></h1>
          <div class="line"></div>
        </div>

        <template v-if="showCarpetaActualizada === true">
          <div class="alertCarpetaUpdate">
            <ion-icon :icon="informationOutline" size="large" color="white"></ion-icon>
            <h3>Carpeta actualizada con éxito</h3>
          </div>
        </template>

        <template v-if="showCarpetaCreada === true">
          <div class="alertCarpetaCreate">
            <ion-icon :icon="informationOutline" size="large" color="white"></ion-icon>
            <h3>Carpeta creada con éxito</h3>
          </div>
        </template>

        <template v-if="showNotaActualizada === true">
          <div class="alertNotaUpdate">
            <ion-icon :icon="informationOutline" size="large" color="white"></ion-icon>
            <h3>Nota actualizada con éxito</h3>
          </div>
        </template>

        <template v-if="showNotaCreada === true">
          <div class="alertNotaCreada">
            <ion-icon :icon="informationOutline" size="large" color="white"></ion-icon>
            <h3>Nota creada con éxito</h3>
          </div>
        </template>

        <template v-if="mostrarAlertSuccess === true">
          <div class="alertSuccess">
            <ion-icon :icon="checkmark" size="large" color="white"></ion-icon>
            <h3>Acción completada con éxito</h3>
          </div>
        </template>

        <template v-if="mostrarAlertElimina === true">
          <div class="fondoAlert" @click="() => {
                  this.mostrarAlertElimina = false
                  this.idCarpeta = null
                  this.idNota = null
                }">
            <div class="alertEliminar" @click.stop>
              <div>
                <h3>¿Seguro que quieres eliminar la {{ item }}?</h3>
              </div>
  
              <div class="btnAlert">
                <button v-if="item === 'carpeta'" @click="elimiarCarpeta" style="background-color: green;"><ion-icon :icon="checkmark" size="small" color="white"></ion-icon></button>
                <button v-else-if="item === 'nota'" @click="eliminarNota" style="background-color: green;"><ion-icon :icon="checkmark" size="small" color="white"></ion-icon></button>
                <button @click="() => {
                  this.mostrarAlertElimina = false
                  this.idCarpeta = null
                  this.idNota = null
                }" style="background-color: rgb(54, 54, 54);"><ion-icon :icon="close" size="small" color="white"></ion-icon></button>
              </div>
            </div>
          </div>
        </template>

        <ion-list :inset="true" style="border-radius: 20px;">
          <ion-list-header>
            <ion-label style="font-size: 20px;">Tus Carpetas</ion-label>
            <ion-buttons style="margin-right: 10px;">
              <ion-button @click="irNuevaCarpeta" fill="clear" shape="round"><ion-icon :icon="add" size="large" color="white"></ion-icon></ion-button>
            </ion-buttons>
          </ion-list-header>
        </ion-list>

        <template v-if="cargando">
            <div class="contenedorSpinner">
              <div class="spinner"></div>
            </div>
        </template>
        <template v-else>
          <ion-list :inset="true" style="border-radius: 20px;" v-for="(carpeta, i) in arrayCarpetas" :key="i">
              <ion-list-header :button="true">
                <CarpetaList :name="carpeta.nombre_carpeta" :color="carpeta.color_carpeta" :toggleListName="i" :idCarpeta="carpeta.id" :metodoToggleList="toggleList" />
                <ion-buttons style="margin-right: 10px;">
                    <ion-button @click="setOpen(true, carpeta.id)" shape="round"><ion-icon :icon="ellipsisHorizontalOutline" color="white"></ion-icon></ion-button>
                </ion-buttons>
              </ion-list-header>
              <ion-item-group v-if="activeList === i">
                <ion-item-sliding v-for="(notas, j) in carpeta.notas" :key="j">
                  <ion-item :button="true" @click="editar(notas.id)">
                      <ion-icon :icon="documentTextOutline" size="large" color="white"></ion-icon>
                      <ion-label>{{ notas.titulo_nota }}</ion-label>
                    </ion-item>
                    <ion-item-options slot="end">
                      <ion-item-option @click.stop="alertEliminarNota(notas.id)" style="height: 85%; margin-right: 20px; border-radius: 10px; background-color: red;">
                        <ion-icon size="large" :icon="trash" color="white"></ion-icon>
                      </ion-item-option>
                    </ion-item-options>
                </ion-item-sliding>
              </ion-item-group>
          </ion-list>

          <div v-if="arrayCarpetas.length === 0" style="text-align: center;">
            <svg width="140" height="124" viewBox="0 0 80 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g id="ð¦ icon &quot;folder outline&quot;">
              <g id="Group">
              <path id="Vector" d="M69.9921 60.7971H9.56786C7.82595 60.7971 6.15539 60.1052 4.92368 58.8735C3.69197 57.6418 3 55.9712 3 54.2293V9.56786C3 7.82595 3.69197 6.15539 4.92368 4.92368C6.15539 3.69197 7.82595 3 9.56786 3H22.0287C23.3255 3.00003 24.5933 3.38396 25.6722 4.1034L30.2435 7.15089C31.3224 7.87032 32.5902 8.25425 33.887 8.25429H69.9921C71.734 8.25429 73.4046 8.94625 74.6363 10.178C75.868 11.4097 76.56 13.0802 76.56 14.8221V54.2293C76.56 55.9712 75.868 57.6418 74.6363 58.8735C73.4046 60.1052 71.734 60.7971 69.9921 60.7971Z" stroke="#393939" stroke-width="5.25429" stroke-linecap="round" stroke-linejoin="round"/>
              <path id="Vector_2" d="M3 21.39H76.56" stroke="#393939" stroke-width="5.25429" stroke-linecap="round" stroke-linejoin="round"/>
              </g>
              </g>
            </svg>

            <h1 style="color: #9aa0a6;">Parece que no tienes carpetas</h1>
            <h3 style="color: #9aa0a6;">Crea una y comienza a escribir tus apuntes</h3>
          </div>
        </template>


          <ion-action-sheet
            :is-open="isOpen"
            header="Opciones"
            :buttons="actionSheetButtons"
            @didDismiss="setOpen(false, this.idCarpeta)"
          ></ion-action-sheet>
      </ion-content>
    </ion-page>
  </template>
  <script>
  import { IonPage, IonContent, IonFab, IonFabButton, IonButton, IonButtons, IonFabList, IonGrid, IonRow, IonCol, IonActionSheet, IonItemSliding, IonItemOption, IonItemOptions } from "@ionic/vue";
  import CarpetaList from '../views/CarpetaList.vue'
  import { briefcaseSharp, addOutline, add, documentTextOutline, ellipsisHorizontalOutline, trash, pencilOutline, checkmark, close, informationOutline } from 'ionicons/icons';
  import  ComponenteMenu  from '../views/ComponenteMenu.vue'
  import axios from '../api/api.js'
  import { Drivers, Storage } from '@ionic/storage';

  import CordovaSQLiteDriver from 'localforage-cordovasqlitedriver'

  const store = new Storage({
    driverOrder: [CordovaSQLiteDriver._driver, Drivers.IndexedDB, Drivers.LocalStorage]
  });

  store.create()

  export default {
    name: 'ComponenteInicio',
    components: {
      IonPage, IonContent, IonFab, IonFabButton, IonFabList, IonButton, IonButtons, IonGrid, IonRow, IonCol, IonActionSheet, IonItemSliding, IonItemOption, IonItemOptions, ComponenteMenu, CarpetaList
    },
    data(){
        return {
            item: '',
            cargando: false,
            isOpen: false,
            briefcaseSharp,
            addOutline, add, documentTextOutline, ellipsisHorizontalOutline, trash, pencilOutline, checkmark, close, informationOutline,
            mensajeSaludo: '',
            activeList: null,
            arrayCarpetas: [],
            cargando: true,
            arrayNotas: [],
            token: '',
            idCarpeta: null,
            idNota: null,
            mostrarAlertElimina: false,
            mostrarAlertSuccess: false,
            showNotaCreada: false,
            showNotaActualizada: false,
            showCarpetaCreada: false,
            showCarpetaActualizada: false,
            actionSheetButtons: [
            {
              text: 'Modificar',
              cssClass: 'editButton',
              icon: pencilOutline,
              role: 'destructive',
              data: {
                action: 'update',
              },
              handler: () => {
                this.irEditarCarpeta()
              }
            },
            {
              text: 'Eliminar',
              cssClass: 'deleteButton',
              icon: trash,
              role: 'destructive',
              data: {
                action: 'delete',
              },
              handler: () => {
                this.alertEliminar()
              }
            },
            {
              text: 'Cancelar',
              role: 'cancel',
              data: {
                action: 'cancel',
              },
            },
            ]
        }
    },
    beforeUpdate() {
      this.validarLogin()
      this.actualizarSaludo();
      this.getCarpetas()
    },
    mounted() {
      this.validarLogin()
      this.actualizarSaludo();
      this.getCarpetas()
    },
    created() {
      if(this.$route.query.showNotaCreate === 'true') {
        this.alertNotaCreada()
      }
      
      if(this.$route.query.showNotaUpdate === 'true') {
        this.alertNotaUpdate()
      }

      if(this.$route.query.showCarpetaCreate === 'true') {
        this.alertCarpetaCreate()
      }

      if(this.$route.query.showCarpetaUpdate === 'true') {
        this.alertCarpetaUpdate()
      }
    },
    methods: {
      async validarLogin() {
        const token = await store.get('accessToken');

        try {
          axios.get('/api/auth/validarToken', {
              headers: {
                  'Authorization': 'Bearer ' + token
              }
          })
          .then(response => {
          })
          .catch(error => this.$router.push({path: '/', query: {showValidacion: 'true'}}))
        } catch (error) {
          console.log(error)
        }
      },
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
      alertCarpetaCreate() {
        this.showCarpetaCreada = true

        setTimeout(() => {
          this.showCarpetaCreada = false
        }, 3000);
      },
      alertCarpetaUpdate() {
        this.showCarpetaActualizada = true

        setTimeout(() => {
          this.showCarpetaActualizada = false
        }, 3000);
      },
      alertNotaUpdate() {
        this.showNotaActualizada = true

        setTimeout(() => {
          this.showNotaActualizada = false
        }, 3000);
      },
      alertNotaCreada() {
        this.showNotaCreada = true

        setTimeout(() => {
          this.showNotaCreada = false
        }, 3000);
      },
      alertEliminarNota(i) {
        this.item = 'nota'
        this.mostrarAlertElimina = true
        this.idNota = i
      },
      irEditarCarpeta() {
        this.$router.push({path: `/editarCarpeta/${this.idCarpeta}`})
        this.idCarpeta = null
      },
      alertEliminar() {
        this.item = 'carpeta'
        this.mostrarAlertElimina = true
      },
      async eliminarNota() {
        try {
          await this.obtenerToken()

          axios.delete(`/api/nota/delete/${this.idNota}`, {
            headers: {
              'Authorization': 'Bearer ' + this.token
            }
          })
          .then(response => {
            this.getCarpetas()
            this.mostrarAlertElimina = false
            this.idNota = null
            this.alertSuccess()
          })
          .catch(error => console.error(error))
        } catch (error) {
          console.error(error)
        }
      },
      async elimiarCarpeta() {
        try {
          await this.obtenerToken()

          axios.delete(`/api/carpeta/delete/${this.idCarpeta}`, {
            headers: {
              'Authorization': 'Bearer ' + this.token
            }
          })
          .then(response => {
            this.getCarpetas()
            this.mostrarAlertElimina = false
            this.idCarpeta = null
            this.alertSuccess()
          })
          .catch(error => console.error(error))
        } catch (error) {
          console.error(error)
        }
      },
      editar(id) {
            this.$router.push({path: `/editorUpdate/${id}`})
        },
        toggleList(listName) {
          this.activeList = this.activeList === listName ? null : listName;
        },
        async getCarpetas() {
            try {
                await this.obtenerToken()

                this.cargando = true
                axios.get('/api/carpeta/carpetaNota', {
                    headers: {
                        'Authorization': 'Bearer ' + this.token
                    }
                })
                .then(response => {
                    this.arrayCarpetas = response.data
                })
                .catch(error => console.error(error))
                .then(() => this.cargando = false)
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
        irNuevaCarpeta() {
          this.$router.push({path: '/nuevaCarpeta'})
        },
        setOpen(bool, id) {
          this.isOpen = bool
          this.idCarpeta = id
        },
        alertSuccess() {
          this.mostrarAlertSuccess = true

          setTimeout(() => {
            this.mostrarAlertSuccess = false
          }, 3000);
        }
    }
  }
  </script>

  <style >
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500&display=swap');
  *{
      font-family: 'Poppins',sans-serif;
    }

  .center-container {
    display: flex;
    flex-direction: column;
    justify-content: center; 
    align-items: center;
    height: 30%; 
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

  .editButton {
    color: green !important;
  }

  .deleteButton {
    color: red !important;
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

  .trashNote {
    background-color: transparent;
    border-radius: 5px;
  }

  .trashNote:hover {
    background-color: rgba(0, 0, 0, 0.3);
  }

  .fondoAlert {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.5);
    z-index: 1000;
  }

  .alertEliminar {
    display: block;
    width: 60%;
    background-color: red;
    border-radius: 10px;
    padding: 5px;
    text-align: center;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1001;
  }

  .alertEliminar h3 {
    margin-left: 10px;
  }

  @media screen and (max-width: 600px) {
    .alertEliminar {
      display: block;
      width: 95%;
      background-color: red;
      border-radius: 10px;
      padding: 5px;
      text-align: center;
    }
  }
  
  .alertSuccess{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 60%;
    background-color: green;
    border-radius: 10px;
    padding: 5px;
    text-align: center;
    position: fixed;
    top: 90%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1001;
  }

  @media screen and (max-width: 600px) {
    .alertSuccess {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      width: 95%;
      background-color: green;
      border-radius: 10px;
      padding: 5px;
      text-align: center;
    }
  }

  .alertNotaCreada {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 60%;
    background-color: rgb(75, 74, 74);
    border-radius: 10px;
    padding: 5px;
    text-align: center;
    position: fixed;
    top: 90%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1001;
  }

  @media screen and (max-width: 600px) {
    .alertNotaCreada {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      width: 95%;
      background-color: rgb(75, 74, 74);
      border-radius: 10px;
      padding: 5px;
      text-align: center;
    }
  }

  .alertNotaUpdate {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 60%;
    background-color: rgb(75, 74, 74);
    border-radius: 10px;
    padding: 5px;
    text-align: center;
    position: fixed;
    top: 90%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1001;
  }

  @media screen and (max-width: 600px) {
    .alertNotaUpdate {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      width: 95%;
      background-color: rgb(75, 74, 74);
      border-radius: 10px;
      padding: 5px;
      text-align: center;
    }
  }

  .alertCarpetaCreate {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 60%;
    background-color: rgb(75, 74, 74);
    border-radius: 10px;
    padding: 5px;
    text-align: center;
    position: fixed;
    top: 90%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1001;
  }

  @media screen and (max-width: 600px) {
    .alertCarpetaCreate {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      width: 95%;
      background-color: rgb(75, 74, 74);
      border-radius: 10px;
      padding: 5px;
      text-align: center;
    }
  }

  .alertCarpetaUpdate {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 60%;
    background-color: rgb(75, 74, 74);
    border-radius: 10px;
    padding: 5px;
    text-align: center;
    position: fixed;
    top: 90%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1001;
  }

  @media screen and (max-width: 600px) {
    .alertCarpetaUpdate {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      width: 95%;
      background-color: rgb(75, 74, 74);
      border-radius: 10px;
      padding: 5px;
      text-align: center;
    }
  }

  .btnAlert button{
    margin: 5px;
    border-radius: 10px;
  }
  </style>