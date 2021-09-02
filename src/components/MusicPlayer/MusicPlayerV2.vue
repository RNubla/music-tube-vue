<template>
    <div class="audioPlayer">
        <a
            class="nav-icon"
            v-on:click="isPlaylistActive = !isPlaylistActive"
            :class="{ 'isActive': isPlaylistActive }"
            title="Music List"
        >
            <span></span>
            <span></span>
            <span></span>
        </a>
        <div class="audioPlayerList" :class="{ 'isActive': isPlaylistActive }">
            <div
                class="item"
                v-for="(item,index) in musicPlaylist"
                @click="[changeSong(index), isPlaylistActive = !isPlaylistActive]"
                v-bind:class="{ 'isActive': isCurrentSong(index) }"
            >
                <p class="title">{{ item.title }}</p>
                <p class="artist">{{ item.artist }}</p>
            </div>

            <p class="debugToggle" v-on:click="toggleDebug()">debug: {{ debug }}</p>
        </div>
        <div class="audioPlayerUI" :class="{ 'isDisabled': isPlaylistActive }">
            <div class="albumImage">
                <transition
                    name="ballmove"
                    enter-active-class="animated zoomIn"
                    leave-active-class="animated fadeOutDown"
                    mode="out-in"
                >
                    <!--<transition name="slide-fade" mode="out-in">-->
                    <img
                        @load="onImageLoaded()"
                        :src="musicPlaylist[currentSong].image"
                        :key="currentSong"
                        :ondragstart="dragStart"
                        id="playerAlbumArt"
                    />
                </transition>
                <div class="loader" :key="currentSong">Loading...</div>
            </div>
            <div class="albumDetails">
                <transition name="slide-fade" mode="out-in">
                    <p class="title" :key="currentSong">{{ musicPlaylist[currentSong].title }}</p>
                </transition>
                <transition name="slide-fade" mode="out-in">
                    <p class="artist" :key="currentSong">{{ musicPlaylist[currentSong].artist }}</p>
                </transition>
            </div>

            <div class="playerButtons">
                <a
                    class="button"
                    :class="{ 'isDisabled': (currentSong == 0) }"
                    v-on:click="prevSong()"
                    title="Previous Song"
                >
                    <i class="zmdi zmdi-skip-previous"></i>
                </a>
                <a class="button play" v-on:click="playAudio()" title="Play/Pause Song">
                    <transition name="slide-fade" mode="out-in">
                        <i
                            class="zmdi"
                            :class="[currentlyStopped ? 'zmdi-stop' : (currentlyPlaying ? 'zmdi-pause-circle' : 'zmdi-play-circle')]"
                            :key="1"
                        ></i>
                    </transition>
                </a>
                <a
                    class="button"
                    :class="{ 'isDisabled': (currentSong == musicPlaylist.length - 1) }"
                    v-on:click="nextSong()"
                    title="Next Song"
                >
                    <i class="zmdi zmdi-skip-next"></i>
                </a>
            </div>

            <div class="currentTimeContainer" style="text-align:center">
                <span class="currentTime">{{ currentTime | this.fancyTimeFormat }}</span>
                <span class="totalTime">{{ trackDuration | this.fancyTimeFormat }}</span>
                <!-- <span style="color:black">({{ currentSong + 1 }}/{{ musicPlaylist.length }})</span> -->
            </div>

            <div class="currentProgressBar">
                <div class="currentProgress" :style="{ width: currentProgressBar + '%' }"></div>
            </div>
        </div>
    </div>
</template>

<script>import { onMounted } from "@vue/runtime-core";

export default {
    setup() {
        let audio = "";
        let imgLoaded = false
        let currentlyPlaying = false;
        let currentlyStopped = false;
        let currentTime = 0
        let checkingCurrentPositionInTrack = ""
        let trackDuration = 0
        let currentProgressBar = 0
        let isPlaylistActive = false
        let currentSong = 0
        let debug = false
        let musicPlaylist = [
            {
                title: "Service Bell",
                artist: "Daniel Simion",
                url: "https://soundbible.com/mp3/service-bell_daniel_simion.mp3",
                image: "https://source.unsplash.com/crs2vlkSe98/400x400"
            },
            {
                title: "Meadowlark",
                artist: "Daniel Simion",
                url: "https://soundbible.com/mp3/meadowlark_daniel-simion.mp3",
                image: "https://source.unsplash.com/35bE_njbG9E/400x400"
            },
            {
                title: "Hyena Laughing",
                artist: "Daniel Simion",
                url: "https://soundbible.com/mp3/hyena-laugh_daniel-simion.mp3",
                image: "https://source.unsplash.com/Esax9RaEl2I/400x400"
            },
            {
                title: "Creepy Background",
                artist: "Daniel Simion",
                url: "http://soundbible.com/mp3/creepy-background-daniel_simon.mp3",
                image: "https://source.unsplash.com/j0g8taxHZa0/400x400"
            }
        ]
        let audioFile = ""

        const changeSong = (index) => {
            let wasPlaying = currentlyPlaying
            imageLoaded = false
            if (index !== undefined) {
                stopAudio()
                currentSong = index
            }
            audioFile = musicPlaylist[currentSong].url
            audio = new Audio(audioFile)
            audio.addEventListener("loadedmetadata", (event) => {
                trackDuration = Math.round(event.durati)
            })
        }
        const stopAudio = () => {
            audio.pause()
            currentlyPlaying = false

        }
        onMounted(() => {

        })
    }
}
</script>