<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-button @click="regresarVista" class="ion-margin-top" expand="full" style="color: #A2B2EE;">Cancelar</ion-button>
                </ion-buttons>

                <ion-title>Editor</ion-title>

                <ion-buttons slot="end">
                    <ion-button @click="guardarNota">Guardar Nota</ion-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>

        <ion-content class="ion-padding">
            <div class="contenido">
                <input type="text" v-model="title" id="title-input" placeholder="¿Cual es el titulo?"> <br><br>
    
                <editor-content ref="editor" :editor="editor" class="editor" @input="handleInput" />
    
                <div>
                    <ion-button @click="verificarPlataforma" color="primary" class="ionButton">
                        <img src="../../public/microicon.svg" alt="iniciar" class="micro">
                    </ion-button>
                    <ion-button :color="'danger'" v-if="infoPlataforma === 'web'" @click="finalizarReconocimientoWeb" class="ionButton" v-show="mostrarButton">
                        <ion-img src="../../public/cancelicon.svg" class="micro"></ion-img>
                    </ion-button>
                </div>
            </div>
        </ion-content>

        <div v-if="editor" id="editorBtn">
                <button @click="editor.chain().focus().toggleBold().run()" :disabled="!editor.can().chain().focus().toggleBold().run()" :class="{ 'is-active': editor.isActive('bold') }">
                    <svg-icon type="mdi" :path="mdiFormatBold"></svg-icon>
                </button>
                <button @click="editor.chain().focus().toggleItalic().run()" :disabled="!editor.can().chain().focus().toggleItalic().run()" :class="{ 'is-active': editor.isActive('italic') }">
                    <svg-icon type="mdi" :path="mdiFormatItalic"></svg-icon>
                </button>
                <button @click="editor.chain().focus().toggleStrike().run()" :disabled="!editor.can().chain().focus().toggleStrike().run()" :class="{ 'is-active': editor.isActive('strike') }">
                    <svg-icon type="mdi" :path="mdiFormatStrikethroughVariant"></svg-icon>
                </button>
                <button @click="editor.chain().focus().setParagraph().run()" :class="{ 'is-active': editor.isActive('paragraph') }">
                    <svg-icon type="mdi" :path="mdiFormatParagraph"></svg-icon>
                </button>
                <button @click="editor.chain().focus().toggleHeading({ level: 1 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }">
                    <svg-icon type="mdi" :path="mdiFormatHeader1 "></svg-icon>
                </button>
                <button @click="editor.chain().focus().toggleHeading({ level: 2 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }">
                    <svg-icon type="mdi" :path="mdiFormatHeader2"></svg-icon>
                </button>
                <button @click="editor.chain().focus().toggleBulletList().run()" :class="{ 'is-active': editor.isActive('bulletList') }">
                    <svg-icon type="mdi" :path="mdiFormatListBulleted"></svg-icon>
                </button>
                <button @click="editor.chain().focus().toggleOrderedList().run()" :class="{ 'is-active': editor.isActive('orderedList') }">
                    <svg-icon type="mdi" :path="mdiFormatListNumbered"></svg-icon>
                </button>
                <button @click="editor.chain().focus().toggleCodeBlock().run()" :class="{ 'is-active': editor.isActive('codeBlock') }">
                    <svg-icon type="mdi" :path="mdiCodeBraces"></svg-icon>
                </button>
                <button @click="editor.chain().focus().undo().run()" :disabled="!editor.can().chain().focus().undo().run()">
                    <svg-icon type="mdi" :path="mdiArrowULeftTop"></svg-icon>
                </button>
                <button @click="editor.chain().focus().redo().run()" :disabled="!editor.can().chain().focus().redo().run()">
                    <svg-icon type="mdi" :path="mdiArrowURightTop"></svg-icon>
                </button>
        </div>
    </ion-page>
</template>

<script>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonBackButton, IonButtons, IonButton } from '@ionic/vue'

import { Editor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'

import SvgIcon from '@jamescoyle/vue-icon';
import { mdiFormatBold, mdiFormatItalic, mdiFormatStrikethroughVariant, mdiCodeBraces, mdiFormatParagraph, mdiFormatHeader1, mdiFormatHeader2,mdiFormatListBulleted, mdiFormatListNumbered, mdiArrowULeftTop, mdiArrowURightTop} from '@mdi/js';

import axios from '../api/api.js'
import { Drivers, Storage } from '@ionic/storage';
import CordovaSQLiteDriver from 'localforage-cordovasqlitedriver'
import { SpeechRecognition } from '@capacitor-community/speech-recognition';
import { Device } from '@capacitor/device';
const store = new Storage({
  driverOrder: [CordovaSQLiteDriver._driver, Drivers.IndexedDB, Drivers.LocalStorage]
});

store.create()

export default {
    name: 'EditorPage',
    data() {
        return {
            mdiFormatBold, mdiFormatItalic,mdiFormatStrikethroughVariant,mdiCodeBraces,mdiFormatParagraph,mdiFormatHeader1,mdiFormatHeader2,mdiFormatListBulleted,mdiFormatListNumbered,mdiArrowULeftTop,mdiArrowURightTop,

            editor: new Editor( {
                extensions: [
                    StarterKit
                ],
                content: ''
            }),
            title: '',
            texto: '',
            numeroDeFilas: 1,
            token: '',
            recognition: null,
            infoPlataforma: '',
            mostrarButton: false,
        }
    },
    components: {
        IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonBackButton, IonButtons, IonButton, EditorContent, SvgIcon
    },
    beforeUnmount() {
        this.editor.destroy()
    },
    methods: {
        handleInput() {
            this.texto = this.editor.getHTML()
        },
        regresarVista() {
            window.history.back();
        },
        async guardarNota() {
            await this.obtenerToken()
            const carpeta = this.$route.params.carpeta

            axios.post('/api/nota/store', {
                titulo_nota: this.title,
                contenido_nota: this.texto,
                carpeta: carpeta
            }, {
                headers: {
                    'Authorization': 'Bearer ' + this.token
                }
            })
            .then(response => {
                console.log(response.data);
                this.$router.push({path: '/tabs/inicio'})
            })
            .catch(error => console.error(error))
        },
        async obtenerToken() {
            try {
                this.token = await store.get('accessToken');
            } catch (error) {
                console.error("Error al obtener el token:", error);
                throw error; // Manejo de errores, si es necesario
            }
        },

        async verificarPlataforma() {
            const info = await Device.getInfo();
            console.log('Información del dispositivo:', info);

            if (info.platform === 'web') {
                console.log('La aplicación se está ejecutando en un navegador web.');
                this.infoPlataforma = (info.platform)
                this.mostrarButton = true;
                this.iniciarReconocimientoWeb();
            } else if (info.platform === 'android' || info.platform === 'ios') {
                console.log('La aplicación se está ejecutando en un dispositivo móvil (Android o iOS).');
                this.iniciarReconocimiento();
            } else {
                console.log('Plataforma desconocida.');
                alert('Función no disponible en este dispositivo');
            }
        },

         //Esto es para android 
        async iniciarReconocimiento() {
            console.log('Iniciando reconocimiento...');
            const available = await SpeechRecognition.available();
            console.log('Dsiponibilidad de reconocimiento:', available);

            if (!available) {
                console.error('La función de reconocimiento de voz no está disponible en este dispositivo.');
                return;
            }

            const permissions = await SpeechRecognition.checkPermissions();
            console.log('Permisos:', permissions);

            if (permissions && permissions.speechRecognition === 'granted') {
                try {
                    const result = await SpeechRecognition.start({
                        language: 'es-ES',
                        maxResults: 5,
                        prompt: 'Di algo',
                        partialResults: true,
                        popup: true,
                    });
                    
                    this.actualizarTextoReconocido(result.matches[0]);
                } catch (error) {
                    console.error('Error al solicitar el permiso de reconocimiento de voz:', error);
                    return;
                }
            } else{
                try{
                    await SpeechRecognition.requestPermissions();
                    console.log('Permiso de reconocimiento de voz otorgado.');
                    const result = await SpeechRecognition.start({
                        language: 'es-ES',
                        maxResults: 5,
                        prompt: 'Di algo',
                        partialResults: true,
                        popup: true,
                    });
                    
                    this.actualizarTextoReconocido(result.matches[0]);
                } catch(error){
                    console.error('Error al solicitar el permiso de reconocimiento de voz:', error);
                }
            }
        },

        actualizarTextoReconocido(text){
            this.texto+= '\n' + text;
        },

        //Reconocimiento de voz en plataforma web
        iniciarReconocimientoWeb(){
            this.recognition = new webkitSpeechRecognition()
            this.recognition.lang = 'es-ES'
            this.recognition.continuous = true

            this.recognition.onresult = (event) => {
                let textoReconocido = this.texto;

                for (let i = this.ultimoTextoReconocido; i < event.results.length; i++) {
                    console.log(event.results[i][0].transcript);
                    textoReconocido = event.results[i][0].transcript + ' ';
                }

                if(!this.reconocimientoIniciado || this.texto === ''){
                    this.texto += '' + textoReconocido;
                } else{
                    this.texto += '' + textoReconocido;
                }

                //this.ultimoTextoReconocido = event.results.length;                   
            }

            this.recognition.onstart = () => {
                console.log('Reconocimiento de voz iniciado.');
                this.reconocimientoIniciado = true;
                this.reconocimientoPausado = false;
                this.ultimoTextoReconocido = 0;
            };

            this.recognition.onend = () => {
                console.log('Reconocimiento de voz finalizado.');
                this.mostrarButton = false;
            };

            this.recognition.start();
        },

        finalizarReconocimientoWeb(){
            if(this.recognition){
                this.recognition.stop();
                this.reconocimientoIniciado = false;
                this.recognition = null;
            }
        }

    }
}
</script>

<style scoped>
    #title-input {
    width: 100%;
    font-size: 36px;
    background: none;
    outline: none;
    border: none;
  }

  #editor__content {
    width: 100%;
    background: none; 
    border-color: transparent;
  }

  #editor__content:focus {
    outline: none;
  }

  .micro{
        width: 17px;
  }

  .ionButton{
    padding: 10px 5px 5px 0px;
  }

  #editorBtn {
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    display: flex;
    flex-wrap: nowrap;
    overflow: auto;
  }


  #editorBtn button{
    padding: 20px;
    margin: 5px;
    background: transparent;
    border: 2px solid white;
    border-radius: 10px;
  }
</style>