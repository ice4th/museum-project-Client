<template>
  <div class="animaldetail">
    <h2>{{ animal && animal.nameTh }}</h2>
    <div class="animalinfo">
      <p>{{ animal && animal.nameTh }}</p>
      <p>{{ animal && animal.nameEng }}</p>
      <p><b>ชื่อวิทยาศาสตร์: </b>{{ animal && animal.sciName }}</p>
      <p><b>ชื่อทางเทคนิค: </b>{{ animal && animal.technicalTerm }}</p>
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
