'use client';

import { revalidateData } from '@/app/action/revalidateData';
import IconPencilPaper from '@/components/icon/icon-pencil-paper';
import { api } from '@/services/axios';
import ProgressBar from '@ramonak/react-progress-bar';
import { format } from 'date-fns';
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
    project: {
        name: string
    }
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
            <div className="flex flex-col gap-4">
                <div className="rounded-md bg-white shadow p-6 flex flex-col md:flex-row gap-8 dark:bg-[#1c232f]">
                  <div className="w-full flex flex-col">
                    <div className=''>
                       <h2 className='text-2xl font-bold'>Etapa:{phase.name}</h2>
                    </div>
                    <div className='gap-2 flex items-center'>
                      <p className="flex text-gray-500 gap-2">
                        Projecto:
                      </p>
                      <h4 className="flex font-bold">
                        {phase.project.name}
                      </h4>
                    </div>
                  </div>
                  <div className="">
                        <button className='btn btn-outline-secondary'>
                            <IconPencilPaper className="h-4.5 w-4.5 shrink-0 ltr:mr-2 rtl:ml-2" />
                            Editar
                        </button>
                  </div>
                </div>

                <div className="rounded-md bg-white shadow p-6 flex flex-col gap-2 dark:bg-[#1c232f]">

                  <div className="flex justify-between gap-4 items-center">
                    <div className="flex flex-col">
                        <div className=''>
                            <h3 className='text-xl font-bold'>Progresso Geral</h3>
                        </div>
                        <div className='gap-2 flex items-center'>
                            <p className="flex text-gray-500 gap-2">
                                Tempo Estimado:
                            </p>
                            <h4 className="flex">
                                {format(new Date(phase.startDate), "dd/MM/yyyy")} - {format(new Date(phase.endDate), "dd/MM/yyyy")}
                            </h4>
                        </div>
                    </div>
                    <div className="bg-secondary text-white flex items-center text-xs justify-center px-2 py-1 rounded-full">
                        60% Concluído
                    </div>
                  </div>
                  <ProgressBar completed={60} className='h-2' height='8px' labelAlignment="outside" />
                </div>


            </div>





            <div className="flex items-end justify-between gap-4 mt-10">
                <h2 className="text-2xl font-bold">Tarefas</h2>

                <CreatePhaseModal  phaseId={phase.id}  />
            </div>

            <div className=" mt-5 border-0 p-0">
            {/* <ComponentsDatatablesBasic /> */}
                    <div className="">
                        <div className=" table-hover">

                            <div className='space-y-4'>
                                {tasks.length === 0 && (
                                    <div className="flex justify-center bg-white rounded-md p-4 shadow-sm items-center w-full col-span-6">
                                        Nenhuma tarefa encontrada
                                    </div>
                                )}
                                {tasks.map((task) => {
                                    return (
                                        <TaskMaterials key={task.id} task={task} />
                                    );
                                })}
                            </div>
                        </div>
                    </div>
            </div>

            <div className='flex flex-col rounded-md mt-8 flex-1 bg-white shadow p-6 gap-8 dark:bg-[#1c232f]'>
                <h2 className="text-2xl font-bold">Equipe do Projeto</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    {/* Membro 1 */}
                    <div className="flex flex-col items-center bg-gray-50 rounded-md p-4 shadow-sm">
                        {/* Substitua pelo seu ícone */}
                        <span className="mb-2">
                            <svg width="48" height="48" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4" stroke="#222" strokeWidth="1.5"/><path d="M4 20c0-2.21 3.582-4 8-4s8 1.79 8 4" stroke="#222" strokeWidth="1.5"/></svg>
                        </span>
                        <h4 className="font-bold">João Silva</h4>
                        <span className="text-xs text-gray-500">Engenheiro Responsável</span>
                        <span className="text-[11px] text-gray-400">Salário: R$ 12.000,00</span>
                    </div>
                    {/* Membro 2 */}
                    <div className="flex flex-col items-center bg-gray-50 rounded-md p-4 shadow-sm">
                        <span className="mb-2">
                            <svg width="48" height="48" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4" stroke="#222" strokeWidth="1.5"/><path d="M4 20c0-2.21 3.582-4 8-4s8 1.79 8 4" stroke="#222" strokeWidth="1.5"/></svg>
                        </span>
                        <h4 className="font-bold">Maria Santos</h4>
                        <span className="text-xs text-gray-500">Arquiteta</span>
                        <span className="text-[11px] text-gray-400">Salário: R$ 10.000,00</span>
                    </div>
                    {/* Membro 3 */}
                    <div className="flex flex-col items-center bg-gray-50 rounded-md p-4 shadow-sm">
                        <span className="mb-2">
                            <svg width="48" height="48" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4" stroke="#222" strokeWidth="1.5"/><path d="M4 20c0-2.21 3.582-4 8-4s8 1.79 8 4" stroke="#222" strokeWidth="1.5"/></svg>
                        </span>
                        <h4 className="font-bold">Pedro Costa</h4>
                        <span className="text-xs text-gray-500">Mestre de Obras</span>
                        <span className="text-[11px] text-gray-400">Salário: R$ 8.000,00</span>
                    </div>
                    {/* Membro 4 */}
                    <div className="flex flex-col items-center bg-gray-50 rounded-md p-4 shadow-sm">
                        <span className="mb-2">
                            <svg width="48" height="48" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4" stroke="#222" strokeWidth="1.5"/><path d="M4 20c0-2.21 3.582-4 8-4s8 1.79 8 4" stroke="#222" strokeWidth="1.5"/></svg>
                        </span>
                        <h4 className="font-bold">Ana Oliveira</h4>
                        <span className="text-xs text-gray-500">Gestora de Projetos</span>
                        <span className="text-[11px] text-gray-400">Salário: R$ 11.000,00</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ComponentsProprietiesDetail;
