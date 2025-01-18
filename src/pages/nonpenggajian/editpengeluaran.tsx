import { Tab } from '@headlessui/react';
import { Fragment, useEffect, useState, useRef } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../store/themeConfigSlice';
import axios from 'axios';
import * as XLSX from 'xlsx';

const EditPengeluaran = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate(); // For navigation after submit      
    const { id } = useParams<{ id: string }>(); // Get the nonpayroll ID from the URL      

    const [tanggalPengajuan, setTanggalPengajuan] = useState('');
    const [customer, setCustomer] = useState('');
    const [penemuan, setPenemuan] = useState('');
    const [jumlah, setJumlah] = useState<number | ''>('');
    const [hargaSatuan, setHargaSatuan] = useState<number | ''>('');
    const [total, setTotal] = useState<number | ''>('');
    const fileInputRef = useRef<HTMLInputElement | null>(null); // Ref for file input      

    useEffect(() => {
        dispatch(setPageTitle('Edit Data Pengeluaran'));
        fetchPengeluaranData(); // Fetch existing data on component mount      
    }, [dispatch, id]);

    // Fetch existing nonpayroll data      
    const fetchPengeluaranData = async () => {
        try {
            const response = await axios.get(`https://audtrax.sinarjernihsuksesindo.id/backend/api/nonpayroll/${id}`);
            const data = response.data;

            // Log the fetched data to check the format    
            console.log('Fetched data:', data);

            // Set the date directly in YYYY-MM-DD format for the input field  
            if (data.tanggal_pengajuan) {
                setTanggalPengajuan(data.tanggal_pengajuan); // Keep it in YYYY-MM-DD format  
            } else {
                setTanggalPengajuan(''); // Set to empty if null  
            }

            // Set other state values  
            setCustomer(data.customer);
            setPenemuan(data.deskripsi);
            setJumlah(data.jumlah);
            setHargaSatuan(data.harga_satuan);
            setTotal(data.total);
        } catch (error) {
            console.error('Error fetching data:', error);
            alert('Failed to fetch data');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validate input      
        if (!tanggalPengajuan || !customer || !penemuan || jumlah === '' || hargaSatuan === '' || total === '') {
            alert('Semua field harus diisi!');
            return;
        }

        // The date is already in YYYY-MM-DD format for submission  
        const data = {
            tanggal_pengajuan: tanggalPengajuan,
            customer,
            kodeEntity: '', // You can add kodeEntity if needed      
            kategori: 'lainlain', // You can add category as needed      
            deskripsi: penemuan,
            jumlah: Number(jumlah), // Ensure this is a number      
            harga_satuan: Number(hargaSatuan), // Ensure this is a number      
            total: Number(total), // Ensure this is a number      
        };

        try {
            await axios.put(`https://audtrax.sinarjernihsuksesindo.id/backend/api/nonpayroll/${id}`, data);
            // Navigate back to the all nonpayroll page after successful update      
            navigate('/nonpenggajian/semuapengeluaran');
        } catch (error) {
            console.error('Error updating data:', error);
            alert('Terjadi kesalahan saat memperbarui data. Silakan coba lagi.');
        }
    };

    const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            const data = new Uint8Array(event.target?.result as ArrayBuffer);
            const workbook = XLSX.read(data, { type: 'array' });
            const worksheet = workbook.Sheets[workbook.SheetNames[0]];
            const jsonData = XLSX.utils.sheet_to_json(worksheet);

            // Process imported data      
            jsonData.forEach(async (row: any) => {
                const data = {
                    tanggal_pengajuan: row['Tanggal Pengajuan'],
                    customer: row['Customer'],
                    kodeEntity: row['Kode Entity'] || '', // If available      
                    kategori: row['Kategori'] || 'lainlain', // Default category      
                    deskripsi: row['Penjelasan Deskripsi'],
                    jumlah: Number(row['Jumlah']),
                    harga_satuan: Number(row['Harga satuan']),
                    total: Number(row['Total']),
                };

                try {
                    await axios.post('https://audtrax.sinarjernihsuksesindo.id/backend/api/nonpayroll', data);
                } catch (error) {
                    console.error('Error adding imported data:', error);
                }
            });

            alert('Data berhasil diimpor!');
            navigate('/nonpenggajian/semuapengeluaran');
        };
        reader.readAsArrayBuffer(file);
    };

    return (
        <div>
            <div className="flex items-center justify-between flex-wrap gap-4 mb-5">
                <h1 className="flex items-center gap-2">EDIT PENGELUARAN NON-PENGGAJIAN |</h1>
                <div className="flex sm:flex-row flex-col sm:items-center sm:gap-3 gap-4 w-full sm:w-auto">
                    <div className="flex gap-3">
                        <button
                            className="btn btn-success gap-5"
                            onClick={() => fileInputRef.current?.click()} // Trigger file input when button is clicked      
                        >
                            Import Excel
                        </button>
                        <input
                            type="file"
                            accept=".xlsx, .xls"
                            onChange={handleImport}
                            ref={fileInputRef} // Attach ref to file input      
                            style={{ display: 'none' }} // Hide file input      
                        />
                        <Link to="/nonpenggajian/semuapengeluaran" className="btn btn-primary gap-5">
                            Kembali ke Semua Pengeluaran Non-Penggajian
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
                                                <label htmlFor="tglBayar">Tanggal Pengajuan</label>
                                                <input
                                                    id="tglBayar"
                                                    type="date"
                                                    className="form-input form-input-lg"
                                                    value={tanggalPengajuan} // Ensure this is in YYYY-MM-DD format      
                                                    onChange={(e) => setTanggalPengajuan(e.target.value)}
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="inputCustomer">Customer</label>
                                                <input
                                                    id="inputCustomer"
                                                    type="text"
                                                    placeholder="Masukan nama customer kode SJS+ Total PremiBPJS"
                                                    className="form-input form-input-lg"
                                                    value={customer}
                                                    onChange={(e) => setCustomer(e.target.value)}
                                                    required
                                                />
                                            </div>
                                            <div></div>
                                            <div className="form-container">
                                                <label htmlFor="penemuan">Penemuan</label>
                                                <textarea
                                                    id="penemuan"
                                                    name="penemuan"
                                                    placeholder="Masukkan penemuan"
                                                    rows={4} // Ensure this is a number            
                                                    cols={100}
                                                    value={penemuan}
                                                    onChange={(e) => setPenemuan(e.target.value)}
                                                    required
                                                ></textarea>
                                            </div>
                                            <div></div>
                                            <div></div>
                                            <div>
                                                <label htmlFor="inputJumlah">Jumlah</label>
                                                <input
                                                    id="inputJumlah"
                                                    type="number"
                                                    placeholder="Masukan Jumlah Item"
                                                    className="form-input form-input-lg"
                                                    value={jumlah}
                                                    onChange={(e) => setJumlah(e.target.value === '' ? '' : Number(e.target.value))}
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="inputHargaSatuan">Harga Satuan</label>
                                                <input
                                                    id="inputHargaSatuan"
                                                    type="number"
                                                    placeholder="Masukan Harga Satuan Item"
                                                    className="form-input form-input-lg"
                                                    value={hargaSatuan}
                                                    onChange={(e) => setHargaSatuan(e.target.value === '' ? '' : Number(e.target.value))}
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="inputTotal">Total</label>
                                                <input
                                                    id="inputTotal"
                                                    type="text"
                                                    placeholder="Masukan Total Biaya"
                                                    className="form-input form-input-lg"
                                                    value={total}
                                                    onChange={(e) => setTotal(e.target.value === '' ? '' : Number(e.target.value))}
                                                    required
                                                />
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

export default EditPengeluaran;    
