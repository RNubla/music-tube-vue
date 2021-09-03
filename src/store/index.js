import axios from "axios";
import { createStore } from "vuex";
import { Command } from "@tauri-apps/api/shell";
import { fs } from "@tauri-apps/api";
export default createStore({
  state: {
    playlistIndex: 0,
    songEnded: false,
    currentSong: {},
    playlist: [],
  },
  mutations: {
    SET_CURRENT_SONG_STATE(state, payload) {
      state.currentSong = payload;
    },
    ADD_TO_PLAYLIST(state, payload) {
      state.playlist.push(payload);
    },
    SET_SONG_ENDED(state, payload) {
      state.songEnded = payload;
    },
    APPEND_AUDIO_SRC(state, payload) {
      let wantedSong = state.playlist.find((song) => song.id == payload.id);
      let idx = state.playlist.indexOf(wantedSong);
      wantedSong["src"] = payload.audioSrc;
      state.playlist[idx] = wantedSong;
    },
    INCREMENT_PLAYLIST_INDEX(state) {
      state.playlistIndex += 1;
    },
  },
  actions: {
    fetchAudioSrc({ commit }, payload) {
      axios.post("http://127.0.0.1:8000/id", { v: payload }).then((res) => {
        const data = res.data._ydl_info;
        const m4a = data["formats"].filter((e) => e.ext == "m4a");
        // const audioSrc = m4a[0].url
        const newPayload = { id: payload, audioSrc: m4a[0].url };
        commit("APPEND_AUDIO_SRC", newPayload);
      });
    },
    saveToJson({ state }) {
      const jsonData = JSON.stringify(state.playlist);
      // var fs = require("fs");
      fs.writeFile({ path: "test.json", contents: jsonData });
    },
    loadJson({ state }) {
      // const jsonData =
      fs.readTextFile("test.json").then(async (data) => {
        // console.log("data", data);
        if (data === undefined || data == "" || !data) {
          console.log("No data is written on test.json");
          state.playlist = [];
        } else {
          state.playlist = await JSON.parse(data);
        }
      });
    },
  },
});
