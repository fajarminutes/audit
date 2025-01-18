import { lazy } from 'react';
const Index = lazy(() => import('../pages/Index'));
const SemuaMC = lazy(() => import('../pages/invoice/mastercode/semuamastercode'));
const DetailMC = lazy(() => import('../pages/invoice/mastercode/detailmastercode'));
const EditMC = lazy(() => import('../pages/invoice/mastercode/editmastercode'));
const TambahMC = lazy(() => import('../pages/invoice/mastercode/tambahmastercode'));
const SemuaInvoice = lazy(() => import('../pages/invoice/semuainvoice'));
const DetailInvoice = lazy(() => import('../pages/invoice/detailinvoice'));
const TambahInvoice = lazy(() => import('../pages/invoice/tambahinvoice'));
const EditInvoice = lazy(() => import('../pages/invoice/editinvoice'));
const SemuaLates = lazy(() => import('../pages/invoice/semualates'));
const DetailLates = lazy(() => import('../pages/invoice/detaillates'));
const TambahLates = lazy(() => import('../pages/invoice/tambahlates'));
const EditLates = lazy(() => import('../pages/invoice/editlates'));

const SemuaPengajuan = lazy(() => import('../pages/pengajuan/semuapengajuan'));
const TambahPengajuan = lazy(() => import('../pages/pengajuan/tambahpengajuan'));
const UpdatePengajuan = lazy(() => import('../pages/pengajuan/editpengajuan'));
const ReviewPengajuan = lazy(() => import('../pages/pengajuan/reviewpengajuan'));
const DetailPengajuan = lazy(() => import('../pages/pengajuan/detailpengajuan'));

const SemuaPenggajian = lazy(() => import('../pages/penggajian/semuapenggajian'));
const TambahPenggajian = lazy(() => import('../pages/penggajian/tambahpenggajian'));
const UpdatePenggajian = lazy(() => import('../pages/penggajian/editpenggajian'));

const SemuaDataGdm = lazy(() => import('../pages/gajidimuka/semuadatagdm'));
const TambahDataGdm = lazy(() => import('../pages/gajidimuka/tambahdatagdm'));
const UpdateDataGdm = lazy(() => import('../pages/gajidimuka/editdatagdm'));

const Roles = lazy(() => import('../pages/Roles/Roles'));

const Users = lazy(() => import('../pages/Users/Users'));
const TambahUsers = lazy(() => import('../pages/Users/TambahUsers'));

const SemuaBpjs = lazy(() => import('../pages/bpjs/semuabpjs'));
const TambahDataBpjs = lazy(() => import('../pages/bpjs/tambahdatabpjs'));
const UpdateDataBpjs = lazy(() => import('../pages/bpjs/editdatabpjs'));

const routes = [
    // dashboard
    {
        path: '/',
        element: <Index />,
        layout: 'default',
    },
    {
        path: '/invoice/mastercode/semuamastercode',
        element: <SemuaMC />,
    },
    {
        path: '/invoice/mastercode/detailmastercode/:id',
        element: <DetailMC />,
    },
    {
        path: '/invoice/mastercode/editmastercode/:id',
        element: <EditMC />,
    },
    {
        path: '/invoice/mastercode/tambahmastercode',
        element: <TambahMC />,
    },
    {
        path: '/invoice/semuainvoice',
        element: <SemuaInvoice />,
    },
    {
        path: '/invoice/detailinvoice/:id',
        element: <DetailInvoice />,
    },
    {
        path: '/invoice/tambahinvoice',
        element: <TambahInvoice />,
    },
    {
        path: '/invoice/editinvoice/:id',
        element: <EditInvoice />,
    },
    {
        path: '/invoice/semualates',
        element: <SemuaLates />,
    },
    {
        path: '/invoice/detaillates/:id',
        element: <DetailLates />,
    },
    {
        path: '/invoice/tambahlates',
        element: <TambahLates />,
    },
    {
        path: '/invoice/editlates/:id',
        element: <EditLates />,
    },
    {
        path: '/pengajuan/semuapengajuan',
        element: <SemuaPengajuan />,
    },
    {
        path: '/pengajuan/tambahpengajuan',
        element: <TambahPengajuan />,
    },
    {
        path: '/pengajuan/editpengajuan/:id',
        element: <UpdatePengajuan />,
    },
    {
        path: '/pengajuan/reviewpengajuan',
        element: <ReviewPengajuan />,
    },
    {
        path: '/pengajuan/detailpengajuan',
        element: <DetailPengajuan />,
    },
    {
        path: '/penggajian/semuapenggajian',
        element: <SemuaPenggajian />,
    },
    {
        path: '/penggajian/tambahpenggajian',
        element: <TambahPenggajian />,
    },
    {
        path: '/penggajian/editpenggajian/:id',
        element: <UpdatePenggajian />,
    },
    {
        path: '/gajidimuka/semuadatagdm',
        element: <SemuaDataGdm />,
    },
    {
        path: '/gajidimuka/tambahdatagdm',
        element: <TambahDataGdm />,
    },
    {
        path: '/gajidimuka/edit/:id',
        element: <UpdateDataGdm />,
    },
    {
        path: '/data/roles',
        element: <Roles />,
    },
    {
        path: '/data/users',
        element: <Users />,
    },
    {
        path: '/data/users/tambah',
        element: <TambahUsers />,
    },
    {
        path: '/bpjs/semuabpjs',
        element: <SemuaBpjs />,
    },
    {
        path: '/bpjs/tambahdatabpjs',
        element: <TambahDataBpjs />,
    },
    {
        path: '/bpjs/editdatabpjs/:id',
        element: <UpdateDataBpjs />,
    },
];

export { routes };
