import { Tab } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setPageTitle } from '../../store/themeConfigSlice';

const DetailPengajuan = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Detail Pengajuan'));
    });
    const [tabs, setTabs] = useState<string[]>([]);
    const toggleCode = (name: string) => {
        if (tabs.includes(name)) {
            setTabs((value) => value.filter((d) => d !== name));
        } else {
            setTabs([...tabs, name]);
        }
    };
    return (
        <div>
            <div className="flex items-center justify-between flex-wrap gap-4  mb-5">
                <h1 className="flex items-center gap-2">TAMBAH PENGAJUAN |</h1>
                <div className="flex sm:flex-row flex-col sm:items-center sm:gap-3 gap-4 w-full sm:w-auto">
                    <div className="flex gap-3">
                        <Link to="/pengajuan/semuapengajuan" className="btn btn-primary gap-5">
                            Kembali ke Semua Pengajuan
                        </Link>
                        <Link to="#" className="btn btn-success gap-5">
                            Eksport
                        </Link>
                    </div>
                </div>
            </div>
            <div className="panel mb-5">
                <div className="flex items-center justify-between flex-wrap gap-4  mb-5">
                    <div>
                        <h1 className="mb-3" style={{ fontSize: '25px' }}>
                            Submission Q1
                        </h1>
                        <p className="mb-4">
                            <strong>Customer: </strong>
                            PT. Alpha
                        </p>
                        <p className="mb-4">
                            <strong>Date Submitted: </strong>
                            2024-01-15
                        </p>
                        <p className="mb-3">
                            <strong>Status: </strong>
                            Pending
                        </p>
                        <div className="flex gap-3">
                            <Link to="/pengajuan/reviewpengajuan" className="btn btn-warning gap-5">
                                Review Pengajuan
                            </Link>
                            <Link to="#" className="btn btn-dark gap-5">
                                Edit Pengajuan
                            </Link>
                        </div>
                    </div>
                    <div className="ltr:text-right rtl:text-left px-4">
                        <img src="/assets/images/QR.png" alt="QR Code" style={{ width: '130px', height: '130px' }} />
                        <Link to="#" className="btn btn-info gap-5 mt-3">
                            Preview
                        </Link>
                    </div>
                </div>
            </div>

            <div className="panel" id="simple">
                <div className="mb-5">
                    <Tab.Group>
                        <Tab.List className="mt-3 flex flex-wrap border-b border-white-light dark:border-[#191e3a]">
                            <Tab as={Fragment}>
                                {({ selected }) => (
                                    <button
                                        className={`${selected ? '!border-white-light !border-b-white  text-primary !outline-none dark:!border-[#191e3a] dark:!border-b-black ' : ''}
                                            dark:hover:border-b-black' -mb-[1px] block border border-transparent p-3.5 py-2 hover:text-primary`}
                                    >
                                        Informasi Umum
                                    </button>
                                )}
                            </Tab>
                            <Tab as={Fragment}>
                                {({ selected }) => (
                                    <button
                                        className={`${selected ? '!border-white-light !border-b-white  text-primary !outline-none dark:!border-[#191e3a] dark:!border-b-black ' : ''}
                                            dark:hover:border-b-black' -mb-[1px] block border border-transparent p-3.5 py-2 hover:text-primary`}
                                    >
                                        Informasi Keuangan
                                    </button>
                                )}
                            </Tab>
                            <Tab as={Fragment}>
                                {({ selected }) => (
                                    <button
                                        className={`${selected ? '!border-white-light !border-b-white  text-primary !outline-none dark:!border-[#191e3a] dark:!border-b-black ' : ''}
                                            dark:hover:border-b-black' -mb-[1px] block border border-transparent p-3.5 py-2 hover:text-primary`}
                                    >
                                        Aset/Non-Penggajian
                                    </button>
                                )}
                            </Tab>
                            <Tab as={Fragment}>
                                {({ selected }) => (
                                    <button
                                        className={`${selected ? '!border-white-light !border-b-white  text-primary !outline-none dark:!border-[#191e3a] dark:!border-b-black ' : ''}
                                            dark:hover:border-b-black' -mb-[1px] block border border-transparent p-3.5 py-2 hover:text-primary`}
                                    >
                                        Detail Bank
                                    </button>
                                )}
                            </Tab>
                        </Tab.List>
                        <Tab.Panels>
                            <Tab.Panel>
                                <div className="active pt-5">
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
                                        <div>
                                            <p>Entity</p>
                                            <p>ENT001</p>
                                        </div>
                                        <div>
                                            <p>Customer Name</p>
                                            <p>PT ABC</p>
                                        </div>
                                        <div>
                                            <p>Nomor Pengajuan</p>
                                            <p>123456</p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-2">
                                        <div>
                                            <p>Tanggal Pengajuan</p>
                                            <p>2024-06-20</p>
                                        </div>
                                        <div>
                                            <p>Nama Customer</p>
                                            <p>Customer A</p>
                                        </div>
                                        <div>
                                            <p>NOP yang di Proses</p>
                                            <p>NOP001</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-3">
                                        <Link to="/pengajuan/reviewpengajuan" className="btn btn-warning gap-1 mt-5">
                                            Review Pengajuan
                                        </Link>
                                    </div>
                                </div>
                            </Tab.Panel>
                            <Tab.Panel>
                                <div>
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
                                        <div>
                                            <p>Entity</p>
                                            <p>ENT001</p>
                                        </div>
                                        <div>
                                            <p>Customer Name</p>
                                            <p>PT ABC</p>
                                        </div>
                                        <div>
                                            <p>Nomor Pengajuan</p>
                                            <p>123456</p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-2 mb-5">
                                        <div>
                                            <p>Tanggal Pengajuan</p>
                                            <p>2024-06-20</p>
                                        </div>
                                        <div>
                                            <p>Nama Customer</p>
                                            <p>Customer A</p>
                                        </div>
                                        <div>
                                            <p>NOP yang di Proses</p>
                                            <p>NOP001</p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-2 mb-5">
                                        <div>
                                            <p>Tanggal Pengajuan</p>
                                            <p>2024-06-20</p>
                                        </div>
                                        <div>
                                            <p>Nama Customer</p>
                                            <p>Customer A</p>
                                        </div>
                                        <div>
                                            <p>NOP yang di Proses</p>
                                            <p>NOP001</p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-2 mb-5">
                                        <div>
                                            <p>Tanggal Pengajuan</p>
                                            <p>2024-06-20</p>
                                        </div>
                                        <div>
                                            <p>Nama Customer</p>
                                            <p>Customer A</p>
                                        </div>
                                        <div>
                                            <p>NOP yang di Proses</p>
                                            <p>NOP001</p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-2 mb-5">
                                        <div>
                                            <p>Tanggal Pengajuan</p>
                                            <p>2024-06-20</p>
                                        </div>
                                        <div>
                                            <p>Nama Customer</p>
                                            <p>Customer A</p>
                                        </div>
                                        <div>
                                            <p>NOP yang di Proses</p>
                                            <p>NOP001</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-3">
                                        <Link to="/pengajuan/reviewpengajuan" className="btn btn-warning gap-1 mt-5">
                                            Review Pengajuan
                                        </Link>
                                    </div>
                                </div>
                            </Tab.Panel>
                            <Tab.Panel>
                                <div className="pt-5">
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
                                        <div>
                                            <p>Entity</p>
                                            <p>ENT001</p>
                                        </div>
                                        <div>
                                            <p>Customer Name</p>
                                            <p>PT ABC</p>
                                        </div>
                                        <div>
                                            <p>Nomor Pengajuan</p>
                                            <p>123456</p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-2">
                                        <div>
                                            <p>Tanggal Pengajuan</p>
                                            <p>2024-06-20</p>
                                        </div>
                                        <div>
                                            <p>Nama Customer</p>
                                            <p>Customer A</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-3">
                                        <Link to="/pengajuan/reviewpengajuan" className="btn btn-warning gap-1 mt-5">
                                            Review Pengajuan
                                        </Link>
                                    </div>
                                </div>
                            </Tab.Panel>
                            <Tab.Panel>
                                <div className="active pt-5">
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
                                        <div>
                                            <p>Entity</p>
                                            <p>ENT001</p>
                                        </div>
                                        <div>
                                            <p>Customer Name</p>
                                            <p>PT ABC</p>
                                        </div>
                                        <div>
                                            <p>Nomor Pengajuan</p>
                                            <p>123456</p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-2 mb-5">
                                        <div>
                                            <p>Tanggal Pengajuan</p>
                                            <p>2024-06-20</p>
                                        </div>
                                        <div>
                                            <p>Nama Customer</p>
                                            <p>Customer A</p>
                                        </div>
                                        <div>
                                            <p>NOP yang di Proses</p>
                                            <p>NOP001</p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
                                        <div>
                                            <p>Entity</p>
                                            <p>ENT001</p>
                                        </div>
                                        <div>
                                            <p>Customer Name</p>
                                            <p>PT ABC</p>
                                        </div>
                                        <div>
                                            <p>Nomor Pengajuan</p>
                                            <p>123456</p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-2">
                                        <div>
                                            <p>Tanggal Pengajuan</p>
                                            <p>2024-06-20</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-3">
                                        <Link to="/pengajuan/reviewpengajuan" className="btn btn-warning gap-1 mt-5">
                                            Review Pengajuan
                                        </Link>
                                    </div>
                                </div>
                            </Tab.Panel>
                        </Tab.Panels>
                    </Tab.Group>
                </div>
            </div>
        </div>
    );
};

export default DetailPengajuan;
