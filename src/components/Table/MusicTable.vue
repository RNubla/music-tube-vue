<template>
  <div class="container mx-auto px-4 sm:px-8 max-w-3xl">
    <div class="py-8">
      <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
        <div class="inline-block min-w-full shadow rounded-lg overflow-hidden">
          <table class="min-w-full leading-normal">
            <thead>
              <tr>
                <th
                  scope="col"
                  class="
                    px-5
                    py-3
                    bg-white
                    border-b border-gray-200
                    text-gray-800 text-left text-sm
                    uppercase
                    font-normal
                  "
                >
                  Title
                </th>
                <th
                  scope="col"
                  class="
                    px-5
                    py-3
                    bg-white
                    border-b border-gray-200
                    text-gray-800 text-left text-sm
                    uppercase
                    font-normal
                  "
                >
                  Youtube Link
                </th>
                <th
                  scope="col"
                  class="
                    px-5
                    py-3
                    bg-white
                    border-b border-gray-200
                    text-gray-800 text-left text-sm
                    uppercase
                    font-normal
                  "
                >
                  Added
                </th>
                <th
                  scope="col"
                  class="
                    px-5
                    py-3
                    bg-white
                    border-b border-gray-200
                    text-gray-800 text-left text-sm
                    uppercase
                    font-normal
                  "
                >
                  Visit
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="song in songs" :key="song">
                <TableData :songValues="song" />
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TableData from "./TableData.vue";
export default {
  components: {
    TableData,
  },
  data() {
    return {
      songs: [
        {
          title: "Hello1",
          link: "Link1",
          added: "Added1",
          Vist1: "Vist1",
        },
        {
          title: "Hello2",
          link: "Link2",
          added: "Added2",
          Vist1: "Vist2",
        },
        {
          title: "Hello3",
          link: "Link3",
          added: "Added3",
          Vist1: "Vist3",
        },
        {
          title: "Hello4",
          link: "Link4",
          added: "Added4",
          Vist1: "Vist4",
        },
      ],
    };
  },
};
</script>

<style>
</style>