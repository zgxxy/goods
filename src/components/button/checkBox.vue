<template>
  <div>
    <li
      v-for="(item, index) in data"
      :key="index"
      class="nav_item"
      @click="clickItem(index, data)"
      :class="{ active: item.checked }"
      :style="[{ cursor: item.disabled == true ? 'not-allowed' : 'pointer' }]"
    >
      {{ item.name }}
    </li>
  </div>
</template>
<script>
export default {
  name: 'checkbox',
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {}
  },
  methods: {
    //标签点击事件
    clickItem(index, list, item) {
      const temp = list[index]
      temp.checked = !list[index].checked
      if (list[index].disabled == true) {
        list[index].checked = false
      }
      this.$set(list, index, temp)
    },
  },
}
</script>

<style lang="scss" scope>
//标签样式
.nav_item {
  display: flex;
  min-width: 76px !important;
  height: 35px;
  line-height: 15px;
  background: #f8fafc;
  color: #999999;
  font-size: 12px;
  font-weight: 400;
  padding: 10px;
  text-align: center;
  display: inline-block;
  margin-right: 12px;
  border-radius: 2px;
  border: 1px solid #cbcbcb;
  cursor: pointer;
}
.nav_item:hover,
.nav_item.active {
  color: #418ff6;
  background: rgba(65, 143, 246, 0.1);
  border-radius: 2px;
  border: 1px solid #418ff6;
}
</style>
