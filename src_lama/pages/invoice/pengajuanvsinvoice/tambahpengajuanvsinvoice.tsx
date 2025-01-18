import { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AnimateHeight from 'react-animate-height';
import { useDispatch, useSelector } from 'react-redux';
import { setPageTitle } from '../../../store/themeConfigSlice';
import IconCaretDown from '../../../components/Icon/IconCaretDown';

const TambahPVSI = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setPageTitle('Tambah Pengajuan VS Invoice'));
  });
  const [tabs, setTabs] = useState<string[]>([]);
  const toggleCode = (name: string) => {
    if (tabs.includes(name)) {
      setTabs((value) => value.filter((d) => d !== name));
    } else {
      setTabs([...tabs, name]);
    }
  };

  const [active, setActive] = useState<string>('1');
  const togglePara = (value: string) => {
    setActive((oldValue) => {
      return oldValue === value ? '' : value;
    });
  };
  const [active1, setActive1] = useState<string>('1');
  const togglePara1 = (value: string) => {
    setActive1((oldValue) => {
      return oldValue === value ? '' : value;
    });
  };
  const [active2, setActive2] = useState<string>('1');
  const togglePara2 = (value: string) => {
    setActive2((oldValue) => {
      return oldValue === value ? '' : value;
    });
  };
  const [active3, setActive3] = useState<string>('1');
  const togglePara3 = (value: string) => {
    setActive3((oldValue) => {
      return oldValue === value ? '' : value;
    });
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
                  <div className="space-y-2 p-4  text-[13px]">
                   
                        <form>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div>
                                    <label htmlFor="itemInvoice">Code  </label>
                                    <input id="itemInvoice" type="text" className="form-input form-input-lg" />
                                </div>
                                <div>
                                    <label htmlFor="nomorInvoice">Nomor Customer</label>
                                    <input id="nomorInvoice" type="text" className="form-input form-input-lg" />
                                </div>
                                <div>
                                    <label htmlFor="hardCopyTarget">Gaji Tnggal</label>
                                    <input id="hardCopyTarget" type="date" className="form-input form-input-lg" placeholder="dd/mm/yyyy" />
                                </div>
                                <div>
                                    <label htmlFor="periodeInvoice">Periode gaji</label>
                                    <input id="periodeInvoice" type="month" className="form-input form-input-lg" placeholder="-------- ----" />
                                </div>
                                <div>
                                    <label htmlFor="periodeCetakInvoice">Total Invoice</label>
                                    <input id="periodeCetakInvoice" type="Number" className="form-input form-input-lg"  />
                                </div>
                                <div>
                                    <label htmlFor="noFakturPajak">Total Pengajuan</label>
                                    <input id="noFakturPajak" type="Number" className="form-input form-input-lg" />
                                </div>
                                <div>
                                    <label htmlFor="nomorPO">Selisih</label>
                                    <input id="nomorPO" type="number" className="form-input form-input-lg" />
                                </div>
                            </div>
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
                        <form>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div>
                                    <label htmlFor="itemInvoice">MF %  </label>
                                    <input id="itemInvoice" type="number" className="form-input form-input-lg" />
                                </div>
                                <div>
                                    <label htmlFor="nomorInvoice">BPJS TK 4.24%</label>
                                    <input id="nomorInvoice" type="number" className="form-input form-input-lg" />
                                </div>
                                <div>
                                    <label htmlFor="hardCopyTarget">BPJS TK 2%</label>
                                    <input id="hardCopyTarget" type="number" className="form-input form-input-lg" />
                                </div>
                                <div>
                                    <label htmlFor="periodeInvoice">PENSIUN 2%</label>
                                    <input id="periodeInvoice" type="number" className="form-input form-input-lg"  />
                                </div>
                                <div>
                                    <label htmlFor="periodeCetakInvoice">PENSIUN 1%</label>
                                    <input id="periodeCetakInvoice" type="Number" className="form-input form-input-lg"  />
                                </div>
                                <div>
                                    <label htmlFor="noFakturPajak">BPJS KES 4%</label>
                                    <input id="noFakturPajak" type="Number" className="form-input form-input-lg" />
                                </div>
                                <div>
                                    <label htmlFor="nomorPO">BPJS KES 1%</label>
                                    <input id="nomorPO" type="number" className="form-input form-input-lg" />
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
                        <form>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div>
                                    <label htmlFor="inputLarge">Gaji Gross-PPH</label>
                                    <input id="inputLarge" type="text" className="form-input form-input-lg" />
                                </div>
                                <div>
                                    <label htmlFor="inputLarge">Kompensasi-PPH</label>
                                    <input id="inputLarge" type="text" className="form-input form-input-lg" />
                                </div>
                                <div>
                                    <label htmlFor="inputLarge">Gaji Gross-Non PPH</label>
                                    <input id="inputLarge" type="text" className="form-input form-input-lg" />
                                </div>
                                <div>
                                    <label htmlFor="inputLarge">Gaji Dimuka</label>
                                    <input id="inputLarge" type="text" className="form-input form-input-lg" />
                                </div>
                                <div>
                                    <label htmlFor="inputLarge">PRIV ID</label>
                                    <input id="inputLarge" type="text"className="form-input form-input-lg" />
                                </div>
                                <div>
                                    <label htmlFor="inputLarge">Dana Talangan</label>
                                    <input id="inputLarge" type="text" className="form-input form-input-lg" />
                                </div>
                                <div>
                                    <label htmlFor="inputLarge">PPH 21</label>
                                    <input id="inputLarge" type="text" className="form-input form-input-lg" />
                                </div>
                                <div>
                                    <label htmlFor="inputLarge">BPJS TK 2%</label>
                                    <input id="inputLarge" type="text" className="form-input form-input-lg" />
                                </div>
                                <div>
                                    <label htmlFor="inputLarge">BPJS KES 1%</label>
                                    <input id="inputLarge" type="text" className="form-input form-input-lg" />
                                </div>
                                <div>
                                    <label htmlFor="inputLarge">Pensiun 1%</label>
                                    <input id="inputLarge" type="text"className="form-input form-input-lg" />
                                </div>
                                <div>
                                    <label htmlFor="inputLarge">VAT</label>
                                    <input id="inputLarge" type="text" className="form-input form-input-lg" />
                                </div>
                                <div>
                                    <label htmlFor="inputLarge">Potongan Gaji Dimuka</label>
                                    <input id="inputLarge" type="text"  className="form-input form-input-lg" />
                                </div>
                                <div>
                                    <label htmlFor="inputLarge">Potongan</label>
                                    <input id="inputLarge" type="text"  className="form-input form-input-lg" />
                                </div>
                                <div>
                                    <label htmlFor="inputLarge">Lain-lain</label>
                                    <input id="inputLarge" type="text" className="form-input form-input-lg" />
                                </div>
                                <div>
                                    <label htmlFor="inputLarge">Total</label>
                                    <input id="inputLarge" type="text" className="form-input form-input-lg" />
                                </div>
                                <div>
                                  <label htmlFor="inputLarge">Potongan</label>
                                  <input id="inputLarge" type="text" className="form-input form-input-lg" />
                                </div>
                                <div>
                                  <label htmlFor="inputLarge">Lain-lain</label>
                                  <input id="inputLarge" type="text"  className="form-input form-input-lg" />
                                </div>
                                <div>
                                  <label htmlFor="inputLarge">Total</label>
                                  <input id="inputLarge" type="text" placeholder=" " className="form-input form-input-lg" />
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
        <button className='btn btn-primary'>
        Submit
        </button>
        </div>
      </div>
    </div>
  );
};
export default TambahPVSI;
