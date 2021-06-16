<template>
  <div>
    <h2>Doner Management</h2>
    <v-btn color="primary" dark text @click="dialogAdd = true">
      Add Doner
    </v-btn>

    <!-- doner table -->
    <div class="DonerTableMN">
      <v-card-title>
        รายชื่อผู้บริจาค
        <v-spacer></v-spacer>
        <!-- search Doner -->
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="doner"
        :items-per-page="5"
        :search="search"
      >
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">
            mdi-pencil
          </v-icon>
          <v-icon small @click="removeData(item.id)"> mdi-delete </v-icon>
        </template>
      </v-data-table>
    </div>

    <!-- insert doner -->
    <v-row justify="start">
      <v-dialog v-model="dialogAdd" persistent max-width="600px">
        <v-card>
          <v-card-title>
            <span class="headline">Add Doner</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    label="ชื่อ"
                    required
                    v-model="details.Name"
                    :rules="rules.name"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    label="นามสกุล"
                    required
                    v-model="details.LastName"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    label="จำนวนเงิน"
                    required
                    v-model="details.Donation"
                    :rules="rules.donateNum"
                  ></v-text-field>
                </v-col>

                <!-- D/M/Y -->
                <v-col cols="12" sm="6" md="4">
                  <v-menu
                    ref="menu"
                    v-model="menu"
                    :close-on-content-click="false"
                    :return-value.sync="PayDate"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="details.PayDate"
                        label="Picker in menu"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="details.PayDate"
                      no-title
                      scrollable
                    >
                      <v-spacer></v-spacer>
                      <v-btn text color="primary" @click="menu = false">
                        Cancel
                      </v-btn>
                      <v-btn
                        text
                        color="primary"
                        @click="$refs.menu.save(PayDate)"
                      >
                        OK
                      </v-btn>
                    </v-date-picker>
                  </v-menu>
                </v-col>

                <v-col cols="12" sm="6">
                  <p>Payment Slip</p>
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
            <v-btn color="blue darken-1" text @click="dialogAdd = false">
              Close
            </v-btn>
            <v-btn
              :disabled="!detailsIsValid"
              color="blue darken-1"
              text
              @click="uploadData"
            >
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

    <!-- update doner -->
    <v-row justify="center">
      <v-dialog v-model="dialog" persistent max-width="600px">
        <v-card>
          <v-card-title>
            <span class="headline">Doner</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <!-- name -->
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    label="ชื่อ"
                    required
                    v-model="editedItem.name"
                    :rules="rules.name"
                  ></v-text-field>
                </v-col>
                <!-- lastName -->
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    label="นามสกุล"
                    required
                    v-model="editedItem.lastName"
                  ></v-text-field>
                </v-col>
                <!-- donation -->
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    label="จำนวนเงิน"
                    required
                    type="number"
                    v-model="editedItem.donation"
                    :rules="rules.donateNum"
                  ></v-text-field>
                </v-col>

                <!-- D/M/Y -->
                <v-col cols="12" sm="6" md="4">
                  <v-menu
                    ref="menu"
                    v-model="menu"
                    :close-on-content-click="false"
                    :return-value.sync="payDate"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="editedItem.payDate"
                        label="Picker in menu"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="editedItem.payDate"
                      no-title
                      scrollable
                    >
                      <v-spacer></v-spacer>
                      <v-btn text color="primary" @click="menu = false">
                        Cancel
                      </v-btn>
                      <v-btn
                        text
                        color="primary"
                        @click="$refs.menu.save(payDate)"
                      >
                        OK
                      </v-btn>
                    </v-date-picker>
                  </v-menu>
                </v-col>
                <!-- image -->
                <v-col cols="12" sm="6">
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
            <v-btn color="blue darken-1" text @click="dialog = false"
              >Close</v-btn
            >
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
</template>

<script>
import { getDoner, addDoner, putDoner, deleteDoner } from '@/service/doner'
import VueUploadMultipleImage from 'vue-upload-multiple-image'
import { addImage } from '@/service/image'

import Vue from 'vue'
export default Vue.extend({
  layout: 'admin',
  components: {
    VueUploadMultipleImage,
  },
  data: () => ({
    menu: false,
    images: [],
    doner: [],
    search: '',
    confirm_popup: false,
    dialog: false,
    dialogAdd: false,
    // date: new Date().toISOString().substr(0, 10),
    headers: [
      {
        text: 'Name',
        align: 'start',
        sortable: false,
        value: 'name',
      },
      { text: 'Lastname', sortable: false, value: 'lastName' },
      { text: 'Donation', value: 'donation' },
      { text: 'Pay Date', value: 'payDate' },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
    editedIndex: -1,
    editedItem: {
      id: '',
      name: '',
      lastName: '',
      imgPath: [],
      payDate: new Date().toISOString().substr(0, 10),
      donation: '',
    },
    details: {
      Name: '',
      LastName: '',
      ImgPath: [],
      PayDate: new Date().toISOString().substr(0, 10),
      Donation: '',
    },
    rules: {
      name: [(val) => (val || '').length > 0 || 'This field is required'],
      donateNum: [
        (val) =>
          (!isNaN(+val) && (val || '').length > 0) || 'Please input number',
      ],
    },
  }),

  computed: {
    detailsIsValid() {
      return this.details.Name && this.details.Donation
    },
    editedItemIsvalid() {
      return this.editedItem.name && this.editedItem.donation
    },
  },
  mounted() {
    getDoner().then((res) => {
      console.log(res.data)
      this.doner = res.data
    })
  },
  methods: {
    // uplaod image
    uploadImageSuccess(formData, index, fileList) {
      console.log('data', formData, index, fileList)
      addImage(formData).then((res) => {
        this.details.imgPath.push(res.data)
        console.log('imagePath', this.details.ImgPath)
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

    editItem(item) {
      this.editedIndex = this.doner.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    // Add
    uploadData() {
      this.dialogAdd = false
      const formData = new FormData()
      for (const i in this.details) {
        formData.append(i, this.details[i])
      }
      addDoner(formData).then((_a) => {
        this.$router.go()
      })
    },

    // Update
    saveData() {
      const formData = new FormData()
      for (const i in this.editedItem) {
        formData.append(i, this.editedItem[i])
      }
      putDoner(formData).then((_a) => {
        this.$router.go()
      })
      this.dialog = false
    },

    // Delete
    removeData(id) {
      const result = confirm('Want to delete?')
      if (result) {
        deleteDoner(id).then((_a) => {
          this.$router.go()
        })
      }
    },
  },
})
</script>

<style></style>
