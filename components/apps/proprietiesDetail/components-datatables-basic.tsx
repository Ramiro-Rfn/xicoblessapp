'use client';
import executionPhase from '@/database/execution_phase.json';
import { DataTable } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';

const rowData = executionPhase

const ComponentsDatatablesBasic = () => {
    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const initialRecords = rowData.slice(0, pageSize);
    const [recordsData, setRecordsData] = useState(initialRecords);

    useEffect(() => {
        setPage(1);
    }, [pageSize]);

    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        setRecordsData(rowData.slice(from, to));
    }, [page, pageSize]);

    const randomStatusColor = () => {
        const color = ['primary', 'secondary', 'success', 'danger', 'warning', 'info'];
        const random = Math.floor(Math.random() * color.length);
        return color[random];
    };


    return (
        <div className="panel mt-6">
            <h5 className="mb-5 text-lg font-semibold dark:text-white-light">Basic</h5>
            <div className="datatables">
                <DataTable
                    noRecordsText="No results match your search query"
                    highlightOnHover
                    className="table-hover whitespace-nowrap"
                    records={recordsData}
                    columns={[
                        { accessor: 'sequence_order', title: 'ID' },
                        { accessor: 'name', title: 'Nome' },
                        { accessor: 'start_date', title: 'Início' },
                        { accessor: 'end_date', title: 'Fim' },
                        { accessor: 'estimated_cost', title: "Custo estimado" },
                        {
                            accessor: 'progress',
                            title: "Custo estimado",
                            render: ({ progress }) => (
                                <div className="w-8">
                                    <CircularProgressbar value={progress} text={`${progress}%`} />
                                </div>
                            ),
                        },
                        {
                            accessor: 'status',
                            title: 'Status',
                            render: ({status}) => <span className={`badge badge-outline-${randomStatusColor()} `}>{status}</span>,
                        },
                    ]}
                    totalRecords={rowData.length}
                    recordsPerPage={pageSize}
                    page={page}
                    onPageChange={(p) => setPage(p)}
                    recordsPerPageOptions={PAGE_SIZES}
                    onRecordsPerPageChange={setPageSize}
                    minHeight={200}
                    paginationText={({ from, to, totalRecords }) => `Showing  ${from} to ${to} of ${totalRecords} entries`}
                />
            </div>
        </div>
    );
};

export default ComponentsDatatablesBasic;
