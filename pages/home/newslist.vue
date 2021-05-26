<template>
  <div class="container">
    <h2 class="header">ข่าว</h2>
    <v-text-field
      v-model="search"
      append-icon="mdi-magnify"
      label="Search"
      single-lined
      hide-details
      dense
    />
    <div class="newslist">
      <nuxt-link
      v-for="item in newslist"
      :key="item"
      :to="`/home/${item.id}`"
      :search="search"
      class="news_list"
    >
      <p class="link" color="black">{{ item.title }}</p>
    </nuxt-link>
    </div>
    
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
      search: '',
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
.header {
  margin-bottom: 3rem;
}
.news_list {
  text-align: center;
  margin-top: 4rem;
  
}

.newslist{
  margin-top: 3rem;

}
:link {
  text-decoration: none;
}
p.link{
  // border-style: solid;
  // border-width: thin;
  // border-radius: 0.5em ;
  // border-color: gray;
  color: black;
}
.link:hover{
  color:goldenrod;
}
</style>
