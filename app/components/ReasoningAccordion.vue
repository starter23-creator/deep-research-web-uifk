<!-- Shows an accordion for reasoning (CoT) content. The accordion is default invisible,
until modelValue's length > 0 -->

<script setup lang="ts">
  const props = defineProps<{
    loading?: boolean
  }>()

  const modelValue = defineModel<string>()
  const items = computed(() => [
    {
      icon: 'i-lucide-brain',
      content: modelValue.value,
    },
  ])
  const currentOpen = ref('0')

  watchEffect(() => {
    if (props.loading) {
      currentOpen.value = '0'
    } else {
      currentOpen.value = '-1'
    }
  })
</script>

<template>
  <UAccordion
    v-if="modelValue"
    v-model="currentOpen"
    class="neumorphic-raised neumorphic-card rounded-neumorphic px-4 sm:px-6"
    :items="items"
    :loading="loading"
    :ui="{
      wrapper: 'rounded-neumorphic overflow-hidden',
      container: 'rounded-neumorphic',
      item: {
        container: 'rounded-neumorphic',
        base: 'rounded-neumorphic',
        padding: 'py-4',
        focus: 'focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
      }
    }"
  >
    <template #leading="{ item }">
      <div
        :class="[
          loading && 'animate-pulse',
          'flex items-center gap-3 text-(--ui-primary) font-medium',
        ]"
      >
        <UIcon :name="item.icon" size="22" class="text-indigo-400" />
        {{ loading ? $t('modelThinking') : $t('modelThinkingComplete') }}
      </div>
    </template>
    <template #content="{ item }">
      <p
        class="text-neumorphic-text whitespace-pre-wrap mb-4 p-4 rounded-neumorphic bg-white/30"
      >
        {{ item.content }}
      </p>
    </template>
  </UAccordion>
</template>
