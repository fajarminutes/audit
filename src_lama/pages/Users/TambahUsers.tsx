import { useEffect, useState } from 'react';  
import { Link, useNavigate } from 'react-router-dom';  
import { useDispatch } from 'react-redux';  
import { setPageTitle } from '../../store/themeConfigSlice';  
import Swal from 'sweetalert2';  
  
const TambahDataUsers = () => {  
    const dispatch = useDispatch();  
    useEffect(() => {  
        dispatch(setPageTitle('Tambah Data Users'));  
    }, [dispatch]);  
  
    const navigate = useNavigate();  
    const [formData, setFormData] = useState({  
        foto: null,  
        username: '',  
        name: '',  
        email: '', // Tambahkan field email
        password: '', // Tambahkan field password
        id_pegawai: '',  
        jenis_kelamin: '',  
        tempat_lahir: '',  
        tanggal_lahir: '',  
        id_departemen: '',  
        id_departemen2: '',  
        id_jabatan: '',  
        no_hp: '',  
        alamat: '',  
        no_bpjs: '',  
        tanggal_join: '',  
        tanggal_masuk: '',  
        tanggal_berakhir: '',  
        status: '1', // Default status aktif  
    });  
  
    const [departemen, setDepartemen] = useState([]);  
    const [id_pegawai, setPegawai] = useState([]);  
    const [id_jabatans, setJabatans] = useState([]);  
    const [isLoading, setIsLoading] = useState(false); // State untuk loading  
  
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
  
    const handleSubmit = async (e) => {  
        e.preventDefault();  
        setIsLoading(true); // Set loading to true  
        try {  
            const response = await fetch('https://intranet.sinarjernihsuksesindo.id/api/users', {  
                method: 'POST',  
                headers: {  
                    'Content-Type': 'application/json',  
                    'Accept': 'application/json',
                },  
                body: JSON.stringify(formData), // Pastikan formData memiliki semua field yang diperlukan  
            });  
            const result = await response.json();  
            if (response.ok) {  
                // Panggil showToast untuk notifikasi sukses  
                showToast('success', 'Data pengguna berhasil ditambahkan!');  
                // Arahkan pengguna ke halaman daftar pengguna setelah 3 detik  
                setTimeout(() => {  
                    navigate('/data/users'); // Ganti dengan rute yang sesuai  
                }, 3000); // Waktu delay sesuai dengan timer notifikasi  
            } else {  
                // Panggil showToast untuk notifikasi error  
                showToast('error', `Error: ${result.error}`);  
            }  
        } catch (error) {  
            console.error('Error submitting data:', error);  
            // Panggil showToast untuk notifikasi error jaringan  
            showToast('error', 'Terjadi kesalahan saat mengirim data!');  
        } finally {  
            setIsLoading(false); // Set loading to false after the process  
        }  
    };  
  
    const fetchDepartemen = async () => {  
        try {  
            const response = await fetch('https://intranet.sinarjernihsuksesindo.id/api/departemen');  
            const data = await response.json();  
            setDepartemen(data);  
        } catch (error) {  
            console.error('Error fetching departemen:', error);  
        }  
    };  
    const fetchPegawai = async () => {  
        try {  
            const response = await fetch('https://intranet.sinarjernihsuksesindo.id/api/pegawai');  
            const data = await response.json();  
            setPegawai(data);  
        } catch (error) {  
            console.error('Error fetching pegawai:', error);  
        }  
    };  
  
    const fetchJabatans = async () => {  
        try {  
            const response = await fetch('https://intranet.sinarjernihsuksesindo.id/api/jabatans');  
            const data = await response.json();  
            setJabatans(data);  
        } catch (error) {  
            console.error('Error fetching jabatans:', error);  
        }  
    };  
  
    useEffect(() => {  
        fetchDepartemen();  
        fetchJabatans();  
        fetchPegawai();  
    }, []);  
  
    return (  
        <div>  
            <div className="flex items-center justify-between flex-wrap gap-4 mb-5">  
                <h1 className="flex items-center gap-2">TAMBAH DATA USERS |</h1>  
                <div className="flex sm:flex-row flex-col sm:items-center sm:gap-3 gap-4 w-full sm:w-auto">  
                    <Link to="/users" className="btn btn-primary gap-5">  
                        Kembali ke Semua Data Users  
                    </Link>  
                </div>  
            </div>  
            <div className="panel">  
                <div className="mb-5">  
                    <form onSubmit={handleSubmit}>  
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">  
                            <div>  
                                <label htmlFor="foto">Foto Profil</label>  
                                <input  
                                    id="foto"  
                                    type="file"  
                                    className="form-input form-input-lg"  
                                    onChange={(e) => setFormData({ ...formData, foto: e.target.files[0] })}  
                                />  
                            </div>  
                            <div>  
                                <label htmlFor="username">Username</label>  
                                <input  
                                    id="username"  
                                    type="text"  
                                    className="form-input form-input-lg"  
                                    value={formData.username}  
                                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}  
                                    required  
                                />  
                            </div>  
                            <div>  
                                <label htmlFor="name">Nama Lengkap</label>  
                                <input  
                                    id="name"  
                                    type="text"  
                                    className="form-input form-input-lg"  
                                    value={formData.name}  
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}  
                                    required  
                                />  
                            </div>  
                            <div>
    <label htmlFor="email">Email</label>
    <input
        id="email"
        type="email"
        className="form-input form-input-lg"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        required
    />
</div>
<div>
    <label htmlFor="password">Password</label>
    <input
        id="password"
        type="password"
        className="form-input form-input-lg"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        required
    />
</div>

                            <div>  
                                <label htmlFor="id_pegawai">ID</label>  
                                <input  
                                    id="id_pegawai"  
                                    type="text"  
                                    className="form-input form-input-lg"  
                                    value={formData.id_pegawai}  
                                    onChange={(e) => setFormData({ ...formData, id_pegawai: e.target.value })}  
                                    required  
                                />  
                            </div> 

                            {/* <div>  
                                <label htmlFor="id_departemen">ID Pegawai</label>  
                                <select  
                                    id="id_departemen"  
                                    className="form-input form-input-lg"  
                                    value={formData.id_departemen}  
                                    onChange={(e) => setFormData({ ...formData, id_departemen: e.target.value })}  
                                    required  
                                >  
                                    <option value="">--Pilih ID Pegawai--</option>  
                                    {id_pegawai.map((peg) => (  
                                        <option key={peg.id} value={peg.id}>  
                                            {peg.nama}  
                                        </option>  
                                    ))}  
                                </select>  
                            </div>  */}
                            <div>  
                                <label htmlFor="jenis_kelamin">Jenis Kelamin</label>  
                                <select  
                                    id="jenis_kelamin"  
                                    className="form-input form-input-lg"  
                                    value={formData.jenis_kelamin}  
                                    onChange={(e) => setFormData({ ...formData, jenis_kelamin: e.target.value })}  
                                    required  
                                >  
                                    <option value="">Pilih Jenis Kelamin</option>  
                                    <option value="1">Laki-laki</option>  
                                    <option value="2">Perempuan</option>  
                                </select>  
                            </div>  
                            <div>  
                                <label htmlFor="tempat_lahir">Tempat Lahir</label>  
                                <input  
                                    id="tempat_lahir"  
                                    type="text"  
                                    className="form-input form-input-lg"  
                                    value={formData.tempat_lahir}  
                                    onChange={(e) => setFormData({ ...formData, tempat_lahir: e.target.value })}  
                                    required  
                                />  
                            </div>  
                            <div>  
                                <label htmlFor="tanggal_lahir">Tanggal Lahir</label>  
                                <input  
                                    id="tanggal_lahir"  
                                    type="date"  
                                    className="form-input form-input-lg"  
                                    value={formData.tanggal_lahir}  
                                    onChange={(e) => setFormData({ ...formData, tanggal_lahir: e.target.value })}  
                                    required  
                                />  
                            </div>  
                            <div>  
                                <label htmlFor="id_departemen">Departemen/Divisi 1</label>  
                                <select  
                                    id="id_departemen"  
                                    className="form-input form-input-lg"  
                                    value={formData.id_departemen}  
                                    onChange={(e) => setFormData({ ...formData, id_departemen: e.target.value })}  
                                    required  
                                >  
                                    <option value="">--Pilih Departemen/Divisi--</option>  
                                    {departemen.map((dept) => (  
                                        <option key={dept.id} value={dept.id}>  
                                            {dept.nama}  
                                        </option>  
                                    ))}  
                                </select>  
                            </div>  
                            <div>  
                                <label htmlFor="id_departemen2">Departemen/Divisi 2 (Opsional)</label>  
                                <select  
                                    id="id_departemen2"  
                                    className="form-input form-input-lg"  
                                    value={formData.id_departemen2}  
                                    onChange={(e) => setFormData({ ...formData, id_departemen2: e.target.value })}  
                                >  
                                    <option value="">--Pilih Departemen/Divisi--</option>  
                                    {departemen.map((dept) => (  
                                        <option key={dept.id} value={dept.id}>  
                                            {dept.nama}  
                                        </option>  
                                    ))}  
                                </select>  
                            </div>  
                            <div>  
                                <label htmlFor="id_jabatan">Jabatan</label>  
                                <select  
                                    id="id_jabatan"  
                                    className="form-input form-input-lg"  
                                    value={formData.id_jabatan}  
                                    onChange={(e) => setFormData({ ...formData, id_jabatan: e.target.value })}  
                                    required  
                                >  
                                    <option value="">--Pilih Jabatan--</option>  
                                    {id_jabatans.map((id_jabatan) => (  
                                        <option key={id_jabatan.id} value={id_jabatan.id}>  
                                            {id_jabatan.nama}  
                                        </option>  
                                    ))}  
                                </select>  
                            </div>  
                            <div>  
                                <label htmlFor="no_hp">Nomor Handphone</label>  
                                <input  
                                    id="no_hp"  
                                    type="text"  
                                    className="form-input form-input-lg"  
                                    value={formData.no_hp}  
                                    onChange={(e) => setFormData({ ...formData, no_hp: e.target.value })}  
                                    required  
                                />  
                            </div>  
                            <div>  
                                <label htmlFor="alamat">Alamat</label>  
                                <input  
                                    id="alamat"  
                                    type="text"  
                                    className="form-input form-input-lg"  
                                    value={formData.alamat}  
                                    onChange={(e) => setFormData({ ...formData, alamat: e.target.value })}  
                                    required  
                                />  
                            </div>  
                            <div>  
                                <label htmlFor="no_bpjs">No BPJS</label>  
                                <input  
                                    id="no_bpjs"  
                                    type="text"  
                                    className="form-input form-input-lg"  
                                    value={formData.no_bpjs}  
                                    onChange={(e) => setFormData({ ...formData, no_bpjs: e.target.value })}  
                                    required  
                                />  
                            </div>  
                            <div>  
                                <label htmlFor="tanggal_join">Tanggal Join</label>  
                                <input  
                                    id="tanggal_join"  
                                    type="date"  
                                    className="form-input form-input-lg"  
                                    value={formData.tanggal_join}  
                                    onChange={(e) => setFormData({ ...formData, tanggal_join: e.target.value })}  
                                    required  
                                />  
                            </div>  
                            <div>  
                                <label htmlFor="tanggal_masuk">Tanggal Masuk</label>  
                                <input  
                                    id="tanggal_masuk"  
                                    type="date"  
                                    className="form-input form-input-lg"  
                                    value={formData.tanggal_masuk}  
                                    onChange={(e) => setFormData({ ...formData, tanggal_masuk: e.target.value })}  
                                    required  
                                />  
                            </div>  
                            <div>  
                                <label htmlFor="tanggal_berakhir">Tanggal Berakhir</label>  
                                <input  
                                    id="tanggal_berakhir"  
                                    type="date"  
                                    className="form-input form-input-lg"  
                                    value={formData.tanggal_berakhir}  
                                    onChange={(e) => setFormData({ ...formData, tanggal_berakhir: e.target.value })}  
                                    required  
                                />  
                            </div>  
                            <div>  
                                <label htmlFor="status">Status</label>  
                                <select  
                                    id="status"  
                                    className="form-input form-input-lg"  
                                    value={formData.status}  
                                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}  
                                    required  
                                >  
                                    <option value="1">Aktif</option>  
                                    <option value="0">Tidak Aktif</option>  
                                </select>  
                            </div>  
                        </div>  
                        <div className="d-flex justify-content-end mt-5">  
                            <button type="submit" className="btn btn-primary gap-5" disabled={isLoading}>  
                                {isLoading ? 'Loading...' : 'Submit'}  
                            </button>  
                        </div>  
                    </form>  
                </div>  
            </div>  
        </div>  
    );  
};  
  
export default TambahDataUsers;  
