<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-button @click="regresarVista" class="ion-margin-top" expand="full" style="color: #A2B2EE;">Volver</ion-button>
                </ion-buttons>
                <ion-title>Tus Cuestionarios</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content class="ion-padding">
            <template v-if="mostrarAlertSuccess === true">
                <div class="alertSuccess">
                    <ion-icon :icon="checkmark" size="large" color="white"></ion-icon>
                    <h3>Acción completada con éxito</h3>
                </div>
            </template>

            <template v-if="mostrarAlertElimina === true">
                <div class="fondoAlert" @click="() => {
                                this.mostrarAlertElimina = false
                                this.idNota = null
                            }">
                    <div class="alertEliminar" @click.stop>
                        <div>
                            <h3>¿Seguro que quieres eliminar el cuestionario?</h3>
                        </div>
    
                        <div class="btnAlert">
                            <button @click="eliminarCuestionario" style="background-color: green;"><ion-icon :icon="checkmark" size="small" color="white"></ion-icon></button>
                            <button @click="() => {
                                this.mostrarAlertElimina = false
                                this.idCuestionario = null
                            }" style="background-color: rgb(54, 54, 54);"><ion-icon :icon="close" size="small" color="white"></ion-icon></button>
                        </div>
                    </div>
                </div>
            </template>

            <template v-if="cargando === true">
                <div class="contenedorSpinner">
                    <div class="spinner"></div>
                </div>
            </template>
            <template v-else>
                <ion-list :inset="true" style="border-radius: 20px;">
                    <ion-item :button="true" style="bottom: -5px;" @click="irEstadisticas">
                        <h3>Tus Estadisticas</h3>
                    </ion-item>
                </ion-list> <br>
                <h3 style="text-align: center;">Tus Cuestionarios</h3>
                <br>
                <div v-if="arrayCuestionarios === null || arrayCuestionarios.length === 0" style="text-align: center;">
                    <svg width="140" height="124" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M368 48H144C117.49 48 96 69.4903 96 96V416C96 442.51 117.49 464 144 464H368C394.51 464 416 442.51 416 416V96C416 69.4903 394.51 48 368 48Z" stroke="#393939" stroke-width="32" stroke-linejoin="round"/>
                        <path d="M176 128H336M176 208H336M176 288H256" stroke="#393939" stroke-width="32" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
    
                    <h1 style="color: #9aa0a6;">Parece que no tienes cuestionarios</h1>
                    <h3 style="color: #9aa0a6;">Genera cuestionarios con tus apuntes</h3>
                </div>
                <ion-list :inset="true" style="border-radius: 10px;" v-for="(cuestionario, i) in arrayCuestionarios" :key="i">
                    <ion-item-sliding style="bottom: -5px;">
                        <ion-item :button="true" @click="irVerCuestionario(cuestionario.id)">
                            <h3>{{ cuestionario.titulo_nota }}</h3>
                        </ion-item>
                        <ion-item-options slot="end">
                          <ion-item-option @click.stop="alertEliminarNota(cuestionario.id)" style="height: 80%; margin-right: 20px; border-radius: 10px; background-color: red;">
                            <ion-icon size="large" :icon="trash" color="white"></ion-icon>
                          </ion-item-option>
                        </ion-item-options>
                    </ion-item-sliding>
                </ion-list>
            </template>
        </ion-content>
    </ion-page>
</template>

<script>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonButtons, IonList, IonListHeader, IonLabel, IonItem, IonItemSliding, IonItemOptions, IonItemOption, IonIcon } from '@ionic/vue'
import { trash, checkmark, close } from 'ionicons/icons';

import axios from '../api/api.js'
import { Drivers, Storage } from '@ionic/storage';
import CordovaSQLiteDriver from 'localforage-cordovasqlitedriver'

const store = new Storage({
  driverOrder: [CordovaSQLiteDriver._driver, Drivers.IndexedDB, Drivers.LocalStorage]
});

store.create()

export default {
    name: 'ComponenteEstadisticaCuestionario',
    components: {
        IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonButtons, IonList, IonListHeader, IonLabel, IonItem, IonItemSliding, IonItemOptions, IonItemOption, IonIcon
    },
    data() {
        return {
            trash, checkmark, close,
            token: '',
            arrayCuestionarios: null,
            cargando: false,
            mostrarAlertElimina: false,
            idCuestionario: null,
            mostrarAlertSuccess: false
        }
    },
    methods: {
        regresarVista() {
            this.$router.push({path: '/tabs/inicio'})
        },
        irVerCuestionario(id) {
            this.$router.push({path: `/cuestionario/${id}`})
        },
        irEstadisticas() {
            this.$router.push({path: '/estadisticas'})
        },
        async getCuestionarios() {
            try {
                await this.obtenerToken()
                this.cargando = true
                axios.get('/api/resEstadisticos/index', {
                    headers: {
                        'Authorization': 'Bearer ' + this.token
                    }
                })
                .then(response => {
                    this.arrayCuestionarios = response.data
                })
                .catch(error => console.error(error))
                .then(() => this.cargando = false)
            } catch (error) {
                console.error(error);
            }
        },
        alertEliminarNota(i) {
            this.mostrarAlertElimina = true
            this.idCuestionario = i
        },
        alertSuccess() {
          this.mostrarAlertSuccess = true

          setTimeout(() => {
            this.mostrarAlertSuccess = false
          }, 3000);
        },
        async eliminarCuestionario() {
            try {
                await this.obtenerToken()
                this.cargando = true
                axios.delete(`/api/resEstadisticos/delete/${this.idCuestionario}`, {
                    headers: {
                        'Authorization': 'Bearer ' + this.token
                    }
                })
                .then(response => {
                    this.mostrarAlertElimina = false
                    this.idCuestionario = null
                    this.alertSuccess()
                    this.getCuestionarios()
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
        this.getCuestionarios()
    },
}
</script>

<style scoped>
    .verCuestionarioBtn {
        padding: 15px;
        border-radius: 10px;
        background-color: green;
        font-size: 17px;
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
</style>