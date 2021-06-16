<template>
  <div class="container">
    <h2 class="header">โครงกระดูก</h2>
    <div v-if="bonelist">
      <v-text-field
        v-model="searchString"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
        dent
      ></v-text-field>
    </div>

    <div v-if="bonelist" class="bonelist">
      <nuxt-link
        v-for="item in boneSearch"
        :key="item.id"
        :to="`/bone/${item.id}`"
        class="bone_name_list"
      >
        <v-img
          class="img-resize"
          :src="`https://localhost:44351/api/image/${item.imgPath}`"
        ></v-img>

        <p class="link">{{ item.thaiName }}</p>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import { getAnimal } from '@/service/animal'
import Vue from 'vue'
export default Vue.extend({
  layout: 'visitor',
  data() {
    return {
      bonelist: [],
      searchString: '',
      title: 'Vuetify.js',
    }
  },
  computed: {
    boneSearch() {
      function compare(a, b) {
        if (a.thaiName < b.thaiName) return -1
        if (a.thaiName > b.thaiName) return 1
        return 0
      }
      return this.bonelist
        .filter((item) => {
          return item.thaiName.includes(this.searchString)
        })
        .sort(compare)
    },
  },
  mounted() {
    getAnimal().then((res) => {
      console.log('bonelist', res.data)
      this.bonelist = res.data
      this.bonelist.forEach((item) => {
        item.imgPath = item.imgPath[0].split(',')[0]
      })
    })
  },
})
</script>

<style lang="scss" scoped>
.container {
  margin-bottom: 20rem;
}

.bonelist {
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
