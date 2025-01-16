import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../../store/themeConfigSlice';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

// Define the Customer type  
interface Customer {
    id: number;
    nama_customer: string;
    kode_customer: string;
}

// Define the Jabatan type  
interface Jabatan {
    id: number;
    nama_jabatan: string;
}

// Define the form data type  
interface FormData {
    id_customer: number;
    nama_project: string;
    jabatan: string;
    kode_by_project: string;
    kodeSJS: string;
    penulisan_kode: string;
    user_invoice: string;
    nomor_handphone: string;
    email: string;
    user_retention: string;
    nomor_handphone_ret: string;
    email_ret: string;
}

const TambahMC: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(setPageTitle('Tambah Mastercode'));
        fetchJabatan();
        fetchCustomer();
    }, [dispatch]);

    const [dataJabatan, setDataJabatan] = useState<Jabatan[]>([]);
    const [dataCustomer, setDataCustomer] = useState<Customer[]>([]);
    const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
    const [selectedJabatan, setSelectedJabatan] = useState<{ value: string; label: string } | null>(null);
    const [formData, setFormData] = useState<FormData>({
        id_customer: 0,
        nama_project: '',
        jabatan: '',
        kode_by_project: '',
        kodeSJS: '',
        penulisan_kode: '',
        user_invoice: '',
        nomor_handphone: '',
        email: '',
        user_retention: '',
        nomor_handphone_ret: '',
        email_ret: '',
    });
    const [isLoadingCreateKode, setIsLoadingCreateKode] = useState(false);
    const [isError, setIsError] = useState(false);

    const fetchJabatan = () => {
        axios.get('https://audtrax.sinarjernihsuksesindo.id/backend/api/jabatans') // Adjust the API endpoint as necessary  
            .then(response => {
                // Ensure the response is an array  
                if (Array.isArray(response.data)) {
                    setDataJabatan(response.data);
                } else {
                    console.error('Expected an array but got:', response.data);
                    setDataJabatan([]); // Set to empty array if not an array  
                }
            })
            .catch(error => {
                console.error('Error fetching jabatan:', error);
                setIsError(true);
            });
    };

    const fetchCustomer = () => {
        axios.get('https://audtrax.sinarjernihsuksesindo.id/backend/api/customers') // Adjust the API endpoint as necessary  
            .then(response => {
                // Ensure the response is an array  
                if (Array.isArray(response.data)) {
                    setDataCustomer(response.data);
                } else {
                    console.error('Expected an array but got:', response.data);
                    setDataCustomer([]); // Set to empty array if not an array  
                }
            })
            .catch(error => {
                console.error('Error fetching customers:', error);
                setIsError(true);
            });
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCustomerSelect = (option: { value: string; label: string } | null) => {
        const selected = dataCustomer.find(customer => customer.id.toString() === option?.value);
        setSelectedCustomer(selected || null);
        setFormData(prev => ({
            ...prev,
            id_customer: selected ? selected.id : 0,
            nama_project: selected ? selected.nama_customer : '',
            kodeSJS: selected ? selected.kode_customer : '',
        }));
    };

    const handleJabatanSelect = (option: { value: string; label: string } | null) => {
        setSelectedJabatan(option);
        setFormData(prev => ({ ...prev, jabatan: option ? option.label : '' }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoadingCreateKode(true);

        const updatedFormData = {
            ...formData,
            penulisan_kode: `${formData.kodeSJS}_${formData.kode_by_project}`,
        };

        axios.post('https://audtrax.sinarjernihsuksesindo.id/backend/api/master_kodes', updatedFormData)
            .then(() => {
                toast.success('Kode Invoice added successfully');
                setTimeout(() => {
                    navigate('/invoice/mastercode/semuamastercode');
                }, 2000);
            })
            .catch(() => {
                toast.error('An error occurred while saving the customer');
            })
            .finally(() => {
                setIsLoadingCreateKode(false);
            });
    };

    if (isError) return <p>Error loading data.</p>;

    const customerOptions = dataCustomer.map(customer => ({
        value: customer.id.toString(), // Convert id to string  
        label: `${customer.nama_customer} (${customer.kode_customer})`,
    }));

    const jabatanOptions = dataJabatan.map(jabatan => ({
        value: jabatan.id.toString(), // Convert id to string  
        label: jabatan.nama_jabatan,
    }));

    return (
        <div>
            <h1 className="mb-5">
                <strong>Master Code Invoice |</strong> Add Master Code Invoice
            </h1>
            <div className="panel">
                <form onSubmit={handleSubmit} className="active pt-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            {/* Customer Dropdown */}
                            <div className="form-group mb-3">
                                <label htmlFor="namaCustomer">Nama Customer</label>
                                <Select
                                    id="namaCustomer"
                                    options={customerOptions}
                                    isSearchable
                                    onChange={handleCustomerSelect}
                                    placeholder="Select a customer"
                                    value={selectedCustomer ? { value: selectedCustomer.id.toString(), label: selectedCustomer.nama_customer } : null}
                                    classNamePrefix="react-select"
                                />
                            </div>

                            {/* Jabatan Dropdown */}
                            <div className="form-group mb-3">
                                <label htmlFor="jabatan">Jabatan</label>
                                <Select
                                    id="jabatan"
                                    options={jabatanOptions}
                                    isSearchable
                                    onChange={handleJabatanSelect}
                                    placeholder="Select a jabatan"
                                    value={selectedJabatan}
                                    classNamePrefix="react-select"
                                />
                            </div>

                            {/* Other Input Fields */}
                            <div className="form-group mb-3">
                                <label htmlFor="kodeSJS">Kode SJS+</label>
                                <input id="kodeSJS" type="text" name="kodeSJS" value={formData.kodeSJS} onChange={handleInputChange} className="form-input form-input-lg" required />
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="kode_by_project">Kode By Project</label>
                                <input
                                    id="kode_by_project"
                                    type="text"
                                    name="kode_by_project"
                                    value={formData.kode_by_project}
                                    onChange={handleInputChange}
                                    className="form-input form-input-lg"
                                    required
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="penulisan_kode">Penulisan Kode</label>
                                <input
                                    id="penulisan_kode"
                                    type="text"
                                    name="penulisan_kode"
                                    value={formData.penulisan_kode}
                                    onChange={handleInputChange}
                                    className="form-input form-input-lg"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <div className="form-group mb-3">
                                <label htmlFor="user_invoice">USER INVOICE</label>
                                <input id="user_invoice" type="text" name="user_invoice" value={formData.user_invoice} onChange={handleInputChange} className="form-input form-input-lg" required />
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="nomor_handphone">Nomor Handphone</label>
                                <input
                                    id="nomor_handphone"
                                    type="text"
                                    name="nomor_handphone"
                                    value={formData.nomor_handphone}
                                    onChange={handleInputChange}
                                    className="form-input form-input-lg"
                                    required
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="email">EMAIL</label>
                                <input id="email" type="email" name="email" value={formData.email} onChange={handleInputChange} className="form-input form-input-lg" required />
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="user_retention">USER RETENTION</label>
                                <input
                                    id="user_retention"
                                    type="text"
                                    name="user_retention"
                                    value={formData.user_retention}
                                    onChange={handleInputChange}
                                    className="form-input form-input-lg"
                                    required
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="nomor_handphone_ret">Nomor Handphone (Ret)</label>
                                <input
                                    id="nomor_handphone_ret"
                                    type="text"
                                    name="nomor_handphone_ret"
                                    value={formData.nomor_handphone_ret}
                                    onChange={handleInputChange}
                                    className="form-input form-input-lg"
                                    required
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="email_ret">EMAIL (Ret)</label>
                                <input id="email_ret" type="email" name="email_ret" value={formData.email_ret} onChange={handleInputChange} className="form-input form-input-lg" required />
                            </div>
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary mt-4" disabled={isLoadingCreateKode}>
                        {isLoadingCreateKode ? 'Saving...' : 'Simpan Master Code'}
                    </button>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
};

export default TambahMC;  
