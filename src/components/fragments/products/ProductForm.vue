<script setup lang="ts">
// ProductForm Component
import { onBeforeMount, onMounted, ref } from 'vue'
import type { PropType } from 'vue'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import useOptionApi from '/@src/composable/api/useOptionApi'
import type {
  IProduct,
  IUpdateProduct,
} from '/@src/types/interfaces/product.interface'
import {
  ProductCEFR,
  ProductType,
  Purchasable,
} from '/@src/types/enums/product.enum'
import { QuizType } from '/@src/types/enums/quiz.enum'
import { GlobishLevel, PackageCefrLevel } from '/@src/types/enums/package.enum'
import type { IFile } from '../../common/FileManager.vue'
const {
  getProducts,
  productOptions,
  getProductType,
  productTypeOptions,
  getQuizzes,
} = useOptionApi()
const props = defineProps({
  validate: {
    type: Object,
    default: undefined,
  },
  productDetail: {
    type: Object as PropType<IProduct>,
    default: undefined,
  },
})

const emit = defineEmits(['create', 'update'])
const productInfo = ref<IUpdateProduct>({
  name: '',
  excerpt: '',
  slug: '',
  isPublish: false,
})
const globishLevelOption = Object.entries(GlobishLevel).map(([key, value]) => {
  return { label: key.replace(/_/g, ' '), value }
})

const cefrLevelOption = Object.values(PackageCefrLevel).map((value) => {
  return { label: value, value }
})
const preTestOption = ref([])
const midTestOption = ref([])
const postTestOption = ref([])
const showFilePopup = ref(false)
const isPurchase = ref(false)
const selectImage = (ev: IFile) => {
  productInfo.value.image = ev.src
}
onBeforeMount(async () => {
  const [preTestList, midTestList, postTestList] = await Promise.all([
    getQuizzes(QuizType.PRETEST),
    getQuizzes(QuizType.MIDTEST),
    getQuizzes(QuizType.POSTTEST),
    getProducts(),
    getProductType(),
  ])
  preTestOption.value = preTestList
  midTestOption.value = midTestList
  postTestOption.value = postTestList
})
const onChangePurchasable = () => {
  productInfo.value.purchasable = isPurchase.value ? '1' : '0'
}
onMounted(() => {
  if (!!props.productDetail) {
    productInfo.value.isPublish = !props.productDetail.bodyDraft
    productInfo.value.name = props.productDetail.name
    productInfo.value.beforeDiscount = props.productDetail.beforeDiscount
    productInfo.value.duration = props.productDetail.duration
    productInfo.value.excerpt = props.productDetail.excerpt
    productInfo.value.image = props.productDetail.image || undefined
    productInfo.value.globishLevel = props.productDetail.globishLevel
    productInfo.value.body = productInfo.value.isPublish
      ? props.productDetail.bodyDraft
      : props.productDetail.body
    productInfo.value.purchasable = props.productDetail.purchasable
    isPurchase.value = props.productDetail.purchasable === Purchasable.YES
    productInfo.value.type = props.productDetail.type
    productInfo.value.cefr = props.productDetail.cefr
    productInfo.value.slug = props.productDetail.slug
    productInfo.value.order = props.productDetail.order
    productInfo.value.price = props.productDetail.price

    productInfo.value.metaTitle = props.productDetail.metaTitle || undefined
    productInfo.value.metaDescription =
      props.productDetail.metaDescription || undefined
    productInfo.value.metaKeyword = props.productDetail.metaKeyword || undefined
    productInfo.value.seoFooter = props.productDetail.seoFooter || undefined

    productInfo.value.recommend1 = props.productDetail.recommend1 || undefined
    productInfo.value.recommend2 = props.productDetail.recommend2 || undefined
    productInfo.value.recommend3 = props.productDetail.recommend3 || undefined

    productInfo.value.preTestId = props.productDetail.preTestId || undefined
    productInfo.value.midTestId = props.productDetail.midTestId || undefined
    productInfo.value.postTestId = props.productDetail.postTestId || undefined
  }
})
</script>

<template>
  <ModalFileManager
    :open="showFilePopup"
    @select="selectImage"
    @close="showFilePopup = false"
  />
  <V-Message v-show="Object.values(validate).length" color="danger">
    <span v-for="(value, key) in validate" :key="key" class="is-flex">
      <span>{{ key }}: {{ value }}</span>
    </span>
  </V-Message>
  <div class="tile is-ancestor">
    <div class="tile is-12 is-vertical is-parent">
      <div class="tile is-child box">
        <div class="columns is-multiline is-justify-content-flex-end">
          <div class="column is-2">
            <V-Field>
              <V-Control>
                <V-SwitchBlock
                  v-model="isPurchase"
                  :label="isPurchase ? 'Purchase' : 'Unpurchase'"
                  color="primary"
                  @update:model-value="onChangePurchasable"
                />
              </V-Control>
            </V-Field>
          </div>
          <div v-show="productDetail" class="column is-2">
            <V-Field>
              <V-Control>
                <V-SwitchBlock
                  v-model="productInfo.isPublish"
                  :label="productInfo.isPublish ? 'Publish' : 'Draft'"
                  color="primary"
                />
              </V-Control>
            </V-Field>
          </div>
          <div class="column is-2 ml-auto">
            <V-Button
              v-show="!productDetail"
              icon="feather:edit-2"
              color="primary"
              @click="emit('create', productInfo)"
              >Submit</V-Button
            >
            <V-Button
              v-show="productDetail"
              icon="feather:edit-2"
              color="primary"
              @click="emit('update', productInfo)"
              >Update</V-Button
            >
          </div>
        </div>
      </div>
    </div>
  </div>
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
                <Multiselect
                  v-model="productInfo.preTestId"
                  placeholder="Select pre-test"
                  :options="preTestOption"
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
              <label>Mid Test</label>
              <V-Control>
                <Multiselect
                  v-model="productInfo.midTestId"
                  placeholder="Select mid-test"
                  :options="midTestOption"
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
              <label>Post Test</label>
              <V-Control>
                <Multiselect
                  v-model="productInfo.postTestId"
                  placeholder="Select post-test"
                  :options="postTestOption"
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
                  placeholder="Select type of recommend 1"
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
                  placeholder="Select type of recommend 2"
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
                  placeholder="Select type of recommend 3"
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
            <div class="image-poster">
              <div class="btn-file" :class="[!productInfo.image && 'show']">
                <V-Button icon="feather:upload" @click="showFilePopup = true"
                  >Choose image</V-Button
                >
              </div>
              <img v-if="productInfo.image" :src="productInfo.image" alt="" />
            </div>
            <!-- <V-Field>
              <label>Product Image</label>
              <V-Control icon="lnil lnil-file-name">
                <input
                  v-model="productInfo.image"
                  type="text"
                  class="input"
                  placeholder="Internal Package Name"
                />
              </V-Control>
            </V-Field> -->
          </div>
          <div class="column is-6">
            <V-Field>
              <label>Product Name</label>
              <V-Control
                icon="lnil lnil-file-name"
                :has-error="!!validate?.name"
              >
                <input
                  v-model="productInfo.name"
                  type="text"
                  class="input"
                  placeholder="Product Name"
                />
              </V-Control>
              <p v-if="validate.name" class="help text-danger">
                {{ validate.name }}
              </p>
            </V-Field>
          </div>
          <div class="column is-6">
            <V-Field>
              <label>Excerpt คําขยายความ Product</label>
              <V-Control
                icon="lnil lnil-file-name"
                :has-error="!!validate?.excerpt"
              >
                <input
                  v-model="productInfo.excerpt"
                  type="text"
                  class="input"
                  placeholder="Product Excerpt"
                />
                <p v-if="validate.excerpt" class="help text-danger">
                  {{ validate.excerpt }}
                </p>
              </V-Control>
            </V-Field>
          </div>
          <div class="column is-3">
            <V-Field>
              <label>Product Type</label>
              <V-Control :has-error="!!validate?.type">
                <Multiselect
                  v-model="productInfo.type"
                  placeholder="Select product type"
                  :options="productTypeOptions"
                  :searchable="true"
                >
                </Multiselect>
                <p v-if="validate.type" class="help text-danger">
                  {{ validate.type }}
                </p>
              </V-Control>
            </V-Field>
          </div>
          <div class="column is-3">
            <V-Field>
              <label>Product Level</label>
              <V-Control :has-error="!!validate?.globishLevel">
                <Multiselect
                  v-model="productInfo.globishLevel"
                  placeholder="Choose a glevel"
                  :options="globishLevelOption"
                  :searchable="true"
                >
                </Multiselect>
                <p v-if="validate.globishLevel" class="help text-danger">
                  {{ validate.globishLevel }}
                </p>
              </V-Control>
            </V-Field>
          </div>
          <div class="column is-3">
            <V-Field>
              <label>Product CEFR</label>
              <V-Control :has-error="!!validate?.cefr">
                <Multiselect
                  v-model="productInfo.cefr"
                  placeholder="Choose level of cefr"
                  :options="cefrLevelOption"
                  :searchable="true"
                >
                </Multiselect>
                <p v-if="validate.cefr" class="help text-danger">
                  {{ validate.cefr }}
                </p>
              </V-Control>
            </V-Field>
          </div>
          <div class="column is-3">
            <V-Field>
              <label>URL Slug</label>
              <V-Control
                icon="lnil lnil-file-name"
                :has-error="!!validate?.slug"
              >
                <input
                  v-model="productInfo.slug"
                  type="text"
                  class="input"
                  placeholder="Slug"
                />
                <p v-if="validate.slug" class="help text-danger">
                  {{ validate.slug }}
                </p>
              </V-Control>
            </V-Field>
          </div>
          <div class="column is-3">
            <V-Field>
              <label>Order</label>
              <V-Control
                icon="lnil lnil-file-name"
                :has-error="!!validate?.order"
              >
                <input
                  v-model="productInfo.order"
                  type="text"
                  class="input"
                  placeholder="Order"
                  @change="productInfo.order = +productInfo.order"
                />
                <p v-if="validate.order" class="help text-danger">
                  {{ validate.order }}
                </p>
              </V-Control>
            </V-Field>
          </div>
          <div class="column is-3">
            <V-Field>
              <label>Average Price</label>
              <V-Control
                icon="lnil lnil-file-name"
                :has-error="!!validate?.price"
              >
                <input
                  v-model="productInfo.price"
                  type="text"
                  class="input"
                  placeholder="Price"
                  @change="productInfo.price = +productInfo.price"
                />
                <p v-if="validate.price" class="help text-danger">
                  {{ validate.price }}
                </p>
              </V-Control>
            </V-Field>
          </div>
          <div class="column is-3">
            <V-Field>
              <label>Before Discount Price</label>
              <V-Control
                icon="lnil lnil-file-name"
                :has-error="!!validate?.beforeDiscount"
              >
                <input
                  v-model="productInfo.beforeDiscount"
                  type="text"
                  class="input"
                  placeholder="Discount Price"
                  @change="
                    productInfo.beforeDiscount = +productInfo.beforeDiscount
                  "
                />
                <p v-if="validate.beforeDiscount" class="help text-danger">
                  {{ validate.beforeDiscount }}
                </p>
              </V-Control>
            </V-Field>
          </div>
          <div class="column is-3">
            <V-Field>
              <label>Average Duration</label>
              <V-Control
                icon="lnil lnil-file-name"
                :has-error="!!validate?.duration"
              >
                <input
                  v-model="productInfo.duration"
                  type="text"
                  class="input"
                  placeholder="Duration"
                  @change="productInfo.duration = +productInfo.duration"
                />
                <p v-if="validate.duration" class="help text-danger">
                  {{ validate.duration }}
                </p>
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
@import '../../../scss/abstracts/_variables.scss';
@import '../../../scss/abstracts/_mixins.scss';
.is-dark .box {
  background: #323236;
  border-color: #404046;
}
.ck-rounded-corners .ck.ck-editor__main > .ck-editor__editable,
.ck.ck-editor__main > .ck-editor__editable.ck-rounded-corners {
  min-height: 460px;
}
.image-poster {
  position: relative;
  margin: 1rem auto 2rem;
  max-width: 400px;
  cursor: pointer;
  .btn-file {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s;
  }
  > img {
    max-width: 100%;
    max-height: 100%;
    object-fit: cover;
    border-radius: $radius-large;
  }
  &:hover .btn-file,
  .btn-file.show {
    opacity: 1;
    visibility: visible;
  }
}
</style>
