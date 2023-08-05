import { create } from 'zustand'

interface RentStore {
    isOpen: boolean;
    onClose: () => void;
    onOpen: () => void;
}

const useRentModal = create<RentStore>((set) => ({
    isOpen:false,
    onClose:() =>set({isOpen : false}),
    onOpen: ()=> set({isOpen: true})
}));

export default useRentModal;