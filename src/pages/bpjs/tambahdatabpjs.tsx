import { Tab } from '@headlessui/react';    
import { Fragment, useEffect, useState } from 'react';    
import { Link } from 'react-router-dom';    
import { useDispatch } from 'react-redux';    
import { setPageTitle } from '../../store/themeConfigSlice';    
import Swal from 'sweetalert2';            
import { useNavigate } from 'react-router-dom';    
  
const TambahDataBpjs = () => {    
    const dispatch = useDispatch();    
    useEffect(() => {    
        dispatch(setPageTitle('Tambah Data BPJS'));    
    }, [dispatch]);    
    
    const [tabs, setTabs] = useState<string[]>([]);    
    const toggleCode = (name: string) => {    
        if (tabs.includes(name)) {    
            setTabs((value) => value.filter((d) => d !== name));    
        } else {    
            setTabs([...tabs, name]);    
        }    
    };    
      
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
        nomor_pengajuan: ''    
    });    
  
    const [isLoading, setIsLoading] = useState(false); // State untuk loading  
    
    const handleKodeEntityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {    
        const selectedKodeEntity = e.target.value;    
        const selectedEntity = kodeEntities.find(entity => entity.penulisan_kode === selectedKodeEntity);    
        if (selectedEntity) {    
            const customer = customers.find(c => c.id === selectedEntity.id_customer);    
            setFormData(prev => ({    
                ...prev,    
                entity: selectedKodeEntity,    
                customer_sjs_plus: customer ? customer.nama_customer : ''    
            }));    
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
        
    const handleSubmit = async (e: React.FormEvent) => {        
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
                // Panggil showToast untuk notifikasi sukses        
                showToast('success', 'Data BPJS berhasil ditambahkan!');        
                // Arahkan pengguna ke halaman /semuabpjs setelah 3 detik    
                setTimeout(() => {    
                    navigate('/bpjs/semuabpjs');    
                }, 3000); // Waktu delay sesuai dengan timer notifikasi    
            } else {        
                // Panggil showToast untuk notifikasi error        
                showToast('error', `Error: ${result.error}`);        
            }        
        } catch (error) {        
            console.error('Error submitting data:', error);        
            // Panggil showToast untuk notifikasi error jaringan        
            showToast('error', 'Terjadi kesalahan saat mengirim data!');        
        } finally {  
            setIsLoading(false); // Set loading to false after the process  
        }        
    };    
  
    useEffect(() => {    
        const fetchData = async () => {    
            try {    
                // Fetch data dari endpoint master_kodes    
                const responseMasterKodes = await fetch('https://audtrax.sinarjernihsuksesindo.id/backend/api/master_kodes');    
                const masterKodes = await responseMasterKodes.json();    
    
                // Fetch data dari endpoint pengajuans    
                const responsePengajuans = await fetch('https://audtrax.sinarjernihsuksesindo.id/backend/api/bpjs');    
                const pengajuans = await responsePengajuans.json();    
    
                // Filter entity yang belum ada di pengajuans    
                const usedKodeEntities = pengajuans.map((pengajuan) => pengajuan.kode_entity);    
                const availableKodeEntities = masterKodes.filter(    
                    (kode) => !usedKodeEntities.includes(kode.penulisan_kode)    
                );    
    
                // Simpan kode yang belum digunakan ke state    
                setKodeEntities(availableKodeEntities);    
    
                // Fetch data customers    
                const responseCustomers = await fetch('https://audtrax.sinarjernihsuksesindo.id/backend/api/customers');    
                const customersData = await responseCustomers.json();    
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
                        <Link to="#" className="btn btn-success gap-5">    
                            Import Excel    
                        </Link>    
                        <Link to="/bpjs/semuabpjs" className="btn btn-primary gap-5">    
                            Kembali ke Semua Data BPJS    
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
                                                <label htmlFor="bank">Kategori Bpjs</label>    
                                                <select id="bank" className="form-input form-input-lg" value={formData.kategori_bpjs} onChange={(e) => setFormData({ ...formData, kategori_bpjs: e.target.value })}>    
                                                    <option value="">Pilih Kategori Bpjs</option>  
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
                                                    onChange={handleKodeEntityChange}    
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
