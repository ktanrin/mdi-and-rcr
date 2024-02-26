<template>
    <div class="container rcr is-fluid">
        
        <!-- EAST RWY here -->
        <div class="container first-rwy columns is-fluid">
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
                        <p class="tag is-warning" v-if="getRWYCCConditionText(parsedRCRData.EastRWY.rwyccTDZ) !== 'Unknown'">
                            {{ getRWYCCConditionText(parsedRCRData.EastRWY.rwyccTDZ) }}
                        </p>
                        <div class="arrow-up-down" >
                        <font-awesome-icon v-if="arrowDirections.East.TDZ === 'up'" :icon="['fas', 'long-arrow-alt-up']" class="has-text-success fa-2x"/>
                        <font-awesome-icon v-if="arrowDirections.East.TDZ === 'down'" :icon="['fas', 'long-arrow-alt-down']" class="has-text-danger fa-2x" />
                        </div>
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
                        <p class="tag is-warning" v-if="getRWYCCConditionText(parsedRCRData.EastRWY.rwyccMID) !== 'Unknown'">
                            {{ getRWYCCConditionText(parsedRCRData.EastRWY.rwyccMID) }}
                        </p>
                        <div class="arrow-up-down" >
                        <font-awesome-icon v-if="arrowDirections.East.MID === 'up'" :icon="['fas', 'long-arrow-alt-up']" class="has-text-success fa-2x"/>
                        <font-awesome-icon v-if="arrowDirections.East.MID === 'down'" :icon="['fas', 'long-arrow-alt-down']" class="has-text-danger fa-2x" />
                        </div>
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
                        <p class="tag is-warning" v-if="getRWYCCConditionText(parsedRCRData.EastRWY.rwyccEND) !== 'Unknown'">
                            {{ getRWYCCConditionText(parsedRCRData.EastRWY.rwyccEND) }}
                        </p>
                        <div class="arrow-up-down" >
                        <font-awesome-icon v-if="arrowDirections.East.END === 'up'" :icon="['fas', 'long-arrow-alt-up']" class="has-text-success fa-2x"/>
                        <font-awesome-icon v-if="arrowDirections.East.END === 'down'" :icon="['fas', 'long-arrow-alt-down']" class="has-text-danger fa-2x" />
                        </div>
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
        <div class="container second-rwy columns is-fluid">
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
                            <p class="tag is-warning" v-if="getRWYCCConditionText(parsedRCRData.WestRWY.rwyccTDZ) !== 'Unknown'">
                                {{ getRWYCCConditionText(parsedRCRData.WestRWY.rwyccTDZ) }}
                            </p>
                            <div class="arrow-up-down" >
                        <font-awesome-icon v-if="arrowDirections.West.TDZ === 'up'" :icon="['fas', 'long-arrow-alt-up']" class="has-text-success fa-2x"/>
                        <font-awesome-icon v-if="arrowDirections.West.TDZ === 'down'" :icon="['fas', 'long-arrow-alt-down']" class="has-text-danger fa-2x" />
                        </div>
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
                    <div class="value column is-7">
                        <div class="rwyccline">
                            <p>{{parsedRCRData.WestRWY.rwyccMID}}</p>
                            <p class="tag is-warning" v-if="getRWYCCConditionText(parsedRCRData.WestRWY.rwyccMID) !== 'Unknown'">
                                {{ getRWYCCConditionText(parsedRCRData.WestRWY.rwyccMID) }}
                            </p>
                            <div class="arrow-up-down" >
                            <font-awesome-icon v-if="arrowDirections.West.MID === 'up'" :icon="['fas', 'long-arrow-alt-up']" class="has-text-success fa-2x"/>
                            <font-awesome-icon v-if="arrowDirections.West.MID === 'down'" :icon="['fas', 'long-arrow-alt-down']" class="has-text-danger fa-2x" />
                            </div>
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
                            <p class="tag is-warning" v-if="getRWYCCConditionText(parsedRCRData.WestRWY.rwyccEND) !== 'Unknown'">
                                {{ getRWYCCConditionText(parsedRCRData.WestRWY.rwyccEND) }}
                            </p>
                            <div class="arrow-up-down" >
                            <font-awesome-icon v-if="arrowDirections.West.END === 'up'" :icon="['fas', 'long-arrow-alt-up']" class="has-text-success fa-2x"/>
                            <font-awesome-icon v-if="arrowDirections.West.END === 'down'" :icon="['fas', 'long-arrow-alt-down']" class="has-text-danger fa-2x" />
                            </div>
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
import { library } from '@fortawesome/fontawesome-svg-core';
import { faArrowUpLong, faArrowDownLong, faLongArrowAltUp, faLongArrowAltDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faArrowUpLong, faArrowDownLong, faLongArrowAltUp, faLongArrowAltDown);

export default {
    components: {
      'font-awesome-icon': FontAwesomeIcon,
    },
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
            arrowDirections: {
              East: {
                TDZ: '',
                MID: '',
                END: ''
              },
              West: {
                TDZ: '',
                MID: '',
                END: ''
              }
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
        },
        parsedRCRData: {
            deep: true,
            handler(newVal, oldVal) {
                this.checkForAllSix();
                this.checkForRWYCCChange(newVal, oldVal);
                this.checkForRWYWetorSlippery();
                this.checkForRWYType();
            }
        },
        'parsedRCRData.EastRWY.rwyccTDZ': function(newVal, oldVal) {
          this.determineDirection(newVal, oldVal, 'East', 'TDZ');
        },
        'parsedRCRData.EastRWY.rwyccMID': function(newVal, oldVal) {
          this.determineDirection(newVal, oldVal, 'East', 'MID');
        },
        'parsedRCRData.EastRWY.rwyccEND': function(newVal, oldVal) {
          this.determineDirection(newVal, oldVal, 'East', 'END');
        },
        'parsedRCRData.WestRWY.rwyccTDZ': function(newVal, oldVal) {
          this.determineDirection(newVal, oldVal, 'West', 'TDZ');
        },
        'parsedRCRData.WestRWY.rwyccMID': function(newVal, oldVal) {
          this.determineDirection(newVal, oldVal, 'West', 'MID');
        },
        'parsedRCRData.WestRWY.rwyccEND': function(newVal, oldVal) {
          this.determineDirection(newVal, oldVal, 'West', 'END');
        },
        
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

  playAudio(src) {
    const audio = new Audio(src);
    audio.play().catch(err => {
      console.error('Error playing audio', err);
    });
  },
  async playRWYCCChangedSound(){
    let audioSrc;
    if(process.env.NODE_ENV === 'development'){
      audioSrc = 'RWY Condition Code Changed.wav';
      this.playAudio(audioSrc);
    } else {
      const audioData = await window.electron.loadAudio('RWY Condition Code Changed.wav');
      if(audioData){
        const audioBlob = new Blob([new Uint8Array(audioData)], {type: 'audio/wav'});
        audioSrc = URL.createObjectURL(audioBlob);
        this.playAudio(audioSrc);
        }
    }
  },
  async playRWYCCResumeNormalSound(){
    let audioSrc;
    if(process.env.NODE_ENV === 'development'){
      audioSrc = 'RWY Condition Resume Normal.wav';
      this.playAudio(audioSrc);
    } else {
      const audioData = await window.electron.loadAudio('RWY Condition Resume Normal.wav');
      if(audioData){
        const audioBlob = new Blob([new Uint8Array(audioData)], {type: 'audio/wav'});
        audioSrc = URL.createObjectURL(audioBlob);
        this.playAudio(audioSrc);
        }
    }
  },
  async playRWYSlipperyWetSound(){
    let audioSrc;
    if(process.env.NODE_ENV === 'development'){
      audioSrc = 'RWY Slippery Wet.wav';
      this.playAudio(audioSrc);
    } else {
      const audioData = await window.electron.loadAudio('RWY Slippery Wet.wav');
      if(audioData){
        const audioBlob = new Blob([new Uint8Array(audioData)], {type: 'audio/wav'});
        audioSrc = URL.createObjectURL(audioBlob);
        this.playAudio(audioSrc);
        }
    }
  },
  async playRWYWetSound(){
    let audioSrc;
    if(process.env.NODE_ENV === 'development'){
      audioSrc = 'RWY Wet.wav';
      this.playAudio(audioSrc);
    } else {
      const audioData = await window.electron.loadAudio('RWY Wet.wav');
      if(audioData){
        const audioBlob = new Blob([new Uint8Array(audioData)], {type: 'audio/wav'});
        audioSrc = URL.createObjectURL(audioBlob);
        this.playAudio(audioSrc);
        }
    }
  },
  async playSlushOnRWYSound(){
    let audioSrc;
    if(process.env.NODE_ENV === 'development'){
      audioSrc = 'Slush on RWY.wav';
      this.playAudio(audioSrc);
    } else {
      const audioData = await window.electron.loadAudio('Slush on RWY.wav');
      if(audioData){
        const audioBlob = new Blob([new Uint8Array(audioData)], {type: 'audio/wav'});
        audioSrc = URL.createObjectURL(audioBlob);
        this.playAudio(audioSrc);
        }
    }
  },
  async playStandingWaterOnRWYSound(){
    let audioSrc;
    if(process.env.NODE_ENV === 'development'){
      audioSrc = 'Standing water on RWY.wav';
      this.playAudio(audioSrc);
    } else {
      const audioData = await window.electron.loadAudio('Standing water on RWY.wav');
      if(audioData){
        const audioBlob = new Blob([new Uint8Array(audioData)], {type: 'audio/wav'});
        audioSrc = URL.createObjectURL(audioBlob);
        this.playAudio(audioSrc);
        }
    }
  },

  checkForRWYCCChange(newValue, oldValue) {
    let soundPlayed = false; // Flag to prevent playing the sound multiple times
    const runways = ['EastRWY', 'WestRWY'];
    for (const runwayKey of runways) {
            const segments = ['rwyccTDZ', 'rwyccMID', 'rwyccEND'];
            for (const segment of segments) {
                const newSegmentValue = newValue[runwayKey]?.[segment];
                const oldSegmentValue = oldValue[runwayKey]?.[segment];
                
                // Detect change from "6" to another value and ensure sound is played only once
                if (oldSegmentValue === '6' && newSegmentValue && newSegmentValue !== '6' && !soundPlayed) {
                    this.playRWYCCChangedSound();
                    soundPlayed = true; // Prevent further sound playback this cycle
                    break; // Optional: exit the segment loop early if sound playback is needed only once
                }
                
            }
            if (soundPlayed) {
                break; // Exit the runway loop early if sound playback is needed only once
            }
        }
    },

    checkForRWYWetorSlippery(){
      let soundPlayed = false; // Flag to prevent playing the sound multiple times
        const runways = [this.parsedRCRData.EastRWY, this.parsedRCRData.WestRWY];
        runways.forEach(runway => {
            const segments = ['rwyccTDZ', 'rwyccMID', 'rwyccEND'];
            segments.forEach(segment => {
                if(runway[segment] === '3' && !soundPlayed){
                    this.playRWYSlipperyWetSound();
                    soundPlayed = true;
                }
                else if(runway[segment] === '5' && !soundPlayed){
                    this.playRWYWetSound();
                    soundPlayed = true;
                }
            });
        });
    },

    checkForRWYType(){
      let soundPlayed = false; // Flag to prevent playing the sound multiple times
        const runways = [this.parsedRCRData.EastRWY, this.parsedRCRData.WestRWY];
        runways.forEach(runway => {
            const segments = ['typeTDZ', 'typeMID', 'typeEND'];
            segments.forEach(segment => {
                if(runway[segment] === 'SLUSH' && !soundPlayed){
                    this.playSlushOnRWYSound();
                    soundPlayed = true;
                }
                else if(runway[segment] === 'STANDING WATER' && !soundPlayed){
                    this.playStandingWaterOnRWYSound();
                    soundPlayed = true;
                }
            });
        });
    },


    checkForAllSix(){
       const runways = [this.parsedRCRData.EastRWY, this.parsedRCRData.WestRWY];
       const allSegmentsSix = runways.every(runway => {
            // Check if each runway segment (TDZ, MID, END) has RWYCC of "6"
            return ['rwyccTDZ', 'rwyccMID', 'rwyccEND'].every(segment => runway[segment] === '6');
        });
       if(allSegmentsSix){
           this.playRWYCCResumeNormalSound();
           //console.log('All segments are 6');
       }
    },

    determineDirection(newVal, oldVal, runway, segment) {
    let direction = '';
    if (parseInt(newVal) > parseInt(oldVal)) {
      direction = 'up';
    } else if (parseInt(newVal) < parseInt(oldVal)) {
      direction = 'down';
    }

    // Update the direction immediately
    this.arrowDirections[runway][segment] = direction;

    // Reset the direction after 10 seconds
    if (direction) { // Only set a timeout if there's a change
      setTimeout(() => {
        this.arrowDirections[runway][segment] = '';
      }, 10000); // 10000 milliseconds = 10 seconds
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
    padding-top: 1.2em;
}
.topic {
    margin-bottom: 1em;
}
.space {
    margin-bottom: 0.5em;
}
.first-rwy, .second-rwy  {
    display: flex;
    flex-direction: row;
    border: solid 2px black;
    height: 100%;
    padding: 1em;
    background-color: lightgrey;
    align-items: center;
    
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
    position: relative !important;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
.arrow-up-down {
    position: absolute !important;
    top: 125%;
    right: 0;
    
}

p {
    font-weight: bold;
    font-size: 1.5em;
}
.tag {
    font-size: 1.2em;
    font-weight: bold;
    
}

</style>
