import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { DataTable } from 'mantine-datatable';
import { setPageTitle } from '../../../store/themeConfigSlice';

// Define the type for the data    
interface PVSIData {
    id: number; // Assuming id is a number    
    code: string; // Change from 'kode' to 'code'    
    nomor_customer: string; // Change from 'namaCustomer' to 'nomor_customer'    
    total_invoice: number; // Change from 'totalInvoice' to 'total_invoice'    
    total_pengajuan: number; // Change from 'totalPengajuan' to 'total_pengajuan'    
    selisih: number; // Change from 'selisih' to 'selisih'    
}

const SemuaPVSI = () => {
    const dispatch = useDispatch();
    const [data, setData] = useState<PVSIData[]>([]); // Use the defined type    
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        dispatch(setPageTitle('Semua Pengajuan VS Invoice'));

        // Fetch data from the API    
        const fetchData = async () => {
            try {
                const response = await fetch('https://audtrax.sinarjernihsuksesindo.id/backend/api/pvsi');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                setData(result); // Assuming the API returns an array directly    
            } catch (error) {
                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError('An unknown error occurred');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [dispatch]);

    const handleDelete = async (id: number) => {
        if (window.confirm('Are you sure you want to delete this record?')) {
            setLoading(true);
            try {
                const response = await fetch(`https://audtrax.sinarjernihsuksesindo.id/backend/api/pvsi/${id}`, {
                    method: 'DELETE',
                });
                if (!response.ok) {
                    throw new Error('Failed to delete the record');
                }
                // Update the state to remove the deleted record  
                setData((prevData) => prevData.filter((record) => record.id !== id));
                console.log('Record deleted successfully');
            } catch (error) {
                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError('An unknown error occurred');
                }
            } finally {
                setLoading(false);
            }
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <div className="mb-4.5 px-5 flex md:items-center md:flex-row flex-col gap-5">
                <h1 className="flex items-center gap-2">
                    <strong>Report Pengajuan vs Invoice Management |</strong> All Reports
                </h1>
                <div className="ltr:ml-auto rtl:mr-auto">
                    <Link to="/invoice/pengajuanvsinvoice/tambahpengajuanvsinvoice" className="btn btn-primary gap-2">
                        Add Report
                    </Link>
                </div>
            </div>
            <div className='panel'>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                    <div>
                        <label htmlFor="bank">Show</label>
                        <select id="bank" className="form-input form-input-lg">
                            <option value="10">10</option>
                            <option value="25">25</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                        </select>
                    </div>
                    <div>
                        <input id="" type="search" placeholder='search..' className="form-input form-input-lg" />
                    </div>
                </div>
                <DataTable
                    columns={[
                        { accessor: 'code', title: 'Kode' }, // Change 'kode' to 'code'    
                        { accessor: 'nomor_customer', title: 'Nama Customer' }, // Change 'namaCustomer' to 'nomor_customer'    
                        { accessor: 'total_invoice', title: 'Total Invoices' }, // Change 'totalInvoice' to 'total_invoice'    
                        { accessor: 'total_pengajuan', title: 'Total Pengajuan' }, // Change 'totalPengajuan' to 'total_pengajuan'    
                        { accessor: 'selisih', title: 'Selisih' }, // Keep 'selisih' as is    
                        {
                            accessor: 'aksi',
                            title: 'Aksi',
                            render: (record: PVSIData) => ( // Specify the type of record    
                                <div className="flex gap-2">
                                    <Link to={`/invoice/pengajuanvsinvoice/editpengajuanvsinvoice/${record.id}`} className="btn btn-dark btn-sm">
                                        Edit
                                    </Link>
                                    <button onClick={() => handleDelete(record.id)} className="btn btn-danger btn-sm">
                                        Delete
                                    </button>
                                </div>
                            ),
                        },
                    ]}
                    records={data}
                />
            </div>
        </div>
    );
};

export default SemuaPVSI;