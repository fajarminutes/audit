import { Tab } from '@headlessui/react';        
import { Fragment, useEffect, useState } from 'react';        
import { Link } from 'react-router-dom';        
import { useDispatch } from 'react-redux';        
import { setPageTitle } from '../../store/themeConfigSlice';        
import Swal from 'sweetalert2';                
import { useNavigate } from 'react-router-dom';        
import { Dialog, DialogPanel, Transition } from '@headlessui/react';  
  
const TambahDataBpjs = () => {        
    const dispatch = useDispatch();        
    useEffect(() => {        
        dispatch(setPageTitle('Tambah Data BPJS'));        
    }, [dispatch]);        
  
    const [isModalOpen, setIsModalOpen] = useState(false);    
    const navigate = useNavigate();        
    const [kodeEntities, setKodeEntities] = useState([]);        
    const [customers, setCustomers] = useState([]);        
    const [formData, setFormData] = useState({        
        kategori_bpjs: '',        
        entity: '',        
        customer_sjs_plus: '',        
        total_premi_bpjs_aktual: 0,        
        total_premi_invoice: 0,        
        penemuan: '',        
        alasan: '',        
        nama_pemberi_feedback: '',        
        solusi: '',        
        nomor_pengajuan: '',    
        bulan: '' // Tambahkan field bulan di sini    
    });        
  
    const [isLoading, setIsLoading] = useState(false); // State untuk loading      
    const [selectedFile, setSelectedFile] = useState(null); // State untuk file yang dipilih  
  
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
  
    const handleSubmit = async (e) => {            
        e.preventDefault();            
        setIsLoading(true); // Set loading to true      
        try {            
            const response = await fetch('https://audtrax.sinarjernihsuksesindo.id/backend/api/bpjs', {            
                method: 'POST',            
                headers: {            
                    'Content-Type': 'application/json',            
                },            
                body: JSON.stringify(formData), // Pastikan formData memiliki semua field yang diperlukan            
            });            
            const result = await response.json();            
            if (response.ok) {            
                showToast('success', 'Data BPJS berhasil ditambahkan!');            
                // Arahkan pengguna ke halaman /semuabpjs setelah 3 detik        
                setTimeout(() => {        
                    navigate('/bpjs/semuabpjs');        
                }, 3000); // Waktu delay sesuai dengan timer notifikasi        
            } else {            
                showToast('error', `Error: ${result.error}`);            
            }            
        } catch (error) {            
            console.error('Error submitting data:', error);            
            showToast('error', 'Terjadi kesalahan saat mengirim data!');            
        } finally {      
            setIsLoading(false); // Set loading to false after the process      
        }            
    };        
  
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
            const response = await fetch('https://audtrax.sinarjernihsuksesindo.id/backend/api/bpjs/import', {    
                method: 'POST',    
                body: formData,    
            });    
            const result = await response.json();    
            if (response.ok) {    
                showToast('success', 'Data imported successfully!');    
                setIsModalOpen(false); // Close modal after successful upload    
                // Arahkan pengguna ke halaman /semuabpjs setelah 3 detik        
                setTimeout(() => {        
                    navigate('/bpjs/semuabpjs');        
                }, 3000); // Waktu delay sesuai dengan timer notifikasi    
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
        link.href = 'URL_TO_YOUR_SAMPLE_FILE'; // Ganti dengan URL file sampel Anda  
        link.setAttribute('download', 'sample_file.xlsx'); // Nama file yang akan diunduh  
        document.body.appendChild(link);  
        link.click();  
        document.body.removeChild(link);  
    };  
  
    useEffect(() => {        
        const fetchData = async () => {        
            try {        
                // Fetch data dari endpoint master_kodes        
                const responseMasterKodes = await fetch('https://audtrax.sinarjernihsuksesindo.id/backend/api/master_kodes');        
                const masterKodes = await responseMasterKodes.json();        
  
                // Fetch data dari endpoint customers        
                const responseCustomers = await fetch('https://audtrax.sinarjernihsuksesindo.id/backend/api/customers');        
                const customersData = await responseCustomers.json();        
  
                // Simpan kode yang belum digunakan ke state        
                setKodeEntities(masterKodes);        
                setCustomers(customersData);        
            } catch (error) {        
                console.error('Error fetching data:', error);        
            }        
        };        
  
        fetchData();        
    }, []);       
  
    return (        
        <div>        
            <div className="flex items-center justify-between flex-wrap gap-4 mb-5">        
                <h1 className="flex items-center gap-2">TAMBAH DATA BPJS |</h1>        
                <div className="flex sm:flex-row flex-col sm:items-center sm:gap-3 gap-4 w-full sm:w-auto">        
                    <div className="flex gap-3">        
                        <Link to="#" className="btn btn-success gap-5" onClick={() => setIsModalOpen(true)}>    
                            Import Excel    
                        </Link>    
                        <Link to="/bpjs/semuabpjs" className="btn btn-primary gap-5">        
                            Kembali ke Semua Data BPJS        
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
                                                <label htmlFor="kategori_bpjs">Kategori BPJS</label>        
                                                <select id="kategori_bpjs" className="form-input form-input-lg" value={formData.kategori_bpjs} onChange={(e) => setFormData({ ...formData, kategori_bpjs: e.target.value })}>        
                                                    <option value="">Pilih Kategori BPJS</option>      
                                                    <option value="Bpjs Tenaga kerja">Bpjs Tenaga kerja</option>        
                                                    <option value="Bpjs Kesehatan">Bpjs Kesehatan</option>        
                                                </select>        
                                            </div>        
                                            <div>        
                                                <label htmlFor="entity">Kode Entity</label>        
                                                <select        
                                                    id="entity"        
                                                    className="form-input form-input-lg"        
                                                    value={formData.entity}        
                                                    onChange={(e) => setFormData({ ...formData, entity: e.target.value })}        
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
                                                <label htmlFor="bulan">Bulan</label>        
                                                <select        
                                                    id="bulan"        
                                                    className="form-input form-input-lg"        
                                                    value={formData.bulan}        
                                                    onChange={(e) => setFormData({ ...formData, bulan: e.target.value })}        
                                                >        
                                                    <option value="">Pilih Bulan</option>        
                                                    <option value="Januari">Januari</option>        
                                                    <option value="Februari">Februari</option>        
                                                    <option value="Maret">Maret</option>        
                                                    <option value="April">April</option>        
                                                    <option value="Mei">Mei</option>        
                                                    <option value="Juni">Juni</option>        
                                                    <option value="Juli">Juli</option>        
                                                    <option value="Agustus">Agustus</option>        
                                                    <option value="September">September</option>        
                                                    <option value="Oktober">Oktober</option>        
                                                    <option value="November">November</option>        
                                                    <option value="Desember">Desember</option>        
                                                </select>        
                                            </div>      
                                            <div>        
                                                <label htmlFor="inputSmall">Customer SJS+</label>        
                                                <input id="inputLarge" type="text" value={formData.customer_sjs_plus} readOnly className="form-input form-input-lg" />        
                                            </div>        
                                            <div>        
                                                <label htmlFor="inputSmall">Total Premi BPJS Aktual</label>        
                                                <input id="inputLarge" type="number" placeholder="Masukan Premi Aktual" className="form-input form-input-lg" value={formData.total_premi_bpjs_aktual} onChange={(e) => setFormData({ ...formData, total_premi_bpjs_aktual: Number(e.target.value) })} />        
                                            </div>        
                                            <div>        
                                                <label htmlFor="inputSmall">Total Premi Invoice</label>        
                                                <input id="inputLarge" type="number" placeholder="Total Premi Invoice" className="form-input form-input-lg" value={formData.total_premi_invoice} onChange={(e) => setFormData({ ...formData, total_premi_invoice: Number(e.target.value) })} />        
                                            </div>        
                                            <div>        
                                                <label htmlFor="inputSmall">Selisih</label>        
                                                <input id="inputLarge" type="number" placeholder="Masukan Selisih" className="form-input form-input-lg" value={formData.total_premi_invoice - formData.total_premi_bpjs_aktual} readOnly />        
                                            </div>        
                                            <div className="form-container">        
                                                <label htmlFor="penemuan">Penemuan</label>        
                                                <textarea        
                                                    id="penemuan"        
                                                    name="penemuan"        
                                                    placeholder="Masukkan penemuan"        
                                                    rows="4"        
                                                    cols="38"        
                                                    value={formData.penemuan}        
                                                    onChange={(e) => setFormData({ ...formData, penemuan: e.target.value })}        
                                                ></textarea>        
                                            </div>        
                                            <div className="form-container">        
                                                <label htmlFor="alasan">Alasan</label>        
                                                <textarea        
                                                    id="alasan"        
                                                    name="alasan"        
                                                    placeholder="Masukkan Alasan"        
                                                    rows="4"        
                                                    cols="38"        
                                                    value={formData.alasan}        
                                                    onChange={(e) => setFormData({ ...formData, alasan: e.target.value })}        
                                                ></textarea>        
                                            </div>        
                                            <div>        
                                                <label htmlFor="inputSmall">Nama Pemberi Feedback</label>        
                                                <input id="inputLarge" type="text" placeholder="Masukan Nama Pemberi Feedback" className="form-input form-input-lg" value={formData.nama_pemberi_feedback} onChange={(e) => setFormData({ ...formData, nama_pemberi_feedback: e.target.value })} />        
                                            </div>        
                                            <div className="form-container">        
                                                <label htmlFor="solusi">Solusi</label>        
                                                <textarea        
                                                    id="solusi"        
                                                    name="solusi"        
                                                    placeholder="Masukkan solusi jika ada"        
                                                    rows="4"        
                                                    cols="40"        
                                                    value={formData.solusi}        
                                                    onChange={(e) => setFormData({ ...formData, solusi: e.target.value })}        
                                                ></textarea>        
                                            </div>        
                                        </div>        
                                        <div className="d-flex justify-content-end mt-5">        
                                            <button type="submit" className="btn btn-primary gap-5" disabled={isLoading}>        
                                                {isLoading ? 'Loading...' : 'Submit'}        
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
  
export default TambahDataBpjs;        
