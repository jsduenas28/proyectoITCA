<template>
    <ion-page>
        <ion-header>
                <ion-toolbar>
                    <ion-buttons slot="start">
                        <ion-button @click="regresarVista" class="ion-margin-top" expand="full" style="color: #A2B2EE;">Cancelar</ion-button>
                    </ion-buttons>
                    <ion-title style="margin-left: 0px;">Nueva Nota</ion-title>
                    <ion-buttons slot="end">
                        <ion-button href="/editor" class="ion-margin-top" expand="full" style="color: #A2B2EE;">Crear</ion-button>
                    </ion-buttons>
                </ion-toolbar>
            </ion-header>

      <ion-content class="ion-padding">
        <div style="text-align: center;">
          <h1>Elige la carpeta donde guardarás tu nota</h1>
        </div>
         
          <ion-select v-model="carpetaSeleccionada" placeholder="Selecciona una carpeta" 
          ok-text="Elige el carpeta" label="Elige tu carpeta" labelPlacement="floating" fill="outline" shape="round" style="margin-top: 25px; margin-bottom: 25px; --highlight-color-focused: #A2B2EE;">
            <ion-select-option v-for="(carpeta, index) in carpetas" :key="index" :value="carpeta.nombre">
              {{ carpeta.nombre }}
            </ion-select-option>
          </ion-select>
        
  
        
      </ion-content>
    </ion-page>
  </template>
  
  <script>
  import { IonPage, IonHeader, IonToolbar, IonTitle, IonButton, IonContent, IonInput, IonSelect, IonSelectOption } from "@ionic/vue";
  export default {
    name: 'ComponenteNotas',
    components: {
        IonPage, IonHeader, IonToolbar, IonTitle, IonButton, IonContent, IonInput, IonSelect, IonSelectOption
    },
    data() {
      return {
        nombreElemento: '',
        carpetaSeleccionada: '', 
      };
    },
    props: {
      carpetas: Array, /*Lista de carpetas desde ComponenteArchivo*/
    },
    methods: {
      regresarVista() {
        window.history.back();
      },

      agregarElemento() {
        // Valida que se haya ingresado un nombre y seleccionado una carpeta
        if (this.nombreElemento && this.carpetaSeleccionada) {
          // Crea un objeto con la información del elemento
          const nuevoElemento = {
            nombre: this.nombreElemento,
            carpeta: this.carpetaSeleccionada,
          };
  
          // emitir al nuevo archivo
          this.$emit('agregar-elemento', nuevoElemento);
  
          // Limpiar campos
          this.nombreElemento = '';
          this.carpetaSeleccionada = '';
        } else {
          alert('Por favor, complete los campos requeridos.');
        }
      },
    },
  };
  </script>
  
  <style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@1,300&display=swap');

* {
  font-family: 'Open Sans', sans-serif;
}
  </style>
  