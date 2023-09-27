<template>
    <ion-page>
        <ion-header>
                <ion-toolbar>
                    <ion-buttons slot="start">
                        <ion-button @click="regresarVista" class="ion-margin-top" expand="full" style="color: #A2B2EE;">Cancelar</ion-button>
                    </ion-buttons>
                    <ion-title style="margin-left: 0px;">Examen</ion-title>
                    <ion-buttons slot="end">
                        <ion-button href="/examenCreado" class="ion-margin-top" expand="full" style="color: #A2B2EE;">Vamos</ion-button>
                    </ion-buttons>
                </ion-toolbar>
            </ion-header>

            <ion-content class="ion-padding">
                <div style="text-align: center;">
                    <h1>Elige la nota de la que quieres crear el Examen</h1>
                </div>

                <ion-select label="Elige la nota" labelPlacement="floating" fill="outline" shape="round" style="margin-top: 40px;">
                    <ion-select-option>Aqui se llamarán las notas que existan</ion-select-option>
                </ion-select>

            </ion-content>
    </ion-page>
</template>
<script>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonButton, IonContent, } from "@ionic/vue";
export default {
    name: 'ComponenteExamen',
    component: {
        IonPage, IonHeader, IonToolbar, IonTitle, IonButton, IonContent,
    }
}
</script>
<style lang="">
    
</style>