<template>
  <div class="container">
    <h2 class="header">ประเภทสัตว์</h2>

    <v-text-field
      v-model="search"
      append-icon="mdi-magnify"
      label="Search"
      single-lined
      hide-details
      dense
    />
    <div class="boneType">
      <nuxt-link
        v-for="item in items"
        :key="item"
        :to="`/bone/boneType/${item.id}`"
        :search="search"
        class="bone_name_type"
      >
        <p class="link">{{ item.nameEng }}</p>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import { getAnimalType } from '@/service/animalType'
export default {
  data() {
    return {
      search: '',
      clipped: false,
      drawer: false,
      fixed: false,
      items: [],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js',
    }
  },
  mounted() {
    getAnimalType().then((res) => {
      console.log(res.data)
      this.items = res.data
    })
  },
  methods: {},
}
</script>
<style lang="scss" scoped>
.bone_name_type {
  text-align: center;
  margin-top: 4rem;
}
.boneType {
  display: grid;
  width: 100%;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-gap: 1rem;
  align-items: center;
  margin: 50px 0px 20px 0px;
}
.container {
  text-align: center;
  margin-top: 0;
}
.header{
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
</style>
