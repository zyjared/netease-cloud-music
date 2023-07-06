<template>
  <span class="icon">
    <svg
      fill="none"
      stroke="currentColor"
      stroke-width="1"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <linearGradient id="dvdPointerLinear" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0%" stop-color="#ddd" stop-opacity="1" />
        <stop offset="50%" stop-color="#bbb" />
        <stop offset="100%" stop-color="#ddd" stop-opacity="1" />
      </linearGradient>
      <circle
        cx="2"
        cy="2"
        r="1.5"
        stroke-width="1"
        stroke="#ffffff33"
        fill="#eeeeee"
      ></circle>

      <circle
        cx="2"
        cy="2"
        r=".8"
        stroke-width="0"
        fill="url(#dvdPointerLinear)"
      ></circle>

      <path
        d="M 2.25 3.2 L 5 13 L9 16"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width=".8"
        fill="none"
        stroke="#eee"
      ></path>

      <path
        stroke="#ddd"
        d="M 9 16 L10 16.75 "
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1.8"
      ></path>

      <path
        stroke="#eee"
        d="M 10.2 16.9 L 10.2 16.9 "
        stroke-linejoin="round"
        stroke-linecap="round"
        stroke-width="2.5"
      ></path>
      <path
        stroke="#aaa"
        d="M 8.8 15.85 L 9 16 "
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width=".3"
      ></path>
      <circle
        cx="10.2"
        cy="16.9"
        r=".5"
        stroke-width="0"
        fill="url(#dvdPointerLinear)"
      ></circle>
    </svg>
  </span>
</template>
