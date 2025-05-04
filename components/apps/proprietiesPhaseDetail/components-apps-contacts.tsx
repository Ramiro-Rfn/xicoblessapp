'use client';

import { revalidateData } from '@/app/action/revalidateData';
import IconArrowForward from '@/components/icon/icon-arrow-forward';
import IconTrashLines from '@/components/icon/icon-trash-lines';
import { api } from '@/services/axios';
import { format } from 'date-fns';
import Link from 'next/link';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Swal from 'sweetalert2';
import { CreatePhaseModal } from './CreateTaskModal';
import { EditTaskModal } from './EditTaskModal';

type Phase = {
    id: string
    name: string
    sequenceOrder: number
    startDate: Date
    endDate: Date
    status: string
    estimatedCost: number
}


type Task = {
    id: string
    name: string
    assignedTo: string
    startDate: Date
    endDate: Date
    executionPhaseId: string
    progress: number,
    status: string
}

interface PhaseDetailProps {
    phase: Phase
    tasks: Task[]
}

const ComponentsProprietiesDetail = ({ phase, tasks }: PhaseDetailProps) => {

    const showMessage = (msg = '', type = 'success') => {
        const toast: any = Swal.mixin({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 3000,
            customClass: { container: 'toast' },
        });
        toast.fire({
            icon: type,
            title: msg,
            padding: '10px 20px',
        });
    };

    async function deleteTask(taskId: string, executionPhaseId: string) {
        try {
            await api.delete(`task/delete/${taskId}`)

            showMessage('Tarefa Apagada')

            revalidateData(`propriedades/etapas/${executionPhaseId}`)
        } catch (error) {
            showMessage('Erro ao apagar tarefa')

            console.log(error)
        }
    }

    return (
        <div>
            <div className=" overflow-hidden rounded-md bg-white text-center shadow dark:bg-[#1c232f]">

                <div className="flex overflow-hidden rounded-md bg-white text-center shadow dark:bg-[#1c232f]">
                    <div className="relative px-6 py-6">
                        <div className="flex mb-4 items-center">
                            <div className="truncate text-3xl font-bold text-black">Fundação</div>
                        </div>

                        <div className='flex gap-8'>
                            <div className="flex items-center">
                                <div className="w-32">
                                    <CircularProgressbar value={79} text={`${79}%`} />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4 ltr:text-left rtl:text-right">
                                <div className="flex flex-col justify-center">
                                    <p className="flex-none text-lg ltr:mr-2 rtl:ml-2">Tempo Estimado:</p>
                                    <h4 className="text-dark text-lg font-bold">
                                        {format(new Date(phase.startDate), "dd/MM/yyyy") } - {format(new Date(phase.startDate), "dd/MM/yyyy") }
                                    </h4>
                                </div>
                                <div className="flex flex-col justify-center">
                                    <p className="flex-none text-lg ltr:mr-2 rtl:ml-2">Tempo real:</p>
                                    <h4 className="text-dark text-lg font-bold"> - </h4>
                                </div>
                                <div className="flex flex-col justify-center">
                                    <p className="flex-none text-lg ltr:mr-2 rtl:ml-2">Custo Estimado:</p>
                                    <h4 className="text-dark text-3xl font-bold">
                                    {Intl.NumberFormat('pt', {
                                                currency: 'AOA'
                                    }).format(phase.estimatedCost) } kz
                                    </h4>
                                </div>

                                <div className="flex flex-col justify-center">
                                    <p className="flex-none text-lg ltr:mr-2 rtl:ml-2">Custo real:</p>
                                    <h4 className="text-dark text-3xl font-bold">0</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className="flex flex-wrap items-center justify-between gap-4 mt-10">
                <h2 className="text-xl">Tarefas</h2>

                <CreatePhaseModal  phaseId={phase.id}  />
            </div>

            <div className="panel mt-5 overflow-hidden border-0 p-0">
            {/* <ComponentsDatatablesBasic /> */}
                    <div className="table-responsive">
                        <table className="table-striped table-hover">
                            <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th>Data início</th>
                                    <th>Data início</th>
                                    <th>Responsável</th>
                                    <th>Progresso</th>
                                    <th>Status</th>
                                    <th className="!text-center">Acções</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tasks.map((task) => {
                                    return (
                                        <tr key={task.id}>
                                            <td>{task.name}</td>
                                            <td className="whitespace-nowrap">{format(new Date(task.startDate), "dd/MM/yyyy") }</td>
                                            <td className="whitespace-nowrap">{format(new Date(task.endDate), "dd/MM/yyyy") }</td>
                                            <td className="whitespace-nowrap">{task.assignedTo}</td>
                                            <td className="whitespace-nowrap">
                                                <div className='w-8'>
                                                    <CircularProgressbar value={task.progress} text={`${task.progress}%`} />
                                                </div>
                                            </td>
                                            <td className={"whitespace-nowrap capitalize"} >
                                                <span className='badge badge-outline-primary'>{task.status}</span>
                                            </td>
                                            <td className='flex justify-end'>
                                                <Link href={`/propriedades/etapas/tarefa/${task.id}`}>
                                                    <button type="button" onClick={() => console.log()}>
                                                        <IconArrowForward className="h-4.5 w-4.5 shrink-0 ltr:mr-2 rtl:ml-2" />
                                                    </button>
                                                </Link>

                                                <EditTaskModal task={task} />
                                                <button type="button" onClick={() => deleteTask(task.id, task.executionPhaseId)}>
                                                    <IconTrashLines className="shrink-0 ltr:mr-2 rtl:ml-2" />
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
        </div>
    );
};

export default ComponentsProprietiesDetail;
