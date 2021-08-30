<template>
  <div class="relative">
    <div class="mx-auto h-full" style="min-height: 85vh">
      <Navbar />
      <MusicTable />
    </div>
    <div>
      <PlayerContainer />
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
export default {
  components: {
    Navbar,
    MainLayout,
    MusicTable,
    PlayerContainer,
    // HelloWorld,
  },
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
