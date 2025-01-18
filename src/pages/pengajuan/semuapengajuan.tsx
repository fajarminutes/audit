import { DataTable } from 'mantine-datatable';  
import { useEffect, useState } from 'react';  
import { Link } from 'react-router-dom';  
import { useDispatch } from 'react-redux';  
import { setPageTitle } from '../../store/themeConfigSlice';  
import IconPlus from '../../components/Icon/IconPlus';  
import Swal from 'sweetalert2'; // Import SweetAlert  
  
const SemuaPengajuan = () => {  
    const dispatch = useDispatch();  
    const [data, setData] = useState([]);  
    const [loading, setLoading] = useState(true);  
    const [error, setError] = useState(null);  
    const [page, setPage] = useState(1);  
    const [pageSize, setPageSize] = useState(10);  
    const [search, setSearch] = useState('');  
  
    useEffect(() => {  
        dispatch(setPageTitle('Semua Pengajuan'));  
    }, [dispatch]);  
  
    useEffect(() => {    
        const fetchData = async () => {    
            try {    
                const response = await fetch('https://audtrax.sinarjernihsuksesindo.id/backend/api/pengajuans');    
                const pengajuanData = await response.json();    
                setData(pengajuanData); // Set data langsung dari respons pengajuan    
            } catch (err) {    
                setError(err);    
                console.error("Error fetching data:", err);    
            } finally {    
                setLoading(false);    
            }    
        };    
    
        fetchData();    
    }, []);     

    
    const showToast = (icon, title) => {  
                const toast = Swal.mixin({  
                    toast: true,  
                    position: 'top-end',  
                    showConfirmButton: false,  
                    timer: 3000,  
                    padding: '10px 20px',  
                });  
                toast.fire({  
                    icon: icon,  
                    title: title,  
                    padding: '10px 20px',  
                });  
            }; 
    const handleDelete = async (record) => {  
        const result = await Swal.fire({  
            title: 'Are you sure?',  
            text: "You won't be able to revert this!",  
            icon: 'warning',  
            showCancelButton: true,  
            confirmButtonColor: '#3085d6',  
            cancelButtonColor: '#d33',  
            confirmButtonText: 'Yes, delete it!'  
        });  
  
        if (result.isConfirmed) {  
            try {  
                const response = await fetch(`https://audtrax.sinarjernihsuksesindo.id/backend/api/pengajuans/${record.id}`, {  
                    method: 'DELETE',  
                });  
  
                if (!response.ok) {  
                    throw new Error('Failed to delete pengajuan');  
                }  
  
                // Panggil showToast untuk notifikasi sukses  
            showToast('success', 'Data berhasil dihapus!');  
            // Arahkan pengguna ke halaman daftar pengguna setelah 3 detik  
                // Refresh the data after deletion  
                setData((prevData) => prevData.filter((item) => item.id !== record.id));  
            } catch (err) {  
                Swal.fire('Error!', 'Failed to delete pengajuan. Please try again.', 'error');  
                console.error("Error deleting pengajuan:", err);  
            }  
        }  
    };  

    const [userData, setUserData] = useState(null);  
  
    useEffect(() => {  
        // Ambil data pengguna dari localStorage  
        const storedUserData = localStorage.getItem('user_data');  
        if (storedUserData) {  
            setUserData(JSON.parse(storedUserData)); // Konversi string ke objek  
        }  
    }, []); 
  
    // Filter and paginate data  
    const filteredData = data.filter((item) => {  
        return (  
            item.nama_customer.toLowerCase().includes(search.toLowerCase()) ||  
            item.nomor_pengajuan.toLowerCase().includes(search.toLowerCase()) ||  
            item.title.toLowerCase().includes(search.toLowerCase())  
        );  
    });  
  
    const paginatedData = filteredData.slice((page - 1) * pageSize, page * pageSize);  
  
    if (loading) return <div>Loading...</div>;  
    if (error) return <div>Error loading data: {error.message}</div>;  
  
  
    return (  
        <div>  
            <div className="mb-4.5 px-5 flex md:items-center md:flex-row flex-col gap-5">  
                <h1 className="flex items-center gap-2">SEMUA PENGAJUAN |</h1>  
                <div className="ltr:ml-auto rtl:mr-auto"> 
                {userData && userData.id_departemen !== '27' && userData.id_departemen !== '2' && userData.id_departemen !== '37' && userData.id_departemen !== '39' && userData.id_departemen !== '34' && userData.id_departemen !== '40' &&  userData.id_departemen !== '29' &&(  
 
                    <>
                    <Link to="/pengajuan/tambahpengajuan" className="btn btn-primary gap-2">  
                        <IconPlus />  
                        Tambah Pengajuan  
                    </Link> 
                    </>
                )}
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
                            { accessor: 'kode_entity', title: 'Entity' },  
                            { accessor: 'nama_customer', title: 'Customer Name' },  
                            { accessor: 'nomor_pengajuan', title: 'Nomor Pengajuan' },  
                            {   
                                accessor: 'tanggal',   
                                title: 'Tanggal Pengajuan',   
                                render: (record) => new Date(record.tanggal).toLocaleDateString('id-ID', {   
                                    day: 'numeric',   
                                    month: 'long',   
                                    year: 'numeric'   
                                })   
                            },  
                             
                            ...(userData && userData.id_departemen !== '27'  && userData.id_departemen !== '2'  && userData.id_departemen !== '39' && userData.id_departemen !== '34'  && userData.id_departemen !== '37'&& userData.id_departemen !== '40' && userData.id_departemen !== '29' ? [{  
                                accessor: 'Aksi',  
                                title: 'Aksi',  
                                render: (record) => (  
                                    <div className="flex gap-2">  
                                        <Link to={`/pengajuan/editpengajuan/${record.id}`} className="btn btn-warning btn-sm">  
                                            Edit  
                                        </Link>  
                                        <button className="btn btn-danger btn-sm" onClick={() => handleDelete(record)}>  
                                            Hapus  
                                        </button>  
                                    </div>  
                                ),  
                            }] : []), // Jika id_departemen adalah 27, kolom ini tidak akan ditambahkan  
                        ]}  
                        totalRecords={filteredData.length}  
                        page={page}  
                        onPageChange={setPage}  
                        recordsPerPage={pageSize}  
                        onRecordsPerPageChange={setPageSize}  
                        recordsPerPageOptions={[10, 20, 30, 50, 100]}  
                        noRecordsText="No records found"  
                        noRecordsIcon={null}  
                    />  
                </div>  
            </div>  
        </div>  
    );  
};  
  
export default SemuaPengajuan;  
