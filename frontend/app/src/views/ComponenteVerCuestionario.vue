<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-button @click="regresarVista" class="ion-margin-top" expand="full" style="color: #A2B2EE;">Volver</ion-button>
                </ion-buttons>
                <ion-title>Tu Cuestionario</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content class="ion-padding">
            <template v-if="spinner === true">
                <div class="contenedorSpinner">
                    <div class="spinner"></div>
                </div>
            </template>
            <template v-else>
                <ion-list :inset="true" style="border-radius: 20px;">
                    <div class="card">
                        <h2 v-if="cuestionario !== null">Cuestionario: {{ cuestionario[0].titulo_nota }}</h2>
    
                        <h3>Tu calificación:</h3>
                        <h3 v-if="cuestionario !== null">{{ cuestionario[0].nota_cuestionario }}/{{ resultado.length }}</h3>
                    </div>        
                </ion-list>
                <ion-list :inset="true" style="border-radius: 20px;" v-for="(res, i) in resultado" :key="i">
                    <div class="card">
                        <h1>{{ res.pregunta }}</h1>
                        <h3>Respuesta correcta:</h3>
                        <h3 class="resCorrecta">{{ res.res_correcta }}</h3>
                        <h3>Tu respuesta:</h3>
                        <h3 v-if="res.res_select === res.res_correcta" class="resCorrecta">{{ res.res_select }}</h3>
                        <h3 v-else class="resIncorrecta">{{ res.res_select }}</h3>
                    </div>        
                </ion-list>
            </template>
        </ion-content>
    </ion-page>
</template>

<script>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonButtons, IonList, IonListHeader, IonLabel } from '@ionic/vue'

import axios from '../api/api.js'
import { Drivers, Storage } from '@ionic/storage';
import CordovaSQLiteDriver from 'localforage-cordovasqlitedriver'

const store = new Storage({
  driverOrder: [CordovaSQLiteDriver._driver, Drivers.IndexedDB, Drivers.LocalStorage]
});

store.create()

export default {
    name: 'ComponenteVerCuestionario',
    components: {
        IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonButtons, IonList, IonListHeader, IonLabel
    },
    data() {
        return {
            cuestionario: null,
            resultado: null,
            spinner: false
        }
    },
    methods: {
        regresarVista() {
            this.$router.push({path: '/tusCuestionarios'})
        },
        async getCuestionario() {
            try {
                this.spinner = true
                await this.obtenerToken()

                var idCuestionario = this.$route.params.id

                axios.get(`/api/resEstadisticos/cuestionario/${idCuestionario}`, {
                    headers: {
                        'Authorization': 'Bearer ' + this.token
                    }
                })
                .then(response => {
                    this.cuestionario = response.data
                    this.resultado = this.cuestionario[0].resultados
                })
                .catch(error => console.error(error))
                .then(() => this.spinner = false)
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
        this.getCuestionario()
    },
}
</script>

<style scoped>
    .card {
        text-align: center;
        padding: 10px;
    }

    .resCorrecta {
        padding: 10px;
        background-color: green;
        border-radius: 10px;
    }

    .resIncorrecta {
        padding: 10px;
        background-color: red;
        border-radius: 10px;
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