import { useEffect, useState } from 'react';        
import { useDispatch } from 'react-redux';        
import { setPageTitle } from '../../store/themeConfigSlice';        
import Select from 'react-select';        
import axios from 'axios';        
import { useNavigate, useParams } from 'react-router-dom';        
import Swal from 'sweetalert2';         
import { Link } from 'react-router-dom';                  
  
const EditPenggajian = () => {        
    const { id } = useParams(); // Ambil id dari URL      
    const navigate = useNavigate();        
    const dispatch = useDispatch();        
    const [isLoading, setIsLoading] = useState(false);  

    const [kodeEntities, setKodeEntities] = useState([]);         
    const [payrollOptions, setPayrollOptions] = useState([]); // State untuk payrollOptions    
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
        dispatch(setPageTitle('Edit Penggajian'));        
  
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
  
        // Fetch data pengajuan untuk mendapatkan kode_payroll      
        const fetchPengajuanData = async () => {            
            try {            
                const response = await axios.get('https://audtrax.sinarjernihsuksesindo.id/backend/api/pengajuans');            
                const pengajuanData = response.data;            
               // Ambil opsi untuk dropdown kode_payroll        
const payrollOptions = [...new Set(pengajuanData.map(p => p.nomor_pengajuan))] // Menggunakan Set untuk menghilangkan duplikasi  
.map(nomor => ({    
    value: nomor,    
    label: nomor,    
}));  

                setPayrollOptions(payrollOptions); // Set payrollOptions ke state      
            } catch (error) {            
                console.error('Error fetching pengajuan data:', error);            
            }            
        };            
        fetchPengajuanData();        
    }, [dispatch]);        
  
    useEffect(() => {  
        const fetchPayrollData = async () => {  
            try {  
                const response = await axios.get(`https://audtrax.sinarjernihsuksesindo.id/backend/api/payrolls/${id}`);  
                const payroll = response.data;  
      
                // Set form data  
                setFormData({  
                    kode_payroll: payroll.kode_payroll,  
                    periode: payroll.periode.split('T')[0],  
                    kode_entity: JSON.parse(payroll.kode_entity),  
                    jumlah_karyawan: payroll.jumlah_karyawan,  
                    total_pengajuan: payroll.total_pengajuan, // Set awal ke total_pengajuan dari payroll  
                    total_gaji: payroll.total_gaji,  
                    sisa_gaji: payroll.sisa_gaji,  
                    status_payrolls: payroll.status_payrolls,  
                });  
      
                // Fetch data pengajuan berdasarkan kode_payroll  
                const pengajuanResponse = await axios.get('https://audtrax.sinarjernihsuksesindo.id/backend/api/pengajuans');  
                const pengajuanData = pengajuanResponse.data.filter(p => p.nomor_pengajuan === payroll.kode_payroll);  
      
                // Hitung total_pengajuan  
                const totalPengajuan = pengajuanData.reduce((acc, curr) => acc + curr.total_pengajuan, 0);  
                setFormData(prev => ({  
                    ...prev,  
                    total_pengajuan: totalPengajuan, // Set total_pengajuan  
                }));  
      
            } catch (error) {  
                console.error('Error fetching payroll data:', error);  
            }  
        };  
      
        fetchPayrollData();  
    }, [id]); // Hanya id sebagai dependency  
            
  
    // Handle perubahan input        
    const handleChange = (e) => {  
        const { id, value } = e.target;  
        setFormData((prev) => {  
            const updatedData = { ...prev, [id]: value };  
      
            // Jika yang diubah adalah total_gaji, hitung sisa_gaji  
            if (id === 'total_gaji') {  
                updatedData.sisa_gaji = updatedData.total_pengajuan - value; // Hitung sisa_gaji  
            }  
      
            return updatedData;  
        });  
    };  
       
  
    // Handle perubahan kode_payroll (React Select)        
    const handlePayrollChange = async (selectedOption) => {  
        if (selectedOption) {  
            const selectedNomorPengajuan = selectedOption.value;  
      
            // Fetch data pengajuan berdasarkan nomor_pengajuan  
            const response = await axios.get('https://audtrax.sinarjernihsuksesindo.id/backend/api/pengajuans');  
            const pengajuanData = response.data.filter(p => p.nomor_pengajuan === selectedNomorPengajuan);  
      
            // Hitung total_pengajuan  
            const totalPengajuan = pengajuanData.reduce((acc, curr) => acc + curr.total_pengajuan, 0);  
      
            const uniqueEntities = [...new Set(pengajuanData.map(p => p.kode_entity))];  
            const jumlahKaryawan = uniqueEntities.length;  
      
            setFormData(prev => ({  
                ...prev,  
                kode_payroll: selectedNomorPengajuan,  
                kode_entity: uniqueEntities,  
                total_pengajuan: totalPengajuan, // Set total_pengajuan  
                jumlah_karyawan: jumlahKaryawan,  
                sisa_gaji: totalPengajuan - (prev.total_gaji || 0), // Hitung sisa gaji  
            }));  
        }  
    };  
    
            
  
    // Handle submit form        
    const handleSubmit = (e) => {          
        e.preventDefault();          
        setIsLoading(true); // Set loading menjadi true saat proses dimulai  
      
        axios.put(`https://audtrax.sinarjernihsuksesindo.id/backend/api/payrolls/${id}`, {          
            ...formData,          
            kode_entity: JSON.stringify(formData.kode_entity),          
        })          
        .then(() => {          
            showToast('success', 'Payroll berhasil diperbarui!');                  
            setTimeout(() => {                  
                navigate('/penggajian/semuapenggajian');                  
            }, 2000);          
        })          
        .catch((error) => {          
            console.error('Error updating payroll:', error);          
            showToast('error', 'Gagal memperbarui payroll. Silakan coba lagi.');                  
        })          
        .finally(() => {  
            setIsLoading(false); // Set loading menjadi false setelah proses selesai  
        });  
    };  
          
  
    return (        
        <div>        
            <div className="flex items-center justify-between flex-wrap gap-4 mb-5">        
                <h1 className="flex items-center gap-2">Edit Payroll |</h1>        
                <div className="flex gap-3">                
                 
                    <Link to="/penggajian/semuapenggajian" className="btn btn-primary gap-5">                  
                        Kembali                  
                    </Link>                  
                </div>            
            </div>        
            <div className="panel" id="simple">        
                <form className="p-4" onSubmit={handleSubmit}>        
                    <div className="mb-4">        
                        <label htmlFor="kode_payroll" className="block text-sm font-medium text-gray-700">        
                            Kode Payroll        
                        </label>        
                        <Select          
       options={payrollOptions} // Gunakan payrollOptions yang sudah diambil          
       onChange={handlePayrollChange}          
       className="react-select-container"          
       classNamePrefix="react-select"          
       placeholder="Pilih Nomor Pengajuan"          
       value={payrollOptions.find(option => option.value === formData.kode_payroll)} // Set nilai yang sesuai  
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
                    <div className="flex justify-start mt-3">          
    <button type="submit" className="btn btn-primary" disabled={isLoading}>          
        {isLoading ? 'Loading...' : 'Update'}          
    </button>          
</div>  
      
                </form>        
            </div>        
        </div>        
    );        
};        
  
export default EditPenggajian;        
