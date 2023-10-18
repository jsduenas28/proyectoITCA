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
            <input type="text" v-model="title" id="title-input" placeholder="¿Cual es el titulo?" > <br><br>

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
            <editor-content ref="editor" :editor="editor" @input="handleInput" />
        </ion-content>
    </ion-page>
</template>

<script>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonBackButton, IonButtons, IonButton } from '@ionic/vue'

import { Editor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'

import SvgIcon from '@jamescoyle/vue-icon';
import { mdiFormatBold, mdiFormatItalic, mdiFormatStrikethroughVariant, mdiCodeBraces, mdiFormatParagraph, mdiFormatHeader1, mdiFormatHeader2,mdiFormatListBulleted, mdiFormatListNumbered, mdiArrowULeftTop, mdiArrowURightTop} from '@mdi/js';

import axios from '../api/api.js'
import { Drivers, Storage } from '@ionic/storage';
import CordovaSQLiteDriver from 'localforage-cordovasqlitedriver'
const store = new Storage({
  driverOrder: [CordovaSQLiteDriver._driver, Drivers.IndexedDB, Drivers.LocalStorage]
});

store.create()

export default {
    name: 'EditorPageUpdate',
    data() {
        return {
            mdiFormatBold, mdiFormatItalic,mdiFormatStrikethroughVariant,mdiCodeBraces,mdiFormatParagraph,mdiFormatHeader1,mdiFormatHeader2,mdiFormatListBulleted,mdiFormatListNumbered,mdiArrowULeftTop,mdiArrowURightTop,

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
            carpeta: '',
            numeroDeFilas: 1,
            token: '',
            arrayNota: []
        }
    },
    beforeUnmount() {
        this.editor.destroy()
    },
    components: {
        IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonBackButton, IonButtons, IonButton, EditorContent, SvgIcon
    },
    methods: {
        handleInput() {
            this.texto = this.editor.getHTML()
        },
        regresarVista() {
            window.history.back();
        },
        async updateNota() {
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
                console.log(response.data);
                this.$router.push({path: '/tabs/inicio'}).then(() => {
                    window.location.reload()
                })
            })
            .catch(error => console.error(error))
        },
        async getNota() {
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
            this.title = this.arrayNota[0]['titulo_nota']
            this.texto = this.arrayNota[0]['contenido_nota']
            this.carpeta = this.arrayNota[0]['carpeta']
            this.editor.commands.setContent(this.texto);
        }
    },
    mounted() {
        this.getNota()
    },
    
}
</script>

<style>
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
</style>