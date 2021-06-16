<template>
  <div class="organinfo">
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
    <h2>{{ organ && organ.nameTh }} ({{ organ && organ.nameEng }})</h2>
    <p><b>รายละเอียด: </b>{{ organ && organ.description }}</p>
  </div>
</template>

<script>
import { getOrganById } from '@/service/organ'
import Vue from 'vue'
export default Vue.extend({
  layout: 'visitor',
  data: () => ({
    organ: [],
    items: [],
    allImg: {},
    a: [],
  }),
  mounted() {
    this.getOrgan()
  },
  methods: {
    getOrgan() {
      getOrganById(this.$route.params.id).then((res) => {
        this.organ = res.data
        this.allImg = this.organ.imgPath
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
.container {
  margin-bottom: 3em;
}
.organinfo {
  margin-top: 3rem;
  margin-bottom: 10rem;
}
</style>
