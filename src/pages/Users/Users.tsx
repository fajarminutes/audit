import { DataTable } from 'mantine-datatable';    
import { useEffect, useState } from 'react';    
import { Link } from 'react-router-dom';    
import { useDispatch } from 'react-redux';    
import { setPageTitle } from '../../store/themeConfigSlice';    
import IconPlus from '../../components/Icon/IconPlus';    
import Swal from 'sweetalert2';    
  
const SemuaDataUsers = () => {    
    const dispatch = useDispatch();    
    useEffect(() => {    
        dispatch(setPageTitle('Semua Data Users'));    
    }, [dispatch]);    
  
    const PAGE_SIZES = [10, 20, 30, 50, 100];    
  
    const [page, setPage] = useState(1);    
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);    
    const [recordsData, setRecordsData] = useState([]);    
    const [initialRecords, setInitialRecords] = useState([]);    
    const [search, setSearch] = useState('');    
    const [loading, setLoading] = useState(true); // State untuk loading    
  
    useEffect(() => {    
        const fetchUsers = async () => {    
            try {    
                const response = await fetch('https://intranet.sinarjernihsuksesindo.id/api/users');    
                const data = await response.json();    
                setInitialRecords(data);    
                setRecordsData(data);    
            } catch (error) {    
                console.error('Error fetching users:', error);    
            } finally {    
                setLoading(false); // Set loading ke false setelah data diambil    
            }    
        };    
  
        fetchUsers();    
    }, []);    
  
    useEffect(() => {    
        setPage(1);    
    }, [pageSize]);    
  
    const filteredData = initialRecords.filter((item) => {    
        return (    
            item.name.toLowerCase().includes(search.toLowerCase()) ||    
            item.email.toLowerCase().includes(search.toLowerCase()) ||    
            item.username.toLowerCase().includes(search.toLowerCase()) ||    
            item.status.toLowerCase().includes(search.toLowerCase())    
        );    
    });    
  
    const paginatedData = filteredData.slice((page - 1) * pageSize, page * pageSize);    
  
    const handleDelete = (user) => {    
        Swal.fire({    
            title: 'Konfirmasi Hapus',    
            text: `Apakah Anda yakin ingin menghapus user ${user.name}?`,    
            icon: 'warning',    
            showCancelButton: true,    
            confirmButtonColor: '#3085d6',    
            cancelButtonColor: '#d33',    
            confirmButtonText: 'Ya, hapus!',    
        }).then(async (result) => {    
            if (result.isConfirmed) {    
                try {    
                    const response = await fetch(`https://intranet.sinarjernihsuksesindo.id/api/users/${user.id}`, {    
                        method: 'DELETE',    
                    });    
  
                    if (response.ok) {    
                        setInitialRecords((prevRecords) => prevRecords.filter((item) => item.id !== user.id));    
                        Swal.fire('Terhapus!', 'User berhasil dihapus.', 'success');    
                    } else {    
                        Swal.fire('Error', 'Terjadi kesalahan saat menghapus user.', 'error');    
                    }    
                } catch (error) {    
                    console.error('Error deleting user:', error);    
                    Swal.fire('Error', 'Terjadi kesalahan saat menghapus user.', 'error');    
                }    
            }    
        });    
    };    
  
    return (    
        <div>    
            <div className="mb-4.5 px-5 flex md:items-center md:flex-row flex-col gap-5">    
                <h1 className="flex items-center gap-2">SEMUA DATA USERS |</h1>    
                <div className="ltr:ml-auto rtl:mr-auto">    
                    <Link to="/data/users/tambah" className="btn btn-primary gap-2">    
                        <IconPlus />    
                        Tambah User    
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
                    {loading ? ( // Tampilkan loading jika data sedang diambil    
                        <div>Loading...</div>    
                    ) : (    
                        <DataTable    
                            highlightOnHover    
                            striped    
                            className="whitespace-nowrap table-striped table-hover table-bordered table-compact border border-gray-300"    
                            records={paginatedData}    
                            columns={[    
                                { accessor: 'id', title: 'ID' },    
                                { accessor: 'name', title: 'Name' },    
                                { accessor: 'email', title: 'Email' },    
                                { accessor: 'username', title: 'Username' },    
                                { accessor: 'status', title: 'Status' },    
                                { accessor: 'tanggal_join', title: 'Tanggal Join' },    
                                {    
                                    accessor: 'aksi',    
                                    title: 'Aksi',    
                                    render: (record) => (    
                                        <div className="flex gap-2">    
                                            <Link to={`/users/detail/${record.id}`} className="btn btn-info btn-sm">    
                                                Detail    
                                            </Link>    
                                            <Link to={`/users/edit/${record.id}`} className="btn btn-warning btn-sm">    
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
                            recordsPerPageOptions={PAGE_SIZES}    
                            noRecordsText="Tidak ada data"    
                            noRecordsIcon={null}    
                        />    
                    )}    
                </div>    
            </div>    
        </div>    
    );    
};    
  
export default SemuaDataUsers;    
