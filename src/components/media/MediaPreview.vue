<script setup lang="ts">
import { ref, computed } from 'vue'
import moment from 'moment'
const props = defineProps({
  file: {
    type: Object,
    default: () => {},
  },
})
const thumbnailIcon = computed(() => {
  return props.file?.type?.match('audio')
    ? '/images/icons/files/music.svg'
    : props.file?.type?.match('video')
    ? '/images/icons/files/video.svg'
    : props.file?.type?.match('pdf')
    ? '/images/icons/files/pdf.svg'
    : props.file?.type?.match('doc')
    ? '/images/icons/files/doc-2.svg'
    : '/images/icons/files/doc.svg'
})
</script>

<template>
  <div class="column tile-grid tile-grid-v3 is-4">
    <div class="tile-grid-item">
      <div class="tile-grid-item-inner">
        <div class="flex has-text-centered">
          <img
            v-if="file.type.match('image')"
            :src="file.src"
            :alt="file.name"
            @error.once="
              $event.target.src = 'https://via.placeholder.com/150x150'
            "
          />
          <V-Plyr
            v-else-if="file.type.match('video')"
            ratio="16by9"
            :source="file.src"
          />
          <audio v-else-if="file.type.match('audio')" controls>
            <source :src="file.src" />
            Your browser does not support the audio element.
          </audio>
          <!-- <i v-else class="fas fa-file-alt" color="primary"></i> -->
          <img
            v-else
            width="100"
            :src="thumbnailIcon"
            :alt="file.name"
            @error.once="
              $event.target.src = 'https://via.placeholder.com/150x150'
            "
          />
        </div>
        <div class="meta">
          <p class="dark-inverted">
            Name: <span>{{ file.name }}</span>
          </p>
          <span><span>Size: </span> {{ file.size }}</span>
          <span><span>Type: </span> {{ file.type }}</span>
          <p>
            <span>Last modified: </span>
            {{ moment(file.lastUpdateModified).format('DD MMM YYYY HH:mm') }}
          </p>
          <p>
            <span>Public URL: </span>
            <a :href="file.src" target="_target">Click Here</a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import '../../scss/abstracts/_variables.scss';
@import '../../scss/abstracts/_mixins.scss';
.tile-grid-v3 {
  .tile-grid-item {
    @include vuero-s-card();

    padding: 2rem;
    border-radius: 16px;
    height: 600px;
    max-height: 700px;
    .tile-grid-item-inner {
      display: flex;
      height: 100%;
      flex-direction: column;
      > audio {
        width: 120px;
      }
      > img {
        display: block;
        border-radius: 12px;
        object-fit: cover;
        max-width: 100%;
        max-height: 200px;
        width: auto;
        height: auto;
      }

      .meta {
        margin: 2rem 0;
        display: flex;
        flex-direction: column;
        font-family: $font;
        p {
          font-family: $font-alt;
          font-size: 1rem;
          font-weight: 400;
          color: $light-text;
          line-height: 2;
          text-overflow: ellipsis;
          overflow: hidden;
          span {
            margin-right: 1rem;
            color: $dark-text !important;
          }
        }
        // span {
        //   display: block;
        //   font-family: $font;
        //   font-weight: 400;
        //   font-size: 1rem;
        //   text-overflow: ellipsis;
        //   overflow: hidden;
        //   &:first-child {
        //     color: $dark-text;
        //     font-family: $font-alt;
        //     font-weight: 600;
        //     margin-right: 1rem;
        //   }

        //   &:nth-child(2) {
        //     display: inline-block;
        //     color: $light-text;
        //   }
        // }
      }
    }
  }
}

.is-dark {
  .tile-grid {
    .tile-grid-item {
      @include vuero-card--dark();
    }
  }
  .tile-grid-v3 {
    .tile-grid-item {
      @include vuero-card--dark();
    }
  }
}

@media only screen and (max-width: 767px) {
  .tile-grid-v3 {
    .tile-grid-item {
      max-height: 132px !important;

      .tile-grid-item-inner {
        display: flex !important;
        flex-direction: row !important;
        height: 100% !important;

        > img {
          display: block !important;
          border-radius: 12px !important;
          width: 100% !important;
          max-width: 110px !important;
          min-width: 110px !important;
          height: 100% !important;
          min-height: 110px !important;
          max-height: 110px !important;
          object-fit: cover !important;
        }

        .meta {
          margin-left: 12px !important;
          display: flex !important;
          flex-direction: column !important;
          justify-content: space-between !important;

          .tile-title {
            h3 {
              font-family: $font !important;
              font-size: 1.1rem !important;
              font-weight: 500;
              color: $dark-text !important;
              line-height: 1.1 !important;
            }

            p {
              display: none !important;
            }
          }

          .tile-meta {
            display: flex !important;
            align-items: center !important;
            margin-top: auto !important;
            padding: 0 0 5px 0 !important;

            .v-avatar {
              max-width: 26px !important;
              max-height: 26px !important;
              min-width: 26px !important;

              .avatar {
                max-width: 26px !important;
                max-height: 26px !important;
                min-width: 26px !important;
              }
            }

            .meta-inner {
              margin-left: 8px !important;
              line-height: 1.2 !important;

              span {
                display: block !important;
                font-weight: 400 !important;

                &:first-child {
                  color: $dark-text !important;
                  font-size: 0.9rem !important;
                  font-weight: 500 !important;
                }

                &:nth-child(2) {
                  font-size: 0.8rem !important;
                  color: $light-text !important;
                }
              }
            }
          }
        }
      }
    }
  }
}

@media only screen and (min-width: 768px) and (max-width: 1024px) and (orientation: portrait) {
  .tile-grid-v3 {
    .tile-grid-item {
      max-height: 132px !important;

      .tile-grid-item-inner {
        display: flex !important;
        flex-direction: row !important;
        height: 100% !important;

        > img {
          display: block !important;
          border-radius: 12px !important;
          width: 100% !important;
          max-width: 110px !important;
          min-width: 110px !important;
          height: 100% !important;
          min-height: 110px !important;
          max-height: 110px !important;
          object-fit: cover !important;
        }

        .meta {
          margin-left: 12px !important;
          display: flex !important;
          flex-direction: column !important;
          justify-content: space-between !important;

          .tile-title {
            h3 {
              font-family: $font !important;
              font-size: 1.1rem !important;
              font-weight: 500;
              color: $dark-text !important;
              line-height: 1.1 !important;
            }

            p {
              display: block;
              max-width: 460px;
            }
          }

          .tile-meta {
            display: flex !important;
            align-items: center !important;
            margin-top: auto !important;
            padding: 0 0 5px 0 !important;

            .v-avatar {
              max-width: 26px !important;
              max-height: 26px !important;
              min-width: 26px !important;

              .avatar {
                max-width: 26px !important;
                max-height: 26px !important;
                min-width: 26px !important;
              }
            }

            .meta-inner {
              margin-left: 8px !important;
              line-height: 1.2 !important;

              span {
                display: block !important;
                font-weight: 400 !important;

                &:first-child {
                  color: $dark-text !important;
                  font-size: 0.9rem !important;
                  font-weight: 500 !important;
                }

                &:nth-child(2) {
                  font-size: 0.8rem !important;
                  color: $light-text !important;
                }
              }
            }
          }
        }
      }
    }
  }
}

@media only screen and (min-width: 768px) and (max-width: 1024px) and (orientation: landscape) {
  .tile-grid-v3 {
    .tile-grid-item {
      &.is-medium {
        .tile-grid-item-inner {
          .tile-title {
            h3 {
              font-size: 1rem !important;
            }
          }
        }
      }

      &.is-large {
        .tile-grid-item-inner {
          .tile-title {
            h3 {
              font-size: 1.1rem !important;
            }
          }
        }
      }

      &.is-tall {
        .tile-grid-item-inner {
          .tile-title {
            h3 {
              font-size: 1.2rem !important;
            }
          }
        }
      }

      &.is-wide {
        .tile-grid-item-inner {
          > img {
            max-width: 180px;
            min-height: 160px;
          }

          .tile-title {
            h3 {
              font-size: 1.2rem !important;
            }
          }
        }
      }
    }
  }
}
</style>
