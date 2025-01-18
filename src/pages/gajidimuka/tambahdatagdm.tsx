import { Tab } from '@headlessui/react';              
import { useEffect, useState, Fragment } from 'react';              
import { useDispatch } from 'react-redux';              
import { setPageTitle } from '../../store/themeConfigSlice';     
import { Link } from 'react-router-dom';              
import Swal from 'sweetalert2';                      
import { useNavigate } from 'react-router-dom';        
import { Dialog, DialogPanel, Transition } from '@headlessui/react';  
import Select from 'react-select'; // Pastikan Anda mengimpor Select  
  
const TambahDataGdm = () => {              
    const dispatch = useDispatch();              
    const navigate = useNavigate();              
    const [kodeEntities, setKodeEntities] = useState([]);              
    const [customers, setCustomers] = useState([]);     
    const [pengajuanData, setPengajuanData] = useState([]); // Tambahkan state untuk pengajuan  
    const [isLoading, setIsLoading] = useState(false);      
    const [isModalOpen, setIsModalOpen] = useState(false);    
  
    const [formData, setFormData] = useState({                  
        entity: [], // Ubah menjadi array untuk menyimpan beberapa kode entity  
        potongan_gdm_finance: 0, // Ubah menjadi angka  
        nama_customer: [],              
        total_gdm_ditagihkan: '',              
        status: 'Pending',              
        keterangan: '',       
        nomor_pengajuan: '',       
    });              
  
    useEffect(() => {              
        dispatch(setPageTitle('Tambah Data GDM'));              
        fetchData();              
    }, [dispatch]);              
  
    const fetchData = async () => {              
        try {              
            const responseEntities = await fetch('https://audtrax.sinarjernihsuksesindo.id/backend/api/master_kodes');              
            const entitiesData = await responseEntities.json();              
            setKodeEntities(entitiesData);              
  
            const responseCustomers = await fetch('https://audtrax.sinarjernihsuksesindo.id/backend/api/customers');              
            const customersData = await responseCustomers.json();              
            setCustomers(customersData);              
  
            const responsePengajuan = await fetch('https://audtrax.sinarjernihsuksesindo.id/backend/api/pengajuans'); // Ambil data pengajuan  
            const pengajuanData = await responsePengajuan.json();  
            setPengajuanData(pengajuanData); // Simpan data pengajuan  
        } catch (error) {              
            console.error('Error fetching data:', error);              
        }              
    };              
  
    const handlePengajuanChange = (selectedOption) => {    
        const selectedPengajuan = pengajuanData.filter(p => p.nomor_pengajuan === selectedOption.value);    
        if (selectedPengajuan.length > 0) {    
            const entities = selectedPengajuan.map(p => p.kode_entity);    
            const customers = selectedPengajuan.map(p => p.nama_customer);    
            const potonganGdmFinance = selectedPengajuan.reduce((total, p) => total + p.pot_gaji_dimuka, 0);    
      
            setFormData(prev => ({    
                ...prev,    
                entity: entities,    
                nama_customer: customers.join(', '),    
                potongan_gdm_finance: potonganGdmFinance,    
                nomor_pengajuan: selectedOption.value // Simpan nomor_pengajuan  
            }));    
        }    
    };  
    
  
    const handleInputChange = (e) => {    
        const { name, value } = e.target;    
        setFormData(prev => ({    
            ...prev,    
            [name]: value,    
        }));    
    };    
  
    const handleSubmit = async (e) => {    
        e.preventDefault();    
        try {    
            const response = await fetch('https://audtrax.sinarjernihsuksesindo.id/backend/api/gdms', {    
                method: 'POST',    
                headers: {    
                    'Content-Type': 'application/json',    
                },    
                body: JSON.stringify({    
                    entity: formData.entity.join(', '), // Gabungkan menjadi string  
                    potongan_gdm_finance: parseFloat(formData.potongan_gdm_finance), // Pastikan ini angka    
                    nama_customer: formData.nama_customer,    
                    selisih: parseFloat(formData.total_gdm_ditagihkan) - parseFloat(formData.potongan_gdm_finance), // Hitung selisih    
                    total_gdm_ditagihkan: parseFloat(formData.total_gdm_ditagihkan), // Pastikan ini angka    
                    status: formData.status,    
                    keterangan: formData.keterangan,    
                    nomor_pengajuan: formData.nomor_pengajuan // Pastikan ini ada    
                }),    
            });    
            const result = await response.json();    
            if (response.ok) {    
                showToast('success', 'Data GDM berhasil ditambahkan!');    
                navigate('/gajidimuka/semuadatagdm');    
            } else {    
                showToast('error', result.error);    
            }    
        } catch (error) {    
            console.error('Error submitting data:', error);    
            showToast('error', 'Terjadi kesalahan saat mengirim data!');    
        }    
    };  
     
    
         
  
    const showToast = (icon, title) => {                
        const toast = Swal.mixin({                
            toast: true,                
            position: 'top-end',                
            showConfirmButton: false,                
            timer: 3000,                
            padding: '10px 20px',                
        });                
        toast.fire({                
            icon: icon,                
            title: title,                
            padding: '10px 20px',                
        });                
    };      
  
    return (              
        <div>            
            <div className="flex items-center justify-between flex-wrap gap-4 mb-5">            
                <h1 className="flex items-center gap-2">TAMBAH DATA GDM |</h1>            
                <div className="flex sm:flex-row flex-col sm:items-center sm:gap-3 gap-4 w-full sm:w-auto">            
                    <div className="flex gap-3">          
                    <Link to="#" className="btn btn-success gap-5" onClick={() => setIsModalOpen(true)}>      
                            Import Excel      
                        </Link>    
                        <Link to="/gajidimuka/semuadatagdm" className="btn btn-primary gap-5">            
                            Kembali ke Semua Data GDM            
                        </Link>            
                    </div>            
                </div>            
            </div>            
            <div className="panel" id="simple">            
                <div className="mb-5">            
                    <Tab.Group>            
                        <Tab.Panels>            
                            <Tab.Panel>            
                                <div className="active pt-5">            
                                    <form onSubmit={handleSubmit}>            
                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">    
                                            <div>    
                                                <label htmlFor="nomor_pengajuan" className="block text-sm font-medium text-gray-700">    
                                                    Nomor Pengajuan    
                                                </label>    
                                                <Select    
                                                    options={pengajuanData.map(p => ({ value: p.nomor_pengajuan, label: p.nomor_pengajuan }))} // Gunakan data pengajuan  
                                                    onChange={handlePengajuanChange}    
                                                    className="react-select-container"    
                                                    classNamePrefix="react-select"    
                                                    placeholder="Pilih Nomor Pengajuan"    
                                                />    
                                            </div>            
                                            <div>            
                                                <label htmlFor="entity">Kode Entity</label>            
                                                <input            
                                                    id="entity"            
                                                    className="form-input form-input-lg"            
                                                    value={formData.entity.join(', ')} // Tampilkan semua kode entity  
                                                    readOnly            
                                                />            
                                            </div>            
                                            <div>            
                                                <label htmlFor="nama_customer">Nama Customer</label>            
                                                <input id="nama_customer" type="text" value={formData.nama_customer} readOnly className="form-input form-input-lg" />            
                                            </div>            
                                            <div>            
                                                <label htmlFor="potonganGdmFinance">Potongan GDM Finance</label>            
                                                <input id="potonganGdmFinance" name="potongan_gdm_finance" type="number" placeholder="Masukkan Potongan GDM" className="form-input form-input-lg" value={formData.potongan_gdm_finance} readOnly />            
                                            </div>            
                                            <div>            
                                                <label htmlFor="totalGdmDitagihkan">Total GDM Ditagihkan</label>            
                                                <input id="totalGdmDitagihkan" name="total_gdm_ditagihkan" type="number" placeholder="Masukkan Total GDM" className="form-input form-input-lg" value={formData.total_gdm_ditagihkan} onChange={handleInputChange} />            
                                            </div>            
                                            <div>            
                                                <label htmlFor="selisih">Selisih</label>            
                                                <input id="selisih" type="number" placeholder="Masukkan Selisih" className="form-input form-input-lg" value={formData.total_gdm_ditagihkan - formData.potongan_gdm_finance} readOnly />  
                                            </div>          
                                            <div>            
                                                <label htmlFor="status">Status</label>            
                                                <select id="status" className="form-input form-input-lg" value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })}>            
                                                    <option value="">Pilih Status</option>            
                                                    <option value="Pending">Pending</option>            
                                                    <option value="Approved">Completed</option>            
                                                    <option value="Rejected">Canceled</option>            
                                                </select>            
                                            </div>            
                                            <div className="form-container">            
                                                <label htmlFor="keterangan">Keterangan</label>            
                                                <textarea            
                                                    id="keterangan"            
                                                    name="keterangan"            
                                                    placeholder="Masukkan keterangan"            
                                                    rows="4"            
                                                    value={formData.keterangan}            
                                                    onChange={(e) => setFormData({ ...formData, keterangan: e.target.value })}            
                                                ></textarea>            
                                            </div>            
                                        </div>            
                                        <div className="d-flex justify-content-end mt-5">            
                                            <button type="submit" className="btn btn-primary gap-5">            
                                                Submit            
                                            </button>            
                                        </div>            
                                    </form>            
                                </div>            
                            </Tab.Panel>            
                        </Tab.Panels>            
                    </Tab.Group>            
                </div>            
            </div>            
        </div>              
    );              
};              
        
export default TambahDataGdm;              
