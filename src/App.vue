<script setup lang="ts">
import '~/init'
import { answer, dayNo, daySince, isDev } from '~/state'
import { colorblind, gameMode } from '~/storage'
import { DAYS_PLAY_BACK } from '~/logic/constants'

const { height } = useWindowSize()

watchEffect(() => {
  document.documentElement.style.setProperty('--vh', `${height.value / 100}px`)
})

// In random mode, always allow play
const canPlay = computed(() => {
  if (gameMode.value === 'random')
    return true
  return answer.value.word && (isDev || (dayNo.value <= daySince.value && daySince.value - dayNo.value <= DAYS_PLAY_BACK))
})
</script>

<template>
  <main font-sans text="center gray-700 dark:gray-300" select-none :class="{ colorblind }">
    <NotTodayBanner v-if="gameMode === 'daily' && dayNo < daySince" />
    <Navbar />
    <div p="4">
      <NoQuizToday v-if="gameMode === 'daily' && !answer.word" />
      <NoFuturePlay v-else-if="gameMode === 'daily' && dayNo > daySince && !isDev" />
      <NoPastPlay v-else-if="gameMode === 'daily' && daySince - dayNo > DAYS_PLAY_BACK && !isDev" />
      <Play v-else-if="canPlay" />
    </div>
    <ModalsLayer />
    <Confetti />
  </main>
</template>
