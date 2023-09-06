<template>
  <ion-page>

    <ion-content class="ion-padding" :fullscreen="true">
      
      <div class="container">
        <div class="box">
            <!------------------ Inicio de sesion --------------------->
            <div class="box-login" id="login">
                <div class="top-header">
                    <h3>Bienvenido de nuevo</h3>
                    <small>Estamos alegres que estes aqui de nuevo</small>
                </div>

                <div class="input-group">
                    <div class="input-field">
                        <ion-input labelPlacement="floating">
                          <div slot="label">E-mail</div>
                        </ion-input>
                    </div>
                    <div class="input-field">
                      <ion-input labelPlacement="floating">
                          <div slot="label">Contraseña</div>
                        </ion-input>
                    </div>
                    
                    <div class="input-field">
                        <ion-button class="input-submit"> Iniciar sesion</ion-button>
                    </div>
                     
                    <div style="text-align: center; margin-top: 40px;">
                      <p style="border-bottom: 1px solid #A2B2EE;">Si no tienes cuenta registrate</p>
                    </div>
                </div>
            </div>
        <!-------------------- Registro --------------------------->
          
        <div class="box-register" id="register">
            <div class="top-header">
                <h3>Registrate aqui</h3>
                <small>Estamos alegres de que estes con nosotros</small>
            </div>
            <div class="input-group">
                <div class="input-field">
                    <ion-row>
                      <ion-col>
                        <ion-input labelPlacement="floating">
                          <div slot="label">Nombre</div>
                        </ion-input>
                      </ion-col>

                      <ion-col>
                        <ion-input labelPlacement="floating">
                          <div slot="label">Apellido</div>
                        </ion-input>
                      </ion-col>
                    </ion-row>
                </div>
                <div class="input-field">
                  <ion-input labelPlacement="floating">
                    <div slot="label">E-mail</div>
                  </ion-input>
                </div>
                <div class="input-field">
                  <ion-input labelPlacement="floating">
                    <div slot="label" type="password">Contraseña</div>
                  </ion-input> 
                </div>
                <div class="input-field">
                  <ion-button class="input-submit"> Registrate</ion-button>
                </div>
                
            </div>
        </div>
        <!------------------------ Switch -------------------------->
          
        <div class="switch">
            <a href="#" class="login" @click="login">Login</a>
            <a href="#" class="register" @click="register">Register</a>
            <div class="btn-active" id="btn"></div>
      </div>
    </div>
  </div>

    </ion-content>
  </ion-page>
</template>

<script>
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonButton, IonRow, IonCol } from '@ionic/vue';
export default {
  name: 'HomePage',
  components: {
    IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonButton, IonRow, IonCol
  },
  methods: {
    login() {
      event.preventDefault();
      
      var x = document.getElementById('login');
      var y = document.getElementById('register');
      var z = document.getElementById('btn');

      x.style.left = '27px';
      y.style.right = '-350px';
      z.style.left = '0px';
    },
    register() {
      event.preventDefault();

      var x = document.getElementById('login');
      var y = document.getElementById('register');
      var z = document.getElementById('btn');

      x.style.left = '-350px';
      y.style.right = '25px';
      z.style.left = '150px';
    },
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500&display=swap');
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Poppins',sans-serif;
}

.container{
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
}
.box{
    display: flex;
    flex-direction: row;
    position: relative;
    padding: 60px 20px 30px 20px;
    height: 620px;
    width: 350px;
    background-color: #26292b;
    border-radius: 30px;
    -webkit-backdrop-filter: blur(15px);
    backdrop-filter: blur(15px);
    border: 3px solid rgba(255, 255, 255, 0.2);
    overflow: hidden;
}
.box-login{
    position: absolute;
    width: 85%;
    left: 27px;
    transition: .5s ease-in-out; 
}
.box-register{
    position: absolute;
    width: 85%;
    right: -350px;
    transition: .5s ease-in-out; 
}
.top-header{
    text-align: center;
    margin: 30px 0;
}
.top-header h3{
    font-size: 22px;
    font-weight: 600;
    margin-bottom: 8px
}
.input-group{
    width: 100%;
}
.input-field{
    margin: 12px 0;
    position: relative;
}
.input-box{
    width: 100%;
    height: 50px;
    font-size: 15px;
    color: #040404;
    border: none;
    border-radius: 10px;
    padding: 7px 45px 0 20px;
    background: rgba(224, 223, 223, 0.6);
    backdrop-filter: blur(2px);
    outline: none;
}
.input-field label{
    position: absolute;
    left: 20px;
    top: 15px;
    font-size: 15px;
    transition: .3s ease-in-out;
}
.input-box:focus ~ label,.input-box:valid ~ label{
    top: 2px;
    font-size: 10px;
    color: #c12828;
    font-weight: 500;
}
.eye-area{
    position: absolute;
    top: 25px;
    right: 25px;
}

.input-submit{
    margin-top: 25px;
    width: 100%;
    height: 50px;
    font-size: 15px;
    font-weight: 500;
    border: none;
    border-radius: 10px;
    background: #bc6202;
    color: #fff;
    box-shadow: 0px 4px 20px rgba(62, 9, 9, 0.145);
    cursor: pointer;
    transition: .4s;
}
.input-submit:hover{
    background: #db3e00;
    box-shadow: 0px 4px 20px rgba(62, 9, 9, 0.32);
}

.switch{
    display: flex;
    position: absolute;
    bottom: 50px;
    left: 25px;
    width: 85%;
    height: 50px;
    background: rgba(255, 255, 255, 0.16);
    backdrop-filter: blur(10px);
    border-radius: 10px;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
    overflow: hidden;
}
.switch a{
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    font-weight: 500;
    color: #000;
    text-decoration: none;
    width: 50%;
    border-radius: 10px;
    z-index: 10;
}
#btn{
    position: absolute;
    bottom: 0;
    left: 0;
    width: 145px;
    height: 50px;
    background: #cccccd;
    border-radius: 10px;
    box-shadow: 2px 0px 12px rgba(0, 0, 0, 0.1);
    transition: .5s ease-in-out;
}

ion-button {
  --background: #A2B2EE;
  --border-color: #fff;
}
</style>
