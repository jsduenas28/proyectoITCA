<template>
    <div class="contenedor">
        <div class="card">
            <h1>Generando tu cuestionario</h1>
    
            <p>Estamos trabajando para darte la mejor experiencia en tu aprendizaje</p>
    
            <div class="spinnerCont">
                <div class="spinner"></div>
            </div>

            <p>Prodria llevar un rato</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ComponenteCuestionario'
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500&display=swap');
  *{
      font-family: 'Poppins',sans-serif;
    }
.card {
        border-radius: 10px;
        text-align: center;
        padding: 20px;
        height: 500px;
        width: 400px;
        background-color: #202020;
    }

    .contenedor{
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .spinnerCont {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 30vh; /* Ajusta esto según tus necesidades */
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