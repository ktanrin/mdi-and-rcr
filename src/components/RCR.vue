<template>
    <div class="container rcr">
        <p class="topic">Runway Surface Condition</p>
        <!-- EAST RWY here -->
        <div class="container first-rwy columns is-full">
            <div class="runway-info-panel column is-one-fifth">
                <div class="utctime">
                    <p>Time</p>
                </div>
                <div class="RWY-in-use">
                    <p>RWY in use</p>
                </div>
                <div class="condition">
                    <p>Condition</p>
                </div> 
            </div>
            <div class="first-part column is-one-fifth">
                <p>RWYCC</p>
                <p>Converage</p>
                <p>Depth</p>
                <p>Type</p>
                <p>Width</p>
            </div>
            <div class="second-part column is-one-fifth">
                <p>RWYCC</p>
                <p>Converage</p>
                <p>Depth</p>
                <p>Type</p>
                <p>Width</p>
            </div>
            <div class="third-part column is-one-fifth">
                <p>RWYCC</p>
                <p>Converage</p>
                <p>Depth</p>
                <p>Type</p>
                <p>Width</p>
            </div>
        </div>
        <!-- WEST RWY here -->
        <div class="space"></div>
        <div class="container second-rwy columns">
            <div class="runway-info-panel column is-one-fifth">
                <div class="utctime">
                    <p>Time</p>
                </div>
                <div class="RWY-in-use">
                    <p>RWY in use</p>
                </div>
                <div class="condition">
                    <p>Condition</p>
                </div> 
            </div>
            <div class="first-part column is-one-fifth">
                <p>RWYCC</p>
                <p>Converage</p>
                <p>Depth</p>
                <p>Type</p>
                <p>Width</p>
            </div>
            <div class="second-part column is-one-fifth">
                <p>RWYCC</p>
                <p>Converage</p>
                <p>Depth</p>
                <p>Type</p>
                <p>Width</p>
            </div>
            <div class="third-part column is-one-fifth">
                <p>RWYCC</p>
                <p>Converage</p>
                <p>Depth</p>
                <p>Type</p>
                <p>Width</p>
            </div>
        </div>


    </div>
</template>


<script>
import io from 'socket.io-client';

export default {
    data() {
        return {
            // Your data goes here
            receivedData: {
                rcrContent: 'No data received yet',
            },
            parsedRCRData: null,
        };
    },
    mounted() {
        // Connect to the Socket.IO server
        const socket = io('http://localhost:3000');

        // Handle events from the server
        socket.on('connect', () => {
            console.log('Connected to Socket.IO server');
        });

        socket.on('updateData', (data) => {
            this.receivedData = data;
            console.log('Received data:', data);
            console.log('Received rcrContent:', data.rcrContent);
        });
    },
    method() {

    }
       
};
</script>


<style scoped>
/* Your component styles go here */
.rcr {
    display: flex;
    flex-direction: column;
   
}
.topic {
    margin-bottom: 1em;
}
.space {
    margin-bottom: 1em;
}
.first-rwy, .second-rwy  {
    display: flex;
    flex-direction: row;
    border: solid 2px black;
    height: 100%;
    padding: 1em;
    
}
.first-part, .second-part, .third-part {
    border: solid 2px black;
    padding: 0.5em;
    margin: 0.5em;
}
.runway-info-panel {
    padding: 0.5em;
    margin: 0.5em;
}
</style>
