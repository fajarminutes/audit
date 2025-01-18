import { DataTable } from 'mantine-datatable';    
import { useEffect, useState } from 'react';    
import { Link } from 'react-router-dom';    
import { useDispatch, useSelector } from 'react-redux';    
import { IRootState } from '../../store';    
import { setPageTitle } from '../../store/themeConfigSlice';    
import Swal from 'sweetalert2';    
    
const SemuaDataGdm = () => {    
    const dispatch = useDispatch();    
    useEffect(() => {    
        dispatch(setPageTitle('Semua Data GDM'));    
    }, [dispatch]);    
    
    const PAGE_SIZES = [10, 20, 30, 50, 100];    
    
    const [page, setPage] = useState(1);    
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);    
    const [initialRecords, setInitialRecords] = useState([]);    
    const [search, setSearch] = useState('');    
    
    useEffect(() => {    
        const fetchData = async () => {    
            try {    
                const response = await fetch('https://audtrax.sinarjernihsuksesindo.id/backend/api/gdms');    
                const data = await response.json();    
                setInitialRecords(data);    
            } catch (error) {    
                console.error('Error fetching data:', error);    
            }    
        };    
        fetchData();    
    }, []);    
    
    const filteredData = initialRecords.filter((item) => {    
        return (    
            item.entity.toLowerCase().includes(search.toLowerCase()) ||    
            item.nama_customer.toLowerCase().includes(search.toLowerCase()) ||    
            String(item.total_gdm_ditagihkan).toLowerCase().includes(search.toLowerCase()) ||    
            String(item.potongan_gdm_finance).toLowerCase().includes(search.toLowerCase()) ||    
            String(item.selisih).toLowerCase().includes(search.toLowerCase()) ||    
            item.keterangan.toLowerCase().includes(search.toLowerCase()) ||    
            item.status.toLowerCase().includes(search.toLowerCase())    
        );    
    });    
    
    const paginatedData = filteredData.slice((page - 1) * pageSize, page * pageSize);    
    
    const handleDelete = async (record) => {    
        const result = await Swal.fire({    
            title: 'Konfirmasi Hapus',    
            text: `Apakah Anda yakin ingin menghapus data untuk ${record.nama_customer}?`,    
            icon: 'warning',    
            showCancelButton: true,    
            confirmButtonColor: '#3085d6',    
            cancelButtonColor: '#d33',    
            confirmButtonText: 'Ya, hapus!',    
            cancelButtonText: 'Batal',    
        });    
    
        if (result.isConfirmed) {    
            try {    
                const response = await fetch(`https://audtrax.sinarjernihsuksesindo.id/backend/api/gdms/${record.id}`, {    
                    method: 'DELETE',    
                });    
    
                if (response.ok) {    
                    Swal.fire('Terhapus!', 'Data berhasil dihapus.', 'success');    
                    // Refresh data setelah penghapusan    
                    setInitialRecords(initialRecords.filter(item => item.id !== record.id));    
                } else {    
                    Swal.fire('Error', 'Terjadi kesalahan saat menghapus data.', 'error');    
                }    
            } catch (error) {    
                console.error('Error deleting data:', error);    
                Swal.fire('Error', 'Terjadi kesalahan saat menghapus data.', 'error');    
            }    
        }    
    };    
    
    return (    
        <div>    
            <div className="mb-4.5 px-5 flex md:items-center md:flex-row flex-col gap-5">    
                <h1 className="flex items-center gap-2">Gaji di Muka |</h1>    
                <div className="ltr:ml-auto rtl:mr-auto">    
                    <Link to="/gajidimuka/tambahdatagdm" className="btn btn-primary gap-2">    
                        Tambah Data GDM    
                    </Link>    
                </div>    
            </div>    
            <input    
                type="text"    
                placeholder="Search..."    
                value={search}    
                onChange={(e) => setSearch(e.target.value)}    
                className="mb-4 p-2 border rounded"    
            />    
            <div className="panel">    
                <div className="datatables">    
                    <DataTable    
                        highlightOnHover    
                        striped    
                        className="whitespace-nowrap table-striped table-hover table-bordered table-compact border border-gray-300"    
                        records={paginatedData}    
                        columns={[    
                            { accessor: 'entity', title: 'Entity' },    
                            { accessor: 'nama_customer', title: 'Nama Customer' },    
                            { accessor: 'total_gdm_ditagihkan', title: 'Total GDM Ditagihkan' },    
                            { accessor: 'potongan_gdm_finance', title: 'Potongan GDM Finance' },    
                            { accessor: 'selisih', title: 'Selisih' },    
                            { accessor: 'keterangan', title: 'Keterangan' },    
                            { accessor: 'status', title: 'Status' },    
                            {    
                                accessor: 'aksi',    
                                title: 'Aksi',    
                                render: (record) => (    
                                    <div className="flex gap-2">    
                                        {/* <Link to={`/gajidimuka/detail/${record.id}`} className="btn btn-info btn-sm">    
                                            Detail    
                                        </Link>     */}
                                        <Link to={`/gajidimuka/edit/${record.id}`} className="btn btn-warning btn-sm">    
                                            Edit    
                                        </Link>    
                                        <button className="btn btn-danger btn-sm" onClick={() => handleDelete(record)}>    
                                            Hapus    
                                        </button>    
                                    </div>    
                                ),    
                            },    
                        ]}    
                        totalRecords={filteredData.length}    
                        page={page}    
                        onPageChange={setPage}    
                        recordsPerPage={pageSize}    
                        onRecordsPerPageChange={setPageSize}    
                        recordsPerPageOptions={[10, 20, 30, 50, 100]}    
                        noRecordsText="Tidak ada data"    
                        noRecordsIcon={null}    
                    />    
                </div>    
            </div>    
        </div>    
    );    
};    
    
export default SemuaDataGdm;    
