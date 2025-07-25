import { defineStore } from "pinia";

export const useUiStore = defineStore("ui", {
    state: () => ({
        hideConfigButton: false,
        isPinned: true,
        showConfig: false,
        sidebarType: "bg-gradient-dark",
        isRTL: false,
        color: "success",
        isNavFixed: false,
        isAbsolute: false,
        showNavs: true,
        showSidenav: true,
        showNavbar: true,
        showFooter: true,
        showMain: true,
        isDarkMode: false,
        navbarFixed: "position-sticky blur shadow-blur left-auto top-1 z-index-sticky px-0 mx-4",
        absolute: "position-absolute px-4 mx-0 w-100 z-index-2",
    }),

    actions: {
        toggleConfigurator() {
            this.showConfig = !this.showConfig;
        },

        navbarMinimize() {
            const sidenav_show = document.querySelector(".g-sidenav-show");

            if (!sidenav_show) return;

            if (sidenav_show.classList.contains("g-sidenav-pinned")) {
                sidenav_show.classList.remove("g-sidenav-pinned");
                this.isPinned = true;

            } else {
                sidenav_show.classList.add("g-sidenav-pinned");
                this.isPinned = false;
            }
        },

        navbarFixedToggle() {
            this.isNavFixed = !this.isNavFixed;
        },

        toggleEveryDisplay() {
            this.showNavbar = !this.showNavbar;
            this.showSidenav = !this.showSidenav;
            this.showFooter = !this.showFooter;
        },

        toggleHideConfig() {
            this.hideConfigButton = !this.hideConfigButton;
        },

        setColor(payload: string) {
            this.color = payload;
        },
    },
});
