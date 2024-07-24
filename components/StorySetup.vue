<script setup lang="ts">
const emit = defineEmits(['createStory'])

const storyPieces = ref({
  names: generateStringArray(),
  places: generateStringArray(2, 3),
  verbs: generateStringArray(2, 5),
  adjectives: generateStringArray(0,2),
  adverbs: generateStringArray(0,2)
})

function generateStringArray (minLength = 2, maxLength = 4) {
  const randomNumber = Math.floor(Math.random() * (maxLength - minLength) + minLength)
  return randomNumber ? Array(randomNumber).join('.').split('.').map((i) => ({value: i, valid: true})) : undefined
}

function sentenceCase (str: string) {
  return str?.length ? `${str.slice(0,1).toUpperCase()}${str.slice(1)}` : '';
}

function create () {
  let valid = true;
  const storyArray = Object.values(storyPieces.value);
  storyArray.forEach(items => {
    if (items?.length) {
      items.forEach((item) => {
        if (!item.value) {
          item.valid = false
          valid = false
        }
      })
    }
  });
  if (valid) {
    const {names, places, verbs, adverbs, adjectives} = storyPieces.value;
    const pieceMap = (i: {value: string, valid: boolean}) => i.value;
    const pieces = {
      names: names?.map(pieceMap),
      places: places?.map(pieceMap),
      verbs: verbs?.map(pieceMap),
      adverbs: adverbs?.map(pieceMap),
      adjectives: adjectives?.map(pieceMap)
    }
    emit('createStory', pieces)
  }
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
              v-model="storyPieces[key][index].value"
              :invalid="!item.valid"
              :placeholder="`${sentenceCase(key).slice(0, -1)} ${index + 1}`"
              @update:model-value="item.valid = !!item.value"
            />
          </div>
        </div>
      </div>
    </ClientOnly>
    <Button class="my-4" label="Create Story" @click="create" />
  </div>
</template>