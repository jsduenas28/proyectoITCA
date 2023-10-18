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
            <h1>Carpeta actualizada con éxito</h1>
          </div>
        </template>

        <template v-if="showCarpetaCreada === true">
          <div class="alertCarpetaCreate">
            <ion-icon :icon="informationOutline" size="large" color="white"></ion-icon>
            <h1>Carpeta creada con éxito</h1>
          </div>
        </template>

        <template v-if="showNotaActualizada === true">
          <div class="alertNotaUpdate">
            <ion-icon :icon="informationOutline" size="large" color="white"></ion-icon>
            <h1>Nota actualizada con éxito</h1>
          </div>
        </template>

        <template v-if="showNotaCreada === true">
          <div class="alertNotaCreada">
            <ion-icon :icon="informationOutline" size="large" color="white"></ion-icon>
            <h1>Nota creada con éxito</h1>
          </div>
        </template>

        <template v-if="mostrarAlertSuccess === true">
          <div class="alertSuccess">
            <ion-icon :icon="checkmark" size="large" color="white"></ion-icon>
            <h1>Acción completada con éxito</h1>
          </div>
        </template>

        <template v-if="mostrarAlertElimina === true">
          <div class="alertEliminar">
            <div>
              <h1>¿Seguro que quieres eliminar la {{ item }}?</h1>
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
              <ion-list-header>
                <CarpetaList :name="carpeta.nombre_carpeta" :color="carpeta.color_carpeta" :toggleListName="i" :idCarpeta="carpeta.id" :metodoToggleList="toggleList" />
                <ion-buttons style="margin-right: 10px;">
                    <ion-button @click="setOpen(true, carpeta.id)" shape="round"><ion-icon :icon="ellipsisHorizontalOutline" color="white"></ion-icon></ion-button>
                </ion-buttons>
              </ion-list-header>
              <ion-item-group v-if="activeList === i">
                  <ion-item @click="editar(notas.id)" v-for="(notas, j) in carpeta.notas" :key="j">
                      <ion-label>{{ notas.titulo_nota }}</ion-label>
                      <button @click.stop="alertEliminarNota(notas.id)" class="trashNote"><ion-icon :icon="trashOutline" color="danger" size="small"></ion-icon></button>
                    </ion-item>
              </ion-item-group>
          </ion-list>
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
  import { IonPage, IonContent, IonFab, IonFabButton, IonButton, IonButtons, IonFabList, IonGrid, IonRow, IonCol, IonActionSheet } from "@ionic/vue";
  import CarpetaList from '../views/CarpetaList.vue'
  import { briefcaseSharp, addOutline, add, documentTextOutline, ellipsisHorizontalOutline, trashOutline, pencilOutline, checkmark, close, informationOutline } from 'ionicons/icons';
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
      IonPage, IonContent, IonFab, IonFabButton, IonFabList, IonButton, IonButtons, IonGrid, IonRow, IonCol, IonActionSheet, ComponenteMenu, CarpetaList
    },
    data(){
        return {
            item: '',
            cargando: false,
            isOpen: false,
            briefcaseSharp,
            addOutline, add, documentTextOutline, ellipsisHorizontalOutline, trashOutline, pencilOutline, checkmark, close, informationOutline,
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
              icon: trashOutline,
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
  @import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@1,300&display=swap');

  * {
    font-family: 'Open Sans', sans-serif;
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

  .alertEliminar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    background-color: red;
    border-radius: 10px;
    padding: 5px;
    text-align: center;
  }
  
  .alertSuccess{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    background-color: green;
    border-radius: 10px;
    padding: 5px;
    text-align: center;
  }

  .alertNotaCreada {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    background-color: rgb(75, 74, 74);
    border-radius: 10px;
    padding: 5px;
    text-align: center;
  }

  .alertNotaUpdate {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    background-color: rgb(75, 74, 74);
    border-radius: 10px;
    padding: 5px;
    text-align: center;
  }

  .alertCarpetaCreate {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    background-color: rgb(75, 74, 74);
    border-radius: 10px;
    padding: 5px;
    text-align: center;
  }

  .alertCarpetaUpdate {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    background-color: rgb(75, 74, 74);
    border-radius: 10px;
    padding: 5px;
    text-align: center;
  }

  .btnAlert button{
    margin: 5px;
    border-radius: 10px;
  }
  </style>