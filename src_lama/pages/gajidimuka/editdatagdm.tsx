import { Tab } from '@headlessui/react';              
import { useEffect, useState } from 'react';              
import { Link, useParams } from 'react-router-dom';              
import { useDispatch } from 'react-redux';              
import { setPageTitle } from '../../store/themeConfigSlice';              
import Swal from 'sweetalert2';                      
import { useNavigate } from 'react-router-dom';              
  
const EditDataGdm = () => {              
    const dispatch = useDispatch();              
    const navigate = useNavigate();              
    const { id } = useParams(); // Ambil ID dari URL  
  
    const [kodeEntities, setKodeEntities] = useState([]);              
    const [customers, setCustomers] = useState([]);              
    const [formData, setFormData] = useState({                  
        entity: '',              
        potongan_gdm_finance: '',              
        nama_customer: '',              
        total_gdm_ditagihkan: '',              
        status: 'Pending',              
        keterangan: '',              
    });              
  
    useEffect(() => {              
        dispatch(setPageTitle('Edit Data GDM'));              
        fetchData();              
        if (id) {  
            fetchGdmData(); // Ambil data jika ID ada  
        }  
    }, [dispatch, id]);              
  
    const fetchData = async () => {              
        try {              
            const responseEntities = await fetch('https://audtrax.sinarjernihsuksesindo.id/backend/api/master_kodes');              
            const entitiesData = await responseEntities.json();              
            setKodeEntities(entitiesData);              
  
            const responseCustomers = await fetch('https://audtrax.sinarjernihsuksesindo.id/backend/api/customers');              
            const customersData = await responseCustomers.json();              
            setCustomers(customersData);              
        } catch (error) {              
            console.error('Error fetching data:', error);              
        }              
    };              
  
    const fetchGdmData = async () => {  
        try {  
            const response = await fetch(`https://audtrax.sinarjernihsuksesindo.id/backend/api/gdms/${id}`);  
            const data = await response.json();  
            setFormData({  
                entity: data.entity,  
                potongan_gdm_finance: data.potongan_gdm_finance,  
                nama_customer: data.nama_customer,  
                total_gdm_ditagihkan: data.total_gdm_ditagihkan,  
                status: data.status,  
                keterangan: data.keterangan,  
            });  
        } catch (error) {  
            console.error('Error fetching GDM data:', error);  
        }  
    };  
  
    const handleEntityChange = (e) => {        
        const selectedKodeEntity = e.target.value;        
        const selectedEntity = kodeEntities.find(entity => entity.penulisan_kode === selectedKodeEntity);        
        if (selectedEntity) {        
            const customer = customers.find(c => c.id === selectedEntity.id_customer);        
            setFormData(prev => ({        
                ...prev,        
                entity: selectedKodeEntity,        
                nama_customer: customer ? customer.nama_customer : ''        
            }));        
        }        
    };     
  
    const calculateSelisih = () => {    
        const total = parseFloat(formData.total_gdm_ditagihkan) || 0;    
        const potongan = parseFloat(formData.potongan_gdm_finance) || 0;    
        return total - potongan;    
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
        const selisih = calculateSelisih();    
        setFormData(prev => ({ ...prev, selisih })); // Update selisih in formData    
  
        try {              
            const response = await fetch(`https://audtrax.sinarjernihsuksesindo.id/backend/api/gdms/${id || ''}`, { // Gunakan PUT untuk update  
                method: id ? 'PUT' : 'POST', // Jika ID ada, gunakan PUT, jika tidak POST  
                headers: {              
                    'Content-Type': 'application/json',              
                },              
                body: JSON.stringify({ ...formData, selisih }), // Include selisih in the request    
            });              
      
            const result = await response.json();              
            if (response.ok) {              
                showToast('success', 'Data GDM berhasil disimpan!');              
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
                <h1 className="flex items-center gap-2">EDIT DATA GDM |</h1>            
                <div className="flex sm:flex-row flex-col sm:items-center sm:gap-3 gap-4 w-full sm:w-auto">            
                    <div className="flex gap-3">            
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
                                                <label htmlFor="entity">Kode Entity</label>            
                                                <select            
                                                    id="entity"            
                                                    className="form-input form-input-lg"            
                                                    value={formData.entity}            
                                                    onChange={handleEntityChange}            
                                                >            
                                                    <option value="">Pilih Kode Entity</option>            
                                                    {kodeEntities.map((entity) => (            
                                                        <option key={entity.id} value={entity.penulisan_kode}>            
                                                            {entity.penulisan_kode}            
                                                        </option>            
                                                    ))}            
                                                </select>            
                                            </div>            
                                            <div>            
                                                <label htmlFor="nama_customer">Nama Customer</label>            
                                                <input id="nama_customer" type="text" value={formData.nama_customer} readOnly className="form-input form-input-lg" />            
                                            </div>            
                                            <div>            
                                                <label htmlFor="potonganGdmFinance">Potongan GDM Finance</label>            
                                                <input id="potonganGdmFinance" name="potongan_gdm_finance" type="text" placeholder="Masukkan Potongan GDM" className="form-input form-input-lg" value={formData.potongan_gdm_finance} onChange={handleInputChange} />            
                                            </div>            
                                            <div>            
                                                <label htmlFor="totalGdmDitagihkan">Total GDM Ditagihkan</label>            
                                                <input id="totalGdmDitagihkan" name="total_gdm_ditagihkan" type="number" placeholder="Masukkan Total GDM" className="form-input form-input-lg" value={formData.total_gdm_ditagihkan} onChange={handleInputChange} />            
                                            </div>            
                                            <div>            
                                                <label htmlFor="selisih">Selisih</label>            
                                                <input id="selisih" type="number" placeholder="Masukkan Selisih" className="form-input form-input-lg" value={calculateSelisih()} readOnly />  
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
                                                Update            
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
        
export default EditDataGdm;              
