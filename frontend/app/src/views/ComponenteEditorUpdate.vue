<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-button @click="regresarVista" class="ion-margin-top" expand="full" style="color: #A2B2EE;">Cancelar</ion-button>
                </ion-buttons>

                <ion-title>Editor</ion-title>

                <ion-buttons slot="end">
                    <ion-button @click="updateNota">Guardar Nota</ion-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>

        <ion-content class="ion-padding">
            <input type="text" v-model="title" id="title-input" placeholder="¿Cual es el titulo?" > <br><br>

            <textarea id="editor__content" v-model="texto" :rows="numeroDeFilas" @input="ajustarAltura" placeholder="Escribe aquí..."></textarea>
        </ion-content>
    </ion-page>
</template>

<script>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonBackButton, IonButtons, IonButton } from '@ionic/vue'

import axios from '../api/api.js'
import { Drivers, Storage } from '@ionic/storage';
import CordovaSQLiteDriver from 'localforage-cordovasqlitedriver'
const store = new Storage({
  driverOrder: [CordovaSQLiteDriver._driver, Drivers.IndexedDB, Drivers.LocalStorage]
});

store.create()

export default {
    name: 'EditorPageUpdate',
    data() {
        return {
            title: '',
            texto: '',
            carpeta: '',
            numeroDeFilas: 1,
            token: '',
            arrayNota: []
        }
    },
    components: {
        IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonBackButton, IonButtons, IonButton
    },
    methods: {
        regresarVista() {
            window.history.back();
        },
        ajustarAltura() {
            // Dividir el texto en líneas y contar cuántas líneas hay
            const lineas = this.texto.split('\n').length;
            // Establecer el número de filas en función de las líneas
            this.numeroDeFilas = lineas;
        },
        async updateNota() {
            await this.obtenerToken()
            const nota = this.$route.params.nota
            const data = {
                titulo_nota: this.title,
                contenido_nota: this.texto,
                carpeta: this.carpeta
            }

            axios.put(`/api/nota/update/${nota}`, JSON.stringify(data), {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + this.token
                }
            })
            .then(response => {
                console.log(response.data);
                this.$router.push({path: '/tabs/archivo'}).then(() => {
                    window.location.reload()
                })
            })
            .catch(error => console.error(error))
        },
        async getNota() {
            await this.obtenerToken()
            const nota = this.$route.params.nota

            axios.get(`/api/nota/edit/${nota}`, {
                headers: {
                    'Authorization': 'Bearer ' + this.token
                }
            })
            .then(response => {
                this.arrayNota = response.data
                this.llenarCampos()
            })
            .catch(error => console.error(error))
        },
        async obtenerToken() {
            try {
                this.token = await store.get('accessToken');
            } catch (error) {
                console.error("Error al obtener el token:", error);
                throw error; // Manejo de errores, si es necesario
            }
        },
        llenarCampos() {
            this.title = this.arrayNota[0]['titulo_nota']
            this.texto = this.arrayNota[0]['contenido_nota']
            this.carpeta = this.arrayNota[0]['carpeta']
        }
    },
    mounted() {
        this.getNota()
    },
    
}
</script>

<style scoped>
    #title-input {
    width: 100%;
    font-size: 36px;
    background: none;
    outline: none;
    border: none;
  }

  #editor__content {
    width: 100%;
    background: none; 
    border-color: transparent;
  }

  #editor__content:focus {
    outline: none;
  }
</style>