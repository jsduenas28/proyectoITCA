<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-button @click="regresarVista" class="ion-margin-top" expand="full" style="color: #A2B2EE;">Volver</ion-button>
                </ion-buttons>
                <ion-title>Estadisticas</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content class="ion-padding">
            <template v-if="cargando === true">
                <div class="contenedorSpinner">
                    <div class="spinner"></div>
                </div>
            </template>
            <template v-else>
                <template v-if="chartData.length === 0 || arrayCuestionarios.length === 0">
                    <div style="text-align: center;">
                        <svg width="140" height="124" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M104 320H72C67.5817 320 64 323.582 64 328V472C64 476.418 67.5817 480 72 480H104C108.418 480 112 476.418 112 472V328C112 323.582 108.418 320 104 320Z" stroke="#393939" stroke-width="32" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M328 224H296C291.582 224 288 227.582 288 232V472C288 476.418 291.582 480 296 480H328C332.418 480 336 476.418 336 472V232C336 227.582 332.418 224 328 224Z" stroke="#393939" stroke-width="32" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M440 112H408C403.582 112 400 115.582 400 120V472C400 476.418 403.582 480 408 480H440C444.418 480 448 476.418 448 472V120C448 115.582 444.418 112 440 112Z" stroke="#393939" stroke-width="32" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M216 32H184C179.582 32 176 35.5817 176 40V472C176 476.418 179.582 480 184 480H216C220.418 480 224 476.418 224 472V40C224 35.5817 220.418 32 216 32Z" stroke="#393939" stroke-width="32" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>

                        <h1 style="color: #9aa0a6;">No tienes estadisticas</h1>
                        <h3 style="color: #9aa0a6;">Contesta cuestionarios para ver algo acá</h3>
                    </div>
                </template>
                <template v-else>
                    <div style="text-align: center;">
                        <h3>Haz realizado {{ this.arrayCuestionarios.length }} cuestionarios</h3>
                    </div> <br><br>

                    <h4 style="text-align: center;">Resultados de tus cuestionarios</h4>
                    <Bar
                        :options="chartOptions"
                        :data="chartData"
                    />

                    <br><br>
                    <div style="text-align: center;">
                        <h3>Cuestionarios aprobados: {{ this.valorAprobado }}</h3>
                        <h3>Cuestionarios reprobados: {{ this.valorReprobado }}</h3>

                        <p>Los cuestionarios se aprueban con nota de 7 o más</p>
                    </div>
                </template>
            </template>
        </ion-content>
    </ion-page>
</template>

<script>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonButtons } from '@ionic/vue'

import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

import axios from '../api/api.js'
import { Drivers, Storage } from '@ionic/storage';
import CordovaSQLiteDriver from 'localforage-cordovasqlitedriver'

const store = new Storage({
  driverOrder: [CordovaSQLiteDriver._driver, Drivers.IndexedDB, Drivers.LocalStorage]
});

store.create()

export default {
    name: 'ComponenteEstadisticas',
    components: {
        IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonButtons, Bar
    },
    data() {
        return {
            etiqueta: ['Aprobado', 'Reprobado'],
            arrayCuestionarios: '',
            valorAprobado: 0,
            valorReprobado: 0,
            chartData: [],
            chartOptions: {
                responsive: true,
                plugins: {
                    legend: {
                    display: false
                    }
                }
            },
            cargando: false
        }
    },
    methods: {
        regresarVista() {
            this.$router.push({path: '/tusCuestionarios'})
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
                    const result = response.data
                    let aprodado = 0
                    let reprobado = 0
                    result.forEach(e => {
                        if(parseInt(e.nota_cuestionario) >= 7) {
                            aprodado += 1
                        } else {
                            reprobado += 1
                        }
                    });
                    this.valorAprobado = aprodado
                    this.valorReprobado = reprobado

                    this.chartData = {
                        labels: this.etiqueta,
                        datasets: [
                            {data: [this.valorAprobado, this.valorReprobado], backgroundColor: ['green', 'red']}
                        ]
                    }
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
    },
    async mounted() {
        this.getCuestionarios()
    },
}
</script>

<style scoped>
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