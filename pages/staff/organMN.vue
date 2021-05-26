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
                      required
                      v-model="details.nameTh"
                    >
                    </v-text-field>
                  </v-col>
                  <!-- English Name -->
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      label="Name(English)"
                      required
                      v-model="details.nameEng"
                    >
                    </v-text-field>
                  </v-col>
                  <!-- Description -->
                  <v-col cols="12">
                    <v-text-field
                      label="Description*"
                      required
                      v-model="details.description"
                    >
                    </v-text-field>
                  </v-col>
                  <!-- image -->
                  <v-col cols="12" sm="6" md="4">
                    <v-file-input
                      label="Upload image"
                      filled
                      prepend-icon="mdi-camera"
                      v-model="details.imgPath"
                    >
                    </v-file-input>
                  </v-col>
                </v-row>
              </v-container>
              <small>*indicates required field</small>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="dialogAdd = false">
                Close
              </v-btn>
              <v-btn color="blue darken-1" text @click="uploadFile">
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
                    >
                    </v-text-field>
                  </v-col>
                  <!-- English Name -->
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      label="Name(English)"
                      required
                      v-model="editedItem.nameEng"
                    >
                    </v-text-field>
                  </v-col>
                  <!-- Description -->
                  <v-col cols="12">
                    <v-text-field
                      label="Description*"
                      required
                      v-model="editedItem.description"
                    >
                    </v-text-field>
                  </v-col>
                  <!-- image -->
                  <v-col cols="12" sm="6" md="4">
                    <v-file-input
                      label="Upload image"
                      filled
                      prepend-icon="mdi-camera"
                      v-model="editedItem.imgPath"
                    >
                    </v-file-input>
                  </v-col>
                </v-row>
              </v-container>
              <small>*indicates required field</small>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="dialog = false">
                Close
              </v-btn>
              <v-btn color="blue darken-1" text @click="saveData"> Save </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </div>
  </div>
</template>

<script>
import { getOrgan, addOrgan, deleteOrgan, putOrgan } from '@/service/organ'
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
          value: 'nameTh',
        },
        {
          text: 'Name',
          align: 'start',
          sortable: false,
          value: 'nameEng',
        },
        { text: 'Actions', value: 'actions', sortable: false},
      ],
      organ: null,
      organlist: [],
      editedIndex: -1,
      editedItem: {
        id: '',
        nameTh: '',
        nameEng: '',
        description: '',
        imgPath: null,
      },
      details: {
        nameTh: '',
        nameEng: '',
        description: '',
        imgPath: null,
      },
    }
  },
  mounted() {
    getOrgan().then((res) => {
      console.log(res.data)
      this.organlist = res.data
    })
  },
  methods: {
    editItem(item) {
      this.editedIndex = this.organlist.indexOf(item)
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
      putOrgan(formData).then((_a) => {
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
      addOrgan(formData).then((_a) => {
        this.$router.go()
      })
    },

    removeData(id) {
      const result = confirm('Want to delete?')
      console.log(id)
      if (result) {
        deleteOrgan(id).then((_a) => {
          this.$router.go()
        })
      }
    },
  },
}
</script>
<style>
.OrUploadFile {
  margin-top: 50px;
}
</style>
