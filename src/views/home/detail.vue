<template>
  <div>
    <div class="message_box">
      <div class="image">
        <el-image
          :src="data.row.url"
          style="width: 100px; height: 100px;"
        ></el-image>
      </div>
      <div class="data">
        <div class="title">{{ data.row.serviceName }}</div>
        <div class="price_box line_box">
          <div class="line_box">
            价格：
            <span style="color: #d81e06; font-weight: 900;">
              {{ data.row.unitPrice }}
            </span>
          </div>
          <div class="line_box" style="display: flex; align-items: center;">
            规格：
            <checkbox :data="specification"></checkbox>
          </div>
        </div>
        <div class="edit_box">
          <div class="line_box">
            数量：
            <el-input-number v-model="num" :min="0"></el-input-number>
            <el-button type="primary">立即购买</el-button>
            <el-button>测试</el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="tab_box" v-if="data.tabList.length > 0">
      <el-tabs v-model="activeName" type="border-card" class="tab">
        <el-tab-pane
          v-for="(item, index) in data.tabList"
          :key="'tab' + index"
          :label="item.label"
          :name="item.name"
        >
          <div>
            <el-table
              :data="item.tableData"
              :show-header="false"
              style="width: 100%;"
            >
              <el-table-column prop="name" width="80">
                <template slot-scope="scope">
                  <div style="font-weight: 900;">
                    {{ scope.row.name + '：' }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="value">
                <template slot-scope="scope">
                  <div style="text-align: left;">
                    {{ scope.row.value }}
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import checkbox from '@/components/button/checkBox'
export default {
  name: '',
  components: {
    checkbox,
  },
  data() {
    return {
      data: this.$route.query,
      num: '', //数量
      activeName: '0', //tab
      specification: [
        {
          name: '按次-5000次',
          checked: false,
        },
        {
          name: '按次-10000次',
          checked: false,
        },
        {
          name: '包月',
          checked: false,
        },
        {
          name: '包年',
          checked: false,
        },
      ], //规格
    }
  },
  created() {
    console.log(this.data, '参数')
  },
  methods: {},
}
</script>
<style lang="scss" scoped>
.message_box {
  display: flex;
  margin-bottom: 10px;
  .image {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #dedede;
    width: 170px;
    margin-right: 10px;
    height: auto;
  }
  .title {
    font-weight: 900;
    margin-bottom: 10px;
  }
  .data {
    flex: 1;
    text-align: left;
    border: 1px solid #dedede;
    padding: 10px;
  }
  .line_box {
    margin-bottom: 10px;
  }
  .price_box {
    background: #f0f2f3;
    padding: 10px;
  }
  .edit_box {
    padding: 0 10px;
    display: flex;
    align-items: center;
    :first-child {
      margin-right: 5px;
    }
  }
}
</style>
