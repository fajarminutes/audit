import { DataTable } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../store';
import { setPageTitle } from '../../store/themeConfigSlice';
import axios from 'axios';

// Define the interface for the API response    
interface TaxData {
    id: number;
    tipe_pajak: string;
    biaya: number;
    updated_at: string; // or Date if you prefer to handle it as a Date object    
}

const Pph23 = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('PPH 23'));
    }, [dispatch]);

    const PAGE_SIZES = [10, 20, 30, 50, 100];

    const [page4, setPage4] = useState(1);
    const [pageSize4, setPageSize4] = useState(PAGE_SIZES[0]);
    const [initialRecords4, setInitialRecords4] = useState<TaxData[]>([]);
    const [recordsData4, setRecordsData4] = useState<TaxData[]>([]);
    const [search4, setSearch4] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setPage4(1);
    }, [pageSize4]);

    useEffect(() => {
        const from = (page4 - 1) * pageSize4;
        const to = from + pageSize4;
        setRecordsData4([...initialRecords4.slice(from, to)]);
    }, [page4, pageSize4, initialRecords4]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get<TaxData[]>('https://audtrax.sinarjernihsuksesindo.id/backend/api/kode_pajak');
                const data = response.data;

                // Filter the data to get the record with id = 2    
                const filteredData = data.filter((item: TaxData) => item.id === 2);
                setInitialRecords4(filteredData);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        setInitialRecords4((prevRecords) => {
            return prevRecords.filter((item: TaxData) => {
                return (
                    item.id.toString().includes(search4.toLowerCase()) ||
                    item.tipe_pajak.toLowerCase().includes(search4.toLowerCase()) ||
                    item.biaya.toString().includes(search4.toLowerCase()) ||
                    item.updated_at.toLowerCase().includes(search4.toLowerCase())
                );
            });
        });
    }, [search4]);

    const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass === 'rtl');

    const handleDelete = (record: TaxData) => {
        console.log('Delete:', record);
        // Add logic to delete data here    
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    // Function to format the date string to only show the date part  
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('id-ID'); // Format as Indonesian date  
    };

    return (
        <div>
            <div className="mb-4.5 px-5 flex md:items-center md:flex-row flex-col gap-5">
                <h1 className="flex items-center gap-2">Tax Management |</h1>
                <div className="ltr:ml-auto rtl:mr-auto"></div>
            </div>
            <div className="panel">
                <div className="datatables">
                    <DataTable
                        highlightOnHover
                        striped
                        className="whitespace-nowrap table-striped table-hover table-bordered table-compact border border-gray-300"
                        records={recordsData4}
                        columns={[
                            { accessor: 'id', title: 'Tax ID' },
                            { accessor: 'tipe_pajak', title: 'Tax Type' },
                            { accessor: 'biaya', title: 'Amount' },
                            {
                                accessor: 'updated_at',
                                title: 'Date',
                                render: (record: TaxData) => formatDate(record.updated_at), // Format the date here  
                            },
                            {
                                accessor: 'Aksi',
                                title: 'Aksi',
                                render: (record: TaxData) => (
                                    <div className="flex gap-2">
                                        <Link to={`/editpengajuan/`} className="btn btn-warning btn-sm">
                                            Edit
                                        </Link>
                                        <button className="btn btn-danger btn-sm" onClick={() => handleDelete(record)}>
                                            Hapus
                                        </button>
                                    </div>
                                ),
                            },
                        ]}
                        noRecordsText=""
                        noRecordsIcon={null}
                    />
                </div>
            </div>
        </div>
    );
};

export default Pph23;  
