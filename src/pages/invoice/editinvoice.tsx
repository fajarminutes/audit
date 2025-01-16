import { Tab } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../store/themeConfigSlice';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditInvoice = () => {
    const dispatch = useDispatch();
    const { id } = useParams(); // Get the invoice ID from the URL      
    const navigate = useNavigate(); // For navigation after submission      

    useEffect(() => {
        dispatch(setPageTitle('Edit Invoice'));
        fetchInvoice();
    }, [dispatch, id]);

    const [formData, setFormData] = useState({
        customer: '',
        finance: '',
        cycle_customer: '',
        item_invoice: '',
        nomor_invoice: '',
        hard_copy_target: '',
        periode_invoice: '',
        periode_cetak_invoice: '',
        no_faktur_pajak: '',
        nomor_po: '',
        tanggal_inv: '',
        nominal: '0.00', // Default as string for input  
        nama_pengirim_softcopy: '',
        tgl_kirim_hardfile_actual: '',
        nama_pengirim_hardcopy: '',
        tgl_kirim_softcopy_actual: '',
        nama_penerima: '',
        tgl_terima_hard_soft_file_actual: '',
        softcopy_scan: '',
        jumlah_hari_telat_kirim_invoice: '0', // Default as string for input  
        alasan_telat: '',
        revisi: '',
        pembayaran_outstanding: '0.00', // Default as string for input  
        pembayaran_bank: '',
        pembayaran_tanggal: '',
        pembayaran_nominal: '0.00', // Default as string for input  
        umur_hari_0_15: '0', // Default as string for input  
        umur_hari_16_30: '0', // Default as string for input  
        umur_hari_31_60: '0', // Default as string for input  
        umur_hari_61_90: '0', // Default as string for input  
        umur_hari_91_120: '0', // Default as string for input  
        umur_hari_121_150: '0', // Default as string for input  
        umur_hari_151_180: '0', // Default as string for input  
        umur_hari_lebih_180: '0', // Default as string for input  
        collection_day: '0', // Default as string for input  
        cycle: '0', // Default as string for input  
        status_pembayaran: 'Belum Dibayar', // Default value        
    });

    // Fetch invoice details      
    const fetchInvoice = async () => {
        try {
            const response = await axios.get(`https://audtrax.sinarjernihsuksesindo.id/backend/api/invoice/${id}`);
            setFormData(response.data);
        } catch (error) {
            console.error('Error fetching invoice:', error);
            toast.error('Failed to fetch invoice data.');
        }
    };

    // Handling form field changes      
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Form submitted with data:", formData); // Debugging log  

        // Prepare the data to submit      
        const dataToSubmit = {
            ...formData,
            nominal: typeof formData.nominal === 'string'
                ? parseFloat(formData.nominal.replace(/[^0-9.-]+/g, "") || "0.00")
                : parseFloat(formData.nominal) || 0, // Ensure nominal is a number      
            pembayaran_outstanding: typeof formData.pembayaran_outstanding === 'string'
                ? parseFloat(formData.pembayaran_outstanding.replace(/[^0-9.-]+/g, "") || "0.00")
                : parseFloat(formData.pembayaran_outstanding) || 0, // Ensure outstanding payment is a number      
            pembayaran_nominal: typeof formData.pembayaran_nominal === 'string'
                ? parseFloat(formData.pembayaran_nominal.replace(/[^0-9.-]+/g, "") || "0.00")
                : parseFloat(formData.pembayaran_nominal) || 0, // Ensure payment nominal is a number      
            jumlah_hari_telat_kirim_invoice: parseInt(formData.jumlah_hari_telat_kirim_invoice) || 0, // Ensure it's a number      
            umur_hari_0_15: parseInt(formData.umur_hari_0_15) || 0,
            umur_hari_16_30: parseInt(formData.umur_hari_16_30) || 0,
            umur_hari_31_60: parseInt(formData.umur_hari_31_60) || 0,
            umur_hari_61_90: parseInt(formData.umur_hari_61_90) || 0,
            umur_hari_91_120: parseInt(formData.umur_hari_91_120) || 0,
            umur_hari_121_150: parseInt(formData.umur_hari_121_150) || 0,
            umur_hari_151_180: parseInt(formData.umur_hari_151_180) || 0,
            umur_hari_lebih_180: parseInt(formData.umur_hari_lebih_180) || 0,
            collection_day: parseInt(formData.collection_day) || 0,
            cycle: parseInt(formData.cycle) || 0,
            hard_copy_target: formData.hard_copy_target ? new Date(formData.hard_copy_target).toISOString() : null, // Convert to ISO string      
            tanggal_inv: formData.tanggal_inv ? new Date(formData.tanggal_inv).toISOString() : null, // Convert to ISO string      
            tgl_kirim_hardfile_actual: formData.tgl_kirim_hardfile_actual ? new Date(formData.tgl_kirim_hardfile_actual).toISOString() : null, // Convert to ISO string      
            tgl_kirim_softcopy_actual: formData.tgl_kirim_softcopy_actual ? new Date(formData.tgl_kirim_softcopy_actual).toISOString() : null, // Convert to ISO string      
            tgl_terima_hard_soft_file_actual: formData.tgl_terima_hard_soft_file_actual ? new Date(formData.tgl_terima_hard_soft_file_actual).toISOString() : null, // Convert to ISO string      
            pembayaran_tanggal: formData.pembayaran_tanggal ? new Date(formData.pembayaran_tanggal).toISOString() : null, // Convert to ISO string      
        };

        try {
            await axios.put(`https://audtrax.sinarjernihsuksesindo.id/backend/api/invoice/${id}`, dataToSubmit);
            toast.success('Invoice updated successfully');
            setTimeout(() => {
                navigate('/invoice/semuainvoice');
            }, 2000);
        } catch (error) {
            console.error('Error updating invoice:', error);
            toast.error('An error occurred while updating the invoice');
        }
    };  


    if (!formData) return <p>Loading...</p>;

    return (
        <div>
            <h1 className="flex items-center mb-5 gap-2">Edit Invoice |</h1>
            <div className="panel">
                <div className="mb-5">
                    <Tab.Group>
                        <Tab.List className="mt-3 flex flex-wrap border-b border-white-light dark:border-[#191e3a]">
                            {['General', 'Invoice Detail', 'Delivery Details', 'Payment Detail', 'Age Detail'].map((tab) => (
                                <Tab as={Fragment} key={tab}>
                                    {({ selected }) => (
                                        <button
                                            className={`${selected ? '!border-white-light !border-b-white text-primary !outline-none dark:!border-[#191e3a] dark:!border-b-black' : ''}          
                                            dark:hover:border-b-black -mb-[1px] block border border-transparent p-3.5 py-2 hover:text-primary`}
                                        >
                                            {tab}
                                        </button>
                                    )}
                                </Tab>
                            ))}
                        </Tab.List>
                        <Tab.Panels>
                            <Tab.Panel>
                                <div className="active pt-5">
                                    <form onSubmit={handleSubmit}>
                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                            <div>
                                                <label htmlFor="customer">Customer</label>
                                                <input id="customer" name="customer" type="text" className="form-input form-input-lg" value={formData.customer} onChange={handleChange} />
                                            </div>
                                            <div>
                                                <label htmlFor="finance">Finance</label>
                                                <input id="finance" name="finance" type="text" className="form-input form-input-lg" value={formData.finance} onChange={handleChange} />
                                            </div>
                                            <div>
                                                <label htmlFor="cycle_customer">Cycle Customer</label>
                                                <input id="cycle_customer" name="cycle_customer" type="text" className="form-input form-input-lg" value={formData.cycle_customer} onChange={handleChange} />
                                            </div>
                                        </div>
                                        <button type="submit" className="btn btn-primary gap-5">
                                            Submit
                                        </button>
                                    </form>
                                </div>
                            </Tab.Panel>
                            <Tab.Panel>
                                <div className="active pt-5">
                                    <form onSubmit={handleSubmit}>
                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                            <div>
                                                <label htmlFor="item_invoice">Item Invoice</label>
                                                <input id="item_invoice" name="item_invoice" type="text" className="form-input form-input-lg" value={formData.item_invoice} onChange={handleChange} />
                                            </div>
                                            <div>
                                                <label htmlFor="nomor_invoice">Nomor Invoice</label>
                                                <input id="nomor_invoice" name="nomor_invoice" type="text" className="form-input form-input-lg" value={formData.nomor_invoice} onChange={handleChange} />
                                            </div>
                                            <div>
                                                <label htmlFor="hard_copy_target">Hard Copy Target</label>
                                                <input id="hard_copy_target" name="hard_copy_target" type="date" className="form-input form-input-lg" value={formData.hard_copy_target ? new Date(formData.hard_copy_target).toISOString().split('T')[0] : ''} onChange={handleChange} />
                                            </div>
                                            <div>
                                                <label htmlFor="periode_invoice">Periode Invoice</label>
                                                <input id="periode_invoice" name="periode_invoice" type="number" className="form-input form-input-lg" value={formData.periode_invoice} onChange={handleChange} />
                                            </div>
                                            <div>
                                                <label htmlFor="periode_cetak_invoice">Periode Cetak Invoice</label>
                                                <input id="periode_cetak_invoice" name="periode_cetak_invoice" type="number" className="form-input form-input-lg" value={formData.periode_cetak_invoice} onChange={handleChange} />
                                            </div>
                                            <div>
                                                <label htmlFor="no_faktur_pajak">No Faktur Pajak</label>
                                                <input id="no_faktur_pajak" name="no_faktur_pajak" type="text" className="form-input form-input-lg" value={formData.no_faktur_pajak} onChange={handleChange} />
                                            </div>
                                            <div>
                                                <label htmlFor="nomor_po">Nomor PO</label>
                                                <input id="nomor_po" name="nomor_po" type="text" className="form-input form-input-lg" value={formData.nomor_po} onChange={handleChange} />
                                            </div>
                                            <div>
                                                <label htmlFor="tanggal_inv">Tanggal INV</label>
                                                <input id="tanggal_inv" name="tanggal_inv" type="date" className="form-input form-input-lg" value={formData.tanggal_inv ? new Date(formData.tanggal_inv).toISOString().split('T')[0] : ''} onChange={handleChange} />
                                            </div>
                                            <div>
                                                <label htmlFor="nominal">Nominal</label>
                                                <input id="nominal" name="nominal" type="text" className="form-input form-input-lg" value={formData.nominal} onChange={handleChange} />
                                            </div>
                                        </div>
                                        <button type="submit" className="btn btn-primary gap-5">
                                            Submit
                                        </button>
                                    </form>
                                </div>
                            </Tab.Panel>

                            <Tab.Panel>
                                <div className="active pt-5">
                                    <form onSubmit={handleSubmit}>
                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                            <div>
                                                <label htmlFor="nama_pengirim_softcopy">Nama Pengirim Softcopy</label>
                                                <input id="nama_pengirim_softcopy" name="nama_pengirim_softcopy" type="text" className="form-input form-input-lg" value={formData.nama_pengirim_softcopy} onChange={handleChange} />
                                            </div>
                                            <div>
                                                <label htmlFor="tgl_kirim_hardfile_actual">Tgl Kirim Hardfile Actual</label>
                                                <input id="tgl_kirim_hardfile_actual" name="tgl_kirim_hardfile_actual" type="date" className="form-input form-input-lg" value={formData.tgl_kirim_hardfile_actual ? new Date(formData.tgl_kirim_hardfile_actual).toISOString().split('T')[0] : ''} onChange={handleChange} />
                                            </div>
                                            <div>
                                                <label htmlFor="nama_pengirim_hardcopy">Nama Pengirim Hardcopy</label>
                                                <input id="nama_pengirim_hardcopy" name="nama_pengirim_hardcopy" type="text" className="form-input form-input-lg" value={formData.nama_pengirim_hardcopy} onChange={handleChange} />
                                            </div>
                                            <div>
                                                <label htmlFor="tgl_kirim_softcopy_actual">Tgl Kirim Softcopy Actual</label>
                                                <input id="tgl_kirim_softcopy_actual" name="tgl_kirim_softcopy_actual" type="date" className="form-input form-input-lg" value={formData.tgl_kirim_softcopy_actual ? new Date(formData.tgl_kirim_softcopy_actual).toISOString().split('T')[0] : ''} onChange={handleChange} />
                                            </div>
                                            <div>
                                                <label htmlFor="nama_penerima">Nama Penerima</label>
                                                <input id="nama_penerima" name="nama_penerima" type="text" className="form-input form-input-lg" value={formData.nama_penerima} onChange={handleChange} />
                                            </div>
                                            <div>
                                                <label htmlFor="tgl_terima_hard_soft_file_actual">Tgl Terima Hard/Soft File Actual</label>
                                                <input id="tgl_terima_hard_soft_file_actual" name="tgl_terima_hard_soft_file_actual" type="date" className="form-input form-input-lg" value={formData.tgl_terima_hard_soft_file_actual ? new Date(formData.tgl_terima_hard_soft_file_actual).toISOString().split('T')[0] : ''} onChange={handleChange} />
                                            </div>
                                            <div>
                                                <label htmlFor="softcopy_scan">Softcopy Scan</label>
                                                <input id="softcopy_scan" name="softcopy_scan" type="text" className="form-input form-input-lg" value={formData.softcopy_scan} onChange={handleChange} />
                                            </div>
                                            <div>
                                                <label htmlFor="jumlah_hari_telat_kirim_invoice">Jlh Hari Telat Kirim Invoice</label>
                                                <input id="jumlah_hari_telat_kirim_invoice" name="jumlah_hari_telat_kirim_invoice" type="text" className="form-input form-input-lg" value={formData.jumlah_hari_telat_kirim_invoice} onChange={handleChange} />
                                            </div>
                                            <div>
                                                <label htmlFor="alasan_telat">Alasan Telat</label>
                                                <input id="alasan_telat" name="alasan_telat" type="text" className="form-input form-input-lg" value={formData.alasan_telat} onChange={handleChange} />
                                            </div>
                                            <div>
                                                <label htmlFor="revisi">Revisi</label>
                                                <input id="revisi" name="revisi" type="text" className="form-input form-input-lg" value={formData.revisi} onChange={handleChange} />
                                            </div>
                                        </div>
                                        <button type="submit" className="btn btn-primary gap-5">
                                            Submit
                                        </button>
                                    </form>
                                </div>
                            </Tab.Panel>
                            <Tab.Panel>
                                <div className="active pt-5">
                                    <form onSubmit={handleSubmit}>
                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                            <div>
                                                <label htmlFor="pembayaran_outstanding">Pembayaran Outstanding</label>
                                                <input id="pembayaran_outstanding" name="pembayaran_outstanding" type="text" className="form-input form-input-lg" value={formData.pembayaran_outstanding} onChange={handleChange} />
                                            </div>
                                            <div>
                                                <label htmlFor="pembayaran_bank">Pembayaran Bank</label>
                                                <input id="pembayaran_bank" name="pembayaran_bank" type="text" className="form-input form-input-lg" value={formData.pembayaran_bank} onChange={handleChange} />
                                            </div>
                                            <div>
                                                <label htmlFor="pembayaran_tanggal">Pembayaran Tanggal</label>
                                                <input id="pembayaran_tanggal" name="pembayaran_tanggal" type="date" className="form-input form-input-lg" value={formData.pembayaran_tanggal ? new Date(formData.pembayaran_tanggal).toISOString().split('T')[0] : ''} onChange={handleChange} />
                                            </div>
                                            <div>
                                                <label htmlFor="pembayaran_nominal">Pembayaran Nominal</label>
                                                <input id="pembayaran_nominal" name="pembayaran_nominal" type="text" className="form-input form-input-lg" value={formData.pembayaran_nominal} onChange={handleChange} />
                                            </div>
                                        </div>
                                        <button type="submit" className="btn btn-primary gap-5">
                                            Submit
                                        </button>
                                    </form>
                                </div>
                            </Tab.Panel>
                            <Tab.Panel>
                                <div className="active pt-5">
                                    <form onSubmit={handleSubmit}>
                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                            <div>
                                                <label htmlFor="umur_hari_0_15">Umur (Hari) 0-15</label>
                                                <input id="umur_hari_0_15" name="umur_hari_0_15" type="number" className="form-input form-input-lg" value={formData.umur_hari_0_15} onChange={handleChange} />
                                            </div>
                                            <div>
                                                <label htmlFor="umur_hari_16_30">Umur (Hari) 16-30</label>
                                                <input id="umur_hari_16_30" name="umur_hari_16_30" type="number" className="form-input form-input-lg" value={formData.umur_hari_16_30} onChange={handleChange} />
                                            </div>
                                            <div>
                                                <label htmlFor="umur_hari_31_60">Umur (Hari) 31-60</label>
                                                <input id="umur_hari_31_60" name="umur_hari_31_60" type="number" className="form-input form-input-lg" value={formData.umur_hari_31_60} onChange={handleChange} />
                                            </div>
                                            <div>
                                                <label htmlFor="umur_hari_61_90">Umur (Hari) 61-90</label>
                                                <input id="umur_hari_61_90" name="umur_hari_61_90" type="number" className="form-input form-input-lg" value={formData.umur_hari_61_90} onChange={handleChange} />
                                            </div>
                                            <div>
                                                <label htmlFor="umur_hari_91_120">Umur (Hari) 91-120</label>
                                                <input id="umur_hari_91_120" name="umur_hari_91_120" type="number" className="form-input form-input-lg" value={formData.umur_hari_91_120} onChange={handleChange} />
                                            </div>
                                            <div>
                                                <label htmlFor="umur_hari_121_150">Umur (Hari) 121-150</label>
                                                <input id="umur_hari_121_150" name="umur_hari_121_150" type="number" className="form-input form-input-lg" value={formData.umur_hari_121_150} onChange={handleChange} />
                                            </div>
                                            <div>
                                                <label htmlFor="umur_hari_151_180">Umur (Hari) 151-180</label>
                                                <input id="umur_hari_151_180" name="umur_hari_151_180" type="number" className="form-input form-input-lg" value={formData.umur_hari_151_180} onChange={handleChange} />
                                            </div>
                                            <div>
                                                <label htmlFor="umur_hari_lebih_180">Umur (Hari) &gt;180</label>
                                                <input id="umur_hari_lebih_180" name="umur_hari_lebih_180" type="number" className="form-input form-input-lg" value={formData.umur_hari_lebih_180} onChange={handleChange} />
                                            </div>
                                            <div>
                                                <label htmlFor="collection_day">Collection Day (Hari)</label>
                                                <input id="collection_day" name="collection_day" type="number" className="form-input form-input-lg" value={formData.collection_day} onChange={handleChange} />
                                            </div>
                                            <div>
                                                <label htmlFor="cycle">Cycle</label>
                                                <input id="cycle" name="cycle" type="number" className="form-input form-input-lg" value={formData.cycle} onChange={handleChange} />
                                            </div>
                                        </div>
                                        <button type="submit" className="btn btn-primary gap-5">
                                            Submit
                                        </button>
                                    </form>
                                </div>
                            </Tab.Panel>
                        </Tab.Panels>
                    </Tab.Group>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default EditInvoice;  
