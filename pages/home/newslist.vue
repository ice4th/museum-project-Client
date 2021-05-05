<template>
  <div class="Newslist">
    <nuxt-link
      v-for="item in newslist"
      :key="item"
      :to="`/home/${item.id}`"
      class="news_list"
    >
      <p class="link" color="black">{{ item.title }}</p>
    </nuxt-link>
  </div>
</template>

<script>
import { getNews } from '@/service/news'
export default {
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      newslist: [],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js',
    }
  },
  mounted() {
    getNews().then((res) => {
      console.log(res.data)
      this.newslist = res.data
    })
  },
  methods: {},
}
</script>

<style lang="scss" scoped>
:link {
  text-decoration: none;
}
.link{
  color: black;
}
.link:hover{
  color:goldenrod;
}
</style>
