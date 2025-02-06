import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { ReactNode, useEffect } from 'react';

interface IProps {
    isOpen: boolean;
    close: () => void;
    title?: string;
    children: ReactNode;
}

const Modal = ({ isOpen, close, title, children }: IProps) => {
    
    useEffect(() => {
        if (isOpen) {
            document.body.classList.add("overflow-hidden");
        } else {
            document.body.classList.remove("overflow-hidden");
        }
        return () => document.body.classList.remove("overflow-hidden");
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <Dialog open={isOpen} as="div" className="relative z-50 focus:outline-none" onClose={close}>
                    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
                    <div className="fixed inset-0 z-50 w-screen flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                        >
                            <DialogPanel className="custom-width w-[400px] lg:w-[450px] rounded-xl bg-white shadow-lg p-6">
                                {title && (
                                    <DialogTitle as="h3" className="text-lg font-semibold text-gray-800">
                                        {title}
                                    </DialogTitle>
                                )}
                                <div className="my-4">{children}</div>
                            </DialogPanel>
                        </motion.div>
                    </div>
                </Dialog>
            )}
        </AnimatePresence>
    );
};

export default Modal;