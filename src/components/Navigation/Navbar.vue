<template>
  <div :class="isDark ? 'dark' : ''">
    <header class="w-full shadow-lg bg-white dark:bg-gray-700 items-center h-16 rounded-b-2xl z-40">
      <div class="relative z-20 flex flex-col justify-center h-full px-3 mx-auto flex-center">
        <div class="relative items-center pl-1 flex w-full lg:max-w-68 sm:pr-2 sm:ml-0">
          <div class="container relative left-0 z-50 flex w-3/4 h-full">
            <div class="relative flex items-center w-full lg:w-64 h-full group">
              <div
                class="absolute z-50 flex items-center justify-center w-auto h-10 p-3 pr-2 text-sm text-gray-500 uppercase cursor-pointer sm:hidden"
              >
                <svg
                  fill="none"
                  class="relative w-5 h-5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <!-- Search Icon -->
              <svg
                class="absolute left-0 z-20 hidden w-4 h-4 ml-4 text-gray-500 pointer-events-none fill-current group-hover:text-gray-400 sm:block"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"
                />
              </svg>
              <!-- <form @submit.prevent="submit('urlValidation')" ref='urlValidation'> -->
              <form @submit.prevent="submit()">
                <input
                  ref="urlValidation"
                  type="text"
                  class="block w-full py-1.5 pl-10 pr-4 leading-normal rounded-2xl focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 ring-opacity-90 bg-gray-100 dark:bg-gray-800 text-gray-400 aa-input"
                  placeholder="Youtube URL"
                />
              </form>
              <div
                class="absolute right-0 hidden h-auto px-2 py-1 mr-2 text-xs text-gray-400 border border-gray-300 rounded-2xl md:block"
              >+</div>
            </div>
          </div>
          <div
            class="relative p-1 flex items-center justify-end w-1/4 ml-5 mr-4 sm:mr-0 sm:right-auto"
          >
            <!-- Toggle Darkmode -->
            <div class="relative inline-block w-10 mr-2 align-middle select-none">
              <input
                @click="isDark = !isDark"
                type="checkbox"
                name="toggle"
                id="Blue"
                class="checked:bg-blue-500 outline-none focus:outline-none right-4 checked:right-0 duration-200 ease-in absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
              />
              <label
                for="Blue"
                class="block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
              ></label>
            </div>
            <span class="text-gray-400 font-medium">Dark Mode</span>
            <!-- <a href="#" class="block relative">
              <img
                alt="profil"
                src="/images/person/1.jpg"
                class="mx-auto object-cover rounded-full h-10 w-10"
              />
            </a>-->
          </div>
        </div>
      </div>
    </header>
  </div>
  <!-- <p>{{ this.$store.state.currentSong }}</p> -->
</template>

<script>
import { inject, onMounted, ref } from "vue";
import { useStore } from "vuex";
import axios from "axios";

// import youtubeFetch from '../../middleware/youtubeFetch'
export default {
  data() {
    return {
      isDark: false,
    };
  },
  setup(props) {
    let artist = ''
    let pic = ''
    let title = ''



    const urlValidation = ref(null);
    const store = useStore();
    const getUrlId = (url) => {
      const regExp = /^https?\:\/\/(?:www\.youtube(?:\-nocookie)?\.com\/|m\.youtube\.com\/|youtube\.com\/)?(?:ytscreeningroom\?vi?=|youtu\.be\/|vi?\/|user\/.+\/u\/\w{1,2}\/|embed\/|watch\?(?:.*\&)?vi?=|\&vi?=|\?(?:.*\&)?vi?=)([^#\&\?\n\/<>"']*)/i;
      const match = url.match(regExp);
      return (match && match[1].length == 11) ? match[1] : false;
    }
    const validUrl = (str) => {
      const pattern = new RegExp(
        "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
        "i"
      ); // fragment locator
      return !!pattern.test(str);
    };
    async function submit() {
      // https://www.youtube.com/watch?v=lgOKr-IajNA
      const id = getUrlId(urlValidation.value.value)
      urlValidation.value.value = ""
      if (Object.keys(store.state.currentSong).length === 0) {
        // console.log(id)
        axios
          .post("http://127.0.0.1:8000/id", { v: id })
          .then((res) => {
            const data = res.data._ydl_info
            console.log(data)
            // console.log(data["artist"])
            if (data['artist'] === undefined) {

              artist = data["channel"]
            } else {

              artist = data["artist"]
            }
            // console.log(data["title"])
            title = data["title"]
            pic = data["thumbnail"]
            const m4a = data["formats"].filter((e) => e.ext == "m4a")
            // console.log(m4a[0].url)
            const song = {
              "title": title,
              "artist": artist,
              "pic": pic,
              "src": m4a[0].url
            }
            // const url = m4a[0].url
            // console.log(url)
            store.commit('SET_CURRENT_SONG_STATE', song)
            store.commit('ADD_TO_PLAYLIST', song)
          });
      }
      else {
        axios.post('http://127.0.0.1:8000/id', { v: id }).then((res) => {
          const data = res.data._ydl_info
          artist = data['artist']
          title = data["title"]
          pic = data["thumbnail"]
          const m4a = data["formats"].filter((e) => e.ext == "m4a")
          const song = {
            "title": title,
            "artist": artist,
            "pic": pic,
            "src": m4a[0].url
          }
          store.commit('ADD_TO_PLAYLIST', song)
        })
      }
    }

    // async function submit() {
    //   if (validUrl(urlValidation.value.value)) {
    //     // console.log('valid')
    //     await store.dispatch('getSong', urlValidation.value.value)
    //     urlValidation.value.value = ""
    //     store.dispatch('addSong')
    //     store.dispatch('saveToJson')
    //     store.dispatch('clearSong')
    //   } else {
    //     alert(`The following url is not valid: ${urlValidation.value.value}`)
    //     urlValidation.value.value = ""
    //     console.log('submit', urlValidation.value.value)
    //   }
    // }

    return {
      urlValidation,
      submit,
    };
  },
  // methods:{
  //   submit(formValidation){
  //     console.log('submit working', this.$refs[formValidation])
  //   }
  // }
};
</script>

<style>
</style>