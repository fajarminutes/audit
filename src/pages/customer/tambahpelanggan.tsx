import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../store/themeConfigSlice';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TambahCustomer = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(setPageTitle('Tambah Customer'));
    }, [dispatch]);

    // Form State  
    const [body, setBody] = useState({
        kode_customer: '',
        nama_customer: '',
        alamat: '',
        email: '',
        telepon: '',
        pic: '',
        email_pic: '',
        kontak_pic: '',
        kode_sjs: '',
    });

    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    // Handle Input Change  
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setBody({ ...body, [name]: value });
    };

    // Handle Submit  
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setIsError(false);

        try {
            await axios.post('https://audtrax.sinarjernihsuksesindo.id/backend/api/customers', body);
            toast.success('Customer created successfully');
            setTimeout(() => {
                navigate('/pelanggan/semuapelanggan');
            }, 2000);
        } catch (error) {
            console.error('Error creating customer:', error);
            setIsError(true);
            toast.error('An error occurred while saving the customer');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            {/* Page Header */}
            <div className="flex items-center justify-between flex-wrap gap-4 mb-5">
                <h1 className="flex items-center gap-2">TAMBAH CUSTOMER |</h1>
            </div>

            {/* Form Panel */}
            <div className="panel" id="simple">
                <form className="border p-4 rounded-lg shadow-md" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Column 1 */}
                        <div>
                            <div className="mb-4">
                                <label htmlFor="kode_customer" className="block text-sm font-medium text-gray-700">
                                    Kode Customer
                                </label>
                                <input
                                    type="text"
                                    id="kode_customer"
                                    name="kode_customer"
                                    value={body.kode_customer}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2"
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="nama_customer" className="block text-sm font-medium text-gray-700">
                                    Nama Customer
                                </label>
                                <input
                                    type="text"
                                    id="nama_customer"
                                    name="nama_customer"
                                    value={body.nama_customer}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2"
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="alamat" className="block text-sm font-medium text-gray-700">
                                    Alamat
                                </label>
                                <input
                                    type="text"
                                    id="alamat"
                                    name="alamat"
                                    value={body.alamat}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2"
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={body.email}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2"
                                />
                            </div>
                        </div>

                        {/* Column 2 */}
                        <div>
                            <div className="mb-4">
                                <label htmlFor="telepon" className="block text-sm font-medium text-gray-700">
                                    Telepon
                                </label>
                                <input
                                    type="text"
                                    id="telepon"
                                    name="telepon"
                                    value={body.telepon}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2"
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="pic" className="block text-sm font-medium text-gray-700">
                                    PIC
                                </label>
                                <input
                                    type="text"
                                    id="pic"
                                    name="pic"
                                    value={body.pic}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2"
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="email_pic" className="block text-sm font-medium text-gray-700">
                                    Email PIC
                                </label>
                                <input
                                    type="email"
                                    id="email_pic"
                                    name="email_pic"
                                    value={body.email_pic}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2"
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="kontak_pic" className="block text-sm font-medium text-gray-700">
                                    Kontak PIC
                                </label>
                                <input
                                    type="text"
                                    id="kontak_pic"
                                    name="kontak_pic"
                                    value={body.kontak_pic}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-start mt-6">
                        <button type="submit" className="btn btn-primary" disabled={isLoading}>
                            {isLoading ? 'Saving...' : 'Simpan Customer'}
                        </button>
                    </div>
                </form>
                <ToastContainer />

                {isError && <p className="mt-4 text-red-500">An error occurred while saving the customer.</p>}
            </div>
        </div>
    );
};

export default TambahCustomer;