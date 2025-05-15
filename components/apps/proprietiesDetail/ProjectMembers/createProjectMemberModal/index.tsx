'use client'

import IconPlus from "@/components/icon/icon-plus";
import IconX from "@/components/icon/icon-x";
import { Dialog, Transition, } from "@headlessui/react";
import { Fragment, useState } from "react";
import { CreateTaskMaterialForm } from "./createProjectMemberform";

interface CreateProjectMemberProps {
    projectId: string
    loadMembers: () => void
}

export function CreateProjectMemberModal({ projectId, loadMembers }: CreateProjectMemberProps) {
    const [addMemberModal, setAddMemberModal] = useState<any>(false);


    function handleAddMember(){
        setAddMemberModal(true)
    }

    function handleCloseModal() {
        setAddMemberModal(false)
    }

    return (
        <div>
            <div className="flex flex-wrap items-center justify-between gap-4">
                <button type="button" className="btn btn-primary" onClick={handleAddMember}>
                    <IconPlus className="" />
                    Adicionar Membro
                </button>
            </div>
            {/* @ts-ignore */}
            <Transition appear show={addMemberModal} as={Fragment}>
                {/* @ts-ignore */}
                <Dialog as="div" open={addMemberModal} onClose={() => setAddMemberModal(false)} className="relative z-50">
                    {/* @ts-ignore */}
                    <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                        <div className="fixed inset-0 bg-[black]/60" />
                    </Transition.Child>
                    {/* @ts-ignore */}
                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center px-4 py-8">
                            {/* @ts-ignore */}
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >

                                {/* @ts-ignore */}
                                <Dialog.Panel className="panel w-full max-w-lg overflow-hidden rounded-lg border-0 p-0 text-black dark:text-white-dark">
                                    <button
                                        type="button"
                                        onClick={() => setAddMemberModal(false)}
                                        className="absolute top-4 text-gray-400 outline-none hover:text-gray-800 ltr:right-4 rtl:left-4 dark:hover:text-gray-600"
                                    >
                                        <IconX />
                                    </button>
                                    <div className="bg-[#fbfbfb] py-3 text-lg font-medium ltr:pl-5 ltr:pr-[50px] rtl:pl-[50px] rtl:pr-5 dark:bg-[#121c2c]">
                                        Adicionar Membro
                                    </div>
                                    <div className="p-5">
                                        <CreateTaskMaterialForm projectId={projectId} closeModal={handleCloseModal} loadMembers={loadMembers} />
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