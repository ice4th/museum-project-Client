<template>
  <div class="newsdetail">
    <h3>{{ news && news.title }}</h3>
    <br />
    <small> เขียนเมื่อ: {{ news && news.authorDate }} </small>
    <div class="container">
      <v-carousel>
        <v-carousel-item
          v-for="(item, i) in items"
          :key="i"
          :src="item.src"
          reverse-transition="fade-transition"
          transition="fade-transition"
        ></v-carousel-item>
      </v-carousel>
    </div>

    <p class="pt-12">{{ news && news.description }}</p>
  </div>
</template>

<script>
import { getNewsById } from '@/service/news'
export default {
  data: () => ({
    news: [],
    items:[],
  }),
  mounted() {
    this.getNews()
  },
  methods: {
    getNews() {
      getNewsById(this.$route.params.id).then((res) => {
        console.log(res.data)
        this.news = res.data
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.newsdetail {
  padding-top: 3rem;
}
.newsdetail small {
  font-size: 12px;
  color: gray;
}
</style>
