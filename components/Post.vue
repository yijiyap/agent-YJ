<template>
    <div class="inline-block">
        <img :src="post.image_url" alt="post image" class="w-1/2 h-1/2 mx-auto flex-col flex">
        <div>
            <span class="flex items-center justify-start gap-3 px-1 pt-1">
                <span class="mx-auto">{{ post.title }}</span>
            </span>
            <span class="flex items-center justify-start gap-3 px-1 pt-1">
                <span class="mx-auto">{{ post.caption }}</span>
            </span>
            <span class="flex items-center justify-start gap-3 px-1 pt-1">
                <span class="mx-auto mb-5"> W2C: {{ post.caption_link }}</span>
            </span>
        </div>
    </div>
</template>

<script setup>
const props = defineProps(['post']);
const { post } = toRefs(props);
    
</script>