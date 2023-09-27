<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button></ion-back-button>
                </ion-buttons>
                <ion-title>Archivos</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content class="ion-padding">
            <div id="content">
                <ion-label style="font-size: 25px; text-align: center  ;"><strong>Aqui tienes tus carpetas y notas</strong></ion-label>
                <div class="line"></div>
            </div>
            
        <div style="display: flex; justify-content: center; align-items: center; margin-top: 10px;">
            <ion-button @click="abrirModalCarpeta" >Agregar Carpeta</ion-button>    
        </div>

        <!--Carpetas que se van generando-->
            <ion-list :inset="true" style="border-radius: 20px;" v-for="(carpeta, index) in carpetas" :key="index">
                <ion-item>
                    <ion-list-header>
                        <div style="margin-right: 10px; align-items: center;">
                            <svg width="45" height="45" viewBox="0 0 80 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g id="&#240;&#159;&#166;&#134; icon &#34;folder outline&#34;">
                                <g id="Group">
                                    <path d="M5 5H28V20H5V5Z" :fill="carpeta.color"/>
                                    <path d="M28 9H75V20H28V9Z" :fill="carpeta.color"/>
                                    <path id="Vector" d="M69.9921 60.7971H9.56786C7.82595 60.7971 6.15539 60.1052 4.92368 58.8735C3.69197 57.6418 3 55.9712 3 54.2293V9.56786C3 7.82595 3.69197 6.15539 4.92368 4.92368C6.15539 3.69197 7.82595 3 9.56786 3H22.0287C23.3255 3.00003 24.5933 3.38396 25.6722 4.1034L30.2435 7.15089C31.3224 7.87032 32.5902 8.25425 33.887 8.25429H69.9921C71.734 8.25429 73.4046 8.94625 74.6363 10.178C75.868 11.4097 76.56 13.0802 76.56 14.8221V54.2293C76.56 55.9712 75.868 57.6418 74.6363 58.8735C73.4046 60.1052 71.734 60.7971 69.9921 60.7971Z" stroke="white" stroke-width="3.25429" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path id="Vector_2" d="M3 21.39H76.56" stroke="white" stroke-width="3.25429" stroke-linecap="round" stroke-linejoin="round"/>
                                </g>
                                </g>
                            </svg> 
                        </div>
                        <ion-label><strong style="font-size: small;">{{ carpeta.nombre }}</strong></ion-label>
                        <!--Boton de agregar nota-->
                        <ion-button @click="abrirModalAgregarElemento(index)" size="small" fill="clear" slot="end">
                            Nota
                        </ion-button>
                        <!--Boton de eliminar-->
                        <ion-button @click="eliminarCarpeta(index)" size="small" fill="clear" slot="end">
                            Eliminar
                        </ion-button>
                    </ion-list-header>
                    <!--Itera para ver los elementos que se agregan-->
                    <ion-item v-for="(elemento, i) in carpeta.elementos" :key="i" >
                        {{ elemento }}
                    </ion-item>
                </ion-item>
            </ion-list>
            
        </ion-content>
        
        <!--Este es el modal para agregar carpeta-->
        <ion-modal :is-open="modalCarpetaAbierto" >
            <ion-header>
                <ion-toolbar>
                    <ion-buttons slot="start">
                        <ion-button @click="cerrarModalCarpeta" class="ion-margin-top" expand="full" style="color: #A2B2EE;">Cancelar</ion-button>
                    </ion-buttons>
                    <ion-title style="margin-left: 40px;">Nueva</ion-title>
                    <ion-buttons slot="end">
                        <ion-button @click="agregarCarpeta" class="ion-margin-top" expand="full" style="color: #A2B2EE;">Agregar</ion-button>
                    </ion-buttons>
                </ion-toolbar>
            </ion-header>
            <ion-content class="ion-padding">
                <ion-row>
                    <ion-col>
                        <ion-label position="stacked">Nombra de carpeta</ion-label>
                        <ion-input v-model="nuevaCarpeta.nombre" placeholder="Elige el nombre de tu carpeta" :counter="true" maxlength="10"></ion-input>
                    </ion-col>
                </ion-row>
                
                <ion-row style="margin-top: 10px; margin-bottom: 10px;">
                    <ion-col>
                        <ion-label position="stacked">Color</ion-label>
                        <ion-select v-model="nuevaCarpeta.color" placeholder="Selecciona un color" ok-text="Elige el color" label="Elige el color de tu carpeta">
                            <ion-select-option value="red">Rojo</ion-select-option>
                            <ion-select-option value="#3361FF">Azul</ion-select-option>
                            <ion-select-option value="green">Verde</ion-select-option>
                            <ion-select-option value="yellow">Amarillo</ion-select-option>
                            <ion-select-option value="#C733FF">Morado</ion-select-option>
                            <ion-select-option value="#33FFD1">Celeste</ion-select-option>
                            <ion-select-option value="#F50891 ">Rosa</ion-select-option>
                        </ion-select>
                    </ion-col>
                </ion-row>    
            </ion-content>
        </ion-modal>

        
    </ion-page>
</template>
<script>
import { IonPage, IonContent, IonHeader, IonToolbar, IonButton, IonBackButton, IonTitle, IonList, IonListHeader, IonLabel, IonModal, IonSelect, IonSelectOption, IonInput } from "@ionic/vue";
export default {
    name: 'ComponenteArchivo',
    components: {
        IonPage, IonContent, IonHeader, IonToolbar, IonButton, IonBackButton, IonTitle, IonList, IonListHeader, IonLabel, IonModal, IonSelect, IonSelectOption, IonInput
    },
    data(){
        return {
            carpetas: [],
            desplegar: [],
            modalCarpetaAbierto: false,
            nuevaCarpeta:{
                nombre: '',
                color: '',
            }, 
            carpetas: [],
            //modalElementoAbierto: false,
            
        };
    },
    methods: {
        abrirModalCarpeta() {
            this.modalCarpetaAbierto = true;
        },
        cerrarModalCarpeta(){
            this.modalCarpetaAbierto = false; 
        },
        agregarCarpeta() {
         if (this.nuevaCarpeta.nombre && this.nuevaCarpeta.color){
            const nuevaCarpeta = {
                nombre: this.nuevaCarpeta.nombre,
                color: this.nuevaCarpeta.color,
                elementos: [],
            };
            this.carpetas.push(nuevaCarpeta);//agrega a la lista de carpetas
            this.nuevaCarpeta.nombre = ''; // para limpiar
            this.nuevaCarpeta.color = '';
            this.cerrarModalCarpeta();
         } else {
            alert('Faltan datos por ingresar');
         }
        }
    } 
};

</script>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@1,300&display=swap');

* {
  font-family: 'Open Sans', sans-serif;
}

#content {
    display: flex;
    flex-direction: column;
    justify-content: center; 
    align-items: center;
    height: 15%; 
}

</style>