import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { DataTable } from 'mantine-datatable';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { setPageTitle } from '../../store/themeConfigSlice';
import axios from 'axios';

const SemuaPenggajian = () => {
  const dispatch = useDispatch();
  const [payrolls, setPayrolls] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(setPageTitle('Semua Penggajian'));

    const fetchPayrollData = async () => {
      try {
        const payrollResponse = await axios.get(
          'https://audtrax.sinarjernihsuksesindo.id/backend/api/payrolls'
        );
        const payrollData = payrollResponse.data || [];

        const masterKodesResponse = await axios.get(
          'https://audtrax.sinarjernihsuksesindo.id/backend/api/master_kodes'
        );
        const masterKodesData = masterKodesResponse.data || [];

        const customersResponse = await axios.get(
          'https://audtrax.sinarjernihsuksesindo.id/backend/api/customers'
        );
        const customersData = customersResponse.data || [];

        const transformedData = payrollData.map((payroll, index) => {
          const kodeEntities = payroll.kode_entity ? JSON.parse(payroll.kode_entity) : [];
          const customerNames = kodeEntities
            .map((entity) => {
              const kodeMaster = masterKodesData.find(
                (master) => master.penulisan_kode === entity
              );
              if (kodeMaster) {
                const customer = customersData.find(
                  (cust) => cust.id === kodeMaster.id_customer
                );
                return customer?.nama_customer || 'Unknown';
              }
              return null;
            })
            .filter(Boolean);

          return {
            id: payroll.id,
            no: index + 1,
            customer: customerNames.join(', ') || 'Unknown',
            invoiceDate: payroll.periode
              ? new Date(payroll.periode).toLocaleDateString('id-ID')
              : '-',
            nominal: payroll.total_gaji
              ? `Rp ${parseFloat(payroll.total_gaji).toLocaleString('id-ID')}`
              : '-',
            paymentStatus:
              payroll.status_payrolls === 'setuju' ? 'Sudah Dibayar' : 'Belum Dibayar',
          };
        });

        setPayrolls(transformedData);
      } catch (error) {
        console.error('Error fetching payroll data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPayrollData();
  }, [dispatch]);

  const handleDelete = async (id) => {
    Swal.fire({
      title: 'Anda yakin?',
      text: 'Data yang dihapus tidak dapat dikembalikan!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, hapus!',
      cancelButtonText: 'Batal',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(
            `https://audtrax.sinarjernihsuksesindo.id/backend/api/payrolls/${id}`
          );
          Swal.fire('Berhasil!', 'Data payroll berhasil dihapus.', 'success');
          setPayrolls((prev) => prev.filter((payroll) => payroll.id !== id));
        } catch (error) {
          Swal.fire('Gagal!', 'Terjadi kesalahan saat menghapus data.', 'error');
        }
      }
    });
  };

  return (
    <div>
      <div className="mb-4.5 px-5 flex md:items-center md:flex-row flex-col gap-5">
        <h1 className="flex items-center gap-2">Semua Penggajian |</h1>
        <div className="ltr:ml-auto rtl:mr-auto">
          <Link to="/penggajian/tambahpenggajian" className="btn btn-primary gap-2">
            Add Payroll Baru
          </Link>
        </div>
      </div>
      <div className="panel">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <DataTable
            columns={[
              { accessor: 'no', title: 'No' },
              { accessor: 'customer', title: 'Customer' },
              { accessor: 'invoiceDate', title: 'Tanggal Invoice' },
              { accessor: 'nominal', title: 'Nominal' },
              { accessor: 'paymentStatus', title: 'Status Pembayaran' },
              {
                accessor: 'aksi',
                title: 'Aksi',
                render: (record) => (
                  <div className="flex gap-2">
                    <Link
                      to={`/penggajian/editpenggajian/${record.id}`}
                      className="btn btn-dark btn-sm"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(record.id)}
                      className="btn btn-danger btn-sm"
                    >
                      Hapus
                    </button>
                  </div>
                ),
              },
            ]}
            records={payrolls}
          />
        )}
      </div>
    </div>
  );
};

export default SemuaPenggajian;
