<template>
    <ion-page>
      <ion-content class="ion-padding">
        <div class="center-container">
          <h1 class="title"><strong>{{ mensajeSaludo }}</strong></h1>
          <div class="line"></div>
        </div>  

        <ion-list :inset="true" style="border-radius: 20px;">
          <ion-list-header>
            <ion-label style="font-size: 20px;">Tus Carpetas</ion-label>
            <ion-buttons style="margin-right: 10px;">
              <ion-button @click="irNuevaCarpeta" fill="clear" shape="round"><ion-icon :icon="add"></ion-icon></ion-button>
            </ion-buttons>
          </ion-list-header>
        </ion-list>

        <ion-list :inset="true" style="border-radius: 20px;" v-for="(carpeta, i) in arrayCarpetas" :key="i">
            <ion-list-header>
              <CarpetaList :name="carpeta.nombre_carpeta" :color="carpeta.color_carpeta" :toggleListName="i" :idCarpeta="carpeta.id" :metodoToggleList="toggleList" />
              <ion-buttons style="margin-right: 10px;">
                  <ion-button @click="setOpen(true, carpeta.id)" shape="round"><ion-icon :icon="ellipsisHorizontalOutline"></ion-icon></ion-button>
              </ion-buttons>
            </ion-list-header>
            <ion-item-group v-if="activeList === i">
                <ion-item @click="editar(notas.id)" v-for="(notas, j) in carpeta.notas" :key="j">
                    <ion-label>{{ notas.titulo_nota }}</ion-label>
                </ion-item>
            </ion-item-group>
          </ion-list>

          <ion-action-sheet
            :is-open="isOpen"
            header="Opciones"
            :buttons="actionSheetButtons"
            @didDismiss="setOpen(false)"
          ></ion-action-sheet>
      </ion-content>
    </ion-page>
  </template>
  <script>
  import { IonPage, IonContent, IonFab, IonFabButton, IonButton, IonButtons, IonFabList, IonGrid, IonRow, IonCol, IonActionSheet } from "@ionic/vue";
  import CarpetaList from '../views/CarpetaList.vue'
  import { briefcaseSharp, addOutline, add, documentTextOutline, ellipsisHorizontalOutline, trashOutline, pencilOutline } from 'ionicons/icons';
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
            isOpen: false,
            briefcaseSharp,
            addOutline, add, documentTextOutline, ellipsisHorizontalOutline, trashOutline, pencilOutline,
            mensajeSaludo: '',
            activeList: null,
            arrayCarpetas: [],
            cargando: true,
            arrayNotas: [],
            token: '',
            idCarpeta: null,
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
                this.elimiarCarpeta()
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
      this.actualizarSaludo();
      this.getCarpetas()
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
      irEditarCarpeta() {
        this.$router.push({path: `/editarCarpeta/${this.idCarpeta}`})
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
        irNuevaCarpeta() {
          this.$router.push({path: '/nuevaCarpeta'})
        },
        setOpen(bool, id) {
          this.isOpen = bool
          this.idCarpeta = id
        },
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

  .editButton {
    color: green !important;
  }

  .deleteButton {
    color: red !important;
  }
  </style>