<template>
    <div class="container mdi">
        <p>MDI Information</p>
        <!-- Your HTML content goes here -->
        <div class="combined-table container">
        <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
            <thead>
                <tr>
                    <th>Sector</th>
                    <th>Time</th>
                    <th>Period</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="index in 4" :key="`first-${index}`">
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
                <tr v-for="index in 4" :key="`second-${index}`">
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
        console.log('MDI Data', this.mdiData);
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
</style>
