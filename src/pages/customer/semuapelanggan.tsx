import { useEffect, useState } from 'react';
import { DataTable } from 'mantine-datatable';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../store';
import { setPageTitle } from '../../store/themeConfigSlice';
import axios from 'axios'; // Import axios for API calls    

// Define the interface for a customer record    
interface CustomerResponse {
    id: number;
    kode_customer: string;
    nama_customer: string;
    alamat: string;
    email: string;
    telepon: string;
    pic: string;
    email_pic: string;
    kontak_pic: string;
    created_at?: string; // Optional if not needed    
    updated_at?: string; // Optional if not needed    
    kode_sjs?: string; // Optional if not needed    
}

const SemuaCustomer = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setPageTitle('Semua Customer'));
        fetchCustomers(); // Fetch customer data on component mount    
    }, [dispatch]);

    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [search, setSearch] = useState('');
    const [customerData, setCustomerData] = useState<CustomerResponse[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    const fetchCustomers = async () => {
        try {
            const response = await axios.get('https://audtrax.sinarjernihsuksesindo.id/backend/api/customers');
            setCustomerData(response.data);
        } catch (error) {
            console.error('Error fetching customer data:', error);
            setIsError(true);
        } finally {
            setIsLoading(false);
        }
    };

    // Filter and Paginate Customer Data    
    const filteredData = Array.isArray(customerData)
        ? customerData.filter((item) => Object.values(item).some((value) => String(value).toLowerCase().includes(search.toLowerCase())))
        : [];
    const paginatedData = filteredData.slice((page - 1) * pageSize, page * pageSize);

    const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass === 'rtl');

    return (
        <div>
            <div className="mb-4 flex flex-col gap-4 md:flex-row md:items-center px-4">
                <h1 className="text-lg font-bold">Semua Customer</h1>
                <div className="md:ml-auto">
                    <Link to="/pelanggan/tambahpelanggan" className="btn btn-primary">
                        Tambah Customer Baru |
                    </Link>
                </div>
            </div>
            <div className="panel">
                <div className="datatables">
                    {isLoading ? (
                        <p>Loading...</p>
                    ) : isError ? (
                        <p>Error...</p>
                    ) : (
                        <DataTable
                            withBorder // Changed from withTableBorder to withBorder  
                            borderRadius="sm"
                            withColumnBorders
                            striped
                            highlightOnHover
                            className="table-auto border border-gray-300"
                            records={paginatedData.map((record: CustomerResponse, index: number) => ({
                                ...record,
                                No: (page - 1) * pageSize + index + 1,
                            }))}
                            columns={[
                                { accessor: 'No', title: 'No', width: 70 },
                                { accessor: 'kode_customer', title: 'Kode Customer', width: 150 },
                                { accessor: 'nama_customer', title: 'Nama Customer', width: 350 },
                                { accessor: 'alamat', title: 'Alamat' },
                                { accessor: 'email', title: 'Email' },
                                { accessor: 'telepon', title: 'Telepon' },
                                { accessor: 'pic', title: 'PIC' },
                                { accessor: 'email_pic', title: 'Email PIC' },
                                { accessor: 'kontak_pic', title: 'Kontak PIC' },
                                {
                                    accessor: 'Aksi',
                                    title: 'Aksi',
                                    render: (record: CustomerResponse) => (
                                        <div className="flex gap-2">
                                            {/* <Link to={`/pelanggan/detailpelanggan/${record.id}`} className="btn btn-info btn-sm">
                                                Detail
                                            </Link> */}
                                            <Link to={`/pelanggan/editpelanggan/${record.id}`} className="btn btn-warning btn-sm">
                                                Edit
                                            </Link>
                                        </div>
                                    ),
                                },
                            ]}
                            totalRecords={filteredData.length}
                            page={page}
                            onPageChange={setPage}
                            recordsPerPage={pageSize}
                            onRecordsPerPageChange={setPageSize}
                            recordsPerPageOptions={PAGE_SIZES}
                            noRecordsText="No data found."
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default SemuaCustomer;