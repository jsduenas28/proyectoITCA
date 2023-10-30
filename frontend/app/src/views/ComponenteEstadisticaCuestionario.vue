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
            <template v-if="cargando === true">
                <div class="contenedorSpinner">
                    <div class="spinner"></div>
                </div>
            </template>
            <template v-else>
                <ion-list :inset="true" style="border-radius: 20px;">
                    <ion-item :button="true" style="bottom: -5px;">
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
                          <ion-item-option @click.stop="eliminarCuestionario(cuestionario.id)" style="height: 80%; margin-right: 20px; border-radius: 10px; background-color: red;">
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
import { trash } from 'ionicons/icons';
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
            trash,
            token: '',
            arrayCuestionarios: null,
            cargando: false
        }
    },
    methods: {
        regresarVista() {
            this.$router.push({path: '/tabs/inicio'})
        },
        irVerCuestionario(id) {
            this.$router.push({path: `/cuestionario/${id}`})
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
        async eliminarCuestionario(id) {
            try {
                await this.obtenerToken()
                this.cargando = true
                axios.delete(`http://127.0.0.1:8000/api/resEstadisticos/delete/${id}`, {
                    headers: {
                        'Authorization': 'Bearer ' + this.token
                    }
                })
                .then(response => {
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
</style>