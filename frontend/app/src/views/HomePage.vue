<template>
  <ion-page>

    <ion-content class="ion-padding" :fullscreen="true">

      <template v-if="showSesionCerrada === true">
          <div class="alertSesionCerrada">
            <h1>Parece que la sesion expiro</h1>
            <p>Por favor vuelve a Iniciar Sesión</p>
          </div>
      </template>

      <template v-if="showLogoutAlert === true">
          <div class="alertLogout">
            <h1>Cerraste la sesión anterior</h1>
            <p>Por favor vuelve a Iniciar Sesión</p>
          </div>
      </template>

      <template v-if="showLoginAlert === true">
          <div class="alertLogin">
            <h1>Inicio de sesión fallido</h1>
            <p>Verifica tus credenciales e intenta de nuevo</p>
          </div>
      </template>

      <template v-if="showRegisterAlert === true">
          <div class="alertRegister">
            <h1>El registro fallo</h1>
            <p>Verifica las credenciales e intenta de nuevo</p>
          </div>
      </template>

      <template v-if="alertValidación === true">
          <div class="alertValidación">
            <h1>Todos los campos deben de ser rellenados</h1>
          </div>
      </template>

      <div v-if="verificandoSesion === true">
        <ComponentePantallaCarga />
      </div>
      
      <div class="container" v-else>
        <div class="box">
            <!------------------ Inicio de sesion --------------------->
            <div class="box-login" id="login">
                <div class="top-header">
                    <h3>Bienvenido de nuevo</h3>
                    <small>Estamos alegres que estes aqui de nuevo</small>
                </div>

                <div class="input-group">
                    <div class="input-field">
                        <ion-input labelPlacement="floating" type="email" v-model="loginData.email">
                          <div slot="label">E-mail</div>
                        </ion-input>
                    </div>
                    <div class="input-field">
                      <ion-input labelPlacement="floating" v-model="loginData.password" type="password">
                          <div slot="label">Contraseña</div>
                        </ion-input>
                    </div>
                    
                    <div class="input-field">
                        <ion-button class="input-submit" @click="loginUser"> Iniciar sesion</ion-button>
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
                  <ion-input labelPlacement="floating" v-model="registerData.username">
                    <div slot="label">Nombre de Usuario</div>
                  </ion-input>
                </div>
                <div class="input-field">
                  <ion-input labelPlacement="floating" type="email" v-model="registerData.email">
                    <div slot="label" type="email">E-mail</div>
                  </ion-input>
                </div>
                <div class="input-field">
                  <ion-input labelPlacement="floating" type="password" v-model="registerData.password">
                    <div slot="label" type="password">Contraseña</div>
                  </ion-input> 
                  <span v-if="passwordAlert === true" style="color: red;">La contraseña debe contener al menos 8 caracteres</span>
                </div>
                <div class="input-field">
                  <ion-button class="input-submit" @click="registerUser"> Registrate</ion-button>
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
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonButton, IonRow, IonCol, IonIcon } from '@ionic/vue';
import axios from '../api/api.js'

import ComponentePantallaCarga from '../views/ComponentePantallaCarga.vue'

import { Drivers, Storage } from '@ionic/storage';
import CordovaSQLiteDriver from 'localforage-cordovasqlitedriver';

const store = new Storage({
  driverOrder: [CordovaSQLiteDriver._driver, Drivers.IndexedDB, Drivers.LocalStorage]
});

store.create()

export default {
  name: 'HomePage',
  components: {
    IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonButton, IonRow, IonCol, IonIcon, ComponentePantallaCarga
  },
  data() {
    return  {
      registerData: {
        username: '',
        email:'',
        password:''
      },

      loginData: {
        email: '',
        password: ''
      },
      showSesionCerrada: false,
      showLogoutAlert: false,
      showLoginAlert: false,
      showRegisterAlert: false,
      alertValidación: false,
      passwordAlert: false,
      verificandoSesion: false
    }
  },
  created() {
    if(this.$route.query.showValidacion === 'true') {
        this.alertSesionCerrada()
    }
  },
  mounted() {
    this.validarLogin()
  },
  methods: {
    async validarLogin() {
        this.verificandoSesion = true
        const token = await store.get('accessToken');
        try {
          axios.get('/api/auth/validarToken', {
              headers: {
                  'Authorization': 'Bearer ' + token
              }
          })
          .then(response => {
            this.$router.push({path: '/tabs/inicio'})
            this.verificandoSesion = false
          })
          .catch(error => {
          })
          .then(() => this.verificandoSesion = false)
        } catch (error) {
          console.log(error)
        }
      },
    alertSesionCerrada() {
      this.showSesionCerrada = true
      this.showLoginAlert = false
      this.showLogoutAlert = false
      this.showValidacion = false
      this.showRegisterAlert = false
    },
    alertLogout() {
      this.showLogoutAlert = true
      this.showSesionCerrada = false
      this.showLogoutAlert = false
      this.showValidacion = false
      this.showRegisterAlert = false
    },
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

    registerUser() {
      if(this.registerData['username'] === '' || this.registerData['email'] === '' || this.registerData['password'] === '') {
        this.alertValidación = true
        this.showLoginAlert = false
        this.showSesionCerrada = false
        this.showLogoutAlert = false
        this.showRegisterAlert = false
      } else {
        if(this.registerData['password'].length < 8) {
          this.passwordAlert = true
        } else {
          axios.post('/api/auth/register', {
            name: this.registerData['username'],
            email: this.registerData['email'],
            password: this.registerData['password'],
          })
    
          .then(response => {
            console.log(response.data); 
            const token = response.data.accessToken
    
            store.set('accessToken', token)
    
            this.$router.push({path: '/tabs/inicio'})
          })
          .catch(error => {
            this.showRegisterAlert = true
            this.showLogoutAlert = false
            this.showSesionCerrada = false
            this.showLogoutAlert = false
            this.showValidacion = false
          });
        }
      }
    },

    loginUser() {
      if(this.loginData['email'] === '' || this.loginData['password'] === '') {
        this.alertValidación = true
        this.showLoginAlert = false
        this.showSesionCerrada = false
        this.showLogoutAlert = false
        this.showRegisterAlert = false
      } else {
        axios.post('/api/auth/login', {
          email: this.loginData['email'],
          password: this.loginData['password'],
        })
  
        .then(response => {
          console.log(response.data);
          const token = response.data.accessToken
  
          store.set('accessToken', token)
  
          this.$router.push({path: '/tabs/inicio'})
        })
        .catch(error => {
          this.alertValidación = false
          this.showLoginAlert = true
          this.showSesionCerrada = false
          this.showLogoutAlert = false
          this.showRegisterAlert = false

          this.loginData['email'] = ''
          this.loginData['password'] = ''
        });
      }
    }
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

.alertSesionCerrada {
    width: 100%;
    background-color: rgb(77, 76, 76);
    border-radius: 10px;
    padding: 10px;
    text-align: center;
}

.alertLogout {
    width: 100%;
    background-color: rgb(77, 76, 76);
    border-radius: 10px;
    padding: 10px;
    text-align: center;
}

.alertLogin {
    width: 100%;
    background-color: red;
    border-radius: 10px;
    padding: 10px;
    text-align: center;
}

.alertValidación {
    width: 100%;
    background-color: red;
    border-radius: 10px;
    padding: 10px;
    text-align: center;
}

.alertRegister {
    width: 100%;
    background-color: red;
    border-radius: 10px;
    padding: 10px;
    text-align: center;
}

.pantallaCarga {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
}

  .contenedorSpinner{
    height: 100%; /* Ajusta esto según tus necesidades */
  }

  .spinner {
    width: 11.2px;
    height: 11.2px;
    border-radius: 11.2px;
    box-shadow: 28px 0px 0 0 rgba(71,75,255,0.2), 22.7px 16.5px 0 0 rgba(71,75,255,0.4), 8.68px 26.6px 0 0 rgba(71,75,255,0.6), -8.68px 26.6px 0 0 rgba(71,75,255,0.8), -22.7px 16.5px 0 0 #474bff;
    animation: spinner-b87k6z 1s infinite linear;
  }

  @keyframes spinner-b87k6z {
    to {
        transform: rotate(360deg);
    }
  }
</style>
