<template>
  <div class="animaldetail">
    <div class="animalinfo">
      <v-carousel>
        <v-carousel-item
          v-for="(item, i) in items"
          :key="i"
          :src="item"
          reverse-transition="fade-transition"
          transition="fade-transition"
        ></v-carousel-item>
      </v-carousel>
      <br />
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
// import { getImage } from '@/service/image'
import Vue from 'vue'
export default Vue.extend({
  layout: 'visitor',
  data: () => ({
    animal: [],
    allImg: {},
    a: [],
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
        this.allImg = this.animal.imgPath
        console.log('imgpath', this.animal.imgPath)
        this.allImg.forEach((item) => {
          this.a.push(item.split(','))
        })
        this.a = this.a.toString().split(',')
        this.a.forEach((item) => {
          console.log(item)
          this.items.push({ src: `https://localhost:44351/api/image/${item}` })
        })
        for (const [key, value] of Object.entries(res.data.taxonomyId)) {
          if (value != null && key !== 'id') this.taxonomy[key] = value
        }
      })
    },

    showTaxonomy() {
      for (const i in this.animal.taxonomyId) {
        this.taxonomyItem.append(i, this.animal.taxonomyId[i])
      }
    },
  },
})
</script>

<style lang="scss" scoped>
.animalinfo {
  margin-top: 3rem;
  margin-bottom: 10rem;
}
</style>
