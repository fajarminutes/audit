import { useEffect, useState, Fragment } from 'react';  
import { useDispatch } from 'react-redux';  
import { setPageTitle } from '../../store/themeConfigSlice';  
import Select from 'react-select';  
import axios from 'axios';  
import { useNavigate } from 'react-router-dom';  
import { Dialog, DialogPanel, Transition } from '@headlessui/react';  
import { Link } from 'react-router-dom';              
import Swal from 'sweetalert2';   
  
const TambahPenggajian = () => {  
    const navigate = useNavigate();  
    const [isLoading, setIsLoading] = useState(false);      
    const [isModalOpen, setIsModalOpen] = useState(false);  
    const dispatch = useDispatch();  
    const [isLoadingTambah, setIsLoadingTambah] = useState(false);  

    const [kodeEntities, setKodeEntities] = useState([]);   
    const [usedKodeEntities, setUsedKodeEntities] = useState([]);   
    const [formData, setFormData] = useState({  
        kode_payroll: '',  
        periode: '',  
        kode_entity: [],  
        jumlah_karyawan: 0,  
        total_pengajuan: 0,  
        total_gaji: '',  
        sisa_gaji: 0,  
        status_payrolls: 'setuju',  
    });  
  
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
  
    useEffect(() => {  
        const fetchPayrollData = async () => {  
            try {  
                const response = await axios.get('https://audtrax.sinarjernihsuksesindo.id/backend/api/payrolls');  
                const payrolls = response.data;  
                const newKodePayroll = `PR${String(payrolls.length + 1).padStart(5, '0')}`;  
                setFormData((prev) => ({ ...prev, kode_payroll: newKodePayroll }));  
            } catch (error) {  
                console.error('Error fetching payroll data:', error);  
            }  
        };  
        fetchPayrollData();  
    }, []);  
  
    
    useEffect(() => {  
        dispatch(setPageTitle('Tambah Penggajian'));  
  
        // Fetch kode entity yang sudah digunakan  
        axios.get('https://audtrax.sinarjernihsuksesindo.id/backend/api/payrolls')  
            .then((response) => {  
                const data = response.data;  
                const usedEntities = data.map((item) => JSON.parse(item.kode_entity)).flat();  
                setUsedKodeEntities(usedEntities);  
            })  
            .catch((error) => {  
                console.error('Error fetching used kode_entity:', error);  
            });  
  
        // Fetch semua kode_entity dari master_kodes  
        axios.get('https://audtrax.sinarjernihsuksesindo.id/backend/api/master_kodes')  
            .then((response) => {  
                const data = response.data;  
                const options = data.map((item) => ({  
                    value: item.penulisan_kode,  
                    label: item.penulisan_kode,  
                }));  
                setKodeEntities(options);  
            })  
            .catch((error) => {  
                console.error('Error fetching kode_entity:', error);  
            });  
    }, [dispatch]);  
    
  

  
// Ambil data pengajuan      
const [pengajuanData, setPengajuanData] = useState([]);      
useEffect(() => {      
    const fetchPengajuanData = async () => {      
        try {      
            const response = await axios.get('https://audtrax.sinarjernihsuksesindo.id/backend/api/pengajuans');      
            setPengajuanData(response.data);      
        } catch (error) {      
            console.error('Error fetching pengajuan data:', error);      
        }      
    };      
    fetchPengajuanData();      
}, []);      
  
// Ambil data payrolls untuk mendapatkan kode_payroll yang sudah ada  
const [payrollsData, setPayrollsData] = useState([]);  
useEffect(() => {  
    const fetchPayrollsData = async () => {  
        try {  
            const response = await axios.get('https://audtrax.sinarjernihsuksesindo.id/backend/api/payrolls');  
            setPayrollsData(response.data);  
        } catch (error) {  
            console.error('Error fetching payrolls data:', error);  
        }  
    };  
    fetchPayrollsData();  
}, []);  
  
// Ambil opsi untuk dropdown kode_payroll      
// Ambil opsi untuk dropdown kode_payroll        
const payrollOptions = [...new Set(  
    pengajuanData  
        .filter(p => !payrollsData.some(payroll => payroll.kode_payroll === p.nomor_pengajuan))  
        .map(p => p.nomor_pengajuan)  
)] // Menggunakan Set untuk menghilangkan duplikasi  
.map(nomor => ({  
    value: nomor,  
    label: nomor,  
}));  

  
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
            const response = await fetch('https://audtrax.sinarjernihsuksesindo.id/backend/api/payrolls/import', {    
                method: 'POST',    
                body: formData,    
            });    
            const result = await response.json();    
            if (response.ok) {    
                showToast('success', 'Data imported successfully!');    
                setIsModalOpen(false);     
                   
                setTimeout(() => {        
                    navigate('/penggajian/semuapenggajian');        
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

    const downloadSampleFile = () => {  
        const link = document.createElement('a');  
        link.href = '/PENGGAJIAN.xlsx';  
        link.setAttribute('download', 'sample_file_Penggajian.xlsx'); 
        document.body.appendChild(link);  
        link.click();  
        document.body.removeChild(link);  
    };  
  
    // Update formData ketika kode_payroll berubah    
useEffect(() => {    
  const selectedPengajuan = pengajuanData.filter(p => p.nomor_pengajuan === formData.kode_payroll);    
  if (selectedPengajuan.length > 0) {    
      const totalPengajuan = selectedPengajuan.reduce((acc, curr) => acc + curr.total_pengajuan, 0);    
      const uniqueEntities = [...new Set(selectedPengajuan.map(p => p.kode_entity))];    

      setFormData(prev => ({    
          ...prev,        
          kode_entity: uniqueEntities, // Ambil kode_entity yang unik    
          total_pengajuan: totalPengajuan,    
          jumlah_karyawan: selectedPengajuan.length, // Hitung jumlah pengajuan    
          sisa_gaji: totalPengajuan - (prev.total_gaji || 0), // Hitung sisa gaji    
      }));    
  }    
}, [formData.kode_payroll, pengajuanData, formData.total_gaji]); // Tambahkan formData.total_gaji sebagai dependensi  

  
    // Handle perubahan input  
    const handleChange = (e) => {  
        const { id, value } = e.target;  
        setFormData((prev) => ({  
            ...prev,  
            [id]: value,  
        }));  
    };  
  
    // Handle perubahan kode_payroll (React Select)  
    const handlePayrollChange = (selectedOption) => {  
        setFormData((prev) => ({  
            ...prev,  
            kode_payroll: selectedOption ? selectedOption.value : '',  
            kode_entity: [], // Reset kode_entity saat memilih kode_payroll baru  
        }));  
    };  
  
    // Handle perubahan kode_entity (React Select)  
    const handleEntityChange = (selectedOptions) => {  
        setFormData((prev) => ({  
            ...prev,  
            kode_entity: selectedOptions ? selectedOptions.map((option) => option.value) : [],  
        }));  
    };  
  
    // Handle submit form  
    const handleSubmit = (e) => {    
        e.preventDefault();    
        setIsLoadingTambah(true); // Set loading true  
          
        axios.post('https://audtrax.sinarjernihsuksesindo.id/backend/api/payrolls', {    
            ...formData,    
            kode_entity: JSON.stringify(formData.kode_entity),    
        })    
        .then(() => {    
            showToast('success', 'Payroll berhasil ditambahkan!');            
            setTimeout(() => {            
                navigate('/penggajian/semuapenggajian');            
            }, 3000);    
        })    
        .catch((error) => {    
            console.error('Error creating payroll:', error);    
            showToast('error', 'Gagal menambahkan payroll. Silakan coba lagi.');            
        })    
        .finally(() => {  
            setIsLoadingTambah(false); // Set loading false  
        });  
    };  
 
  
    return (  
        <div>  
            <div className="flex items-center justify-between flex-wrap gap-4 mb-5">  
                <h1 className="flex items-center gap-2">Tambah Payroll Baru |</h1>  
                <div className="flex gap-3">          
                    <Link to="#" className="btn btn-success gap-5" onClick={() => setIsModalOpen(true)}>      
                        Import Excel      
                    </Link>    
                    <Link to="/penggajian/semuapenggajian" className="btn btn-primary gap-5">            
                        Kembali            
                    </Link>            
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
                <form className="p-4" onSubmit={handleSubmit}>  
                    <div className="mb-4">  
                        <label htmlFor="kode_payroll" className="block text-sm font-medium text-gray-700">  
                            Kode Payroll  
                        </label>  
                        <Select  
    options={payrollOptions} // Gunakan payrollOptions yang sudah difilter  
    onChange={handlePayrollChange}  
    className="react-select-container"  
    classNamePrefix="react-select"  
    placeholder="Pilih Nomor Pengajuan"  
/>  

                    </div>  
                    <div className="mb-4">  
                        <label htmlFor="periode" className="block text-sm font-medium text-gray-700">  
                            Periode  
                        </label>  
                        <input  
                            id="periode"  
                            type="date"  
                            className="form-input form-input-lg"  
                            value={formData.periode}  
                            onChange={handleChange}  
                            required  
                        />  
                    </div>  
                    <div className="mb-4">  
                        <label htmlFor="kode_entity" className="block text-sm font-medium text-gray-700">  
                            Kode Entity  
                        </label>  
                        <input  
                            id="kode_entity"  
                            type="text"  
                            className="form-input form-input-lg"  
                            value={formData.kode_entity.join(', ')} // Tampilkan kode_entity yang dipilih  
                            readOnly  
                        />  
                    </div>  
                    <div className="mb-4">  
                        <label htmlFor="jumlah_karyawan" className="block text-sm font-medium text-gray-700">  
                            Jumlah Karyawan  
                        </label>  
                        <input  
                            id="jumlah_karyawan"  
                            type="number"  
                            className="form-input form-input-lg"  
                            value={formData.jumlah_karyawan}  
                            readOnly  
                        />  
                    </div>  
                    <div className="mb-4">  
                        <label htmlFor="total_pengajuan" className="block text-sm font-medium text-gray-700">  
                            Total Pengajuan  
                        </label>  
                        <input  
                            id="total_pengajuan"  
                            type="number"  
                            className="form-input form-input-lg"  
                            value={formData.total_pengajuan}  
                            readOnly  
                        />  
                    </div>  
                    <div className="mb-4">  
                        <label htmlFor="total_gaji" className="block text-sm font-medium text-gray-700">  
                            Total Gaji Proses
                        </label>  
                        <input  
                            id="total_gaji"  
                            type="number"  
                            className="form-input form-input-lg"  
                            value={formData.total_gaji}  
                            onChange={handleChange}  
                            required  
                        />  
                    </div>  
                    <div className="mb-4">  
                        <label htmlFor="sisa_gaji" className="block text-sm font-medium text-gray-700">  
                            Sisa Gaji  
                        </label>  
                        <input  
                            id="sisa_gaji"  
                            type="number"  
                            className="form-input form-input-lg"  
                            value={formData.sisa_gaji}  
                            readOnly  
                        />  
                    </div>  
                    <div className="mb-4">  
                        <label htmlFor="status_payrolls" className="block text-sm font-medium text-gray-700">  
                            Status  
                        </label>  
                        <select  
                            id="status_payrolls"  
                            className="form-input form-input-lg"  
                            value={formData.status_payrolls}  
                            onChange={handleChange}  
                            required  
                        >  
                            <option value="setuju">Disetujui</option>  
                            <option value="tolak">Tidak Disetujui</option>  
                        </select>  
                    </div>  
                    <button type="submit" className="btn btn-primary" disabled={isLoadingTambah}>  
       {isLoadingTambah ? 'Loading...' : 'Submit'}  
   </button>  

                </form>  
            </div>  
        </div>  
    );  
};  
  
export default TambahPenggajian;  
