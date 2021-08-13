<script setup lang="ts">
// ProductForm Component
import { ref } from 'vue'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { onBeforeMount } from 'vue-demi'
import useOptionApi from '/@src/composable/api/useOptionApi'
const { getProducts, productOptions } = useOptionApi()
// const props = defineProps({
//   product: {
//     type: Number,
//     default: 0,
//   },
// })
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
  <div class="form-layout">
    <div class="form-outer">
      <div class="form-header stuck-header">
        <div class="form-header-inner">
          <div class="left">
            <h3>View/Edit Package Group</h3>
          </div>
          <div class="right">
            <div class="buttons">
              <V-Button icon="lnir lnir-arrow-left rem-100" light dark-outlined>
                Cancel
              </V-Button>
              <V-Button color="primary" raised> Create </V-Button>
            </div>
            <!-- <div v-else class="buttons">
                <V-Button color="primary" raised @click="showUpdate = true">
                  Edit
                </V-Button>
              </div> -->
          </div>
        </div>
      </div>
      <div class="form-body">
        <div class="form-fieldset">
          <div class="fieldset-heading">
            <h4>Product Information</h4>
          </div>
          <div class="columns is-multiline">
            <div class="column is-12">
              <V-Field>
                <label>Product Image</label>
                <V-Control icon="lnil lnil-file-name">
                  <input
                    type="text"
                    class="input"
                    placeholder="Internal Package Name"
                  />
                </V-Control>
              </V-Field>
            </div>
            <div class="column is-12">
              <V-Field>
                <label>Product Name</label>
                <V-Control icon="lnil lnil-file-name">
                  <input type="text" class="input" placeholder="Product Name" />
                </V-Control>
              </V-Field>
            </div>
            <div class="column is-12">
              <V-Field>
                <label>Excerpt คําขยายความ Product</label>
                <V-Control icon="lnil lnil-file-name">
                  <input
                    type="text"
                    class="input"
                    placeholder="Product Excerpt"
                  />
                </V-Control>
              </V-Field>
            </div>
            <!-- <div class="column is-12 content">
        <ckeditor :editor="ClassicEditor"> </ckeditor>
      </div> -->
          </div>

          <div class="fieldset-heading">
            <h4>Product Detail</h4>
          </div>
          <div class="columns is-multiline">
            <div class="column is-6">
              <V-Field>
                <label>Product Type</label>
                <V-Control icon="lnil lnil-file-name">
                  <input type="text" class="input" placeholder="Product Type" />
                </V-Control>
              </V-Field>
            </div>
            <div class="column is-6">
              <V-Field>
                <label>Product CEFR</label>
                <V-Control icon="lnil lnil-file-name">
                  <input type="text" class="input" placeholder="CEFR Level" />
                </V-Control>
              </V-Field>
            </div>
            <div class="column is-6">
              <V-Field>
                <label>URL Slug</label>
                <V-Control icon="lnil lnil-file-name">
                  <input type="text" class="input" placeholder="Slug" />
                </V-Control>
              </V-Field>
            </div>
            <div class="column is-6">
              <V-Field>
                <label>Order</label>
                <V-Control icon="lnil lnil-file-name">
                  <input type="text" class="input" placeholder="Order" />
                </V-Control>
              </V-Field>
            </div>
            <div class="column is-6">
              <V-Field>
                <label>Average Price</label>
                <V-Control icon="lnil lnil-file-name">
                  <input type="text" class="input" placeholder="Price" />
                </V-Control>
              </V-Field>
            </div>
            <div class="column is-6">
              <V-Field>
                <label>Before Discount Price</label>
                <V-Control icon="lnil lnil-file-name">
                  <input
                    type="text"
                    class="input"
                    placeholder="Discount Price"
                  />
                </V-Control>
              </V-Field>
            </div>
            <div class="column is-6">
              <V-Field>
                <label>Average Duration</label>
                <V-Control icon="lnil lnil-file-name">
                  <input type="text" class="input" placeholder="Duration" />
                </V-Control>
              </V-Field>
            </div>
          </div>
          <div class="fieldset-heading">
            <h4>SEO Content</h4>
          </div>
          <div class="columns is-multiline">
            <div class="column is-12">
              <V-Field>
                <label>Meta Title</label>
                <V-Control>
                  <textarea type="text" class="input" />
                </V-Control>
              </V-Field>
            </div>
            <div class="column is-12">
              <V-Field>
                <label>Meta Keywords</label>
                <V-Control>
                  <textarea type="text" class="input" />
                </V-Control>
              </V-Field>
            </div>
            <div class="column is-12">
              <V-Field>
                <label>Meta Descriptions</label>
                <V-Control>
                  <textarea type="text" class="input" />
                </V-Control>
              </V-Field>
            </div>
            <div class="column is-12">
              <V-Field>
                <label>Footer</label>
                <V-Control>
                  <textarea type="text" class="input" />
                </V-Control>
              </V-Field>
            </div>
          </div>
          <div class="fieldset-heading">
            <h4>Product Recommend</h4>
          </div>
          <div class="columns is-multiline">
            <div class="column is-12">
              <V-Field>
                <label>Product Recommend 001</label>
                <V-Control>
                  <Multiselect
                    v-model="productInput.productRecommend001"
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
                    v-model="productInput.productRecommend002"
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
                    v-model="productInput.productRecommend003"
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
          <div class="fieldset-heading">
            <h4>Assessment</h4>
          </div>
          <div class="columns is-multiline">
            <div class="column is-12">
              <V-Field>
                <label>Pre Test</label>
                <V-Control>
                  <input type="text" class="input" />
                </V-Control>
              </V-Field>
              <V-Field>
                <label>Mid Test</label>
                <V-Control>
                  <input type="text" class="input" />
                </V-Control>
              </V-Field>
              <V-Field>
                <label>Post Test</label>
                <V-Control>
                  <input type="text" class="input" />
                </V-Control>
              </V-Field>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
