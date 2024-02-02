<template>
    <div class="container ws">
        <!-- Your content goes here -->
        <button class="button is-primary is-large">WS WRNG</button>
        <input class="input is-large" type="text" placeholder="WindShear Information" :value="wsData" readonly >
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
            wsText: ''
        }
    },
    watch: {
        wsData(newVal, oldVal){
            if(newVal !== null && oldVal === null){
                console.log('WS Started');
            }
            else if(newVal === null && oldVal !== null){
                console.log('WS Stopped');
            }
           
        }
    },
    mounted(){
        this.wsText = this.wsData;
        //console.log('WS Data from ws', this.wsData);
    }
    // Your component's logic goes here
}
</script>

<style scoped>
.ws {
    margin-top: 20px;
    margin-bottom: 20px;
    display: flex;
    flex-direction: row;
}
.button, .input {
    margin-right: 10px;
    font-weight: bold;
    color: salmon;
}
/* Your component's styles go here */
</style>
