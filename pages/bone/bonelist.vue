<template>
  <div class="container">
    <h2 class="header">โครงกระดูก</h2>

    <v-text-field
      v-model="search"
      append-icon="mdi-magnify"
      label="Search"
      single-lined
      hide-details
      dense
    />

    <div class="bonelist">
      <nuxt-link
        v-for="item in bonelist"
        :key="item"
        :to="`/bone/${item.id}`"
        :search="search"
        class="bone_name_list"
      >
        <p class="link">{{ item.thaiName }}</p>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import { getAnimal } from '@/service/animal'
export default {
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      bonelist: [],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      search: '',
      title: 'Vuetify.js',
      
    }
  },
  mounted() {
    getAnimal().then((res) => {
      console.log(res.data)
      this.bonelist = res.data
    })
  },
}
</script>

<style lang="scss" scoped>
.container{
  margin-bottom: 20rem;
}
.bone_name_list {
  text-align: center;
  margin-top: 4rem;
}

.bonelist {
  display: grid;
  width: 100%;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-gap: 1rem;
  align-items: center;
  margin: 50px 0px 20px 0px;
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
</style>
