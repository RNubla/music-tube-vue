import { createStore } from "vuex";
import { Command } from "@tauri-apps/api/shell";
import { fs } from "@tauri-apps/api";
export default createStore({
  state: {
    currentSongIndex: 0,
    songs: {},
    songData: [],
    currentAudioSource: "",
    nextAudioSource: "",
  },
  mutations: {
    SET_SONGS_STATE(state, payload) {
      state.songs.title = payload[0];
      // state.songs.audioSourceUrl = payload[2];
      state.songs.pic = payload[3];
      state.songs.dateAdded = new Date()
        .toJSON()
        .slice(0, 10)
        .replace(/-/g, "/");
    },
    SET_SONGS_YOUTUBE_URL(state, payload) {
      state.songs.youtubeUrl = payload;
    },
    ADD_SONG(state) {
      state.songData.push(state.songs);
    },
    CLEAR_SONG(state) {
      state.songs = {};
    },
    SET_CURRENT_SONG_INDEX(state, payload) {
      state.currentSongIndex = payload;
    },
    SET_CURRENT_AUDIO_SOURCE(state, payload) {
      state.currentAudioSource = payload;
    },
    INCREMENT_CURRENT_SONG_INDEX(state) {
      state.currentSongIndex += 1;
      console.log("INCREMENT", state.currentSongIndex);
    },
  },
  actions: {
    async getSong({ commit }, payload) {
      const command = Command.sidecar("youtube-dl", [
        payload,
        "-g",
        "-e",
        "--get-thumbnail",
      ]);
      await command.execute().then((event) => {
        const url = event.stdout;
        const urlArr = url.split("\n");
        // console.log(urlArr);
        commit("SET_SONGS_YOUTUBE_URL", payload);
        // commit("SET_CURRENT_AUDIO_SOURCE", urlArr[2]);
        commit("SET_SONGS_STATE", urlArr);
      });
    },
    async fetchSongAudio({ commit }, payload) {
      const command = Command.sidecar("youtube-dl", [
        payload,
        "-g",
        "-e",
        "--get-thumbnail",
      ]);
      await command.execute().then((event) => {
        const url = event.stdout;
        const urlArr = url.split("\n");
        commit("SET_CURRENT_AUDIO_SOURCE", urlArr[2]);

        // console.log(urlArr);
        // commit("SET_SONGS_YOUTUBE_URL", payload);
        // commit("SET_SONGS_STATE", urlArr);
      });
    },
    addSong({ commit }) {
      commit("ADD_SONG");
    },
    clearSong({ commit }) {
      commit("CLEAR_SONG");
    },
    setCurrentSongIndex({ commit }, payload) {
      commit("SET_CURRENT_SONG_INDEX", payload);
    },
    incrementCurrentSongIndex({ commit }) {
      commit("INCREMENT_CURRENT_SONG_INDEX");
    },
    saveToJson({ state }) {
      const jsonData = JSON.stringify(state.songData);
      // var fs = require("fs");
      fs.writeFile({ path: "test.json", contents: jsonData });
    },
    loadJson({ state }) {
      // const jsonData =
      fs.readTextFile("test.json").then(async (data) => {
        // console.log("data", data);
        if (data === undefined || data == "" || !data) {
          console.log("No data is written on test.json");
          state.songData = [];
        } else {
          state.songData = await JSON.parse(data);
        }
      });
    },
  },
  getters: {
    getSongData: (state) => {
      return state.songData;
    },
    getCurrentAudioSource: (state) => {
      return state.currentAudioSource;
    },
    getCurrentSongIndex: (state) => {
      return state.currentSongIndex;
    },
    // getSongAudioSource:(state) => {
    //   return state.
    // }
  },
  modules: {},
});
