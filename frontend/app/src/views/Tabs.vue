<template>
    <ion-page>
        <ion-tabs>
            <ion-fab slot="fixed" vertical="bottom" horizontal="center">
                <ion-fab-button>
                    <ion-icon :icon="arrowUp" color="ligth"></ion-icon>
                </ion-fab-button>
                <ion-fab-list side="top">
                <ion-fab-button href="/crearNotas">
                    <p style="font-size: small; color: aliceblue;">Nota</p>
                </ion-fab-button>
                <ion-fab-button href="/crearExamen">
                    <p style="font-size: small; color: aliceblue;">Exam</p>
                </ion-fab-button>
                </ion-fab-list>
            </ion-fab>
            <ion-router-outlet></ion-router-outlet>
            <ion-tab-bar slot="bottom">         
            </ion-tab-bar>
        </ion-tabs>
    </ion-page>
</template>

<script>
import { IonPage, IonTabs, IonTabBar, IonTabButton, IonLabel, IonRouterOutlet, IonIcon, } from '@ionic/vue'
import { add, arrowUp } from "ionicons/icons";

export default {
    name: 'Tabs',
        components: {
        IonPage, IonTabs, IonTabBar, IonTabButton, IonLabel, IonRouterOutlet, IonIcon,
    },
    data() {
        return {
            add, arrowUp
        }
    }
}

</script>

<style>
    ion-fab-button {
        --border-radius: 15px;
    }
</style>