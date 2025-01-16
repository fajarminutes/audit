import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../../store/themeConfigSlice';
import axios from 'axios'; // Import axios directly    

const DetailMC = () => {
  const dispatch = useDispatch();
  const { id } = useParams(); // Get ID from URL    
  const [invoiceData, setInvoiceData] = useState<any | null>(null); // Initialize as null  
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    dispatch(setPageTitle('Detail Master Code'));
    if (id) {
      fetchDetailKode(id);
    } else {
      setIsError(true);
    }
  }, [dispatch, id]);

  const fetchDetailKode = async (id: string) => {
    try {
      const response = await axios.get(`https://audtrax.sinarjernihsuksesindo.id/backend/api/master_kodes/${id}`);
      setInvoiceData(response.data);
    } catch (error) {
      console.error('Error fetching master code:', error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error loading data.</p>;
  }

  // Ensure invoiceData is not null before accessing its properties  
  if (!invoiceData) {
    return <p>No data found.</p>;
  }

  return (
    <div>
      <h1 className="flex items-center mb-5 gap-2">
        <strong>Master Kode Invoice |</strong> Master Kode Invoice Details
      </h1>
      <div className="panel">
        <div>
          <h1 className='mb-4' style={{ fontSize: '20px' }}>{invoiceData.penulisan_kode}</h1>
          <p className="mb-3"><strong>Nama Customer:</strong> {invoiceData.user_invoice}</p>
          <p className="mb-3"><strong>Nama Project:</strong> {invoiceData.nama_project}</p>
          <p className="mb-3"><strong>Jabatan:</strong> {invoiceData.jabatan}</p>
          <p className="mb-3"><strong>Kode SJS:</strong> {invoiceData.kode_sjs}</p>
          <p className="mb-3"><strong>Kode By Project:</strong> {invoiceData.kode_by_project}</p>
          <p className="mb-3"><strong>Penulisan Kode:</strong> {invoiceData.penulisan_kode}</p>
          <p className="mb-3"><strong>Nomor Handphone:</strong> {invoiceData.nomor_handphone}</p>
          <p className="mb-3"><strong>Email:</strong> {invoiceData.email}</p>
          <p className="mb-3"><strong>User Retention:</strong> {invoiceData.user_retention}</p>
          <p className="mb-3"><strong>Nomor Handphone (Ret):</strong> {invoiceData.nomor_handphone_ret}</p>
          <p className="mb-3"><strong>Email (Ret):</strong> {invoiceData.email_ret}</p>
        </div>
        <Link to={`/invoice/mastercode/editmastercode/${invoiceData.id}`} className='btn btn-dark'>
          Edit
        </Link>
      </div>
    </div>
  );
};

export default DetailMC;