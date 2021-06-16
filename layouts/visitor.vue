<template>
  <div>
    <VisitorNavbar></VisitorNavbar>
  </div>
</template>
<script>
import Vue from 'vue'
import VisitorNavbar  from '../components/Navbar/visitor'

export default Vue.extend({
  name: 'VisitorLayout',
  components: {
    VisitorNavbar,
  },
  head: () => ({
    bodyAttrs: {
      class: 'visitor-body',
    },
  }),
})
</script>
