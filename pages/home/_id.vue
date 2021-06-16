<template>
  <div class="newsdetail">
    <h3>{{ news && news.title }}</h3>
    <br />
    <small> เขียนเมื่อ: {{ news && WriteDate }} </small>
    <div class="container">
      <v-carousel>
        <v-carousel-item
          v-for="(item, i) in items"
          :key="i"
          :src="item"
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
import Vue from 'vue'
export default Vue.extend({
  layout: 'visitor',
  data: () => ({
    news: [],
    allImg: {},
    a: [],
    items: [],
  }),
  mounted() {
    this.getNews()
  },

  computed: {
    WriteDate() {
      const date = new Date(this.news.authorDate)
      return `${date.getDate()} / ${date.getMonth()} / ${date.getFullYear()}`
    },
  },
  methods: {
    getNews() {
      getNewsById(this.$route.params.id).then((res) => {
        this.news = res.data
        this.allImg = this.news.imgPath
        this.allImg.forEach((item) => {
          this.a.push(item.split(','))
        })
        this.a = this.a.toString().split(',')
        this.a.forEach((item) => {
          console.log(item)
          this.items.push({ src: `https://localhost:44351/api/image/${item}` })
        })
      })
    },
  },
})
</script>

<style lang="scss" scoped>
.newsdetail {
  padding-top: 3rem;
  padding-bottom: 10rem;
}
.newsdetail small {
  font-size: 12px;
  color: gray;
}
</style>
