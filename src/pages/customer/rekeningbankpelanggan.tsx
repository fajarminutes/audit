import { DataTable } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../store';
import { setPageTitle } from '../../store/themeConfigSlice';
import IconPlus from '../../components/Icon/IconPlus';

const rowData = [
    {
        ID: '1',
        NamaPelanggan: 'PT. Alpha',
        NamaBank: 'BCA',
        NomorRekening: '1234567890',
    },
    {
        ID: '2',
        NamaPelanggan: 'PT. Beta',
        NamaBank: 'Mandiri',
        NomorRekening: '0987654321',
    },
];

const RekeningBankPelanggan = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Rekening Bank Pelanggan'));
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
                    item.ID.toString().includes(search4.toLowerCase()) ||
                    item.NamaPelanggan.toLowerCase().includes(search4.toLowerCase()) ||
                    item.NamaBank.toLowerCase().includes(search4.toLowerCase()) ||
                    item.NomorRekening.toLowerCase().includes(search4.toLowerCase())
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
                <h1 className="flex items-center gap-2">Rekening Bank Pelanggan |</h1>
                <div className="ltr:ml-auto rtl:mr-auto">
                    <Link to="/pelanggan/tambahpelanggan" className="btn btn-primary gap-2">
                        Tambah Rekening Bank
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
                            { accessor: 'ID', title: 'ID' },
                            { accessor: 'NamaPelanggan', title: 'Nama Pelanggan' },
                            { accessor: 'NamaBank', title: 'Nama Bank' },
                            { accessor: 'NomorRekening', title: 'Nomor Rekening' },
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

export default RekeningBankPelanggan;
