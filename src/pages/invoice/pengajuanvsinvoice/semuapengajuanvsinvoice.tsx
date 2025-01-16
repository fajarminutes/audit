import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { DataTable } from 'mantine-datatable';
import { setPageTitle } from '../../../store/themeConfigSlice';
import { Button, TextInput, Select } from '@mantine/core';

const SemuaPVSI = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Semua Pengajuan VS Invoice'));
    });

    const data = [
        {
            kode: 'KD001',
            namaCustomer: 'PT. ABC',
            totalInvoice: 'Rp. 100,000,000',
            totalPengajuan: 'Rp. 95,000,000',
            selisih: 'Rp. 5,000,000',
        },
    ];
    return (
        <div>
            <div className="mb-4.5 px-5 flex md:items-center md:flex-row flex-col gap-5">
                <h1 className="flex items-center gap-2"><strong>Report Pengajuan vs Invoice Management
            |</strong>All Reports

            </h1>
                <div className="ltr:ml-auto rtl:mr-auto">
                    <Link to="/invoice/pengajuanvsinvoice/tambahpengajuanvsinvoice" className="btn btn-primary gap-2">
                        Add Report
                    </Link>
                </div>
            </div>{' '}            <div className='panel'>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                <div>
                    <label htmlFor="bank">Show</label>
                    <select id="bank" className="form-input form-input-lg">
                        <option value="Bank A">10</option>
                        <option value="Bank B">25</option>
                        <option value="Bank C">50</option>
                        <option value="Bank C">100</option>
                    </select>
                </div>
                <div>
                    <input id="" type="search" placeholder='search..' className="form-input form-input-lg" />
                </div>{' '}
            </div>
            <DataTable
                columns={[
                    { accessor: 'kode', title: 'kode' },
                    { accessor: 'namaCustomer', title: 'Nama Customer' },
                    { accessor: 'totalInvoices', title: 'Total Invoices' },
                    { accessor: 'totalPengajuan', title: 'Total Pengajuan' },
                    { accessor: 'selisih', title: 'Selisih' },
                    {
                        accessor: 'aksi',
                        title: 'Aksi',
                        render: (record) => (
                            <>
                                <div className="flex gap-2">
                                    <Link to={`/invoice/pengajuanvsinvoice/detailpengajuanvsinvoice`} className="btn btn-primary btn-sm">
                                        View
                                    </Link>
                                    <Link to={`#`} className="btn btn-dark btn-sm">
                                        Edit
                                    </Link>
                                    <Link to={`#`} className="btn btn-danger btn-sm">
                                        Delete
                                    </Link>
                                </div>
                            </>
                        ),
                    },
                ]}
                records={data}
            />{' '}
                </div>
        </div>
    );
};
export default SemuaPVSI;
