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
                      :rules="rules.name"
                    >
                    </v-text-field>
                  </v-col>
                  <!-- Commom Name -->
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      label="Common Name"
                      required
                      v-model="details.commonName"
                      :rules="rules.name"
                    >
                    </v-text-field>
                  </v-col>
                  <!-- scientific Name -->
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      label="Scientific Name"
                      required
                      v-model="details.scientificName"
                      :rules="rules.name"
                    >
                    </v-text-field>
                  </v-col>

                  <!-- Description -->
                  <v-col cols="12">
                    <v-textarea
                      label="Description*"
                      required
                      v-model="details.description"
                      :rules="rules.name"
                    >
                    </v-textarea>
                  </v-col>
                  <!-- image -->
                  <v-col cols="12" sm="6" md="4">
                    <v-file-input
                      label="Upload image"
                      filled
                      prepend-icon="mdi-camera"
                      v-model="details.boneImgPath"
                    >
                    </v-file-input>
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
                          v-model="details.kingdom"
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
                          v-model="details.phylum"
                        >
                        </v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          label="Subphylum"
                          required
                          v-model="details.subPhylum"
                        >
                        </v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          label="Infraphylum"
                          required
                          v-model="details.infraPhylum"
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
                          v-model="details.class"
                        >
                        </v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          label="Subclass"
                          required
                          v-model="details.subClass"
                        >
                        </v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          label="Infraclass"
                          required
                          v-model="details.infraClass"
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
                          v-model="details.order"
                        >
                        </v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          label="Suborder"
                          required
                          v-model="details.subOrder"
                        >
                        </v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          label="Infraorder"
                          required
                          v-model="details.infraOrder"
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
                          v-model="details.family"
                        >
                        </v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          label="Subfamily"
                          required
                          v-model="details.subFamily"
                        >
                        </v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          label="Infrafamily"
                          required
                          v-model="details.infraFamily"
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
                          v-model="details.genus"
                        >
                        </v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          label="Subgenus"
                          required
                          v-model="details.subGenus"
                        >
                        </v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          label="Infragenus"
                          required
                          v-model="details.infraGenus"
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
                          v-model="details.species"
                        >
                        </v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          label="Subspecies"
                          required
                          v-model="details.subSpecies"
                        >
                        </v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          label="Infraspecies"
                          required
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
                      required
                      v-model="editedItem.thaiName"
                      :rules="rules.name"
                    >
                    </v-text-field>
                  </v-col>
                  <!-- Commom Name -->
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      label="Common Name"
                      required
                      v-model="editedItem.commonName"
                      :rules="rules.name"
                    >
                    </v-text-field>
                  </v-col>
                  <!-- scientific Name -->
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      label="Scientific Name"
                      required
                      v-model="editedItem.scientificName"
                      :rules="rules.name"
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
                    <v-file-input
                      label="Upload image"
                      filled
                      prepend-icon="mdi-camera"
                      v-model="editedItem.boneImgPath"
                    >
                    </v-file-input>
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
import { getAnimal, addAnimal, putAnimal, deleteAnimal } from '@/service/animal'

export default {
  data() {
    return {
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
        boneImgPath: null,
        commonName: '',
        description: '',
        imgPath: null,
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
        boneImgPath: null,
        commonName: '',
        description: '',
        imgPath: null,
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
        this.editItem.thaiName &&
        this.editItem.commonName &&
        this.editItem.scientificName &&
        this.editItem.description
      )
    },
  },
  mounted() {
    getAnimal().then((res) => {
      console.log(res.data)
      this.bonelist = res.data
    })
  },
  methods: {
    editItem(item) {
      this.editedIndex = this.bonelist.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    saveData() {
      const formData = new FormData()
      for (const i in this.editedItem) {
        formData.append(i, this.editedItem[i])
      }
      console.log(this.editedItem)
      console.log(formData)
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
}
</script>

<style></style>
