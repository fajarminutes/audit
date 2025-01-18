import { Tab } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../store/themeConfigSlice';
import IconPlus from '../../components/Icon/IconPlus';
import { PengajuanRequest } from '../../types/PengajuanType';
import { useCreatePengajuan } from '../../hooks/pengajuanHooks/usePengajuan';

const TambahPengajuan = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Tambah Pengajuan'));
    });
    const [isOpen, setIsOpen] = useState<number | null>(null);
    const toggleAccordion = (index: number) => {
        setIsOpen(isOpen === index ? null : index);
    };

    

    const { mutate: createPengajuan, isLoading: isCreatingPengajuan, error: createPengajuanError } = useCreatePengajuan();
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
        subtotal_pengajuan_umum: 0,
        adjustment: 0,
        pph23: 0,
        subtotal_adjustment: 0,
        total_3: 0,
        gaji_gross_pph: 0,
        kompensasi_pph: 0,
        gaji_gross_non_pph: 0,
        cash: 0,
        total_bank: 0,
        total_invoice: 0,
        total_pengajuan: 0,
        selisih_a: 0,
        selisih_b: 0,
        title: '',
        pengajuan_umum_lain2: [],
        asset_non_penggajian: [],
        data_bank: [] // Tambahkan ini
    });

    const [kodeEntities, setKodeEntities] = useState([]);
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        // Fetch kode entities
        const fetchKodeEntities = async () => {
            const response = await fetch('https://audtrax.sinarjernihsuksesindo.id/backend/api/master_kodes');
            const data = await response.json();
            setKodeEntities(data);
        };

        // Fetch customers
        const fetchCustomers = async () => {
            const response = await fetch('https://audtrax.sinarjernihsuksesindo.id/backend/api/customers');
            const data = await response.json();
            setCustomers(data);
        };

        fetchKodeEntities();
        fetchCustomers();
    }, []);

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
                total_pengajuan: calculateTotal(newDataBank) // Recalculate total
            };
        });
    };
    
    const handleDataBankChange = (index: number, field: string, value: string | number) => {
        const newDataBank = [...formData.data_bank];
        newDataBank[index][field] = value;
        setFormData(prev => ({
            ...prev,
            data_bank: newDataBank,
            total_pengajuan: calculateTotal(newDataBank) // Recalculate total
        }));
    };

    const calculateTotal = (dataBank) => {
        return dataBank.reduce((total, item) => total + (Number(item.jumlah) || 0), 0);
    };


    const handleKodeEntityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedKodeEntity = e.target.value;
        const selectedEntity = kodeEntities.find(entity => entity.penulisan_kode === selectedKodeEntity);
        if (selectedEntity) {
            const customer = customers.find(c => c.id === selectedEntity.id_customer);
            setFormData(prev => ({
                ...prev,
                kode_entity: selectedKodeEntity,
                nama_customer: customer ? customer.nama_customer : ''
            }));
        }
    };

    const addDataBank = () => {
        setFormData((prev) => ({
            ...prev,
            data_bank: [...prev.data_bank, { bank_name: '', jumlah: 0 }]
        }));
    };
    
    const removeDataBank = (index: number) => {
        setFormData((prev) => ({
            ...prev,
            data_bank: prev.data_bank.filter((_, i) => i !== index)
        }));
    };
    
    const handleDataBankChange = (index: number, field: string, value: string | number) => {
        const newDataBank = [...formData.data_bank];
        newDataBank[index][field] = value;
        setFormData((prev) => ({ ...prev, data_bank: newDataBank }));
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

    

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setFormData((prev: PengajuanRequest) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Validate form data here if needed
        if (!formData.kode_entity) {
            alert('Please fill in all required fields.');
            return;
        }

        // Update date in formData before sending
        const payload = { ...formData, tanggal: tanggal?.toISOString() || '' };

        createPengajuan(payload, {
            onSuccess: () => {
                alert('Pengajuan created successfully!');
                // Reset form after submission
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
                                                <input id="tanggal" type="date" className="form-input form-input-lg" value={formData.tanggal} />
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
                                                {kodeEntities.map(entity => (
                                                    <option key={entity.id} value={entity.penulisan_kode}>{entity.penulisan_kode}</option>
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
                                            <label htmlFor="selisih_a">Selisih A</label>
                                            <input
                                                id="selisih_a"
                                                type="text"
                                                placeholder="Masukan Total Pengajuan yang diproses"
                                                className="form-input form-input-lg"
                                                value={formData.selisih_a}
                                                onChange={handleInputChange}
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
                <label htmlFor="total_ii" className="block text-gray-700 font-medium mb-1">TOTAL II</label>
                <input
                    id="total_ii"
                    type="number"
                    placeholder="Masukkan nilai"
                    className="form-input w-full border-gray-300 rounded-md"
                    value={formData.total_ii}
                    onChange={handleInputChange}
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
