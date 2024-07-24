<script setup lang="ts">
const storyPieces = ref({
  names: generateStringArray(),
  places: generateStringArray(2, 3),
  verbs: generateStringArray(2, 5),
  adjectives: generateStringArray(0,2),
  adverbs: generateStringArray(0,2)
})

function generateStringArray (minLength = 2, maxLength = 4) {
  const randomNumber = Math.floor(Math.random() * (maxLength - minLength) + minLength)
  return randomNumber ? Array(randomNumber).join('.').split('.') : undefined
}

function sentenceCase (str: string) {
  return str?.length ? `${str.slice(0,1).toUpperCase()}${str.slice(1)}` : '';
}
</script>
<template>
  <div>
    Set the Stage
    <ClientOnly>
      <div v-for="key in Object.keys(storyPieces)" :key="key">
        <div v-if="storyPieces[key]" class="mt-4">
          <div class="text-lg font-semibold">
            {{ sentenceCase(key) }}
          </div>
          <div class="flex gap-2 flex-wrap">
            <InputText
              v-for="(item, index) in storyPieces[key]"
              type="text" 
              v-model="storyPieces[key][index]"
              :placeholder="`${sentenceCase(key).slice(0, -1)} ${index + 1}`"
            />
          </div>
        </div>
      </div>
    </ClientOnly>
  </div>
</template>