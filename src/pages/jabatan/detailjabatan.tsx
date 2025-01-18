import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../store/themeConfigSlice';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const DetailJabatan = () => {
    const dispatch = useDispatch();
    const { id } = useParams<{ id: string }>(); // Get the jabatan ID from the URL    
    const [jabatanData, setJabatanData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        dispatch(setPageTitle('Detail Jabatan'));

        // Fetch jabatan data from the API based on the ID    
        const fetchJabatanData = async () => {
            try {
                const response = await axios.get(`https://audtrax.sinarjernihsuksesindo.id/backend/api/jabatan/${id}`);
                setJabatanData(response.data); // Assuming the API returns the jabatan object directly    
            } catch (err) {
                setError('Failed to fetch jabatan data');
            } finally {
                setLoading(false);
            }
        };

        fetchJabatanData();
    }, [dispatch, id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div className="text-red-500">{error}</div>;
    }

    return (
        <div>
            <h1 className="flex items-center mb-5 gap-2">DETAIL JABATAN |</h1>
            <div className='ms-5 me-5 mt-5'>
                <h2 className='mt-5' style={{ fontSize: '25px' }}>Jabatan Details</h2>
                <div className="panel">
                    <div>
                        <h1 className="mb-4" style={{ fontSize: '20px' }}>Nama Jabatan: {jabatanData.nama_jabatan}</h1>
                        <p className="mb-3">
                            <strong>Deskripsi:</strong> {jabatanData.deskripsi || 'N/A'}
                        </p>
                        <p className="mb-3">
                            <strong>Tanggal Dibuat:</strong> {new Date(jabatanData.created_at).toLocaleDateString() || 'N/A'}
                        </p>
                        <p className="mb-3">
                            <strong>Tanggal Diperbarui:</strong> {new Date(jabatanData.updated_at).toLocaleDateString() || 'N/A'}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailJabatan;