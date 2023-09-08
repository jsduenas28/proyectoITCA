<template>
    <ion-menu content-id="main-content">
      <ion-content >
        <div class="menu-header-bg"></div>
        <div class="header-content">
            <img src="../../public/favicon.png" alt="" id="img">
            <ion-label style="margin-left: 5px;">
                <h2 style="font-weight: 300;">Nombre Apellido</h2>
                <p style="font-size: 15px; color: #e4e4e4; font-weight: 100; letter-spacing: 0.4px;">Tus notas, tu aprendizaje</p>
            </ion-label>
        </div>
        <div class="cerrar">
            <ion-button class="botonC" href="/home">Cerrar Sesion
            </ion-button>
        </div>

        <ion-list class="menu-items" lines="none">
            <ion-item class="activated">
                <ion-icon :icon="logoIonic" color="primary"></ion-icon> Notas Rapidas
            </ion-item>
            <ion-item>
                <ion-icon ></ion-icon> Cuadernos
            </ion-item>
            <ion-item>
                <ion-icon></ion-icon> Crear Examenes
            </ion-item>
            <ion-item>
                <ion-icon></ion-icon> Descargar Apuntes
            </ion-item>

            <ion-item id="ultimo">
                <ion-icon></ion-icon> Algo
            </ion-item>
        </ion-list>
      </ion-content>
    </ion-menu>

    <ion-page id="main-content" class="contenedor">
      <ion-header class="ion-no-border">
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-menu-button></ion-menu-button>
          </ion-buttons>
          <ion-title>Menu</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-content class="ion-padding"> 
      </ion-content>
    </ion-page>
  </template>
  
  <script>
    import { IonButtons, IonContent, IonHeader, IonMenu, IonMenuButton, IonPage, IonTitle, IonToolbar, IonLabel, IonIcon, IonList, IonItem, IonRow, IonCol } from '@ionic/vue';
    import { defineComponent } from 'vue';
    import { logoIonic } from 'ionicons/icons';

  
    export default{
        name: 'ComponenteMenu',
      components: {
        IonButtons,
        IonContent,
        IonHeader,
        IonMenu,
        IonMenuButton,
        IonPage,
        IonTitle,
        IonToolbar,
        IonLabel, 
        IonIcon, 
        IonList,
        IonItem, 
        IonRow, 
        IonCol,
    }
    };
  </script>
  
<style>
* {
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}



.menu-header-bg {
    height: 240px;
    width:  380px;
    background-color: #5F7ADB;
    background: linear-gradient(90deg #5F7ADB 0%, #2e54db 100%);
    box-shadow: 0px 1px 10px rgb(98, 140, 255, 0.5);
    transform: rotate(-15deg);
    border-radius: 10px 10px 10px 50px;
    margin-left: -18px;
    margin-top: -50px;
    margin-bottom: 60px;

}

.header-content {
    position: absolute;
    top: 50px;
    left: 15px;
    display: flex;
    align-items: center;
}

#img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    border: 7px solid #2e54db;
}

.cerrar {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
}

.menu-items {
    margin: 0px;
}

ion-icon {
    margin: 20px;
    color: #5F7ADB;
}

ion-item {
    padding-left: 20px;
    margin-bottom: 10px;
}

.activated {
    border-left: 5px solid;
    color: #5F7ADB;
    padding-left: 15px;
    background-color: #5F7ADB;
}

#ultimo {
    margin-top: 30px;
}

ion-menu::part(::container) {
  width: 100%;
}

#img-div {
  display: flex;
  justify-content: end;
}

.botonC{
    margin-top: 25px;
    width: 70%;
    height: 50px;
    font-size: 15px;
    font-weight: 500;
    border: none;
    color: #0e0d0d;

}

ion-button {
  --background: #A2B2EE;
  --border-color: #fff;
  --box-shadow: 0px 4px 20px rgba(62, 9, 9, 0.145);
}
</style>