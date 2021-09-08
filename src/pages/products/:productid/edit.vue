<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import useManageProduct from '/@src/composable/products/useManageProduct'
const route = useRoute()
const productId = route.params.productid as string
const { fetchProductById, validate, productInfo, submitUpdateProduct } =
  useManageProduct()
onMounted(() => {
  if (typeof productId === 'string') fetchProductById(+productId)
})
</script>

<template>
  <div v-if="productInfo">
    <ProductForm
      :product-detail="productInfo"
      :validate="validate"
      @update="submitUpdateProduct"
    />
    <!-- <div v-for="(value, key) in productInfo" :key="key">
      <span>{{ key }}: {{ value }}</span>
    </div> -->
  </div>
</template>
