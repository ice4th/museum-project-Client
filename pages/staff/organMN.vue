<template>
  <div>
    <h2>Organ Management</h2>
    <div class="OrUploadFile">
      <h4>Upload File</h4>
      <v-file-input v-model="organ"></v-file-input>
      <v-btn block @click="uploadFile"> send file </v-btn>
    </div>
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
        <template #[`item.dialog`]="{ on, attrs }">
          <v-btn
            color="primary"
            light
            v-bind="attrs"
            v-on="on"
            text
            @click="dialog = true"
          >
            เพิ่มรูปภาพ
          </v-btn>
        </template>
      </v-data-table>

      <!-- Update bone -->
      <v-row justify="center" class="OrganDetail">
        <v-dialog v-model="dialog" persistent max-width="600px">
          <v-card>
            <v-card-title>
              <span class="headline">Upload picture for animal Organ</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-file-input
                      label="Upload image"
                      filled
                      prepend-icon="mdi-camera"
                    ></v-file-input>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="dialog = false">
                Close
              </v-btn>
              <v-btn color="blue darken-1" text @click="dialog = false">
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
import { putOrgan } from '@/service/organ'
import { getOrgan } from '@/service/organ'
export default {
  data() {
    return {
      search: '',
      dialog: false,
      headers: [
        {
          text: 'Name',
          align: 'start',
          sortable: false,
          value: 'nameTh',
        },
        { text: ' ', value: 'dialog', sortable: false },
      ],
      organ: null,
      organlist: [],
    }
  },
  mounted() {
    getOrgan().then((res) => {
      console.log(res.data)
      this.organlist = res.data
    })
  },
  methods: {
    uploadFile() {
      const formData = new FormData()
      formData.append('file', this.organ)
      putOrgan(formData).then()
    },

    packFile() {},
  },
}
</script>
<style>
.OrUploadFile {
  margin-top: 50px;
}
</style>
