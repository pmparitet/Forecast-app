<template>
    <div class="page">
        <main class="main">
            <div class="container">
                <div class="laptop">
                    <div class="sections">
                        <section class="section section-left">
                            <div class="info">
                                <div class="city-inner">
                                    <input
                                        :value="city"
                                        @input="updateCity"
                                        type="text"
                                        class="search"
                                        :class="searchWarning"
                                        @keyup.enter="getWeather"
                                    />
                                </div>
                                <WeatherSummary />
                            </div>
                        </section>
                        <section class="section section-right">
                            <HighlightsVue />
                        </section>
                    </div>
                    <div class="sections">
                        <Coords :coord="weatherInfo?.coord" />
                        <Humidity :humidity="weatherInfo?.main?.humidity" />
                    </div>
                    <template v-if="loading">
                        <Loader />
                    </template>
                </div>
            </div>
        </main>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import HighlightsVue from './components/Highlights.vue';
import WeatherSummary from './components/WeatherSummary.vue';
import Coords from './components/Coords.vue';
import Humidity from './components/Humidity.vue';
import Loader from './components/Loader.vue';

const store = useStore();

function getLocalStorage() {
    const cityStorage = localStorage.getItem('weatherCity');
    if (cityStorage) store.dispatch('updateCity', cityStorage);
}
getLocalStorage();

const loading = computed(() => store.getters.loading);
const weatherInfo = computed(() => store.getters.weatherInfo);

const city = computed(() => store.getters.city);
const updateCity = (e) => store.dispatch('updateCity', e.target.value);

const searchWarning = computed(() => {
    return { 'search-warning': !weatherInfo.value && !loading.value };
});

const getWeather = () => store.dispatch('getWeather');
getWeather();
</script>

<style lang="sass" scoped>
@import './assets/styles/main.sass'
.page
  position: relative
  display: flex
  justify-content: center
  align-items: center
  min-height: 100vh
  padding: 20px 0
  background-color: #59585d

.laptop
  width: 100%
  padding: 20px
  background-color: #0e100f
  border-radius: 25px
  position: relative
  display: flex
  flex-direction: column
  align-items: center
  justify-content: center

.sections
  display: flex
  width: 100%

  @media (max-width: 767px)
    flex-direction: column

.section-left
  width: 30%
  padding-right: 10px

  @media (max-width: 767px)
    width: 100%
    padding-right: 0

.section-right
  width: 70%
  padding-left: 10px

  @media (max-width: 767px)
    width: 100%
    margin-top: 16px
    padding-left: 0

.city-inner
  position: relative
  display: inline-block
  width: 100%

  &::after
    content: ''
    position: absolute
    top: 0
    right: 10px
    width: 25px
    height: 25px
    background: url('./assets/img/search.svg') no-repeat 50% 50%
    background-size: contain
    transform: translateY(50%)
    cursor: pointer

.info
  height: 100%
  padding: 16px
  background: url('./assets/img/gradient-1.jpg') no-repeat 50% 50%
  background-size: cover
  border-radius: 25px

.search
  width: 100%
  padding: 16px
  font-family: 'Inter', Arial, sans-serif
  color: $white
  background-color: rgba(0, 0, 0, 0.75)
  border-radius: 16px
  border: none
  outline: none
  cursor: pointer

  &-warning
    border: 1px solid red

.section-bottom
  width: 50%
  margin-top: 16px

  @media (max-width: 767px)
    width: 100%
</style>
