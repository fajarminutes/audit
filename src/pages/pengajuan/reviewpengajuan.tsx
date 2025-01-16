import { DataTable } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../store';
import { setPageTitle } from '../../store/themeConfigSlice';
import IconPlus from '../../components/Icon/IconPlus';
import clsx from 'clsx';

const rowData = [
    { Parameter: 'Gaji Gross-PPH', Pengajuan: 'Rp 5.000.000', Invoice: 'Rp 5.000.000', Payroll: 'Rp 5.000.000', BPJS: '-', Pajak: '-', NonPenggajian: '-', Validasi: 'Valid' },
    { Parameter: 'Kompensasi-PPH', Pengajuan: 'Rp 2.000.000', Invoice: 'Rp 2.000.000', Payroll: 'Rp 2.000.000', BPJS: '-', Pajak: '-', NonPenggajian: '-', Validasi: 'Valid' },
    { Parameter: 'Gaji Gross-Non PPH', Pengajuan: 'Rp 7.000.000', Invoice: 'Rp 7.500.000', Payroll: 'Rp 7.000.000', BPJS: '-', Pajak: '-', NonPenggajian: '-', Validasi: 'Tidak Sinkron' },
    { Parameter: 'Gaji Dimuka', Pengajuan: 'Rp 1.000.000', Invoice: 'Rp 1.000.000', Payroll: 'Rp 1.000.000', BPJS: '-', Pajak: '-', NonPenggajian: '-', Validasi: 'Valid' },
    { Parameter: 'BPJS TK 2%', Pengajuan: 'Rp 100.000', Invoice: '-', Payroll: '-', BPJS: 'Rp 100.000', Pajak: '-', NonPenggajian: '-', Validasi: 'Valid' },
    { Parameter: 'PPH 21', Pengajuan: 'Rp 300.000', Invoice: '-', Payroll: '-', BPJS: '-', Pajak: 'Rp 300.000', NonPenggajian: '-', Validasi: 'Valid' },
    { Parameter: 'Potongan Gaji Dimuka', Pengajuan: 'Rp 20.000', Invoice: '-', Payroll: '-', BPJS: '-', Pajak: '-', NonPenggajian: 'Rp 20.000', Validasi: 'Valid' },
    { Parameter: 'Privy ID', Pengajuan: 'Rp 150.000', Invoice: 'Rp 150.000', Payroll: 'Rp 150.000', BPJS: '-', Pajak: '-', NonPenggajian: '-', Validasi: 'Valid' },
    { Parameter: 'Dana Talangan', Pengajuan: 'Rp 500.000', Invoice: 'Rp 500.000', Payroll: 'Rp 500.000', BPJS: '-', Pajak: '-', NonPenggajian: '-', Validasi: 'Valid' },
    { Parameter: 'BPJS Kesehatan 2%', Pengajuan: 'Rp 200.000', Invoice: '-', Payroll: '-', BPJS: 'Rp 200.000', Pajak: '-', NonPenggajian: '-', Validasi: 'Valid' },
    { Parameter: 'BPJS Pensiun 1%', Pengajuan: 'Rp 50.000', Invoice: '-', Payroll: '-', BPJS: 'Rp 50.000', Pajak: '-', NonPenggajian: '-', Validasi: 'Valid' },
    { Parameter: 'VAT', Pengajuan: 'Rp 100.000', Invoice: '-', Payroll: '-', BPJS: '-', Pajak: 'Rp 100.000', NonPenggajian: '-', Validasi: 'Valid' },
    { Parameter: 'Potongan', Pengajuan: 'Rp 300.000', Invoice: '-', Payroll: '-', BPJS: '-', Pajak: '-', NonPenggajian: 'Rp 300.000', Validasi: 'Valid' },
    { Parameter: 'Lain-Lain', Pengajuan: 'Rp 500.000', Invoice: '-', Payroll: '-', BPJS: '-', Pajak: '-', NonPenggajian: 'Rp 500.000', Validasi: 'Valid' },
];

const ReviewPengajuan = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Review Pengajuan'));
    }, [dispatch]);

    const PAGE_SIZES = [10, 20, 30, 50, 100];

    const [page4, setPage4] = useState(1);
    const [pageSize4, setPageSize4] = useState(14); // Set default page size to 14
    const [initialRecords4, setInitialRecords4] = useState(rowData);
    const [recordsData4, setRecordsData4] = useState(initialRecords4);

    const [search4, setSearch4] = useState('');

    useEffect(() => {
        setPage4(1);
    }, [pageSize4]);

    useEffect(() => {
        const from = (page4 - 1) * pageSize4;
        const to = from + pageSize4;
        setRecordsData4([...initialRecords4.slice(from, to)]);
    }, [page4, pageSize4, initialRecords4]);

    useEffect(() => {
        setInitialRecords4(() => {
            return rowData.filter((item) => {
                return (
                    item.Parameter.toString().includes(search4.toLowerCase()) ||
                    item.Pengajuan.toLowerCase().includes(search4.toLowerCase()) ||
                    item.Invoice.toLowerCase().includes(search4.toLowerCase()) ||
                    item.Payroll.toLowerCase().includes(search4.toLowerCase()) ||
                    item.BPJS.toLowerCase().includes(search4.toLowerCase()) ||
                    item.Pajak.toLowerCase().includes(search4.toLowerCase()) ||
                    item.NonPenggajian.toLowerCase().includes(search4.toLowerCase()) ||
                    item.Validasi.toLowerCase().includes(search4.toLowerCase())
                );
            });
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search4]);

    const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass === 'rtl');

    const [loading] = useState(false);

    const getValidasiClass = (validasi) => {
        return clsx({
            'text-green-600 font-bold': validasi === 'Valid',
            'text-red-600 font-bold': validasi === 'Tidak Sinkron',
        });
    };

    return (
        <div>
            <div className="mb-4.5 px-5 flex md:items-center md:flex-row flex-col gap-5">
                <h1 className="flex items-center gap-2">REVIEW PENGAJUAN |</h1>
                <div className="ltr:ml-auto rtl:mr-auto">
                    <Link to="/pengajuan/semuapengajuan" className="btn btn-primary gap-2">
                        Kembali Ke Semua Pengajuan
                    </Link>
                </div>
            </div>
            <div className="panel">
                <h2 className="mb-4.5">Review Pengajuan #123456</h2>
                <div className="datatables">
                    <DataTable
                        highlightOnHover
                        striped
                        className="whitespace-nowrap table-striped table-hover table-bordered table-compact border border-gray-300"
                        records={recordsData4}
                        columns={[
                            { accessor: 'Parameter', title: 'Parameter' },
                            { accessor: 'Pengajuan', title: 'Pengajuan' },
                            { accessor: 'Invoice', title: 'Invoice' },
                            { accessor: 'Payroll', title: 'Payroll' },
                            { accessor: 'BPJS', title: 'BPJS' },
                            { accessor: 'Pajak', title: 'Pajak' },
                            { accessor: 'NonPenggajian', title: 'Non-Penggajian' },
                            {
                                accessor: 'Validasi',
                                title: 'Validasi',
                                render: ({ Validasi }) => <span className={getValidasiClass(Validasi)}>{Validasi}</span>,
                            },
                        ]}
                        noRecordsText=""
                        noRecordsIcon={null}
                    />
                </div>
                <h2 className="mb-4.5">Statistik Pengajuan</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4.5">
                    <div className="card text-center bg-white shadow-md p-4">
                        <h3 className="text-xl font-bold">Total Pengajuan</h3>
                        <p className="text-2xl font-bold">Rp 15.000.000</p>
                    </div>
                    <div className="card text-center bg-green-500 text-white shadow-md p-4">
                        <h3 className="text-xl font-bold">Pengajuan Valid</h3>
                        <p className="text-2xl font-bold">Rp 13.000.000</p>
                    </div>
                    <div className="card text-center bg-red-500 text-white shadow-md p-4">
                        <h3 className="text-xl font-bold">Pengajuan Tidak Valid</h3>
                        <p className="text-2xl font-bold">Rp 2.000.000</p>
                    </div>
                </div>
                <div className="text-center">
                    <button className="btn btn-primary">Edit Pengajuan</button>
                </div>
            </div>
        </div>
    );
};

export default ReviewPengajuan;
