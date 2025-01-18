import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../store/themeConfigSlice';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const DetailCustomer = () => {
    const dispatch = useDispatch();
    const { id } = useParams<{ id: string }>(); // Get the customer ID from the URL    
    const [customerData, setCustomerData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        dispatch(setPageTitle('Detail Customer'));

        // Fetch customer data from the API based on the ID    
        const fetchCustomerData = async () => {
            try {
                const response = await axios.get(`https://audtrax.sinarjernihsuksesindo.id/backend/api/customers/${id}`);
                setCustomerData(response.data); // Assuming the API returns the customer object directly    
            } catch (err) {
                setError('Failed to fetch customer data');
            } finally {
                setLoading(false);
            }
        };

        fetchCustomerData();
    }, [dispatch, id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div className="text-red-500">{error}</div>;
    }

    return (
        <div>
            <h1 className="flex items-center mb-5 gap-2">DETAIL CUSTOMER |</h1>
            <div className='ms-5 me-5 mt-5'>
                <h2 className='mt-5' style={{ fontSize: '25px' }}>Customer Details</h2>
                <div className="panel">
                    <div>
                        <h1 className="mb-4" style={{ fontSize: '20px' }}>Kode Customer: {customerData.kode_customer}</h1>
                        <p className="mb-3">
                            <strong>Nama Customer:</strong> {customerData.nama_customer}
                        </p>
                        <p className="mb-3">
                            <strong>Alamat:</strong> {customerData.alamat}
                        </p>
                        <p className="mb-3">
                            <strong>Email:</strong> {customerData.email}
                        </p>
                        <p className="mb-3">
                            <strong>Telepon:</strong> {customerData.telepon}
                        </p>
                        <p className="mb-3">
                            <strong>PIC:</strong> {customerData.pic}
                        </p>
                        <p className="mb-3">
                            <strong>Email PIC:</strong> {customerData.email_pic}
                        </p>
                        <p className="mb-3">
                            <strong>Kontak PIC:</strong> {customerData.kontak_pic}
                        </p>
                        <p className="mb-3">
                            <strong>Kode SJS:</strong> {customerData.kode_sjs || 'N/A'}
                        </p>
                        <p className="mb-3">
                            <strong>Tanggal Dibuat:</strong> {new Date(customerData.created_at).toLocaleDateString()}
                        </p>
                        <p className="mb-3">
                            <strong>Tanggal Diperbarui:</strong> {new Date(customerData.updated_at).toLocaleDateString()}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailCustomer;