import { DataTable } from 'mantine-datatable';        
import { useEffect, useState } from 'react';        
import { Link } from 'react-router-dom';        
import { useDispatch, useSelector } from 'react-redux';        
import { IRootState } from '../../store';        
import { setPageTitle } from '../../store/themeConfigSlice';        
import IconPlus from '../../components/Icon/IconPlus';        
import Swal from 'sweetalert2'; // Import SweetAlert2    
    
const SemuaBpjs = () => {        
    const dispatch = useDispatch();        
    useEffect(() => {        
        dispatch(setPageTitle('Semua Data BPJS'));        
    }, [dispatch]);        
    
    const PAGE_SIZES = [10, 20, 30, 50, 100];        
    
    const [page, setPage] = useState(1);        
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);        
    const [recordsData, setRecordsData] = useState([]);        
    const [initialRecords, setInitialRecords] = useState([]);        
    const [search, setSearch] = useState('');        
    const [loading, setLoading] = useState(true); // State untuk loading        
    
    useEffect(() => {        
        const fetchData = async () => {        
            try {        
                // Fetch data dari endpoint BPJS        
                const responseBPJS = await fetch('https://audtrax.sinarjernihsuksesindo.id/backend/api/bpjs');        
                const dataBPJS = await responseBPJS.json();    
    
                // Fetch data dari endpoint Customer      
                const responseCustomers = await fetch('https://audtrax.sinarjernihsuksesindo.id/backend/api/customers');        
                const dataCustomers = await responseCustomers.json();        
    
                // Mengaitkan data BPJS dengan data Customer      
                const enrichedData = dataBPJS.map(bpjs => {      
                    const customer = dataCustomers.find(c => c.nama_customer === bpjs.customer_sjs_plus);      
                    return {      
                        ...bpjs,      
                        CustomerSJS: customer ? customer.nama_customer : 'Unknown', // Mengambil nama customer      
                    };      
                });      
    
                setInitialRecords(enrichedData); // Simpan data ke initialRecords        
                setRecordsData(enrichedData); // Set recordsData dengan data yang diambil        
            } catch (error) {        
                console.error('Error fetching data:', error);        
            } finally {        
                setLoading(false); // Set loading ke false setelah data diambil        
            }        
        };        
    
        fetchData();        
    }, []);        
    
    useEffect(() => {        
        setPage(1);        
    }, [pageSize]);        
    
    useEffect(() => {        
        const from = (page - 1) * pageSize;        
        const to = from + pageSize;        
        setRecordsData(initialRecords.slice(from, to));        
    }, [page, pageSize, initialRecords]);        
    
    useEffect(() => {        
        const filteredRecords = initialRecords.filter((item) => {        
            return (        
                item.entity.toString().toLowerCase().includes(search.toLowerCase()) ||        
                item.CustomerSJS.toLowerCase().includes(search.toLowerCase()) ||        
                item.kategori_bpjs.toLowerCase().includes(search.toLowerCase()) ||        
                item.total_premi_bpjs_aktual.toString().includes(search.toLowerCase()) ||        
                item.total_premi_invoice.toString().includes(search.toLowerCase()) ||        
                item.selisih.toString().includes(search.toLowerCase()) ||        
                item.penemuan.toLowerCase().includes(search.toLowerCase()) ||        
                item.alasan.toLowerCase().includes(search.toLowerCase()) ||        
                item.nama_pemberi_feedback.toLowerCase().includes(search.toLowerCase()) ||        
                item.solusi.toLowerCase().includes(search.toLowerCase())        
            );        
        });        
        setRecordsData(filteredRecords.slice((page - 1) * pageSize, page * pageSize)); // Update recordsData dengan hasil filter dan pagination  
    }, [search, initialRecords, page, pageSize]);        
    
    const handleDelete = (record) => {        
        Swal.fire({    
            title: 'Konfirmasi Hapus',    
            text: "Apakah Anda yakin ingin menghapus data ini?",    
            icon: 'warning',    
            showCancelButton: true,    
            confirmButtonColor: '#3085d6',    
            cancelButtonColor: '#d33',    
            confirmButtonText: 'Ya, hapus!'    
        }).then(async (result) => {    
            if (result.isConfirmed) {    
                try {    
                    const response = await fetch(`https://audtrax.sinarjernihsuksesindo.id/backend/api/bpjs/${record.id}`, {    
                        method: 'DELETE',    
                    });    
    
                    if (response.ok) {    
                        // Hapus record dari state    
                        setInitialRecords((prevRecords) => prevRecords.filter((item) => item.id !== record.id));    
                        Swal.fire('Terhapus!', 'Data BPJS telah dihapus.', 'success');    
                    } else {    
                        const errorData = await response.json();    
                        Swal.fire('Error', errorData.error, 'error');    
                    }    
                } catch (error) {    
                    console.error('Error deleting data:', error);    
                    Swal.fire('Error', 'Terjadi kesalahan saat menghapus data!', 'error');    
                }    
            }    
        });    
    };        
    
    return (        
        <div>        
            <div className="mb-4.5 px-5 flex md:items-center md:flex-row flex-col gap-5">        
                <h1 className="flex items-center gap-2">SEMUA DATA BPJS |</h1>        
                <div className="ltr:ml-auto rtl:mr-auto">        
                    <Link to="/bpjs/tambahdatabpjs" className="btn btn-primary gap-2">        
                        <IconPlus />        
                        Tambah Data BPJS        
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
                            records={recordsData}        
                            columns={[        
                                { accessor: 'entity', title: 'Entity' },        
                                { accessor: 'CustomerSJS', title: 'Customer SJS+' },        
                                { accessor: 'kategori_bpjs', title: 'Kategori BPJS' },        
                                { accessor: 'total_premi_bpjs_aktual', title: 'Total Premi BPJS Aktual' },        
                                { accessor: 'total_premi_invoice', title: 'Total Premi Invoice' },        
                                { accessor: 'selisih', title: 'Selisih' },        
                                { accessor: 'penemuan', title: 'Penemuan' },        
                                { accessor: 'alasan', title: 'Alasan' },        
                                { accessor: 'nama_pemberi_feedback', title: 'Nama Pemberi Feedback' },        
                                { accessor: 'solusi', title: 'Solusi Jika Ada' },        
                                {        
                                    accessor: 'Aksi',        
                                    title: 'Aksi',        
                                    render: (record) => (        
                                        <div className="flex gap-2">        
                                            {/* <Link to={`/pengajuan/detailbpjs/${record.id}`} className="btn btn-info btn-sm">        
                                                Detail        
                                            </Link>         */}
                                            <Link to={`/bpjs/editdatabpjs/${record.id}`} className="btn btn-warning btn-sm">          
                                                Edit          
                                            </Link>       
                                            <button className="btn btn-danger btn-sm" onClick={() => handleDelete(record)}>        
                                                Hapus        
                                            </button>        
                                        </div>        
                                    ),        
                                },        
                            ]}        
                            totalRecords={recordsData.length}        
                            page={page}        
                            onPageChange={setPage}        
                            recordsPerPage={pageSize}        
                            onRecordsPerPageChange={setPageSize}        
                            recordsPerPageOptions={[10, 20, 30, 50, 100]}        
                            noRecordsText="Tidak ada data"        
                            noRecordsIcon={null}        
                        />        
                    )}        
                </div>        
            </div>        
        </div>        
    );        
};        
    
export default SemuaBpjs;        
