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
</template>

<script>
import { onMounted, ref } from 'vue'
import { useStore } from 'vuex';
export default {
  data() {
    return {
      isDark: false,
    };
  },
  setup(props) {
    const urlValidation = ref(null)
    const store = useStore()
    const validUrl = (str) => {
      const pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
      return !!pattern.test(str);
    }
    async function submit() {
      if (validUrl(urlValidation.value.value)){
        // console.log('valid')
        await store.dispatch('getSong', urlValidation.value.value)
        urlValidation.value.value = ""
        store.dispatch('addSong')
        store.dispatch('clearSong')
      }else{
        alert(`The following url is not valid: ${urlValidation.value.value}`)
        urlValidation.value.value = ""
        console.log('submit', urlValidation.value.value)
      }
    }


    return {
      urlValidation,
      submit
    }
  }
  // methods:{
  //   submit(formValidation){
  //     console.log('submit working', this.$refs[formValidation])
  //   }
  // }
};
</script>

<style>
</style>