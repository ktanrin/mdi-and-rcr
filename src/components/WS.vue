<template>
    <div class="container ws is-fluid">
        <!-- Your content goes here -->
        <button class="button is-large is-info"
        :class="{
              'is-warning': isFlashing && flashState === 'warning',
              'is-danger': isFlashing && flashState === 'danger'
        }"
        >WS WRNG</button>
        <input class="input is-large" type="text" placeholder="WindShear Information" :value="wsData" readonly
        :class="{ 'is-danger is-focused': wsData }" >
    </div>
</template>

<script>

export default {
    props: {
        wsData: {
            type: String,
            default: ''
        }
    },
    data(){
        return {
            wsText: '',
            isFlashing: false,
            flashState: 'warning',
            flashInterval: null
        }
    },
    watch: {
        
        wsData(newVal, oldVal){
            this.isFlashing = !!newVal;
            if(this.isFlashing){
              this.startFlashing();
            }
            else{
              this.stopFlashing();
            }
            if(newVal !== null && oldVal === null){
                this.playWSStart();
                console.log('WS Started');
            }
            else if(newVal === null && oldVal !== null){
                this.playWSStop();
                console.log('WS Stopped');
            }
        }
    },
    methods: {
        startFlashing(){
            this.flashInterval = setInterval(() => {
                this.flashState = this.flashState === 'warning' ? 'danger' : 'warning';
            }, 500);
        },
        stopFlashing(){
            clearInterval(this.flashInterval);
            this.flashState = 'primary';
        },
        playAudio(src){
            const audio = new Audio(src);
            audio.play().catch(err => {
                console.error('Error playing audio', err);
            });
        },
        async playWSStart(){
            let audioSrc;
            if(process.env.NODE_ENV === 'development'){
                audioSrc = 'WsWrngStart.wav';
                this.playAudio(audioSrc);
            }
            else{
                const audioData = await window.electron.loadAudio('WsWrngStart.wav');
                if(audioData){
                    const audioBlob = new Blob([new Uint8Array(audioData)], {type: 'audio/wav'});
                    audioSrc = URL.createObjectURL(audioBlob);
                    this.playAudio(audioSrc);
                }
            }
        },
        async playWSStop(){
            let audioSrc;
            if(process.env.NODE_ENV === 'development'){
                audioSrc = 'WsWrngStop.wav';
                this.playAudio(audioSrc);
            }
            else{
                const audioData = await window.electron.loadAudio('WsWrngStop.wav');
                if(audioData){
                    const audioBlob = new Blob([new Uint8Array(audioData)], {type: 'audio/wav'});
                    audioSrc = URL.createObjectURL(audioBlob);
                    this.playAudio(audioSrc);
                }
            }
        }
    },
    mounted(){
        this.wsText = this.wsData;
        //console.log('WS Data from ws', this.wsData);
    },
    beforeUnmount(){
        this.stopFlashing();
    }
    // Your component's logic goes here
}
</script>

<style scoped>
.ws {
    margin-top: 20px;
    margin-bottom: 10px;
    display: flex;
    flex-direction: row;
}
.button, .input {
    margin-right: 10px;
    font-weight: bold;
    
}
.input {
    color: salmon;
}

/* Your component's styles go here */
</style>
