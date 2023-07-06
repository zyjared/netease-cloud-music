<script setup lang="ts">
import { useSubView } from "@/stores/subView";
import gsap from "gsap";

const subViewStore = useSubView();

const onEnter = (el: Element) => {
    const prevNode = el.previousElementSibling;
    if (prevNode?.getAttribute('sub-view') == el.getAttribute('sub-view')) return;
    if (prevNode) {
        gsap.to(prevNode, {
            x: `-${parseInt(prevNode.getAttribute("offset-n") as string) * 100}%`,
            duration: 0.3,
        });
    }
    gsap.from(el, {
        x: "100%",
        duration: 0.3,
    });
};

const onLeave = (el: Element, done: any) => {
    const prevNode = el.previousElementSibling;
    if (prevNode) {
        gsap.to(prevNode, {
            x: 0,
            duration: 0.3,
        });
    }
    gsap.to(el, {
        x: "100%",
        onComplete: done,
        duration: 0.3,
    });
};


</script>

<template>
    <span class="hidden w-full"></span>
    <span class="hidden w-1/2"></span>

    <TransitionGroup @enter="onEnter" @leave="onLeave">
        <div v-for="c in subViewStore.subViews" :key="c.id" :offset-n="c.view.n" :sub-view="c.toview"
            :class="c.view.n == 1 ? 'sm:w-1/2 w-full' : 'w-full'" :style="{
                background: 'var(--bg)',
                position: 'absolute',
                right: 0,
                top: 0,
                height: '100%',
                zIndex: '50'
            }">
            <component :is="c.view.component" v-bind="c.params" :key="'c-' + c.id" />
        </div>
    </TransitionGroup>
</template>
