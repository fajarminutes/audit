import { useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../store/themeConfigSlice';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import * as XLSX from 'xlsx';

// Define the interface for the imported data  
interface ImportedData {
  Entity?: string;
  Customer?: string;
  'PPH 21 Invoice'?: string;
  'PPH 23 Invoice'?: string;
  'PPN Invoice'?: string;
}

interface KodePajak {
  id: number;
  tipe_pajak: 'PPN' | 'PPH 21' | 'PPH 23';
  biaya: number;
  updated_at: string; // or Date if you prefer to handle it as a Date object      
}

const TambahDataPajak = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate    
  const [entity, setEntity] = useState('');
  const [customer, setCustomer] = useState('');
  const [pph21Invoice, setPph21Invoice] = useState('');
  const [pph21Aktual, setPph21Aktual] = useState('');
  const [selisihPph21, setSelisihPph21] = useState('');
  const [pph23Invoice, setPph23Invoice] = useState('');
  const [pph23Aktual, setPph23Aktual] = useState('');
  const [selisihPph23, setSelisihPph23] = useState('');
  const [ppnInvoice, setPpnInvoice] = useState('');
  const [ppnAktual, setPpnAktual] = useState('');
  const [selisihPpn, setSelisihPpn] = useState('');

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null); // Ref for file input  

  useEffect(() => {
    dispatch(setPageTitle('Tambah Data Pajak'));
    fetchKodePajak();
  }, [dispatch]);

  const fetchKodePajak = async () => {
    try {
      const response = await axios.get<KodePajak[]>('https://audtrax.sinarjernihsuksesindo.id/backend/api/kode_pajak');
      const kodePajakData = response.data;

      // Set the actual values based on the IDs      
      const pph21 = kodePajakData.find((kp) => kp.id === 1);
      const pph23 = kodePajakData.find((kp) => kp.id === 2);
      const ppn = kodePajakData.find((kp) => kp.id === 3);

      if (pph21) setPph21Aktual(pph21.biaya.toString());
      if (pph23) setPph23Aktual(pph23.biaya.toString());
      if (ppn) setPpnAktual(ppn.biaya.toString());
    } catch (err) {
      setError('Failed to fetch kode pajak data');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await axios.post('https://audtrax.sinarjernihsuksesindo.id/backend/api/pajak', {
        entity,
        customer,
        pph21_invoice: pph21Invoice.replace(/\./g, ''), // Remove dots before sending    
        pph21_aktual: pph21Aktual.replace(/\./g, ''),
        selisih_pph21: selisihPph21.replace(/\./g, ''),
        pph23_invoice: pph23Invoice.replace(/\./g, ''),
        pph23_aktual: pph23Aktual.replace(/\./g, ''),
        selisih_pph23: selisihPph23.replace(/\./g, ''),
        ppn_invoice: ppnInvoice.replace(/\./g, ''),
        ppn_aktual: ppnAktual.replace(/\./g, ''),
        selisih_ppn: selisihPpn.replace(/\./g, ''),
      });
      // Redirect to the list of pajak after successful creation      
      navigate('/pajak/semuadatapajak');
    } catch (err) {
      setError('Failed to add data pajak');
    } finally {
      setLoading(false);
    }
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const data = new Uint8Array(event.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: 'array' });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData: ImportedData[] = XLSX.utils.sheet_to_json(worksheet);

      // Assuming the Excel file has the correct headers  
      if (jsonData.length > 0) {
        const row = jsonData[0]; // Get the first row for simplicity  
        setEntity(row.Entity || '');
        setCustomer(row.Customer || '');
        setPph21Invoice(row['PPH 21 Invoice'] || '');
        setPph23Invoice(row['PPH 23 Invoice'] || '');
        setPpnInvoice(row['PPN Invoice'] || '');
      }
    };
    reader.readAsArrayBuffer(file);
  };

  // Function to format numbers with dots as thousands separators    
  const formatNumber = (value: string | number | undefined) => {
    if (typeof value !== 'string') {
      value = value ? value.toString() : '0'; // Default to '0' if value is undefined  
    }
    const numberValue = parseFloat(value.replace(/\./g, '').replace(/,/g, '.')) || 0;
    return numberValue.toLocaleString('id-ID'); // Format as Indonesian number    
  };

  // Function to calculate the difference and ensure it's positive    
  const calculateSelisih = (aktual: string, invoice: string) => {
    const aktualValue = parseFloat(aktual.replace(/\./g, '').replace(/,/g, '.')) || 0;
    const invoiceValue = parseFloat(invoice.replace(/\./g, '').replace(/,/g, '.')) || 0;
    const selisih = Math.abs(aktualValue - invoiceValue);
    return formatNumber(selisih.toString());
  };

  // Update selisih when invoice or aktual changes    
  const handlePph21InvoiceChange = (value: string) => {
    setPph21Invoice(value);
    setSelisihPph21(calculateSelisih(pph21Aktual, value));
  };

  const handlePph21AktualChange = (value: string) => {
    setPph21Aktual(value);
    setSelisihPph21(calculateSelisih(value, pph21Invoice));
  };

  const handlePph23InvoiceChange = (value: string) => {
    setPph23Invoice(value);
    setSelisihPph23(calculateSelisih(pph23Aktual, value));
  };

  const handlePph23AktualChange = (value: string) => {
    setPph23Aktual(value);
    setSelisihPph23(calculateSelisih(value, pph23Invoice));
  };

  const handlePpnInvoiceChange = (value: string) => {
    setPpnInvoice(value);
    setSelisihPpn(calculateSelisih(ppnAktual, value));
  };

  const handlePpnAktualChange = (value: string) => {
    setPpnAktual(value);
    setSelisihPpn(calculateSelisih(value, ppnInvoice));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between flex-wrap gap-4 mb-5">
        <h1 className="flex items-center gap-2">Tambah Data Pajak |</h1>
        <div className="flex sm:flex-row flex-col sm:items-center sm:gap-3 gap-4 w-full sm:w-auto">
          <div className="flex gap-3">
            <button
              className="btn btn-success gap-5"
              onClick={() => fileInputRef.current?.click()} // Trigger input file when button is clicked    
            >
              Import Excel
            </button>
            <input
              type="file"
              accept=".xlsx, .xls"
              onChange={handleImport}
              ref={fileInputRef} // Attach ref to file input    
              style={{ display: 'none' }} // Hide file input    
            />
            <Link to="/pajak/semuadatapajak" className="btn btn-primary gap-2">
              Kembali Ke Semua Data Pajak
            </Link>
          </div>
        </div>
      </div>
      <div className="panel" id="simple" style={{ position: 'relative' }}>
        <form className="border p-4 rounded-lg shadow-md" style={{ position: 'relative', zIndex: '2', backgroundColor: 'white' }} onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div className="mb-4">
              <label htmlFor="entity" className="block text-sm font-medium text-gray-700">Entity</label>
              <input
                type="text"
                id="entity"
                name="entity"
                value={entity}
                onChange={(e) => setEntity(e.target.value)}
                className="form-input"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="customer" className="block text-sm font-medium text-gray-700">Customer</label>
              <input
                type="text"
                id="customer"
                name="customer"
                value={customer}
                onChange={(e) => setCustomer(e.target.value)}
                className="form-input"
                required
              />
            </div>
          </div>
          {/* PPH 21 Fields */}
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div>
              <label htmlFor="pph21Aktual" className="block text-sm font-medium text-gray-700">PPH 21 Aktual</label>
              <input
                type="text"
                id="pph21Aktual"
                name="pph21Aktual"
                value={formatNumber(pph21Aktual)}
                onChange={(e) => handlePph21AktualChange(e.target.value)}
                readOnly
                className="form-input"
              />
            </div>
            <div>
              <label htmlFor="pph21Invoice" className="block text-sm font-medium text-gray-700">PPH 21 Invoice</label>
              <input
                type="text"
                id="pph21Invoice"
                name="pph21Invoice"
                value={formatNumber(pph21Invoice)}
                onChange={(e) => handlePph21InvoiceChange(e.target.value)}
                className="form-input"
                required
              />
            </div>
            <div>
              <label htmlFor="selisihPph21" className="block text-sm font-medium text-gray-700">Selisih PPH 21</label>
              <input
                type="text"
                id="selisihPph21"
                name="selisihPph21"
                value={formatNumber(selisihPph21)}
                readOnly
                className="form-input"
              />
            </div>
          </div>
          {/* PPH 23 Fields */}
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div>
              <label htmlFor="pph23Aktual" className="block text-sm font-medium text-gray-700">PPH 23 Aktual</label>
              <input
                type="text"
                id="pph23Aktual"
                name="pph23Aktual"
                value={formatNumber(pph23Aktual)}
                onChange={(e) => handlePph23AktualChange(e.target.value)}
                readOnly
                className="form-input"
              />
            </div>
            <div>
              <label htmlFor="pph23Invoice" className="block text-sm font-medium text-gray-700">PPH 23 Invoice</label>
              <input
                type="text"
                id="pph23Invoice"
                name="pph23Invoice"
                value={formatNumber(pph23Invoice)}
                onChange={(e) => handlePph23InvoiceChange(e.target.value)}
                className="form-input"
                required
              />
            </div>
            <div>
              <label htmlFor="selisihPph23" className="block text-sm font-medium text-gray-700">Selisih PPH 23</label>
              <input
                type="text"
                id="selisihPph23"
                name="selisihPph23"
                value={formatNumber(selisihPph23)}
                readOnly
                className="form-input"
              />
            </div>
          </div>
          {/* PPN Fields */}
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div>
              <label htmlFor="ppnAktual" className="block text-sm font-medium text-gray-700">PPN Aktual</label>
              <input
                type="text"
                id="ppnAktual"
                name="ppnAktual"
                value={formatNumber(ppnAktual)}
                onChange={(e) => handlePpnAktualChange(e.target.value)}
                readOnly
                className="form-input"
              />
            </div>
            <div>
              <label htmlFor="ppnInvoice" className="block text-sm font-medium text-gray-700">PPN Invoice</label>
              <input
                type="text"
                id="ppnInvoice"
                name="ppnInvoice"
                value={formatNumber(ppnInvoice)}
                onChange={(e) => handlePpnInvoiceChange(e.target.value)}
                className="form-input"
                required
              />
            </div>
            <div>
              <label htmlFor="selisihPpn" className="block text-sm font-medium text-gray-700">Selisih PPN</label>
              <input
                type="text"
                id="selisihPpn"
                name="selisihPpn"
                value={formatNumber(selisihPpn)}
                readOnly
                className="form-input"
              />
            </div>
          </div>
          <div className="flex justify-start">
            <button type="submit" className="btn btn-primary">
              Simpan
            </button>
          </div>
          {error && <div className="text-red-500">{error}</div>}
        </form>
      </div>
    </div>
  );
};

export default TambahDataPajak;  
