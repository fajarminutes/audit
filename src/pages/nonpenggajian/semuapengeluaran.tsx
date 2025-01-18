import { DataTable } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../store';
import { setPageTitle } from '../../store/themeConfigSlice';
import IconPlus from '../../components/Icon/IconPlus';
import axios from 'axios';

// Definisikan tipe data untuk nonpayroll    
interface NonPayroll {
    id: number;
    tanggal_pengajuan: string; // Tanggal dalam format string    
    customer: string;
    kodeEntity: string;
    kategori: 'privy' | 'asset' | 'lainlain';
    deskripsi: string;
    jumlah: number;
    harga_satuan: number;
    total: number;
}

const SemuaPengeluaran = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [recordsData4, setRecordsData4] = useState<NonPayroll[]>([]);
    const [page4, setPage4] = useState(1);
    const [pageSize4, setPageSize4] = useState(10);
    const [search4, setSearch4] = useState('');

    useEffect(() => {
        dispatch(setPageTitle('Semua Data Pengeluaran'));
    }, [dispatch]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get<NonPayroll[]>('https://audtrax.sinarjernihsuksesindo.id/backend/api/nonpayroll');
                setRecordsData4(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const PAGE_SIZES = [10, 20, 30, 50, 100];

    useEffect(() => {
        setPage4(1);
    }, [pageSize4]);

    const filteredRecords = recordsData4.filter((item) => {
        return (
            item.tanggal_pengajuan?.toString().includes(search4.toLowerCase()) || // Tambahkan pemeriksaan null    
            item.customer?.toLowerCase().includes(search4.toLowerCase()) || // Tambahkan pemeriksaan null    
            item.deskripsi?.toLowerCase().includes(search4.toLowerCase()) || // Tambahkan pemeriksaan null    
            item.jumlah.toString().includes(search4.toLowerCase()) ||
            item.harga_satuan.toString().includes(search4.toLowerCase()) ||
            item.total.toString().includes(search4.toLowerCase())
        );
    });

    const paginatedRecords = filteredRecords.slice((page4 - 1) * pageSize4, page4 * pageSize4);

    const handleDelete = async (id: number) => {
        if (window.confirm('Are you sure you want to delete this record?')) {
            try {
                await axios.delete(`https://audtrax.sinarjernihsuksesindo.id/backend/api/nonpayroll/${id}`);
                setRecordsData4(recordsData4.filter(record => record.id !== id));
            } catch (error) {
                console.error('Error deleting record:', error);
            }
        }
    };

    const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    if (loading) {
        return <div>Loading...</div>; // Tampilkan loading saat data sedang diambil    
    }

    return (
        <div>
            <div className="mb-4.5 px-5 flex md:items-center md:flex-row flex-col gap-5">
                <h1 className="flex items-center gap-2">SEMUA PENGELUARAN NON-PENGGAJIAN |</h1>
                <div className="ltr:ml-auto rtl:mr-auto">
                    <Link to="/nonpenggajian/tambahpengeluaran" className="btn btn-primary gap-2">
                        <IconPlus />
                        Tambah Pengeluaran Non-Penggajian
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
                            {
                                accessor: 'tanggal_pengajuan',
                                title: 'Tanggal Pengajuan',
                                render: (record) => {
                                    const date = new Date(record.tanggal_pengajuan);
                                    const day = String(date.getDate()).padStart(2, '0');
                                    const month = String(date.getMonth() + 1).padStart(2, '0');
                                    const year = date.getFullYear();
                                    return `${day}-${month}-${year}`;
                                }
                            },
                            { accessor: 'customer', title: 'Customer' },
                            { accessor: 'deskripsi', title: 'Penjelasan Deskripsi' },
                            { accessor: 'jumlah', title: 'Jumlah' },
                            { accessor: 'harga_satuan', title: 'Harga Satuan' },
                            { accessor: 'total', title: 'Total' },
                            {
                                accessor: 'Aksi',
                                title: 'Aksi',
                                render: (record) => (
                                    <div className="flex gap-2">
                                        {/* <Link to={`/nonpenggajian/detailpengeluaran/${record.id}`} className="btn btn-info btn-sm">
                                            Detail
                                        </Link> */}
                                        <Link to={`/nonpenggajian/editpengeluaran/${record.id}`} className="btn btn-warning btn-sm">
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

export default SemuaPengeluaran;