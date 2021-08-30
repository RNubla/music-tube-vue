<template>
  <footer
    class="px-3 py-8 bg-white dark:bg-gray-800 text-2 text-gray-500 dark:text-gray-200 transition-colors duration-200 fixed inset-x-0 bottom-0"
  >
    <p>Current Time {{ currentTime }}</p>
    <p>Duration {{ duration }}</p>
    <Player
      :autoplay="true"
      :current-time="currentTime"
      @vmCurrentTimeChange="onTimeUpdate"
      @vmDurationChange="getDuration"
    >
      <Audio>
        <source :data-src="this.$store.getters.getCurrentAudioSource" type="audio/mp3" />
      </Audio>
      <DefaultUi />
    </Player>
  </footer>
</template>

<script>
import { Player, Audio, DefaultUi } from "@vime/vue-next";
import { onBeforeMount, onMounted, ref } from "@vue/runtime-core";
import { useStore } from "vuex";
/* TODO
user click title of music, 
-> fetch the audioSourceURL 
-> set currentAudioSourceState to audioSourceURL 
-> use the sate to set the audioSource of the player
*/
export default {
  components: {
    Player, Audio, DefaultUi
  },
  data() {
    return {
      currentTime: 0,
      duration: 0
    }
  },
  methods: {
    onTimeUpdate(time) {
      this.currentTime = time
    },
    getDuration(time) {
      this.duration = time
    }
  },
  setup() {
    const store = useStore()
    let audioSource = ''

    const checkSongData = () => {
      // const data = store.getters.getSongData
      const data = store.getters.getCurrentAudioSource
      if (data === undefined || data == '') {
        audioSource = ''
      }
      else {
        // console.log('currentAudioURL', data)
        audioSource = data
      }
    }
    onBeforeMount(() => {
      console.log('onBeforeMounted')
      store.dispatch('loadJson')
      checkSongData()
    })
    // onMounted(() => {
    //   console.log('onMounted')
    //   store.dispatch('generateNewAudioSourceUrl')

    // })

    return {
      audioSource
    }
  }
};
</script>

<style>
</style>