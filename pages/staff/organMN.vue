<template>
  <div>
    <h2>Organ Management</h2>
    <!-- Add Animal -->
    <v-btn color="primary" dark text @click="dialogAdd = true">
      Add Organ
    </v-btn>

    <div class="organTableMN">
      <v-card-title>
        รายการอวัยวะ
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
          dent
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="organlist"
        :items-per-page="5"
        :search="search"
        class="organTable"
      >
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">
            mdi-pencil
          </v-icon>
          <v-icon small @click="removeData(item.id)"> mdi-delete </v-icon>
        </template>
      </v-data-table>

      <v-row justify="center" class="NewsDetail">
        <!-- Insert Organ -->
        <v-dialog v-model="dialogAdd" persistent max-width="600px">
          <v-card>
            <v-card-title>
              <span class="headline">New Organ</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <!-- Thai Name -->
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      label="Name(Thai)"
                      v-model="details.nameTh"
                      :rules="rules.nameThai"
                      required
                    >
                    </v-text-field>
                  </v-col>
                  <!-- English Name -->
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      label="Name(English)"
                      required
                      v-model="details.nameEng"
                      :rules="rules.nameEng"
                    >
                    </v-text-field>
                  </v-col>
                  <!-- Description -->
                  <v-col cols="12">
                    <v-textarea
                      label="Description"
                      required
                      v-model="details.description"
                      :rules="rules.name"
                    >
                    </v-textarea>
                  </v-col>
                  <!-- image -->
                  <v-col cols="12" sm="6" md="4">
                    <p>Organ Image</p>
                    <vue-upload-multiple-image
                      @upload-success="uploadImageSuccess"
                      @before-remove="beforeRemove"
                      @edit-image="editImage"
                      @data-change="dataChange"
                      :data-images="images"
                      primaryText="Upload Images"
                      popupText="Description default image"
                      browseText="Choose file"
                      dragText="Drag Images"
                      markIsPrimaryText="Set to First"
                      v-model="details.imgPath"
                    ></vue-upload-multiple-image>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="dialogAdd = false">
                Close
              </v-btn>
              <v-btn
                :disabled="!detailsIsValid"
                color="blue darken-1"
                text
                @click="uploadFile"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <!-- Update Organ -->
        <v-dialog v-model="dialog" persistent max-width="600px">
          <v-card>
            <v-card-title>
              <span class="headline">Organ</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <!-- Thai Name -->
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      label="Name(Thai)"
                      required
                      v-model="editedItem.nameTh"
                      :rules="rules.nameThai"
                    >
                    </v-text-field>
                  </v-col>
                  <!-- English Name -->
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      label="Name(English)"
                      required
                      v-model="editedItem.nameEng"
                      :rules="rules.nameEng"
                    >
                    </v-text-field>
                  </v-col>
                  <!-- Description -->
                  <v-col cols="12">
                    <v-textarea
                      label="Description"
                      required
                      v-model="editedItem.description"
                      :rules="rules.name"
                    >
                    </v-textarea>
                  </v-col>
                  <!-- image -->
                  <v-col cols="12" sm="6" md="4">
                    <p>Organ Image</p>
                    <vue-upload-multiple-image
                      @upload-success="uploadImageSuccess"
                      @before-remove="beforeRemove"
                      @edit-image="editImage"
                      @data-change="dataChange"
                      :data-images="images"
                      primaryText="Upload Images"
                      popupText="Description default image"
                      browseText="Choose file"
                      dragText="Drag Images"
                      markIsPrimaryText="Set to First"
                    ></vue-upload-multiple-image>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="dialog = false">
                Close
              </v-btn>
              <v-btn
                :disabled="!editedItemIsvalid"
                color="blue darken-1"
                text
                @click="saveData"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </div>
  </div>
</template>

<script>
import { getOrgan, addOrgan, deleteOrgan, putOrgan } from '@/service/organ'
import VueUploadMultipleImage from 'vue-upload-multiple-image'
import { addImage } from '@/service/image'
import Vue from 'vue'

export default Vue.extend({
  layout: 'admin',

  components: {
    VueUploadMultipleImage,
  },
  data() {
    return {
      images: [],
      search: '',
      dialog: false,
      dialogAdd: false,
      headers: [
        {
          text: 'Name',
          align: 'start',
          sortable: false,
          value: 'nameTh',
        },
        {
          text: 'Name',
          align: 'start',
          sortable: false,
          value: 'nameEng',
        },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      organlist: [],
      editedIndex: -1,
      editedItem: {
        id: '',
        nameTh: '',
        nameEng: '',
        description: '',
        imgPath: [],
      },
      details: {
        nameTh: '',
        nameEng: '',
        description: '',
        imgPath: [],
      },
      rules: {
        name: [(val) => (val || '').length > 0 || 'This field is required'],
        nameThai: [
          (val) => (val || '').match(/^[ก-๏\s]+$/) || 'Thai language only',
        ],
        nameEng: [
          (val) =>
            (val || '').match(/^[a-zA-Z\s]+$/) || 'English language only',
        ],
      },
    }
  },

  computed: {
    detailsIsValid() {
      return (
        this.details.nameTh && this.details.nameEng && this.details.description
      )
    },
    editedItemIsvalid() {
      return (
        this.editedItem.nameTh &&
        this.editedItem.nameEng &&
        this.editedItem.description
      )
    },
  },

  mounted() {
    getOrgan().then((res) => {
      console.log(res.data)
      this.organlist = res.data
    })
  },
  methods: {
    // add img
    uploadImageSuccess(formData, index, fileList) {
      console.log('data', formData, index, fileList)
      addImage(formData).then((res) => {
        this.details.imgPath.push(res.data)
      })
    },
    beforeRemove(index, done, fileList) {
      console.log('index', index, fileList)
      const r = confirm('remove image')
      if (r === true) {
        done()
      }
    },
    editImage(formData, index, fileList) {
      console.log('edit data', formData, index, fileList)
    },
    dataChange(data) {
      console.log(data)
    },
    // Edit data
    editItem(item) {
      this.editedIndex = this.organlist.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    // update
    saveData() {
      const formData = new FormData()
      for (const i in this.editedItem) {
        formData.append(i, this.editedItem[i])
      }
      console.log(formData)
      putOrgan(formData).then((_a) => {
        this.$router.go()
      })
      this.dialog = false
    },
    // Add
    uploadFile() {
      const formData = new FormData()
      for (const i in this.details) {
        formData.append(i, this.details[i])
      }
      addOrgan(formData).then((_a) => {
        this.$router.go()
      })
      this.dialogAdd = false
    },
    // Delete
    removeData(id) {
      const result = confirm('Want to delete?')
      if (result) {
        deleteOrgan(id).then((_a) => {
          this.$router.go()
        })
      }
    },
  },
})
</script>
<style></style>
