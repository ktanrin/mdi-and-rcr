<template>
    <div>
        <!-- Your component content goes here -->
        <div class="container first-rwy">
            <div class="runway-info-panel">
                <div class="utctime">
                    <h1>Runway Information</h1>
                    <p>{{receivedData.rcrContent}}</p>
                </div>
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
};
</script>


<style scoped>
/* Your component styles go here */
</style>
