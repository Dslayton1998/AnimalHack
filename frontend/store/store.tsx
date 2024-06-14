import { create } from 'zustand';

interface Bear {
    test: string
}

type Store = {
    bears: Bear,
    fetch: () => void
}


export const useStore = create<Store>()(set => ({
    bears: {test: "test"},
    
    fetch: async () => {
        const res = await fetch("http://localhost:8000/polls/1")
        set({ bears: await res.json()})
    }
}))