<template>
    <section class="section-bottom">
        <div class="block-bottom">
            <div class="block-bottom-inner">
                <div class="block-bottom-pic pic-humidity"></div>
                <div class="block-bottom-texts">
                    <div class="block-bottom-text-block">
                        <div class="block-bottom-text-block-title">Влажность: {{ humidity ? humidity : '-' }} %</div>
                        <div class="block-bottom-text-block-desc">
                            Влажность – это концентрация водяного пара, присутствующего в воздухе. Водяной пар,
                            газообразное состояние воды, обычно невидим для человеческого глаза.
                            <br /><br />
                            Одно и то же количество водяного пара приводит к более высокой относительной влажности в
                            прохладном воздухе, чем в теплом.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
const props = defineProps({
    humidity: {
        type: Number,
    },
});
</script>
