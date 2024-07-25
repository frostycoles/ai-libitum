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
      <div>
        {{ story }}
      </div>
      <div class="flex gap-2 flex-wrap">
        <Button class="my-4" label="Copy Story" @click="copyStory" />
        <!-- <Button class="my-4" severity="warn" label="Create new Story" /> -->
      </div>
    </div>
    <div v-else-if="loading" class="p-10">
      Loading...
    </div>
    <StorySetup v-else @create-story="createStory" />
  </div>
</template>