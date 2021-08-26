<template>
  <el-container>
    <el-header>
      <el-affix position="top" offset="20">
        <ElForm
          :inline="true"
          ref="urlValidation"
          :model="urlValidation"
          class="demo-form-inline"
        >
          <ElFormItem
            label="Youtube URL"
            prop="url"
            :rules="[
              { required: true, message: 'Valid Youtube URL is Required' },
              { type: 'string', message: 'Youtube URL must be a string' },
            ]"
          >
            <ElInput
              type="url"
              placeholder="Youtube URL"
              v-model="urlValidation.url"
            ></ElInput>
          </ElFormItem>
          <ElFormItem>
            <ElButton
              type="primary"
              @click.prevent="submitForm('urlValidation')"
              >Submit</ElButton
            >
            <!-- <ElButton type="primary" @click.prevent="loadData"
              >Load Data</ElButton
            > -->
            <!-- <ElButton type="primary" @click="getCurrentState" -->
            <!-- >Current State</ElButton -->
            <!-- > -->
          </ElFormItem>
        </ElForm>
      </el-affix>
    </el-header>
    <p>CurrentSongIndex: {{ currentSongIndex }}</p>
    <!-- <p>{{ currentTime }}</p> -->
    <!-- <p>{{ duration }}</p> -->
    <!-- <p>{{ this.$store.state.songData }}</p> -->
    <!-- Here we are requesting to use the native controls. -->
    <el-main>
      <song-table />
    </el-main>
    <el-footer>
      <el-affix position="bottom" :offset="20">
        <Player
          :autoplay="true"
          :current-time="currentTime"
          @vmCurrentTimeChange="onTimeUpdate"
          @vmDurationChange="getDuration"
        >
          <!-- <Audio>
            <source
              :data-src="
                this.$store.state.songData[currentSongIndex]
                  ? this.$store.state.songData[currentSongIndex].audioSourceUrl
                  : null
              "
              type="audio/mp3"
            />
          </Audio> -->
          <Audio>
            <source
              :data-src="
                this.$store.state.songData[currentSongIndex]
                  ? this.$store.state.songData[currentSongIndex].audioSourceUrl
                  : null
              "
              type="audio/mp3"
            />
          </Audio>
          <DefaultUi />
        </Player>
      </el-affix>
    </el-footer>
  </el-container>
</template>

<script >
import { Player, Audio, DefaultUi } from "@vime/vue-next";
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
import { ref } from "vue";
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
      urlValidation: {
        url: "",
      },
      currentSongIndex: 0,
      currentTime: 0,
      duration: 0,
      songs: {},
      songData: [],
    };
  },

  watch: {
    currentTime() {
      if (
        Math.floor(parseInt(this.currentTime.valueOf().toString())) ==
        Math.floor(this.duration)
      ) {
        this.currentSongIndex += 1;
      }
    },
  },
  mounted() {
    // this.loadData();
    this.$store.dispatch("loadJson");
  },
  methods: {
    increment() {
      this.$store.commit("SET_CURRENT_SONG_INDEX");
    },
    onTimeUpdate(time) {
      this.currentTime = time;
    },
    getDuration(time) {
      this.duration = time;
      // return this.duration;
    },
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          // alert("submit!");
          // await this.getSong();
          // this.songData.push(this.songs);
          // this.songs = {};
          await this.$store.dispatch("getSong", this.urlValidation.url);
          this.urlValidation.url = "";
          this.$store.dispatch("addSong");
          this.$store.dispatch("saveToJson");
          this.$store.dispatch("clearSong");
          // await this.getDuration();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style scoped>
</style>
