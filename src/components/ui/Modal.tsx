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
                <Dialog open={isOpen} as="div" className="relative z-50" onClose={close}>
                    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="w-full max-w-lg"
                        >
                            <DialogPanel className="w-full max-h-[90vh] overflow-y-auto rounded-xl bg-white p-6 shadow-xl">
                                {title && (
                                    <DialogTitle as="h3" className="text-lg font-semibold leading-6 text-gray-900 mb-4">
                                        {title}
                                    </DialogTitle>
                                )}
                                <div className="space-y-4">{children}</div>
                            </DialogPanel>
                        </motion.div>
                    </div>
                </Dialog>
            )}
        </AnimatePresence>
    );
};

export default Modal;