<template>
  <div class="map">
    <!--    <baidu-map :center="center" :zoom="zoom" @ready="handler"></baidu-map>-->
    <!--    <baidu-map class="map" center="衡阳县"></baidu-map>-->

    <baidu-map class="map" center="桂林市" :zoom="15" :scroll-wheel-zoom="true">
      <!--    <bm-view style="width: 100%; height:100px; flex: 1"></bm-view>-->
      <!--    比例尺-->
      <!--    <bm-scale anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-scale>-->
      <!--    地图类型-->
      <bm-map-type
        :map-types="['BMAP_NORMAL_MAP', 'BMAP_HYBRID_MAP']"
        anchor="BMAP_ANCHOR_TOP_LEFT"
      ></bm-map-type>
      
      <bm-city-list anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-city-list>
      <bm-marker
        :position="{lng: 110.3579600583, lat: 25.2356658399}"
        :dragging="true"
        animation="BMAP_ANIMATION_BOUNCE"
      >
        <bm-label
          content="力子科技"
          :labelStyle="{color: 'red', fontSize : '12px'}"
          :offset="{width:10, height: 25}"
        />
      </bm-marker>

    </baidu-map>
  </div>
</template>

<script>
export default {
  name: "map",
  data() {
    return {
      center: { lng: 0, lat: 0 },
      zoom: 12
    };
  },
  mounted() {},
  methods: {
    handler({ BMap, map }) {
      // console.log(BMap, map);
      this.center.lng = 116.404;
      this.center.lat = 39.915;
      this.zoom = 12;
    }
  }
};
</script>

<style scoped>
.map {
  width: 100%;
  height: 1000px;
}
</style>
