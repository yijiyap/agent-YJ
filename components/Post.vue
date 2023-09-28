<template>
    <div class="mx-auto">
        <!-- BS card: Start -->
        <div class="card mx-auto" style="width: 18rem;">
            <img :src="post.image_url" alt="post image" class="mx-auto flex-col flex">
            <div class="card-body">
                <h5 class="card-title">{{ post.title }}</h5>

                <p class="card-subtitle"><a v-bind:href="post.caption_link">{{ post.caption_link }}</a></p>
                <p class="card-text">{{ post.caption }}</p>
            </div>
        </div>
        <!-- BS card: End -->
    </div>
</template>

<script setup>
const props = defineProps(['post']);
const { post } = toRefs(props);

</script>