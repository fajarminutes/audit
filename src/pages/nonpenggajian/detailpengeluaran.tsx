import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../store/themeConfigSlice';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const DetailPengeluaran = () => {
    const dispatch = useDispatch();
    const { id } = useParams<{ id: string }>(); // Get the nonpayroll ID from the URL    
    const [pengeluaranData, setPengeluaranData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        dispatch(setPageTitle('Detail Pengeluaran'));

        // Fetch nonpayroll data from the API based on the ID    
        const fetchPengeluaranData = async () => {
            try {
                const response = await axios.get(`https://audtrax.sinarjernihsuksesindo.id/backend/api/nonpayroll/${id}`);
                setPengeluaranData(response.data); // Assuming the API returns the nonpayroll object directly    
            } catch (err) {
                setError('Failed to fetch pengeluaran data');
            } finally {
                setLoading(false);
            }
        };

        fetchPengeluaranData();
    }, [dispatch, id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div className="text-red-500">{error}</div>;
    }

    return (
        <div>
            <h1 className="flex items-center mb-5 gap-2">DETAIL PENGELUARAN |</h1>
            <div className='ms-5 me-5 mt-5'>
                <h2 className='mt-5' style={{ fontSize: '25px' }}>Pengeluaran Details</h2>
                <div className="panel">
                    <div>
                        <h1 className="mb-4" style={{ fontSize: '20px' }}>Kode Entity: {pengeluaranData.kodeEntity}</h1>
                        <p className="mb-3">
                            <strong>Tanggal Pengeluaran:</strong> {new Date(pengeluaranData.tanggal_pengajuan).toLocaleDateString()}
                        </p>
                        <p className="mb-3">
                            <strong>Customer:</strong> {pengeluaranData.customer}
                        </p>
                        <p className="mb-3">
                            <strong>Kategori:</strong> {pengeluaranData.kategori}
                        </p>
                        <p className="mb-3">
                            <strong>Deskripsi:</strong> {pengeluaranData.deskripsi}
                        </p>
                        <p className="mb-3">
                            <strong>Jumlah:</strong> {pengeluaranData.jumlah}
                        </p>
                        <p className="mb-3">
                            <strong>Harga Satuan:</strong> {pengeluaranData.harga_satuan.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}
                        </p>
                        <p className="mb-3">
                            <strong>Total:</strong> {pengeluaranData.total.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailPengeluaran;