import { Tab } from '@headlessui/react';
import { Fragment, useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../store/themeConfigSlice';
import IconPlus from '../../components/Icon/IconPlus';
import axios from 'axios';
import * as XLSX from 'xlsx';

const TambahPengeluaran = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Untuk navigasi setelah submit      
    const [tanggalPengajuan, setTanggalPengajuan] = useState('');
    const [customer, setCustomer] = useState('');
    const [penemuan, setPenemuan] = useState('');
    const [jumlah, setJumlah] = useState<number | ''>('');
    const [hargaSatuan, setHargaSatuan] = useState<number | ''>('');
    const [total, setTotal] = useState<number | ''>('');
    const fileInputRef = useRef<HTMLInputElement | null>(null); // Ref untuk input file  

    useEffect(() => {
        dispatch(setPageTitle('Tambah Data Pengeluaran'));
    }, [dispatch]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validasi input    
        if (!tanggalPengajuan || !customer || !penemuan || jumlah === '' || hargaSatuan === '' || total === '') {
            alert('Semua field harus diisi!');
            return;
        }

        const data = {
            tanggal_pengajuan: tanggalPengajuan,
            customer,
            kodeEntity: '', // Anda bisa menambahkan kodeEntity jika diperlukan      
            kategori: 'lainlain', // Anda bisa menambahkan kategori sesuai kebutuhan      
            deskripsi: penemuan,
            jumlah: Number(jumlah), // Pastikan ini adalah number    
            harga_satuan: Number(hargaSatuan), // Pastikan ini adalah number    
            total: Number(total), // Pastikan ini adalah number    
        };

        try {
            await axios.post('https://audtrax.sinarjernihsuksesindo.id/backend/api/nonpayroll', data);
            // Navigasi kembali ke halaman semua pengeluaran setelah berhasil      
            navigate('/nonpenggajian/semuapengeluaran');
        } catch (error) {
            console.error('Error adding data:', error);
            alert('Terjadi kesalahan saat menambahkan data. Silakan coba lagi.');
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

            // Proses data yang diimpor  
            jsonData.forEach(async (row: any) => {
                const data = {
                    tanggal_pengajuan: row['Tanggal Pengajuan'],
                    customer: row['Customer'],
                    kodeEntity: row['Kode Entity'] || '', // Jika ada  
                    kategori: row['Kategori'] || 'lainlain', // Default kategori  
                    deskripsi: row['Deskripsi'],
                    jumlah: Number(row['Jumlah']),
                    harga_satuan: Number(row['Harga Satuan']),
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
                <h1 className="flex items-center gap-2">TAMBAH PENGELUARAN NON-PENGGAJIAN |</h1>
                <div className="flex sm:flex-row flex-col sm:items-center sm:gap-3 gap-4 w-full sm:w-auto">
                    <div className="flex gap-3">
                        <button
                            className="btn btn-success gap-5"
                            onClick={() => fileInputRef.current?.click()} // Trigger input file saat tombol diklik  
                        >
                            Import Excel
                        </button>
                        <input
                            type="file"
                            accept=".xlsx, .xls"
                            onChange={handleImport}
                            ref={fileInputRef} // Mengaitkan ref ke input file  
                            style={{ display: 'none' }} // Sembunyikan input file  
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
                                                    value={tanggalPengajuan}
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
                                                    rows={4} // Pastikan ini adalah number      
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

export default TambahPengeluaran;