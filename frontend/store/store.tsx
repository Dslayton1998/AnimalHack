import { create } from 'zustand';

type Store = {
    bears: number,
    inc: () => void
}

const useStore = create<Store>()(set => ({
    bears: 0,
    inc: () => set((state) => ({bears: state.bears + 1}))
}))

function Counter() {
    const { bears, inc } = useStore()
    return (
        <div>
            <span>{bears}</span>
            <button onClick={inc}>one up</button>
        </div>
    )
}