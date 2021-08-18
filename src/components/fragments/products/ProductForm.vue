<script setup lang="ts">
// ProductForm Component
import { onBeforeMount, ref } from 'vue'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import useOptionApi from '/@src/composable/api/useOptionApi'
import type { ICreateProduct } from '/@src/types/interfaces/product.interface'
import {
  ProductCEFR,
  ProductType,
  Purchasable,
} from '/@src/types/enums/product.enum'
const { getProducts, productOptions } = useOptionApi()
// const props = defineProps({
//   product: {
//     type: Number,
//     default: 0,
//   },
// })

const productInfo = ref<ICreateProduct>({
  name: '',
  excerpt: undefined,
  body: undefined,
  purchasable: Purchasable.NO,
  type: ProductType.DEFAULT,
  cefr: ProductCEFR.PRE_A1,
  slug: '',
  productOrder: undefined,
  order: undefined,
  price: 0,
  beforeDiscount: undefined,
  duration: undefined,
  image: undefined,

  // SEO
  metaTitle: undefined,
  metaKeyword: undefined,
  metaDescription: undefined,
  seoFooter: undefined,
  // Recommend
  recommend1: undefined,
  recommend2: undefined,
  recommend3: undefined,
  // Assessment
  preTestId: undefined,
  midTestId: undefined,
  postTestId: undefined,
})

const productInput = ref({
  productRecommend001: undefined,
  productRecommend002: undefined,
  productRecommend003: undefined,
})
onBeforeMount(() => {
  Promise.all([getProducts()])
})
</script>

<template>
  <!-- <div class="column is-12 content">
        <ckeditor :editor="ClassicEditor"> </ckeditor>
      </div> -->
  <div class="tile is-ancestor">
    <div class="tile is-4 is-vertical is-parent">
      <!-- Assessment Section -->
      <div class="tile is-child box">
        <p class="subtitle">Assessment</p>
        <div class="columns is-multiline">
          <div class="column is-12">
            <V-Field>
              <label>Pre Test</label>
              <V-Control>
                <input
                  v-model="productInfo.preTestId"
                  type="text"
                  class="input"
                />
              </V-Control>
            </V-Field>
            <V-Field>
              <label>Mid Test</label>
              <V-Control>
                <input
                  v-model="productInfo.midTestId"
                  type="text"
                  class="input"
                />
              </V-Control>
            </V-Field>
            <V-Field>
              <label>Post Test</label>
              <V-Control>
                <input
                  v-model="productInfo.postTestId"
                  type="text"
                  class="input"
                />
              </V-Control>
            </V-Field>
          </div>
        </div>
      </div>

      <!-- Product Recommend Section -->
      <div class="tile is-child box">
        <p class="subtitle">Product Recommend</p>
        <div class="columns is-multiline">
          <div class="column is-12">
            <V-Field>
              <label>Product Recommend 001</label>
              <V-Control>
                <Multiselect
                  v-model="productInfo.recommend1"
                  placeholder="Select type of product"
                  :options="productOptions"
                  :searchable="true"
                  track-by="name"
                  value-prop="id"
                >
                  <template #singlelabel="{ value }">
                    <div class="multiselect-single-label">
                      ({{ value.id }}) {{ value.name }}
                    </div>
                  </template>
                  <template #option="{ option }">
                    <span class="select-option-text">
                      ({{ option.id }}) {{ option.name }}
                    </span>
                  </template>
                </Multiselect>
              </V-Control>
            </V-Field>
            <V-Field>
              <label>Product Recommend 002</label>
              <V-Control>
                <Multiselect
                  v-model="productInfo.recommend2"
                  placeholder="Select type of product"
                  :options="productOptions"
                  :searchable="true"
                  track-by="name"
                  value-prop="id"
                >
                  <template #singlelabel="{ value }">
                    <div class="multiselect-single-label">
                      ({{ value.id }}) {{ value.name }}
                    </div>
                  </template>
                  <template #option="{ option }">
                    <span class="select-option-text">
                      ({{ option.id }}) {{ option.name }}
                    </span>
                  </template>
                </Multiselect>
              </V-Control>
            </V-Field>
            <V-Field>
              <label>Product Recommend 003</label>
              <V-Control>
                <Multiselect
                  v-model="productInfo.recommend3"
                  placeholder="Select type of product"
                  :options="productOptions"
                  :searchable="true"
                  track-by="name"
                  value-prop="id"
                >
                  <template #singlelabel="{ value }">
                    <div class="multiselect-single-label">
                      ({{ value.id }}) {{ value.name }}
                    </div>
                  </template>
                  <template #option="{ option }">
                    <span class="select-option-text">
                      ({{ option.id }}) {{ option.name }}
                    </span>
                  </template>
                </Multiselect>
              </V-Control>
            </V-Field>
          </div>
        </div>
      </div>

      <!-- SEO Section -->
      <div class="tile is-child box">
        <p class="subtitle">SEO Content</p>
        <div class="columns is-multiline">
          <div class="column is-12">
            <V-Field>
              <label>Meta Title</label>
              <V-Control>
                <textarea
                  v-model="productInfo.metaTitle"
                  type="text"
                  class="input"
                />
              </V-Control>
            </V-Field>
          </div>
          <div class="column is-12">
            <V-Field>
              <label>Meta Keywords</label>
              <V-Control>
                <textarea
                  v-model="productInfo.metaKeyword"
                  type="text"
                  class="input"
                />
              </V-Control>
            </V-Field>
          </div>
          <div class="column is-12">
            <V-Field>
              <label>Meta Descriptions</label>
              <V-Control>
                <textarea
                  v-model="productInfo.metaDescription"
                  type="text"
                  class="input"
                />
              </V-Control>
            </V-Field>
          </div>
          <div class="column is-12">
            <V-Field>
              <label>Footer</label>
              <V-Control>
                <textarea
                  v-model="productInfo.seoFooter"
                  type="text"
                  class="input"
                />
              </V-Control>
            </V-Field>
          </div>
        </div>
      </div>
    </div>

    <!-- Product Information Section (Main)-->
    <div class="tile is-8 is-vertical is-parent">
      <div class="tile is-child box">
        <p class="subtitle">Product Information</p>
        <div class="columns is-multiline">
          <div class="column is-12">
            <V-Field>
              <label>Product Image</label>
              <V-Control icon="lnil lnil-file-name">
                <input
                  v-model="productInfo.image"
                  type="text"
                  class="input"
                  placeholder="Internal Package Name"
                />
              </V-Control>
            </V-Field>
          </div>
          <div class="column is-6">
            <V-Field>
              <label>Product Name</label>
              <V-Control icon="lnil lnil-file-name">
                <input
                  v-model="productInfo.name"
                  type="text"
                  class="input"
                  placeholder="Product Name"
                />
              </V-Control>
            </V-Field>
          </div>
          <div class="column is-6">
            <V-Field>
              <label>Excerpt คําขยายความ Product</label>
              <V-Control icon="lnil lnil-file-name">
                <input
                  v-model="productInfo.excerpt"
                  type="text"
                  class="input"
                  placeholder="Product Excerpt"
                />
              </V-Control>
            </V-Field>
          </div>
          <div class="column is-4">
            <V-Field>
              <label>Product Type</label>
              <V-Control icon="lnil lnil-file-name">
                <input
                  v-model="productInfo.type"
                  type="text"
                  class="input"
                  placeholder="Product Type"
                />
              </V-Control>
            </V-Field>
          </div>
          <div class="column is-4">
            <V-Field>
              <label>Product CEFR</label>
              <V-Control icon="lnil lnil-file-name">
                <input
                  v-model="productInfo.cefr"
                  type="text"
                  class="input"
                  placeholder="CEFR Level"
                />
              </V-Control>
            </V-Field>
          </div>
          <div class="column is-4">
            <V-Field>
              <label>URL Slug</label>
              <V-Control icon="lnil lnil-file-name">
                <input
                  v-model="productInfo.slug"
                  type="text"
                  class="input"
                  placeholder="Slug"
                />
              </V-Control>
            </V-Field>
          </div>
          <div class="column is-3">
            <V-Field>
              <label>Order</label>
              <V-Control icon="lnil lnil-file-name">
                <input
                  v-model="productInfo.order"
                  type="text"
                  class="input"
                  placeholder="Order"
                />
              </V-Control>
            </V-Field>
          </div>
          <div class="column is-3">
            <V-Field>
              <label>Average Price</label>
              <V-Control icon="lnil lnil-file-name">
                <input
                  v-model="productInfo.price"
                  type="text"
                  class="input"
                  placeholder="Price"
                />
              </V-Control>
            </V-Field>
          </div>
          <div class="column is-3">
            <V-Field>
              <label>Before Discount Price</label>
              <V-Control icon="lnil lnil-file-name">
                <input
                  v-model="productInfo.beforeDiscount"
                  type="text"
                  class="input"
                  placeholder="Discount Price"
                />
              </V-Control>
            </V-Field>
          </div>
          <div class="column is-3">
            <V-Field>
              <label>Average Duration</label>
              <V-Control icon="lnil lnil-file-name">
                <input
                  v-model="productInfo.duration"
                  type="text"
                  class="input"
                  placeholder="Duration"
                />
              </V-Control>
            </V-Field>
          </div>

          <div class="column is-12">
            <ckeditor
              id="editor"
              v-model="productInfo.body"
              :editor="ClassicEditor"
            >
            </ckeditor>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.is-dark .box {
  background: #323236;
  border-color: #404046;
}
.ck-rounded-corners .ck.ck-editor__main > .ck-editor__editable,
.ck.ck-editor__main > .ck-editor__editable.ck-rounded-corners {
  min-height: 460px;
}
</style>
