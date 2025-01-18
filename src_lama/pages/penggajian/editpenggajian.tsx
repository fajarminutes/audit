import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { setPageTitle } from '../../store/themeConfigSlice';
import Select from 'react-select';
import axios from 'axios';

const UpdatePenggajian = () => {
  const dispatch = useDispatch();
  const { id } = useParams(); // Mendapatkan ID dari URL
  const navigate = useNavigate();

  const [kodeEntities, setKodeEntities] = useState([]); // Data opsi kode_entity
  const [usedKodeEntities, setUsedKodeEntities] = useState([]); // Kode entity yang sudah digunakan
  const [formData, setFormData] = useState({
    kode_payroll: '',
    periode: '',
    kode_entity: [], // Menyimpan pilihan dalam bentuk array
    jumlah_karyawan: 0, // Otomatis berdasarkan jumlah kode_entity
    total_gaji: '',
    sisa_gaji: '',
    status_payrolls: 'setuju',
  });

  useEffect(() => {
    dispatch(setPageTitle('Update Penggajian'));

    const fetchPayrollDetails = async () => {
      try {
        // Fetch data payroll berdasarkan ID
        const payrollResponse = await axios.get(
          `https://audtrax.sinarjernihsuksesindo.id/backend/api/payrolls/${id}`
        );
        const payrollData = payrollResponse.data;

        // Parse kode_entity JSON jika ada
        const kodeEntityArray = payrollData.kode_entity
          ? JSON.parse(payrollData.kode_entity)
          : [];

        // Isi form dengan data payroll
        setFormData({
          kode_payroll: payrollData.kode_payroll,
          periode: payrollData.periode.split('T')[0], // Format tanggal (YYYY-MM-DD)
          kode_entity: kodeEntityArray,
          jumlah_karyawan: kodeEntityArray.length,
          total_gaji: payrollData.total_gaji,
          sisa_gaji: payrollData.sisa_gaji,
          status_payrolls: payrollData.status_payrolls,
        });

        // Fetch kode_entity yang sudah digunakan
        const usedEntitiesResponse = await axios.get(
          'https://audtrax.sinarjernihsuksesindo.id/backend/api/payrolls'
        );
        const usedEntities = usedEntitiesResponse.data
          .map((item) => JSON.parse(item.kode_entity))
          .flat();
        setUsedKodeEntities(usedEntities);

        // Fetch data master_kodes
        const masterKodesResponse = await axios.get(
          'https://audtrax.sinarjernihsuksesindo.id/backend/api/master_kodes'
        );
        const masterKodesData = masterKodesResponse.data;
        const options = masterKodesData.map((item) => ({
          value: item.penulisan_kode,
          label: item.penulisan_kode,
        }));
        setKodeEntities(options);
      } catch (error) {
        console.error('Error fetching payroll details:', error);
      }
    };

    fetchPayrollDetails();
  }, [id, dispatch]);

  // Filter kode_entity untuk hanya menampilkan yang belum digunakan
  const availableKodeEntities = kodeEntities.filter(
    (entity) => !usedKodeEntities.includes(entity.value) || formData.kode_entity.includes(entity.value)
  );

  // Update jumlah_karyawan setiap kali kode_entity berubah
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      jumlah_karyawan: formData.kode_entity.length,
    }));
  }, [formData.kode_entity]);

  // Handle perubahan input
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // Handle perubahan kode_entity (React Select)
  const handleEntityChange = (selectedOptions) => {
    setFormData((prev) => ({
      ...prev,
      kode_entity: selectedOptions ? selectedOptions.map((option) => option.value) : [],
    }));
  };

  // Handle submit form
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put(`https://audtrax.sinarjernihsuksesindo.id/backend/api/payrolls/${id}`, {
        ...formData,
        kode_entity: JSON.stringify(formData.kode_entity), // Kirim array sebagai JSON
      })
      .then(() => {
        alert('Payroll berhasil diperbarui!');
        navigate('/penggajian/semuapenggajian');
      })
      .catch((error) => {
        console.error('Error updating payroll:', error);
        alert('Gagal memperbarui payroll. Silakan coba lagi.');
      });
  };

  return (
    <div>
      <div className="flex items-center justify-between flex-wrap gap-4 mb-5">
        <h1 className="flex items-center gap-2">Update Payroll |</h1>
      </div>
      <div className="panel" id="simple">
        <form className="p-4" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="kode_payroll" className="block text-sm font-medium text-gray-700">
              Kode Payroll
            </label>
            <input
              id="kode_payroll"
              type="text"
              className="form-input form-input-lg"
              value={formData.kode_payroll}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="periode" className="block text-sm font-medium text-gray-700">
              Periode
            </label>
            <input
              id="periode"
              type="date"
              className="form-input form-input-lg"
              value={formData.periode}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="kode_entity" className="block text-sm font-medium text-gray-700">
              Kode Entity
            </label>
            <Select
              options={availableKodeEntities}
              isMulti
              value={availableKodeEntities.filter((option) =>
                formData.kode_entity.includes(option.value)
              )}
              onChange={handleEntityChange}
              className="react-select-container"
              classNamePrefix="react-select"
              placeholder="Pilih Kode Entity"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="jumlah_karyawan" className="block text-sm font-medium text-gray-700">
              Jumlah Karyawan
            </label>
            <input
              id="jumlah_karyawan"
              type="number"
              className="form-input form-input-lg"
              value={formData.jumlah_karyawan}
              readOnly
            />
          </div>
          <div className="mb-4">
            <label htmlFor="total_gaji" className="block text-sm font-medium text-gray-700">
              Total Gaji
            </label>
            <input
              id="total_gaji"
              type="number"
              className="form-input form-input-lg"
              value={formData.total_gaji}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="sisa_gaji" className="block text-sm font-medium text-gray-700">
              Sisa Gaji
            </label>
            <input
              id="sisa_gaji"
              type="number"
              className="form-input form-input-lg"
              value={formData.sisa_gaji}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="status_payrolls" className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <select
              id="status_payrolls"
              className="form-input form-input-lg"
              value={formData.status_payrolls}
              onChange={handleChange}
              required
            >
              <option value="setuju">Disetujui</option>
              <option value="tolak">Tidak Disetujui</option>
            </select>
          </div>
          <div className="flex justify-start mt-3">
            <button type="submit" className="btn btn-primary">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdatePenggajian;
