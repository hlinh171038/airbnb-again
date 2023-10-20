import { create } from 'zustand'

interface CommentStore {
    isOpen: boolean;
    onOpen: ()=> void;
    onClose: ()=> void;
}

const useComment = create<CommentStore>((set) => ({
    isOpen: false,
    onOpen:() =>set({isOpen: true}),
    onClose:() =>set({isOpen: false})
}));

export default useComment