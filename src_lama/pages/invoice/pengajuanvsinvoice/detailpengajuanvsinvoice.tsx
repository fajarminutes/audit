import { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AnimateHeight from 'react-animate-height';
import { useDispatch, useSelector } from 'react-redux';
import { setPageTitle } from '../../../store/themeConfigSlice';
import IconCaretDown from '../../../components/Icon/IconCaretDown';

const DetailPVSI = () => {
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
      <h1 className='mb-5'><strong>Report Pengajuan vs Invoice Management |</strong>Report Details</h1>
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
                      <p className="mb-3"><strong>Nama Customer:</strong> PT. ABC</p>
                      <p className="mb-3"><strong>Nama Project:</strong> KD001</p>
                      <p className="mb-3"><strong>Gaji Tgl:</strong> 2024-05-20</p>
                      <p className="mb-3"><strong>Periode Gaji:</strong> 2024-05</p>
                      <p className="mb-3"><strong>Total Invoice:</strong> Rp. 100,000,000</p>
                      <p className="mb-3"><strong>Total Pengajuan:</strong> Rp. 95,000,000</p>
                      <p className="mb-3"><strong>Selisih:</strong> Rp. 5,000,000</p>

                        
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
                    <p className="mb-3"><strong>MF %:</strong> 5%</p>
                    <p className="mb-3"><strong>BPJS TK 4.24%:</strong> Rp. 4,240,000</p>
                    <p className="mb-3"><strong>BPJS TK 2%:</strong> Rp. 2,000,000</p>
                    <p className="mb-3"><strong>PENSIUN 2%:</strong> Rp. 2,000,000</p>
                    <p className="mb-3"><strong>PENSIUN 1%:</strong> Rp. 1,000,000</p>
                    <p className="mb-3"><strong>BPJS KES 4%:</strong> Rp. 4,000,000</p>
                    <p className="mb-3"><strong>BPJS KES 1%:</strong> Rp. 1,000,000</p>
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
                    <p className="mb-3"><strong>Deposit Asset:</strong> Rp. 5,000,000</p>
                    <p className="mb-3"><strong>Deposit THR:</strong> Rp. 3,000,000</p>
                    <p className="mb-3"><strong>Deposit Kompensasi:</strong> Rp. 2,000,000</p>
                    <p className="mb-3"><strong>Deposit Seragam:</strong> Rp. 1,000,000</p>
                    <p className="mb-3"><strong>PPH 21:</strong> Rp. 5,000,000</p>
                    <p className="mb-3"><strong>PPN %:</strong> 11%</p>
                    <p className="mb-3"><strong>BY. KOMISI Pihak ke 3:</strong> Rp. 500,000</p>
                    <p className="mb-3"><strong>Pot. Lain:</strong> Rp. 1,000,000</p>
                    <p className="mb-3"><strong>Pot. Talangan:</strong> Rp. 2,000,000</p>
                    <p className="mb-3"><strong>Pot. Gaji di Muka:</strong> Rp. 3,000,000</p>
                    <p className="mb-3"><strong>Lain-Lain 1:</strong> Rp. 1,000,000</p>
                    <p className="mb-3"><strong>Lain-Lain 2:</strong> Rp. 2,000,000</p>
                    <p className="mb-3"><strong>Total:</strong> Rp. 37,740,000</p>
                    <p className="mb-3"><strong>Adjustment:</strong> Rp. 1,000,000</p>
                    <p className="mb-3"><strong>PPH 23:</strong> Rp. 5,000,000</p>
                    <p className="mb-3"><strong>Total after Adjustment:</strong> Rp. 43,740,000</p>
                    <p className="mb-3"><strong>Selisih after Adjustment:</strong> Rp. 1,260,000</p>
                    <p className="mb-3"><strong>Balance:</strong> Rp. 3,740,000</p>

                  </div>
                </AnimateHeight>
              </div>
            </div>
          </div>
        </div>
        <div>
        <button className='btn btn-dark'>
        Edit
        </button>
        </div>
      </div>
    </div>
  );
};
export default DetailPVSI;
