import {  useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setPageTitle } from '../../../store/themeConfigSlice';

const TambahPVSP = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setPageTitle('Tambah Pengajuan VS Penggajian'));
  });

  return(
    <div>
      <h1 className='mb-5'><strong>Payroll vs Pengajuan Management</strong>Add Payroll vs Pengajuan</h1>
    <div className='panel'>
      <div className="active pt-5">
          <form>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                      <label htmlFor="itemInvoice">Tanggal Pengajuan</label>
                      <input id="itemInvoice" type="date" className="form-input form-input-lg" placeholder="dd/mm/yyyy" />
                  </div>
                  <div>
                      <label htmlFor="nomorInvoice">Nominal Pengajuan</label>
                      <input id="nomorInvoice" type="number" className="form-input form-input-lg" />
                  </div>
                  <div>
                      <label htmlFor="hardCopyTarget">Nominal Terproses</label>
                      <input id="hardCopyTarget" type="number" className="form-input form-input-lg"  />
                  </div>
                  <div>
                      <label htmlFor="periodeInvoice">Sisa Bulan Bersangkutan</label>
                      <input id="periodeInvoice" type="number" className="form-input form-input-lg"  />
                  </div>
                  <div>
                      <label htmlFor="periodeCetakInvoice">Proses 1 Bulan Setelahnya</label>
                      <input id="periodeCetakInvoice" type="number" className="form-input form-input-lg"  />
                  </div>
                  <div>
                      <label htmlFor="noFakturPajak">Sisa 1 Bulan Setelahnya</label>
                      <input id="noFakturPajak" type="number" className="form-input form-input-lg" />
                  </div>
                  <div>
                      <label htmlFor="nomorPO">Proses 2 Bulan Setelahnya</label>
                      <input id="nomorPO" type="number" className="form-input form-input-lg" />
                  </div>
                  <div>
                      <label htmlFor="tanggalINV">Sisa 2 Bulan Setelahnya </label>
                      <input id="tanggalINV" type="number" className="form-input form-input-lg"  />
                  </div>
              </div>
          </form>
      </div>
      <button className='btn btn-primary mt-3'>
      Submit
      </button>
    </div>
    </div>
    
  );
};

export default TambahPVSP;
