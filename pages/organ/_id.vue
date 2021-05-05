<template>
  <div class="organdetail">
    <h2>{{ organ && organ.nameTh }}</h2>
    <div class="organinfo">
      <p>{{ organ && organ.nameTh }}</p>
      <p>{{ organ && organ.nameEng }}</p>
      <p><b>รายละเอียด: </b>{{ organ && organ.description }}</p>
    </div>
  </div>
</template>

<script>
import { getOrganById } from '@/service/organ'
export default {
  data: () => ({
    organ: null,
  }),
  mounted() {
    this.getOrgan()
  },
  methods: {
    getOrgan() {
      getOrganById(this.$route.params.id).then((res) => {
        console.log(res.data)
        this.organ = res.data
      })
    },
  },
}
</script>
<style></style>
