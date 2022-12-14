<template>
  <div class="histogram">
    <h3 class="chart-title">Histogram Chart</h3>
    <template v-if="dataList && dataList.length">
      <v-chart
        :forceFit="true"
        :height="height"
        :data="chartData"
        :scale="scale"
      >
        <v-tooltip :crosshairs="false" :inPlot="false" position="top" />
        <v-axis dataKey="value" :label="label" />
        <v-bar position="value*count" />
      </v-chart>
    </template>
    <template v-else>
      <h4 class="no-data">No Data found</h4>
    </template>
  </div>
</template>

<script>
import util from "../../utils";
const DataSet = require("@antv/data-set");
import { mapState } from "vuex";

const formatter = (val) => {
  if (val % 2) {
    return val;
  }
  return "";
};

export default {
  name: "XBarRHistogramChart",

  data() {
    return {
      scale: [
        {
          dataKey: "value",
          nice: false,
          min: 0,
          max: 1,
          tickInterval: 1
        }
      ],
      height: 350,
      label: {
        formatter: formatter
      }
    };
  },

  computed: {
    ...mapState("xBarRChartDataModule", ["dataList", "dataset"]),

    chartData() {
      let values = this.dataList.map((obj) => Object.values(obj.values));
      values = [].concat(...values);
      const dataAverage = Math.floor(this.dataset.average);
      const binWidth = Math.ceil(dataAverage);
      let minScale = Math.min(...values) || 0;
      let maxScale = Math.max(...values) + binWidth;
      // must be an odd number
      let tickInterval = binWidth % 2 === 0 ? binWidth - 1 : binWidth;

      if (tickInterval < 1) tickInterval = 1;
      if (minScale < binWidth) minScale = 0;
      if (maxScale < binWidth) maxScale = binWidth;

      this.scale[0].min = minScale;
      this.scale[0].max = maxScale;
      this.scale[0].tickInterval = tickInterval;

      const sourceData = values.map((value) => ({ value }));
      const dv = new DataSet.View().source(sourceData);

      dv.transform({
        type: "bin.histogram",
        field: "value",
        binWidth,
        as: ["value", "count"]
      });

      return dv.rows.map((obj) => {
        if (obj.value && obj.value.length) {
          obj.value = obj.value.map((v) => util.formatNumber(v));
        }
        return obj;
      });
    }
  }
};
</script>

<style scoped>
.histogram {
  margin: 25px 5px;
  position: relative;
  width: 100%;
  margin-bottom: 0px;
}

.chart-title {
  text-align: center;
}

.no-data {
  color: grey;
  text-align: center;
}
</style>
