<template>
  <div class="newsdetail">
    <h3>{{ news && news.title }}</h3>
    <p>{{ news && news.description }}</p>
  </div>
</template>

<script>
import { getNewsById } from '@/service/news'
export default {
  data: () => ({
    news: null,
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

<style lang = "scss" scoped>
.newsdetail {
  padding-top: 3rem;
}
</style>
