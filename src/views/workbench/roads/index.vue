<template>
  <div dashboard-editor-container>
   
     <el-row :gutter="32">
      <el-col :xs="12" :sm="12" :lg="4">
        <div class="grid-content bg-purple">
          <br />
          <span>当前设备ID</span>
          <el-input v-model="device_id" placeholder="当前设备"></el-input>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="4">
        <div class="grid-content bg-purple-light">
          <br />
          <span>设备采集时间</span>
          <el-input v-model="deviceData.date" placeholder="设备采集时间"></el-input>
        </div>
      </el-col>
    </el-row>
    <br />
    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="24">
        <div class="grid-content bg-purple">
          <br />
          <span>电容投切</span>
          <capacitance :chartData="deviceData" height="100%" width="100%" />
        </div>
      </el-col>
      <br>s
      <el-col :xs="24" :sm="24" :lg="24">
        <div class="grid-content bg-purple-light">
          <br />
          <span>详细开关相序</span>
          <treeSwitch :chartData="deviceData" height="100%" width="100%" />
        </div>
      </el-col>
    </el-row>
    
  </div>
</template>

<script>
import { deviceData } from "@/api/deviceData";
import capacitance from "./charts/capacitance";
import treeSwitch from "./charts/threeSwitch";
export default {
  data() {
    return {
      deviceData: {}
    };
  },
  methods: {
    //获取最新设备数据
    getDeviceData() {
      let data = this.device_id;
      deviceData(data).then(Response => {
        this.deviceData = Response.data[0];
        this.handleCapData()
        this.handlePsData()
      });
    },
    // 格式化电容数据值1为“开”，0为“关” 
    handleCapData() {
      for (let i = 1; i < 19; i++) {
        let cap = "capacitance_switch" + i;
        if (this.deviceData[cap] == 1) {
          this.deviceData[cap] = "开";
        } else if (this.deviceData[cap] == 0) {
          this.deviceData[cap] = "关";
        }
      }
    },
    // 格式化相序数据值1为“A”，2为“B” ,3为C相
    handlePsData() {
      for (let j = 1; j < 10; j++) {
        let ps = "power_switch" + j;
        let psa = "psa" + j
        let psb = "psb" + j
        let psc = "psc" + j
        if (this.deviceData[ps] == 1) {
          this.deviceData[psa] = "开";
          this.deviceData[psb] = "关";
          this.deviceData[psc] = "关";
        } else if (this.deviceData[ps] == 2) {
          this.deviceData[psb] = "开";
          this.deviceData[psa] = "关";
          this.deviceData[psc] = "关";
        }else if (this.deviceData[ps] == 3) {
          this.deviceData[psa] = "关";
          this.deviceData[psb] = "关";
          this.deviceData[psc] = "开";
        }else{
          this.deviceData[psa] = "关";
          this.deviceData[psb] = "关";
          this.deviceData[psc] = "关";
        }
      }
    },
  },
  computed: {
    device_id() {
      return this.$store.getters.device_id;
    }
  },
  watch: {
    device_id(val, oldVal) {
      // console.log(val, oldVal);
      if (val != oldVal) {
        deviceData(val).then(Reponse => {
          if (Reponse.data == "") {
            // console.log("无此条设备阈值");
          } else {
            this.deviceData = Reponse.data[0];
            this.handleCapData()
            this.handlePsData()
          }
        });
      }
    }
  },
  mounted() {
    this.getDeviceData();
    this.times = window.setInterval(() => {
      setTimeout(this.getDeviceData, 0);
    }, 5 * 1000);
  },
   beforeDestroy() {
    clearInterval(this.times);
  },
  components: {
    capacitance,
    treeSwitch
  }
};
</script>

<style scoped>

 .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
</style>

