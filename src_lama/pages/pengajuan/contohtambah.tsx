import { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../store/themeConfigSlice';
import { PengajuanRequest } from '../../types/PengajuanType';
import { useCreatePengajuan } from '../../hooks/pengajuanHooks/usePengajuan';

const TambahPengajuan = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Tambah Pengajuan'));
    }, [dispatch]);

    const [isOpen, setIsOpen] = useState<number | null>(null);
    const [tanggal, setTanggal] = useState<Date | null>(null);
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
        pengajuan_umum_lain2: 0,
        subtotal_pengajuan_umum: 0,
        adjustment: 0,
        pph23: 0,
        subtotal_adjustment: 0,
        asset_non_penggajian: 0,
        total_3: 0,
        gaji_gross_pph: 0,
        kompensasi_pph: 0,
        gaji_gross_non_pph: 0,
        data_bank: {},
        cash: 0,
        total_bank: 0,
        total_invoice: 0,
        total_pengajuan: 0,
        selisih_a: 0,
        selisih_b: 0,
        title: '',
    });

    const { mutate: createPengajuan, isLoading: isCreatingPengajuan, error: createPengajuanError } = useCreatePengajuan();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setFormData((prev: PengajuanRequest) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.kode_entity || !formData.nomor_pengajuan || !tanggal) {
            alert('Please fill in all required fields.');
            return;
        }

        const payload = { ...formData, tanggal: tanggal?.toISOString() || '' };

        createPengajuan(payload, {
            onSuccess: () => {
                alert('Pengajuan created successfully!');
                setFormData({
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
                    pengajuan_umum_lain2: 0,
                    subtotal_pengajuan_umum: 0,
                    adjustment: 0,
                    pph23: 0,
                    subtotal_adjustment: 0,
                    asset_non_penggajian: 0,
                    total_3: 0,
                    gaji_gross_pph: 0,
                    kompensasi_pph: 0,
                    gaji_gross_non_pph: 0,
                    data_bank: {},
                    cash: 0,
                    total_bank: 0,
                    total_invoice: 0,
                    total_pengajuan: 0,
                    selisih_a: 0,
                    selisih_b: 0,
                    title: '',
                });
                setTanggal(null);
            },
            onError: () => {
                alert('Failed to create Pengajuan. Please try again.');
            },
        });
    };

    const toggleAccordion = (index: number) => {
        setIsOpen(isOpen === index ? null : index);
    };

    return (
        <div>
            <div className="flex items-center justify-between flex-wrap gap-4 mb-5">
                <h1 className="flex items-center gap-2">TAMBAH PENGAJUAN |</h1>
                <div className="flex sm:flex-row flex-col sm:items-center sm:gap-3 gap-4 w-full sm:w-auto">
                    <div className="flex gap-3">
                        <Link to="#" className="btn btn-success gap-5">
                            Import Exel
                        </Link>
                        <Link to="/pengajuan/semuapengajuan" className="btn btn-primary gap-5">
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
                                            <label htmlFor="kode_entity">Kode Entity</label>
                                            <input
                                                id="kode_entity"
                                                type="text"
                                                placeholder="Masukan Kode entitas"
                                                className="form-input form-input-lg"
                                                value={formData.kode_entity}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="nama_customer">Customer name</label>
                                            <input
                                                id="nama_customer"
                                                type="text"
                                                placeholder="Masukan nama customer"
                                                className="form-input form-input-lg"
                                                value={formData.nama_customer}
                                                onChange={handleInputChange}
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
                                            <label htmlFor="tglBayar">Tanggal Pengajuan</label>
                                            <input
                                                id="tglBayar"
                                                type="date"
                                                className="form-input form-input-lg"
                                                value={formData.tanggal}
                                                onChange={(e) => setTanggal(new Date(e.target.value))}
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="nop">NOP Yang Diproses</label>
                                            <input
                                                id="nop"
                                                type="text"
                                                placeholder="Masukan NOP yang diproses"
                                                className="form-input form-input-lg"
                                                value={formData.nop}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="border-b border-gray-200 mt-4">
                            <h2 className="text-lg font-semibold cursor-pointer" onClick={() => toggleAccordion(1)}>
                                Informasi Keuangan
                            </h2>
                            {isOpen === 1 && (
                                <div className="pt-5">
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                        <div>
                                            <label htmlFor="gaji_grosspph">Gaji Gross-PPH</label>
                                            <input
                                                id="gaji_grosspph"
                                                type="number"
                                                placeholder="Masukan Total Gaji Gross-PPH"
                                                className="form-input form-input-lg"
                                                value={formData.gaji_gross_pph}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="kompensasi_pph">Kompensasi-PPH</label>
                                            <input
                                                id="kompensasi_pph"
                                                type="number"
                                                placeholder="Masukan Total Kompensasi-PPH"
                                                className="form-input form-input-lg"
                                                value={formData.kompensasi_pph}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="gaji_grossnonpph">Gaji Gross-Non PPH</label>
                                            <input
                                                id="gaji_grossnonpph"
                                                type="number"
                                                placeholder="Masukan Total Gaji Gross-Non PPH"
                                                className="form-input form-input-lg"
                                                value={formData.gaji_gross_non_pph}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="gaji_muka">Gaji Dimuka</label>
                                            <input
                                                id="gaji_muka"
                                                type="number"
                                                placeholder="Masukan Total Gaji Dimuka"
                                                className="form-input form-input-lg"
                                                value={formData.pot_gaji_dimuka}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="priv_id">PRIV ID</label>
                                            <input
                                                id="priv_id"
                                                type="number"
                                                placeholder="Masukan Total PRIV ID"
                                                className="form-input form-input-lg"
                                                value={formData.pot_privy_id}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="dana_talangan">Dana Talangan</label>
                                            <input
                                                id="dana_talangan"
                                                type="number"
                                                placeholder="Masukan Total Dana Talangan"
                                                className="form-input form-input-lg"
                                                value={formData.pot_talangan_cicilan}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="pph21">PPH 21</label>
                                            <input
                                                id="pph21"
                                                type="number"
                                                placeholder="Masukan Total PPH 21"
                                                className="form-input form-input-lg"
                                                value={formData.pph21}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="bjpstk">BPJS TK 2%</label>
                                            <input
                                                id="bjpstk"
                                                type="number"
                                                placeholder="Masukan Total BPJS TK 2%"
                                                className="form-input form-input-lg"
                                                value={formData.bpjs_tk_2_percent}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="bpjskes">BPJS KES 1%</label>
                                            <input
                                                id="bpjskes"
                                                type="number"
                                                placeholder="Masukan Total BPJS KES 1%"
                                                className="form-input form-input-lg"
                                                value={formData.bpjs_kes_1_percent}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="pensiun">Pensiun 1%</label>
                                            <input
                                                id="pensiun"
                                                type="number"
                                                placeholder="Masukan Total Pensiun 1%"
                                                className="form-input form-input-lg"
                                                value={formData.pensiun_1_percent}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="vat">VAT</label>
                                            <input
                                                id="vat"
                                                type="number"
                                                placeholder="Masukan Total VAT"
                                                className="form-input form-input-lg"
                                                value={formData.ppn_percent}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="lain">Lain-lain</label>
                                            <input
                                                id="lain"
                                                type="number"
                                                placeholder="Masukan Total Lain-lain"
                                                className="form-input form-input-lg"
                                                value={formData.pengajuan_umum_lain2}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="border-b border-gray-200 mt-4">
                            <h2 className="text-lg font-semibold cursor-pointer" onClick={() => toggleAccordion(2)}>
                                Aset/Non-Penggajian
                            </h2>
                            {isOpen === 2 && (
                                <div className="pt-5">
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                        <div>
                                            <label htmlFor="asset_non">Asset / Non Penggajian</label>
                                            <input
                                                id="asset_non"
                                                type="number"
                                                placeholder="Masukan Total Asset / Non Penggajian"
                                                className="form-input form-input-lg"
                                                value={formData.asset_non_penggajian}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="pph_21_t">PPH 21 Tertagih</label>
                                            <input
                                                id="pph_21_t"
                                                type="number"
                                                placeholder="Masukan Total PPH 21 Tertagih"
                                                className="form-input form-input-lg"
                                                value={formData.pph21}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="bpjs_tk_T">BPJS TK Tertagih</label>
                                            <input
                                                id="bpjs_tk_T"
                                                type="number"
                                                placeholder="Masukan Total BPJS TK Tertagih"
                                                className="form-input form-input-lg"
                                                value={formData.bpjs_tk_2_percent}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="bpjs_kes_t">BPJS KES Tertagih</label>
                                            <input
                                                id="bpjs_kes_t"
                                                type="number"
                                                placeholder="Masukan Total BPJS KES Tertagih"
                                                className="form-input form-input-lg"
                                                value={formData.bpjs_kes_1_percent}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="pensiunan_t">Pensiun Tertagih</label>
                                            <input
                                                id="pensiunan_t"
                                                type="number"
                                                placeholder="Masukan Total Pensiun Tertagih"
                                                className="form-input form-input-lg"
                                                value={formData.pensiun_1_percent}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="border-b border-gray-200 mt-4">
                            <h2 className="text-lg font-semibold cursor-pointer" onClick={() => toggleAccordion(3)}>
                                Detail Bank
                            </h2>
                            {isOpen === 3 && (
                                <div className="pt-5">
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                        <div>
                                            <label htmlFor="bca">BCA</label>
                                            <input
                                                id="bca"
                                                type="number"
                                                placeholder="Masukan Total BCA"
                                                className="form-input form-input-lg"
                                                value={formData.data_bank.BCA?.account_number}
                                                onChange={(e) => setFormData((prev) => ({ ...prev, data_bank: { ...prev.data_bank, BCA: { ...prev.data_bank.BCA, account_number: e.target.value } } }))}
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="bca_contact">BCA Cont</label>
                                            <input
                                                id="bca_contact"
                                                type="text"
                                                placeholder="Masukan Kontak BCA"
                                                className="form-input form-input-lg"
                                                value={formData.data_bank.BCA?.bank_name}
                                                onChange={(e) => setFormData((prev) => ({ ...prev, data_bank: { ...prev.data_bank, BCA: { ...prev.data_bank.BCA, bank_name: e.target.value } } }))}
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="bii">BII</label>
                                            <input
                                                id="bii"
                                                type="number"
                                                placeholder="Masukan Total BII"
                                                className="form-input form-input-lg"
                                                value={formData.data_bank.BII?.account_number}
                                                onChange={(e) => setFormData((prev) => ({ ...prev, data_bank: { ...prev.data_bank, BII: { ...prev.data_bank.BII, account_number: e.target.value } } }))}
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="mandiri">Mandiri</label>
                                            <input
                                                id="mandiri"
                                                type="number"
                                                placeholder="Masukan Total Mandiri"
                                                className="form-input form-input-lg"
                                                value={formData.data_bank.Mandiri?.account_number}
                                                onChange={(e) =>
                                                    setFormData((prev) => ({ ...prev, data_bank: { ...prev.data_bank, Mandiri: { ...prev.data_bank.Mandiri, account_number: e.target.value } } }))
                                                }
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="lain_lain_xendit">LAIN2 XENDIT</label>
                                            <input
                                                id="lain_lain_xendit"
                                                type="number"
                                                placeholder="Masukan Total LAIN2 XENDIT"
                                                className="form-input form-input-lg"
                                                value={formData.data_bank.LAIN2_XENDIT?.account_number}
                                                onChange={(e) =>
                                                    setFormData((prev) => ({
                                                        ...prev,
                                                        data_bank: { ...prev.data_bank, LAIN2_XENDIT: { ...prev.data_bank.LAIN2_XENDIT, account_number: e.target.value } },
                                                    }))
                                                }
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="talangan">TALANGAN</label>
                                            <input
                                                id="talangan"
                                                type="number"
                                                placeholder="Masukan Total talangan"
                                                className="form-input form-input-lg"
                                                value={formData.data_bank.TALANGAN?.account_number}
                                                onChange={(e) =>
                                                    setFormData((prev) => ({ ...prev, data_bank: { ...prev.data_bank, TALANGAN: { ...prev.data_bank.TALANGAN, account_number: e.target.value } } }))
                                                }
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="cash">CASH</label>
                                            <input
                                                id="cash"
                                                type="number"
                                                placeholder="Masukan Total cash"
                                                className="form-input form-input-lg"
                                                value={formData.cash}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="inputLarge">Total (Bank)</label>
                                            <input
                                                id="inputLarge"
                                                type="number"
                                                placeholder="Masukan Total yang harus dibayar"
                                                className="form-input form-input-lg"
                                                value={formData.total_bank}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="inputLarge">Total (Keseluruhan)</label>
                                            <input
                                                id="inputLarge"
                                                type="number"
                                                placeholder="Masukan Total keseluruhan"
                                                className="form-input form-input-lg"
                                                value={formData.total_pengajuan}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-end mt-5">
                                        <button className="btn btn-primary gap-5">Submit</button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TambahPengajuan;
