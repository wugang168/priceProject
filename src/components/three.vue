<template>
  <div @click="test">第三种投发</div>
</template>

<script setup>
import { statistiaData } from "../../node/test_1"
const props = defineProps(['sData'])

const test = () => {
  console.log(props.sData)
  statistiaData(props.sData)
}
</script>
