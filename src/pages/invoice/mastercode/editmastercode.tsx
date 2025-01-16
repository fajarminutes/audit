import React from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';
import { setPageTitle } from '../../../store/themeConfigSlice';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from 'react-router-dom';

// Define the props interface    
interface EditMCProps {
    dispatch: (action: any) => void; // Type for dispatch    
}

const EditMC: React.FC<EditMCProps> = ({ dispatch }) => {
    const { id } = useParams<{ id: string }>(); // Get ID from URL    
    const navigate = useNavigate();

    const [dataJabatan, setDataJabatan] = React.useState<any[]>([]);
    const [dataCustomer, setDataCustomer] = React.useState<any[]>([]);
    const [selectedCustomer, setSelectedCustomer] = React.useState<{ value: number; label: string } | null>(null);
    const [selectedJabatan, setSelectedJabatan] = React.useState<{ value: string; label: string } | null>(null);
    const [formData, setFormData] = React.useState({
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
    const [isError, setIsError] = React.useState(false);

    React.useEffect(() => {
        dispatch(setPageTitle('Edit Mastercode'));
        if (id) {
            fetchMasterCode(id);
            fetchJabatan();
            fetchCustomer();
        } else {
            toast.error('Invalid ID parameter.');
        }
    }, [dispatch, id]);

    const fetchMasterCode = async (id: string) => {
        try {
            const response = await axios.get(`https://audtrax.sinarjernihsuksesindo.id/backend/api/master_kodes/${id}`);
            const masterCodeData = response.data;

            // Set form data with fetched data    
            setFormData({
                id_customer: masterCodeData.id_customer,
                nama_project: masterCodeData.nama_project,
                jabatan: masterCodeData.jabatan,
                kode_by_project: masterCodeData.kode_by_project,
                kodeSJS: masterCodeData.kode_sjs,
                penulisan_kode: masterCodeData.penulisan_kode,
                user_invoice: masterCodeData.user_invoice,
                nomor_handphone: masterCodeData.nomor_handphone.toString(),
                email: masterCodeData.email,
                user_retention: masterCodeData.user_retention,
                nomor_handphone_ret: masterCodeData.nomor_handphone_ret.toString(),
                email_ret: masterCodeData.email_ret,
            });

            // Set selected customer and jabatan    
            setSelectedCustomer({
                value: masterCodeData.id_customer,
                label: `${masterCodeData.nama_project} (${masterCodeData.kode_by_project})`,
            });
            setSelectedJabatan({
                value: masterCodeData.jabatan,
                label: masterCodeData.jabatan,
            });
        } catch (error) {
            console.error('Error fetching master code:', error);
            toast.error('Failed to fetch master code data.');
        }
    };

    const fetchJabatan = async () => {
        try {
            const response = await axios.get('https://audtrax.sinarjernihsuksesindo.id/backend/api/jabatans'); // Adjust the API endpoint as necessary    
            if (Array.isArray(response.data)) {
                setDataJabatan(response.data);
            } else {
                console.error('Expected an array but got:', response.data);
                setDataJabatan([]);
            }
        } catch (error) {
            console.error('Error fetching jabatan:', error);
            setIsError(true);
        }
    };

    const fetchCustomer = async () => {
        try {
            const response = await axios.get('https://audtrax.sinarjernihsuksesindo.id/backend/api/customers'); // Adjust the API endpoint as necessary    
            if (Array.isArray(response.data)) {
                setDataCustomer(response.data);
            } else {
                console.error('Expected an array but got:', response.data);
                setDataCustomer([]);
            }
        } catch (error) {
            console.error('Error fetching customers:', error);
            setIsError(true);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleCustomerSelect = (option: { value: number; label: string } | null) => {
        if (option) {
            const selected = dataCustomer.find(customer => customer.id === option.value);
            if (selected) {
                setSelectedCustomer({
                    value: selected.id,
                    label: `${selected.nama_customer} (${selected.kode_customer})`,
                });
                setFormData((prev) => ({
                    ...prev,
                    id_customer: selected.id,
                    nama_project: selected.nama_customer, // Update this to the correct field  
                }));
            }
        } else {
            setSelectedCustomer(null);
            setFormData((prev) => ({
                ...prev,
                id_customer: 0,
                nama_project: '',
            }));
        }
    };

    const handleJabatanSelect = (option: { value: string; label: string } | null) => {
        setSelectedJabatan(option);
        setFormData((prev) => ({ ...prev, jabatan: option ? option.label : '' }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!id) {
            toast.error('Invalid ID parameter.');
            return;
        }
        try {
            await axios.put(`https://audtrax.sinarjernihsuksesindo.id/backend/api/master_kodes/${id}`, formData);
            toast.success('Master Code updated successfully');
            setTimeout(() => {
                navigate('/invoice/mastercode/semuamastercode');
                window.location.reload();
            }, 2000);
        } catch (error) {
            console.error('Error updating master code:', error);
            toast.error('An error occurred while updating the master code');
        }
    };

    if (isError) return <p>Error loading data.</p>;

    const customerOptions = dataCustomer.map(customer => ({
        value: customer.id,
        label: `${customer.nama_customer} (${customer.kode_customer})`,
    }));

    const jabatanOptions = dataJabatan.map(jabatan => ({
        value: jabatan.id,
        label: jabatan.nama_jabatan,
    }));

    return (
        <div>
            <h1 className="mb-5">
                <strong>Master Code Invoice |</strong> Edit Master Code Invoice
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
                                    value={selectedCustomer}
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

                    <button type="submit" className="btn btn-primary mt-4">
                        Update Master Code
                    </button>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
};

// Connect the component to Redux    
export default connect()(EditMC);