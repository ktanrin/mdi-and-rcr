<template>
  <div id="app" class="container is-fluid">
    <RCR :rcr-data="rcrData"></RCR>
    <WS :ws-data="wsData"></WS>
    <MDI :mdi-data="mdiData"></MDI>
  </div>
  <footer class="footer connection">
    <div class="container is-fluid">
      <div class="field has-addons">
        <div class="control">
          <div class="select">
            <select v-model="selectedATIS">
                <option value="arrival">Arrival ATIS</option>
                <option value="departure">Departure ATIS</option>
            </select>
          </div> 
        </div>
        <div class="control">
          <p :class="connectionClass">Connected</p>  
        </div>
      </div>
    </div>
  </footer>
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
      selectedATIS: 'arrival', // Default selection
      ipMap: {
        arrival: '', // Will be filled with loaded settings
        departure: '', // Will be filled with loaded settings
      },
      isConnected: false,
      rcrData: {
        rcrContent: null,
        atisRWY: '21'
      },
      wsData: '',
      mdiData: [],
      
      
    };
  },
  computed: {
    connectionClass() {
    if (!this.isConnected) {
      return 'tag is-danger is-light is-large'; // Disconnected
    }
    return this.selectedATIS === 'arrival' ? 'tag is-info is-light is-large' : 'tag is-warning is-light is-large';
  },
  },
  watch: {
    selectedATIS(newValue) {
    this.connectToATIS(newValue);
  },
  },
  methods: {
    async loadSettingsAndConnect() {
      try {
        // Load settings from the Electron main process
        const settings = await window.electron.getServerIp();
        // Update the ipMap with the loaded settings
        this.ipMap.arrival = settings.arrivalATIS || 'default-arrival-IP';
        this.ipMap.departure = settings.departureATIS || 'default-departure-IP';
        // Immediately attempt to connect using the loaded settings
        console.log('Loaded settings arrival :', settings.arrivalATIS);
        console.log('Loaded settings departure :', settings.departureATIS);
        this.connectToATIS(this.selectedATIS);
      } catch (error) {
        console.error('Error loading settings:', error);
      }
    },
    connectToATIS(atisType) {
    
    if (this.socket) {
        this.socket.disconnect();
      }

    const socketUrl = `http://${this.ipMap[atisType]}:1350`;
      
    // Establish a new connection
    this.socket = io(socketUrl);
    console.log('Connecting to socketURL', socketUrl);
    // Re-register all event listeners
    this.registerSocketEventListeners();
  },
  registerSocketEventListeners() {
    this.socket.on('connect', () => {
      this.isConnected = true;
      console.log('Connected to Socket.IO server', this.selectedATIS);
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
      this.isConnected = false;
      console.log('Disconnected from Socket.IO server');
    });

    // Add other event listeners as before
  },
  },
   mounted(){
    // Connect to the default ATIS
    console.log('imap  ', this.ipMap);
    this.loadSettingsAndConnect();
    window.electron.on('server-ip-updated', async () => {
      const settings = await window.electron.getServerIp();
      // Reload settings and reconnect
      console.log('Settings updated:', settings);
      await this.loadSettingsAndConnect();
    });

    
  },
  beforeUnmount(){
    if (this.socket) {
      this.socket.disconnect();
    }
  }

}
</script>

<style>
@import '~bulma/css/bulma.css';

.footer {
  
  padding-top: 0;
  padding-bottom: 0;
}
.select select,.tag {
  font-weight: bold !important;
}
</style>
