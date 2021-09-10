<template>
  <div class="mobile-subsidebar is-activity">
    <div class="inner">
      <div class="sidebar-title">
        <h3>Products & Packages</h3>
      </div>

      <ul class="submenu">
        <li v-has-nested-router-link class="has-children">
          <div class="collapse-wrap">
            <a class="parent-link"
              >Product <i class="iconify" data-icon="feather:chevron-right"
            /></a>
          </div>
          <ul>
            <li>
              <RouterLink :to="{ name: 'products' }" class="is-submenu">
                <i class="lnil lnil-books"></i>
                <span>Product Detail</span>
              </RouterLink>
            </li>
          </ul>
        </li>
        <li v-has-nested-router-link class="has-children">
          <div class="collapse-wrap">
            <a class="parent-link"
              >Package <i class="iconify" data-icon="feather:chevron-right"
            /></a>
          </div>
          <ul>
            <li>
              <RouterLink
                :to="{ name: 'products-packages' }"
                class="is-submenu"
              >
                <i class="lnil lnil-books"></i>
                <span>Package Detail</span>
              </RouterLink>
            </li>
            <li>
              <RouterLink
                :to="{ name: 'products-packages-groups' }"
                class="is-submenu"
              >
                <i class="lnil lnil-books"></i>
                <span>Package Group Detail</span>
              </RouterLink>
            </li>
            <li>
              <RouterLink
                :to="{ name: 'products-create-package' }"
                class="is-submenu"
              >
                <i class="lnil lnil-books"></i>
                <span>Create Package</span>
              </RouterLink>
            </li>
          </ul>
        </li>
      </ul>
      <div class="bottom-action"></div>
    </div>
  </div>
</template>

<style lang="scss">
@import '../../scss/abstracts/_variables.scss';
@import '../../scss/layout/_sidebar-mobile.scss';
</style>
