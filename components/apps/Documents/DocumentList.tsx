'use client';

import { revalidateData } from '@/app/action/revalidateData';
import IconEye from '@/components/icon/icon-eye';
import IconTrashLines from '@/components/icon/icon-trash-lines';
import { api } from '@/services/axios';
import Image from 'next/image';
import Link from 'next/link';
import Swal from 'sweetalert2';

type Document = {
    id: string;
    name: string;
    keyName: string;
    size: number;
    contentType: string;
    projectId: string;
    category: string;
    url: string;
    taskId: string | null;
    createdAt: string;
    updatedAt: string;
}

interface DocumentListProps {
    documents: Document[];
    projectId: string;
}

export function DocumentList({ documents, projectId }: DocumentListProps) {
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

    const getTypeBadge = (type: string) => {
        switch (type) {
            case 'CONTRACT':
                return 'badge-outline-primary';
            case 'PLAN':
                return 'badge-outline-info';
            case 'REPORT':
                return 'badge-outline-warning';
            default:
                return 'badge-outline-secondary';
        }
    };

    const getTypeLabel = (type: string) => {
        switch (type) {
            case 'CONTRACT':
                return 'Contrato';
            case 'PLAN':
                return 'Planta';
            case 'REPORT':
                return 'Relatório';
            default:
                return 'Outro';
        }
    };

    async function handleDeleteDocument(documentId: string) {
        try {
            await api.delete(`/document/delete/${documentId}`);
            showMessage('Documento apagado com sucesso!');
            revalidateData(`propriedades/${projectId}`);
        } catch (error) {
            showMessage('Erro ao apagar documento!', 'error');
            console.log(error);
        }
    }

    return (
        <div className="space-y-4">
            {documents.length === 0 ? (
                <div className="text-center py-4 text-gray-500">
                    Nenhum documento encontrado
                </div>
            ) : (


                <div className="grid grid-cols-1 gap-4">
                    {documents.map((document) => (

                        <div key={document.id} className="flex items-center justify-between p-4 bg-white dark:bg-[#1c232f] rounded-md shadow">
                            <div className="flex items-center gap-4">
                                <div>
                                    {/* add pdf icon */}
                                    <Image src="/assets/icon/pdfIcon.png" alt="pdf" width={40} height={40} />
                                </div>
                                <div className="flex flex-col items-start">
                                    <h3 className="text-base font-semibold">{document.name}</h3>
                                    <p className="text-sm text-gray-500">{document.category}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Link
                                    href={document.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className=""
                                >
                                    <IconEye className="h-4 w-4" />
                                </Link>
                                <button
                                    type="button"
                                    onClick={() => handleDeleteDocument(document.id)}
                                    className=""
                                >
                                    <IconTrashLines className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
