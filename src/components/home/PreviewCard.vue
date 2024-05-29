<script setup>
const props = defineProps(["cardInfo"]);
</script>

<template >
    <div class="col-xxl-4 col-lg-6 py-4">
        <div class="card p-2">
            <img class="card-img-top my-2" :src="'preview/'+cardInfo.imageName" alt="" />
            <!-- <img class="card-img-top my-2" :src="'@/assets/preview/tree-generator.png'" alt="" /> -->
            <!-- <img class="card-img-top my-2" :src="'@/assets/preview/' + 'tree-generator.png'" alt="" /> -->
            <div class="card-body">
                <h5 class="card-title">{{ cardInfo.headline }}</h5>
                <p class="card-text">
                    {{ cardInfo.description }}
                </p>
            </div>
        </div>
    </div>
</template>
