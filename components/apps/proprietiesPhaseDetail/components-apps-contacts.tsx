'use client';

import { revalidateData } from '@/app/action/revalidateData';
import { api } from '@/services/axios';
import { format } from 'date-fns';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Swal from 'sweetalert2';
import { CreatePhaseModal } from './CreateTaskModal';
import { TaskMaterials } from './TaskMaterials';

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

    function begdeStatus(status: string) {
        if (status === 'pending') {
            return 'Pendente'
        }
        if (status === 'in_progress') {
            return 'Em andamento'
        }
        if (status === 'completed') {
            return 'Concluído'
        }
    }


    function begdeColorStatus(status: string) {
        if (status === 'pending') {
            return 'bg-yellow-500'
        }
        if (status === 'in_progress') {
            return 'bg-blue-500'
        }
        if (status === 'completed') {
            return 'bg-green-500'
        }
    }

    return (
        <div>
            <div className="flex gap-8">

                <div className="rounded-md bg-white shadow p-6 flex flex-col md:flex-row gap-8 dark:bg-[#1c232f]">
                  <div className="flex flex-col items-center justify-center">
                    <div className='w-20'>
                        <CircularProgressbar value={79} text={`${79}%`} styles={{
                            path: { stroke: '#2563eb' },
                            text: { fill: '#2563eb', fontSize: '22px', fontWeight: 700 }
                        }}/>
                    </div>
                    <span className="mt-2 text-sm text-gray-500">Progresso</span>
                  </div>
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className='gap-2'>
                      <p className="flex text-gray-500 gap-2">
                        Tempo Estimado:
                      </p>
                      <h4 className="flex text-lg font-bold">
                        {format(new Date(phase.startDate), "dd/MM/yyyy")} - {format(new Date(phase.endDate), "dd/MM/yyyy")}
                      </h4>
                    </div>
                    <div className='flex flex-col gap-2'>
                      <p className="text-gray-500 flex items-center gap-2">
                        Tempo real:
                      </p>
                      <h4 className="flex text-lg font-bold">-</h4>
                    </div>
                    <div>
                      <p className="flex text-gray-500 gap-2">
                        Custo Estimado:
                      </p>
                      <h4 className="flex text-2xl font-bold">
                        {Intl.NumberFormat('pt', { currency: 'AOA' }).format(phase.estimatedCost)} kz
                      </h4>
                    </div>
                    <div>
                      <p className="flex text-gray-500 gap-2">
                        Custo real:
                      </p>
                      <h4 className="flex text-2xl font-bold">0</h4>
                    </div>
                  </div>
                </div>

                <div className='flex flex-col rounded-md flex-1 bg-white shadow p-6 gap-8 dark:bg-[#1c232f]'>
                    <h2 className="text-xl">Equeipe</h2>
                    <div className='flex flex-col gap-2'>
                        <div className='flex flex-col gap-2'>
                            <p className='text-gray-500'>Nome</p>
                            <h4 className='text-lg font-bold'>-</h4>
                        </div>
                    </div>
                </div>
            </div>


            <div className="flex flex-wrap items-center justify-between gap-4 mt-10">
                <h2 className="text-xl">Tarefas</h2>

                <CreatePhaseModal  phaseId={phase.id}  />
            </div>

            <div className=" mt-5 border-0 p-0">
            {/* <ComponentsDatatablesBasic /> */}
                    <div className="">
                        <div className=" table-hover">
                            <div className='w-full'>
                                <div className='grid grid-cols-6'>
                                    <div className='bg-gray-300 p-2 dark:bg-[#1c232f]'>Nome</div>
                                    <div className='bg-gray-300 p-2 dark:bg-[#1c232f]'>Data início</div>
                                    <div className='bg-gray-300 p-2 dark:bg-[#1c232f]'>Data início</div>
                                    <div className='bg-gray-300 p-2 dark:bg-[#1c232f]'>Responsável</div>
                                    <div className='bg-gray-300 p-2 dark:bg-[#1c232f]'>Status</div>
                                    <div className="!text-center bg-gray-300 p-2 dark:bg-[#1c232f]">Acções</div>
                                </div>
                            </div>
                            <div className='space-y-4'>
                                {tasks.map((task) => {
                                    return (
                                        <TaskMaterials key={task.id} task={task} />
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    );
};

export default ComponentsProprietiesDetail;
