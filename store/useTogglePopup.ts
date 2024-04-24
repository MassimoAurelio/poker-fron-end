export const useTogglePopup = defineStore({
  id: "togglePopup",

  state: () => ({
    visible: false,
  }),
  actions: {
    togglePopup() {
      this.visible = !this.visible;
    },
  },
});
