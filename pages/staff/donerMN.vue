<template>
  <div>
    <h2>Doner</h2>
    <v-container>
      <!-- insert doner -->
      <v-row justify="start">
        <v-dialog v-model="dialogAdd" persistent max-width="600px">
          <!-- add doner -->
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark v-bind="attrs" v-on="on">
              Add Doner
            </v-btn>
          </template>
          <!-- insert doner -->
          <v-card>
            <v-card-title>
              <span class="headline">Doner</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      label="ชื่อ"
                      required
                      v-model="details.Name"
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
                          v-model="PayDate"
                          label="Picker in menu"
                          prepend-icon="mdi-calendar"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="PayDate" no-title scrollable>
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
                    <v-file-input
                      label="Upload image"
                      filled
                      prepend-icon="mdi-camera"
                      v-model="details.ImgPath"
                    ></v-file-input>
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
              <v-btn color="blue darken-1" text @click="uploadData">
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </v-container>

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
                    v-model="editedItem.donation"
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
                        v-model="payDate"
                        label="Picker in menu"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>

                    <v-date-picker v-model="payDate" no-title scrollable>
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
                  <v-file-input
                    label="Upload image"
                    filled
                    prepend-icon="mdi-camera"
                    v-model="editedItem.imgPath"
                  ></v-file-input>
                </v-col>
              </v-row>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialog = false"
              >Close</v-btn
            >
            <v-btn color="blue darken-1" text @click="saveData"> Save </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
import { getDoner, addDoner, putDoner, deleteDoner } from '@/service/doner'
export default {
  data: () => ({
    doner: [],
    search: '',
    confirm_popup: false,
    dialog: false,
    dialogAdd: false,
    // date: new Date().toISOString().substr(0, 10),
    menu: false,
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
      imgPath: null,
      payDate: new Date().toISOString().substr(0, 10),
      donation: '',
    },
    details: {
      Name: '',
      LastName: '',
      ImgPath: null,
      PayDate: new Date().toISOString().substr(0, 10),
      Donation: '',
    },
  }),
  mounted() {
    getDoner().then((res) => {
      console.log(res.data)
      this.doner = res.data
    })
  },
  methods: {
    editItem(item) {
      this.editedIndex = this.doner.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

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

    saveData() {
      const formData = new FormData()
      for (const i in this.editedItem) {
        formData.append(i, this.editedItem[i])
        console.log(i,this.editedItem[i])
      }
      console.log(formData)

      putDoner(formData).then((_a) => {
        this.$router.go()
      })
      this.dialog = false
    },

    
    // saveData() {
    //   const formData = new FormData()
    //   for (const i in this.editedItem) {
    //     formData.append(i, this.editedItem[i])
    //   }

    //   putDoner(this.editedItem.id).then((_a) => {
    //     this.$router.go()
    //   })
    //   this.dialog = false
    // },

    removeData(id) {
      const result = confirm('Want to delete?')
      if (result) {
        deleteDoner(id).then((_a) => {
          this.$router.go()
        })
      }
    },
  },
}
</script>

<style>
.DonerTable {
  margin-top: 100px;
}
.DonerTableMN h4 {
  text-align: center;
}
</style>
