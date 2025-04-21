<script setup lang="ts">
  import { marked } from 'marked'

  import type { DeepResearchNode } from './DeepResearch.vue'

  defineProps<{
    node: DeepResearchNode
  }>()

  defineEmits<{
    (e: 'retry', nodeId: string): void
  }>()
</script>

<template>
  <div class="py-2">
    <USeparator 
      :label="$t('webBrowsing.nodeDetails')"
      class="mb-4"
      :ui="{
        container: 'flex items-center',
        label: 'text-base font-medium px-2',
        wrapper: 'h-px flex-1 bg-gray-200 dark:bg-gray-800'
      }"
    />
    <UAlert
      v-if="node.error"
      class="my-4 rounded-neumorphic"
      :title="$t('webBrowsing.nodeFailed')"
      :description="node.error"
      color="error"
      variant="soft"
      :actions="[
        {
          label: $t('webBrowsing.retry'),
          color: 'secondary',
          onClick: () => $emit('retry', node.id),
          class: 'neumorphic-pill'
        },
      ]"
    />
    <h2 class="text-xl font-bold my-3 text-neumorphic-text">
      {{ node.label ?? $t('webBrowsing.generating') }}
    </h2>

    <!-- Research goal -->
    <div class="p-4 rounded-neumorphic bg-white/30 dark:bg-gray-800/30 shadow-sm my-4">
      <h3 class="text-lg font-semibold mb-2">
        {{ $t('webBrowsing.researchGoal') }}
      </h3>
      <!-- Root node has no additional information -->
      <p v-if="isRootNode(node.id)" class="text-neumorphic-text">
        {{ $t('webBrowsing.startNode.description') }}
      </p>
      <p
        v-if="node.researchGoal"
        class="prose max-w-none dark:prose-invert break-words text-neumorphic-text"
        v-html="marked(node.researchGoal, { gfm: true })"
      />
    </div>

    <!-- Visited URLs -->
    <div class="p-4 rounded-neumorphic bg-white/30 dark:bg-gray-800/30 shadow-sm my-4">
      <h3 class="text-lg font-semibold mb-2">
        {{ $t('webBrowsing.visitedUrls') }}
      </h3>
      <ul v-if="node.searchResults?.length" class="list-disc list-inside">
        <li
          v-for="(item, index) in node.searchResults"
          class="whitespace-pre-wrap break-all py-1"
          :key="index"
        >
          <UButton
            class="!p-0 contents"
            variant="link"
            :href="item.url"
            target="_blank"
          >
            {{ item.title || item.url }}
          </UButton>
        </li>
      </ul>
      <span v-else class="text-gray-500"> - </span>
    </div>

    <!-- Learnings -->
    <div class="p-4 rounded-neumorphic bg-white/30 dark:bg-gray-800/30 shadow-sm my-4">
      <h3 class="text-lg font-semibold mb-2">
        {{ $t('webBrowsing.learnings') }}
      </h3>

      <ReasoningAccordion
        v-if="node.generateLearningsReasoning"
        v-model="node.generateLearningsReasoning"
        class="my-3"
        :loading="
          node.status === 'processing_serach_result_reasoning' ||
          node.status === 'processing_serach_result'
        "
      />
      <div class="space-y-2">
        <template v-for="({ learning }, index) in node.learnings" :key="index">
          <p
            v-if="learning"
            class="prose max-w-none dark:prose-invert break-words text-neumorphic-text"
            v-html="marked(`- ${learning}`, { gfm: true })"
          ></p>
        </template>
      </div>
      <span v-if="!node.learnings?.length" class="text-gray-500"> - </span>
    </div>

    <!-- Follow up questions -->
    <!-- Only show if there is reasoning content. Otherwise the follow-ups are basically just child nodes. -->
    <template v-if="node.generateQueriesReasoning">
      <div class="p-4 rounded-neumorphic bg-white/30 dark:bg-gray-800/30 shadow-sm my-4">
        <h3 class="text-lg font-semibold mb-2">
          {{ $t('webBrowsing.followUpQuestions') }}
        </h3>

        <!-- Set loading default to true, because currently don't know how to handle it otherwise -->
        <ReasoningAccordion
          v-if="node.generateQueriesReasoning"
          v-model="node.generateQueriesReasoning"
          :loading="
            node.status === 'generating_query_reasoning' ||
            node.status === 'generating_query'
          "
        />
      </div>
    </template>
  </div>
</template>
