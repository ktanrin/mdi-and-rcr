<template>
    <div class="container rcr">
        <p class="topic">Runway Surface Condition</p>
        <!-- EAST RWY here -->
        <div class="container first-rwy columns">
            <div class="runway-info-panel column" :style="{ visibility: (parsedRCRData.EastRWY && this.rcrData.atisRWY.includes('21')) ? 'visible' : 'hidden' }">
                <div class="utctime">
                    <p> {{ parsedRCRData.EastRWY.Time}}</p>
                </div>
                <div class="RWY-in-use tag is-light is-success is-large" :class="{ 'is-danger': isEastClosed }">
                    <p>21L</p>
                </div>
                <div class="condition">
                    <p>{{parsedRCRData.EastRWY.RWYCC}}</p>
                </div> 
            </div>
            <div class="first-part column is-3"
            :class="{
            'bg-light-blue': parsedRCRData.EastRWY.typeTDZ === 'WET',
            'bg-dark-blue': parsedRCRData.EastRWY.typeTDZ === 'STANDING WATER',
            'bg-closed-red': isEastClosed
            }"
            >
                <div class="columns">
                    <div class="textattribute column">
                    <p>RWYCC</p>
                    <p>Converage</p>
                    <p>Depth</p>
                    <p>Type</p>
                    <p>Width</p>
                    </div> 
                    <div class="value column is-7">
                    <div class="rwyccline">
                        <p>{{parsedRCRData.EastRWY.rwyccTDZ}}</p>
                        <p class="tag is-warning">{{ getRWYCCConditionText(parsedRCRData.EastRWY.rwyccTDZ) }}</p>
                    </div>
                    <p>{{parsedRCRData.EastRWY.converageTDZ}}</p>
                    <p>{{parsedRCRData.EastRWY.depthTDZ}}</p>
                    <p>{{parsedRCRData.EastRWY.typeTDZ}}</p>  
                    </div>
                </div>
            </div>
            <div class="second-part column is-3"
            :class="{
            'bg-light-blue': parsedRCRData.EastRWY.typeMID === 'WET',
            'bg-dark-blue': parsedRCRData.EastRWY.typeMID === 'STANDING WATER',
            'bg-closed-red': isEastClosed
            }"
            >
                <div class="columns">
                    <div class="textattribute column">
                    <p>RWYCC</p>
                    <p>Converage</p>
                    <p>Depth</p>
                    <p>Type</p>
                    <p>Width</p>
                    </div> 
                    <div class="value column is-7">
                    <div class="rwyccline">
                        <p>{{parsedRCRData.EastRWY.rwyccMID}}</p>
                        <p class="tag is-warning">{{ getRWYCCConditionText(parsedRCRData.EastRWY.rwyccMID) }}</p>
                    </div>
                    <p>{{parsedRCRData.EastRWY.converageMID}}</p>
                    <p>{{parsedRCRData.EastRWY.depthMID}}</p>
                    <p>{{parsedRCRData.EastRWY.typeMID}}</p>  
                    </div>
                </div>
            </div>
            <div class="third-part column is-3"
            :class="{
            'bg-light-blue': parsedRCRData.EastRWY.typeEND === 'WET',
            'bg-dark-blue': parsedRCRData.EastRWY.typeEND === 'STANDING WATER',
            'bg-closed-red': isEastClosed
            }"
            >
            <div class="columns">
                    <div class="textattribute column">
                    <p>RWYCC</p>
                    <p>Converage</p>
                    <p>Depth</p>
                    <p>Type</p>
                    <p>Width</p>
                    </div> 
                    <div class="value column is-7">
                    <div class="rwyccline">
                        <p>{{parsedRCRData.EastRWY.rwyccEND}}</p>
                        <p class="tag is-warning">{{ getRWYCCConditionText(parsedRCRData.EastRWY.rwyccEND) }}</p>
                    </div>
                    <p>{{parsedRCRData.EastRWY.converageEND}}</p>
                    <p>{{parsedRCRData.EastRWY.depthEND}}</p>
                    <p>{{parsedRCRData.EastRWY.typeEND}}</p>  
                    </div>
                </div>
            </div>
            <div class="runway-info-panel column" :style="{ visibility: (parsedRCRData.EastRWY && this.rcrData.atisRWY.includes('03')) ? 'visible' : 'hidden' }">
                <div class="utctime">
                    <p> {{ parsedRCRData.EastRWY.Time}}</p>
                </div>
                <div class="RWY-in-use tag is-light is-success is-large" :class="{ 'is-danger': isEastClosed }">
                    <p>03R</p>
                </div>
                <div class="condition">
                    {{ formattedEastRWYCC }}
                </div> 
            </div>
        </div>
        <!-- WEST RWY here -->
        <div class="space"></div>
        <div class="container second-rwy columns">
            <div class="runway-info-panel column" :style="{ visibility: (parsedRCRData.EastRWY && this.rcrData.atisRWY.includes('21')) ? 'visible' : 'hidden' }">
                <div class="utctime">
                    <p>{{parsedRCRData.WestRWY.Time}}</p>
                </div>
                <div class="RWY-in-use tag is-light is-success is-large " :class="{ 'is-danger': isWestClosed }">
                    <p>21R</p>
                </div>
                <div class="condition">
                    <p>{{ parsedRCRData.WestRWY.RWYCC }}</p>
                </div> 
            </div>
            <div class="first-part column is-3"
            :class="{
            'bg-light-blue': parsedRCRData.WestRWY.typeTDZ === 'WET',
            'bg-dark-blue': parsedRCRData.WestRWY.typeTDZ === 'STANDING WATER',
            'bg-closed-red': isWestClosed
            }"
            >
                <div class="columns">
                    <div class="textattribute column">
                    <p>RWYCC</p>
                    <p>Converage</p>
                    <p>Depth</p>
                    <p>Type</p>
                    <p>Width</p>
                    </div> 
                    <div class="value column is-7">
                        <div class="rwyccline">
                            <p>{{parsedRCRData.WestRWY.rwyccTDZ}}</p>
                            <p class="tag is-warning">{{ getRWYCCConditionText(parsedRCRData.WestRWY.rwyccTDZ) }}</p>
                        </div>
                    <p>{{parsedRCRData.WestRWY.converageTDZ}}</p>
                    <p>{{parsedRCRData.WestRWY.depthTDZ}}</p>
                    <p>{{parsedRCRData.WestRWY.typeTDZ}}</p>  
                    </div>
                </div>
            </div>

            <div class="second-part column is-3"
            :class="{
            'bg-light-blue': parsedRCRData.WestRWY.typeMID === 'WET',
            'bg-dark-blue': parsedRCRData.WestRWY.typeMID === 'STANDING WATER',
            'bg-closed-red': isWestClosed
            }"
            >
                <div class="columns">
                    <div class="textattribute column">
                    <p>RWYCC</p>
                    <p>Converage</p>
                    <p>Depth</p>
                    <p>Type</p>
                    <p>Width</p>
                    </div> 
                    <div class="value column">
                        <div class="rwyccline">
                            <p>{{parsedRCRData.WestRWY.rwyccMID}}</p>
                            <p class="tag is-warning">{{ getRWYCCConditionText(parsedRCRData.WestRWY.rwyccMID) }}</p>
                        </div>
                    <p>{{parsedRCRData.WestRWY.converageMID}}</p>
                    <p>{{parsedRCRData.WestRWY.depthMID}}</p>
                    <p>{{parsedRCRData.WestRWY.typeMID}}</p>  
                    </div>
                </div>
            </div>
            <div class="third-part column is-3"
            :class="{
            'bg-light-blue': parsedRCRData.WestRWY.typeEND === 'WET',
            'bg-dark-blue': parsedRCRData.WestRWY.typeEND === 'STANDING WATER',
            'bg-closed-red': isWestClosed
            }"
            >
                <div class="columns">
                    <div class="textattribute column">
                    <p>RWYCC</p>
                    <p>Converage</p>
                    <p>Depth</p>
                    <p>Type</p>
                    <p>Width</p>
                    </div> 
                    <div class="value column is-7">
                        <div class="rwyccline">
                            <p>{{parsedRCRData.WestRWY.rwyccEND}}</p>
                            <p class="tag is-warning">{{ getRWYCCConditionText(parsedRCRData.WestRWY.rwyccEND) }}</p>
                        </div>
                    <p>{{parsedRCRData.WestRWY.converageEND}}</p>
                    <p>{{parsedRCRData.WestRWY.depthEND}}</p>
                    <p>{{parsedRCRData.WestRWY.typeEND}}</p>  
                    </div>
                </div>
            </div>
            <div class="runway-info-panel column" :style="{ visibility: (parsedRCRData.WestRWY && this.rcrData.atisRWY.includes('03')) ? 'visible' : 'hidden' }">
                <div class="utctime">
                    <p> {{ parsedRCRData.WestRWY.Time}}</p>
                </div>
                <div class="RWY-in-use tag is-light is-success is-large" :class="{ 'is-danger': isWestClosed }">
                    <p>03L</p>
                </div>
                <div class="condition">
                    {{ formattedWestRWYCC }}
                </div> 
            </div>
        </div>


    </div>
</template>


<script>


export default {
    props: {
        rcrData: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            parsedRCRData: {
                EastRWY: {},
                WestRWY: {}
            },
        };
    },
    mounted() {
        // Your component's logic goes here
        console.log('rcrContent in rcr', this.rcrData.rcrContent);
        console.log('atisRWY in rcr', this.rcrData.atisRWY);
        // if (this.rcrData) {
        // this.parsedRCRData = this.processRCRData(this.rcrData.rcrContent);
        // console.log('parsedRCRData', this.parsedRCRData);
        // } else {
        //     // Reset or handle the absence of data appropriately
        //     this.parsedRCRData = { EastRWY: {}, WestRWY: {} };
        // }
    },
    watch: {
        rcrData: {
            immediate: true,
            handler(newVal) {
                if (newVal) {
            this.parsedRCRData = this.processRCRData(newVal.rcrContent);
            //console.log('parsedRCRData', this.parsedRCRData);
                } else {
                    // Reset or handle the absence of data appropriately
                    this.parsedRCRData = { EastRWY: {}, WestRWY: {} };
                }
            }
        }
    },
    computed: {
    isEastClosed() {
      return this.rcrData.atisRWY === '21R' || this.rcrData.atisRWY === '03L';
    },
    isWestClosed() {
      return this.rcrData.atisRWY === '21L' || this.rcrData.atisRWY === '03R';
    },
    formattedEastRWYCC() {
    const eastRWY = this.parsedRCRData.EastRWY;
    if (!eastRWY || !eastRWY.RWYCC) {
      return 'N/A';
    }

    const rwyccParts = eastRWY.RWYCC.split('/');
    // Check if atisRWY is '03', '03L', or '03R'
    const reverseOrder = ['03', '03L', '03R'].includes(this.rcrData.atisRWY);
    return reverseOrder ? rwyccParts.reverse().join('/') : eastRWY.RWYCC;
  },

  formattedWestRWYCC() {
    const westRWY = this.parsedRCRData.WestRWY;
    if (!westRWY || !westRWY.RWYCC) {
      return 'N/A';
    }

    const rwyccParts = westRWY.RWYCC.split('/');
    // Check if atisRWY is '03', '03L', or '03R'
    const reverseOrder = ['03', '03L', '03R'].includes(this.rcrData.atisRWY);
    return reverseOrder ? rwyccParts.reverse().join('/') : westRWY.RWYCC;
  },
  },
   
    methods: {
        processRCRData(rcrContent) {
    if (!rcrContent) {
      return { EastRWY: {}, WestRWY: {} };
    }

    const lines = rcrContent.trim().split('\n');
    const dataStructure = { EastRWY: {}, WestRWY: {} };

    lines.forEach((line) => {
      const parts = line.split(' ');
      const timestamp = parts[0];
      const runway = parts[1];
      const rwycc = parts[2];
      const coverage = parts[3];
      const depth = parts[4];
      const typeSection = parts.slice(5).join(' ');

      const time = timestamp.substr(4, 4) + 'Z';
      const isRunway21 = runway.includes('21');
      const rwyccParts = rwycc.split('/');
      const coverageParts = coverage.split('/');
      const depthParts = depth.split('/');

      const typeParts = this.extractTypeParts(typeSection);

      const structuredData = {
        Time: time,
        RWYCC: rwycc,
        rwyccTDZ: isRunway21 ? rwyccParts[0] : rwyccParts[2],
        rwyccMID: rwyccParts[1],
        rwyccEND: isRunway21 ? rwyccParts[2] : rwyccParts[0],
        converageTDZ: isRunway21 ? this.formatCoverage(coverageParts[0]) : this.formatCoverage(coverageParts[2]),
        converageMID: this.formatCoverage(coverageParts[1]),
        converageEND: isRunway21 ? this.formatCoverage(coverageParts[2]): this.formatCoverage(coverageParts[0]),
        depthTDZ: isRunway21 ? this.formatDepth(depthParts[0]) : this.formatDepth(depthParts[2]),
        depthMID: this.formatDepth(depthParts[1]),
        depthEND: isRunway21 ? this.formatDepth(depthParts[2]) : this.formatDepth(depthParts[0]),
        typeTDZ: typeParts[0],
        typeMID: typeParts[1],
        typeEND: typeParts[2],
        isRunway21,
      };

      if (runway === '21L' || runway === '03R') {
        dataStructure.EastRWY = structuredData;
      } else if (runway === '21R' || runway === '03L') {
        dataStructure.WestRWY = structuredData;
      }
    });
    console.log('dataStructure', dataStructure);
    return dataStructure;
  },

  formatCoverage(value) {
    return value !== 'NR' ? `${value}%` : value;
  },

  formatDepth(value) {
    return value !== 'NR' ? `${value} mm` : value;
  },

  extractTypeParts(typeSection) {
    // Split the type section by '/' and handle multi-word types like 'STANDING WATER'
    //const knownMultiWordTypes = ['STANDING WATER'];
    let typeParts = typeSection.split('/').map(part => part.trim());

    // Handle known multi-word types
    typeParts = typeParts.map((part, index, array) => {
      if (part === 'STANDING' && array[index + 1] === 'WATER') {
        return 'STANDING WATER';
      }
      if (part === 'WATER' && array[index - 1] === 'STANDING') {
        return ''; // Already handled in the previous iteration
      }
      return part;
    }).filter(part => part !== ''); // Remove empty strings from the array

    // Ensure we have exactly 3 type parts
    while (typeParts.length < 3) {
      typeParts.push('N/A');
    }

    return typeParts;
  },
  // ... other methods ...
  getRWYCCConditionText(rwycc) {
    switch (rwycc) {
      case '6':
      case '5':
        return 'GOOD';
      case '4':
        return 'GOOD TO MEDIUM';
      case '3':
        return 'MEDIUM (Slippery)';
      case '2':
        return 'MEDIUM TO POOR';
      default:
        return 'Unknown'; // Default case if the value is not recognized
    }
  },


},

       
};
</script>


<style scoped>
/* Your component styles go here */
.rcr {
    display: flex;
    flex-direction: column;
    width: 100%;
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
    background-color: lightgrey;
    
}
.first-part, .second-part, .third-part {
    border: none;
    border-radius: 6px;
    padding: 0.5em;
    margin: 0.5em;
    background-color: white;
    
}
.utctime , .condition{
    font-size: 1.25em !important;
    font-weight: bold;
    margin: 0.1em;
}
.RWY-in-use {
    font-size: 1.75em !important;
    font-weight: bold;
}

.bg-light-blue {
    background-color: lightcyan; /* Pale light blue color */
  }
  .bg-dark-blue {
    background-color: lightblue; /* Darker blue color */
  }
  .bg-closed-red{
    background-color: hsl(348, 86%, 61%);
  }

.runway-info-panel {
    padding: 0.5em;
    
    text-align: center;
}

.rwyccline {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

p {
    font-weight: bold;
}

</style>
