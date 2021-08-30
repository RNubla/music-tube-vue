<template>
  <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
    <div class="flex items-center">
      <div class="flex-shrink-0">
        <a href="#" class="block relative">
          <img
            alt="profil"
            :src="songValues.cover"
            class="mx-auto object-cover rounded-full h-10 w-10"
          />
        </a>
      </div>
      <div class="ml-3">{{ songValues.title }}</div>
    </div>
  </td>
  <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
    <p class="text-gray-900 whitespace-no-wrap">{{ songValues.youtubeUrl }}</p>
  </td>
  <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
    <p class="text-gray-900 whitespace-no-wrap">{{ songValues.dateAdded }}</p>
  </td>
  <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
    <button @click.prevent="openLink">
      <span class="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
        <span aria-hidden="true" class="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
        <span class="relative">Watch Video</span>
      </span>
    </button>
  </td>
</template>

<script>import { Command } from "@tauri-apps/api/shell";
import { useStore } from "vuex";

export default {
  props: {
    songValues: {
      cover: '',
      title: '',
      youtubeUrl: '',
      dateAdded: ''
    },
  },
  setup(props) {
    const store = useStore()
    const playSelectedSong = async () => {
      await store.dispatch('fetchSongAudio', props.songValues.youtubeUrl)
      // console.log('playSelectedSong', props.songValues.youtubeUrl)
    }
    const openLink = () => {
      console.log('openLink')
      // open(props.songValues.youtubeUrl, 'edge')
      new Command('powershell', ['/C', `start ${props.songValues.youtubeUrl}`]).execute()
    }
    return {
      openLink,
      playSelectedSong
    }
  }
};
</script>

<style>
</style>