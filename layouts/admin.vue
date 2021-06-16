<template>
  <div>
    <AdminNavbar></AdminNavbar>
    
  </div>
</template>
<script>
import Vue from 'vue'
import AdminNavbar from '../components/Navbar/admin'

export default Vue.extend({
  name: 'AdminLayout',
   components: {
     AdminNavbar,
   },
})
</script>
