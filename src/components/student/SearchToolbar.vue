<script setup lang="ts"></script>
<template>
  <div class="flex-table-wrapper mt-4">
    <div class="flex-table-toolbar">
      <div class="left">
        <V-Field>
          <V-Control icon="feather:search">
            <input
              type="text"
              class="input is-rounded"
              placeholder="Search..."
            />
          </V-Control>
        </V-Field>
      </div>

      <div class="right">
        <V-Field>
          <V-Control>
            <div class="select is-rounded">
              <select>
                <option selected>10 results per page</option>
                <option>25 results per page</option>
                <option>50 results per page</option>
                <option>100 results per page</option>
              </select>
            </div>
          </V-Control>
        </V-Field>
      </div>
    </div>
  </div>
</template>
