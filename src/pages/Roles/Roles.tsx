import { DataTable } from 'mantine-datatable';      
import { useEffect, useState } from 'react';      
import { useDispatch } from 'react-redux';      
import { setPageTitle } from '../../store/themeConfigSlice';      
import Swal from 'sweetalert2';      
  
const SemuaDataRoles = () => {      
    const dispatch = useDispatch();      
    useEffect(() => {      
        dispatch(setPageTitle('Semua Data Roles'));      
    }, [dispatch]);      
  
    const PAGE_SIZES = [10, 20, 30, 50, 100];      
  
    const [page, setPage] = useState(1);      
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);      
    const [recordsData, setRecordsData] = useState([]);      
    const [initialRecords, setInitialRecords] = useState([]);      
    const [search, setSearch] = useState('');      
    const [loading, setLoading] = useState(true); // State untuk loading      
  
    useEffect(() => {      
        const fetchRoles = async () => {      
            try {      
                const response = await fetch('https://intranet.sinarjernihsuksesindo.id/api/roles');      
                const data = await response.json();      
                setInitialRecords(data);      
                setRecordsData(data);      
            } catch (error) {      
                console.error('Error fetching roles:', error);      
            } finally {      
                setLoading(false); // Set loading ke false setelah data diambil      
            }      
        };      
  
        fetchRoles();      
    }, []);      
  
    useEffect(() => {      
        setPage(1);      
    }, [pageSize]);      
  
    const filteredData = initialRecords.filter((item) => {      
        return (      
            item.nama.toLowerCase().includes(search.toLowerCase()) ||      
            item.deskripsi.toLowerCase().includes(search.toLowerCase())      
        );      
    });      
  
    const paginatedData = filteredData.slice((page - 1) * pageSize, page * pageSize);      
  
    return (      
        <div>      
            <div className="mb-4.5 px-5 flex md:items-center md:flex-row flex-col gap-5">      
                <h1 className="flex items-center gap-2">SEMUA DATA ROLES</h1>      
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
                                { accessor: 'nama', title: 'Nama' },      
                                { accessor: 'deskripsi', title: 'Deskripsi' },      
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
  
export default SemuaDataRoles;      
