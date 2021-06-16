<template>
  <div>
    <h2>Animal Management</h2>
    <!-- Add Animal -->
    <v-btn color="primary" dark text @click="dialogAdd = true">
      Add Animal
    </v-btn>

    <div class="boneTableMN">
      <v-card-title>
        รายการกระดูก
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
        :items="bonelist"
        :items-per-page="5"
        :search="search"
        class="boneTable"
      >
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">
            mdi-pencil
          </v-icon>
          <v-icon small @click="removeData(item.id)"> mdi-delete </v-icon>
        </template>
      </v-data-table>

      <!-- Insert Animal -->
      <v-row justify="center" class="BoneDetail">
        <v-dialog v-model="dialogAdd" persistent max-width="600px">
          <v-card>
            <v-card-title>
              <span class="headline">New Animal</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <!--  title -->
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      label="Name(Thai)"
                      required
                      v-model="details.thaiName"
                      :rules="rules.nameThai"
                    >
                      <!-- thaiName !=== bonelist -->
                    </v-text-field>
                  </v-col>
                  <!-- Commom Name -->
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      label="Common Name"
                      required
                      v-model="details.commonName"
                      :rules="rules.nameEng"
                    >
                    </v-text-field>
                  </v-col>
                  <!-- scientific Name -->
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      label="Scientific Name"
                      required
                      v-model="details.scientificName"
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

                  <!-- anmimal image -->
                  <v-col cols="12" sm="6" md="4">
                    <p>Animal Image</p>
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

                  <!-- Taxonomy -->
                  <row class="pa-6 ma-2">
                    <p class="headline">Taxonomy</p>

                    <!--  kingdom -->
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field label="Kingdom" v-model="details.kingdom">
                        </v-text-field>
                      </v-col>
                    </v-row>

                    <!--  Phylum -->
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field label="Phylum" v-model="details.phylum">
                        </v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          label="Subphylum"
                          v-model="details.subPhylum"
                        >
                        </v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          label="Infraphylum"
                          v-model="details.infraPhylum"
                        >
                        </v-text-field>
                      </v-col>
                    </v-row>

                    <!-- Class -->
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field label="Class" v-model="details.class">
                        </v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          label="Subclass"
                          v-model="details.subClass"
                        >
                        </v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          label="Infraclass"
                          v-model="details.infraClass"
                        >
                        </v-text-field>
                      </v-col>
                    </v-row>

                    <!-- Order -->
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field label="Order" v-model="details.order">
                        </v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          label="Suborder"
                          v-model="details.subOrder"
                        >
                        </v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          label="Infraorder"
                          v-model="details.infraOrder"
                        >
                        </v-text-field>
                      </v-col>
                    </v-row>

                    <!-- Family -->
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field label="Family" v-model="details.family">
                        </v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          label="Subfamily"
                          v-model="details.subFamily"
                        >
                        </v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          label="Infrafamily"
                          v-model="details.infraFamily"
                        >
                        </v-text-field>
                      </v-col>
                    </v-row>

                    <!-- Genus -->
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field label="Genus" v-model="details.genus">
                        </v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          label="Subgenus"
                          v-model="details.subGenus"
                        >
                        </v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          label="Infragenus"
                          v-model="details.infraGenus"
                        >
                        </v-text-field>
                      </v-col>
                    </v-row>

                    <!-- Species -->
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field label="Species" v-model="details.species">
                        </v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          label="Subspecies"
                          v-model="details.subSpecies"
                        >
                        </v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          label="Infraspecies"
                          v-model="details.infraSpecies"
                        >
                        </v-text-field>
                      </v-col>
                    </v-row>
                  </row>
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
      </v-row>

      <!-- Update animal -->
      <v-row justify="center" class="BoneDetail">
        <v-dialog v-model="dialog" persistent max-width="600px">
          <v-card>
            <v-card-title>
              <span class="headline">New Animal</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <!--  title -->
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      label="Name(Thai)"
                      v-model="editedItem.thaiName"
                      :rules="rules.nameThai"
                    >
                    </v-text-field>
                  </v-col>
                  <!-- Commom Name -->
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      label="Common Name"
                      v-model="editedItem.commonName"
                      :rules="rules.nameEng"
                    >
                    </v-text-field>
                  </v-col>
                  <!-- scientific Name -->
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      label="Scientific Name"
                      v-model="editedItem.scientificName"
                      :rules="rules.nameEng"
                    >
                    </v-text-field>
                  </v-col>

                  <!-- Description -->
                  <v-col cols="12">
                    <v-textarea
                      label="Description"
                      v-model="editedItem.description"
                      :rules="rules.name"
                    >
                    </v-textarea>
                  </v-col>
                  <!-- anmimal image -->
                  <v-col cols="12" sm="6" md="4">
                    <p>Animal Image</p>

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

                  <!-- Taxonomy -->
                  <row>
                    <p>Taxonomy</p>

                    <!--  kingdom -->
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          label="Kingdom"
                          required
                          v-model="editedItem.kingdom"
                        >
                        </v-text-field>
                      </v-col>
                    </v-row>

                    <!--  Phylum -->
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          label="Phylum"
                          required
                          v-model="editedItem.phylum"
                        >
                        </v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          label="Subphylum"
                          required
                          v-model="editedItem.subPhylum"
                        >
                        </v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          label="Infraphylum"
                          required
                          v-model="editedItem.infraPhylum"
                        >
                        </v-text-field>
                      </v-col>
                    </v-row>

                    <!-- Class -->
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          label="Class"
                          required
                          v-model="editedItem.class"
                        >
                        </v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          label="Subclass"
                          required
                          v-model="editedItem.subClass"
                        >
                        </v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          label="Infraclass"
                          required
                          v-model="editedItem.infraClass"
                        >
                        </v-text-field>
                      </v-col>
                    </v-row>

                    <!-- Order -->
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          label="Order"
                          required
                          v-model="editedItem.order"
                        >
                        </v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          label="Suborder"
                          required
                          v-model="editedItem.subOrder"
                        >
                        </v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          label="Infraorder"
                          required
                          v-model="editedItem.infraOrder"
                        >
                        </v-text-field>
                      </v-col>
                    </v-row>

                    <!-- Family -->
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          label="Family"
                          required
                          v-model="editedItem.family"
                        >
                        </v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          label="Subfamily"
                          required
                          v-model="editedItem.subFamily"
                        >
                        </v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          label="Infrafamily"
                          required
                          v-model="editedItem.infraFamily"
                        >
                        </v-text-field>
                      </v-col>
                    </v-row>

                    <!-- Genus -->
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          label="Genus"
                          required
                          v-model="editedItem.genus"
                        >
                        </v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          label="Subgenus"
                          required
                          v-model="editedItem.subGenus"
                        >
                        </v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          label="Infragenus"
                          required
                          v-model="editedItem.infraGenus"
                        >
                        </v-text-field>
                      </v-col>
                    </v-row>

                    <!-- Species -->
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          label="Species"
                          required
                          v-model="editedItem.species"
                        >
                        </v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          label="Subspecies"
                          required
                          v-model="editedItem.subSpecies"
                        >
                        </v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          label="Infraspecies"
                          required
                          v-model="editedItem.infraSpecies"
                        >
                        </v-text-field>
                      </v-col>
                    </v-row>
                  </row>
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
import {
  getAnimalById,
  getAnimal,
  addAnimal,
  putAnimal,
  deleteAnimal,
} from '@/service/animal'
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
          value: 'thaiName',
        },
        {
          text: 'commonName',
          align: 'start',
          sortable: false,
          value: 'commonName',
        },
        { text: 'Actions', value: 'actions', sortable: false },
      ],

      editedIndex: -1,
      editedItem: {
        id: '',
        commonName: '',
        description: '',
        imgPath: [],
        scientificName: '',
        taxonomyId: '',
        thaiName: '',
        kingdom: '',
        phylum: '',
        subPhylum: '',
        infraPhylum: '',
        class: '',
        subClass: '',
        infraClass: '',
        order: '',
        subOrder: '',
        infraOrder: '',
        family: '',
        subFamily: '',
        infraFamily: '',
        genus: '',
        subGenus: '',
        ifraGenus: '',
        species: '',
        subSpecies: '',
      },
      bonelist: [],

      bone: null,
      details: {
        commonName: '',
        description: '',
        imgPath: [],
        scientificName: '',
        thaiName: '',
        taxonomyId: '',
        kingdom: '',
        phylum: '',
        subPhylum: '',
        infraPhylum: '',
        class: '',
        subClass: '',
        infraClass: '',
        order: '',
        subOrder: '',
        infraOrder: '',
        family: '',
        subFamily: '',
        infraFamily: '',
        genus: '',
        subGenus: '',
        infraGenus: '',
        species: '',
        subSpecies: '',
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
        this.details.thaiName &&
        this.details.commonName &&
        this.details.scientificName &&
        this.details.description
      )
    },
    editedItemIsvalid() {
      return (
        this.editedItem.thaiName &&
        this.editedItem.commonName &&
        this.editedItem.scientificName &&
        this.editedItem.description
      )
    },
  },

  mounted() {
    getAnimal().then((res) => {
      console.log('name', res.data)
      this.bonelist = res.data
      console.log('bone', this.bonelist)
    })
  },

  methods: {
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
      this.editedIndex = this.bonelist.indexOf(item)
      this.editedItem = Object.assign({}, item)
      getAnimalById(item.id).then((res) => {
        console.log('taxonomy', res.data.taxonomyId)
        this.editedItem = { ...this.editedItem, ...res.data.taxonomyId }
      })
      this.dialog = true
    },

    saveData() {
      const formData = new FormData()
      for (const i in this.editedItem) {
        formData.append(i, this.editedItem[i])
      }
      putAnimal(formData).then((_a) => {
        this.$router.go()
      })
      this.dialog = false
    },

    uploadFile() {
      this.dialogAdd = false
      const formData = new FormData()
      for (const i in this.details) {
        formData.append(i, this.details[i])
      }
      addAnimal(formData).then((_a) => {
        this.$router.go()
      })
    },

    removeData(id) {
      const result = confirm('Want to delete?')
      console.log(id)
      if (result) {
        deleteAnimal(id).then((_a) => {
          this.$router.go()
        })
      }
    },
  },
})
</script>

<style></style>
