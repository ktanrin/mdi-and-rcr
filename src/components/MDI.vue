<template>
    <div class="container mdi is-fluid">
         <!-- <p>MDI Information</p> -->
        <!-- Your HTML content goes here -->
        <div class="combined-table container is-fluid">
        <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
            <thead>
                <tr>
                    <th>Sector</th>
                    <th>Time</th>
                    <th>Period</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="index in 4" :key="`first-${index}`" :class="{ 'is-selected': firstHalfSelectionStates[index - 1] }">
                    <td>{{ firstHalf[index - 1]?.sector || '&nbsp;' }}</td>
                    <td>{{ firstHalf[index - 1]?.time || '&nbsp;' }}</td>
                    <td>{{ firstHalf[index - 1]?.period || '&nbsp;' }}</td>
                </tr>
        </tbody>
      </table>
        <div class="space"></div>
        <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
            <thead>
                <tr>
                    <th>Sector</th>
                    <th>Time</th>
                    <th>Period</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="index in 4" :key="`second-${index}`" :class="{ 'is-selected': secondHalfSelectionStates[index - 1] }">
                    <td>{{ secondHalf[index - 1]?.sector || '&nbsp;' }}</td>
                    <td>{{ secondHalf[index - 1]?.time || '&nbsp;' }}</td>
                    <td>{{ secondHalf[index - 1]?.period || '&nbsp;' }}</td>
                </tr>
            </tbody>
        </table>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        mdiData: {
            type: Array,
            default: () => []
        }
    },
    data(){
        return {
            // Your component data goes here
            // Other data properties...
            firstHalfSelectionStates: new Array(4).fill(false),
            secondHalfSelectionStates: new Array(4).fill(false),
            soundPlayedFlag: {},

        };
    },
    computed: {
    // Split the mdiData into two halves
    firstHalf() {
      return [...this.mdiData.slice(0, 4), {}, {}, {}, {}].slice(0, 4);
    },
    secondHalf() {
      return [...this.mdiData.slice(4, 8), {}, {}, {}, {}].slice(0, 4);
    },
    
  },
    mounted(){
        this.initializeFlags();
        this.updateSelectionStates(); // Initial check
        this.checkMDI(); // Initial check
        this.selectStateInterval = setInterval(() => {
            this.updateSelectionStates();
        }, 1000); // Check every 1 second

        // New interval for checking MDI start/stop every minute
        this.checkMDIInterval = setInterval(() => {
            this.checkMDI();
        }, 1000); // Check every 60 seconds

    },
    beforeUnmount() { // Use beforeDestroy() for Vue 2
        clearInterval(this.checkPeriodInterval);
        clearInterval(this.checkMDIInterval); // Clear the interval to prevent memory leaks
    },
    
    methods: {
    initializeFlags() {
        this.soundPlayedFlag = {};
        this.mdiData.forEach((item, index) => {
            this.soundPlayedFlag[`start-${index}`] = false;
            this.soundPlayedFlag[`stop-${index}`] = false;
        });
    },

    updateSelectionStates() {
        this.firstHalf.forEach((item, index) => {
            this.firstHalfSelectionStates[index] = this.isCurrentTimeInPeriod(item?.period);
        });
        this.secondHalf.forEach((item, index) => {
            this.secondHalfSelectionStates[index] = this.isCurrentTimeInPeriod(item?.period);
        });
    },    
    checkMDI(){
        // Play audio if the current time is within a period
        const currentTime = this.getCurrentLocalTimeFormatted();
        this.mdiData.forEach((item, index) => {
            
            const startTime = this.convertUTCToLocal(item.period.split('-')[0]);
            let endTime = this.convertUTCToLocal(item.period.split('-')[1]);
            
            // Convert endTime to a Date object for manipulation
            let endTimeDate = new Date();
            endTimeDate.setHours(parseInt(endTime.substring(0, 2)), parseInt(endTime.substring(2, 4)), 0, 0);

            // Add one minute to endTime
            endTimeDate.setMinutes(endTimeDate.getMinutes() + 1);

            // Convert back to a string in HHMM format
            let adjustedEndTime = endTimeDate.getHours().toString().padStart(2, '0') + endTimeDate.getMinutes().toString().padStart(2, '0');

            if(currentTime === startTime && !this.soundPlayedFlag[`start-${index}`]){
                console.log('MDI Started');
                this.playMDIStart();
                this.soundPlayedFlag[`start-${index}`] = true;
            }
            if (currentTime === adjustedEndTime && !this.soundPlayedFlag[`stop-${index}`]) {
                console.log('MDI Stopped');
                this.playMDIStop();
                this.soundPlayedFlag[`stop-${index}`] = true;
            } else if (currentTime < startTime || currentTime > adjustedEndTime) {
                // Reset flags when current time is outside the period
                this.soundPlayedFlag[`start-${index}`] = false;
                this.soundPlayedFlag[`stop-${index}`] = false;
            }
        })
    },

    
    isCurrentTimeInPeriod(period) {
    
    if (!period) return false;
    // Convert period start and end times from UTC to local time
    const [startTime, endTime] = period.split('-').map(time => this.convertToMinutes(this.convertUTCToLocal(time)));
    
    // Get the current time in local time
    let currentTime = this.convertToMinutes(this.getCurrentLocalTimeFormatted());

    // If the end time is earlier than the start time, it spans midnight
    //const endMinutes = endTime < startTime ? endTime + 1440 : endTime;
   
    // Adjust for period spanning past midnight
    let adjustedEndTime = endTime;
    if (endTime < startTime) {
      adjustedEndTime += 1440; // Add one day in minutes if period spans past midnight

      // If current time is earlier than start time, it might be after midnight, so adjust it too
      if (currentTime < startTime) {
        // This ensures comparison is valid for early morning times after midnight
        currentTime += 1440;
      }
    }

    // Compare times
    return currentTime >= startTime && currentTime <= adjustedEndTime;
  },
  convertToMinutes(timeString) {
    // Convert a time string (HHmm) to minutes since the start of the day
    const hours = parseInt(timeString.substring(0, 2));
    const minutes = parseInt(timeString.substring(2, 4));
    return hours * 60 + minutes;
  },
  convertUTCToLocal(utcTime) {
    // Assuming utcTime is in the format "HHMM"
    const hours = parseInt(utcTime.substr(0, 2), 10);
    const minutes = utcTime.substr(2, 2);

    // Convert to local time by adding the timezone offset
    const localHours = (hours + 7) % 24; // Adjust for your local timezone offset
    const localTime = localHours.toString().padStart(2, '0') + minutes;
    
    return localTime;
  },
  getCurrentLocalTimeFormatted() {

    const now = new Date();
    const localTime = new Date(now.getTime() + (7 * 60 * 60 * 1000)); // Add 7 hours to UTC time
    const hours = String(localTime.getUTCHours()).padStart(2, '0');
    const minutes = String(localTime.getUTCMinutes()).padStart(2, '0');
    //console.log('Local Time', hours + minutes); 
    return hours + minutes;
  },
    playAudio(src){
        const audio = new Audio(src);
        audio.play().catch(err => {
            console.error('Error playing audio', err);
        });
    },
    async playMDIStart(){
        let audioSrc;
        if(process.env.NODE_ENV === 'development'){
            audioSrc = 'MDIStart.wav';
            this.playAudio(audioSrc);
        }
        else{
            const audioData = await window.electron.loadAudio('MDIStart.wav');
            if(audioData){
                const audioBlob = new Blob([new Uint8Array(audioData)], { type: 'audio/wav' });
                audioSrc = URL.createObjectURL(audioBlob);
                this.playAudio(audioSrc);
            }
        }
    },
    async playMDIStop(){
        let audioSrc;
        if(process.env.NODE_ENV === 'development'){
            audioSrc = 'MDIStop.wav';
            this.playAudio(audioSrc);
        }
        else{
            const audioData = await window.electron.loadAudio('MDIStop.wav');
            if(audioData){
                const audioBlob = new Blob([new Uint8Array(audioData)], { type: 'audio/wav' });
                audioSrc = URL.createObjectURL(audioBlob);
                this.playAudio(audioSrc);
            }
        }
    },
    
    
}
    
}
</script>

<style scoped>
p {
    
    font-weight: bold;
    margin-bottom: 0.5em;
}
/* Your component styles go here */
.mdi{
    display: flex;
    flex-direction: column;
    
}
.space {
    margin-left: 0.5em;
    margin-right: 0.5em;
   
}
.combined-table {
    display: flex;
    flex-direction: row;
    align-items: flex-start; /* Align tables to the top */
    justify-content: space-between; /* Add space between tables */
    width: 100%; /* Set combined table container to full width */
    
}
.combined-table.table {
    flex-shrink: 0; /* Prevent the table from shrinking */
    overflow-x: auto; /* Add scroll if table is too wide */
    width: auto; /* Let the table determine its own natural width */
    margin-left: 0.5em !important;
    margin-right: 0.5em !important;
}

.th,.tr,.td {
    text-align: center !important;
    align-items: center !important;
    
    
}
.table td, .table th{
    min-height: 50px !important;
    line-height: 50px !important;
    text-align: center !important;
    
}
.table th{
    background-color: #dbdbdb;
    
    font-weight: bolder;
    font-size: 1.5em;
}
.table td {
    font-weight: bold;
    font-size: 2em;
}

tr.is-selected {
    background-color: rgb(180, 255, 230) !important;
    color : #000000 !important; 
}
</style>
