import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { IRootState } from '../../store';
import { setPageTitle } from '../../store/themeConfigSlice';

const DetailLates = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Detail Lates'));
    });

    const invoiceData = {
        noInvoice: 'INV001',
        codeCust: 'CUST01',
        kodeEntity: 'ENT01',
        descriptionINV: 'Invoice Description',
        periodeINV: '2024-01',
        periodeCetakINV: '2024-01',
        status: 'OK',
        nominalINVGross: 'Rp 10,000,000',
        nominalINVAfterPPH: 'Rp 9,000,000',
        PPN: 'Rp 1,100,000',
        sales: 'Sales Info',
        MF: 'Rp 500,000',
        PPH23: 'Rp 1,000,000',
        noEFP: 'EFP001',
        custName: 'Customer A',
        financeName: 'Finance A',
        outstanding: 'Rp 10,000,000',
        bank: 'Bank A',
        tglBayar: '2024-01-15',
        nominalPembayaran: 'Rp 10,000,000',
        selisih: 'Rp 0',
        tglTarget: '2024-01-10',
        tglKirim: '2024-01-05',
        agingByKirim: '10 days',
        cycleBayarByKirim: '5 days',
        cycleCustomers: '15 days',
        agingByTarget: '5 days',
        cycleBayarByTarget: '10 days',
    };

    return (
        <div>
            <h1 className="flex items-center mb-5 gap-2">DETAIL LATES |</h1>
            <div className='ms-5 me-5 mt-5'>
                <h2 className='mt-5' style={{ fontSize: '25px' }}>Late Detail</h2>
            <div className="panel">
                <div>
                    <h1 className="mb-4" style={{ fontSize: '20px' }}>No Invoice: {invoiceData.noInvoice}</h1>
                    <p className="mb-3">
                        <strong>Code Cust:</strong> {invoiceData.codeCust}
                    </p>
                    <p className="mb-3">
                        <strong>Kode Entity:</strong> {invoiceData.kodeEntity}
                    </p>
                    <p className="mb-3">
                        <strong>Description INV:</strong> {invoiceData.descriptionINV}
                    </p>
                    <p className="mb-3">
                        <strong>Periode INV:</strong> {invoiceData.periodeINV}
                    </p>
                    <p className="mb-3">
                        <strong>Periode Cetak INV:</strong> {invoiceData.periodeCetakINV}
                    </p>
                    <p className="mb-3">
                        <strong>Status:</strong> {invoiceData.status}
                    </p>
                    <p className="mb-3">
                        <strong>Nominal INV Gross:</strong> {invoiceData.nominalINVGross}
                    </p>
                    <p className="mb-3">
                        <strong>Nominal INV After PPH 23:</strong> {invoiceData.nominalINVAfterPPH}
                    </p>
                    <p className="mb-3">
                        <strong>PPN 11%:</strong> {invoiceData.PPN}
                    </p>
                    <p className="mb-3">
                        <strong>Sales:</strong> {invoiceData.sales}
                    </p>
                    <p className="mb-3">
                        <strong>MF:</strong> {invoiceData.MF}
                    </p>
                    <p className="mb-3">
                        <strong>PPH 23:</strong> {invoiceData.PPH23}
                    </p>
                    <p className="mb-3">
                        <strong>No EFP:</strong> {invoiceData.noEFP}
                    </p>
                    <p className="mb-3">
                        <strong>Cust. Name:</strong> {invoiceData.custName}
                    </p>
                    <p className="mb-3">
                        <strong>Finance @Name:</strong> {invoiceData.financeName}
                    </p>
                    <p className="mb-3">
                        <strong>Outstanding:</strong> {invoiceData.outstanding}
                    </p>
                    <p className="mb-3">
                        <strong>Bank:</strong> {invoiceData.bank}
                    </p>
                    <p className="mb-3">
                        <strong>Tgl Bayar:</strong> {invoiceData.tglBayar}
                    </p>
                    <p className="mb-3">
                        <strong>Nominal Pembayaran:</strong> {invoiceData.nominalPembayaran}
                    </p>
                    <p className="mb-3">
                        <strong>Selisih:</strong> {invoiceData.selisih}
                    </p>
                    <p className="mb-3">
                        <strong>Tgl Target:</strong> {invoiceData.tglTarget}
                    </p>
                    <p className="mb-3">
                        <strong>Tgl Kirim:</strong> {invoiceData.tglKirim}
                    </p>
                    <p className="mb-3">
                        <strong>Aging by Kirim:</strong> {invoiceData.agingByKirim}
                    </p>
                    <p className="mb-3">
                        <strong>Cycle Bayar by Kirim:</strong> {invoiceData.cycleBayarByKirim}
                    </p>
                    <p className="mb-3">
                        <strong>Cycle Customers:</strong> {invoiceData.cycleCustomers}
                    </p>
                    <p className="mb-3">
                        <strong>Aging by Target:</strong> {invoiceData.agingByTarget}
                    </p>
                    <p className="mb-3">
                        <strong>Cycle Bayar by Target:</strong> {invoiceData.cycleBayarByTarget}
                    </p>
                </div>
                </div>
            </div>
        </div>
    );
};

export default DetailLates;
