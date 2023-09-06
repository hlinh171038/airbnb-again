import { create } from 'zustand'

interface FilterStore {
    isOpen: boolean;
    onClose: () => void;
    onOpen: () => void;
}

const useFilter = create<FilterStore>((set) => ({
    isOpen:false,
    onClose:() =>set({isOpen : false}),
    onOpen: ()=> set({isOpen: true})
}));

export default useFilter;