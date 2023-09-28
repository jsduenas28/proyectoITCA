<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button></ion-back-button>
                </ion-buttons>

                <ion-title>Editor</ion-title>

                <ion-buttons slot="end">
                    <ion-button @click="prueba2">Guardar Nota</ion-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>

        <ion-content class="ion-padding">
            <EditorApuntes :funcion="prueba" />
        </ion-content>
    </ion-page>
</template>

<script>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonBackButton, IonButtons, IonButton } from '@ionic/vue'
import EditorApuntes from '../views/EditorApuntes.vue'

export default {
    name: 'EditorPage',
    data() {
        return {
            title: '',
            texto: ''
        }
    },
    components: {
        IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonBackButton, IonButtons, EditorApuntes, IonButton
    },
    methods: {
        prueba(title, texto) {
            this.title = title
            this.texto = texto
        },
        prueba2() {
            alert(this.title + ' ' + this.texto)
            console.log(this.texto);
        }
    }
}
</script>

<style>
    
</style>