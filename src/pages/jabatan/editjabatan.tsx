import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { setPageTitle } from '../../store/themeConfigSlice';
import axios from 'axios'; // Import axios directly      

const EditJabatan = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>(); // Get the jabatan ID from the URL  
    const [namaJabatan, setNamaJabatan] = useState('');
    const [deskripsi, setDeskripsi] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    // Set page title      
    useEffect(() => {
        dispatch(setPageTitle('Edit Jabatan'));
        fetchJabatan(); // Fetch jabatan data on component mount  
    }, [dispatch, id]);

    // Function to fetch jabatan data      
    const fetchJabatan = async () => {
        try {
            const response = await axios.get(`https://audtrax.sinarjernihsuksesindo.id/backend/api/jabatan/${id}`);
            setNamaJabatan(response.data.nama_jabatan);
            setDeskripsi(response.data.deskripsi);
        } catch (error) {
            console.error('Error fetching jabatan:', error);
            setIsError(true); // Set error state      
        } finally {
            setIsLoading(false); // Set loading to false      
        }
    };

    // Function to handle form submission      
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setIsError(false);

        try {
            await axios.put(`https://audtrax.sinarjernihsuksesindo.id/backend/api/jabatan/${id}`, {
                nama_jabatan: namaJabatan,
                deskripsi: deskripsi,
            });
            // Redirect to the list of jabatan after successful update    
            navigate('/jabatan/semuajabatan');
        } catch (error) {
            console.error('Error updating jabatan:', error);
            setIsError(true); // Set error state      
        } finally {
            setIsLoading(false); // Set loading to false      
        }
    };

    // Handle loading state      
    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {/* Page Header */}
            <div className="mb-6">
                <h1 className="text-xl font-bold">Edit Jabatan</h1>
            </div>

            {/* Form for editing jabatan */}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium">Nama Jabatan</label>
                    <input
                        type="text"
                        value={namaJabatan}
                        onChange={(e) => setNamaJabatan(e.target.value)}
                        required
                        className="form-input"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Deskripsi</label>
                    <textarea
                        value={deskripsi}
                        onChange={(e) => setDeskripsi(e.target.value)}
                        required
                        className="form-textarea"
                    />
                </div>
                <div>
                    <button
                        type="submit"
                        className={`btn btn-primary ${isLoading ? 'loading' : ''}`}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Loading...' : 'Update Jabatan'}
                    </button>
                </div>
                {isError && <div className="text-red-500">Error updating jabatan. Please try again.</div>}
            </form>
        </div>
    );
};

export default EditJabatan;