interface IUser {
  username: string;
}

interface IAuth {
  isAuthenticated: boolean;
  token?: string | undefined;
  user: IUser | null;
}

export const useAuthStore = defineStore("auth", {
  state: (): IAuth => ({
    isAuthenticated: false,
    token: undefined,
    user: null,
  }),

  actions: {
    login(token: string, user: IUser) {
      this.isAuthenticated = true;
      this.token = token;
      this.user = user;
      localStorage.setItem("token", token);
      localStorage.setItem("username", user.username);
    },
    getStoredUsername() {
      return localStorage.getItem("username") || "";
    },

    logout() {
      this.isAuthenticated = false;
      this.token = undefined;
      this.user = null;
      localStorage.removeItem("token");
      localStorage.removeItem("username");
    },

    getToken() {
      return this.token;
    },
  },
});
