import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { loginUser, registerUser } from '../services/authService'

const useAuthStore = create()(
    persist(
        (set) => ({
            user: null,
            token: null,
            isAuthenticated: false,
            loading: false,
            error: null,

            setUser: (user) => {
                set({
                    user: user
                })
            },

            register: async (userData) => {
                try {
                    set({
                        loading: true,
                        error: null
                    })

                    const data = await registerUser(userData)

                    set({
                        loading: false
                    })

                    return data

                } catch (error) {
                    set({
                        error: error.message,
                        loading: false
                    })

                    throw error
                }
            },

            login: async (credentials) => {
                try {
                    set({
                        loading: true,
                        error: null
                    })

                    const data = await loginUser(credentials)

                    set({
                        user: data.user,
                        token: data.token,
                        isAuthenticated: true,
                        loading: false
                    })

                    return data

                } catch (error) {
                    set({
                        error: error.message,
                        loading: false
                    })

                    throw error
                }
            },

            logout: () => {
                set({
                    user: null,
                    token: null,
                    isAuthenticated: false,
                    error: null
                })
            }
        }),

        {
            name: 'secureshare-auth',

            partialize: (state) => ({
                user: state.user,
                token: state.token,
                isAuthenticated: state.isAuthenticated
            })
        }
    )
)

export default useAuthStore