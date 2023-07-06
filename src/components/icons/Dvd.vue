<template>
  <span class="icon">
    <svg
      fill="none"
      stroke="currentColor"
      stroke-width="1.5"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="dvdStroke" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stop-color="#666666" stop-opacity="1" />
          <stop offset="50%" stop-color="#030712" />
          <stop offset="100%" stop-color="#666666" stop-opacity="1" />
        </linearGradient>
        <linearGradient id="dvdFill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stop-color="#636363" stop-opacity="1" />
          <stop offset="50%" stop-color="#030712" />
          <stop offset="100%" stop-color="#636363" stop-opacity="1" />
        </linearGradient>
      </defs>
      <circle
        v-for="n in 10"
        :key="n"
        cx="12"
        cy="12"
        :r="11.6 - 2 * 0.13 * n"
        stroke-width=".13"
        stroke="url(#dvdStroke)"
        fill="url(#dvdFill)"
      ></circle>
    </svg>
  </span>
</template>
