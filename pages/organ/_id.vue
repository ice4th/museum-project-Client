<template>
  <div class="organinfo">
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
    <h2>{{ organ && organ.nameTh }} ({{ organ && organ.nameEng }})</h2>
    <p><b>รายละเอียด: </b>{{ organ && organ.description }}</p>
  </div>
</template>

<script>
import { getOrganById } from '@/service/organ'
export default {
  data: () => ({
    organ: null,
    items: [],
  }),
  mounted() {
    this.getOrgan()
  },
  methods: {
    getOrgan() {
      getOrganById(this.$route.params.id).then((res) => {
        console.log(res.data)
        this.organ = res.data
      })
    },
  },
}
</script>
<style></style>
