<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-button @click="regresarVista" class="ion-margin-top" expand="full" style="color: #A2B2EE;">Cancelar</ion-button>
                </ion-buttons>
                <ion-title>Busqueda</ion-title>
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
                            <h3>¿Seguro que quieres eliminar la nota?</h3>
                        </div>
    
                        <div class="btnAlert">
                            <button @click="eliminarNota" style="background-color: green;"><ion-icon :icon="checkmark" size="small" color="white"></ion-icon></button>
                            <button @click="() => {
                                this.mostrarAlertElimina = false
                                this.idNota = null
                            }" style="background-color: rgb(54, 54, 54);"><ion-icon :icon="close" size="small" color="white"></ion-icon></button>
                        </div>
                    </div>
                </div>
            </template>
            
            <br>
            <span>Selecciona la forma en la que quieres buscar</span>
            <ion-select v-model="modoBusqueda" label="Opciones de busqueda" labelPlacement="floating" fill="outline" interface="action-sheet" style="margin-top: 10px;">
                <ion-select-option value=1>Por carpeta</ion-select-option>
                <ion-select-option value=2>Por titulo</ion-select-option>
                <ion-select-option value=3>Por fecha</ion-select-option>
            </ion-select>

            <div style="padding-bottom: 40px;">
                <template v-if="modoBusqueda == 1">
                    <br>
                    <ion-select @ionChange="capturarIndexCarpeta($event)" v-model="idCarpeta" label="Selecciona una carpeta" labelPlacement="floating" fill="outline" interface="action-sheet" style="margin-top: 10px;">
                        <ion-select-option v-for="(carpeta, i) in arrayCarpetas" :key="i" :value="carpeta.id">{{ carpeta.nombre_carpeta }}</ion-select-option>
                    </ion-select>
                </template>
                <template v-else-if="modoBusqueda == 2">
                    <div style="margin-top: 40px;">
                        <span>Si el input esta vacio, se mostraran todas las notas</span>
                        <ion-input v-model="textoBusqueda" placeholder="Busca por titulo" fill="outline" :clear-on-edit="true"
                        ></ion-input>
                    </div>
                </template>
                <template v-else-if="modoBusqueda == 3">
                    <ion-input v-model="busquedaFecha" placeholder="Agrega una fecha" type="date" fill="outline"
                        style="--highlight-color-focused: #A2B2EE; margin-top: 40px;"
                    ></ion-input>
                </template>
            </div>

            <div class="contenido">
                <template v-if="spinner === true">
                    <div class="contenedorSpinner">
                        <div class="spinner"></div>
                    </div>
                </template>

                <template v-else>
                    <div v-if="notas === null" style="text-align: center; padding: 30px; color: #9aa0a6;">
                        <svg width="140" height="124" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M416 221.25V416C416 428.73 410.943 440.939 401.941 449.941C392.939 458.943 380.73 464 368 464H144C131.27 464 119.061 458.943 110.059 449.941C101.057 440.939 96 428.73 96 416V96C96 83.2696 101.057 71.0606 110.059 62.0589C119.061 53.0571 131.27 48 144 48H242.75C251.234 48.0013 259.37 51.3716 265.37 57.37L406.63 198.63C412.628 204.63 415.999 212.766 416 221.25Z" stroke="#393939" stroke-width="32" stroke-linejoin="round"/>
                            <path d="M256 56V176C256 184.487 259.371 192.626 265.373 198.627C271.374 204.629 279.513 208 288 208H408" stroke="#393939" stroke-width="32" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M147.998 286.654H364.056" stroke="#393939" stroke-width="32" stroke-linecap="round"/>
                            <path d="M148 363H364.058" stroke="#393939" stroke-width="32" stroke-linecap="round"/>
                        </svg>

                        <h1>Sus apuntes se mostraran aquí</h1>
                    </div>

                    <div v-else>
                        <p v-if="busquedaFecha.length > 0">Fecha seleccionada: {{ busquedaFecha }}</p>
                        <p v-if="indexCarpeta !== null">Carpeta seleccionada: {{ indexCarpeta.nombre_carpeta }}</p>
                        <p v-if="textoBusqueda === ''">Se estan mostrando todas las notas guardadas</p>

                        <div v-if="notas.length === 0" style="text-align: center;">
                            <svg width="140" height="124" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M416 221.25V416C416 428.73 410.943 440.939 401.941 449.941C392.939 458.943 380.73 464 368 464H144C131.27 464 119.061 458.943 110.059 449.941C101.057 440.939 96 428.73 96 416V96C96 83.2696 101.057 71.0606 110.059 62.0589C119.061 53.0571 131.27 48 144 48H242.75C251.234 48.0013 259.37 51.3716 265.37 57.37L406.63 198.63C412.628 204.63 415.999 212.766 416 221.25Z" stroke="#393939" stroke-width="32" stroke-linejoin="round"/>
                                <path d="M256 56V176C256 184.487 259.371 192.626 265.373 198.627C271.374 204.629 279.513 208 288 208H408" stroke="#393939" stroke-width="32" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M308.288 265L203 386.818" stroke="#393939" stroke-width="32" stroke-linecap="round"/>
                                <path d="M203 265L307.745 387.285" stroke="#393939" stroke-width="32" stroke-linecap="round"/>
                            </svg>

                            <h1 style="color: #9aa0a6;">No se encontro ninguna nota</h1>
                            <h3 style="color: #9aa0a6;">Intenta buscar de otra manera</h3>
                        </div>

                        <ion-list v-else style="border-radius: 20px; margin-top: 20px;" :inser="true">
                            <ion-item-sliding v-for="(nota, i) in notas" :key="i">
                                <ion-item :button="true" @click="editar(nota.id)">
                                    <ion-icon :icon="documentTextOutline" size="large" color="white"></ion-icon>
                                    <ion-label>{{ nota.titulo_nota }}</ion-label>
                                </ion-item>
                                <ion-item-options slot="end">
                                    <ion-item-option @click="irCuestionario(nota.id)" style="height: 80%; margin-right: 10px; border-radius: 10px; background-color: rgb(0, 119, 255);">
                                        <ion-icon size="large" :icon="readerOutline" color="white"></ion-icon>
                                    </ion-item-option>
                                    <ion-item-option @click="alertEliminarNota(nota.id)" style="height: 80%; margin-right: 20px; border-radius: 10px; background-color: red;">
                                        <ion-icon size="large" :icon="trash" color="white"></ion-icon>
                                    </ion-item-option>
                                </ion-item-options>
                            </ion-item-sliding>
                        </ion-list>
                    </div>
                </template>
            </div>
        </ion-content>
    </ion-page>
</template>

<script>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonButtons, IonInput, IonSelect, IonItem, IonItemSliding, IonItemOption, IonItemOptions, IonSelectOption, IonList, IonLabel, IonIcon } from '@ionic/vue'
import { documentTextOutline, trash, checkmark, close, readerOutline } from 'ionicons/icons';

import axios from '../api/api.js'
import { Drivers, Storage } from '@ionic/storage';
import CordovaSQLiteDriver from 'localforage-cordovasqlitedriver'
const store = new Storage({
  driverOrder: [CordovaSQLiteDriver._driver, Drivers.IndexedDB, Drivers.LocalStorage]
});

store.create()

export default {
    name: 'ComponenteBusqueda',
    components: {
        IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonButtons, IonInput, IonSelect, IonItem, IonItemSliding, IonItemOption, IonItemOptions, IonSelectOption, IonList, IonLabel, IonIcon
    },
    data() {
        return {
            documentTextOutline, trash, checkmark, close, readerOutline,
            spinner: false,
            modoBusqueda: 0,
            busquedaFecha: '',
            textoBusqueda: null,
            arrayCarpetas: [],
            idCarpeta: null,
            notas: null,
            mostrarAlertElimina: false,
            idNota: null,
            indexCarpeta: null,
            mostrarAlertSuccess: false
        }
    },
    methods: {
        regresarVista() {
            this.$router.push('/tabs/inicio')
        },
        irCuestionario(id) {
            this.$router.push({path: `/examenCreado/${id}`})
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
            } catch (error) {
                console.error(error);
            }
        },
        async obtenerNotas() {
            if(this.modoBusqueda == 1) {
                try {
                    this.spinner = true
                    await this.obtenerToken()
                    this.cargando = true
                    
                    axios.get(`/api/busquedaCarpeta/${this.idCarpeta}`, {
                        headers: {
                            'Authorization': 'Bearer ' + this.token
                        }
                    })
                    .then(response => {
                        this.notas = null
                        this.notas = response.data
                    })
                    .catch(error => console.error(error))
                    .then(() => this.spinner = false)
                } catch (error) {
                    console.error(error);
                }
            }
            else if(this.modoBusqueda == 2) {
                try {
                    this.spinner = true
                    await this.obtenerToken()
                    this.cargando = true
                    
                    axios.post(`/api/busquedaPalabraClave`, {
                        palabra: this.textoBusqueda
                    }, {
                        headers: {
                            'Authorization': 'Bearer ' + this.token
                        }
                    })
                    .then(response => {
                        this.notas = null
                        this.notas = response.data
                    })
                    .catch(error => console.error(error))
                    .then(() => this.spinner = false)
                } catch (error) {
                    console.error(error);
                }
            } else if(this.modoBusqueda == 3) {
                try {
                    this.spinner = true
                    await this.obtenerToken()
                    this.cargando = true
                    
                    axios.post(`/api/busquedaFecha`, {
                        fecha: this.busquedaFecha
                    }, {
                        headers: {
                            'Authorization': 'Bearer ' + this.token
                        }
                    })
                    .then(response => {
                        this.notas = null
                        this.notas = response.data
                    })
                    .catch(error => console.error(error))
                    .then(() => this.spinner = false)
                } catch (error) {
                    console.error(error);
                }
            }
        },
        alertSuccess() {
          this.mostrarAlertSuccess = true

          setTimeout(() => {
            this.mostrarAlertSuccess = false
          }, 3000);
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
                    this.obtenerNotas()
                    this.mostrarAlertElimina = false
                    this.idNota = null
                    this.alertSuccess()
                })
                .catch(error => console.error(error))
            } catch (error) {
                console.error(error)
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
        editar(id) {
            this.$router.push({path: `/editorUpdate/${id}`})
        },
        alertEliminarNota(i) {
            this.mostrarAlertElimina = true
            this.idNota = i
        },
        capturarIndexCarpeta(event) {
            this.indexCarpeta = this.arrayCarpetas.find(carpeta => carpeta.id == event.target.value)
        }
    },
    mounted() {
        this.getCarpetas()
    },
    watch: {
        idCarpeta(newVal, oldVal) {
            this.textoBusqueda = null
            this.busquedaFecha = ''
            this.obtenerNotas()
        },

        textoBusqueda(newVal, oldVal) {
            this.idCarpeta = null
            this.busquedaFecha = ''
            this.indexCarpeta = null
            this.obtenerNotas()
        },

        busquedaFecha(newVal, oldVal) {
            this.textoBusqueda = null
            this.idCarpeta = null
            this.indexCarpeta = null
            this.obtenerNotas()
        }
    }
}
</script>

<style scoped>
    .contenedorSpinner{
        display: flex;
        justify-content: center;
        align-items: center;
        height: 20vh; /* Ajusta esto según tus necesidades */
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