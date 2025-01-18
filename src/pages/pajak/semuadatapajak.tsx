import { DataTable } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../store';
import { setPageTitle } from '../../store/themeConfigSlice';
import axios from 'axios';

const SemuaDataPajak = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [recordsData, setRecordsData] = useState<any[]>([]);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [search, setSearch] = useState('');

    useEffect(() => {
        dispatch(setPageTitle('Semua Data Pajak'));
        fetchData();
    }, [dispatch]);

    const fetchData = async () => {
        try {
            const response = await axios.get('https://audtrax.sinarjernihsuksesindo.id/backend/api/pajak');
            setRecordsData(response.data);
        } catch (err) {
            setError('Failed to fetch data');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (window.confirm('Are you sure you want to delete this record?')) {
            try {
                await axios.delete(`https://audtrax.sinarjernihsuksesindo.id/backend/api/pajak/${id}`);
                fetchData(); // Refresh data after deletion  
            } catch (err) {
                console.error('Error deleting record:', err);
                alert('Failed to delete record.');
            }
        }
    };

    const filteredRecords = recordsData.filter((item) => {
        return (
            item.entity.toLowerCase().includes(search.toLowerCase()) ||
            item.customer?.toLowerCase().includes(search.toLowerCase()) ||
            item.pph21_invoice.toString().includes(search) ||
            item.pph21_aktual.toString().includes(search) ||
            item.selisih_pph21.toString().includes(search) ||
            item.pph23_invoice.toString().includes(search) ||
            item.pph23_aktual.toString().includes(search) ||
            item.selisih_pph23.toString().includes(search) ||
            item.ppn_invoice.toString().includes(search) ||
            item.ppn_aktual.toString().includes(search) ||
            item.selisih_ppn.toString().includes(search)
        );
    });

    const paginatedRecords = filteredRecords.slice((page - 1) * pageSize, page * pageSize);

    const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass === 'rtl');

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div className="text-red-500">{error}</div>;
    }

    return (
        <div>
            <div className="mb-4.5 px-5 flex md:items-center md:flex-row flex-col gap-5">
                <h1 className="flex items-center gap-2">Semua Data Pajak |</h1>
                <div className="ltr:ml-auto rtl:mr-auto">
                    <Link to="/pajak/tambahdatapajak" className="btn btn-primary gap-2">
                        Tambah Data Pajak
                    </Link>
                </div>
            </div>
            <div className="panel">
                <div className="datatables">
                    <DataTable
                        highlightOnHover
                        striped
                        className="whitespace-nowrap table-striped table-hover table-bordered table-compact border border-gray-300"
                        records={paginatedRecords}
                        columns={[
                            { accessor: 'entity', title: 'Entity' },
                            { accessor: 'customer', title: 'Customer' },
                            { accessor: 'pph21_invoice', title: 'PPH 21 Invoice' },
                            { accessor: 'pph21_aktual', title: 'PPH 21 Aktual' },
                            { accessor: 'selisih_pph21', title: 'Selisih PPH 21' },
                            { accessor: 'pph23_invoice', title: 'PPH 23 Invoice' },
                            { accessor: 'pph23_aktual', title: 'PPH 23 Aktual' },
                            { accessor: 'selisih_pph23', title: 'Selisih PPH 23' },
                            { accessor: 'ppn_invoice', title: 'PPN Invoice' },
                            { accessor: 'ppn_aktual', title: 'PPN Aktual' },
                            { accessor: 'selisih_ppn', title: 'Selisih PPN' },
                            {
                                accessor: 'Aksi',
                                title: 'Aksi',
                                render: (record) => (
                                    <div className="flex gap-2">
                                        {/* <Link to={`/pengajuan/detailpengajuan/${record.id}`} className="btn btn-info btn-sm">
                                            Detail
                                        </Link> */}
                                        <Link to={`/pengajuan/editpengajuan/${record.id}`} className="btn btn-warning btn-sm">
                                            Edit
                                        </Link>
                                        <button className="btn btn-danger btn-sm" onClick={() => handleDelete(record.id)}>
                                            Hapus
                                        </button>
                                    </div>
                                ),
                            },
                        ]}
                        noRecordsText="No records found"
                        noRecordsIcon={null}
                    />
                </div>
            </div>
        </div>
    );
};

export default SemuaDataPajak;