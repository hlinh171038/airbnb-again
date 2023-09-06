import { create } from 'zustand'

interface SearchStore {
    isOpen: boolean;
    onClose: () => void;
    onOpen: () => void;
}

const useSearchModal = create<SearchStore>((set) => ({
    isOpen:false,
    onClose:() =>set({isOpen : false}),
    onOpen: ()=> set({isOpen: true})
}));

export default useSearchModal;