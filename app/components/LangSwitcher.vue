<script setup lang="ts">
  const { locale: globalLocale, availableLocales, t, setLocale } = useI18n()

  const props = defineProps<{
    /** Override display locale */
    value?: Locale
    /** If true, it will not change global locales */
    private?: boolean
  }>()

  const emit = defineEmits<{
    (e: 'update', value: Locale): void
  }>()

  const localeOptions = availableLocales.map((locale) => ({
    value: locale,
    label: t('language', {}, { locale }),
  }))

  function changeLocale(l: Locale) {
    emit('update', l)
    if (props.private) return
    setLocale(l)
  }
</script>

<template>
  <USelect
    icon="i-lucide-languages"
    :model-value="value ?? globalLocale"
    :items="localeOptions"
    class="neumorphic-raised neumorphic-pill"
    :ui="{
      container: 'relative',
      select: 'border-0 w-full py-1.5 px-3 rounded-pill',
      icon: {
        container: 'absolute inset-y-0 left-2 flex items-center'
      },
      option: {
        rounded: 'rounded-xl',
        padding: 'p-3',
      },
      dropdown: 'shadow-neumorphic-raised rounded-neumorphic'
    }"
    @update:model-value="changeLocale($event)"
  />
</template>
