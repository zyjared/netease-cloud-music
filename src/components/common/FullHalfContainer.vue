<script setup lang="ts"></script>

<template>
    <div class="flex h-full">
        <div class="flex-1 border-r border-[--line]">
            <h2 class="h-[3rem] text-center leading-[3rem]">
                <slot name="header"></slot>
            </h2>
            <div class="overflow-y-auto" style="max-height: calc(var(--h-main) - 3rem)">
                <slot></slot>
            </div>
        </div>
        <div class="hidden sm:flex sm:flex-1">
            <div class="m-auto">
                <slot name="second"></slot>
            </div>
        </div>
    </div>
</template>
