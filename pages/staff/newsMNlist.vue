<template>
  <div>
    <h2>News</h2>
    <!-- Add News -->
    <v-btn color="primary" dark text @click="dialogAdd = true">
      Add News
    </v-btn>

    <!-- search -->
    <v-card-title>
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
    <!-- News table -->
    <v-data-table
      :headers="headers"
      :items="newslist"
      :items-per-page="5"
      :search="search"
    >
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
        <v-icon small @click="removeData(item.id)"> mdi-delete </v-icon>
      </template>
    </v-data-table>

    <v-row justify="center" class="NewsDetail">
      <!-- Insert News -->
      <v-dialog v-model="dialogAdd" persistent max-width="600px">
        <v-card>
          <v-card-title>
            <span class="headline">News</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <!--  title -->
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    label="Title"
                    required
                    v-model="details.Title"
                    :rules="rules.name"
                  >
                  </v-text-field>
                </v-col>
                <!-- Description -->
                <v-col cols="12">
                  <v-textarea
                    label="Description"
                    required
                    v-model="details.Description"
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
                    v-model="details.ImgPath"
                  >
                    <!--v-model="details.imgPath"-->
                  </v-file-input>
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

      <!-- Update News -->
      <v-dialog v-model="dialog" persistent max-width="600px">
        <v-card>
          <v-card-title>
            <span class="headline">News</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <!-- แก้ไข title -->
                <v-col cols="12">
                  <v-text-field
                    label="Title*"
                    required
                    v-model="editedItem.title"
                    :rules="rules.name"
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-textarea
                    label="Description"
                    required
                    v-model="editedItem.description"
                    :rules="rules.name"
                  ></v-textarea>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-file-input
                    label="Upload image"
                    filled
                    prepend-icon="mdi-camera"
                    v-model="editedItem.imgpath"
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
            <v-btn
              :disabled="!editedItemIsValid"
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
import { deleteNews, getNews, addNews, putNews } from '@/service/news'

export default {
  data: () => ({
    headers: [
      {
        text: 'Title',
        align: 'start',
        sortable: false,
        value: 'title',
      },
      { text: 'authorDate', value: 'authorDate', sortable: false },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
    search: '',
    editedIndex: -1,
    editedItem: {
      id: '',
      title: '',
      description: '',
      imgPath: null,
    },
    dialog: false,
    dialogAdd: false,

    saving: false,
    newslist: [],
    news: null,
    title: 'Vuetify.js',
    details: {
      Title: '',
      Description: '',
      ImgPath: null,
      AuthorDate: new Date().toISOString().substr(0, 10),
    },
    rules: {
      name: [(val) => (val || '').length > 0 || 'This field is required'],
    },
  }),

  computed: {
    detailsIsValid() {
      return this.details.Title && this.details.Description
    },
    editedItemIsvalid() {
      return this.editedItem.title && this.editedItem.description
    },
  },

  mounted() {
    getNews(this.$route.params.id).then((res) => {
      // console.log(res.data)
      this.newslist = res.data
    })
  },

  methods: {
    editItem(item) {
      this.editedIndex = this.newslist.indexOf(item)
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
      putNews(formData).then((_a) => {
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
      addNews(formData).then((_a) => {
        this.$router.go()
      })
    },

    removeData(id) {
      const result = confirm('Want to delete?')
      console.log(id)
      if (result) {
        deleteNews(id).then((_a) => {
          this.$router.go()
        })
      }
    },
  },
}
</script>

<style>
.newsTable {
  margin-top: 25px;
}
</style>
