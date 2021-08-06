<script setup lang="ts">
import { computed, defineProps } from 'vue'
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
  products: {
    type: Array,
    default: () => [],
  },
  curriculums: {
    type: Array,
    default: () => [],
  },
  featureGroups: {
    type: Array,
    default: () => [],
  },
  fmcPackages: {
    type: Array,
    default: () => [],
  },
  moocCourses: {
    type: Array,
    default: () => [],
  },
  packageName: {
    type: String,
    default: '',
  },
  createPackageForm: {
    type: Object as PropType<IFormPackageInfo>,
    default: undefined,
  },
  loadingOptions: {
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
              v-model="createPackageForm.packageName"
              type="text"
              class="input"
              placeholder="Package name"
            />
            <p v-show="!createPackageForm.packageName" class="help text-danger">
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
              v-model="createPackageForm.packageNameInternal"
              type="text"
              class="input"
              placeholder="Internal Package Name"
            />
          </V-Control>
        </V-Field>
      </div>
      <!-- Field Select Product Item -->
      <div class="column is-12">
        <V-Field class="is-autocomplete-select">
          <label>Product</label>
          <V-Control icon="feather:search" :loading="loadingOptions">
            <Multiselect
              v-model="createPackageForm.productId"
              placeholder="Select product"
              :options="products"
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
            <p v-show="!createPackageForm.productId" class="help text-danger">
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
              v-model="createPackageForm.purchasable"
              label="Purchasable"
              color="primary"
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
              v-model="createPackageForm.status"
              value="0"
              label="None"
              name="status_radio"
              color="primary"
              square
            />
            <V-Radio
              v-model="createPackageForm.status"
              value="1"
              label="General"
              name="status_radio"
              color="primary"
              square
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
              v-model="createPackageForm.detail"
              class="textarea"
              rows="2"
              placeholder="Add detail..."
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
              v-model="createPackageForm.comment"
              class="textarea"
              rows="2"
              placeholder="Add comment..."
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
          <label>Price {{ addCommas(props.createPackageForm.price) }}</label>
          <V-Control>
            <V-Field addons>
              <V-Control>
                <a class="button is-static">฿</a>
              </V-Control>
              <V-Control expanded>
                <input
                  v-model="props.createPackageForm.price"
                  type="number"
                  class="input"
                  placeholder="Amount..."
                  @change="
                    props.createPackageForm.price =
                      +props.createPackageForm.price
                  "
                />
              </V-Control>
            </V-Field>
            <p
              v-show="parseInt(`${createPackageForm.price}`) < 0"
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
            {{ addCommas(props.createPackageForm.beforeDiscount) }}</label
          >
          <V-Control>
            <V-Field addons>
              <V-Control>
                <a class="button is-static">฿</a>
              </V-Control>
              <V-Control expanded>
                <input
                  v-model="props.createPackageForm.beforeDiscount"
                  type="number"
                  class="input"
                  placeholder="Amount..."
                  @change="
                    props.createPackageForm.beforeDiscount =
                      +props.createPackageForm.beforeDiscount
                  "
                />
              </V-Control>
            </V-Field>
            <p
              v-show="parseInt(`${createPackageForm.beforeDiscount}`) < 0"
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
              v-model="createPackageForm.installmentMonth"
              placeholder="Select installment"
              :options="installmentItems"
              track-by="key"
              value-prop="value"
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
              v-show="isNil(createPackageForm.installmentMonth)"
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
                  v-model="createPackageForm.duration"
                  type="number"
                  class="input"
                  placeholder="duration..."
                  @change="
                    props.createPackageForm.duration =
                      +props.createPackageForm.duration
                  "
                />
              </V-Control>
              <V-Control>
                <a class="button is-static">month</a>
              </V-Control>
            </V-Field>
            <p v-show="!createPackageForm.duration" class="help text-danger">
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
              v-model="createPackageForm.ticketOneOnOne"
              type="number"
              class="input"
              placeholder="1 on 1 ticket..."
              @change="
                props.createPackageForm.ticketOneOnOne =
                  +props.createPackageForm.ticketOneOnOne
              "
            />
          </V-Control>
          <p
            v-show="!createPackageForm.ticketOneOnOne"
            class="help text-danger"
          >
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
              v-model="createPackageForm.ticketFreetalk"
              type="number"
              class="input"
              placeholder="freetalk ticket..."
              @change="
                props.createPackageForm.ticketFreetalk =
                  +props.createPackageForm.ticketFreetalk
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
              v-model="createPackageForm.ticketGroup"
              type="number"
              class="input"
              placeholder="group class ticket..."
              @change="
                props.createPackageForm.ticketGroup =
                  +props.createPackageForm.ticketGroup
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
              v-model="createPackageForm.ticketMaster"
              type="number"
              class="input"
              placeholder="master class ticket..."
              @change="
                props.createPackageForm.ticketMaster =
                  +props.createPackageForm.ticketMaster
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
              v-model="createPackageForm.privateSlot"
              placeholder="Select private class time"
              :options="privateSlots"
              track-by="key"
              value-prop="value"
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
            <p v-show="!createPackageForm.privateSlot" class="help text-danger">
              Choose private class time for this package.
            </p>
          </V-Control>
        </V-Field>
      </div>
      <!-- Type -->
      <div class="column is-12">
        <V-Field>
          <label>Type</label>
          <V-Control>
            <V-Radio
              v-for="(type, idx) in packageTypeItems"
              :key="idx"
              v-model="createPackageForm.type"
              :value="type.value"
              :label="type.key"
              :name="type.key"
              color="primary"
              square
            />
          </V-Control>
        </V-Field>
      </div>
      <!-- Globish Level -->
      <div class="column is-6">
        <V-Field>
          <label>Globish Level</label>
          <V-Control>
            <Multiselect
              v-model="createPackageForm.globishLevel"
              placeholder="Select globish level"
              :options="globishLevelItems"
              track-by="key"
              value-prop="value"
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
              v-show="!createPackageForm.globishLevel"
              class="help text-danger"
            >
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
              v-model="createPackageForm.cefrLevel"
              placeholder="Select CEFR level"
              :options="cefrLevelItems"
              track-by="key"
              value-prop="value"
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
            <p v-show="!createPackageForm.cefrLevel" class="help text-danger">
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
              v-model="createPackageForm.photo"
              type="text"
              class="input"
              placeholder="Photo URL..."
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
              v-model="createPackageForm.curriculumSheet"
              type="text"
              class="input"
              placeholder="Curriculum URL..."
            />
          </V-Control>
        </V-Field>
      </div>
      <!-- Curriculum (New) -->
      <div class="column is-12">
        <V-Field>
          <label>Curriculum (New)</label>
          <V-Control>
            <Multiselect
              v-model="createPackageForm.curriculumId"
              placeholder="Select curriculum"
              :options="curriculums"
              track-by="name"
              value-prop="id"
            >
              <template #singlelabel="{ value }">
                <div class="multiselect-single-label">
                  {{ value.name }}
                </div>
              </template>
              <template #option="{ option }">
                <span class="select-option-text">
                  {{ option.name }}
                </span>
              </template>
            </Multiselect>
          </V-Control>
        </V-Field>
      </div>
      <!-- Engder -->
      <div class="column is-6">
        <V-Field>
          <label>Engder</label>
          <V-Control>
            <Multiselect
              v-model="createPackageForm.engder"
              placeholder="Select package engder"
              :options="packageEngderItems"
              track-by="key"
              value-prop="value"
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
            <Multiselect
              v-model="createPackageForm.featureGroupId"
              placeholder="Select feature group"
              :options="featureGroups"
              track-by="name"
              value-prop="id"
            >
              <template #singlelabel="{ value }">
                <div class="multiselect-single-label">
                  {{ value.name }}
                </div>
              </template>
              <template #option="{ option }">
                <span class="select-option-text">
                  {{ option.name }}
                </span>
              </template>
            </Multiselect>
          </V-Control>
        </V-Field>
      </div>
      <!-- Find My Coach -->
      <div class="column is-6">
        <V-Field>
          <label>Find My Coach</label>
          <V-Control :has-error="false">
            <Multiselect
              v-model="createPackageForm.findMycoachId"
              placeholder="Select find my coach"
              :options="fmcPackages"
              track-by="packageName"
              value-prop="id"
            >
              <template #singlelabel="{ value }">
                <div class="multiselect-single-label">
                  {{ value.packageName }}
                </div>
              </template>
              <template #option="{ option }">
                <span class="select-option-text">
                  {{ option.packageName }}
                </span>
              </template>
            </Multiselect>
          </V-Control>
        </V-Field>
      </div>
      <!-- Course (Mook) -->
      <div class="column is-6">
        <V-Field>
          <label>Course (Mook)</label>
          <V-Control>
            <Multiselect
              v-model="createPackageForm.moocCourseId"
              placeholder="Select mooc course"
              :options="moocCourses"
              track-by="title"
              value-prop="id"
            >
              <template #singlelabel="{ value }">
                <div class="multiselect-single-label">
                  {{ value.title }}
                </div>
              </template>
              <template #option="{ option }">
                <span class="select-option-text">
                  {{ option.title }}
                </span>
              </template>
            </Multiselect>
          </V-Control>
        </V-Field>
      </div>

      <!-- <div class="column is-12">
        <V-Field>
          <label>Subscription class type</label>
          <V-Control>
            <div class="select">
              <select v-model="selectStatus">
                <option value="">Select subscription class type</option>
                <option value="Superman">Superman</option>
                <option value="Batman">Batman</option>
                <option value="Spiderman">Spiderman</option>
                <option value="Deadpool">Deadpool</option>
                <option value="Spawn">Spawn</option>
                <option value="Galactus">Galactus</option>
              </select>
            </div>
          </V-Control>
        </V-Field>
      </div>
      <div class="column is-4">
        <V-Field>
          <label>Limit per day</label>
          <V-Control icon="lnil lnil-ticket">
            <input
              v-model="duration"
              type="number"
              class="input"
              placeholder="Limit ticket..."
            />
          </V-Control>
        </V-Field>
      </div>
      <div class="column is-4">
        <V-Field>
          <label>Limit per week</label>
          <V-Control icon="lnil lnil-ticket">
            <input
              v-model="duration"
              type="number"
              class="input"
              placeholder="Limit ticket..."
            />
          </V-Control>
        </V-Field>
      </div>
      <div class="column is-4">
        <V-Field>
          <label>Limit per month</label>
          <V-Control icon="lnil lnil-ticket">
            <input
              v-model="duration"
              type="number"
              class="input"
              placeholder="Limit ticket..."
            />
          </V-Control>
        </V-Field>
      </div> -->
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '../../../scss/abstracts/_variables.scss';

.form-header {
  padding-top: 60px !important;

  h3 {
    font-weight: 600;
    color: $dark-text;
  }

  &:first-child {
    padding-top: 0 !important;
  }
}
</style>
