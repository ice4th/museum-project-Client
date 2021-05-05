<template>
  <div class="bonelist">
    <nuxt-link
      v-for="item in bonelist"
      :key="item"
      :to="`/bone/${item.id}`"
      class="bone_name_list"
    >
      <p class="link">{{ item.thaiName }}</p>
    </nuxt-link>
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
.bone_name_list {
  text-align: center;
}
.bonelist {
  display: grid;
  width: 100%;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-gap: 1rem;
  align-items: center;
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
