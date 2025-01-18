import { Tab } from '@headlessui/react';            
import { useEffect, useState, Fragment } from 'react';            
import { useDispatch } from 'react-redux';            
import { setPageTitle } from '../../store/themeConfigSlice';   
import { Link } from 'react-router-dom';            
import Swal from 'sweetalert2';                    
import { useNavigate } from 'react-router-dom';      
import { Dialog, DialogPanel, Transition } from '@headlessui/react';

    
const TambahDataGdm = () => {            
    const dispatch = useDispatch();            
    const navigate = useNavigate();            
    const [kodeEntities, setKodeEntities] = useState([]);            
    const [customers, setCustomers] = useState([]);   
    const [isLoading, setIsLoading] = useState(false);    
    const [isModalOpen, setIsModalOpen] = useState(false);  

    const [formData, setFormData] = useState({                
        entity: '',            
        potongan_gdm_finance: '',            
        nama_customer: '',            
        total_gdm_ditagihkan: '',            
       
        status: 'Pending',            
        keterangan: '',            
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
        } catch (error) {            
            console.error('Error fetching data:', error);            
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
            selisih: calculateSelisih(), // Update selisih whenever input changes  
        }));  
    };  
  
    const handleSubmit = async (e) => {            
        e.preventDefault();            
        const selisih = calculateSelisih();  
        setFormData(prev => ({ ...prev, selisih })); // Update selisih in formData  
  
        try {            
            const response = await fetch('https://audtrax.sinarjernihsuksesindo.id/backend/api/gdms', {            
                method: 'POST',            
                headers: {            
                    'Content-Type': 'application/json',            
                },            
                body: JSON.stringify({ ...formData, selisih }), // Include selisih in the request  
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
    
    const downloadSampleFile = () => {  
        const link = document.createElement('a');  
        link.href = '/GDM.xlsx';  
        link.setAttribute('download', 'sample_file_Gdm.xlsx'); 
        document.body.appendChild(link);  
        link.click();  
        document.body.removeChild(link);  
    };  
     
    const [selectedFile, setSelectedFile] = useState(null);  
  
    const handleFileChange = (e) => {  
        setSelectedFile(e.target.files[0]);  
    };  
      
    const handleFileUpload = async () => {    
        if (!selectedFile) {    
            showToast('error', 'Please select a file to upload.');    
            return;    
        }    
  
        const formData = new FormData();    
        formData.append('file', selectedFile);    
  
        setIsLoading(true);    
        try {    
            const response = await fetch('https://audtrax.sinarjernihsuksesindo.id/backend/api/gdms/import', {    
                method: 'POST',    
                body: formData,    
            });    
            const result = await response.json();    
            if (response.ok) {    
                showToast('success', 'Data imported successfully!');    
                setIsModalOpen(false);     
                   
                setTimeout(() => {        
                    navigate('/gajidimuka/semuadatagdm');        
                }, 3000);    
            } else {    
                showToast('error', `Error: ${result.error}`);    
            }    
        } catch (error) {    
            console.error('Error uploading file:', error);    
            showToast('error', 'Failed to upload file.');    
        } finally {    
            setIsLoading(false);    
        }    
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
             {/* Modal untuk Import Excel */}  
                      <Transition appear show={isModalOpen} as={Fragment}>  
                            <Dialog as="div" open={isModalOpen} onClose={() => setIsModalOpen(false)}>  
                                <div className="fixed inset-0 z-[999] overflow-y-auto bg-[black]/60">  
                                    <div className="flex min-h-screen items-center justify-center px-4">  
                                        <Transition.Child  
                                            as={Fragment}  
                                            enter="ease-out duration-300"  
                                            enterFrom="opacity-0 scale-95"  
                                            enterTo="opacity-100 scale-100"  
                                            leave="ease-in duration-200"  
                                            leaveFrom="opacity-100 scale-100"  
                                            leaveTo="opacity-0 scale-95"  
                                        >  
                                            <DialogPanel as="div" className="panel my-8 w-full max-w-lg overflow-hidden rounded-lg border-0 p-0 text-black dark:text-white-dark">  
                                                <div className="flex items-center justify-between bg-[#fbfbfb] px-5 py-3 dark:bg-[#121c2c]">  
                                                    <h5 className="text-lg font-bold">Import Excel</h5>  
                                                    <button type="button" className="text-white-dark hover:text-dark" onClick={() => setIsModalOpen(false)}>  
                                                        &times;  
                                                    </button>  
                                                </div>  
                                                <div className="p-5">  
                                                    <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} />    
                                                    <p onClick={downloadSampleFile} style={{ cursor: 'pointer', color: 'blue' }}>Download File Sampel</p>    
                                                    <button onClick={handleFileUpload} className="btn btn-primary mt-3" disabled={isLoading}>  
                                                        {isLoading ? 'Uploading...' : 'Upload'}  
                                                    </button>    
                                                </div>  
                                            </DialogPanel>  
                                        </Transition.Child>  
                                    </div>  
                                </div>  
                            </Dialog>  
                        </Transition>
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
