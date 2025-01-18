import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { DataTable } from 'mantine-datatable';
import { setPageTitle } from '../../store/themeConfigSlice';
import axios from 'axios'; // Import axios directly    

// Define the Jabatan interface    
interface Jabatan {
    id: number;
    nama_jabatan: string;
    deskripsi: string;
}

const SemuaJabatan = () => {
    const dispatch = useDispatch();
    const [jabatan, setJabatan] = useState<Jabatan[]>([]); // Initialize jabatan state with Jabatan type    
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10); // Default page size    
    const [search, setSearch] = useState('');

    // Set page title    
    useEffect(() => {
        dispatch(setPageTitle('Semua Jabatan'));
        fetchJabatan(); // Fetch jabatan on component mount    
    }, [dispatch]);

    // Fetch jabatan from API    
    const fetchJabatan = async () => {
        try {
            const response = await axios.get('https://audtrax.sinarjernihsuksesindo.id/backend/api/jabatans');
            setJabatan(response.data); // Set jabatan data    
        } catch (error) {
            console.error('Error fetching jabatan:', error);
            setIsError(true); // Set error state    
        } finally {
            setIsLoading(false); // Set loading to false    
        }
    };

    // Handle loading state    
    if (isLoading) {
        return <div>Loading...</div>;
    }

    // Handle error state    
    if (isError) {
        return <div>Error fetching jabatan.</div>;
    }

    // Filter and Paginate Data    
    const filteredJabatan = jabatan.filter((jabatan) =>
        Object.values(jabatan).some((value) =>
            String(value).toLowerCase().includes(search.toLowerCase())
        )
    );

    const paginatedJabatan = filteredJabatan.slice((page - 1) * pageSize, page * pageSize);

    // Function to handle deletion of jabatan  
    const handleDelete = async (id: number) => {
        if (window.confirm('Are you sure you want to delete this jabatan?')) {
            try {
                await axios.delete(`https://audtrax.sinarjernihsuksesindo.id/backend/api/jabatan/${id}`);
                // Refresh the jabatan list after deletion  
                fetchJabatan();
            } catch (error) {
                console.error('Error deleting jabatan:', error);
                alert('Failed to delete jabatan.');
            }
        }
    };

    // Map the fetched jabatan to the format required by the DataTable    
    const formattedJabatan = paginatedJabatan.map((jabatan, index) => ({
        no: (page - 1) * pageSize + index + 1,
        namaJabatan: jabatan.nama_jabatan || 'N/A', // Fallback for null/undefined    
        deskripsi: jabatan.deskripsi || 'N/A',
        id: jabatan.id, // Include ID for actions    
    }));

    return (
        <div>
            {/* Page Header */}
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-xl font-bold">Semua Jabatan</h1>
                <Link to="/jabatan/tambahjabatan" className="btn btn-primary">
                    Tambah Jabatan Baru
                </Link>
            </div>

            {/* Search Input */}
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="form-input"
                />
            </div>

            {/* Data Table */}
            <div className="panel rounded-md shadow">
                <DataTable
                    withBorder
                    borderRadius="sm"
                    withColumnBorders
                    striped
                    highlightOnHover
                    className="table-auto w-full"
                    records={formattedJabatan} // Use the formatted jabatan    
                    columns={[
                        { accessor: 'no', title: 'No', width: 70 },
                        { accessor: 'namaJabatan', title: 'Nama Jabatan' },
                        { accessor: 'deskripsi', title: 'Deskripsi' },
                        {
                            accessor: 'aksi',
                            title: 'Aksi',
                            render: (record) => (
                                <div className="flex gap-2">
                                    {/* <Link to={`/jabatan/detailjabatan/${record.id}`} className="btn btn-primary btn-sm">
                                        View
                                    </Link> */}
                                    <Link to={`/jabatan/editjabatan/${record.id}`} className="btn btn-dark btn-sm">
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(record.id)}
                                        className="btn btn-danger btn-sm"
                                    >
                                        Hapus
                                    </button>
                                </div>
                            ),
                        },
                    ]}
                    recordsPerPageOptions={[10, 20, 30, 50, 100]}
                    recordsPerPage={pageSize} // Add recordsPerPage prop    
                    totalRecords={filteredJabatan.length} // Add totalRecords prop    
                    page={page} // Add current page    
                    onPageChange={setPage} // Add onPageChange handler    
                    onRecordsPerPageChange={setPageSize} // Add onRecordsPerPageChange handler    
                    noRecordsText="Tidak ada data jabatan" // Custom "No records" message    
                />
            </div>
        </div>
    );
};

export default SemuaJabatan;