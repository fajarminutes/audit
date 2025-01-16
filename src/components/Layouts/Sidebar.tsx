import PerfectScrollbar from 'react-perfect-scrollbar';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import { toggleSidebar } from '../../store/themeConfigSlice';
import AnimateHeight from 'react-animate-height';
import { IRootState } from '../../store';
import { useState, useEffect } from 'react';
import IconCaretsDown from '../Icon/IconCaretsDown';
import IconCaretDown from '../Icon/IconCaretDown';
import IconMenuDashboard from '../Icon/Menu/IconMenuDashboard';
import IconMenuMailbox from '../Icon/Menu/IconMenuMailbox';
import IconMenuTodo from '../Icon/Menu/IconMenuTodo';
import IconMenuScrumboard from '../Icon/Menu/IconMenuScrumboard';
import IconMenuInvoice from '../Icon/Menu/IconMenuInvoice';
import IconMenuForms from '../Icon/Menu/IconMenuForms';
import IconMenuUsers from '../Icon/Menu/IconMenuUsers';
import IconMenuPages from '../Icon/Menu/IconMenuPages';
import IconMenuAuthentication from '../Icon/Menu/IconMenuAuthentication';
import IconMenuApps from '../Icon/Menu/IconMenuApps';

const Sidebar = () => {
    const [currentMenu, setCurrentMenu] = useState<string>('');
    const [errorSubMenu, setErrorSubMenu] = useState(false);
    const themeConfig = useSelector((state: IRootState) => state.themeConfig);
    const semidark = useSelector((state: IRootState) => state.themeConfig.semidark);
    const location = useLocation();
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const toggleMenu = (value: string) => {
        setCurrentMenu((oldValue) => {
            return oldValue === value ? '' : value;
        });
    };

    useEffect(() => {
        const selector = document.querySelector('.sidebar ul a[href="' + window.location.pathname + '"]');
        if (selector) {
            selector.classList.add('active');
            const ul: any = selector.closest('ul.sub-menu');
            if (ul) {
                let ele: any = ul.closest('li.menu').querySelectorAll('.nav-link') || [];
                if (ele.length) {
                    ele = ele[0];
                    setTimeout(() => {
                        ele.click();
                    });
                }
            }
        }
    }, []);

    useEffect(() => {
        if (window.innerWidth < 1024 && themeConfig.sidebar) {
            dispatch(toggleSidebar());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location]);

    return (
        <div className={semidark ? 'dark' : ''}>
            <nav
                className={`sidebar fixed min-h-screen h-full top-0 bottom-0 w-[260px] shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] z-50 transition-all duration-300 ${semidark ? 'text-white-dark' : ''}`}
            >
                <div className="bg-white dark:bg-black h-full">
                    <div className="flex justify-between items-center px-4 py-3">
                        <NavLink to="/" className="main-logo flex items-center shrink-0">
                            <img className="w-8 ml-[5px] flex-none" src="/assets/images/logo.svg" alt="logo" />
                            <span className="text-2xl ltr:ml-1.5 rtl:mr-1.5 font-semibold align-middle lg:inline dark:text-white-light">{t('Audit Tracking')}</span>
                        </NavLink>

                        <button
                            type="button"
                            className="collapse-icon w-8 h-8 rounded-full flex items-center hover:bg-gray-500/10 dark:hover:bg-dark-light/10 dark:text-white-light transition duration-300 rtl:rotate-180"
                            onClick={() => dispatch(toggleSidebar())}
                        >
                            <IconCaretsDown className="m-auto rotate-90" />
                        </button>
                    </div>
                    <PerfectScrollbar className="h-[calc(100vh-80px)] relative">
                        <ul className="relative font-semibold space-y-0.5 p-4 py-0">
                            <li className="nav-item">
                                <NavLink to="/" className="group">
                                    <div className="flex items-center">
                                        <IconMenuDashboard className="group-hover:!text-primary shrink-0" />
                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Dashboard')}</span>
                                    </div>
                                </NavLink>
                            </li>

                            <li className="menu nav-item">
                                <NavLink to="/pengajuan/semuapengajuan">
                                    <button type="button" className={`${currentMenu === 'Pengajuan' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('Pengajuan')}>
                                        <div className="flex items-center">
                                            <IconMenuMailbox className="group-hover:!text-primary shrink-0" />
                                            <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Pengajuan')}</span>
                                        </div>

                                        {/* <div className={currentMenu !== 'Pengajuan' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                        <IconCaretDown />
                                    </div> */}
                                    </button>
                                </NavLink>

                                {/* <AnimateHeight duration={300} height={currentMenu === 'Pengajuan' ? 'auto' : 0}>
                                    <ul className="sub-menu text-gray-500">
                                        <li>
                                            <NavLink to="/pengajuan/semuapengajuan">{t('Semua Pengajuan')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/pengajuan/tambahpengajuan">{t('Tambah Pengajuan')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/pengajuan/reviewpengajuan">{t('Review Pengajuan')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/pengajuan/detailpengajuan">{t('Detail Pengajuan')}</NavLink>
                                        </li>
                                    </ul>
                                </AnimateHeight> */}
                            </li>

                            <li className="menu nav-item">
                                <button type="button" className={`${currentMenu === 'Invoice' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('Invoice')}>
                                    <div className="flex items-center">
                                        <IconMenuInvoice className="group-hover:!text-primary shrink-0" />
                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Invoice')}</span>
                                    </div>

                                    <div className={currentMenu !== 'Invoice' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                        <IconCaretDown />
                                    </div>
                                </button>

                                <AnimateHeight duration={300} height={currentMenu === 'Invoice' ? 'auto' : 0}>
                                    <ul className="sub-menu text-gray-500">
                                        <li className="menu nav-item">
                                            <button
                                                type="button"
                                                className={`${
                                                    errorSubMenu ? 'open' : ''
                                                } w-full before:bg-gray-300 before:w-[5px] before:h-[5px] before:rounded ltr:before:mr-2 rtl:before:ml-2 dark:text-[#888ea8] hover:bg-gray-100 dark:hover:bg-gray-900`}
                                                onClick={() => setErrorSubMenu(!errorSubMenu)}
                                            >
                                                {t('Master Kode')}
                                                <div className={`${errorSubMenu ? 'rtl:rotate-90 -rotate-90' : ''} ltr:ml-auto rtl:mr-auto`}>
                                                    <IconCaretsDown fill={true} className="w-4 h-4" />
                                                </div>
                                            </button>
                                            <AnimateHeight duration={300} height={errorSubMenu ? 'auto' : 0}>
                                                <ul className="sub-menu text-gray-500">
                                                    <li>
                                                        <a href="/invoice/mastercode/semuamastercode">{t('Semua Master Kode')}</a>
                                                    </li>
                                                    <li>
                                                        <a href="/invoice/mastercode/tambahmastercode">{t('Tambah Master Kode')}</a>
                                                    </li>
                                                    <li>
                                                        <a href="/invoice/mastercode/detailmastercode">{t('Detail Master Kode')}</a>
                                                    </li>
                                                </ul>
                                            </AnimateHeight>
                                        </li>
                                        <li>
                                            <NavLink to="/invoice/semuainvoice">{t('Semua Invoice')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/invoice/tambahinvoice">{t('Tambah Invoice')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/invoice/semualates">{t('Semua Lates')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/invoice/tambahlates">{t('Tambah Lates')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/invoice/detaillates">{t('Detail Lates')}</NavLink>
                                        </li>
                                        <li className="menu nav-item">
                                            <button
                                                type="button"
                                                className={`${
                                                    errorSubMenu ? 'open' : ''
                                                } w-full before:bg-gray-300 before:w-[5px] before:h-[5px] before:rounded ltr:before:mr-2 rtl:before:ml-2 dark:text-[#888ea8] hover:bg-gray-100 dark:hover:bg-gray-900`}
                                                onClick={() => setErrorSubMenu(!errorSubMenu)}
                                            >
                                                {t('Pengajuan vs Invoice')}
                                                <div className={`${errorSubMenu ? 'rtl:rotate-90 -rotate-90' : ''} ltr:ml-auto rtl:mr-auto`}>
                                                    <IconCaretsDown fill={true} className="w-4 h-4" />
                                                </div>
                                            </button>
                                            <AnimateHeight duration={300} height={errorSubMenu ? 'auto' : 0}>
                                                <ul className="sub-menu text-gray-500">
                                                    <li>
                                                        <a href="/invoice/pengajuanvsinvoice/semuapengajuanvsinvoice">{t('Semua Pengajuan vs Invoice')}</a>
                                                    </li>
                                                    <li>
                                                        <a href="/invoice/pengajuanvsinvoice/tambahpengajuanvsinvoice">{t('Tambah Pengajuan vs Invoice')}</a>
                                                    </li>
                                                    <li>
                                                        <a href="/invoice/pengajuanvsinvoice/detailpengajuanvsinvoice">{t('Detail Pengajuan vs Invoice')}</a>
                                                    </li>
                                                </ul>
                                            </AnimateHeight>
                                        </li>
                                    </ul>
                                </AnimateHeight>
                            </li>

                            <li className="menu nav-item">
                                <button type="button" className={`${currentMenu === 'Pelanggan' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('Pelanggan')}>
                                    <div className="flex items-center">
                                        <IconMenuUsers className="group-hover:!text-primary shrink-0" />
                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Customer')}</span>
                                    </div>

                                    <div className={currentMenu !== 'Pelanggan' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                        <IconCaretDown />
                                    </div>
                                </button>

                                <AnimateHeight duration={300} height={currentMenu === 'Pelanggan' ? 'auto' : 0}>
                                    <ul className="sub-menu text-gray-500">
                                        <li>
                                            <NavLink to="/pelanggan/semuapelanggan">{t('Semua Pelanggan')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/pelanggan/tambahpelanggan">{t('Tambah Pelanggan')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/pelanggan/rekeningbankpelanggan">{t('Rekening Bank Pelanggan')}</NavLink>
                                        </li>
                                    </ul>
                                </AnimateHeight>
                            </li>

                            <li className="menu nav-item">
                                <button type="button" className={`${currentMenu === 'Penggajian' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('Penggajian')}>
                                    <div className="flex items-center">
                                        <IconMenuInvoice className="group-hover:!text-primary shrink-0" />
                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Penggajian')}</span>
                                    </div>

                                    <div className={currentMenu !== 'Penggajian' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                        <IconCaretDown />
                                    </div>
                                </button>

                                <AnimateHeight duration={300} height={currentMenu === 'Penggajian' ? 'auto' : 0}>
                                    <ul className="sub-menu text-gray-500">
                                        <li>
                                            <NavLink to="/penggajian/semuapenggajian">{t('Semua Penggajian')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/penggajian/tambahpenggajian">{t('Tambah Penggajian')}</NavLink>
                                        </li>

                                        <li className="menu nav-item">
                                            <button
                                                type="button"
                                                className={`${
                                                    errorSubMenu ? 'open' : ''
                                                } w-full before:bg-gray-300 before:w-[5px] before:h-[5px] before:rounded ltr:before:mr-2 rtl:before:ml-2 dark:text-[#888ea8] hover:bg-gray-100 dark:hover:bg-gray-900`}
                                                onClick={() => setErrorSubMenu(!errorSubMenu)}
                                            >
                                                {t('Penggajian vs Pengajuan')}
                                                <div className={`${errorSubMenu ? 'rtl:rotate-90 -rotate-90' : ''} ltr:ml-auto rtl:mr-auto`}>
                                                    <IconCaretsDown fill={true} className="w-4 h-4" />
                                                </div>
                                            </button>
                                            <AnimateHeight duration={300} height={errorSubMenu ? 'auto' : 0}>
                                                <ul className="sub-menu text-gray-500">
                                                    <li>
                                                        <a href="/penggajian/penggajianvspengajuan/Semuapvsp">{t('Semua Penggajian vs Pengajuan')}</a>
                                                    </li>
                                                    <li>
                                                        <a href="/penggajian/penggajianvspengajuan/tambahpvsp">{t('Tambah Penggajian vs Pengajuan')}</a>
                                                    </li>
                                                    <li>
                                                        <a href="/penggajian/penggajianvspengajuan/detailpvsp">{t('Detail Penggajian vs Pengajuan')}</a>
                                                    </li>
                                                </ul>
                                            </AnimateHeight>
                                        </li>
                                    </ul>
                                </AnimateHeight>
                            </li>

                            <li className="menu nav-item">
                                <button type="button" className={`${currentMenu === 'BPJS' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('BPJS')}>
                                    <div className="flex items-center">
                                        <IconMenuScrumboard className="group-hover:!text-primary shrink-0" />
                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('BPJS')}</span>
                                    </div>

                                    <div className={currentMenu !== 'BPJS' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                        <IconCaretDown />
                                    </div>
                                </button>

                                <AnimateHeight duration={300} height={currentMenu === 'BPJS' ? 'auto' : 0}>
                                    <ul className="sub-menu text-gray-500">
                                        <li>
                                            <NavLink to="/bpjs/semuabpjs">{t('Semua Data BPJS')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/bpjs/tambahdatabpjs">{t('Tambah Data BPJS')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/bpjs/bpjstk">{t('BPJS TK')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/bpjs/bpjskesehatan">{t('BPJS Kesehatan')}</NavLink>
                                        </li>
                                    </ul>
                                </AnimateHeight>
                            </li>

                            <li className="menu nav-item">
                                <button type="button" className={`${currentMenu === 'Pajak' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('Pajak')}>
                                    <div className="flex items-center">
                                        <IconMenuAuthentication className="group-hover:!text-primary shrink-0" />
                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Pajak')}</span>
                                    </div>

                                    <div className={currentMenu !== 'Pajak' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                        <IconCaretDown />
                                    </div>
                                </button>

                                <AnimateHeight duration={300} height={currentMenu === 'Pajak' ? 'auto' : 0}>
                                    <ul className="sub-menu text-gray-500">
                                        <li>
                                            <NavLink to="/pajak/semuadatapajak">{t('Semua Data Pajak')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/pajak/tambahdatapajak">{t('Tambah Data Pajak')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/pajak/pph21">{t('PPH 21')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/pajak/pph23">{t('PPH 23')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/pajak/ppn">{t('PPN')}</NavLink>
                                        </li>
                                    </ul>
                                </AnimateHeight>
                            </li>

                            {/* <li className="menu nav-item">
                                <button type="button" className={`${currentMenu === 'Proyek' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('Proyek')}>
                                    <div className="flex items-center">
                                        <IconMenuForms className="group-hover:!text-primary shrink-0" />
                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Proyek')}</span>
                                    </div>

                                    <div className={currentMenu !== 'Proyek' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                        <IconCaretDown />
                                    </div>
                                </button>

                                <AnimateHeight duration={300} height={currentMenu === 'Proyek' ? 'auto' : 0}>
                                    <ul className="sub-menu text-gray-500">
                                        <li>
                                            <NavLink to="/proyek/semuaproyek">{t('Semua Proyek')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/proyek/tambahproyek">{t('Tambah Proyek')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/proyek/detailproyek">{t('Detail Proyek')}</NavLink>
                                        </li>
                                    </ul>
                                </AnimateHeight>
                            </li> */}

                            <li className="menu nav-item">
                                <button type="button" className={`${currentMenu === 'Gaji di Muka' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('Gaji di Muka')}>
                                    <div className="flex items-center">
                                        <IconMenuPages className="group-hover:!text-primary shrink-0" />
                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Gaji di Muka')}</span>
                                    </div>

                                    <div className={currentMenu !== 'Gaji di Muka' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                        <IconCaretDown />
                                    </div>
                                </button>

                                <AnimateHeight duration={300} height={currentMenu === 'Gaji di Muka' ? 'auto' : 0}>
                                    <ul className="sub-menu text-gray-500">
                                        <li>
                                            <NavLink to="/gajidimuka/semuadatagdm">{t('Semua Data GDM')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/gajidimuka/tambahdatagdm">{t('Tambah Data GDM')}</NavLink>
                                        </li>
                                    </ul>
                                </AnimateHeight>
                            </li>

                            <li className="menu nav-item">
                                <button type="button" className={`${currentMenu === 'Non-Penggajian' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('Non-Penggajian')}>
                                    <div className="flex items-center">
                                        <IconMenuInvoice className="group-hover:!text-primary shrink-0" />
                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Non-Penggajian')}</span>
                                    </div>

                                    <div className={currentMenu !== 'Non-Penggajian' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                        <IconCaretDown />
                                    </div>
                                </button>

                                <AnimateHeight duration={300} height={currentMenu === 'Non-Penggajian' ? 'auto' : 0}>
                                    <ul className="sub-menu text-gray-500">
                                        <li>
                                            <NavLink to="/nonpenggajian/semuapengeluaran">{t('Semua Pengeluaran Non-Penggajian')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/nonpenggajian/tambahpengeluaran">{t('Tambah Pengeluaran Non-Penggajian')}</NavLink>
                                        </li>
                                    </ul>
                                </AnimateHeight>
                            </li>

                            <li className="menu nav-item">
                                <button type="button" className={`${currentMenu === 'Report Pengajuan' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('Report Pengajuan')}>
                                    <div className="flex items-center">
                                        <IconMenuTodo className="group-hover:!text-primary shrink-0" />
                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Report Pengajuan')}</span>
                                    </div>

                                    <div className={currentMenu !== 'Report Pengajuan' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                        <IconCaretDown />
                                    </div>
                                </button>

                                <AnimateHeight duration={300} height={currentMenu === 'Report Pengajuan' ? 'auto' : 0}>
                                    <ul className="sub-menu text-gray-500">
                                        <li>
                                            <NavLink to="/reportpengajuan/semuareport">{t('Semua Report Pengajuan')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/reportpengajuan/tambahreport">{t('Tambah Report Pengajuan')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/reportpengajuan/detailreport">{t('Detail Report Pengajuan')}</NavLink>
                                        </li>
                                    </ul>
                                </AnimateHeight>
                            </li>

                            {/* <li className="menu nav-item">
                                <button type="button" className={`${currentMenu === 'Rekap Pengajuan' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('Rekap Pengajuan')}>
                                    <div className="flex items-center">
                                        <IconMenuApps className="group-hover:!text-primary shrink-0" />
                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Rekap Pengajuan')}</span>
                                    </div>

                                    <div className={currentMenu !== 'Rekap Pengajuan' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                        <IconCaretDown />
                                    </div>
                                </button>

                                <AnimateHeight duration={300} height={currentMenu === 'Rekap Pengajuan' ? 'auto' : 0}>
                                    <ul className="sub-menu text-gray-500">
                                        <li>
                                            <NavLink to="/rekappengajuan/semuadatarekappengajuan">{t('Semua Data Rekap Pengajuan')}</NavLink>
                                        </li>
                                    </ul>
                                </AnimateHeight>
                            </li> */}

                            <li className="menu nav-item">
                                <button type="button" className={`${currentMenu === 'User Management' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('User Management')}>
                                    <div className="flex items-center">
                                        <IconMenuApps className="group-hover:!text-primary shrink-0" />
                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('User Management')}</span>
                                    </div>

                                    <div className={currentMenu !== 'User Management' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                        <IconCaretDown />
                                    </div>
                                </button>

                                <AnimateHeight duration={300} height={currentMenu === 'User Management' ? 'auto' : 0}>
                                    <ul className="sub-menu text-gray-500">
                                        <li>
                                            <NavLink to="/">{t('Roles')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/data/users">{t('Pengguna')}</NavLink>
                                        </li>
                                    </ul>
                                </AnimateHeight>
                            </li>
                        </ul>
                    </PerfectScrollbar>
                </div>
            </nav>
        </div>
    );
};

export default Sidebar;
