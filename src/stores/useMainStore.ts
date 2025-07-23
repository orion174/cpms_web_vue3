import { defineStore } from 'pinia'

export const useMainStore = defineStore('main', {
    state: () => ({
        count: 0,
        isDarkMode: false,
    }),
    actions: {
        increment() {
            this.count++
        },
        toggleDarkMode() {
            this.isDarkMode = !this.isDarkMode
        },
    },
})
