<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useHead } from '@vueuse/head'
import useNotyf from '/@src/composable/useNotyf'
import useRegister from '/@src/composable/auth/use-register'

import { isDark } from '/@src/state/darkModeState'
import sleep from '/@src/utils/sleep'

const router = useRouter()
const notif = useNotyf()
// const isLoading = ref(false)

const {
  confirmPassword,
  newUser,
  register,
  validation,
  isLoading,
  teamOptions,
} = useRegister()

useHead({
  title: 'WH | Register',
})
const showSuccessPopup = ref(false)
const handleRegister = async () => {
  const res = await register()
  if (res) showSuccessPopup.value = true
}
</script>

<template>
  <div class="auth-wrapper-inner is-single">
    <!--Fake navigation-->
    <div class="auth-nav">
      <div class="left"></div>
      <div class="center">
        <RouterLink :to="{ name: 'index' }" class="header-item">
          <AnimatedLogo width="38px" height="38px" />
        </RouterLink>
      </div>
      <div class="right">
        <label class="dark-mode ml-auto">
          <input
            type="checkbox"
            :checked="!isDark"
            @change="
              (event) => {
                isDark = !event.target.checked
              }
            "
          />
          <span></span>
        </label>
      </div>
    </div>

    <!--Single Centered Form-->
    <div class="single-form-wrap">
      <div class="inner-wrap">
        <!--Form Title-->
        <div class="auth-head">
          <h2>Join Us Now.</h2>
          <p>Start by creating your account</p>
          <RouterLink :to="{ name: 'auth-login' }">
            I already have an account
          </RouterLink>
        </div>

        <!--Form-->
        <div class="form-card">
          <form @submit.prevent="handleRegister">
            <div class="login-form">
              <!-- Input -->
              <V-Field>
                <V-Control icon="feather:user">
                  <input
                    v-model="newUser.name"
                    class="input"
                    type="text"
                    placeholder="Name"
                    autocomplete="name"
                  />
                </V-Control>
                <h6 v-show="validation.name" class="msg-error">
                  {{ validation.name }}
                </h6>
              </V-Field>

              <div class="columns is-multiline mb-0">
                <div class="column is-6">
                  <!-- Input -->
                  <V-Field>
                    <V-Control icon="feather:user">
                      <input
                        v-model="newUser.firstname"
                        class="input"
                        type="text"
                        placeholder="Firstname"
                        autocomplete="firstname"
                      />
                    </V-Control>
                    <h6 v-show="validation.firstname" class="msg-error">
                      {{ validation.firstname }}
                    </h6>
                  </V-Field>
                </div>
                <div class="column is-6">
                  <!-- Input -->
                  <V-Field>
                    <V-Control icon="feather:user">
                      <input
                        v-model="newUser.lastname"
                        class="input"
                        type="text"
                        placeholder="Lastname"
                        autocomplete="lastname"
                      />
                    </V-Control>
                    <h6 v-show="validation.lastname" class="msg-error">
                      {{ validation.lastname }}
                    </h6>
                  </V-Field>
                </div>
              </div>
              <!-- Input -->
              <V-Field>
                <V-Control icon="feather:mail">
                  <input
                    v-model="newUser.email"
                    class="input"
                    type="text"
                    placeholder="Email Address"
                    autocomplete="email"
                  />
                </V-Control>
                <h6 v-show="validation.email" class="msg-error">
                  {{ validation.email }}
                </h6>
              </V-Field>
              <!-- Input -->
              <V-Field>
                <V-Control icon="feather:phone">
                  <input
                    v-model="newUser.phone"
                    class="input"
                    type="text"
                    placeholder="Phone"
                    autocomplete="phone"
                  />
                </V-Control>
                <h6 v-show="validation.phone" class="msg-error">
                  {{ validation.phone }}
                </h6>
              </V-Field>
              <!-- Input -->
              <V-Field class="is-autocomplete-select">
                <V-Control icon="feather:users">
                  <Multiselect
                    v-model="newUser.teamId"
                    placeholder="Select your team"
                    :options="teamOptions"
                    :searchable="true"
                    track-by="name"
                    value-prop="id"
                  >
                    <template #singlelabel="{ value }">
                      <div class="multiselect-single-label">
                        {{ value.name }}
                      </div>
                    </template>
                    <template #option="{ option }">
                      <span class="select-option-text">
                        {{ option.name }}
                      </span>
                    </template>
                  </Multiselect>
                </V-Control>
                <h6 v-show="validation.teamId" class="msg-error">
                  {{ validation.teamId }}
                </h6>
              </V-Field>
              <!-- Input -->
              <V-Field class="is-autocomplete-select">
                <V-Control icon="feather:flag">
                  <Multiselect
                    v-model="newUser.country"
                    placeholder="Select your country"
                    :options="['th', 'vn']"
                  >
                  </Multiselect>
                </V-Control>
                <h6 v-show="validation.country" class="msg-error">
                  {{ validation.country }}
                </h6>
              </V-Field>
              <!-- Input -->
              <V-Field>
                <V-Control icon="feather:lock">
                  <input
                    v-model="newUser.password"
                    class="input"
                    type="password"
                    placeholder="Password"
                    autocomplete="new-password"
                  />
                </V-Control>
                <h6 v-show="validation.password" class="msg-error">
                  {{ validation.password }}
                </h6>
              </V-Field>
              <!-- Input -->
              <V-Field>
                <V-Control icon="feather:lock">
                  <input
                    v-model="confirmPassword"
                    class="input"
                    type="password"
                    placeholder="Confirm Password"
                  />
                </V-Control>
                <h6
                  v-show="confirmPassword !== newUser.password"
                  class="msg-error"
                >
                  confirm password not match with password
                </h6>
              </V-Field>

              <v-date-picker
                v-model="newUser.dob"
                color="orange"
                :model-config="{
                  type: 'string',
                  mask: 'YYYY-MM-DD',
                }"
                :masks="{
                  input: 'YYYY-MM-DD',
                }"
                :popover="{ visibility: 'click' }"
                trim-weeks
              >
                <template #default="{ inputValue, inputEvents }">
                  <V-Field>
                    <V-Control icon="feather:calendar">
                      <input
                        class="input"
                        type="text"
                        placeholder="Date of birth YYYY-MM-DD"
                        :value="inputValue"
                        v-on="inputEvents"
                      />
                    </V-Control>
                    <h6 v-show="validation.dob" class="msg-error">
                      {{ validation.dob }}
                    </h6>
                  </V-Field>
                </template>
              </v-date-picker>

              <!-- Submit -->
              <V-Field>
                <V-Control class="login">
                  <V-Loader size="small" :active="isLoading">
                    <V-Button
                      color="primary"
                      :disabled="isLoading"
                      bold
                      fullwidth
                      raised
                      @click="handleRegister"
                    >
                      Sign Up
                    </V-Button>
                  </V-Loader>
                </V-Control>
              </V-Field>
            </div>
          </form>
        </div>
      </div>
    </div>

    <V-Modal
      title="Success!"
      :open="showSuccessPopup"
      size="small"
      actions="center"
      @close="showSuccessPopup = false"
    >
      <template #content>
        <V-PlaceholderSection
          title="Register Successful"
          subtitle="Please check your email for confirm registation"
        />
      </template>
      <template #action>
        <V-Button color="primary" :to="{ name: 'auth-login' }" raised
          >Ok</V-Button
        >
      </template>
      <template #cancel> <div></div> </template>
    </V-Modal>
  </div>
</template>

<style lang="scss" scoped>
@import '../../scss/abstracts/_variables.scss';
.inner-wrap {
  max-width: 480px !important;
}
h6.msg-error {
  color: $danger;
}
.auth-wrapper-inner .single-form-wrap .inner-wrap {
  margin: 66px auto 0 auto;
}
</style>
