import { create } from 'zustand'


interface BookStore {
    isOpen: boolean;
    onClose: () => void;
    onOpen: () => void;
}

const useBook = create<BookStore>((set) => ({
    isOpen:false,
    onClose:() =>set({isOpen : false}),
    onOpen: ()=> set({isOpen: true})
}));

export default useBook;