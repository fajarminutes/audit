import { DataTable } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../store';
import { setPageTitle } from '../../store/themeConfigSlice';
import IconPlus from '../../components/Icon/IconPlus';

const rowData = [
    {
        Entity: 'ENT001',
        CustomerSJS: 'PT. Alpha - SJS001',
        KategoriBPJS: 'Tenaga Kerja',
        TotalPremiBPJSAktual: 'Rp 50,000,000',
        TotalPremiInvoice: 'Rp 45,000,000',
        Selisih: 'Rp 5,000,000',
        Penemuan: 'Penemuan terkait perbedaan premi',
        Alasan: 'Alasan perbedaan premi',
        NamaPemberiFeedback: 'John Doe',
        SolusiJikaAda: 'Solusi yang diusulkan jika ada',
    },
];

const SemuaBpjs = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Semua Data BPJS'));
    }, [dispatch]);
    const PAGE_SIZES = [10, 20, 30, 50, 100];

    const [page4, setPage4] = useState(1);
    const [pageSize4, setPageSize4] = useState(PAGE_SIZES[0]);
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
                    item.Entity.toString().includes(search4.toLowerCase()) ||
                    item.CustomerSJS.toLowerCase().includes(search4.toLowerCase()) ||
                    item.KategoriBPJS.toLowerCase().includes(search4.toLowerCase()) ||
                    item.TotalPremiBPJSAktual.toLowerCase().includes(search4.toLowerCase()) ||
                    item.TotalPremiInvoice.toLowerCase().includes(search4.toLowerCase()) ||
                    item.Selisih.toLowerCase().includes(search4.toLowerCase()) ||
                    item.Penemuan.toLowerCase().includes(search4.toLowerCase()) ||
                    item.Alasan.toLowerCase().includes(search4.toLowerCase()) ||
                    item.NamaPemberiFeedback.toLowerCase().includes(search4.toLowerCase()) ||
                    item.SolusiJikaAda.toLowerCase().includes(search4.toLowerCase())
                );
            });
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search4]);

    const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    const [loading] = useState(false);
    return (
        <div>
            <div className="mb-4.5 px-5 flex md:items-center md:flex-row flex-col gap-5">
                <h1 className="flex items-center gap-2">BPJS KES |</h1>
                <div className="ltr:ml-auto rtl:mr-auto">
                    <Link to="/bpjs/tambahdatabpjs" className="btn btn-primary gap-2">
                        <IconPlus />
                        Tambah Data BPJS KES
                    </Link>
                </div>
            </div>
            <div className="panel">
                <div className="datatables">
                    <DataTable
                        highlightOnHover
                        striped
                        className="whitespace-nowrap table-striped table-hover table-bordered table-compact border border-gray-300"
                        records={recordsData4}
                        columns={[
                            { accessor: 'Entity', title: 'Entity' },
                            { accessor: 'Customer SJS+', title: 'Customer SJS+' },
                            { accessor: 'Kategori BPJS', title: 'Kategori BPJS' },
                            { accessor: 'Total Premi BPJS Aktual', title: 'Total Premi BPJS Aktual' },
                            { accessor: 'Total Premi Invoice', title: 'Total Premi Invoice.' },
                            { accessor: 'Selisih', title: 'Selisih' },
                            { accessor: 'Penemuan', title: 'Penemuan' },
                            { accessor: 'Alasan', title: 'Alasan' },
                            { accessor: 'Nama Pemberi Feedback', title: 'Nama Pemberi Feedback' },
                            { accessor: 'Solusi Jika Ada', title: 'Solusi Jika Ada' },
                            {
                                accessor: 'Aksi',
                                title: 'Aksi',
                                render: (record) => (
                                    <div className="flex gap-2">
                                        <Link to={`/pengajuan/detailpengajuan/`} className="btn btn-info btn-sm">
                                            Detail
                                        </Link>
                                        <Link to={`/editpengajuan/`} className="btn btn-warning btn-sm">
                                            Edit
                                        </Link>
                                        <button className="btn btn-danger btn-sm" onClick={() => handleDelete(record)}>
                                            Hapus
                                        </button>
                                    </div>
                                ),
                            },
                        ]}
                        noRecordsText=""
                        noRecordsIcon={null}
                    />
                </div>
            </div>
        </div>
    );
};

const handleDelete = (record) => {
    console.log('Delete:', record);
    // Tambahkan logika untuk menghapus data di sini
};

export default SemuaBpjs;