<template>
     <ion-page>
        
        <ion-content class="ion-padding">
            <ComponenteMenu></ComponenteMenu>
            
            <div style="margin-top: 50px;">
                <ion-row class="ion-paddings">
                    <ion-col size="7">
                        <div style="border-bottom: 5px solid #5f7abd;">
                            <h1>{{ mensajeSaludo }}</h1>
                        </div>
                    </ion-col>

                    <ion-col offset="1" size="4"> 
                        <div id="img-div">
                            <img src="../../public/favicon.png" alt="">
                        </div>
                    </ion-col>
                </ion-row>

                <ion-row style="margin-top: 25px;">
                    <ion-col>
                        <div id="btnContainer">
                            <ion-button router-link="/editor">
                                Nueva Nota
                            </ion-button>
                            <ion-button>
                                Generar Cuestionario
                            </ion-button>
                        </div>
                    </ion-col>
                </ion-row>

                <ion-row style="margin-top: 25px;">
                    <ion-col>
                        <div>
                            <h4>Aqui tienes tus 5 notas mas recientes</h4>
                        </div>
                    </ion-col>
                </ion-row>

                <ion-row >
                    <ion-col>
                        <div class="carrusel">
                            <div class="element">
                                <ion-card style="height: 180px; margin: 3px 3px 3px 3px;">
                                    <ion-card-header>
                                        <ion-card-title>Materia</ion-card-title>
                                        <ion-card-subtitle>Tema de estudio</ion-card-subtitle>
                                    </ion-card-header >           
                                    <ion-card-content>
                                        <p>Informacion ...</p>
                                    </ion-card-content>
                                </ion-card>
                            </div>
                            <div class="element">
                                <ion-card style="height: 180px; margin: 3px 3px 3px 3px;">
                                    <ion-card-header>
                                        <ion-card-title>Lenguajes de programación</ion-card-title>
                                        <ion-card-subtitle>Introducción a los lenguajes de programació </ion-card-subtitle>
                                    </ion-card-header >           
                                    <ion-card-content>
                                        <p>Python: uno de ... </p>
                                    </ion-card-content>
                                </ion-card>
                            </div>
                            <div class="element">
                                <ion-card style="height: 180px; margin: 3px 3px 3px 3px;">
                                    <ion-card-header>
                                        <ion-card-title>FPDS</ion-card-title>
                                        <ion-card-subtitle> Introducción a Vue</ion-card-subtitle>
                                    </ion-card-header >           
                                    <ion-card-content>
                                        <p>¿Qué es? Vue es un framework de JavaScript ... </p>
                                    </ion-card-content>
                                </ion-card>
                            </div>
                            <div class="element">
                                <ion-card style="height: 180px; margin: 3px 3px 3px 3px;">
                                    <ion-card-header>
                                        <ion-card-title>Introducción a la programación</ion-card-title>
                                        <ion-card-subtitle> Desarrollo web</ion-card-subtitle>
                                    </ion-card-header >           
                                    <ion-card-content>
                                        <p>Frontend, Backend y Full-stack  ... </p>
                                    </ion-card-content>
                                </ion-card>
                            </div>
                            <div class="element">
                                <ion-card style="height: 180px; margin: 3px 3px 3px 3px;">
                                    <ion-card-header>
                                        <ion-card-title>DAM</ion-card-title>
                                        <ion-card-subtitle>Creación de proyecto </ion-card-subtitle>
                                    </ion-card-header >           
                                    <ion-card-content>
                                        <p>Para un proyecto blank: Ejecutar el comando  ... </p>
                                    </ion-card-content>
                                </ion-card>
                            </div>
                        </div>
                    </ion-col>
                </ion-row>

                <ion-row style="margin-top: 45px;">
                    <ion-col>
                        <div>
                            <h4>Tus notas rapidas</h4>
                        </div>
                    </ion-col>
                </ion-row>
                <ion-row>
                    <ion-col>
                        <main >
                            
                                <ion-card style="height: 125px;">
                                    <ion-card-header>
                                        <ion-card-title>Tema Preferecia</ion-card-title>
                                    </ion-card-header >           
                                    <ion-card-content>
                                        <p>Informacion, bla, bla, bla  ... </p>
                                    </ion-card-content>
                                </ion-card>
                            
                                <ion-card style="height: 125px;">
                                    <ion-card-header>
                                        <ion-card-title>Tema Preferecia</ion-card-title>
                                    </ion-card-header >           
                                    <ion-card-content>
                                        <p>Informacion, bla, bla, bla  ... </p>
                                    </ion-card-content>
                                </ion-card>
                            
                                <ion-card style="height: 125px;">
                                    <ion-card-header>
                                        <ion-card-title>Tema Preferecia</ion-card-title>
                                    </ion-card-header >           
                                    <ion-card-content>
                                        <p>Informacion, bla, bla, bla  ... </p>
                                    </ion-card-content>
                                </ion-card>
                            
                                <ion-card style="height: 125px;">
                                    <ion-card-header>
                                        <ion-card-title>Tema Preferecia</ion-card-title>
                                    </ion-card-header >           
                                    <ion-card-content>
                                        <p>Informacion, bla, bla, bla  ... </p>
                                    </ion-card-content>
                                </ion-card>
                            
                                <ion-card style="height: 125px;">
                                    <ion-card-header>
                                        <ion-card-title>Tema Preferecia</ion-card-title>
                                    </ion-card-header >           
                                    <ion-card-content>
                                        <p>Informacion, bla, bla, bla  ... </p>
                                    </ion-card-content>
                                </ion-card>
                            
                                <ion-card style="height: 125px;">
                                    <ion-card-header>
                                        <ion-card-title>Tema Preferecia</ion-card-title>
                                    </ion-card-header >           
                                    <ion-card-content>
                                        <p>Informacion, bla, bla, bla  ... </p>
                                    </ion-card-content>
                                </ion-card>
                        </main>
                    </ion-col>
                </ion-row>
            </div>

        </ion-content>
        
        
    </ion-page>
</template>

<script>
import ComponenteMenu from "../views/ComponenteMenu.vue";
import { IonPage, IonContent, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonButton } from "@ionic/vue";
export default {
    name: 'ComponenteInicio',
    components: {
        ComponenteMenu, IonContent, IonPage, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonButton
    },
    data() {
    return {
      mensajeSaludo: '',
    };
  },
  mounted() {
    this.actualizarSaludo();
  },
  methods: {
    actualizarSaludo() {
      const horaActual = new Date().getHours();

      if (horaActual >= 5 && horaActual < 12) {
        this.mensajeSaludo = '¡Buenos días!';
      } else if (horaActual >= 12 && horaActual < 18) {
        this.mensajeSaludo = '¡Buenas tardes!';
      } else {
        this.mensajeSaludo = '¡Buenas noches!';
      }
    },
  },
};
</script>

<style scoped>
*{
    font-family: Arial, Helvetica, sans-serif;
}

.carrusel {
    display: flex;
    flex-wrap: nowrap;
    overflow: scroll;
}

.carrusel::-webkit-scrollbar {
    display: none;
}

.element {
    flex: 1 0 auto;
    margin: 0 10px;
    background-color: #5F7ABD;
    width: 190px;
    height: 190px;
    border: 1px white solid;
    border-radius: 10px;
    overflow: hidden;
}

.element:hover{
    transition: all 0.5s ease;
    transform:scale(0.9);
    box-shadow: 0 7px 16px #A2B2EE;
}


main {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    
}
@media(max-width:768px){
    main{
        grid-template-columns: repeat(2, 1fr);
    }
}

@media(max-width:480px){
    main{
        grid-template-columns: repeat(1, 1fr);
    }
}

#btnContainer {
    display: flex;
    justify-content: center;
    align-items: center;
}

#btnContainer ion-button {
    margin: 5px;
    color: black;
}
</style>