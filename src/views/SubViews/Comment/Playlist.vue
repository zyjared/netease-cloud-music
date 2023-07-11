<script setup lang='ts'>
import SubContainer from '@/components/global/SubContainer.vue';
import { onMounted } from 'vue';

// type Props = {
//     id: number
// }

// const props = defineProps<Props>()

// async function disburse(props: Props) {
    // console.log(props)
// }

onMounted(() => {
    // disburse(props);
})
</script>

<template>
    <SubContainer title="评论">
        <div>歌单评论</div>
    </SubContainer>
</template>