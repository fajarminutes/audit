import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../store/themeConfigSlice';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const DetailInvoice = () => {
    const dispatch = useDispatch();
    const { id } = useParams<{ id: string }>(); // Get the invoice ID from the URL  
    const [invoiceData, setInvoiceData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        dispatch(setPageTitle('Detail Invoice'));

        // Fetch invoice data from the API based on the ID  
        const fetchInvoiceData = async () => {
            try {
                const response = await axios.get(`https://audtrax.sinarjernihsuksesindo.id/backend/api/invoice/${id}`);
                setInvoiceData(response.data); // Assuming the API returns the invoice object directly  
            } catch (err) {
                setError('Failed to fetch invoice data');
            } finally {
                setLoading(false);
            }
        };

        fetchInvoiceData();
    }, [dispatch, id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div className="text-red-500">{error}</div>;
    }

    return (
        <div>
            <h1 className="flex items-center mb-5 gap-2">DETAIL INVOICE |</h1>
            <div className='ms-5 me-5 mt-5'>
                <h2 className='mt-5' style={{ fontSize: '25px' }}>Invoice Details</h2>
                <div className="panel">
                    <div>
                        <h1 className="mb-4" style={{ fontSize: '20px' }}>No Invoice: {invoiceData.nomor_invoice}</h1>
                        <p className="mb-3">
                            <strong>Customer:</strong> {invoiceData.customer}
                        </p>
                        <p className="mb-3">
                            <strong>Finance:</strong> {invoiceData.finance}
                        </p>
                        <p className="mb-3">
                            <strong>Cycle Customer:</strong> {invoiceData.cycle_customer}
                        </p>
                        <p className="mb-3">
                            <strong>Item Invoice:</strong> {invoiceData.item_invoice}
                        </p>
                        <p className="mb-3">
                            <strong>Hard Copy Target:</strong> {new Date(invoiceData.hard_copy_target).toLocaleDateString()}
                        </p>
                        <p className="mb-3">
                            <strong>Periode Invoice:</strong> {invoiceData.periode_invoice}
                        </p>
                        <p className="mb-3">
                            <strong>Periode Cetak Invoice:</strong> {invoiceData.periode_cetak_invoice}
                        </p>
                        <p className="mb-3">
                            <strong>No Faktur Pajak:</strong> {invoiceData.no_faktur_pajak}
                        </p>
                        <p className="mb-3">
                            <strong>Nomor PO:</strong> {invoiceData.nomor_po}
                        </p>
                        <p className="mb-3">
                            <strong>Tanggal INV:</strong> {new Date(invoiceData.tanggal_inv).toLocaleDateString()}
                        </p>
                        <p className="mb-3">
                            <strong>Nominal:</strong> {invoiceData.nominal.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}
                        </p>
                        <p className="mb-3">
                            <strong>Nama Pengirim Softcopy:</strong> {invoiceData.nama_pengirim_softcopy}
                        </p>
                        <p className="mb-3">
                            <strong>Tgl Kirim Hardfile Actual:</strong> {new Date(invoiceData.tgl_kirim_hardfile_actual).toLocaleDateString()}
                        </p>
                        <p className="mb-3">
                            <strong>Nama Pengirim Hardcopy:</strong> {invoiceData.nama_pengirim_hardcopy}
                        </p>
                        <p className="mb-3">
                            <strong>Tgl Kirim Softcopy Actual:</strong> {new Date(invoiceData.tgl_kirim_softcopy_actual).toLocaleDateString()}
                        </p>
                        <p className="mb-3">
                            <strong>Nama Penerima:</strong> {invoiceData.nama_penerima}
                        </p>
                        <p className="mb-3">
                            <strong>Tgl Terima Hard/Soft File Actual:</strong> {new Date(invoiceData.tgl_terima_hard_soft_file_actual).toLocaleDateString()}
                        </p>
                        <p className="mb-3">
                            <strong>Softcopy Scan:</strong> {invoiceData.softcopy_scan}
                        </p>
                        <p className="mb-3">
                            <strong>Jumlah Hari Telat Kirim Invoice:</strong> {invoiceData.jumlah_hari_telat_kirim_invoice}
                        </p>
                        <p className="mb-3">
                            <strong>Alasan Telat:</strong> {invoiceData.alasan_telat}
                        </p>
                        <p className="mb-3">
                            <strong>Revisi:</strong> {invoiceData.revisi}
                        </p>
                        <p className="mb-3">
                            <strong>Pembayaran Outstanding:</strong> {invoiceData.pembayaran_outstanding !== null ? invoiceData.pembayaran_outstanding.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' }) : 'N/A'}
                        </p>
                        <p className="mb-3">
                            <strong>Pembayaran Bank:</strong> {invoiceData.pembayaran_bank || 'N/A'}
                        </p>
                        <p className="mb-3">
                            <strong>Pembayaran Tanggal:</strong> {invoiceData.pembayaran_tanggal ? new Date(invoiceData.pembayaran_tanggal).toLocaleDateString() : 'N/A'}
                        </p>
                        <p className="mb-3">
                            <strong>Pembayaran Nominal:</strong> {invoiceData.pembayaran_nominal !== null ? invoiceData.pembayaran_nominal.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' }) : 'N/A'}
                        </p>
                        <p className="mb-3">
                            <strong>Collection Day:</strong> {invoiceData.collection_day}
                        </p>
                        <p className="mb-3">
                            <strong>Cycle:</strong> {invoiceData.cycle}
                        </p>
                        <p className="mb-3">
                            <strong>Status Pembayaran:</strong> {invoiceData.status_pembayaran}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailInvoice;  
