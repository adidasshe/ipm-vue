<template>
  <div>
    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="4">
        <div class="grid-content bg-purple">
          <div class="component-item">
            <mallki class-name="mallki-text" text="当前设备ID" />
          </div>
          <el-input v-model="device_id" placeholder="当前设备"></el-input>
        </div>
      </el-col>
      
    </el-row>
    <br />
    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="grid-content bg-purple">
           <span>1路开关</span>
          <br />
          <el-switch
            :width="100"
            :active-value="1"
            :inactive-value="0"
            v-model="switch1"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="setSwitch1"
          ></el-switch>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="grid-content bg-purple-light">
           <span>2路开关</span>
          <br />
          <el-switch
            :width="100"
            :active-value="1"
            :sinactive-value="0"
            v-model="switch2"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="setSwitch2"
          ></el-switch>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="grid-content bg-purple">
           <span>3路开关</span>
          <br />
          <el-switch
            :width="100"
            :active-value="1"
            :sinactive-value="0"
            v-model="switch3"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="setSwitch3"
          ></el-switch>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="grid-content bg-purple">
           <span>1路漏电阈值</span>
          <br />
          <el-input-number
            v-model="valueData.leakage_current_set1"
            placeholder="请选择漏电阈值"
            :max="800"
            :min="100"
            :step="100"
          ></el-input-number>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="grid-content bg-purple-light">
           <span>2路漏电阈值</span>
          <br />
          <el-input-number
            v-model="valueData.leakage_current_set2"
            placeholder="请选择漏电阈值"
            :max="800"
            :min="100"
            :step="100"
          ></el-input-number>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="grid-content bg-purple">
           <span>3路漏电阈值</span>
          <br />
          <el-input-number
            v-model="valueData.leakage_current_set3"
            placeholder="请选择漏电阈值"
            :max="800"
            :min="100"
            :step="100"
          ></el-input-number>
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="grid-content bg-purple">
           <span>功率因素阈值</span>
          <br />
          <el-input-number
            v-model="valueData.power_factor_set1"
            placeholder="功率因素阈值"
            :max="2.5"
            :min="0"
            :step="0.5"
          ></el-input-number>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="grid-content bg-purple-light">
           <span>CT变比</span>
          <br />
          <el-input-number v-model="valueData.ct_var_value" placeholder="CT变比" :step="10"></el-input-number>
        </div>
      </el-col>
    
    </el-row>

   
    <el-button class="pan-btn pink-btn" type="primary" @click="setValueData">设置阈值</el-button>
  </div>
</template>

<script>
import Mallki from "@/components/TextHoverEffect/Mallki";
import { getValue } from "@/api/value";
import { setControl } from "@/api/control";
export default {
  data() {
    return {
      // value: false,
      switch1: 0,
      switch2: 0,
      switch3: 0,
      valueData: {
        ct_var_value: 0,
        power_factor_set1: 0,
        leakage_current_set1: 0,
        leakage_current_set2: 0,
        leakage_current_set3: 0
      },
      options: [
        {
          value: "100",
          label: "100"
        },
        {
          value: "200",
          label: "200"
        },
        {
          value: "300",
          label: "300"
        },
        {
          value: "400",
          label: "400"
        },
        {
          value: "500",
          label: "500"
        },
        {
          value: "600",
          label: "600"
        },
        {
          value: "700",
          label: "700"
        },
        {
          value: "800",
          label: "800"
        }
      ],
      temp: {
        switch1: 0,
        switch2: 0,
        switch3: 0,
        name: "",
        device_id: "",
        leakage1: 0,
        leakage2: 0,
        leakage3: 0,
        power: 0,
        ct: 0
      }
    };
  },
  components: {
    Mallki
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
        getValue(val).then(Reponse => {
          if (Reponse.data == "") {
            console.log("无此条设备阈值");
          } else {
            this.valueData = Reponse.data[0];
          }
        });
      }
    }
  },
  mounted() {
    this.getValueData();
  },
  methods: {
    handleData() {
      this.temp.device_id = this.$store.getters.device_id;
      this.temp.name = this.$store.getters.name;
      this.temp.switch1 = this.switch1;
      this.temp.switch2 = this.switch2;
      this.temp.switch3 = this.switch3;
      this.temp.leakage1 = this.valueData.leakage_current_set1;
      this.temp.leakage2 = this.valueData.leakage_current_set2;
      this.temp.leakage3 = this.valueData.leakage_current_set3;
      this.temp.power = this.valueData.power_factor_set1;
      this.temp.ct = this.valueData.ct_var_value;
    },
    setSwitch1(val) {
      // console.log(typeof val);
      this.handleData();
      this.temp.switch2 = 0;
      this.temp.switch3 = 0;
      const tempData = Object.assign({}, this.temp);
      console.log(tempData);
      if (val == 1) {
        this.$confirm("闭合开关1?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            if (this.temp.device_id == "") {
              this.$message.error("请选择设备！");
            } else {
              console.log(this.temp.device_id, this.temp.name);
              //上传操作到数据库
              setControl(tempData).then(Response => {
                this.$message({
                  type: "success",
                  message: Response.success
                });
              });
            }
            this.switch1 = 0;
          })
          .catch(() => {
            this.switch1 = 0;
            this.$message({
              type: "info",
              message: "已取消开关1操作"
            });
          });
      }
    },
    setSwitch2(val) {
      this.handleData();
      //由于单片机设备每次都需要接收全部参数，所以要这样写！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！
      this.temp.switch1 = 0;
      this.temp.switch3 = 0;
      const tempData = Object.assign({}, this.temp);
      console.log(tempData);
      if (val == 1) {
        this.$confirm("闭合开关1?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            if (this.temp.device_id == "") {
              this.$message.error("请选择设备！");
            } else {
              //上传操作到数据库
              setControl(tempData).then(Response => {
                this.$message({
                  type: "success",
                  message: Response.success
                });
              });
            }
            this.switch2 = 0;
          })
          .catch(() => {
            this.switch2 = 0;
            this.$message({
              type: "info",
              message: "已取消开关2操作"
            });
          });
      }
    },
    setSwitch3(val) {
      this.handleData();
      this.temp.switch1 = 0;
      this.temp.switch2 = 0;
      const tempData = Object.assign({}, this.temp);
      console.log(tempData);
      if (val == 1) {
        this.$confirm("闭合开关1?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            if (this.temp.device_id == "") {
              this.$message.error("请选择设备！");
            } else {
              console.log(this.temp.device_id, this.temp.name);
              //上传操作到数据库
              setControl(tempData).then(Response => {
                this.$message({
                  type: "success",
                  message: Response.success
                });
              });
            }
            this.switch3 = 0;
          })
          .catch(() => {
            this.switch3 = 0;
            this.$message({
              type: "info",
              message: "已取消开关3操作"
            });
          });
      }
    },
    setValueData() {
      this.handleData();
      this.temp.switch1 = 0;
      this.temp.switch2 = 0;
      this.temp.switch3 = 0;
      const tempData = Object.assign({}, this.temp);
      this.$confirm("设置阈值？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          if (this.temp.device_id == "") {
            this.$message.error("请选择设备！");
          } else {
            //上传操作到数据库
            setControl(tempData).then(Response => {
              this.$message({
                type: "success",
                message: Response.success
              });
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消阈值设置"
          });
        });
    },
    getValueData() {
      let device_id = this.$store.getters.device_id;
      getValue(device_id).then(Reponse => {
        if (Reponse.data == "") {
          // console.log("无此条设备阈值");
        } else {
          this.valueData = Reponse.data[0];
        }
      });
    }
  }
};
</script>

<style  scoped>
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
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
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
