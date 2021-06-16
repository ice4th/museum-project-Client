<template>
  <div class="container">
    <h2 class="header">อวัยวะสัตว์</h2>
    <div v-if="organlist">
      <v-text-field
        v-model="searchString"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
        dent
      ></v-text-field>
    </div>

    <div v-if="organlist" class="organlist">
      <nuxt-link
        v-for="item in organSearch"
        :key="item.id"
        :to="`/organ/${item.id}`"
        class="organ_name_list"
      >
        <v-img
          class="img-resize"
          :src="`https://localhost:44351/api/image/${item.imgPath}`"
        ></v-img>
        <p class="link">{{ item.nameTh }}</p>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import { getOrgan } from '@/service/organ'
import Vue from 'vue'
export default Vue.extend({
  layout: 'visitor',
  data() {
    return {
      organlist: [],
      title: 'Vuetify.js',
      searchString: '',
    }
  },

  computed: {
    organSearch() {
      function compare(a, b) {
        if (a.nameTh < b.nameTh) return -1
        if (a.nameTh > b.nameTh) return 1
        return 0
      }
      return this.organlist
        .filter((item) => {
          return item.nameTh.includes(this.searchString)
        })
        .sort(compare)
    },
  },

  mounted() {
    getOrgan().then((res) => {
      console.log(res.data)
      this.organlist = res.data
      this.organlist.forEach((item) => {
        item.imgPath = item.imgPath[0].split(',')[0]
      })
    })
  },
  methods: {},
})
</script>

<style>

.organlist {
  display: grid;
  width: 100%;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-gap: 1rem;
  align-items: center;
  margin: 50px 10px 20px 10px;
}

.header {
  margin-bottom: 3rem;
}
:link {
  text-decoration: none;
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
