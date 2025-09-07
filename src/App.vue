<script setup>
import { useTypewriterEffect } from './composables/useTypewriterEffect';
import { watch } from 'vue';

const {
  text,
  isWriting,
  write,
  reset,
  stop,
  resume } = useTypewriterEffect({
    speed: 10,
    numberOfSymbols: 1.5
  })

function handlerWrite() {
  write('Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.')
}

watch(isWriting, (newValue, oldValue) => {
  console.log(`Do something when the isWriting variable changes from ${newValue} to ${oldValue}`)
})

</script>

<template>
  <div class="container">
    <div class="buttons">
      <button @click="handlerWrite">
        Typewriter effect
      </button>
      <button @click="reset">
        Reset
      </button>
      <button @click="stop">
        Stop
      </button>
      <button @click="resume">
        Resume
      </button>
    </div>
    <div class="typewriter-text-wrapped">
    {{ text }}
    </div>
    <div>
    Is it writing? {{ isWriting }}
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  width: 500px;
}

.buttons {
  display: flex;
  column-gap: 0.5rem;
  margin-bottom: 0.5rem;
}

/* .typewriter-text-wrapped {
  height: 100px;
  overflow-y: auto;
} */
</style>
