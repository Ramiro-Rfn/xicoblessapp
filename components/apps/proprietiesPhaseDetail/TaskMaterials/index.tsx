import { revalidateData } from "@/app/action/revalidateData";
import IconTrashLines from "@/components/icon/icon-trash-lines";
import { api } from "@/services/axios";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import Swal from "sweetalert2";
import ComponentsTaskMaterial from "../../taskMaterials/components-taskMaterial";
import { CreateTaskMaterialModal } from "../../taskMaterials/createTaskMaterialModal";
import { EditTaskModal } from "../EditTaskModal";


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

interface TaskMaterialsProps {
    task: Task
}

export function TaskMaterials({ task }: TaskMaterialsProps) {
    const [taskMaterials, setTaskMaterials] = useState<[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const fetchTaskMaterials = async () => {
        setIsLoading(true);
        const response = await api.get(`/taskmaterials/all/${task.id}`);

        setTaskMaterials(response.data);
        setIsLoading(false);
    }

    useEffect(() => {
        setIsOpen(false)

        fetchTaskMaterials();
    }, []);

    function handleViewTaskMaterials() {
        setIsOpen((prev) => !prev);
    }

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

    function handleLoadMaterials() {
        fetchTaskMaterials()
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
        <div className="flex flex-col panel p-0 ">
            <div key={task.id} className="grid grid-cols-6 py-2 px-4 bg-gray-200 border-b items-center">
                <div className="whitespace-nowrap">{task.name}</div>
                <div className="whitespace-nowrap">{format(new Date(task.startDate), "dd/MM/yyyy") }</div>
                <div className="whitespace-nowrap">{format(new Date(task.endDate), "dd/MM/yyyy") }</div>
                <div className="whitespace-nowrap">{task.assignedTo}</div>

                <div className={"whitespace-nowrap capitalize"} >
                    <span className={`badge badge-outline-primary ${begdeColorStatus(task.status)}`}>{begdeStatus(task.status)}</span>
                </div>
                <div className='flex justify-end'>


                    <EditTaskModal task={task} />
                    <button type="button" onClick={() => deleteTask(task.id, task.executionPhaseId)}>
                        <IconTrashLines className="shrink-0 ltr:mr-2 rtl:ml-2" />
                    </button>
                </div>
            </div>

            <div className="flex bg-gray-100 font-bold px-4 py-2 flex-wrap items-center justify-between">
               <h3 className="text-base">Lista de Materiais</h3>

               <div className="flex items-center gap-2">
                    <CreateTaskMaterialModal taskId={task.id} loadMaterials={handleLoadMaterials} />

                    <button type="button" onClick={handleViewTaskMaterials}>
                        {isOpen ? (
                            // @ts-ignore
                            <FiChevronUp className="h-4.5 w-4.5 shrink-0 ltr:mr-2 rtl:ml-2" />
                        ) : (
                            // @ts-ignore
                            <FiChevronDown className="h-4.5 w-4.5 shrink-0 ltr:mr-2 rtl:ml-2" />
                        )}
                    </button>

               </div>
            </div>

            <div className="transition-all duration-300 overflow-hidden">
                {isOpen && (
                    <div className="transition-all duration-300 overflow-hidden">
                        <ComponentsTaskMaterial taskMaterials={taskMaterials} taskId={task.id} />
                    </div>
                )}
            </div>
        </div>
    )
}