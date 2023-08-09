<template>
<div>
  网格方法：波段-5%,金额10000
  <div @click="buildResult">查看效果</div>
</div>
</template>

<script setup>
import { wanggeFun } from '../../node/test_2.js'
const props = defineProps(['sData'])

const buildResult = () => {
  wanggeFun(0.933, props.sData)
}
</script>