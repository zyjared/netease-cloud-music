<script setup lang="ts">
import Nav from "./views/Layout/Nav.vue";
import MusicComponent from "./views/Layout/MusicComponent.vue";
import MusicInterface from "./views/Layout/MusicInterface/index.vue";
import { onBeforeMount, ref } from "vue";
import { modeInit } from "./composables/useDark";
import MainView from "./views/Layout/MainView.vue";

const musicInterfaceShow = ref<boolean>(false);
const handleMusicInterfaceShow = () => {
  musicInterfaceShow.value = !musicInterfaceShow.value;
};

onBeforeMount(() => {
  modeInit();
});
</script>

<template>
  <MainView class="main" />
  <MusicComponent
    class="music-component"
    @img-event="handleMusicInterfaceShow"
  />
  <Nav class="nav" />
  <MusicInterface
    :show="musicInterfaceShow"
    @handle-show="handleMusicInterfaceShow"
  />
</template>

<style>
/* 此处只布局 */
#app {
  position: relative;
  max-height: 100vh;
  height: 100vh;
  display: grid;
  grid-template:
    "main" 1fr
    "music" auto
    "nav" auto;
  padding-bottom: 0.5rem;
}

.main {
  grid-area: main;
  overflow-y: scroll;
}

.nav {
  grid-area: nav;
}

.music-component {
  grid-area: music;
}

@media (min-width: 640px) {
  #app {
    grid-template:
      "nav main" 1fr
      "music music" auto / auto 1fr;
  }
}
</style>
