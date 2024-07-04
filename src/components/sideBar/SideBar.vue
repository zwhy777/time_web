<template>
  <div class="sidebar">
    <ul>
      <li v-for="item in menuItems" :key="item.id" :class="{ active: item.isActive }" @click="navigateTo(item.route)">
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menuItems: [
        { id: 1, name: '行程', isActive: true, route: 'index' },
        { id: 2, name: '每周概况', isActive: false, route: 'week' },
        { id: 3, name: '每月概况', isActive: false, route: 'month' },
        { id: 4, name: '每年概况', isActive: false, route: 'year' },
        // 添加更多菜单项...
      ]
    };
  },
  methods: {
    navigateTo(route) {
      this.menuItems.forEach(item => {
        item.isActive = (item.route === route);
      });
      this.$router.push({ name: route });
    }
  }
};
</script>

<style>
.sidebar {
  width: 200px;
  background-color: #20232a;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  /* 添加其他样式，如滚动条等 */
}

.sidebar ul {
  list-style-type: none;
  padding: 0;
}

.sidebar li {
  padding: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  color: #fff;
}

.sidebar li:hover {
  background-color: #3a3f4b;
}

.sidebar li.active {
  background-color: #4f5462;
  font-weight: bold;
}
</style>
