<template>
  <div class="animaldetail">
    <v-img
      src="https://picsum.photos/id/11/500/300"
      max-height="235"
      max-width="392"
    ></v-img>
    <div class="animalinfo">
      <v-carousel>
        <v-carousel-item
          v-for="(item, i) in items"
          :key="i"
          :src="item.src"
          reverse-transition="fade-transition"
          transition="fade-transition"
        ></v-carousel-item>
      </v-carousel>
      <h3>
        {{ animal && animal.thaiName }} ({{ animal && animal.commonName }})
      </h3>
      <p><b>ชื่อวิทยาศาสตร์: </b>{{ animal && animal.scientificName }}</p>
      <p><b>รายละเอียด: </b>{{ animal && animal.description }}</p>
      <p><b>Taxonomy</b></p>

      <div v-if="animal != null">
        <div v-for="(val, key, index) in taxonomy" :key="key + val">
          <p
            v-bind:style="{ paddingLeft: index * 8 + 'px' }"
            v-if="val != null && key != 'id'"
          >
            <b> {{ key }}: {{ val }} </b>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getAnimalById } from '@/service/animal'
export default {
  data: () => ({
    animal: [],
    taxonomy: {},
    items: [],
  }),
  mounted() {
    this.getAnimal()
  },

  methods: {
    getAnimal() {
      getAnimalById(this.$route.params.id).then((res) => {
        console.log(res.data)
        this.animal = res.data
        for (const [key, value] of Object.entries(res.data.taxonomyId)) {
          if (value != null && key !== 'id') this.taxonomy[key] = value
        }
      })
    },

    showTaxonomy() {
      // this.taxonomyIndex = this.animal.taxonomyId
      // this.taxonomyItem = Object.assign({})

      for (const i in this.animal.taxonomyId) {
        this.taxonomyItem.append(i, this.animal.taxonomyId[i])
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.animalinfo {
  margin-top: 3rem;
}
</style>
