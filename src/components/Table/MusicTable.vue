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
                  class="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal"
                >Title</th>
                <th
                  scope="col"
                  class="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal"
                >Youtube Link</th>
                <th
                  scope="col"
                  class="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal"
                >Added</th>
                <th
                  scope="col"
                  class="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal"
                >Visit</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(song, index) in this.$store.state.songData"
                :key="song.youtubeUrl"
                @click.prevent="playSelectedSong(index)"
                :class="{ 'bg-gray-500': (song.title == selectedSong) }"
              >
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
import { useStore } from "vuex";
import TableData from "./TableData.vue";
export default {
  components: {
    TableData,
  },
  setup() {
    const store = useStore()
    let selectedSong = ''
    const playSelectedSong = async (index) => {
      selectedSong = store.state.songData[index].title
      // console.log(selectedSong)
      await store.dispatch('fetchSongAudio', store.state.songData[index].youtubeUrl)
      store.dispatch('setCurrentSongIndex', index)
    }

    return {
      selectedSong,
      playSelectedSong
    }

  },
  data() {
    return {

    };
  },
};
</script>

<style>
</style>