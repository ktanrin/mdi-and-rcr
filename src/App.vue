<template>
  <div id="app" class="container is-fluid">
    <RCR :rcr-data="rcrData"></RCR>
    <WS :ws-data="wsData"></WS>
    <MDI :mdi-data="mdiData"></MDI>
  </div>
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
      mdiData: [],
    };
  },
  mounted(){

    this.socket = io('http://localhost:3000');
    
    this.socket.on('connect', () => {
      console.log('Connected to Socket.IO server');
    });

    this.socket.on('updateData', (data) => {
      //console.log('Data from server', data);
      this.rcrData = data;
      this.wsData = data.atisWS;
    });

    this.socket.on('updateMdiData', (data) => {
      console.log('MDI Data from server', data);
      
      this.mdiData = Object.values(data).map((item) => {
        return {
          sector: item.sector,
          time: item.time,
          period: item.period
        }
      });
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from Socket.IO server');
    });
  },
  beforeUnmount(){
    if (this.socket) {
      this.socket.off('connect')
      this.socket.off('updateData')
      this.socket.off('updateMdiData')
      this.socket.off('disconnect')
    }
  }

}
</script>

<style>
@import '~bulma/css/bulma.css';


</style>
