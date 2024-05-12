interface IAuth {
  username: string;
  password: string;
  auth: boolean;
}

export const useAuthStore = defineStore('auth', {
    state: () => ({
      isAuthenticated: false,
    }),
    actions: {
      login() {
        this.isAuthenticated = true;
      },
      logout() {
        this.isAuthenticated = false;
      },
    },
  });