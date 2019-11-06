<template>
  <div>
    <el-row :gutter="32">
      <el-col :xs="12" :sm="12" :lg="8">
        <div class="grid-content bg-purple">
          <br />
          <span>当前设备ID</span>
          <el-input v-model="device_id" placeholder="当前设备"></el-input>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="8">
        <div class="grid-content bg-purple-light">
          <br />
          <span>设备采集时间</span>
          <el-input v-model="deviceData.date" placeholder="设备采集时间"></el-input>
        </div>
      </el-col>
    </el-row>
    <br />
    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="grid-content bg-purple">
          <mentA :chartData="deviceData" height="100%" width="100%" />
          <switchA :chartData="deviceData" height="100%" width="100%" />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="grid-content bg-purple-light">
          <mentB :chartData="deviceData" height="100%" width="100%" />
          <switchB :chartData="deviceData" height="100%" width="100%" />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="grid-content bg-purple">
          <mentC :chartData="deviceData" height="100%" width="100%" />
          <switchC :chartData="deviceData" height="100%" width="100%" />
        </div>
      </el-col>
    </el-row>

    <div>漏电电流值</div>
    <br />
    <el-row :gutter="1">
      <el-col :span="8">
        <div class="grid-content bg-purple">
          <el-input v-model="deviceData.leakage_current1" placeholder="1路漏电电流"></el-input>
          <el-input v-model="valueData.leakage_current_set1" placeholder="阈值"></el-input>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple-light">
          <el-input v-model="deviceData.leakage_current2" placeholder="2路漏电电流"></el-input>
          <el-input v-model="valueData.leakage_current_set2" placeholder="阈值"></el-input>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple">
          <el-input v-model="deviceData.leakage_current3" placeholder="3路漏电电流"></el-input>
          <el-input v-model="valueData.leakage_current_set3" placeholder="阈值"></el-input>
        </div>
      </el-col>
    </el-row>
    <div>功率因数</div>
    <br />
    <el-row :gutter="1">
      <el-col :span="8">
        <div class="grid-content bg-purple">
          <el-input v-model="deviceData.power_factor1" placeholder="功率因数">功率因数</el-input>
          <el-input v-model="valueData.power_factor_set1" placeholder="阈值"></el-input>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple">
          <el-input v-model="valueData.ct_var_value" placeholder="CT变比"></el-input>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple">
          <el-input v-model="deviceData.unbalanced_state1" placeholder="三相不平衡度"></el-input>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
// import PanThumb from '@/components/PanThumb'
import { deviceData } from "@/api/deviceData";
import { getValue } from "@/api/value";
import switchA from "./switch/switchA";
import switchB from "./switch/switchB";
import switchC from "./switch/switchC";
import mentA from "./ment/mentA";
import mentB from "./ment/mentB";
import mentC from "./ment/mentC";
import leakage from "./leakage/leakage";
export default {
  data() {
    return {
      deviceData: {},
      valueData: {}
    };
  },

  methods: {
    //获取最新设备数据

    getDeviceData() {
      let data = this.device_id;
      console.log(this.$store.getters.device_id);
      deviceData(data).then(Response => {
        this.deviceData = Response.data[0];
        // console.log(this.deviceData.unbalanced_state1);
      });
    },
    //获取设备最新阈值
    getValueData() {
      let device_id = this.$store.getters.device_id;
      getValue(device_id).then(Reponse => {
        if (Reponse.data == "") {
          // console.log("无此条设备阈值")
        } else {
          this.valueData = Reponse.data[0];
        }
      });
    }
  },
  computed: {
    device_id() {
      return this.$store.getters.device_id;
    }
  },
  watch: {
    // device_id:{
    //   handler(){
    //     this.device_id = this.$store.getters.device_id
    //   },
    //   immediate: true
    // }
  },
  mounted() {
    //定时获取服务器设备数据
    // this.device_id = this.$store.getters.device_id
    // console.log(this.$store.getters.device_id)
    this.getDeviceData();
    this.getValueData();
    this.times = window.setInterval(() => {
      setTimeout(this.getDeviceData, 0);
      setTimeout(this.getValueData, 0);
    }, 5 * 1000);
    
  },
  beforeDestroy() {
    clearInterval(this.times);
  },
  components: {
    switchA,
    switchB,
    switchC,
    mentA,
    mentB,
    mentC
  }
};
</script>

<style  scoped>
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
