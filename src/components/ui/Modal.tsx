import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { ReactNode } from 'react';

interface IProps {
    isOpen: boolean;
    close: () => void;
    title?: string;
    children: ReactNode ;
}

const Modal = ({isOpen, close, title, children}: IProps) => {

    return (
        <>
            {/* <Button
                onClick={open}
                className="rounded-md bg-indigo-500 py-2 px-4 text-sm font-medium text-white cursor-pointer"
            >
                Open dialog
            </Button> */}

            <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={close}>
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <DialogPanel
                        transition
                        className="w-full max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
                        >
                        {title && <DialogTitle as="h3" className="text-base/7 font-medium">
                            {title}
                        </DialogTitle>}
                        
                        <div className="mt-4">
                            {children}
                        </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </>
    )
}

export default Modal;