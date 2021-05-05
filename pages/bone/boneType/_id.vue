<template>
  <div class="bonelist">
    <p>bone list</p>
    <nuxt-link
      v-for="item in bonelist"
      :key="item"
      :to="`/bone/boneType/boneDet/${item.id}`"
      class="bone_name_list"
    >
      <p>{{ item.nameTh }}</p>
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
    getAnimal(this.$route.params.id).then((res) => {
      console.log(res.data)
      this.bonelist = res.data
    })
  },
  // mounted() {
  //   this.getAnimal()

  // },
  // methods: {
  //   getAnimal() {
  //     getAnimal(this.$route.params.id).then((res) => {
  //       console.log(res.data)
  //       this.bonelist = res.data
  //     })
  //   },
  // },
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
</style>
