<template>
  <div class="container">
    <h2 class="header">ข่าว</h2>
    <div v-if="newslist">
      <v-text-field
        v-model="searchString"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
        dent
      ></v-text-field>
    </div>

    <div v-if="newslist" class="newslist">
      <nuxt-link
        v-for="item in newsSearch"
        :key="item.id"
        :to="`/home/${item.id}`"
        class="news_list"
      >
        <div class="n-box">
          <v-img
            class="img-resize"
            :src="`https://localhost:44351/api/image/${item.imgPath}`"
          ></v-img>
          <p class="link" color="black">{{ item.title }}</p>
        </div>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import { getNews } from '@/service/news'
import Vue from 'vue'
export default Vue.extend({
  layout: 'visitor',
  data() {
    return {
      searchString: '',
      newslist: [],
      title: 'Vuetify.js',
    }
  },
  computed: {
    newsSearch() {
      function compare(a, b) {
        if (a.title < b.title) return -1
        if (a.title > b.title) return 1
        return 0
      }
      return this.newslist
        .filter((item) => {
          return item.title.includes(this.searchString)
        })
        .sort(compare)
    },
  },
  mounted() {
    getNews().then((res) => {
      console.log('news', res.data)
      this.newslist = res.data
      this.newslist.forEach((item) => {
        item.imgPath = item.imgPath[0].split(',')[0]
      })
    })
  },
  methods: {},
})
</script>

<style lang="scss" scoped>
.header {
  margin-bottom: 3rem;
}
.news_list {
  text-align: start;
  margin-top: 4rem;
}

.newslist {
  text-decoration: none;
}
:link {
  text-decoration: none;
}
.n-box {
  display: grid;
  width: 100%;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-gap: 1rem;
  align-items: center;
  margin: 50px 10px 20px 10px;
}
.link {
  color: black;
}
.link:hover {
  color: goldenrod;
}
.img-resize {
  width: 300px;
  height: 300px;
  overflow: hidden;
  text-align: center;
}
</style>
