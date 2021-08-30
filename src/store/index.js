import { createStore } from "vuex";
import { Command } from "@tauri-apps/api/shell";
import { fs } from "@tauri-apps/api";
export default createStore({
  state: {
    currentSongIndex: 0,
    songs: {},
    songData: [],
  },
  mutations: {
    SET_SONGS_STATE(state, payload) {
      state.songs.title = payload[0];
      state.songs.audioSourceUrl = payload[2];
      state.songs.cover = payload[3];
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
    SET_CURRENT_SONG_INDEX(state) {
      state.currentSongIndex += 1;
    },
    // GET_SONG(state, song) {},
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
        commit("SET_SONGS_STATE", urlArr);
      });
    },
    addSong({ commit }) {
      commit("ADD_SONG");
    },
    clearSong({ commit }) {
      commit("CLEAR_SONG");
    },
    incrementCurrentSongIndex({ commit }) {
      commit("SET_CURRENT_SONG_INDEX");
    },
    saveToJson({ state }) {
      const jsonData = JSON.stringify(state.songData);
      // var fs = require("fs");
      fs.writeFile({ path: "test.json", contents: jsonData });
    },
    loadJson({ state }) {
      // const jsonData =
      fs.readTextFile("test.json").then(async (data) => {
        state.songData = await JSON.parse(data);
      });
      // console.log(
      //   jsonData.then(async (data) => {
      //     await console.log(data);
      //     state.songData = JSON.parse(data);
      //   })
      // );
    },
  },
  getters: {
    getSongData: (state) => {
      return state.songData;
    },
    // getSongAudioSource:(state) => {
    //   return state.
    // }
  },
  modules: {},
});
