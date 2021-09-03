import { createStore } from "vuex";
export default createStore({
  state: {
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
  },
});
