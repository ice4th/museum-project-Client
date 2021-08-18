<script setup lang="ts">
import { ref } from 'vue'
const emit = defineEmits(['select'])
const selected = ref(undefined)
export interface IFile {
  name: string
  src: string
  updated: string
  size: string
}
const fileList = [
  {
    name: 'Test 001',
    src: 'https://image.tmdb.org/t/p/original/4O3s0IGZJirPBecqEnP9qsjlTQw.jpg',
    updated: '2 days ago',
    size: '4.7 MB',
  },
  {
    name: 'Test 002',
    src: 'https://image.tmdb.org/t/p/w500/jOuCWdh0BE6XPu2Vpjl08wDAeFz.jpg',
    updated: '2 days ago',
    size: '4.7 MB',
  },
  {
    name: 'Test 003',
    src: 'https://www.globish.co.th/front/img/globish-logo-temp.png',
    updated: '2 days ago',
    size: '4.7 MB',
  },
  {
    name: 'Test 004',
    src: 'https://www.themoviedb.org/t/p/w220_and_h330_face/jTswp6KyDYKtvC52GbHagrZbGvD.jpg',
    updated: '2 days ago',
    size: '4.7 MB',
  },
]

const selectFile = (item: IFileList) => {
  selected.value = item
  console.log('item', item)
  emit('select', item)
}
</script>
<template>
  <div class="tile-grid tile-grid-v2">
    <div class="columns is-multiline">
      <div
        v-for="item in fileList"
        :key="item.id"
        class="column is-6"
        @click="selectFile(item)"
      >
        <div
          class="tile-grid-item"
          :class="[item.name === selected?.name && 'is-active']"
        >
          <div class="tile-grid-item-inner">
            <img
              :src="item.src"
              alt=""
              @error.once="
                $event.target.src = 'https://via.placeholder.com/150x150'
              "
            />
            <div class="meta">
              <span class="dark-inverted">{{ item.name }}</span>
              <span>
                <span>{{ item.size }}</span>
                <i aria-hidden="true" class="fas fa-circle icon-separator"></i>
                <span>Updated {{ item.updated }}</span>
              </span>
            </div>
            <!-- <FileTileDropdown /> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '../../scss/abstracts/_variables.scss';
@import '../../scss/abstracts/_mixins.scss';

.tile-grid-v2 {
  .tile-grid-item {
    @include vuero-s-card();

    border-radius: 14px;
    padding: 16px;
    cursor: pointer;

    &:hover,
    &.is-active {
      border-color: $primary;
      box-shadow: $light-box-shadow;
    }

    .tile-grid-item-inner {
      display: flex;
      align-items: center;

      > img {
        display: block;
        width: 64px;
        height: 64px;
        min-width: 64px;
        object-fit: cover;
        border-radius: $radius-large;
        box-shadow: $light-box-shadow;
      }

      .meta {
        margin-left: 10px;
        line-height: 1.4;

        span {
          display: block;
          font-family: $font;

          &:first-child {
            color: $dark-text;
            font-family: $font-alt;
            font-weight: 600;
            font-size: 1rem;
          }

          &:nth-child(2) {
            display: flex;
            align-items: center;

            span {
              display: inline-block;
              color: $light-text;
              font-size: 0.8rem;
              font-weight: 400;
            }

            .icon-separator {
              position: relative;
              font-size: 4px;
              color: $light-text;
              padding: 0 6px;
            }
          }
        }
      }

      .dropdown {
        margin-left: auto;
      }
    }
  }
}
</style>
