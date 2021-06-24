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
const isLoading = ref(false)

const {
  name,
  firstname,
  lastname,
  email,
  phone,
  password,
  confirmPassword,
  dob,
  register,
} = useRegister()

useHead({
  title: 'WH | Register',
})
const showSuccessPopup = ref(true)
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
                    v-model="name"
                    class="input"
                    type="text"
                    placeholder="Name"
                    autocomplete="name"
                  />
                </V-Control>
              </V-Field>

              <div class="columns is-multiline mb-0">
                <div class="column is-6">
                  <!-- Input -->
                  <V-Field>
                    <V-Control icon="feather:user">
                      <input
                        v-model="firstname"
                        class="input"
                        type="text"
                        placeholder="Firstname"
                        autocomplete="firstname"
                      />
                    </V-Control>
                  </V-Field>
                </div>
                <div class="column is-6">
                  <!-- Input -->
                  <V-Field>
                    <V-Control icon="feather:user">
                      <input
                        v-model="lastname"
                        class="input"
                        type="text"
                        placeholder="Lastname"
                        autocomplete="lastname"
                      />
                    </V-Control>
                  </V-Field>
                </div>
              </div>
              <!-- Input -->
              <V-Field>
                <V-Control icon="feather:mail">
                  <input
                    v-model="email"
                    class="input"
                    type="text"
                    placeholder="Email Address"
                    autocomplete="email"
                  />
                </V-Control>
              </V-Field>
              <!-- Input -->
              <V-Field>
                <V-Control icon="feather:phone">
                  <input
                    v-model="phone"
                    class="input"
                    type="text"
                    placeholder="Phone"
                    autocomplete="phone"
                  />
                </V-Control>
              </V-Field>
              <!-- Input -->
              <V-Field>
                <V-Control icon="feather:lock">
                  <input
                    v-model="password"
                    class="input"
                    type="password"
                    placeholder="Password"
                    autocomplete="new-password"
                  />
                </V-Control>
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
              </V-Field>

              <v-date-picker v-model="dob" color="orange" trim-weeks>
                <template #default="{ inputValue, inputEvents }">
                  <V-Field>
                    <V-Control icon="feather:calendar">
                      <input
                        class="input"
                        type="text"
                        placeholder="Date of birth"
                        :value="inputValue"
                        v-on="inputEvents"
                      />
                    </V-Control>
                  </V-Field>
                </template>
              </v-date-picker>

              <!-- Submit -->
              <V-Field>
                <V-Control class="login">
                  <V-Button color="primary" bold fullwidth raised>
                    Sign Up
                  </V-Button>
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
        <V-Button color="primary" to="login" raised>Ok</V-Button>
      </template>
      <template #cancel> <div></div> </template>
    </V-Modal>
  </div>
</template>

<style lang="scss" scoped>
.inner-wrap {
  max-width: 480px !important;
}
</style>
