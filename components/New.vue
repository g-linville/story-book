<script setup lang="ts">
import { useMainStore } from '@/store'
import type { StoryRequest } from '@/lib/types'

const store = useMainStore()
const open = ref(false)
const pageOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const toast = useToast()
const state = reactive<StoryRequest>({
    prompt: '',
    pages: 0,
})

async function onSubmit () {
    const response = await fetch('/api/story', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(state)
    })

    if (response.ok) {
        toast.add({
            id: 'story-generating',
            title: 'Story Generating',
            description: 'Your story is being generated. Depending on the length, this may take a few minutes.',
            icon: 'i-heroicons-pencil-square-solid',
        })
        store.fetchPendingStories()
    } else {
        toast.add({
            id: 'story-generating-failed',
            title: 'Story Generation Failed',
            description: `Your story could not be generated due to an error: ${response.statusText}.`,
            icon: 'i-heroicons-x-mark',
        })
    }    
    open.value = false
}
</script>

<template>
    <UButton size="lg" color="gray" class="w-full text-xl" icon="i-heroicons-plus" @click="open = true">New Story</UButton>
    <UModal fullscreen v-model="open" :ui="{width: 'sm:max-w-3/4 w-4/5 md:w-3/4 lg:w-1/2', }">
        <UCard class="h-full">
            <template #header>
                <div class="flex items-center justify-between">
                    <h1 class="text-2xl">Create a new story</h1>
                    <UButton color="white" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="open = false" />
                </div>
            </template>
            <div >
                <UForm class="h-full" :state=state @submit="onSubmit">
                    <UFormGroup size="lg" class="mb-6" label="Pages" name="pages">
                        <USelectMenu class="w-1/4 md:w-1/6"v-model="state.pages" :options="pageOptions"/>
                    </UFormGroup>
                    <UFormGroup class="my-6" label="Story" name="prompt">
                            <UTextarea :ui="{base: 'h-[50vh]'}" size="xl" class="" v-model="state.prompt" label="Prompt" placeholder="Put your full story here or prompt for a new one"/>
                    </UFormGroup>
                    <UButton size="xl" color="white" icon="i-heroicons-book-open" type="submit">Create Story</UButton>
                </UForm>
            </div>
        </UCard>    
    </UModal>
</template>