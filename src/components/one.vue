<template>
  <div>
    <div>一笔买入方法</div>
    <div>
      初始买入价： {{startPrice}}
      最低价：{{lower}}
      最高价: {{hight}}
    </div>
    <div>
      区间盈利： {{ yingli }} <br />
      盈利百分比： {{ yingli / startPrice * 100 }}
    </div>
  </div>
</template>

<script setup>
import {ref, computed, watch} from 'vue'
const props = defineProps(['sData'])
const startPrice = ref('')
const lower = ref('')
const hight = ref('')

const yingli = computed(() => {
  return hight.value - startPrice.value
})

watch(() => props.sData, (newData) => {
  console.log(newData)
  console.log("监听到了变动")
  startPrice.value = newData[0]
  lower.value = Math.min(...newData)
  hight.value = Math.max(...newData)
})
</script>