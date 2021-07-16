<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { isDark } from '/@src/state/darkModeState'

import sleep from '/@src/utils/sleep'
import useNotyf from '/@src/composable/useNotyf'
import useConfirmAccount from '/@src/composable/auth/use-confirm-account'

const notyf = useNotyf()
const router = useRouter()

// const isLoading = ref(false)

const { adminProfile, messageError, isLoading } = useConfirmAccount()

const confirm = async () => {
  isLoading.value = true
  notyf.success('Your account is confirmed Erik !')

  await sleep()
  router.push({
    name: 'sidebar-dashboards',
  })

  await sleep()
  isLoading.value = false
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
        <div class="confirm-account-wrapper">
          <div class="wrapper-inner">
            <div class="action-box">
              <V-Loader :active="isLoading">
                <div class="box-content">
                  <img
                    class="light-image"
                    src="/@src/assets/illustrations/placeholders/launch.svg"
                    alt=""
                  />
                  <img
                    class="dark-image"
                    src="/@src/assets/illustrations/placeholders/launch-dark.svg"
                    alt=""
                  />
                  <template v-if="messageError">
                    <h3 class="dark-inverted">Fail!</h3>
                    <h5 class="dark-inverted">
                      {{ messageError }}
                    </h5>
                  </template>
                  <template v-else>
                    <h3 class="dark-inverted">Your account is active</h3>
                    <h4 v-if="adminProfile.name" class="dark-inverted">
                      Hey {{ adminProfile.name }}, Welcome to Whitehouse
                      Globish.
                    </h4>
                  </template>
                  <div class="buttons">
                    <V-Button color="primary" raised :to="{ name: 'index' }">
                      Go to homepage
                    </V-Button>
                  </div>
                </div>
              </V-Loader>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import '../../scss/abstracts/_variables.scss';
@import '../../scss/abstracts/_mixins.scss';

/* ==========================================================================
1. Confirm Account
========================================================================== */

.confirm-account-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 540px;
  min-height: 560px;
  margin: 0 auto;

  .wrapper-inner {
    .action-box {
      @include vuero-s-card();

      padding: 40px;

      .box-content {
        text-align: center;
        font-family: $font;

        img {
          display: block;
          width: 100%;
          max-width: 220px;
          margin: 0 auto 8px auto;

          &.is-larger {
            max-width: 300px;
          }
        }

        h3 {
          font-size: 1.1rem;
          font-family: $font-alt;
          font-weight: 600;
          max-width: 320px;
          margin: 0 auto 8px auto;

          span {
            color: $primary;
          }
        }

        p {
          font-size: 0.9rem;
        }

        .buttons {
          margin: 0 auto;
          display: flex;
          justify-content: center;
          padding-top: 30px;

          .button {
            margin: 0 4px;
            min-width: 180px;
          }
        }
      }
    }
  }
}

.is-dark {
  .confirm-account-wrapper {
    .wrapper-inner {
      .action-box {
        @include vuero-card--dark();
      }
    }
    .wrapper-outer {
      @include vuero-card--dark();
    }
  }
}

@media only screen and (max-width: 767px) {
  .confirm-account-wrapper {
    .wrapper-inner {
      .action-box {
        padding: 20px;

        .box-content {
          .buttons {
            .button {
              min-width: 130px;
            }
          }
        }
      }
    }
  }
}
</style>
