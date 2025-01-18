import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { DataTable } from 'mantine-datatable';
import { setPageTitle } from '../../store/themeConfigSlice';
import axios from 'axios'; // Import axios for API calls  
import { ToastContainer, toast } from 'react-toastify'; // Import toast for notifications    
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles    

// Define the interface for a late record  
interface LateRecord {
    id: number;
    noInvoice: string;
    codeCust: string;
    custName: string;
    outstanding: number;
    financeName: string;
    status: 'OK' | 'BATAL' | 'ESTIMASI'; // Adjust based on your enum values  
    // Add other fields as necessary based on your database schema  
}

const SemuaLates = () => {
    const dispatch = useDispatch();
    const [lates, setLates] = useState<LateRecord[]>([]); // State to hold late records  
    const [isLoading, setIsLoading] = useState(true); // Loading state  
    const [error, setError] = useState<Error | null>(null); // Error state with explicit type  

    useEffect(() => {
        dispatch(setPageTitle('Semua Lates'));
        fetchLates(); // Fetch late records on component mount  
    }, [dispatch]);

    const fetchLates = async () => {
        try {
            const response = await axios.get('https://audtrax.sinarjernihsuksesindo.id/backend/api/lates');
            setLates(response.data); // Set the fetched data to state  
        } catch (err) {
            console.error('Error fetching late records:', err);
            setError(err instanceof Error ? err : new Error('Failed to fetch late records')); // Set error state  
        } finally {
            setIsLoading(false); // Set loading to false after fetching  
        }
    };

    const handleDelete = async (id: number) => {
        if (window.confirm('Are you sure you want to delete this late record?')) {
            try {
                await axios.delete(`https://audtrax.sinarjernihsuksesindo.id/backend/api/lates/${id}`);
                toast.success('Late record deleted successfully');
                fetchLates(); // Refresh the list after deletion  
            } catch (error) {
                console.error('Error deleting late record:', error);
                toast.error('Failed to delete late record');
            }
        }
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) {
        const errorMessage = error.message || 'An unknown error occurred';
        return <div>Error fetching late records: {errorMessage}</div>;
    }

    return (
        <div>
            <div className="mb-4.5 px-5 flex md:items-center md:flex-row flex-col gap-5">
                <h1 className="flex items-center gap-2">Semua Pengiriman Invoice |</h1>
                <div className="ltr:ml-auto rtl:mr-auto">
                    <Link to="/invoice/tambahlates" className="btn btn-primary gap-2">
                        Add Late
                    </Link>
                </div>
            </div>
            <div className="panel">
                <DataTable
                    columns={[
                        { accessor: 'noInvoice', title: 'No Invoice' },
                        { accessor: 'codeCust', title: 'Code Customer' },
                        { accessor: 'custName', title: 'Customer Name' },
                        { accessor: 'outstanding', title: 'Outstanding' },
                        { accessor: 'financeName', title: 'Finance Name' },
                        { accessor: 'status', title: 'Status' },
                        {
                            accessor: 'aksi',
                            title: 'Aksi',
                            render: (record: LateRecord) => ( // Use the LateRecord type here  
                                <div className="flex gap-2">
                                    {/* <Link to={`/invoice/detaillates/${record.id}`} className="btn btn-primary btn-sm">
                                        View
                                    </Link> */}
                                    <Link to={`/invoice/editlates/${record.id}`} className="btn btn-dark btn-sm">
                                        Edit
                                    </Link>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleDelete(record.id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            ),
                        },
                    ]}
                    records={lates}
                />
            </div>
            <ToastContainer /> {/* Toast notifications container */}
        </div>
    );
};

export default SemuaLates;  
