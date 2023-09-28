<template>
    <ion-page>
        <ion-header>
                <ion-toolbar>
                    <ion-buttons slot="start">
                        <ion-button @click="regresarVista" class="ion-margin-top" expand="full" style="color: #A2B2EE;">Cancelar</ion-button>
                    </ion-buttons>
                    <ion-title style="margin-left: 0px;">Edita Carpeta</ion-title>
                    <ion-buttons slot="end">
                        <ion-button class="ion-margin-top" expand="full" style="color: #A2B2EE;">Editar</ion-button>
                    </ion-buttons>
                </ion-toolbar>
            </ion-header>

            <ion-content class="ion-padding">
                <ion-select label="Elige la carpeta" labelPlacement="floating" fill="outline" shape="round">
                    <ion-select-option>Aqui se llamarán las carpetas que existan</ion-select-option>
                </ion-select>

                <ion-input label="Nombre nuevo" labelPlacement="floating" fill="outline" shape="round" 
                    style="--highlight-color-focused: #A2B2EE; margin-top: 40px;"
                ></ion-input>

                <ion-select label="Elige el color de tu carpeta" labelPlacement="floating" fill="outline" shape="round" style="margin-top: 10px;">
                    <ion-select-option value="red">Rojo</ion-select-option>
                    <ion-select-option value="#3361FF">Azul</ion-select-option>
                    <ion-select-option value="green">Verde</ion-select-option>
                    <ion-select-option value="yellow">Amarillo</ion-select-option>
                    <ion-select-option value="#C733FF">Morado</ion-select-option>
                    <ion-select-option value="#33FFD1">Celeste</ion-select-option>
                    <ion-select-option value="#F50891 ">Rosa</ion-select-option>
                </ion-select>
            </ion-content>
    </ion-page>
</template>
<script>
import { IonPage, IonHeader, IonToolbar, IonButton, IonButtons, IonContent, IonSelect, IonSelectOption, IonInput } from "@ionic/vue";
export default {
    name: 'ComponenteEditarCarpeta',
    components: {
        IonPage, IonHeader, IonToolbar, IonButton, IonButtons, IonContent, IonSelect, IonSelectOption, IonInput
    },
    data(){
        return {

        };
    },
    methods: {
        regresarVista() {
        window.history.back();
      }
    }

}
</script>
<style>
    
</style>