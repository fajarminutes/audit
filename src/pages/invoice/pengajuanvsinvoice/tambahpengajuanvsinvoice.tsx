import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate  
import AnimateHeight from 'react-animate-height';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../../store/themeConfigSlice';
import IconCaretDown from '../../../components/Icon/IconCaretDown';
import axios from 'axios';

const TambahPVSI = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate  
  const [isLoading, setIsLoading] = useState(false);
  const [active1, setActive1] = useState<string>('1');
  const [formData, setFormData] = useState({
    code: '',
    nomor_customer: '',
    gaji_tanggal: '',
    periode_gaji: '',
    total_invoice: 0,
    total_pengajuan: 0,
    selisih: 0,
    mf_percentage: 0,
    bpjs_tk_4_24: 0,
    bpjs_tk_2: 0,
    pensiun_2: 0,
    pensiun_1: 0,
    bpjs_kes_4: 0,
    bpjs_kes_1: 0,
    gaji_gross_pph: 0,
    kompensasi_pph: 0,
    gaji_gross_non_pph: 0,
    gaji_dimuka: 0,
    priv_id: '',
    dana_talangan: 0,
    pph_21: 0,
    bpjs_tk_2_2: 0,
    bpjs_kes_1_2: 0,
    pensiun_1_2: 0,
    vat: 0,
    potongan_gaji_dimuka: 0,
    potongan: 0,
    lain_lain: 0,
    total: 0,
  });

  useEffect(() => {
    dispatch(setPageTitle('Tambah Pengajuan VS Invoice'));
  }, [dispatch]);

  const togglePara1 = (value: string) => {
    setActive1((oldValue) => (oldValue === value ? '' : value));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post('https://audtrax.sinarjernihsuksesindo.id/backend/api/pvsi', formData);
      console.log('Data submitted successfully:', response.data);

      // Reset form data  
      setFormData({
        code: '',
        nomor_customer: '',
        gaji_tanggal: '',
        periode_gaji: '',
        total_invoice: 0,
        total_pengajuan: 0,
        selisih: 0,
        mf_percentage: 0,
        bpjs_tk_4_24: 0,
        bpjs_tk_2: 0,
        pensiun_2: 0,
        pensiun_1: 0,
        bpjs_kes_4: 0,
        bpjs_kes_1: 0,
        gaji_gross_pph: 0,
        kompensasi_pph: 0,
        gaji_gross_non_pph: 0,
        gaji_dimuka: 0,
        priv_id: '',
        dana_talangan: 0,
        pph_21: 0,
        bpjs_tk_2_2: 0,
        bpjs_kes_1_2: 0,
        pensiun_1_2: 0,
        vat: 0,
        potongan_gaji_dimuka: 0,
        potongan: 0,
        lain_lain: 0,
        total: 0,
      });

      // Navigate to the desired route  
      navigate('/invoice/pengajuanvsinvoice/semuapengajuanvsinvoice');
    } catch (error) {
      console.error('Error submitting data:', error);
    } finally {
      setIsLoading(false); // Set loading to false    
    }
  };

  return (
    <div>
      <h1 className='mb-5'><strong>Report Pengajuan vs Invoice Management  |</strong>|    Add Report</h1>
      <div className="panel">
        <div className="mb-5">
          <div className="border border-[#d3d3d3] dark:border-[#3b3f5c] rounded font-semibold">
            <div className="border-b border-[#d3d3d3] dark:border-[#3b3f5c]">
              <button type="button" className={` ${active1 === '1' ? '!text-primary' : ''} p-4 w-full flex items-center text-white-dark dark:bg-[#1b2e4b]`} onClick={() => togglePara1('1')}>
                Data dari Sheet pengajuan
                <div className={`${active1 === '1' ? 'rotate-180' : ''} ltr:ml-auto rtl:mr-auto`}>
                  <IconCaretDown />
                </div>
              </button>
              <div>
                <AnimateHeight duration={300} height={active1 === '1' ? 'auto' : 0}>
                  <div className="space-y-2 p-4 text-[13px]">
                    <form onSubmit={handleSubmit}>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label htmlFor="code">Code</label>
                          <input id="code" name="code" type="text" className="form-input form-input-lg" value={formData.code} onChange={handleChange} />
                        </div>
                        <div>
                          <label htmlFor="nomor_customer">Nomor Customer</label>
                          <input id="nomor_customer" name="nomor_customer" type="text" className="form-input form-input-lg" value={formData.nomor_customer} onChange={handleChange} />
                        </div>
                        <div>
                          <label htmlFor="gaji_tanggal">Gaji Tanggal</label>
                          <input id="gaji_tanggal" name="gaji_tanggal" type="date" className="form-input form-input-lg" value={formData.gaji_tanggal} onChange={handleChange} />
                        </div>
                        <div>
                          <label htmlFor="periode_gaji">Periode Gaji</label>
                          <input id="periode_gaji" name="periode_gaji" type="month" className="form-input form-input-lg" value={formData.periode_gaji} onChange={handleChange} />
                        </div>
                        <div>
                          <label htmlFor="total_invoice">Total Invoice</label>
                          <input id="total_invoice" name="total_invoice" type="number" className="form-input form-input-lg" value={formData.total_invoice} onChange={handleChange} />
                        </div>
                        <div>
                          <label htmlFor="total_pengajuan">Total Pengajuan</label>
                          <input id="total_pengajuan" name="total_pengajuan" type="number" className="form-input form-input-lg" value={formData.total_pengajuan} onChange={handleChange} />
                        </div>
                        <div>
                          <label htmlFor="selisih">Selisih</label>
                          <input id="selisih" name="selisih" type="number" className="form-input form-input-lg" value={formData.selisih} onChange={handleChange} />
                        </div>
                      </div>
                      <button type="submit" className="btn btn-primary gap-5" disabled={isLoading}>
                        {isLoading ? 'Submitting...' : 'Submit'}
                      </button>
                    </form>
                  </div>
                </AnimateHeight>
              </div>
            </div>

            <div className="border-b border-[#d3d3d3] dark:border-[#3b3f5c]">
              <button type="button" className={` ${active1 === '2' ? '!text-primary' : ''} p-4 w-full flex items-center text-white-dark dark:bg-[#1b2e4b]`} onClick={() => togglePara1('2')}>
                Data dari Lates
                <div className={`${active1 === '2' ? 'rotate-180' : ''} ltr:ml-auto rtl:mr-auto`}>
                  <IconCaretDown />
                </div>
              </button>
              <div>
                <AnimateHeight duration={300} height={active1 === '2' ? 'auto' : 0}>
                  <div className="p-4 text-[13px]">
                    <div className="active ">
                      <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div>
                            <label htmlFor="mf_percentage">MF %</label>
                            <input id="mf_percentage" name="mf_percentage" type="number" className="form-input form-input-lg" value={formData.mf_percentage} onChange={handleChange} />
                          </div>
                          <div>
                            <label htmlFor="bpjs_tk_4_24">BPJS TK 4.24%</label>
                            <input id="bpjs_tk_4_24" name="bpjs_tk_4_24" type="number" className="form-input form-input-lg" value={formData.bpjs_tk_4_24} onChange={handleChange} />
                          </div>
                          <div>
                            <label htmlFor="bpjs_tk_2">BPJS TK 2%</label>
                            <input id="bpjs_tk_2" name="bpjs_tk_2" type="number" className="form-input form-input-lg" value={formData.bpjs_tk_2} onChange={handleChange} />
                          </div>
                          <div>
                            <label htmlFor="pensiun_2">PENSIUN 2%</label>
                            <input id="pensiun_2" name="pensiun_2" type="number" className="form-input form-input-lg" value={formData.pensiun_2} onChange={handleChange} />
                          </div>
                          <div>
                            <label htmlFor="pensiun_1">PENSIUN 1%</label>
                            <input id="pensiun_1" name="pensiun_1" type="number" className="form-input form-input-lg" value={formData.pensiun_1} onChange={handleChange} />
                          </div>
                          <div>
                            <label htmlFor="bpjs_kes_4">BPJS KES 4%</label>
                            <input id="bpjs_kes_4" name="bpjs_kes_4" type="number" className="form-input form-input-lg" value={formData.bpjs_kes_4} onChange={handleChange} />
                          </div>
                          <div>
                            <label htmlFor="bpjs_kes_1">BPJS KES 1%</label>
                            <input id="bpjs_kes_1" name="bpjs_kes_1" type="number" className="form-input form-input-lg" value={formData.bpjs_kes_1} onChange={handleChange} />
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </AnimateHeight>
              </div>
            </div>

            <div>
              <button type="button" className={` ${active1 === '3' ? '!text-primary' : ''} p-4 w-full flex items-center text-white-dark dark:bg-[#1b2e4b]`} onClick={() => togglePara1('3')}>
                Data Dari Sheet Pengajuan (Lanjutan)
                <div className={`${active1 === '3' ? 'rotate-180' : ''} ltr:ml-auto rtl:mr-auto`}>
                  <IconCaretDown />
                </div>
              </button>
              <div>
                <AnimateHeight duration={300} height={active1 === '3' ? 'auto' : 0}>
                  <div className="p-4 text-[13px]">
                    <div>
                      <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div>
                            <label htmlFor="gaji_gross_pph">Gaji Gross-PPH</label>
                            <input id="gaji_gross_pph" name="gaji_gross_pph" type="text" className="form-input form-input-lg" value={formData.gaji_gross_pph} onChange={handleChange} />
                          </div>
                          <div>
                            <label htmlFor="kompensasi_pph">Kompensasi-PPH</label>
                            <input id="kompensasi_pph" name="kompensasi_pph" type="text" className="form-input form-input-lg" value={formData.kompensasi_pph} onChange={handleChange} />
                          </div>
                          <div>
                            <label htmlFor="gaji_gross_non_pph">Gaji Gross-Non PPH</label>
                            <input id="gaji_gross_non_pph" name="gaji_gross_non_pph" type="text" className="form-input form-input-lg" value={formData.gaji_gross_non_pph} onChange={handleChange} />
                          </div>
                          <div>
                            <label htmlFor="gaji_dimuka">Gaji Dimuka</label>
                            <input id="gaji_dimuka" name="gaji_dimuka" type="text" className="form-input form-input-lg" value={formData.gaji_dimuka} onChange={handleChange} />
                          </div>
                          <div>
                            <label htmlFor="priv_id">PRIV ID</label>
                            <input id="priv_id" name="priv_id" type="text" className="form-input form-input-lg" value={formData.priv_id} onChange={handleChange} />
                          </div>
                          <div>
                            <label htmlFor="dana_talangan">Dana Talangan</label>
                            <input id="dana_talangan" name="dana_talangan" type="text" className="form-input form-input-lg" value={formData.dana_talangan} onChange={handleChange} />
                          </div>
                          <div>
                            <label htmlFor="pph_21">PPH 21</label>
                            <input id="pph_21" name="pph_21" type="text" className="form-input form-input-lg" value={formData.pph_21} onChange={handleChange} />
                          </div>
                          <div>
                            <label htmlFor="bpjs_tk_2_2">BPJS TK 2%</label>
                            <input id="bpjs_tk_2_2" name="bpjs_tk_2_2" type="text" className="form-input form-input-lg" value={formData.bpjs_tk_2_2} onChange={handleChange} />
                          </div>
                          <div>
                            <label htmlFor="bpjs_kes_1_2">BPJS KES 1%</label>
                            <input id="bpjs_kes_1_2" name="bpjs_kes_1_2" type="text" className="form-input form-input-lg" value={formData.bpjs_kes_1_2} onChange={handleChange} />
                          </div>
                          <div>
                            <label htmlFor="pensiun_1_2">Pensiun 1%</label>
                            <input id="pensiun_1_2" name="pensiun_1_2" type="text" className="form-input form-input-lg" value={formData.pensiun_1_2} onChange={handleChange} />
                          </div>
                          <div>
                            <label htmlFor="vat">VAT</label>
                            <input id="vat" name="vat" type="text" className="form-input form-input-lg" value={formData.vat} onChange={handleChange} />
                          </div>
                          <div>
                            <label htmlFor="potongan_gaji_dimuka">Potongan Gaji Dimuka</label>
                            <input id="potongan_gaji_dimuka" name="potongan_gaji_dimuka" type="text" className="form-input form-input-lg" value={formData.potongan_gaji_dimuka} onChange={handleChange} />
                          </div>
                          <div>
                            <label htmlFor="potongan">Potongan</label>
                            <input id="potongan" name="potongan" type="text" className="form-input form-input-lg" value={formData.potongan} onChange={handleChange} />
                          </div>
                          <div>
                            <label htmlFor="lain_lain">Lain-lain</label>
                            <input id="lain_lain" name="lain_lain" type="text" className="form-input form-input-lg" value={formData.lain_lain} onChange={handleChange} />
                          </div>
                          <div>
                            <label htmlFor="total">Total</label>
                            <input id="total" name="total" type="text" className="form-input form-input-lg" value={formData.total} onChange={handleChange} />
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </AnimateHeight>
              </div>
            </div>
          </div>
        </div>
        <div>
          <button onClick={(e) => handleSubmit(e as any)} className="btn btn-primary gap-5" disabled={isLoading}>
            {isLoading ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TambahPVSI;