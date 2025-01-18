import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { DataTable } from 'mantine-datatable';
import { setPageTitle } from '../../store/themeConfigSlice';
import axios from 'axios'; // Import axios directly  

// Define the Invoice interface  
interface Invoice {
    id: number;
    customer: string;
    nomor_invoice: string;
    tanggal_inv: string; // Assuming this is a string; adjust if it's a date object  
    nominal: number; // Assuming nominal is a number  
    status_pembayaran: string;
    // Add other fields as necessary based on your API response  
}

const SemuaInvoice = () => {
    const dispatch = useDispatch();
    const [invoices, setInvoices] = useState<Invoice[]>([]); // Initialize invoices state with Invoice type  
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10); // Default page size  
    const [search, setSearch] = useState('');

    // Set page title  
    useEffect(() => {
        dispatch(setPageTitle('Semua Invoice'));
        fetchInvoices(); // Fetch invoices on component mount  
    }, [dispatch]);

    // Fetch invoices from API  
    const fetchInvoices = async () => {
        try {
            const response = await axios.get('https://audtrax.sinarjernihsuksesindo.id/backend/api/invoice');
            setInvoices(response.data); // Set invoices data  
        } catch (error) {
            console.error('Error fetching invoices:', error);
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
        return <div>Error fetching invoices.</div>;
    }

    // Filter and Paginate Data  
    const filteredInvoices = invoices.filter((invoice) =>
        Object.values(invoice).some((value) =>
            String(value).toLowerCase().includes(search.toLowerCase())
        )
    );

    const paginatedInvoices = filteredInvoices.slice((page - 1) * pageSize, page * pageSize);

    // Map the fetched invoices to the format required by the DataTable  
    const formattedInvoices = paginatedInvoices.map((invoice, index) => ({
        no: (page - 1) * pageSize + index + 1,
        customer: invoice.customer || 'N/A', // Fallback for null/undefined  
        invoiceNumber: invoice.nomor_invoice || 'N/A',
        invoiceDate: invoice.tanggal_inv
            ? new Date(invoice.tanggal_inv).toLocaleDateString() // Format date  
            : 'N/A',
        nominal: `Rp ${invoice.nominal?.toLocaleString() || '0'}`, // Format currency  
        paymentStatus: invoice.status_pembayaran || 'N/A',
        id: invoice.id, // Include ID for actions  
    }));

    return (
        <div>
            {/* Page Header */}
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-xl font-bold">Semua Pengiriman Invoice</h1>
                <Link to="/invoice/tambahinvoice" className="btn btn-primary">
                    Tambah Pengiriman Invoice Baru
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
                    records={formattedInvoices} // Use the formatted invoices  
                    columns={[
                        { accessor: 'no', title: 'No', width: 70 },
                        { accessor: 'customer', title: 'Customer' },
                        { accessor: 'invoiceNumber', title: 'Nomor Invoice' },
                        { accessor: 'invoiceDate', title: 'Tanggal Invoice' },
                        { accessor: 'nominal', title: 'Nominal' },
                        { accessor: 'paymentStatus', title: 'Status Pembayaran' },
                        {
                            accessor: 'aksi',
                            title: 'Aksi',
                            render: (record) => (
                                <div className="flex gap-2">
                                    <Link to={`/invoice/detailinvoice/${record.id}`} className="btn btn-primary btn-sm">
                                        View
                                    </Link>
                                    <Link to={`/invoice/editinvoice/${record.id}`} className="btn btn-dark btn-sm">
                                        Edit
                                    </Link>
                                </div>
                            ),
                        },
                    ]}
                    recordsPerPageOptions={[10, 20, 30, 50, 100]}
                    recordsPerPage={pageSize} // Add recordsPerPage prop  
                    totalRecords={filteredInvoices.length} // Add totalRecords prop  
                    page={page} // Add current page  
                    onPageChange={setPage} // Add onPageChange handler  
                    onRecordsPerPageChange={setPageSize} // Add onRecordsPerPageChange handler  
                    noRecordsText="Tidak ada data invoice" // Custom "No records" message  
                />
            </div>
        </div>
    );
};

export default SemuaInvoice;  
