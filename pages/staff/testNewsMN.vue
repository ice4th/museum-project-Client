<template>
  <div class="NewsManage">
    <h2>News Management</h2>
    <v-container>
      <v-spacer></v-spacer>
      <!--insert News-->
      <v-row justify="start">
        <v-dialog v-model="dialogAdd" persistent max-width="600px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark v-on="on"> Add News </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">News</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      label="Title*"
                      required
                      v-model="details.Title"
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      label="Description*"
                      required
                      v-model="details.Description"
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-file-input
                      label="Upload image"
                      filled
                      prepend-icon="mdi-camera"
                      v-model="details.ImgPath"
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
      </v-row>

      <!-- Search ยังsearch ไม่ได้ -->
      <v-card-title>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
          dent
        ></v-text-field>
      </v-card-title>
    </v-container>

    <!--Table-->
    <v-container>
      <v-card>
        <v-card-title primary-title>
          <v-container>
            <v-row
              class="d-flex flex-row align-center pa-0"
              v-for="(item, index) in newslist"
              :key="index"
            >
              <v-col cols="12" class="d-flex flex-row align-center pa-0">
                <small>{{ item.title }}</small>
                <v-spacer></v-spacer>
                <!-- update -->
                <v-btn
                  color="primary"
                  light
                  v-on="on"
                  text
                  @click="dialog = true"
                >
                  แก้ไข
                </v-btn>
                <!-- dalete -->
                <v-btn color="primary" light text @click="removeFile(item.id)">
                  ลบ
                </v-btn>
              </v-col>
              <v-col>
                <v-divider></v-divider>
              </v-col>
            </v-row>
          </v-container>
        </v-card-title>
      </v-card>
    </v-container>
    <!-- Delete News Popup -->
    <v-row justify="center">
      <v-dialog v-model="confirm_popup" persistent max-width="290">
        <v-card>
          <v-card-title class="headline"> Delete </v-card-title>
          <v-card-text>Let delete it ?</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="confirm_popup = false">
              No
            </v-btn>
            <v-btn color="green darken-1" text @click="removeFile"> Yes </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
import { deleteNews, getNews, addNews } from '@/service/news'

export default {
  data: () => ({
    search: '',
    confirm_popup: false,
    dialog: false,
    dialogAdd: false,
    checkbox: false,
    saving: false,
    newslist: [],
    news: null,
    title: 'Vuetify.js',
    details: {
      Title: '',
      Description: '',
      ImgPath: null,
    },
  }),
  mounted() {
    getNews(this.$route.params.id).then((res) => {
      console.log(res.data)
      this.newslist = res.data
    })
  },

  methods: {
    saveData() {
      this.saving = true
      if (this.$route.params.id === 'add') {
        addNews(this.details).then((_a) => {
          this.$router.go(-1)
        })
      }
    },

    uploadFile() {
      this.dialogAdd = false
      console.log('hello world')
      const formData = new FormData()
      for (const i in this.details) {
        formData.append(i, this.details[i])
      }
      //   formData.append('data', this.details)
      console.log(formData)
      addNews(formData).then()
    },

    removeFile(id) {
      this.confirm_popup = true
      deleteNews(id).then((_a) => {
        this.$router.go(-1)
      })
    },
  },
}
</script>
