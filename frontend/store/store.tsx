import { create } from 'zustand';

interface Bear {
    test: string
}

type Store = {
    bears: Bear,
    fetch: () => void,
    signUp: (props: object) => any,
    login: (props: object) => any,
}


export const useStore = create<Store>()(set => ({
    bears: {test: "Settings"},
    
    fetch: async () => {
        const res = await fetch("/polls/1")
        set({ bears: await res.json()})
    },

    signUp: async (props: object) => {
        let res = await fetch(`${process.env.API_URL}/users/registration/`, {
        method: "POST",
        headers: {"multipart": "form-data"},
        body: JSON.stringify(props)
    })

        const data = await res.json()
        return data
    },

    login: async (props: object) => {
        let res = await fetch(`${process.env.API_URL}/users/login/`, {
            method: "POST",
            headers: {"multipart": "form-data"},
            body: JSON.stringify(props)
        })
        // ^ Might need a refactor!
// todo: Testing
        const data = await res.json()
        return data
    },

}))