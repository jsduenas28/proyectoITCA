<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-button @click="regresarVista" class="ion-margin-top" expand="full" style="color: #A2B2EE;">Volver</ion-button>
                </ion-buttons>
                <ion-title>Usuario</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content class="ion-padding">
            <template v-if="mostrarAlertConfirmacion === true">
                <div class="alert">
                    <div>
                        <h3>¿Seguro que quieres cerrar sesión?</h3>
                    </div>
                    <div class="btnDiv">
                        <button @click="logout" style="background-color: green;"><ion-icon :icon="checkmark" color="white" size="small"></ion-icon></button>
                        <button style="background-color: rgb(54, 54, 54);" @click="() => {this.mostrarAlertConfirmacion = false}"><ion-icon :icon="close" color="white" size="small"></ion-icon></button>
                    </div>
                </div>
            </template>

            <template v-if="usuario === null">
                <div class="contenedorSpinner">
                    <div class="spinner"></div>
                </div>
            </template>
            <template v-else>
                <ion-list :inset="true" style="border-radius: 20px;">
                    <ion-list-header>
                        <ion-label style="font-size: 18px;">Usuario</ion-label>
                        <div style="margin-right: 40px;">
                            <p>{{ usuario.name }}</p>
                        </div>
                    </ion-list-header>
                </ion-list>
                <ion-list :inset="true" style="border-radius: 20px;">
                    <ion-list-header>
                        <ion-label style="font-size: 18px;">Email</ion-label>
                        <div style="margin-right: 40px;">
                            <p>{{ usuario.email }}</p>
                        </div>
                    </ion-list-header>
                </ion-list>
                <ion-list :inset="true" style="border-radius: 20px;">
                    <div class="divLogout">
                        <button @click="irVistaTusCuestionarios" id="resCuestionarioBtn">Ver tus cuestionarios</button>
                    </div>
                </ion-list>
                <ion-list :inset="true" style="border-radius: 20px;">
                    <div class="divLogout">
                        <button @click="alertLogout" id="logoutBtn">Cerrar Sesión</button>
                    </div>
                </ion-list>
            </template>
        </ion-content>
    </ion-page>
</template>

<script>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton, IonList, IonListHeader, IonLabel, IonIcon } from '@ionic/vue';

import { checkmark, close, } from 'ionicons/icons';

import axios from '../api/api.js'
import { Drivers, Storage } from '@ionic/storage';
import CordovaSQLiteDriver from 'localforage-cordovasqlitedriver'

const store = new Storage({
  driverOrder: [CordovaSQLiteDriver._driver, Drivers.IndexedDB, Drivers.LocalStorage]
});

store.create()

export default {
    name: 'ComponenteUsuario',
    data() {
        return {
            checkmark, close,
            token: '',
            usuario: null,
            mostrarAlertConfirmacion: false
        }
    },
    components: {
        IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton, IonList, IonListHeader, IonLabel, IonIcon
    },
    methods: {
        regresarVista() {
            this.$router.push({path: '/tabs/inicio'})
        },
        irVistaTusCuestionarios() {
            this.$router.push({path: '/tusCuestionarios'})
        },
        async getUsuario() {
            try {
                await this.obtenerToken()

                axios.get('/api/user/index', {
                    headers: {
                        'Authorization': 'Bearer ' + this.token
                    }
                })
                .then(response => {
                    this.usuario = response.data.data
                })
                .catch(error => console.error(error))
            } catch (error) {
                console.error(error);
            }
        },
        alertLogout() {
            this.mostrarAlertConfirmacion = true
        },
        async logout() {
            try {
                await this.obtenerToken()

                axios.get('/api/auth/logout', {
                    headers: {
                        'Authorization': 'Bearer ' + this.token
                    }
                })
                .then(response => {
                    this.$router.push({path: '/', query: {showLogout: 'true'}})
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
        this.getUsuario()
    }
}
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

  #logoutBtn {
    padding: 15px;
    border-radius: 10px;
    background-color: red;
    font-size: 17px;
  }

  #resCuestionarioBtn{
    padding: 15px;
    border-radius: 10px;
    background-color: green;
    font-size: 17px;
  }
  
  .alert {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    background-color: red;
    border-radius: 10px;
    padding: 5px;
    text-align: center;
  }

  @media screen and (max-width: 600px) {
    .alert {
      display: block;
      width: 100%;
      background-color: red;
      border-radius: 10px;
      padding: 5px;
      text-align: center;
    }
  }

  .alert h3 {
    margin-left: 20px;
  }

  .btnDiv button{
    margin: 5px;
    border-radius: 10px;
  }

  .divLogout {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>