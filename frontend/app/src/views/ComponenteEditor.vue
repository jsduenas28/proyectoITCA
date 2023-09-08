<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button></ion-back-button>
                </ion-buttons>

                <ion-title>Editor</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content class="ion-padding">
            <EditorApuntes />
        </ion-content>
    </ion-page>
</template>

<script>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonBackButton, IonButtons } from '@ionic/vue'
import EditorApuntes from '../views/EditorApuntes.vue'

export default {
    name: 'EditorPage',
    components: {
        IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonBackButton, IonButtons, EditorApuntes
    }
}
</script>

<style>
    
</style>