<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import useManageProduct from '/@src/composable/product/use-manage-product'
const route = useRoute()
const productId = route.params.productid as string
const { fetchProductById, productInfo } = useManageProduct()
onMounted(() => {
  if (typeof productId === 'string') fetchProductById(+productId)
})
</script>

<template>
  <div v-if="productInfo">
    <div v-for="(value, key) in productInfo" :key="key">
      <span>{{ key }}: {{ value }}</span>
    </div>
  </div>
</template>
