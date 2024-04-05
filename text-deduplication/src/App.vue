<script setup lang="ts">
import { ref } from 'vue';
import { getDict } from './utils/data';

const dict = ref(getDict())

</script>

<template>
  <div>{{ dict }}</div>
</template>
