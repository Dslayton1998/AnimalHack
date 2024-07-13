import { create } from 'zustand';
import { API_URL } from "@env"

interface Bear {
    test: string
}

type Store = {
    bears: Bear,
    fetch: () => void,
    signUp: (props: object) => any
}


export const useStore = create<Store>()(set => ({
    bears: {test: "Settings"},
    
    fetch: async () => {
        const res = await fetch("/polls/1")
        set({ bears: await res.json()})
    },

    signUp: async (props: object) => {
        console.log('hit', props)
        let res = await fetch(`${API_URL}/users/registration/`, 
    {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(props)
    })

    const data = await res.json()
    console.log('test', res,  data)
    return data
}
}))