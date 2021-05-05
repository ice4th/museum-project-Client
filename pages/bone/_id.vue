<template>
  <div class="animaldetail">
    <v-img
      src="https://picsum.photos/id/11/500/300"
      max-height="235"
      max-width="392"
      
    ></v-img>
    <div class="animalinfo">
      <h2>{{ animal && animal.thaiName }}</h2>
      <p>{{ animal && animal.commonNeme }}</p>
      <p><b>ชื่อวิทยาศาสตร์: </b>{{ animal && animal.scientificName }}</p>
      <p><b>รายละเอียด: </b>{{ animal && animal.description }}</p>
      <p><b>Taxonomy </b>{{ animal && animal.taxonomyId }}</p>
    </div>
  </div>
</template>

<script>
import { getAnimalById } from '@/service/animal'
export default {
  data: () => ({
    animal: null,
  }),
  mounted() {
    this.getAnimal()
  },
  methods: {
    getAnimal() {
      getAnimalById(this.$route.params.id).then((res) => {
        console.log(res.data)
        this.animal = res.data
      })
    },
  },
}
</script>

<style></style>
