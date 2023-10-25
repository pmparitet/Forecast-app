import { createStore } from 'vuex';
import { API_KEY, BASE_URL } from '../constants';

const store = {
    state: {
        loading: true,
        city: 'Москва',
        weatherInfo: null,
    },
    getters: {
        loading: (state) => state.loading,
        city: (state) => state.city,
        weatherInfo: (state) => state.weatherInfo,
    },
    mutations: {
        updateCity(state, payload) {
            state.city = payload;
        },
        changeLoading(state, payload) {
            state.loading = payload;
        },
        addWeatherInfo(state, payload) {
            state.weatherInfo = payload;
        },
    },
    actions: {
        updateCity({ commit }, payload) {
            commit('updateCity', payload);
        },
        async getWeather({ commit, state }) {
            commit('changeLoading', true);
            await fetch(`${BASE_URL}?q=${state.city}&units=metric&appid=${API_KEY}`)
                .then((res) => res.json())
                .then((data) => {
                    if (data?.weather) {
                        commit('addWeatherInfo', data);
                        localStorage.setItem('weatherCity', state.city);
                    } else if (data?.cod) {
                        commit('addWeatherInfo', null);
                    }
                    commit('changeLoading', false);
                })
                .catch((err) => {
                    console.log(err);
                    commit('addWeatherInfo', null);
                    commit('changeLoading', false);
                });
        },
    },
    strict: process.env.NODE_ENV !== 'production',
};

export default createStore(store);
