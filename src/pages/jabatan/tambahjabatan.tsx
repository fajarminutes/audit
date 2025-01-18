import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setPageTitle } from '../../store/themeConfigSlice';
import axios from 'axios'; // Import axios directly    

const TambahJabatan = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [namaJabatan, setNamaJabatan] = useState('');
    const [deskripsi, setDeskripsi] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    // Set page title    
    dispatch(setPageTitle('Tambah Jabatan'));

    // Function to handle form submission    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setIsError(false);

        try {
            await axios.post('https://audtrax.sinarjernihsuksesindo.id/backend/api/jabatan', {
                nama_jabatan: namaJabatan,
                deskripsi: deskripsi,
            });
            // Redirect to the list of jabatan after successful creation  
            navigate('/jabatan/semuajabatan');
        } catch (error) {
            console.error('Error creating jabatan:', error);
            setIsError(true); // Set error state    
        } finally {
            setIsLoading(false); // Set loading to false    
        }
    };

    return (
        <div>
            {/* Page Header */}
            <div className="mb-6">
                <h1 className="text-xl font-bold">Tambah Jabatan</h1>
            </div>

            {/* Form for adding jabatan */}
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
                        {isLoading ? 'Loading...' : 'Simpan Jabatan'}
                    </button>
                </div>
                {isError && <div className="text-red-500">Error creating jabatan. Please try again.</div>}
            </form>
        </div>
    );
};

export default TambahJabatan;