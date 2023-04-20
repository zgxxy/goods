<template>
  <div>
    <div v-show="!loading">
      <el-tabs
        v-model="activeName"
        type="border-card"
        @tab-click="handleClick"
        class="tab"
      >
        <el-tab-pane
          v-for="(item, index) in tabList"
          :key="'tab' + index"
          :label="item.label"
          :name="item.name"
        >
          <div class="list_box" v-if="item.dataList">
            <div
              class="data_box"
              v-for="(value, inx) in item.dataList"
              :key="'service' + inx"
              @click="goDetail(value)"
            >
              <div class="serviceName">{{ value.serviceName }}</div>
              <el-image
                :src="value.url"
                style="width: 50px; height: 50px;"
              ></el-image>
              <div class="gray_box" v-if="value.unitPrice">
                {{ value.unitPrice ? value.unitPrice + ' / 次' : '--' }}
              </div>
              <div>{{ value.API }}</div>
            </div>
          </div>
          <el-empty v-else description="暂无数据" style="height: 100%;" />
        </el-tab-pane>
      </el-tabs>
    </div>
    <!-- 骨架start -->
    <el-skeleton :loading="loading" animated>
      <template #template>
        <el-card
          class="avatar"
          style="display: flex; justify-content: flex-start;"
        >
          <!--
          <el-skeleton-item
            variant="text"
            style="width: 500px; height: 40px;"
          />
          -->
          <div style="height: 30px;"></div>
          <div class="list_box">
            <div
              v-for="item in 8"
              :key="'tab1' + item"
              class="data_box"
              style="
                max-width: 252px;
                height: 149px;
                margin-bottom: 20px;
                display: flex;
                flex-direction: column;
                align-items: center;
              "
            >
              <el-skeleton-item
                variant="text"
                style="max-width: 180px; height: 20px;"
              />
              <el-skeleton-item
                variant="text"
                style="width: 50px; height: 50px; margin-top: 5px;"
              />
              <el-skeleton-item
                variant="text"
                style="width: 100px; height: 20px; margin-top: 5px;"
              />
              <el-skeleton-item
                variant="text"
                style="width: 70px; height: 20px; margin-top: 5px;"
              />
            </div>
          </div>
        </el-card>
      </template>
    </el-skeleton>
    <!-- 骨架end -->
  </div>
</template>
<script>
export default {
  name: '',
  data() {
    return {
      activeName: '0',
      tabList: [],
      dataList: [],
      loading: true,
    }
  },
  watch: {
    tabList(v) {
      if (v) {
        this.loading = false
        console.log(this.loading, 'loading')
      }
    },
  },
  created() {
    setTimeout(() => {
      this.getList()
    }, 2000)
  },
  methods: {
    getList() {
      this.tabList = [
        {
          label: '画像数据',
          name: '0',
          dataList: [
            {
              serviceName: '客户画像特征查询',
              url: require('@/assets/apiImages/identity.svg'),
              // unitPrice: '0.1',
              API: 'api',
            },
            {
              serviceName: '常驻地查询',
              // unitPrice: '0.1',
              url: '',
              API: 'api',
            },
            {
              serviceName: '消费水平查询',
              url: '',
              // unitPrice: '0.1',
              API: 'api',
            },
            {
              serviceName: '收入水平查询',
              url: require('@/assets/apiImages/income.svg'),
              unitPrice: '0.1',
              API: 'api',
            },
            {
              serviceName: '最近到访4s品牌店',
              url: '',
              unitPrice: '1',
              API: 'api',
            },
            {
              serviceName: '客户到附近4s店距离',
              url: '',
              unitPrice: '1',
              API: 'api',
            },
            {
              serviceName: 'APP偏好',
              url: '',
              unitPrice: '0.1',
              API: 'api',
            },
            {
              serviceName: '兴趣偏好',
              url: '',
              unitPrice: '0.1',
              API: 'api',
            },
            {
              serviceName: '兴趣偏好',
              url: '',
              unitPrice: '0.1',
              API: 'api',
            },
          ],
        },
        {
          label: '手机信息',
          name: '1',
        },
        {
          label: '车辆数据',
          name: '2',
        },
        {
          label: '商业数据',
          name: '3',
        },
        {
          label: '城市数据',
          name: '4',
        },
      ]
      if (this.tabList.length > 0) {
        this.loading = false
      } else {
        this.loading = true
      }
    },
    //tab切换事件
    handleClick() {},
    //详情页
    goDetail(row) {
      let tabList = [
        {
          label: 'API接口',
          name: '0',
          tableData: [
            {
              name: '业务标识',
              value: 'PhonePI',
            },
            {
              name: '接口地址',
              value: 'https://lanyou.cdp.com',
            },
            {
              name: '请求方式',
              value: 'HTTPS GET POST',
            },
          ],
        },
        {
          label: '介绍说明',
          name: '1',
        },
        {
          label: '查询码说明',
          name: '2',
        },
        {
          label: '测试',
          name: '3',
        },
      ]
      this.$router.push({
        path: '/home/detail',
        query: {
          row: row,
          tabList: tabList,
        },
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.avatar {
  border: solid 1px #dedede;
  height: calc(100vh - 160px);
}
.list_box {
  overflow-y: auto;
  max-height: calc(100vh - 250px);
  // height: calc(100vh - 233px);
  display: flex;
  flex-wrap: wrap;
  padding: 0 10px;
  margin-bottom: 20px;
  .data_box {
    cursor: pointer;
    width: calc((100% - 60px) / 4);
    border: 1px solid #dedede;
    border-radius: 3px;
    padding: 10px;
    margin: 0 20px 20px 0;
    &:nth-child(4n) {
      margin-right: 0;
    }
    :nth-child(n + 1) {
      margin-bottom: 5px;
    }
  }
  .serviceName {
    font-weight: 900;
  }
  .gray_box {
    color: gray;
  }
}
/deep/.el-image__error {
  font-size: 12px;
}
/deep/.tab .el-tabs__item {
  // font-size: 12px;
}
</style>
