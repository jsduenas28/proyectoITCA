<template>
    <ion-page>
        <ion-tabs>
            <ion-router-outlet></ion-router-outlet>
            <ion-tab-bar slot="bottom">
                <div id="tab-bar">
                    <button @click="() => {this.$router.push('/crearNotas')}"><ion-icon :icon="add" size="large" color="white"></ion-icon></button>
                    <button @click="() => {this.$router.push('/busqueda')}"><ion-icon :icon="searchOutline" size="large" color="white"></ion-icon></button>
                    <button @click="() => {this.$router.push('/crearExamen')}"><ion-icon :icon="readerOutline" size="large" color="white"></ion-icon></button>
                    <button @click="() => {this.$router.push('/usuario')}"><ion-icon :icon="personOutline" size="large" color="white"></ion-icon></button>
                </div>
            </ion-tab-bar>
        </ion-tabs>
    </ion-page>
</template>

<script>
import { IonPage, IonTabs, IonTabBar, IonTabButton, IonButton, IonLabel, IonRouterOutlet, IonIcon, } from '@ionic/vue'
import { add, arrowUp, readerOutline, personOutline, searchOutline } from "ionicons/icons";

export default {
    name: 'Tabs',
        components: {
        IonPage, IonTabs, IonTabBar, IonTabButton, IonLabel, IonButton, IonRouterOutlet, IonIcon,
    },
    data() {
        return {
            add, arrowUp, readerOutline, personOutline, searchOutline
        }
    }
}

</script>

<style>
    #tab-bar button{
        margin: 5px;
        padding: 0;
        background-color: transparent;
    }

    #tab-bar button:hover {
        background-color: rgba(0, 0, 0, 0.3);
    }

    #tab-bar button:active {
        background-color: rgba(0, 0, 0, 0.5);
    }
</style>