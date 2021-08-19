<script setup lang="ts">
import { useHead } from '@vueuse/head'
import { useWindowScroll } from '@vueuse/core'
import { computed } from 'vue'
import useViewAdmin from '/@src/composable/admin/use-view-admin'

const { y } = useWindowScroll()
const isStuck = computed(() => {
  return y.value > 30
})
</script>

<template>
  <div class="page-content-inner">
    <div class="form-layout">
      <V-Loader size="small" lighter grey translucent :active="isLoadingUser">
        <div class="form-outer">
          <div
            :class="[isStuck && 'is-stuck']"
            class="form-header stuck-header"
          >
            <div class="form-header-inner">
              <div class="left"><h3>View/Edit Admin</h3></div>
              <div class="right">
                <div class="buttons">
                  <V-Button color="primary" raised @click="editProfile">
                    Edit
                  </V-Button>
                </div>
              </div>
            </div>
          </div>
          <div class="form-body">
            <div class="d-flex justify-content-center">
              <V-Avatar
                picture="/demo/avatars/5.jpg"
                size="xl"
                class="align-item-center"
              />
            </div>
            <div class="columns is-multiline">
              <div class="column is-6">
                <V-Field>
                  <label>Firstname</label>
                  <V-Control>
                    <input type="text" class="input" placeholder="Firstname" />
                    <p class="help">Firstname</p>
                  </V-Control>
                </V-Field>
              </div>
              <div class="column is-6">
                <V-Field>
                  <label>Lastname</label>
                  <V-Control>
                    <input type="text" class="input" placeholder="Firstname" />
                    <p class="help">Lastname</p>
                  </V-Control>
                </V-Field>
              </div>
              <div class="column is-6">
                <V-Field>
                  <label>Name</label>
                  <V-Control>
                    <input type="text" class="input" placeholder="Firstname" />
                  </V-Control>
                </V-Field>
              </div>
              <div class="column is-6">
                <V-Field>
                  <label>Phone</label>
                  <V-Control>
                    <input
                      type="text"
                      class="input"
                      placeholder="Phone Number"
                    />
                  </V-Control>
                </V-Field>
              </div>
              <div class="column is-12">
                <V-Field>
                  <label>Email</label>
                  <V-Control>
                    <input
                      type="text"
                      class="input"
                      placeholder="abc@globish.co.th"
                    />
                  </V-Control>
                </V-Field>
              </div>
              <div class="column is-12">
                <V-Field>
                  <label>Team</label>
                  <V-Control>
                    <Multiselect placeholder="Select your team"> </Multiselect>
                  </V-Control>
                </V-Field>
              </div>
              <div class="column is-12">
                <V-Field>
                  <label>Role</label>
                  <V-Control>
                    <Multiselect placeholder="Select your role"> </Multiselect>
                  </V-Control>
                </V-Field>
              </div>
              <div class="column is-12">
                <V-Field>
                  <label>Country</label>
                  <V-Control>
                    <Multiselect placeholder="Select your country">
                    </Multiselect>
                  </V-Control>
                </V-Field>
              </div>
              <div class="column">
                <V-Field>
                  <label>Status</label>
                  <V-Control>
                    <V-SwitchBlock color="primary" checked />
                  </V-Control>
                </V-Field>
              </div>
            </div>
          </div>
        </div>
      </V-Loader>
    </div>
  </div>
</template>

<style lang="scss">
@import '../../scss/abstracts/_variables.scss';
@import '../../scss/abstracts/_mixins.scss';
@import '../../scss/pages/generic/_forms.scss';
</style>
