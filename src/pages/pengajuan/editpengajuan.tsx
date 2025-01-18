// EditPengajuan Component
import { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../store/themeConfigSlice';
import { PengajuanRequest } from '../../types/PengajuanType';
import Swal from 'sweetalert2';
const EditPengajuan = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const [formData, setFormData] = useState<PengajuanRequest>({
        kode_entity: '',
        nomor_pengajuan: '',
        tanggal: '',
        nama_customer: '',
        nop: '',
        mf_5_percent: 0,
        bpjs_tk_4_24_percent: 0,
        bpjs_tk_2_percent: 0,
        pensiun_2_percent: 0,
        pensiun_1_percent: 0,
        bpjs_kes_4_percent: 0,
        bpjs_kes_1_percent: 0,
        pph21: 0,
        ppn_percent: 0,
        pot_talangan_cicilan: 0,
        pot_gaji_dimuka: 0,
        pot_privy_id: 0,
        pengajuan_umum_lain2: [],
        subtotal_pengajuan_umum: 0,
        adjustment: 0,
        pph23: 0,
        subtotal_adjustment: 0,
        asset_non_penggajian: [],
        total_3: 0,
        gaji_gross_pph: 0,
        kompensasi_pph: 0,
        gaji_gross_non_pph: 0,
        data_bank: [],
        cash: 0,
        total_bank: 0,
        total_invoice: 0,
        total_pengajuan: 0,
        selisih_a: 0,
        selisih_b: 0,
        title: '',
        balance: 0,
    });

    useEffect(() => {
        const {
            mf_5_percent,
            bpjs_tk_4_24_percent,
            bpjs_tk_2_percent,
            pensiun_2_percent,
            pensiun_1_percent,
            bpjs_kes_4_percent,
            bpjs_kes_1_percent,
            pph21,
            ppn_percent,
            pot_talangan_cicilan,
            pot_gaji_dimuka,
            pot_privy_id,
            pengajuan_umum_lain2,
            adjustment,
            pph23,
            selisih_a,
            asset_non_penggajian,
        } = formData;
    
        // Pastikan setiap nilai dikonversi ke angka
        const totalI =
            Number(mf_5_percent || 0) +
            Number(bpjs_tk_4_24_percent || 0) +
            Number(bpjs_tk_2_percent || 0) +
            Number(pensiun_2_percent || 0) +
            Number(pensiun_1_percent || 0) +
            Number(bpjs_kes_4_percent || 0) +
            Number(bpjs_kes_1_percent || 0) +
            Number(pph21 || 0) +
            Number(ppn_percent || 0) +
            Number(pot_talangan_cicilan || 0) +
            Number(pot_gaji_dimuka || 0) +
            Number(pot_privy_id || 0) +
            pengajuan_umum_lain2.reduce((sum, item) => sum + Number(item.nominal || 0), 0);
    
        const totalII = Number(adjustment || 0) + Number(pph23 || 0);
    
        const selisihB = totalI - totalII;
    
        const balance = Number(selisih_a || 0) - selisihB;
    
        const totalIII = asset_non_penggajian.reduce((sum, item) => sum + Number(item.nominal || 0), 0);
    
        setFormData((prev) => ({
            ...prev,
            subtotal_pengajuan_umum: totalI,
            subtotal_adjustment: totalII,
            selisih_b: selisihB,
            balance: balance,
            total_3: totalIII,
        }));
    }, [
        formData.mf_5_percent,
        formData.bpjs_tk_4_24_percent,
        formData.bpjs_tk_2_percent,
        formData.pensiun_2_percent,
        formData.pensiun_1_percent,
        formData.bpjs_kes_4_percent,
        formData.bpjs_kes_1_percent,
        formData.pph21,
        formData.ppn_percent,
        formData.pot_talangan_cicilan,
        formData.pot_gaji_dimuka,
        formData.pot_privy_id,
        formData.pengajuan_umum_lain2,
        formData.adjustment,
        formData.pph23,
        formData.selisih_a,
        formData.asset_non_penggajian,
    ]);

    const [kodeEntities, setKodeEntities] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [isOpen, setIsOpen] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);
    const [tanggal, setTanggal] = useState<Date | null>(null);
    const [noUrut, setNoUrut] = useState(1); // Tambahkan state untuk nomor urutan  


    useEffect(() => {
        dispatch(setPageTitle('Edit Pengajuan'));
        const fetchInitialData = async () => {
            try {
                const response = await fetch(`https://audtrax.sinarjernihsuksesindo.id/backend/api/pengajuans/${id}`);
                const pengajuanData = await response.json();
                setFormData(pengajuanData);
                setTanggal(new Date(pengajuanData.tanggal));

                const [kodeResponse, customerResponse] = await Promise.all([
                    fetch('https://audtrax.sinarjernihsuksesindo.id/backend/api/master_kodes'),
                    fetch('https://audtrax.sinarjernihsuksesindo.id/backend/api/customers'),
                ]);

                setKodeEntities(await kodeResponse.json());
                setCustomers(await customerResponse.json());
            } catch (err) {
                console.error('Error fetching data:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchInitialData();
    }, [id, dispatch]);

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                // Fetch data pengajuan saat ini berdasarkan ID
                const responsePengajuan = await fetch(`https://audtrax.sinarjernihsuksesindo.id/backend/api/pengajuans/${id}`);
                const pengajuanData = await responsePengajuan.json();
    
                // Ambil tanggal dalam format Date
                const parsedDate = pengajuanData.tanggal ? new Date(pengajuanData.tanggal) : null;
    
                setFormData({
                    ...pengajuanData,
                    tanggal: parsedDate ? formatDate(parsedDate) : '', // Format ke YYYY-MM-DD
                });
                setTanggal(parsedDate); // Simpan tanggal sebagai Date untuk date picker
    
                // Fetch data master_kodes dan pengajuans secara paralel
                const [kodeResponse, pengajuanResponse, customerResponse] = await Promise.all([
                    fetch('https://audtrax.sinarjernihsuksesindo.id/backend/api/master_kodes'),
                    fetch('https://audtrax.sinarjernihsuksesindo.id/backend/api/pengajuans'),
                    fetch('https://audtrax.sinarjernihsuksesindo.id/backend/api/customers'),
                ]);
    
                const kodeEntities = await kodeResponse.json(); // Semua kode entity
                const pengajuans = await pengajuanResponse.json(); // Semua pengajuan
                const customers = await customerResponse.json(); // Semua customers
    
                setCustomers(customers); // Simpan data customer
    
                // Dapatkan kode entity yang sudah digunakan, kecuali milik pengajuan ini
                const usedKodeEntities = pengajuans
                    .filter((pengajuan) => pengajuan.id !== id) // Kecualikan pengajuan saat ini
                    .map((pengajuan) => pengajuan.kode_entity);
    
                // Filter kode entity yang belum digunakan atau yang dipakai pengajuan saat ini
                const availableKodeEntities = kodeEntities.filter(
                    (kode) => !usedKodeEntities.includes(kode.penulisan_kode) || kode.penulisan_kode === pengajuanData.kode_entity
                );
    
                setKodeEntities(availableKodeEntities); // Simpan kode entity yang tersedia
            } catch (err) {
                console.error('Error fetching data:', err);
            } finally {
                setLoading(false); // Hentikan loading
            }
        };
    
        fetchInitialData();
    }, [id]);
    
    
    
    

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedDate = new Date(e.target.value); // Format input date sudah dalam YYYY-MM-DD
        setTanggal(selectedDate);
        setFormData((prev) => ({
            ...prev,
            tanggal: e.target.value, // Langsung gunakan nilai input
            nomor_pengajuan: formatNomorPengajuan(selectedDate),
        }));
    };
    

   // Fungsi untuk mengupdate formData  
   const handleInputChange = (e) => {    
    const { id, value } = e.target;    
  
    // Menghapus format rupiah sebelum menyimpan ke state  
    const numericValue = value.replace(/\./g, '').replace(/,/g, '.'); // Menghapus titik dan mengganti koma dengan titik  
    const newValue = id.includes('percent') || id.includes('nominal') || id.includes('total') || id.includes('gaji') || id.includes('balance') ? Number(numericValue) : value;    
  
    setFormData((prev) => ({    
        ...prev,    
        [id]: newValue // Update nilai berdasarkan id    
    }));    
  
    // Update nomor_pengajuan jika id adalah no_urut  
    if (id === 'no_urut') {  
        setNoUrut(newValue); // Update state noUrut  
        setFormData((prev) => ({  
            ...prev,  
            nomor_pengajuan: formatNomorPengajuan(tanggal) + `-${newValue}` // Update nomor_pengajuan  
        }));  
    }  
  
    // Recalculate selisih_a jika total_invoice atau total_pengajuan berubah    
    if (id === 'total_invoice' || id === 'total_pengajuan') {    
        setFormData((prev) => ({    
            ...prev,    
            selisih_a: calculateSelisihA(prev.total_invoice, prev.total_pengajuan)    
        }));    
    }    
}; 

    const handleKodeEntityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedKodeEntity = e.target.value;
        const entity = kodeEntities.find((item) => item.penulisan_kode === selectedKodeEntity);
        const customer = customers.find((item) => item.id === entity?.id_customer);
        setFormData((prev) => ({
            ...prev,
            kode_entity: selectedKodeEntity,
            nama_customer: customer?.nama_customer || '',
        }));
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
    
        // Set isSubmitting menjadi true untuk mencegah klik ganda
        setIsSubmitting(true);
    
        try {
            const response = await fetch(`https://audtrax.sinarjernihsuksesindo.id/backend/api/pengajuans/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
    
            if (!response.ok) throw new Error('Failed to update Pengajuan');
    
            // Panggil showToast untuk notifikasi sukses  
            showToast('success', 'Data berhasil diperbarui!');  
            // Arahkan pengguna ke halaman daftar pengguna setelah 3 detik  
            setTimeout(() => {  
                navigate('/pengajuan/semuapengajuan'); // Ganti dengan rute yang sesuai  
            }, 1500); // Waktu delay sesuai dengan timer notifikasi  
        } catch (err) {
            console.error('Error updating pengajuan:', err);
            alert('Failed to update Pengajuan. Please try again.');
        } finally {
            // Set isSubmitting kembali menjadi false setelah selesai
            setIsSubmitting(false);
        }
    };
    

    const addDataBank = () => {
        setFormData((prev) => ({
            ...prev,
            data_bank: [...prev.data_bank, { bank_name: '', jumlah: 0 }]
        }));
    };
    
    const removeDataBank = (index: number) => {
        setFormData((prev) => {
            const newDataBank = prev.data_bank.filter((_, i) => i !== index);
            return {
                ...prev,
                data_bank: newDataBank,
                total_pengajuan: calculateTotal(newDataBank), // Recalculate total
                total_bank: calculateTotal(newDataBank), // Recalculate total
                selisih_a: calculateSelisihA(prev.total_invoice, calculateTotal(newDataBank)) // Recalculate selisih_a
            };
        });
    };
    
    const handleDataBankChange = (index: number, field: string, value: string | number) => {
        const newDataBank = [...formData.data_bank];
        newDataBank[index][field] = value;
        setFormData(prev => {
            const updatedTotal = calculateTotal(newDataBank);
            return {
                ...prev,
                data_bank: newDataBank,
                total_pengajuan: updatedTotal, // Recalculate total
                total_bank: updatedTotal, // Recalculate total
                selisih_a: calculateSelisihA(prev.total_invoice, updatedTotal) // Recalculate selisih_a
            };
        });
    };

    

    const calculateTotal = (dataBank) => {
        return dataBank.reduce((total, item) => total + (Number(item.jumlah) || 0), 0);
    };
    
    const formatNomorPengajuan = (date: Date | null) => {
        if (!date) return '';
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear().toString().slice(-2);
        return `P.${day}.${month}.${year}`;
    };
    
    const formatDate = (date: Date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Tambahkan padding 0 jika bulan < 10
        const day = String(date.getDate()).padStart(2, '0'); // Tambahkan padding 0 jika hari < 10
        return `${year}-${month}-${day}`;
    };
    

    useEffect(() => {
        const updatedSelisihA = calculateSelisihA(formData.total_invoice, formData.total_pengajuan);
        setFormData((prev) => ({
            ...prev,
            selisih_a: updatedSelisihA,
        }));
    }, [formData.total_invoice, formData.total_pengajuan]);
    
    const calculateSelisihA = (totalInvoice: string | number, totalPengajuan: string | number) => {
        const invoice = Number(totalInvoice) || 0; // Default 0 jika NaN
        const pengajuan = Number(totalPengajuan) || 0; // Default 0 jika NaN
        return invoice - pengajuan;
    };
    

   
    

    const addAssetNonPenggajian = () => {
        setFormData((prev) => ({
            ...prev,
            asset_non_penggajian: [...prev.asset_non_penggajian, { namaBiaya: '', nominal: 0 }]
        }));
    };
    
    const removeAssetNonPenggajian = (index: number) => {
        setFormData((prev) => ({
            ...prev,
            asset_non_penggajian: prev.asset_non_penggajian.filter((_, i) => i !== index)
        }));
    };
    
    const handleAssetNonPenggajianChange = (index: number, field: string, value: string | number) => {
        const newAssetNonPenggajian = [...formData.asset_non_penggajian];
        newAssetNonPenggajian[index][field] = value;
        setFormData((prev) => ({ ...prev, asset_non_penggajian: newAssetNonPenggajian }));
    };

    
    const addPengajuanLain2 = () => {
        setFormData((prev) => ({
            ...prev,
            pengajuan_umum_lain2: [...prev.pengajuan_umum_lain2, { namaBiaya: '', nominal: 0 }]
        }));
    };
    
    const removePengajuanLain2 = (index: number) => {
        setFormData((prev) => ({
            ...prev,
            pengajuan_umum_lain2: prev.pengajuan_umum_lain2.filter((_, i) => i !== index)
        }));
    };
    
    const handlePengajuanLain2Change = (index: number, field: string, value: string | number) => {
        const newPengajuanLain2 = [...formData.pengajuan_umum_lain2];
        newPengajuanLain2[index][field] = value;
        setFormData((prev) => ({ ...prev, pengajuan_umum_lain2: newPengajuanLain2 }));
    };

    const toggleAccordion = (index: number) => setIsOpen(isOpen === index ? null : index);

    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const isFormValid = () => {
        // Periksa apakah semua properti di formData memiliki nilai
        return Object.values(formData).every((value) => {
            if (Array.isArray(value)) {
                // Jika nilai berupa array, pastikan semua elemen array terisi (khusus array objek)
                return value.every((item) => Object.values(item).every((v) => v !== null && v !== ''));
            }
            return value !== null && value !== ''; // Pastikan nilai tidak null atau kosong
        });
    };

    if (loading) return <div>Loading...</div>;


    return (
        <div>
            <div className="flex items-center justify-between flex-wrap gap-4 mb-5">
                <h1 className="flex items-center gap-2">EDIT PENGAJUAN |</h1>
                <div className="flex sm:flex-row flex-col sm:items-center sm:gap-3 gap-4 w-full sm:w-auto">
                    <div className="flex gap-3">
                        <Link to="/pengajuan/semuapengajuan" className="btn btn-primary gap-2">
                            Kembali ke Semua Pengajuan
                        </Link>
                    </div>
                </div>
            </div>
            <div className="panel" id="simple">
                <form onSubmit={handleSubmit}>
                    <div className="mb-5">
                        <div className="border-b border-gray-200">
                            <h2 className="text-lg font-semibold cursor-pointer" onClick={() => toggleAccordion(0)}>
                                Informasi Umum
                            </h2>
                            {isOpen === 0 && (
                                <div className="pt-5">
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    <div>
                                            <label htmlFor="title">Judul Pengajuan</label>
                                            <input
                                                id="title"
                                                type="text"
                                                placeholder="Masukan Judul Pengajuan"
                                                className="form-input form-input-lg"
                                                value={formData.title}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div>
                                                <label htmlFor="tanggal">Tanggal Pengajuan</label>
                                                <input
    id="tanggal"
    type="date"
    className="form-input form-input-lg"
    value={tanggal ? tanggal.toISOString().split('T')[0] : ''} // Format the date for the input
    onChange={handleDateChange} // Use the new handler
/>
                                            </div>
                                            
                                        <div>
                                            <label htmlFor="kode_entity">Kode Entity</label>
                                            <select
    id="kode_entity"
    className="form-input form-input-lg"
    value={formData.kode_entity}
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
                                            <label htmlFor="nama_customer">Customer name</label>
                                            <input
                                                id="nama_customer"
                                                type="text"
                                                placeholder="Masukan nama customer"
                                                className="form-input form-input-lg"
                                                value={formData.nama_customer}
                                                readOnly
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="nomor_pengajuan">Nomor Pengajuan</label>
                                            <input
                                                id="nomor_pengajuan"
                                                type="text"
                                                placeholder="Masukan nomor pengajuan"
                                                className="form-input form-input-lg"
                                                value={formData.nomor_pengajuan}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="no_urut">Nomor Urutan</label>
                                            <input
                                                id="no_urut"
                                                type="text"
                                                placeholder="Masukan nomor pengajuan"
                                                className="form-input form-input-lg"
                                                value={formData.no_urut}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        
                                        <div>
                                            <label htmlFor="total_invoice">Total Invoice</label>
                                            <input
                                                id="total_invoice"
                                                type="text"
                                                placeholder="Masukan Total Invoice yang diproses"
                                                className="form-input form-input-lg"
                                                value={formData.total_invoice}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="total_pengajuan">Total Pengajuan</label>
                                             <input
                                                id="total_pengajuan"
                                                type="text"
                                                placeholder="Masukan Total Pengajuan yang diproses"
                                                className="form-input form-input-lg"
                                                value={formData.total_pengajuan}
                                                readOnly // Make this read-only
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="selisih_a">SELISIH A</label>
                                            <input
                                                id="selisih_a"
                                                type="text"
                                                placeholder="Selisih A"
                                                className="form-input form-input-lg"
                                                value={formData.selisih_a}
                                                readOnly // Make this read-only
                                            />
                                        </div>

                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="border-b border-gray-200 mt-4">
                            <h2 className="text-lg font-semibold cursor-pointer" onClick={() => toggleAccordion(1)}>
                            Komponen Keuangan I
                            </h2>
                            {isOpen === 1 && (
                                <div className="pt-5">
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                       {/* MF 5% */}
      <div>
        <label htmlFor="mf_5_percent" >MF 5%</label>
        <input
          id="mf_5_percent"
          type="number"
          placeholder="Masukkan nilai"
          className="form-input w-full border-gray-300 rounded-md"
          value={formData.mf_5_percent}
          onChange={handleInputChange}
        />
      </div>
                                         {/* BPJS TK 4,24% */}
      <div>
        <label htmlFor="bpjs_tk_4_24_percent" className="block text-gray-700 font-medium mb-1">BPJS TK 4,24%</label>
        <input
          id="bpjs_tk_4_24_percent"
          type="number"
          placeholder="Masukkan nilai"
          className="form-input w-full border-gray-300 rounded-md"
          value={formData.bpjs_tk_4_24_percent}
          onChange={handleInputChange}
        />
      </div>
      {/* BPJS TK 2% */}
      <div>
        <label htmlFor="bpjs_tk_2_percent" className="block text-gray-700 font-medium mb-1">BPJS TK 2%</label>
        <input
          id="bpjs_tk_2_percent"
          type="number"
          placeholder="Masukkan nilai"
          className="form-input w-full border-gray-300 rounded-md"
          value={formData.bpjs_tk_2_percent}
          onChange={handleInputChange}
        />
      </div>
      {/* PENSIUN 2% */}
      <div>
        <label htmlFor="pensiun_2_percent" className="block text-gray-700 font-medium mb-1">PENSIUN 2%</label>
        <input
          id="pensiun_2_percent"
          type="number"
          placeholder="Masukkan nilai"
          className="form-input w-full border-gray-300 rounded-md"
          value={formData.pensiun_2_percent}
          onChange={handleInputChange}
        />
      </div>

      {/* PENSIUN 1% */}
      <div>
        <label htmlFor="pensiun_1_percent" className="block text-gray-700 font-medium mb-1">PENSIUN 1%</label>
        <input
          id="pensiun_1_percent"
          type="number"
          placeholder="Masukkan nilai"
          className="form-input w-full border-gray-300 rounded-md"
          value={formData.pensiun_1_percent}
          onChange={handleInputChange}
        />
      </div>
      {/* BPJS KES 4% */}
      <div>
        <label htmlFor="bpjs_kes_4_percent" className="block text-gray-700 font-medium mb-1">BPJS KES 4%</label>
        <input
          id="bpjs_kes_4_percent"
          type="number"
          placeholder="Masukkan nilai"
          className="form-input w-full border-gray-300 rounded-md"
          value={formData.bpjs_kes_4_percent}
          onChange={handleInputChange}
        />
      </div>
      {/* BPJS KES 1% */}
      <div>
        <label htmlFor="bpjs_kes_1_percent" className="block text-gray-700 font-medium mb-1">BPJS KES 1%</label>
        <input
          id="bpjs_kes_1_percent"
          type="number"
          placeholder="Masukkan nilai"
          className="form-input w-full border-gray-300 rounded-md"
          value={formData.bpjs_kes_1_percent}
          onChange={handleInputChange}
        />
      </div>
      {/* PPH 21 */}
      <div>
        <label htmlFor="pph21" className="block text-gray-700 font-medium mb-1">PPH 21</label>
        <input
          id="pph21"
          type="number"
          placeholder="Masukkan nilai"
          className="form-input w-full border-gray-300 rounded-md"
          value={formData.pph21}
          onChange={handleInputChange}
        />
      </div>
      {/* PPN % */}
      <div>
        <label htmlFor="ppn_percent" className="block text-gray-700 font-medium mb-1">PPN %</label>
        <input
          id="ppn_percent"
          type="number"
          placeholder="Masukkan nilai"
          className="form-input w-full border-gray-300 rounded-md"
          value={formData.ppn_percent}
          onChange={handleInputChange}
        />
      </div>
      {/* POT. GAJI DI MUKA */}
      <div>
        <label htmlFor="pot_gaji_dimuka" className="block text-gray-700 font-medium mb-1">POT. GAJI DI MUKA</label>
        <input
          id="pot_gaji_dimuka"
          type="number"
          placeholder="Masukkan nilai"
          className="form-input w-full border-gray-300 rounded-md"
          value={formData.pot_gaji_dimuka}
          onChange={handleInputChange}
        />
      </div>
      {/* POT. PRIVY ID */}
      <div>
        <label htmlFor="pot_privy_id" className="block text-gray-700 font-medium mb-1">POT. PRIVY ID</label>
        <input
          id="pot_privy_id"
          type="number"
          placeholder="Masukkan nilai"
          className="form-input w-full border-gray-300 rounded-md"
          value={formData.pot_privy_id}
          onChange={handleInputChange}
        />
      </div>
      {/* POT. TALANGAN/CICILAN */}
      <div>
        <label htmlFor="pot_talangan_cicilan" className="block text-gray-700 font-medium mb-1">POT. TALANGAN/CICILAN</label>
        <input
          id="pot_talangan_cicilan"
          type="number"
          placeholder="Masukkan nilai"
          className="form-input w-full border-gray-300 rounded-md"
          value={formData.pot_talangan_cicilan}
          onChange={handleInputChange}
        />
      </div>

      <div className="border-b border-gray-200 mt-4">
    <h2 className="text-lg font-semibold">Lain-lain</h2>
    {formData.pengajuan_umum_lain2.map((item, index) => (
        <div key={index} className="flex items-center mb-2">
            <input
                type="text"
                placeholder="Nama Biaya"
                value={item.namaBiaya}
                onChange={(e) => handlePengajuanLain2Change(index, 'namaBiaya', e.target.value)}
                className="form-input w-full border-gray-300 rounded-md mr-2"
            />
            <input
                type="number"
                placeholder="Nominal"
                value={item.nominal}
                onChange={(e) => handlePengajuanLain2Change(index, 'nominal', Number(e.target.value))}
                className="form-input w-full border-gray-300 rounded-md mr-2"
            />
            <button
                onClick={() => removePengajuanLain2(index)}
                className="bg-red-500 text-white rounded-md px-2"
            >
                Hapus
            </button>
        </div>
    ))}
    <button
        type="button" // Tambahkan type="button" di sini
        onClick={addPengajuanLain2}
        className="bg-blue-500 text-white rounded-md px-4"
    >
        Tambah
    </button>
</div>

<div>
        <label htmlFor="subtotal_pengajuan_umum" className="block text-gray-700 font-medium mb-1">TOTAL I</label>
        <input
          id="subtotal_pengajuan_umum"
          type="number"
          placeholder="Masukkan nilai"
          className="form-input w-full border-gray-300 rounded-md"
          value={formData.subtotal_pengajuan_umum}
          onChange={handleInputChange}
          readOnly
        />
      </div>


                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="border-b border-gray-200 mt-4">
                            <h2 className="text-lg font-semibold cursor-pointer" onClick={() => toggleAccordion(2)}>
                            Komponen Keuangan II
                            </h2>
                            {isOpen === 2 && (
                                <div className="pt-5">
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                         {/* ADJUSTMENT */}
            <div>
                <label htmlFor="adjustment" className="block text-gray-700 font-medium mb-1">ADJUSTMENT</label>
                <input
                    id="adjustment"
                    type="number"
                    placeholder="Masukkan nilai"
                    className="form-input w-full border-gray-300 rounded-md"
                    value={formData.adjustment}
                    onChange={handleInputChange}
                />
            </div>

            {/* PPH 23 */}
            <div>
                <label htmlFor="pph23" className="block text-gray-700 font-medium mb-1">PPH 23</label>
                <input
                    id="pph23"
                    type="number"
                    placeholder="Masukkan nilai"
                    className="form-input w-full border-gray-300 rounded-md"
                    value={formData.pph23}
                    onChange={handleInputChange}
                />
            </div>

            {/* TOTAL II */}
            <div>
                <label htmlFor="subtotal_adjustment" className="block text-gray-700 font-medium mb-1">TOTAL II</label>
                <input
                    id="subtotal_adjustment"
                    type="number"
                    placeholder="Masukkan nilai"
                    className="form-input w-full border-gray-300 rounded-md"
                    value={formData.subtotal_adjustment}
                    onChange={handleInputChange}
                    readOnly
                />
            </div>

            {/* SELISIH B */}
            <div>
                <label htmlFor="selisih_b" className="block text-gray-700 font-medium mb-1">SELISIH B</label>
                <input
                    id="selisih_b"
                    type="number"
                    placeholder="Masukkan nilai"
                    className="form-input w-full border-gray-300 rounded-md"
                    value={formData.selisih_b}
                    onChange={handleInputChange}
                    readOnly
                />
            </div>

            <div>
                <label htmlFor="balance" className="block text-gray-700 font-medium mb-1">BALANCE</label>
                <input
                    id="balance"
                    type="number"
                    placeholder="Masukkan nilai"
                    className="form-input w-full border-gray-300 rounded-md"
                    value={formData.balance}
                    onChange={handleInputChange}
                    readOnly
                />
            </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="border-b border-gray-200 mt-4">
                            <h2 className="text-lg font-semibold cursor-pointer" onClick={() => toggleAccordion(3)}>
                            NOP
                            </h2>
                            {isOpen === 3 && (
                                <div className="pt-5">
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                        {/* NOP */}
            <div>
                <label htmlFor="nop" className="block text-gray-700 font-medium mb-1">NOP</label>
                <input
                    id="nop"
                    type="text"
                    placeholder="Masukkan NOP"
                    className="form-input w-full border-gray-300 rounded-md"
                    value={formData.nop}
                    onChange={handleInputChange}
                />
            </div>

            {/* GAJI GROSS-PPH */}
            <div>
                <label htmlFor="gaji_gross_pph" className="block text-gray-700 font-medium mb-1">GAJI GROSS-PPH</label>
                <input
                    id="gaji_gross_pph"
                    type="number"
                    placeholder="Masukkan Gaji Gross-PPH"
                    className="form-input w-full border-gray-300 rounded-md"
                    value={formData.gaji_gross_pph}
                    onChange={handleInputChange}
                />
            </div>

            {/* KOMPENSASI-PPH */}
            <div>
                <label htmlFor="kompensasi_pph" className="block text-gray-700 font-medium mb-1">KOMPENSASI-PPH</label>
                <input
                    id="kompensasi_pph"
                    type="number"
                    placeholder="Masukkan Kompensasi-PPH"
                    className="form-input w-full border-gray-300 rounded-md"
                    value={formData.kompensasi_pph}
                    onChange={handleInputChange}
                />
            </div>

            {/* GAJI GROSS-NON PPH */}
            <div>
                <label htmlFor="gaji_gross_non_pph" className="block text-gray-700 font-medium mb-1">GAJI GROSS-NON PPH</label>
                <input
                    id="gaji_gross_non_pph"
                    type="number"
                    placeholder="Masukkan Gaji Gross-Non PPH"
                    className="form-input w-full border-gray-300 rounded-md"
                    value={formData.gaji_gross_non_pph}
                    onChange={handleInputChange}
                />
            </div>
                                    </div>
                                </div>
                            )}
                        </div>


                        <div className="border-b border-gray-200 mt-4">
                            <h2 className="text-lg font-semibold cursor-pointer" onClick={() => toggleAccordion(4)}>
                            Asset/Non Penggajian/Non Asset
                            </h2>
                            {isOpen === 4 && (
                                <div className="pt-5">
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    {formData.asset_non_penggajian.map((item, index) => (
        <div key={index} className="flex items-center mb-2">
            <input
                type="text"
                placeholder="Nama Biaya"
                value={item.namaBiaya}
                onChange={(e) => handleAssetNonPenggajianChange(index, 'namaBiaya', e.target.value)}
                className="form-input w-full border-gray-300 rounded-md mr-2"
            />
            <input
                type="number"
                placeholder="Nominal"
                value={item.nominal}
                onChange={(e) => handleAssetNonPenggajianChange(index, 'nominal', Number(e.target.value))}
                className="form-input w-full border-gray-300 rounded-md mr-2"
            />
            <button
                onClick={() => removeAssetNonPenggajian(index)}
                className="bg-red-500 text-white rounded-md px-2"
            >
                Hapus
            </button>
        </div>
    ))}
    <button
        type="button" // Pastikan ini adalah type="button"
        onClick={addAssetNonPenggajian}
        className="bg-blue-500 text-white rounded-md px-4"
    >
        Tambah
    </button>
   
                                    </div>
                                    <div>
                <label htmlFor="total_3" className="block text-gray-700 font-medium mb-1">TOTAL III</label>
                <input
                    id="total_3"
                    type="number"
                    placeholder="Masukkan nilai"
                    className="form-input w-full border-gray-300 rounded-md"
                    value={formData.total_3}
                    onChange={handleInputChange}
                    readOnly
                />
            </div>
                                </div>
                            )}
                        </div>

                        <div className="border-b border-gray-200 mt-4">
                            <h2 className="text-lg font-semibold cursor-pointer" onClick={() => toggleAccordion(5)}>
                                Komponen Bank
                            </h2>
                            {isOpen === 5 && (
                                <div className="pt-5">
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    <div className="border-b border-gray-200 mt-4">
    <h2 className="text-lg font-semibold">Biaya Bank</h2>
    {formData.data_bank.map((item, index) => (
                                                <div key={index} className="flex items-center mb-2">
                                                    <input
                                                        type="text"
                                                        placeholder="Nama Bank"
                                                        value={item.bank_name}
                                                        onChange={(e) => handleDataBankChange(index, 'bank_name', e.target.value)}
                                                        className="form-input w-full border-gray-300 rounded-md mr-2"
                                                    />
                                                    <input
                                                        type="number"
                                                        placeholder="Nominal"
                                                        value={item.jumlah}
                                                        onChange={(e) => handleDataBankChange(index, 'jumlah', Number(e.target.value))}
                                                        className="form-input w-full border-gray-300 rounded-md mr-2"
                                                    />
                                                    <button
                                                        onClick={() => removeDataBank(index)}
                                                        className="bg-red-500 text-white rounded-md px-2"
                                                    >
                                                        Hapus
                                                    </button>
                                                </div>
                                            ))}
                                            <button
                                                type="button"
                                                onClick={addDataBank}
                                                className="bg-blue-500 text-white rounded-md px-4"
                                            >
                                                Tambah
                                            </button>
</div>
<div>
                <label htmlFor="total_bank" className="block text-gray-700 font-medium mb-1">TOTAL</label>
                <input
                    id="total_bank"
                    type="number"
                    placeholder="Masukkan nilai"
                    className="form-input w-full border-gray-300 rounded-md"
                    value={formData.total_bank}
                    onChange={handleInputChange}
                    readOnly
                />
            </div>

                                    </div>
                                    

                                </div>
                            )}
                        </div>
                    </div>

                    <div className="d-flex justify-content-end mt-5">
    {isFormValid() && (
        <button
            type="submit"
            className={`btn btn-primary gap-5 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={isSubmitting}
        >
            {isSubmitting ? 'Loading...' : 'Submit'}
        </button>
    )}
</div>


                 </form>
            </div>
        </div>
    );
};

export default EditPengajuan;
