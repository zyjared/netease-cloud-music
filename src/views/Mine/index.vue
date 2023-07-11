<script setup lang="ts">
import FullHalfContainer from '@/components/common/FullHalfContainer.vue';
import { shallowRef, onMounted } from 'vue';
import UserSongTrack from './components/UserSongTrack.vue';
import { getUserPlaylist } from '@/api/user';
import { useUserStore } from '@/stores/user';
import { Action, ElMessageBox } from 'element-plus';
import { useRouter } from 'vue-router';
// import { getSubcount } from '@/api/mine';

const playlist = shallowRef<{
    id: number;
    name: string;
    trackCount: number;
    coverImgUrl: string;
    creator: {
        nickname: string
        userId: number;
    }
}[]>()

const router = useRouter()
const userStore = useUserStore();

onMounted(async () => {
    if (!userStore.userId) {
        ElMessageBox.alert('将跳转到账户页', '未登录', {
            // if you want to disable its autofocus
            // autofocus: false,
            confirmButtonText: 'OK',
            callback: (_action: Action) => {
                router.replace('/account')
                // ElMessage({
                //     type: 'info',
                //     message: `action: ${action}`,
                // })
            },
        })
    };
    playlist.value = await getUserPlaylist(userStore.userId);
    // await getSubcount(); // 测试获得自己的数据
})
</script>

<template>
    <FullHalfContainer>
        <template #header>
            <div class="flex justify-between p-4 text-sm "> <span
                    class="border border-[--line] rounded-full px-2 py-1">云盘</span>
                <span class="border border-[--line] rounded-full px-2 py-1">管理</span>
            </div>
        </template>
        <template #default>
            <section class="p-4">
                <h3 class="py-4 font-bold">我的歌单</h3>
                <div class="space-y-3">
                    <UserSongTrack v-for="p in playlist" v-bind="{
                        id: p.id,
                        name: p.name,
                        trackCount: p.trackCount,
                        coverImgUrl: p.coverImgUrl,
                        creator: p.creator
                    }" :key="p.id" />
                </div>
            </section>
            <Loading />
        </template>
    </FullHalfContainer>
</template>
