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
                <tr v-for="index in 4" :key="`first-${index}`" :class="{ 'is-selected': isCurrentTimeInPeriod(firstHalf[index - 1]?.period) }">
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
                <tr v-for="index in 4" :key="`second-${index}`" :class="{ 'is-selected': isCurrentTimeInPeriod(secondHalf[index - 1]?.period) }">
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
            isCurrentlySelected: false,
        };
    },
    computed: {
    // Split the mdiData into two halves
    firstHalf() {
      return [...this.mdiData.slice(0, 4), {}, {}, {}, {}].slice(0, 4);
    },
    secondHalf() {
      return [...this.mdiData.slice(4, 8), {}, {}, {}, {}].slice(0, 4);
    }
  },
    mounted(){
        
        this.checkPeriod(); // Initial check
        this.interval = setInterval(() => {
        this.checkPeriod(); // Periodic check every minute (or another suitable interval)
        }, 1000); // Check every 60 seconds
    },
    beforeUnmount() { // Use beforeDestroy() for Vue 2
        clearInterval(this.interval); // Clear the interval to prevent memory leaks
    },

    methods: {

    checkPeriod() {
      // Check if the current time is within any of the periods
      this.isCurrentlySelected = this.mdiData.some(item => this.isCurrentTimeInPeriod(item.period));
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
    console.log('Local Time', hours + minutes); 
    return hours + minutes;
  }
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
</style>
