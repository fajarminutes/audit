import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../store';
import { setPageTitle } from '../../store/themeConfigSlice';
import axios from 'axios'; // Import axios for API calls  
import { ToastContainer, toast } from 'react-toastify'; // Import toast for notifications    
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles    

const TambahLates = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Use navigate for redirection    
    const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    const [formData, setFormData] = useState({
        noInvoice: '',
        codeCust: '',
        kodeEntity: '',
        descInv: '',
        periodeInv: '',
        periodeCetakInv: '',
        status: 'OK', // Default value    
        nominalInvGross: 0,
        nominalInvAfterPPH23: 0,
        ppn: 0,
        sales: '',
        mf: 0,
        pph23: 0,
        noEfp: '',
        custName: '',
        financeName: '',
        outstanding: 0,
        bank: '',
        tglBayar: '',
        nominalPembayaran: 0,
        selisih: 0,
        tglTarget: '',
        tglKirim: '',
        agingByKirim: 0,
        cycleBayarByKirim: 0,
        cycleCustomers: 0,
        agingByTarget: 0,
        cycleBayarByTarget: 0,
    });

    useEffect(() => {
        dispatch(setPageTitle('Tambah Lates'));
    }, [dispatch]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await axios.post('https://audtrax.sinarjernihsuksesindo.id/backend/api/lates', formData);
            toast.success('Late record created successfully');
            navigate('/invoice/semualates'); // Redirect to the list of late records    
        } catch (error) {
            console.error('Error creating late record:', error);
            toast.error('Failed to create late record');
        }
    };

    return (
        <div>
            <h1 className="flex items-center mb-5 gap-2"><strong>Lates Management |</strong>Add Late</h1>
            <div className="panel">
                <div className="active pt-5">
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {/* Form fields */}
                            <div>
                                <label htmlFor="noInvoice">No Invoice</label>
                                <input id="noInvoice" name="noInvoice" type="text" className="form-input form-input-lg" value={formData.noInvoice} onChange={handleChange} required />
                            </div>
                            <div>
                                <label htmlFor="codeCust">Code Cust</label>
                                <input id="codeCust" name="codeCust" type="text" className="form-input form-input-lg" value={formData.codeCust} onChange={handleChange} required />
                            </div>
                            <div>
                                <label htmlFor="kodeEntity">Kode Entity</label>
                                <input id="kodeEntity" name="kodeEntity" type="text" className="form-input form-input-lg" value={formData.kodeEntity} onChange={handleChange} required />
                            </div>
                            <div>
                                <label htmlFor="descInv">Description INV</label>
                                <input id="descInv" name="descInv" type="text" className="form-input form-input-lg" value={formData.descInv} onChange={handleChange} required />
                            </div>
                            <div>
                                <label htmlFor="periodeInv">Periode INV</label>
                                <input id="periodeInv" name="periodeInv" type="text" className="form-input form-input-lg" value={formData.periodeInv} onChange={handleChange} required />
                            </div>
                            <div>
                                <label htmlFor="periodeCetakInv">Periode Cetak INV</label>
                                <input id="periodeCetakInv" name="periodeCetakInv" type="text" className="form-input form-input-lg" value={formData.periodeCetakInv} onChange={handleChange} required />
                            </div>
                            <div>
                                <label htmlFor="status">Status</label>
                                <select id="status" name="status" className="form-input form-input-lg" value={formData.status} onChange={handleChange}>
                                    <option value="OK">OK</option>
                                    <option value="BATAL">BATAL</option>
                                    <option value="ESTIMASI">ESTIMASI</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="nominalInvGross">Nominal INV Gross</label>
                                <input id="nominalInvGross" name="nominalInvGross" type="number" className="form-input form-input-lg" value={formData.nominalInvGross} onChange={handleChange} required />
                            </div>
                            <div>
                                <label htmlFor="nominalInvAfterPPH23">Nominal INV After PPH 23</label>
                                <input id="nominalInvAfterPPH23" name="nominalInvAfterPPH23" type="number" className="form-input form-input-lg" value={formData.nominalInvAfterPPH23} onChange={handleChange} required />
                            </div>
                            <div>
                                <label htmlFor="ppn">PPN 11%</label>
                                <input id="ppn" name="ppn" type="number" className="form-input form-input-lg" value={formData.ppn} onChange={handleChange} required />
                            </div>
                            <div>
                                <label htmlFor="sales">Sales</label>
                                <input id="sales" name="sales" type="text" className="form-input form-input-lg" value={formData.sales} onChange={handleChange} required />
                            </div>
                            <div>
                                <label htmlFor="mf">MF</label>
                                <input id="mf" name="mf" type="number" className="form-input form-input-lg" value={formData.mf} onChange={handleChange} required />
                            </div>
                            <div>
                                <label htmlFor="pph23">PPH 23</label>
                                <input id="pph23" name="pph23" type="number" className="form-input form-input-lg" value={formData.pph23} onChange={handleChange} required />
                            </div>
                            <div>
                                <label htmlFor="noEfp">No EFP</label>
                                <input id="noEfp" name="noEfp" type="text" className="form-input form-input-lg" value={formData.noEfp} onChange={handleChange} required />
                            </div>
                            <div>
                                <label htmlFor="custName">Cust. Name</label>
                                <input id="custName" name="custName" type="text" className="form-input form-input-lg" value={formData.custName} onChange={handleChange} required />
                            </div>
                            <div>
                                <label htmlFor="financeName">Finance Name</label>
                                <input id="financeName" name="financeName" type="text" className="form-input form-input-lg" value={formData.financeName} onChange={handleChange} required />
                            </div>
                            <div>
                                <label htmlFor="outstanding">Outstanding</label>
                                <input id="outstanding" name="outstanding" type="number" className="form-input form-input-lg" value={formData.outstanding} onChange={handleChange} required />
                            </div>
                            <div>
                                <label htmlFor="bank">Bank</label>
                                <select id="bank" name="bank" className="form-input form-input-lg" value={formData.bank} onChange={handleChange}>
                                    <option value="Bank A">Bank A</option>
                                    <option value="Bank B">Bank B</option>
                                    <option value="Bank C">Bank C</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="tglBayar">Tgl Bayar</label>
                                <input id="tglBayar" name="tglBayar" type="date" className="form-input form-input-lg" value={formData.tglBayar} onChange={handleChange} required />
                            </div>
                            <div>
                                <label htmlFor="nominalPembayaran">Nominal Pembayaran</label>
                                <input id="nominalPembayaran" name="nominalPembayaran" type="number" className="form-input form-input-lg" value={formData.nominalPembayaran} onChange={handleChange} required />
                            </div>
                            <div>
                                <label htmlFor="selisih">Selisih</label>
                                <input id="selisih" name="selisih" type="number" className="form-input form-input-lg" value={formData.selisih} onChange={handleChange} required />
                            </div>
                            <div>
                                <label htmlFor="tglTarget">Tgl Target</label>
                                <input id="tglTarget" name="tglTarget" type="date" className="form-input form-input-lg" value={formData.tglTarget} onChange={handleChange} required />
                            </div>
                            <div>
                                <label htmlFor="tglKirim">Tgl Kirim</label>
                                <input id="tglKirim" name="tglKirim" type="date" className="form-input form-input-lg" value={formData.tglKirim} onChange={handleChange} required />
                            </div>
                            <div>
                                <label htmlFor="agingByKirim">Aging by Kirim</label>
                                <input id="agingByKirim" name="agingByKirim" type="number" className="form-input form-input-lg" value={formData.agingByKirim} onChange={handleChange} required />
                            </div>
                            <div>
                                <label htmlFor="cycleBayarByKirim">Cycle Bayar by Kirim</label>
                                <input id="cycleBayarByKirim" name="cycleBayarByKirim" type="number" className="form-input form-input-lg" value={formData.cycleBayarByKirim} onChange={handleChange} required />
                            </div>
                            <div>
                                <label htmlFor="cycleCustomers">Cycle Customers</label>
                                <input id="cycleCustomers" name="cycleCustomers" type="number" className="form-input form-input-lg" value={formData.cycleCustomers} onChange={handleChange} required />
                            </div>
                            <div>
                                <label htmlFor="agingByTarget">Aging by Target</label>
                                <input id="agingByTarget" name="agingByTarget" type="number" className="form-input form-input-lg" value={formData.agingByTarget} onChange={handleChange} required />
                            </div>
                            <div>
                                <label htmlFor="cycleBayarByTarget">Cycle Bayar by Target</label>
                                <input id="cycleBayarByTarget" name="cycleBayarByTarget" type="number" className="form-input form-input-lg" value={formData.cycleBayarByTarget} onChange={handleChange} required />
                            </div>
                        </div>
                        <div className="d-flex justify-content-end mt-5">
                            <button type="submit" className="btn btn-primary gap-5">
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <ToastContainer /> {/* Toast notifications container */}
        </div>
    );
};

export default TambahLates;  
