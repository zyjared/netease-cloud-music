<script setup lang="ts">
import FullContainer from '@/components/common/FullContainer.vue';
import Loading from '@/components/global/Loading.vue';

</script>

<template>
    <FullContainer>
        <RouterView />
        <Loading />
    </FullContainer>
</template>

<style scoped></style>
