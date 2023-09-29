<template>
    <ion-list-header>
        <div style="margin-right: 10px; align-items: center;">
            <svg width="45" height="45" viewBox="0 0 80 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="&#240;&#159;&#166;&#134; icon &#34;folder outline&#34;">
                <g id="Group">
                <path :class="color" d="M5 5H28V20H5V5Z" fill="white"/>
                <path :class="color" d="M28 9H75V20H28V9Z" fill="white"/>
                <path id="Vector" d="M69.9921 60.7971H9.56786C7.82595 60.7971 6.15539 60.1052 4.92368 58.8735C3.69197 57.6418 3 55.9712 3 54.2293V9.56786C3 7.82595 3.69197 6.15539 4.92368 4.92368C6.15539 3.69197 7.82595 3 9.56786 3H22.0287C23.3255 3.00003 24.5933 3.38396 25.6722 4.1034L30.2435 7.15089C31.3224 7.87032 32.5902 8.25425 33.887 8.25429H69.9921C71.734 8.25429 73.4046 8.94625 74.6363 10.178C75.868 11.4097 76.56 13.0802 76.56 14.8221V54.2293C76.56 55.9712 75.868 57.6418 74.6363 58.8735C73.4046 60.1052 71.734 60.7971 69.9921 60.7971Z" stroke="white" stroke-width="5.25429" stroke-linecap="round" stroke-linejoin="round"/>
                <path id="Vector_2" d="M3 21.39H76.56" stroke="white" stroke-width="5.25429" stroke-linecap="round" stroke-linejoin="round"/>
                </g>
                </g>
            </svg> 
        </div>
        <ion-label><strong style="font-size: medium;">{{ name }}</strong></ion-label>
    </ion-list-header>
</template>

<script>
export default {
    name: 'CarpetaList',
    props:{
        color: '',
        name: '',
    },
    methods: {
    }
}
</script>
<style scoped>
    .red {
        fill: red;
    }
    
    .yellow {
        fill: yellow;
    }

    .green {
        fill: green;
    }

    .blue {
        fill: blue;
    }

    .black {
        fill: black;
    }

    .white {
        fill: white;
    }
</style>