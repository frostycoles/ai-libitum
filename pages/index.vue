<script setup lang="ts">
const story = ref<string>()
const loading = ref(false)

function createStory(pieces: Record<string, string[]>) {
  loading.value = true;
  return $fetch('/api/story/create', { method: 'POST', body: { pieces } }).then((newStory) => {
    if (newStory) story.value = newStory
    loading.value = false;
  });
}

const toast = useToast()

function copyStory () {
  if (story.value){
    navigator.clipboard.writeText(story.value)
    toast.add({severity: 'success', summary: 'Success Message', detail: 'Story copied to clipboard', life: 3000})
  }
}
</script>
<template>
  <div>
    <Toast />
    <div v-if="story" class="p-10">
      <div v-html="story" style="line-height: 1.9em;" />
      <div class="flex gap-2 flex-wrap">
        <Button class="my-4" label="Copy Story" @click="copyStory" />
        <Button class="my-4" severity="warn" label="Create new Story" @click="story = ''" />
      </div>
    </div>
    <div v-else-if="loading" class="p-10">
      Loading...
    </div>
    <StorySetup v-else @create-story="createStory" />
  </div>
</template>

<style>
.name {
  border: 1px solid blue;
  border-radius: 6px;
  background-color: aqua;
  padding: 2px;
}
.place {
  border: 1px solid green;
  border-radius: 6px;
  background-color: greenyellow;
  padding: 2px;
}
.verb {
  border: 1px solid red;
  border-radius: 6px;
  background-color: orange;
  padding: 2px;
}
.adjective {
  border: 1px solid purple;
  border-radius: 6px;
  background-color: pink;
  padding: 2px;
}
.adverb {
  border: 1px solid grey;
  border-radius: 6px;
  background-color: lightcyan;
  padding: 2px;
}
</style>