# proyectoITCA

## Instalación
Con git clone el proyecto se descarga en el directorio en el que estén en ese momento.

Por ejemplo, si estan en Documentos, el proyecto se va a guardar en ese directorio.

**en git bash**: git clone https://github.com/jsduenas28/proyectoITCA.git
npm install para instalar node_modules

## Instrucciones

Antes tienen que clonar el repositorio y acceder al directorio con `cd`. Ya dentro sigan los siguientes pasos:

#### 1. crear una rama
Crea una rama para tus cambios. Dale un nombre descriptivo que refleje la naturaleza de tu contribución.
```bash
git checkout -b nombre_rama
```
#### 2. Realizar los cambios
Haz las modificaciones y mejoras que desees en tu rama. Puedes editar archivos, agregar nuevos archivos, etc.

#### 3. Hacer Commit de cambios
Una vez que hayas realizado tus cambios, haz commit de ellos en tu rama. Asegúrate de incluir un mensaje de commit descriptivo:
```bash
git add .
git commit -m "Agrega una descripción clara de tus cambios"
```
#### 4. Actualizar Rama
Antes de enviar tus cambios, asegúrate de que tu rama esté actualizada con la rama `main` del repositorio:
```bash
git pull origin main
```
#### 5. Hacer Push de tu Rama
```bash
git push origin nombre_rama
```

#### 6. Creación de solicitud de extracción (Pull Request)
El repositorio es privado para que nadie más pueda clonarlo y robarse, por si acaso. Por eso tienen que hacer las pull request.

Como vamos a avisar de los cambios en el chat no hace mucha falta la descripción, pero igual expliquen un poco solo para acordarnos.

**Para crear el Pull Request**

1. Ve a la página del repositorio en GitHub. https://github.com/jsduenas28/proyectoITCA
	Deberías ver un mensaje que indica que has hecho push a una rama recientemente. Allí, 			encontrarás un botón que dice "Compare & pull request". Haz clic en él.

2. Completa el formulario del PR, proporcionando una descripción detallada de tus cambios.
	Asegúrate de seleccionar la rama correcta en la que trabajaste y la rama principal a la que deseas fusionar tus cambios.

3. Puedes solicitar que otros colaboradores revisen tus cambios seleccionando a revisores específicos en la pestaña "Reviewers" (Revisores).

4. Una vez que hayas completado el formulario, haz clic en el botón "Create Pull Request" (Crear Pull Request).
