interface IAuth {
  isAuthenticated: boolean;
  token?: string | undefined;
}

export const useAuthStore = defineStore("auth", {
  state: (): IAuth => ({
    isAuthenticated: false,
    token: undefined,
  }),

  actions: {
    login(token: string) {
      this.isAuthenticated = true;
      this.token = token;
      localStorage.setItem("token", token);
    },

    logout() {
      this.isAuthenticated = false;
      this.token = undefined;
      localStorage.removeItem("token");
    },

    getToken() {
      return this.token;
    },
  },
});