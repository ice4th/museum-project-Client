<script setup lang="ts">
import { computed } from 'vue'
import type { PropType } from 'vue'
import type { IFormPackageInfo } from '/@src/types/interfaces/package.interface'
import { addCommas, isNil } from '/@src/helpers/filter.helper'
import {
  GlobishLevel,
  PackageCefrLevel,
  PackageEngder,
  PackageInstallment,
  PackageType,
} from '/@src/types/enums/package.enum'

/**
 * defined props type
 */
const props = defineProps({
  fetchProductsOption: {
    type: Function,
    default: () => [],
  },
  fetchCurriculumsOption: {
    type: Function,
    default: () => [],
  },
  featureGroups: {
    type: Function,
    default: () => [],
  },
  fetchFindMyCoachesOption: {
    type: Function,
    default: () => [],
  },
  fetchMoocCoursesOption: {
    type: Function,
    default: () => [],
  },
  packageName: {
    type: String,
    default: '',
  },
  formPackageInfo: {
    type: Object as PropType<IFormPackageInfo>,
    default: undefined,
  },
  loadingOptions: {
    type: Boolean,
    default: false,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
})

/**
 * Multi Select Items
 */
const globishLevelItems = Object.entries(GlobishLevel).map(([key, value]) => {
  return { key: key.replace(/_/g, ' '), value }
})
const cefrLevelItems = Object.values(PackageCefrLevel).map((value) => {
  return { key: value, value }
})
const installmentItems = Object.values(PackageInstallment).map((value) => {
  const key = value === '0' ? 'No installment' : `${value} Month`
  return { key, value: +value }
})
const packageEngderItems = Object.entries(PackageEngder).map(([key, value]) => {
  return { key: key.replace(/_/g, ' '), value }
})
const packageTypeItems = Object.values(PackageType).map((value) => {
  return { key: value, value }
})
const privateSlots = [
  { key: '30 Minutes', value: 1 },
  { key: '1 Hour', value: 2 },
  { key: '1 Hour 30 Minutes', value: 3 },
  { key: '30 Minutes', value: 4 },
]
</script>

<template>
  <div class="form-fieldset">
    <div class="fieldset columns is-multiline">
      <!-- Form Header -->
      <!-- Package Detail -->
      <div class="form-header column is-12">
        <h3>Package Detail</h3>
      </div>

      <!-- Field Package Name -->
      <div class="column is-6">
        <V-Field>
          <label>Package Name</label>
          <V-Control icon="lnil lnil-package">
            <input
              v-model="formPackageInfo.packageName"
              type="text"
              class="input"
              placeholder="Package name"
              :disabled="readonly"
            />
            <p v-show="!formPackageInfo.packageName" class="help text-danger">
              Package name is required.
            </p>
          </V-Control>
        </V-Field>
      </div>
      <!-- Field Internal Package Name -->
      <div class="column is-6">
        <V-Field>
          <label>Internal Package Name</label>
          <V-Control icon="lnil lnil-file-name">
            <input
              v-model="formPackageInfo.packageNameInternal"
              type="text"
              class="input"
              placeholder="Internal Package Name"
              :disabled="readonly"
            />
          </V-Control>
        </V-Field>
      </div>
      <!-- Field Select Product Item -->
      <div class="column is-12">
        <V-Field class="is-autocomplete-select">
          <label>Product</label>
          <V-Control icon="feather:search" :loading="loadingOptions">
            <SelectOption
              v-model="formPackageInfo.productId"
              :callback-search="fetchProductsOption"
              :readonly="readonly"
              label-by="name"
              value-prop="id"
              placeholder="Select or search product"
            />
            <p v-show="!formPackageInfo.productId" class="help text-danger">
              Choose product for this package.
            </p>
          </V-Control>
        </V-Field>
      </div>
      <!-- Purchasable -->
      <div class="column is-6">
        <V-Field>
          <label>&nbsp;</label>
          <V-Control>
            <V-SwitchBlock
              v-model="formPackageInfo.purchasable"
              label="Purchasable"
              color="primary"
              :disabled="readonly"
            />
          </V-Control>
        </V-Field>
      </div>
      <!-- Status and Purchasable -->
      <div class="column is-6">
        <V-Field>
          <label>Status&nbsp;</label>
          <V-Tag
            v-tooltip="'ไม่แสดงหน้าเว็บ (ส่งลิ้งในการชำระเงินเท่านั้น)'"
            color="solid"
            label="None"
          />
          <span>&nbsp;</span>
          <V-Tag v-tooltip="'แสดงหน้าเว็บ'" color="solid" label="General" />
          <V-Control>
            <V-Radio
              v-model="formPackageInfo.status"
              value="0"
              label="None"
              name="status_radio"
              color="primary"
              square
              :disabled="readonly"
            />
            <V-Radio
              v-model="formPackageInfo.status"
              value="1"
              label="General"
              name="status_radio"
              color="primary"
              square
              :disabled="readonly"
            />
          </V-Control>
        </V-Field>
      </div>
      <!-- Detail -->
      <div class="column is-12">
        <V-Field>
          <label>Detail</label>
          <V-Control>
            <textarea
              v-model="formPackageInfo.detail"
              class="textarea"
              rows="2"
              placeholder="Add detail..."
              :disabled="readonly"
            ></textarea>
          </V-Control>
        </V-Field>
      </div>
      <!-- Comment -->
      <div class="column is-12">
        <V-Field>
          <label>Comment</label>
          <V-Control>
            <textarea
              v-model="formPackageInfo.comment"
              class="textarea"
              rows="2"
              placeholder="Add comment..."
              :disabled="readonly"
            ></textarea>
          </V-Control>
        </V-Field>
      </div>

      <!-- Form Header -->
      <!-- Price & Ticket -->
      <div class="form-header column is-12">
        <h3>Price & Ticket</h3>
      </div>

      <!-- Price -->
      <div class="column is-6">
        <V-Field>
          <label>Price {{ addCommas(props.formPackageInfo.price) }}</label>
          <V-Control>
            <V-Field addons>
              <V-Control>
                <a class="button is-static">฿</a>
              </V-Control>
              <V-Control expanded>
                <input
                  v-model="props.formPackageInfo.price"
                  type="number"
                  class="input"
                  placeholder="Amount..."
                  :disabled="readonly"
                  @change="
                    props.formPackageInfo.price = +props.formPackageInfo.price
                  "
                />
              </V-Control>
            </V-Field>
            <p
              v-show="parseInt(`${formPackageInfo.price}`) < 0"
              class="help text-danger"
            >
              Price is must be positive number or zero.
            </p>
          </V-Control>
        </V-Field>
      </div>
      <!-- Price Before Discount -->
      <div class="column is-6">
        <V-Field>
          <label
            >Before Discount
            {{ addCommas(props.formPackageInfo.beforeDiscount) }}</label
          >
          <V-Control>
            <V-Field addons>
              <V-Control>
                <a class="button is-static">฿</a>
              </V-Control>
              <V-Control expanded>
                <input
                  v-model="props.formPackageInfo.beforeDiscount"
                  type="number"
                  class="input"
                  placeholder="Amount..."
                  :disabled="readonly"
                  @change="
                    props.formPackageInfo.beforeDiscount =
                      +props.formPackageInfo.beforeDiscount
                  "
                />
              </V-Control>
            </V-Field>
            <p
              v-show="parseInt(`${formPackageInfo.beforeDiscount}`) < 0"
              class="help text-danger"
            >
              BeforeDiscount must be positive number or zero.
            </p>
          </V-Control>
        </V-Field>
      </div>
      <!-- Installment -->
      <div class="column is-6">
        <V-Field>
          <label>Installment</label>
          <V-Control>
            <Multiselect
              v-model="formPackageInfo.installmentMonth"
              placeholder="Select or search installment"
              :options="installmentItems"
              track-by="key"
              value-prop="value"
              :disabled="readonly"
            >
              <template #singlelabel="{ value }">
                <div class="multiselect-single-label">
                  {{ value.key }}
                </div>
              </template>
              <template #option="{ option }">
                <span class="select-option-text">
                  {{ option.key }}
                </span>
              </template>
            </Multiselect>
            <p
              v-show="isNil(formPackageInfo.installmentMonth)"
              class="help text-danger"
            >
              Choose installment for this package.
            </p>
          </V-Control>
        </V-Field>
      </div>
      <!-- Duration -->
      <div class="column is-6">
        <V-Field>
          <label>Duration</label>
          <V-Control>
            <V-Field addons>
              <V-Control expanded>
                <input
                  v-model="formPackageInfo.duration"
                  type="number"
                  class="input"
                  placeholder="duration..."
                  :disabled="readonly"
                  @change="formPackageInfo.duration = +formPackageInfo.duration"
                />
              </V-Control>
              <V-Control>
                <a class="button is-static">month</a>
              </V-Control>
            </V-Field>
            <p
              v-show="isNil(formPackageInfo.duration)"
              class="help text-danger"
            >
              Duration is required.
            </p>
          </V-Control>
        </V-Field>
      </div>
      <!-- 1 on 1 Ticket -->
      <div class="column is-4 is-6">
        <V-Field>
          <label>1 on 1 Ticket</label>
          <V-Control icon="lnil lnil-ticket">
            <input
              v-model="formPackageInfo.ticketOneOnOne"
              type="number"
              class="input"
              placeholder="1 on 1 ticket..."
              :disabled="readonly"
              @change="
                props.formPackageInfo.ticketOneOnOne =
                  +props.formPackageInfo.ticketOneOnOne
              "
            />
          </V-Control>
          <p v-show="!formPackageInfo.ticketOneOnOne" class="help text-danger">
            1 on 1 ticket is required.
          </p>
        </V-Field>
      </div>
      <!-- Freetalk Ticket -->
      <div class="column is-6">
        <V-Field>
          <label>Freetalk Ticket</label>
          <V-Control icon="lnil lnil-ticket">
            <input
              v-model="formPackageInfo.ticketFreetalk"
              type="number"
              class="input"
              placeholder="freetalk ticket..."
              :disabled="readonly"
              @change="
                props.formPackageInfo.ticketFreetalk =
                  +props.formPackageInfo.ticketFreetalk
              "
            />
          </V-Control>
        </V-Field>
      </div>
      <!-- Group class Ticket -->
      <div class="column is-6">
        <V-Field>
          <label>Group class Ticket</label>
          <V-Control icon="lnil lnil-ticket">
            <input
              v-model="formPackageInfo.ticketGroup"
              type="number"
              class="input"
              placeholder="group class ticket..."
              :disabled="readonly"
              @change="
                props.formPackageInfo.ticketGroup =
                  +props.formPackageInfo.ticketGroup
              "
            />
          </V-Control>
        </V-Field>
      </div>
      <!-- Master class Ticket -->
      <div class="column is-6">
        <V-Field>
          <label>Master class Ticket</label>
          <V-Control icon="lnil lnil-ticket">
            <input
              v-model="formPackageInfo.ticketMaster"
              type="number"
              class="input"
              placeholder="master class ticket..."
              :disabled="readonly"
              @change="
                props.formPackageInfo.ticketMaster =
                  +props.formPackageInfo.ticketMaster
              "
            />
          </V-Control>
        </V-Field>
      </div>

      <!-- Form Header -->
      <!-- Course Detail -->
      <div class="form-header column is-12">
        <h3>Course Detail</h3>
      </div>

      <!-- Private class time -->
      <div class="column is-12">
        <V-Field>
          <label>Private class time</label>
          <V-Control>
            <Multiselect
              v-model="formPackageInfo.privateSlot"
              placeholder="Select or search private class time"
              :options="privateSlots"
              track-by="key"
              value-prop="value"
              :disabled="readonly"
            >
              <template #singlelabel="{ value }">
                <div class="multiselect-single-label">
                  {{ value.key }}
                </div>
              </template>
              <template #option="{ option }">
                <span class="select-option-text">
                  {{ option.key }}
                </span>
              </template>
            </Multiselect>
            <p v-show="!formPackageInfo.privateSlot" class="help text-danger">
              Choose private class time for this package.
            </p>
          </V-Control>
        </V-Field>
      </div>
      <!-- Package Type -->
      <div class="column is-12">
        <V-Field>
          <label>Package Type</label>
          <V-Control>
            <V-Radio
              v-for="(type, idx) in packageTypeItems"
              :key="idx"
              v-model="formPackageInfo.type"
              :value="type.value"
              :label="type.key"
              :name="type.key"
              color="primary"
              square
              :disabled="readonly"
            />
            <p v-show="!formPackageInfo.type" class="help text-danger">
              Choose private class time for this package.
            </p>
          </V-Control>
        </V-Field>
      </div>
      <!-- Globish Level -->
      <div class="column is-6">
        <V-Field>
          <label>Globish Level</label>
          <V-Control>
            <Multiselect
              v-model="formPackageInfo.globishLevel"
              placeholder="Select or search globish level"
              :options="globishLevelItems"
              track-by="key"
              value-prop="value"
              :disabled="readonly"
            >
              <template #singlelabel="{ value }">
                <div class="multiselect-single-label">
                  {{ value.key }}
                </div>
              </template>
              <template #option="{ option }">
                <span class="select-option-text">
                  {{ option.key }}
                </span>
              </template>
            </Multiselect>
            <p v-show="!formPackageInfo.globishLevel" class="help text-danger">
              Choose globish level for this package.
            </p>
          </V-Control>
        </V-Field>
      </div>
      <!-- CEFR Level -->
      <div class="column is-6">
        <V-Field>
          <label>CEFR Level</label>
          <V-Control>
            <Multiselect
              v-model="formPackageInfo.cefrLevel"
              placeholder="Select or search CEFR level"
              :options="cefrLevelItems"
              track-by="key"
              value-prop="value"
              :disabled="readonly"
            >
              <template #singlelabel="{ value }">
                <div class="multiselect-single-label">
                  {{ value.key }}
                </div>
              </template>
              <template #option="{ option }">
                <span class="select-option-text">
                  {{ option.key }}
                </span>
              </template>
            </Multiselect>
            <p v-show="!formPackageInfo.cefrLevel" class="help text-danger">
              Choose CEFR level for this package.
            </p>
          </V-Control>
        </V-Field>
      </div>
      <!-- Photo -->
      <div class="column is-12">
        <V-Field>
          <label>Photo Link</label>
          <V-Control icon="lnil lnil-link-alt">
            <!-- <div class="file has-name">
              <label class="file-label">
                <input class="file-input" type="file" name="resume" />
                <span class="file-cta">
                  <span class="file-icon">
                    <i class="fas fa-cloud-upload-alt"></i>
                  </span>
                  <span class="file-label"> Choose a file… </span>
                </span>
                <span class="file-name light-text">
                  22082020_project_budget.xls
                </span>
              </label>
            </div> -->
            <input
              v-model="formPackageInfo.photo"
              type="text"
              class="input"
              placeholder="Photo URL..."
              :disabled="readonly"
            />
          </V-Control>
        </V-Field>
      </div>

      <!-- Form Header -->
      <!-- Addon Package -->
      <div class="form-header column is-12">
        <h3>Package's addons</h3>
      </div>

      <!-- Curriculum (Old) -->
      <div class="column is-12">
        <V-Field>
          <label>Curriculum Link (Old)</label>
          <V-Control icon="lnil lnil-link-alt">
            <!-- <div class="file has-name">
              <label class="file-label">
                <input class="file-input" type="file" name="resume" />
                <span class="file-cta">
                  <span class="file-icon">
                    <i class="fas fa-cloud-upload-alt"></i>
                  </span>
                  <span class="file-label"> Choose a file… </span>
                </span>
                <span class="file-name light-text">
                  22082020_project_budget.xls
                </span>
              </label>
            </div> -->
            <input
              v-model="formPackageInfo.curriculumSheet"
              type="text"
              class="input"
              placeholder="Curriculum URL..."
              :disabled="readonly"
            />
          </V-Control>
        </V-Field>
      </div>
      <!-- Curriculum (New) -->
      <div class="column is-12">
        <V-Field>
          <label>Curriculum (New)</label>
          <V-Control>
            <SelectOption
              v-model="formPackageInfo.curriculumId"
              :callback-search="fetchCurriculumsOption"
              :readonly="readonly"
              label-by="name"
              value-prop="id"
              placeholder="Select or search curriculum"
            />
          </V-Control>
        </V-Field>
      </div>
      <!-- Engder -->
      <div class="column is-6">
        <V-Field>
          <label>Engder</label>
          <V-Control>
            <Multiselect
              v-model="formPackageInfo.engder"
              placeholder="Select or search package engder"
              :options="packageEngderItems"
              track-by="key"
              value-prop="value"
              :disabled="readonly"
            >
              <template #singlelabel="{ value }">
                <div class="multiselect-single-label">
                  {{ value.key }}
                </div>
              </template>
              <template #option="{ option }">
                <span class="select-option-text">
                  {{ option.key }}
                </span>
              </template>
            </Multiselect>
          </V-Control>
        </V-Field>
      </div>
      <!-- Globish Plus -->
      <div class="column is-6">
        <V-Field>
          <label>Globish Plus</label>
          <V-Control>
            <FeatureGroupOption
              :model-value="formPackageInfo.featureGroupId"
              :disabled="readonly"
            />
          </V-Control>
        </V-Field>
      </div>
      <!-- Find My Coach -->
      <div class="column is-6">
        <V-Field>
          <label>Find My Coach</label>
          <V-Control :has-error="false">
            <SelectOption
              v-model="formPackageInfo.findMycoachId"
              :callback-search="fetchFindMyCoachesOption"
              :readonly="readonly"
              label-by="packageName"
              value-prop="id"
              placeholder="Select or search find by coach"
            />
          </V-Control>
        </V-Field>
      </div>
      <!-- Course (Mook) -->
      <div class="column is-6">
        <V-Field>
          <label>Course (Mook)</label>
          <V-Control>
            <SelectOption
              v-model="formPackageInfo.moocCourseId"
              :callback-search="fetchMoocCoursesOption"
              :readonly="readonly"
              label-by="title"
              value-prop="id"
              placeholder="Select or search mooc course"
            />
          </V-Control>
        </V-Field>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '../../../scss/abstracts/_variables.scss';

.form-header {
  padding-top: 60px !important;

  h3 {
    font-weight: 600;
  }

  &:first-child {
    padding-top: 0 !important;
  }
}
</style>
