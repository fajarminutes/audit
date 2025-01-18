import React from 'react';
import { Link } from 'react-router-dom';
import { DataTable } from 'mantine-datatable';
import axios from 'axios';

// Define the state type  
interface KodeData {
    id: number;
    id_customer: number;
    nama_project: string;
    jabatan: string;
    kode_sjs: string;
    kode_by_project: string | null;
    penulisan_kode: string;
    user_invoice: string;
    nomor_handphone: string;
    email: string;
    user_retention: string;
    nomor_handphone_ret: string;
    email_ret: string;
}

interface State {
    kodeData: KodeData[];
    isLoading: boolean;
    isError: boolean;
    page: number;
    pageSize: number;
    search: string;
}

class SemuaMC extends React.Component<{}, State> {
    constructor(props: {}) {
        super(props);
        this.state = {
            kodeData: [],
            isLoading: true,
            isError: false,
            page: 1,
            pageSize: 10,
            search: '',
        };
    }

    componentDidMount() {
        this.fetchKodeData();
        document.title = 'Semua Master Code'; // Set page title  
    }

    fetchKodeData = () => {
        axios.get('https://audtrax.sinarjernihsuksesindo.id/backend/api/master_kodes')
            .then(response => {
                this.setState({ kodeData: response.data, isLoading: false });
            })
            .catch(error => {
                console.error('Error fetching master_kodes:', error);
                this.setState({ isError: true, isLoading: false });
            });
    };

    handlePageChange = (page: number) => {
        this.setState({ page });
    };

    handleRecordsPerPageChange = (pageSize: number) => {
        this.setState({ pageSize });
    };

    handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ search: event.target.value });
    };

    render() {
        const { kodeData, isLoading, isError, page, pageSize, search } = this.state;

        // Filter and Paginate Data  
        const filteredData = Array.isArray(kodeData) ? kodeData.filter(item =>
            Object.values(item).some(value =>
                String(value).toLowerCase().includes(search.toLowerCase())
            )
        ) : [];
        const paginatedData = filteredData.slice((page - 1) * pageSize, page * pageSize);

        return (
            <div>
                {/* Page Header */}
                <div className="mb-6 flex items-center justify-between">
                    <h1 className="text-xl font-bold">Master Kode Invoice</h1>
                    <Link to="/invoice/mastercode/tambahmastercode" className="btn btn-primary">
                        Add Master Kode Invoice
                    </Link>
                </div>

                {/* Search Input */}
                <input
                    type="text"
                    placeholder="Search..."
                    value={search}
                    onChange={this.handleSearchChange}
                    className="mb-4 p-2 border rounded"
                />

                {/* Data Table */}
                <div className="panel rounded-md shadow">
                    <div className="datatables">
                        {isLoading ? (
                            <p className="p-4 text-center">Loading...</p>
                        ) : isError ? (
                            <p className="p-4 text-center text-red-500">Error loading data.</p>
                        ) : (
                            <DataTable
                                withBorder
                                borderRadius="sm"
                                withColumnBorders
                                striped
                                highlightOnHover
                                className="table-auto w-full"
                                records={paginatedData.map((record, index) => ({
                                    ...record,
                                    no: (page - 1) * pageSize + index + 1,
                                    action: (
                                        <div className="flex gap-2">
                                            <Link to={`/invoice/mastercode/editmastercode/${record.id}`} className="btn btn-primary btn-sm">
                                                Edit
                                            </Link>
                                            <Link to={`/invoice/mastercode/detailmastercode/${record.id}`} className="btn btn-secondary btn-sm">
                                                Detail
                                            </Link>
                                        </div>
                                    ),
                                }))}
                                columns={[
                                    { accessor: 'no', title: 'No', width: 70 },
                                    { accessor: 'kode_sjs', title: 'Kode SJS' },
                                    { accessor: 'nama_project', title: 'Nama Project' },
                                    { accessor: 'jabatan', title: 'Jabatan', width: 300 },
                                    { accessor: 'penulisan_kode', title: 'Penulisan Kode' },
                                    { accessor: 'user_invoice', title: 'User Invoice' },
                                    { accessor: 'nomor_handphone', title: 'No. Handphone' },
                                    { accessor: 'email', title: 'Email' },
                                    { accessor: 'user_retention', title: 'User Retention' },
                                    { accessor: 'nomor_handphone_ret', title: 'No. Handphone Ret' },
                                    { accessor: 'email_ret', title: 'Email Ret' },
                                    { accessor: 'action', title: 'Action', width: 150 },
                                ]}
                                totalRecords={filteredData.length}
                                page={page}
                                onPageChange={this.handlePageChange}
                                recordsPerPage={pageSize}
                                onRecordsPerPageChange={this.handleRecordsPerPageChange}
                                recordsPerPageOptions={[10, 20, 30, 50, 100]}
                                noRecordsText="No data found."
                            />
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

export default SemuaMC;