<template>
  <el-container>
    <el-header>
      <ElForm :inline="true" :model="song" class="demo-form-inline">
        <ElFormItem label="Youtube URL">
          <ElInput
            placeholder="Youtube URL"
            v-model="song.youtubeUrl"
          ></ElInput>
        </ElFormItem>
        <ElFormItem>
          <ElButton type="primary" @click="getSong">getSong</ElButton>
          <ElButton type="primary" @click="addSong">AddSong</ElButton>
          <ElButton type="primary" @click="getCurrentState"
            >Current State</ElButton
          >
        </ElFormItem>
      </ElForm>
    </el-header>
    <!-- <p>{{ this.$store.getters.getSongData }}</p> -->
    <p>{{ songData }}</p>
    <!-- Here we are requesting to use the native controls. -->
    <el-main>
      <song-table />
    </el-main>
    <el-footer>
      <Player autoplay>
        <Audio>
          <source :data-src="audioUrl" type="audio/mp3" />
        </Audio>
        <DefaultUi />
      </Player>
    </el-footer>
  </el-container>
</template>

<script >
import { Player, Audio, DefaultUi } from "@vime/vue-next";
import { Command } from "@tauri-apps/api/shell";
import {
  ElButton,
  ElForm,
  ElFormItem,
  ElInput,
  ElSelect,
  ElOption,
} from "element-plus";
import SongTable from "./SongTable.vue";
import { reactive } from "@vue/reactivity";
import { useStore } from "vuex";
export default {
  components: {
    ElButton,
    ElForm,
    ElFormItem,
    ElInput,
    ElOption,
    ElSelect,
    Player,
    Audio,
    DefaultUi,
    SongTable,
  },
  data() {
    return {
      formInline: {
        youtubeUrl: "",
        region: "",
      },
      audioUrl: "",
    };
  },
  setup: () => {
    const store = useStore();
    const songData = reactive([]);
    const song = reactive({
      audioSourceUrl: "",
      title: "",
      artist: "N/A",
      youtubeUrl: "",
    });

    // const clearSong = () => {
    //   song.audioSourceUrl = "";
    //   song.title = "";
    //   song.artist = "N/A";
    //   song.youtubeUrl = "";
    // };

    // const getAudioUrl = async () => {
    //   const command = Command.sidecar("youtube-dl", [
    //     song.youtubeUrl,
    //     "-g",
    //     "-e",
    //   ]);
    //   await command.execute().then((event) => {
    //     const url = event.stdout;
    //     /* https://stackoverflow.com/a/26425713 */
    //     // const urlArr = url.split(/(\s+)/);
    //     const urlArr = url.split("\n");
    //     song.title = urlArr[0];
    //     song.audioSourceUrl = urlArr[2];
    //   });
    //   // store.dispatch("setSongState", song);
    //   // store.dispatch("addSong", song);
    // };
    const getSong = () => {
      const command = Command.sidecar("youtube-dl", [
        // e.value.target,
        song.youtubeUrl,
        "-g",
        "-e",
      ]);
      command.execute().then((event) => {
        const url = event.stdout;
        /* https://stackoverflow.com/a/26425713 */
        // const urlArr = url.split(/(\s+)/);
        const urlArr = url.split("\n");
        song.title = urlArr[0];
        song.audioSourceUrl = urlArr[2];
      });
      songData.push(song);
      // store.dispatch("getSong", song);
    };

    const addSong = () => {
      store.dispatch("addSong");
      store.dispatch("clearSong");
    };
    // const onSubmit = () => {
    // getTitle();
    // store.commit("clearSongState");
    // clearSong();

    // console.log(song);
    // store.dispatch("addSong", song);
    // };
    const getCurrentState = () => {
      console.log("newSong", store.getters.newSong);
      console.log("songData", store.state.songData);
    };

    return {
      songData,
      song,
      getSong,
      addSong,
      getCurrentState,
      // onSubmit,
      // song,
      // getAudioUrl,
    };
  },
};
</script>

<style scoped>
.el-footer {
  line-height: 60px;
}
</style>
