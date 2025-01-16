import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactApexChart from 'react-apexcharts';
import { setPageTitle } from '../store/themeConfigSlice';
import IconUser from '../components/Icon/IconUser';
import IconDollarSign from '../components/Icon/IconDollarSign';
import IconInbox from '../components/Icon/IconInbox';


const Index = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('HRFusion Dashboard'));
    });

    const [loading] = useState(false);

    return (
        <div>
            <h1 className="text-2xl font-semibold mb-5">Dashboard Utama</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                <div className="panel">
                    <h5 className="font-semibold text-lg mb-5">Jumlah Karyawan Aktif</h5>
                    <ReactApexChart
                        series={[70, 20, 10]}
                        options={{
                            chart: { type: 'donut', fontFamily: 'Nunito, sans-serif' },
                            labels: ['Aktif', 'Cuti', 'Resign'],
                            colors: ['#2196F3', '#FFC107', '#F44336'],
                            legend: { position: 'bottom', horizontalAlign: 'center' },
                        }}
                        type="donut"
                        height={300}
                    />
                </div>

                <div className="panel">
                    <h5 className="font-semibold text-lg mb-5">Tingkat Kehadiran</h5>
                    <ReactApexChart
                        series={[85]}
                        options={{
                            chart: { type: 'radialBar', fontFamily: 'Nunito, sans-serif' },
                            plotOptions: {
                                radialBar: {
                                    hollow: { size: '70%' },
                                    dataLabels: {
                                        name: { show: true, fontSize: '16px' },
                                        value: { show: true, fontSize: '20px' },
                                    },
                                },
                            },
                            labels: ['Kehadiran'],
                            colors: ['#4CAF50'],
                        }}
                        type="radialBar"
                        height={300}
                    />
                </div>

                <div className="panel">
                    <h5 className="font-semibold text-lg mb-5">Total Pengeluaran Gaji Bulanan</h5>
                    <ReactApexChart
                        series={[{ name: 'Gaji', data: [30000, 32000, 31000, 33000, 34000] }]}
                        options={{
                            chart: { type: 'line', fontFamily: 'Nunito, sans-serif' },
                            xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May'] },
                            colors: ['#FF9800'],
                            stroke: { curve: 'smooth', width: 2 },
                        }}
                        type="line"
                        height={300}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="panel">
                    <h5 className="font-semibold text-lg mb-5">Distribusi Skor KPI</h5>
                    <ReactApexChart
                        series={[{ name: 'Skor KPI', data: [80, 90, 70, 85, 95] }]}
                        options={{
                            chart: { type: 'radar', fontFamily: 'Nunito, sans-serif' },
                            labels: ['Sales', 'HR', 'IT', 'Marketing', 'Finance'],
                            colors: ['#673AB7'],
                        }}
                        type="radar"
                        height={300}
                    />
                </div>

                <div className="panel">
                    <h5 className="font-semibold text-lg mb-5">Notifikasi & Pengingat</h5>
                    <ul className="space-y-3">
                        <li className="flex items-center">
                            <IconInbox className="text-yellow-500 w-6 h-6 mr-3" />
                            Kontrak 5 karyawan akan berakhir dalam 30 hari.
                        </li>
                        <li className="flex items-center">
                            <IconUser className="text-blue-500 w-6 h-6 mr-3" />
                            Ulang tahun 3 karyawan minggu ini.
                        </li>
                        <li className="flex items-center">
                            <IconDollarSign className="text-red-500 w-6 h-6 mr-3" />
                            2 transfer gaji gagal diproses.
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Index;
