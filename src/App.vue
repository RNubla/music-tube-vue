<template>
  <div class="relative">
    <div class="mx-auto h-full" style="min-height: 85vh">
      <!-- <button @click.prevent="loadSongDataState">SongData</button> -->
      <!-- <MusicPlayer /> -->
      <Navbar />
      <!-- <MusicTable /> -->
      <!-- <Aplayer :list="playlist" autoplay controls :music="this.$store.state.currentSong"  /> -->
      <Aplayer
        :list="playlist"
        controls
        shuffle
        ref="player"
        @play="play"
        :music="this.$store.state.playlist.length === 0 ? {} : this.$store.state.playlist[0]"
        @ended="setEnded"
      />
    </div>
    <div>
      <!-- <PlayerContainer /> -->
    </div>
  </div>
  <!-- <HelloWorld /> -->
  <!-- <MainLayout /> -->
</template>

<script >
import Navbar from "./components/Navigation/Navbar.vue";
// import HelloWorld from "./components/HelloWorld.vue";
import MainLayout from "./components/MainLayout.vue";
import MusicTable from "./components/Table/MusicTable.vue";
import PlayerContainer from "./components/MusicPlayer/PlayerContainer.vue";
import MusicPlayer from "./components/MusicPlayer/MusicPlayer.vue";
import Aplayer from 'vue3-aplayer'
import { onBeforeMount, onBeforeUpdate, onMounted, onUpdated } from "@vue/runtime-core";
import { useStore } from "vuex";
export default {
  components: {
    Navbar,
    MainLayout,
    MusicTable,
    PlayerContainer,
    MusicPlayer,
    Aplayer
    // HelloWorld,
  },
  data() {
    return {
      playlist: [
        {
          title: '',
          pic: '',
          src: '',
          artist: ''
        }
      ]
    }
  },
  watch: {
    ifEnded() {
      console.log('ended')
      console.log(this.$store.state.currentSong)
    }
  },
  computed: {
    shuffledList() {
      return this.playlist
    }
  },
  methods: {
    play(event) {
      // console.log('event', event)
      this.$refs.player.shuffledList = this.playlist
    }
  },
  mounted() {
    if (this.$store.state.playlist.length === 0) {

      this.playlist = undefined
    }
    else {
      this.playlist = this.$store.state.playlist
    }
  },
  updated() {
    this.$nextTick(function () {
      this.playlist = this.$store.state.playlist
    })
  },
  // setup() {
  //   const store = useStore()
  //   onMounted(async () => {
  //     // await store.dispatch('loadJson')
  //     if (store.state.playlist === 0) {
  //       playlist = undefined
  //     }
  //     else {
  //       playlist = store.state.playlist
  //     }
  //   })
  //   onUpdated(() => {

  //     // loadSongDataState()
  //   })
  //   let song = { title: store.state.currentSong.title, pic: store.state.currentSong.pic, src: store.state.currentSong.src, artist: store.state.currentSong.artist };
  //   let playlist = [
  //     {
  //       title: '',
  //       artist: '',
  //       src: '',
  //       pic: ''
  //     }
  //   ]
  // const loadSongDataState = () => {
  //   let songData = store.getters.getSongData;
  //   // console.log(songData)
  //   songData.forEach(element => {
  //     // console.log(element)
  //     // console.log(store.dispatch('fetchSongAudio', element.youtubeUrl))
  //     song.title = element.title
  //     song.pic = element.pic
  //     song.url = ''
  //     playlist.push(song)
  //   });
  //   console.log(playlist)
  // }
  // const setEnded = () => {
  //   console.log('song has ended')
  //   store.commit('SET_SONG_ENDED', true)
  // }

  // return {
  //   setEnded,
  //   song,
  //   // currentSong = Object.keys(store.state.currentSong === 0) ? store.state.currentSong : {},
  //   playlist
  //   // loadSongDataState
  // }

  // }
};

// This starter template is using Vue 3 experimental <script setup> SFCs
// Check out https://github.com/vuejs/rfcs/blob/master/active-rfcs/0040-script-setup.md
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>
