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
            <tr>
                <td>1</td>
                <td>2</td>
                <td>3</td>
            </tr>
            <tr>
                <td>1</td>
                <td>2</td>
                <td>3</td>
            </tr>
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
            <tr>
                <td>1</td>
                <td>2</td>
                <td>3</td>
            </tr>
            <tr>
                <td>1</td>
                <td>2</td>
                <td>3</td>
            </tr>
        </table>        
        </div>
    </div>
</template>

<script>
export default {
    
    
}
</script>

<style scoped>
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
</style>
