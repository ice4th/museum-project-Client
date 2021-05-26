<template>
  <div class="organinfo">
    <h2>{{ organ && organ.nameTh }} ({{ organ && organ.nameEng }})</h2>
    <p><b>รายละเอียด: </b>{{ organ && organ.description }}</p>
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
