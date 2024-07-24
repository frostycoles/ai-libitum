<script setup lang="ts">
function createStory(pieces) {
  $fetch('/api/story/create', { method: 'POST', body: { pieces } });
}
</script>
<template>
  <div>
    <StorySetup @create-story="createStory" />
  </div>
</template>