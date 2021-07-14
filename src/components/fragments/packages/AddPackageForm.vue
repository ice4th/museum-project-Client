<script setup lang="ts">
import { defineProps } from 'vue'
import type { PropType } from 'vue'
import type { ICratePackageForm } from '/@src/types/interfaces/package.interface'
import { addCommas } from '/@src/helpers/filter.helper'

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
    type: Object as PropType<ICratePackageForm>,
    default: undefined,
  },
})
</script>

<template>
  <div class="form-fieldset">
    <div class="fieldset columns is-multiline">
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
          <V-Control icon="feather:search">
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
          </V-Control>
        </V-Field>
      </div>
      <!-- Purchasable -->
      <div class="column is-6">
        <V-Field>
          <label>&nbsp;</label>
          <V-Control>
            <V-SwitchBlock
              v-model="isPurchasable"
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
              v-model="selected"
              value="value_1"
              label="None"
              name="status_radio"
              color="primary"
              square
            />
            <V-Radio
              v-model="selected"
              value="value_2"
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
              v-model="detailText"
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
              v-model="commentText"
              class="textarea"
              rows="2"
              placeholder="Add comment..."
            ></textarea>
          </V-Control>
        </V-Field>
      </div>
      <!-- Globish Level -->
      <div class="column is-6">
        <V-Field>
          <label>Globish Level</label>
          <V-Control>
            <div class="select">
              <select v-model="selectStatus">
                <option value="">Select some status</option>
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
      <!-- CEFR Level -->
      <div class="column is-6">
        <V-Field>
          <label>CEFR Level</label>
          <V-Control>
            <div class="select">
              <select v-model="selectStatus">
                <option value="">Select some status</option>
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
                  placeholder="Price"
                />
              </V-Control>
            </V-Field>
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
                  placeholder="Before Discount"
                />
              </V-Control>
            </V-Field>
          </V-Control>
        </V-Field>
      </div>
      <!-- Installment -->
      <div class="column is-6">
        <V-Field>
          <label>Installment</label>
          <V-Control>
            <div class="select">
              <select v-model="selectStatus">
                <option value="">Select installment</option>
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
      <!-- Endger -->
      <div class="column is-6">
        <V-Field>
          <label>Endger</label>
          <V-Control>
            <div class="select">
              <select v-model="selectStatus">
                <option value="">Select endger</option>
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
      <!-- Type -->
      <div class="column is-6">
        <V-Field>
          <label>Type</label>
          <V-Control>
            <div class="select">
              <select v-model="selectStatus">
                <option value="">Select type</option>
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
      <!-- Duration -->
      <div class="column is-6">
        <V-Field>
          <label>Duration</label>
          <V-Control>
            <V-Field addons>
              <V-Control expanded>
                <input
                  v-model="duration"
                  type="number"
                  class="input"
                  placeholder="Add total month..."
                />
              </V-Control>
              <V-Control>
                <a class="button is-static">month</a>
              </V-Control>
            </V-Field>
          </V-Control>
        </V-Field>
      </div>
      <!-- 1 on 1 Ticket -->
      <div class="column is-6">
        <V-Field>
          <label>1 on 1 Ticket</label>
          <V-Control icon="lnil lnil-ticket">
            <input
              v-model="duration"
              type="number"
              class="input"
              placeholder="Specific ticket number..."
            />
          </V-Control>
        </V-Field>
      </div>
      <!-- Freetalk Ticket -->
      <div class="column is-6">
        <V-Field>
          <label>Freetalk Ticket</label>
          <V-Control icon="lnil lnil-ticket">
            <input
              v-model="duration"
              type="number"
              class="input"
              placeholder="Specific ticket number..."
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
              v-model="duration"
              type="number"
              class="input"
              placeholder="Specific ticket number..."
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
              v-model="duration"
              type="number"
              class="input"
              placeholder="Specific ticket number..."
            />
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
            <input type="text" class="input" placeholder="Photo URL..." />
          </V-Control>
        </V-Field>
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
            <input type="text" class="input" placeholder="Curriculum URL..." />
          </V-Control>
        </V-Field>
      </div>
      <!-- Curriculum (New) -->
      <div class="column is-6">
        <V-Field>
          <label>Curriculum (New)</label>
          <V-Control>
            <div class="select">
              <select v-model="selectStatus">
                <option value="">Select installment</option>
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
      <!-- Globish Plus -->
      <div class="column is-6">
        <V-Field>
          <label>Globish Plus</label>
          <V-Control>
            <div class="select">
              <select v-model="selectStatus">
                <option value="">Select endger</option>
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
      <!-- Find My Coach -->
      <div class="column is-6">
        <V-Field>
          <label>Find My Coach</label>
          <V-Control>
            <div class="select">
              <select v-model="selectStatus">
                <option value="">Select type</option>
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
      <!-- Course (Mook) -->
      <div class="column is-6">
        <V-Field>
          <label>Course (Mook)</label>
          <V-Control>
            <div class="select">
              <select v-model="selectStatus">
                <option value="">Select installment</option>
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
      <!-- Private class time -->
      <div class="column is-6">
        <V-Field>
          <label>Private class time</label>
          <V-Control>
            <div class="select">
              <select v-model="selectStatus">
                <option value="">Select class time</option>
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
