<template>
  
    <RCR :rcr-data="rcrData"></RCR>
    <WS :ws-data="wsData"></WS>
    <MDI :mdi-data="mdiData"></MDI>
  
</template>

<script>
import 'bulma/css/bulma.min.css';
import RCR from './components/RCR.vue'
import WS from './components/WS.vue'
import MDI from './components/MDI.vue'
import io from 'socket.io-client';

export default {
  components: {
    RCR,
    WS,
    MDI
},
  data(){
    return{
      socket: null,
      rcrData: {
        rcrContent: null,
        atisRWY: '21'
      },
      wsData: '',
      mdiData: {},
    };
  },
  mounted(){

    this.socket = io('http://localhost:3000');
    
    this.socket.on('connect', () => {
      console.log('Connected to Socket.IO server');
    });

    this.socket.on('updateData', (data) => {
      console.log('Data from server', data);
      this.rcrData = data;
      this.wsData = data.atisWS;
      this.mdiData = data.mdiContent;
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from Socket.IO server');
    });
  },
  beforeUnmount(){
    if (this.socket) {
      this.socket.off('connect')
      this.socket.off('updateData')
      this.socket.off('disconnect')
    }
  }

}
</script>

<style>
@import '~bulma/css/bulma.css';


</style>
