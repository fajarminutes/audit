import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setPageTitle } from '../../../store/themeConfigSlice';

const DetailPVSP = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setPageTitle('Detail Pengajuan VS Penggajian'));
  });

  return (
    <div>
      <h1 className="mb-5">
        <strong>Penggajian vs Pengajuan</strong>Detail Penggajian vs Pengajuan
      </h1>
      <div className="panel">
        <h1 className='mb-4' style={{ fontSize: '25px' }}>Detail Penggajian vs Pengajuan</h1>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-3">
          <div>
            <p>
              <strong>Tanggal Pengajuan :</strong> 2024-06-15
            </p>
          </div>
          <div>
            <p>
              <strong>Nominal Pengajuan :</strong> Rp 100,000,000
            </p>
          </div>
          <div>
            <p>
              <strong>Nominal Terproses :</strong> Rp 90,000,000
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-3">
          <div>
            <p>
              <strong>Sisa Bulan Bersangkutan :</strong> Rp 10,000,000
            </p>
          </div>
          <div>
            <p>
              <strong>Proses 1 Bulan Setelahnya :</strong> Rp 5,000,000
            </p>
          </div>
          <div>
            <p>
              <strong>Sisa 1 Bulan Setelahnya :</strong> Rp 5,000,000
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-3">
          <div>
            <p>
              <strong>Proses 2 Bulan Setelahnya :</strong> Rp 3,000,000
            </p>
          </div>
          <div>
            <p>
              <strong>Sisa 2 Bulan Setelahnya :</strong> Rp 2,000,000
            </p>
          </div>
        </div>
        <div className="flex gap-3">
            <Link to="#" className="btn btn-warning gap-5">
                Edit 
            </Link>
            <Link to="/penggajian/penggajianvspengajuan/Semuapvsp" className="btn btn-dark gap-5">
                Kembali 
            </Link>
        </div>
      </div>
    </div>
  );
};

export default DetailPVSP;
