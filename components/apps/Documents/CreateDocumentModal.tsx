'use client'

import IconPlus from "@/components/icon/icon-plus";
import IconX from "@/components/icon/icon-x";
import { Dialog, Transition, } from "@headlessui/react";
import { Fragment, useState } from "react";
import { CreateDocumentForm } from "./createDocumentform";

interface CreateDocumentModalProps {
    projectId: string
}

export function CreateDocumentModal({ projectId }: CreateDocumentModalProps) {
    const [addDocumentModal, setAddDocumentModal] = useState<any>(false);

    function handleAddDocument(){
        setAddDocumentModal(true)
    }

    function handleCloseModal() {
        setAddDocumentModal(false)
    }

    return (
        <div>
            <div className="flex flex-wrap items-center justify-between gap-4">
                <button type="button" className="p-1 rounded-md flex items-center justify-center bg-blue-500 text-white" onClick={handleAddDocument}>
                    <IconPlus className="" />
                </button>
            </div>
            <Transition appear show={addDocumentModal} as={Fragment}>
                <Dialog as="div" open={addDocumentModal} onClose={() => setAddDocumentModal(false)} className="relative z-50">
                    <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                        <div className="fixed inset-0 bg-[black]/60" />
                    </Transition.Child>
                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center px-4 py-8">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="panel w-full max-w-lg overflow-hidden rounded-lg border-0 p-0 text-black dark:text-white-dark">
                                    <button
                                        type="button"
                                        onClick={() => setAddDocumentModal(false)}
                                        className="absolute top-4 text-gray-400 outline-none hover:text-gray-800 ltr:right-4 rtl:left-4 dark:hover:text-gray-600"
                                    >
                                        <IconX />
                                    </button>
                                    <div className="bg-[#fbfbfb] py-3 text-lg font-medium ltr:pl-5 ltr:pr-[50px] rtl:pl-[50px] rtl:pr-5 dark:bg-[#121c2c]">
                                        Adicionar Documento
                                    </div>
                                    <div className="p-5">
                                        <CreateDocumentForm projectId={projectId} closeModal={handleCloseModal} />
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div>
    )
}
