import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { DataTable } from 'mantine-datatable';
import { setPageTitle } from '../../../store/themeConfigSlice';

const SemuaPVSP = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Semua Penggajian VS Pengajuan'));
    });
    const data = [
        {
            tgl: '2024-05-20'	,
            code: '100,000,000	',
            customer: '80,000,000',
            outstanding: '20,000,000',
            finance: '10,000,000',
            Status: '10,000,000',
            proses2bln: '5,000,000',
            sisa3bln: '5,000,000',
        },
    ];

    return (
        <div>
            <div className="mb-4.5 px-5 flex md:items-center md:flex-row flex-col gap-5">
                <h1 className="flex items-center gap-2"><strong>Payroll vs Pengajuan Management  |</strong>All Payroll vs Pengajuan</h1>
                <div className="ltr:ml-auto rtl:mr-auto">
                    <Link to="/penggajian/penggajianvspengajuan/tambahpvsp" className="btn btn-primary gap-2">
                        Add Payroll VS Pengajuan
                    </Link>
                </div>
            </div>{' '}
            <div className="panel">
                <DataTable
                    columns={[
                        { accessor: 'tgl', title: 'Tanggal Pengajuan' },
                        { accessor: 'code', title: 'Nominal pengajuan' },
                        { accessor: 'customer', title: 'Nominal Terproses' },
                        { accessor: 'outstanding', title: 'Sisa Bulan Bersangkutan' },
                        { accessor: 'finance', title: 'Proses 1 Bulan Setelahnya	' },
                        { accessor: 'Status', title: 'Sisa 1 Bulan Setelahnya ' },
                        { accessor: 'proses2bln', title: 'Proses 2 Bulan Setelahnya' },
                        { accessor: 'sisa3bln', title: '	Sisa 2 Bulan Setelahnya ' },
                        {
                            accessor: 'aksi',
                            title: 'Aksi',
                            render: (record) => (
                                <>
                                    <div className="flex gap-2">
                                        <Link to={`/invoice/detaillates/`} className="btn btn-primary btn-sm">
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
                />
            </div>
        </div>
    );
};

export default SemuaPVSP;
