<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-button @click="regresarVista" class="ion-margin-top" expand="full" style="color: #A2B2EE;">Cancelar</ion-button>
                </ion-buttons>

                <ion-title>Editor</ion-title>

                <ion-buttons slot="end">
                    <ion-button @click="updateNota">Guardar Nota</ion-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>

        <ion-content class="ion-padding">
            <template v-if="cargandoNota === true">
                <h1 style="text-align: center;">Cargando tus apuntes</h1>
                <div class="contenedorSpinner">
                    <div class="spinner"></div>
                </div>
            </template>
            <template v-else>
                <div class="alert" v-if="alertValidacion === true">
                    <h3>Debes llenar todos los campos para modificar una nota</h3>
                    <button @click="() => {alertValidacion = false}"><ion-icon :icon="close" color="white" size="small"></ion-icon></button>
                </div>
                <br>
                <span>última actualización: {{ fecha }}</span>
                <input type="text" v-model="title" id="title-input" placeholder="¿Cual es el titulo?" > <br><br>

                <div v-if="editor" id="editorBtn">
                    <button @click="takePhoto()"  :disabled="isLoading"> 
                        <svg-icon type="mdi" :path="mdiCameraOutline"></svg-icon>
                    </button>
                    <button @click="verificarPlataforma()">
                        <svg-icon type="mdi" :path="mdiMicrophone"></svg-icon>
                    </button>
                    <button v-if="infoPlataforma === 'web'" @click="finalizarReconocimientoWeb()"  v-show="mostrarButton">
                        <svg-icon type="mdi" :path="mdiCloseCircleOutline"></svg-icon>
                    </button>
                    <button  @click="selectDocument()" :disabled="isLoading">
                        <svg-icon type="mdi" :path="mdiFileDocumentOutline"></svg-icon>
                    </button>
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
                <editor-content ref="editor" :editor="editor" @input="handleInput" />

                <div>
                    <ion-spinner v-if="isLoading" name="crescent"></ion-spinner>
                </div>

            </template>
        </ion-content>
    </ion-page>
</template>

<script>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonBackButton, IonButtons, IonButton, IonSpinner  } from '@ionic/vue'

import { Editor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'

import SvgIcon from '@jamescoyle/vue-icon';
import { mdiFormatBold, mdiFormatItalic, mdiFormatStrikethroughVariant, mdiCodeBraces, mdiFormatParagraph, mdiFormatHeader1, mdiFormatHeader2,mdiFormatListBulleted, mdiFormatListNumbered, mdiArrowULeftTop, mdiArrowURightTop, mdiCameraOutline, mdiMicrophone, mdiCloseCircleOutline, mdiFileDocumentOutline} from '@mdi/js';

import { close, } from 'ionicons/icons';

import axios from '../api/api.js'
import { Drivers, Storage } from '@ionic/storage';
import CordovaSQLiteDriver from 'localforage-cordovasqlitedriver'
import { SpeechRecognition } from '@capacitor-community/speech-recognition';
import { Device } from '@capacitor/device';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
const store = new Storage({
  driverOrder: [CordovaSQLiteDriver._driver, Drivers.IndexedDB, Drivers.LocalStorage]
});

store.create()

export default {
    name: 'EditorPageUpdate',
    data() {
        return {
            mdiFormatBold, mdiFormatItalic,mdiFormatStrikethroughVariant,mdiCodeBraces,mdiFormatParagraph,mdiFormatHeader1,mdiFormatHeader2,mdiFormatListBulleted,mdiFormatListNumbered,mdiArrowULeftTop,mdiArrowURightTop, mdiCameraOutline, mdiMicrophone, mdiCloseCircleOutline, mdiFileDocumentOutline,
            close,
            editor: new Editor( {
                extensions: [
                    StarterKit,
                    Placeholder.configure({
                        placeholder: 'Escribe tus apuntes aquí...'
                    })
                ],
                content: ''
            }),
            title: '',
            texto: '',
            fecha: '',
            carpeta: '',
            numeroDeFilas: 1,
            token: '',
            arrayNota: [],
            alertValidacion: false,
            recognition: null,
            infoPlataforma: '',
            mostrarButton: false,
            vozReconocida: '',
            cameraImage: null,
            isLoading: false,
            isCameraVisible: false,
            textoAnalizado: '',
            cargandoNota: false,
            documentoAnalizado: '',
        }
    },
    beforeUnmount() {
        this.editor.destroy()
    },
    components: {
        IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonBackButton, IonButtons, IonButton, EditorContent, SvgIcon, IonSpinner 
    },
    methods: {
        handleInput() {
            this.texto = this.editor.getHTML()
        },
        regresarVista() {
            this.$router.push({path: '/tabs/inicio'})
        },
        async updateNota() {
            if(this.title === '' || this.texto === '') {
                this.alertValidacion = true
            } else {
                await this.obtenerToken()
                const nota = this.$route.params.nota
                const data = {
                    titulo_nota: this.title,
                    contenido_nota: this.texto,
                    carpeta: this.carpeta
                }
    
                axios.put(`/api/nota/update/${nota}`, JSON.stringify(data), {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + this.token
                    }
                })
                .then(response => {
                    this.$router.push({path: '/tabs/inicio', query: {showNotaUpdate: 'true'}})
                })
                .catch(error => console.error(error))
            }
        },
        async getNota() {
            this.cargandoNota = true
            await this.obtenerToken()
            const nota = this.$route.params.nota

            axios.get(`/api/nota/edit/${nota}`, {
                headers: {
                    'Authorization': 'Bearer ' + this.token
                }
            })
            .then(response => {
                this.arrayNota = response.data
                this.llenarCampos()
            })
            .catch(error => console.error(error))
            .then(() => this.cargandoNota = false)
        },
        async obtenerToken() {
            try {
                this.token = await store.get('accessToken');
            } catch (error) {
                console.error("Error al obtener el token:", error);
                throw error; // Manejo de errores, si es necesario
            }
        },
        llenarCampos() {
            this.title = this.arrayNota.nota.titulo_nota
            this.texto = this.arrayNota.nota.contenido_nota
            this.fecha = this.arrayNota.fecha
            this.carpeta = this.arrayNota.nota.carpeta
            this.editor.commands.setContent(this.texto);
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

        actualizarTextoReconocido(texto){
            //this.vozReconocida += '\n' + texto;
            const contenidoExistenteMovil = this.editor.getText();
            const textoReconocidoMovil = '\n' + this.vozReconocida + texto;
            const nuevoContenidoMovil = `${contenidoExistenteMovil}${textoReconocidoMovil}`;
  
            this.editor.commands.setContent({
                type: 'doc',
                content: [
                  {
                    type: 'paragraph',
                    content: [
                      {
                        type: 'text',
                        text: nuevoContenidoMovil,
                      },
                    ],
                  },
                ],
            });
            this.handleInput();
        },

        //Reconocimiento de voz en plataforma web
        iniciarReconocimientoWeb(){
            this.recognition = new webkitSpeechRecognition()
            this.recognition.lang = 'es-ES'
            this.recognition.continuous = true
            this.vozReconocida = '';

            this.recognition.onresult = (event) => {
                let textoReconocido = this.vozReconocida;

                for (let i = this.ultimoTextoReconocido; i < event.results.length; i++) {
                    console.log(event.results[i][0].transcript);
                    textoReconocido = event.results[i][0].transcript + ' ';
                }

                if(!this.reconocimientoIniciado || this.vozReconocida === ''){
                    this.vozReconocida += '' + textoReconocido;
                    const contenidoExistente = this.editor.getText();
  
                    const textoReconocidoo = this.vozReconocida;
                    const textoLimpio = textoReconocidoo.trim();
                    const nuevoContenido = `${contenidoExistente} ${textoLimpio}`;
  
                    this.editor.commands.setContent({
                      type: 'doc',
                      content: [
                        {
                          type: 'paragraph',
                          content: [
                            {
                              type: 'text',
                              text: nuevoContenido,
                            },
                          ],
                        },
                      ],
                    });
                    this.handleInput();
                } else{
                    const contenidoExistente = this.editor.getText();
  
                    const textoReconocidoo = textoReconocido;
                    const textoLimpio = textoReconocidoo.trim();
                    const nuevoContenido = `${contenidoExistente} ${textoLimpio}`;
  
                    this.editor.commands.setContent({
                      type: 'doc',
                      content: [
                        {
                          type: 'paragraph',
                          content: [
                            {
                              type: 'text',
                              text: nuevoContenido,
                            },
                          ],
                        },
                      ],
                    });
                    this.handleInput();
                }
                  
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
                setTimeout(() => {
                    this.recognition = null;
                }, 1000);
            }
        },

        //AGREGANDO LOS METODOS PARA LA FUNCIONALIDAD DEL SCANNER
        async takePhoto() {
                try {
                    const image = await this.captureCameraImage();
                    if (image) {
                        await this.analyzeImage();
                    }
                } catch (error) {
                    console.error('Error al tomar la foto:', error);
                    alert('ERROR AL TOMAR LA FOTOGRAFÍA');
                }
            },

        async captureCameraImage() {
            try {
                const image = await Camera.getPhoto({
                    quality: 95,
                    allowEditing: false,
                    resultType: CameraResultType.Uri,
                    promptLabelHeader: 'Fotos',
                    promptLabelPhoto: 'Seleccionar Fotografia',
                    promptLabelPicture: 'Tomar Fotografia'
                });
                this.cameraImage = image.webPath;
                return image;
            } catch (error) {
                console.error('Error al capturar la foto: ', error);
                alert('ERROR AL CAPTURAR LA FOTOGRAFÍA');
                this.cameraImage = null;
                return null;
            }
        },

        async chooseImage() {
            try {
                const image = await Camera.getPhoto({
                    quality: 95,
                    allowEditing: false,
                    resultType: CameraResultType.Uri,
                    source: CameraSource.Photos,
                });

                this.cameraImage = image.webPath;
                await this.analyzeImage();
            } catch (error) {
                console.error('Error al seleccionar la imagen:', error);
                alert('ERROR AL SELECCIONAR IMAGEN');
            }
        },

        async analyzeImage() {
            this.isLoading = true;
            this.textoAnalizado = '';
            const apiKey = '650d94d2d6a848b2a3567c748de666bd';
            const endpoint = 'https://itcaocredw1n.cognitiveservices.azure.com/';

            const params = {
                'api-version': '2023-04-01-preview',
                'gender-neutral-caption': 'false',
                'features': 'read',
            };

            const headers = {
                'Content-Type': 'application/octet-stream',
                'Ocp-Apim-Subscription-Key': apiKey,
            };

            const imageUri = this.cameraImage; // Ruta de la imagen capturada o seleccionada

            const imageBlob = await this.getImageBlob(imageUri);


            // Realiza la solicitud POST a la API de Computer Vision
            //axios.post('http://127.0.0.1:8000/api/scannerText',
            axios.post(`${endpoint}computervision/imageanalysis:analyze?`,
                    imageBlob,
                    {
                        params,
                        headers,
                        withCredentials: false
                    },
                )
                .then((response) => {
                    console.log('Éxito', response.data);
                    console.log('ESTE ES EL BINARIO A ENVIAR: ', imageBlob);
                    this.textoAnalizado += response.data.readResult.content;
                    this.textoAnalizado = this.textoAnalizado.replace(/\n/g, "<br>");
            
                    const contenidoExistenteOCR = this.editor.getText();
                    const contenidoExistenteLimpio = contenidoExistenteOCR.replace(/\n/g, "<br>");

                    const textoReconocidoOCR = this.textoAnalizado;
                    const nuevoContenidoOCR = `${contenidoExistenteLimpio} <br><br> ${textoReconocidoOCR}`;

                    this.editor.commands.setContent(nuevoContenidoOCR);

                    this.isLoading = false;
                    this.handleInput();
                })
                .catch((error) => {
                    console.error('Error', error);
                    console.log('ESTE ES EL BINARIO A ENVIAR: ', imageBlob);
                    alert('ERROR DE RECONOCIMIENTO DE TEXTO - OCR')
                    this.isLoading = false;
                });
        },  
            
        async getImageBlob(imageUri) {
            const response = await fetch(imageUri);
            return await response.blob();
        },

        //ESCANEO DE DOCUMENTOS
        async selectDocument() {
            const fileInput = document.createElement('input');
            fileInput.type = 'file';
            fileInput.accept = 'application/pdf, application/vnd.openxmlformats-officedocument.wordprocessingml.document';
            fileInput.addEventListener('change', async (event) => {
                const file = event.target.files[0];
                if (file) {
                    try {
                        this.isLoading = true;
                        this.documentoAnalizado = '';
                        const endpoint = 'https://itcaocrvernedocumentos.cognitiveservices.azure.com/';
                        const apiUrl = `${endpoint}formrecognizer/documentModels/prebuilt-read:analyze?`;

                        let headerss;
                        if (file.type === 'application/pdf') {
                            headerss = {
                                'Ocp-Apim-Subscription-Key': 'cfe254cf8dc34591b30764865d12f358',
                                'Content-Type': 'application/pdf',
                            };
                        } else if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
                            headerss = {
                                'Ocp-Apim-Subscription-Key': 'cfe254cf8dc34591b30764865d12f358',
                                'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                            };
                        } else {
                            alert('TIPO DE ARCHIVO NO PERMITIDO, SOLO PDF/WORD');
                        };

                        const headers = headerss;

                        const params = {
                            'api-version': '2023-07-31',
                            'stringIndexType': 'utf16CodeUnit',
                        };

                        const response = await axios.post(apiUrl, file, { params, headers, withCredentials: false });

                        if (response.status === 202) {
                            const operationLocation = response.headers['operation-location'];
                            await this.waitForOperationCompletion(operationLocation, headers);
                        } else {
                            throw new Error('La solicitud no se aceptó correctamente.');
                        }
                    } catch (error) {
                        console.error('Error al escanear el documento:', error);
                        alert('ERROR AL ESCANEAR DOCUMENTO');
                    } finally {
                        this.isLoading = false;
                    }
                }
            });

            fileInput.click();
        },

        async waitForOperationCompletion(operationLocation, headers) {
            while (true) {
                const resultResponse = await this.checkOperationStatus(operationLocation, headers);
                if (resultResponse.data.status === 'succeeded') {
                    this.documentoAnalizado += resultResponse.data.analyzeResult.content;
                    this.documentoAnalizado = this.documentoAnalizado.replace(/\n/g, "<br>");

                    const contenidoExistenteDocumento = this.editor.getText();
                    const contenidoExistenteDocumentoLimpio = contenidoExistenteDocumento.replace(/\n/g, "<br>");
                    const documentoAnalizadoLimpio = this.documentoAnalizado;

                    const nuevoContenidoEscaneado = `${contenidoExistenteDocumentoLimpio}<br><br> ${documentoAnalizadoLimpio}`;

                    this.editor.commands.setContent(nuevoContenidoEscaneado);
                    this.isLoading = false;
                    this.handleInput();
                    break;

                } else if (resultResponse.data.status === 'failed') {
                    console.error('La operación ha fallado:', resultResponse);
                    this.isLoading = false;
                    break;
                } else {
                    await new Promise((resolve) => setTimeout(resolve, 2000));
                }
            }
        },

        async checkOperationStatus(operationLocation, headers) {
            const resultResponse = await axios.get(operationLocation, { headers,withCredentials: false  });
            return resultResponse;
        },

    }, //aqui termina methods
    mounted() {
        this.getNota()
    },
    
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500&display=swap');
  *{
      font-family: 'Poppins',sans-serif;
    }
    #title-input {
    width: 100%;
    font-size: 36px;
    background: none;
    outline: none;
    border: none;
  }

  #editorBtn {
    width: 100%;
    position: sticky;
    top: 0;
    background-color: #121212;
    display: flex;
    flex-wrap: nowrap;
    overflow: auto;
    z-index: 1;
  }


  #editorBtn button{
    padding: 10px;
    margin: 5px;
    background-color: #121212;
    border: 2px solid white;
    border-radius: 10px;
  }

  .tiptap {
    padding: 10px;
  }

  .tiptap:focus {
    outline: none;
  }

  .tiptap p.is-editor-empty:first-child::before {
    content: attr(data-placeholder);
    float: left;
    color: #adb5bd;
    pointer-events: none;
    height: 0;
    }

    .alert {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        background-color: red;
        border-radius: 10px;
        padding: 5px;
        text-align: center;
    }

    .alert h3 {
        margin-left: 20px;
    }

    .alert button {
        margin: 5px;
        border-radius: 10px;
        background: transparent;
    }

    .contenedorSpinner{
        display: flex;
        justify-content: center;
        align-items: center;
        height: 10vh; /* Ajusta esto según tus necesidades */
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