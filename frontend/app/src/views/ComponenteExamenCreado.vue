<template>
    <ion-page>
        <div style="text-align: center;">
            <h1>Aqui va el titulo de la nota</h1>
        </div>
        <ion-content class="ion-padding">
            <ion-row>
                <ion-col><p>1. ¿Cuál es el principal concepto de la programación orientada a objetos (POO)?</p></ion-col>
            </ion-row>
            <ion-row>
                    <ion-radio-group allow-empty-selection="true" value="space-between">
                        <ion-item>
                            <ion-radio value="herencia" justify="space-between">Herencia</ion-radio> 
                        </ion-item>
                        <ion-item>
                            <ion-radio value="bucleFor">Bucle for</ion-radio>
                        </ion-item>
                        <ion-item>
                            <ion-radio value="encadenamiento">Encadenamiento</ion-radio>
                        </ion-item>
                        <ion-item>
                            <ion-radio value="variablesGlobales">Variables globales</ion-radio>
                        </ion-item>
                    </ion-radio-group>
            </ion-row>
        </ion-content>
    </ion-page>
</template>
<script>
import { IonPage, IonContent, IonRow, IonCol, IonRadio, IonRadioGroup } from "@ionic/vue";
export default {
    name: 'ComponenteExamenCreado',
    component: {
        IonPage, IonContent, IonRow, IonCol, IonRadio, IonRadioGroup
    }
}
</script>
<style lang="">
    
</style>