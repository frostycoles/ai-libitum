<script setup lang="ts">
function createStory(pieces) {
  console.log('frostycoles', { pieces });
}
</script>
<template>
  <div>
    <StorySetup @create-story="createStory" />
  </div>
</template>