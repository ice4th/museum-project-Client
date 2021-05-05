<template>
  <div class="container">
    <h2 class="header">อวัยวะสัตว์</h2>

    <v-text-field
      v-model="search"
      append-icon="mdi-magnify"
      label="Search"
      single-lined
      hide-details
      dense
    />

    <div class="organlist">
      <nuxt-link
        v-for="item in organ"
        :key="item"
        :to="`/organ/${item.id}`"
        :search="search"
        class="organ_name_list"
      >
        <p class="link">{{ item.nameTh }}</p>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import { getOrgan } from '@/service/organ'
export default {
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      organ: [],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js',
      search: '',
    }
  },
  mounted() {
    getOrgan().then((res) => {
      console.log(res.data)
      this.organ = res.data
    })
  },
  methods: {},
}
</script>

<style>
.organ_name_list {
  text-align: center;
margin-top: 4rem;
}
.organlist {
  display: grid;
  width: 100%;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-gap: 1rem;
  align-items: center;
  margin: 50px 0px 20px 0px;
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
