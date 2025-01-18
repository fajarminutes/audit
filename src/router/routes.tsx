import { lazy } from 'react';  
import ProtectedRoute from '../pages/Auth/ProtectedRoute'; // Sesuaikan dengan path yang benar  
import PublicRoute from '../pages/Auth/PublicRoute'; // Sesuaikan dengan path yang benar  
  
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
const SemuaCustomer = lazy(() => import('../pages/customer/semuapelanggan'));  
const DetailCustomer = lazy(() => import('../pages/customer/detailpelanggan'));  
const TambahCustomer = lazy(() => import('../pages/customer/tambahpelanggan'));  
const EditCustomer = lazy(() => import('../pages/customer/editpelanggan'));  
const SemuaPengeluaran = lazy(() => import('../pages/nonpenggajian/semuapengeluaran'));  
const DetailPengeluaran = lazy(() => import('../pages/nonpenggajian/detailpengeluaran'));  
const TambahPengeluaran = lazy(() => import('../pages/nonpenggajian/tambahpengeluaran'));  
const EditPengeluaran = lazy(() => import('../pages/nonpenggajian/editpengeluaran'));  
const SemuaDataPajak = lazy(() => import('../pages/pajak/semuadatapajak'));  
const TambahDataPajak = lazy(() => import('../pages/pajak/tambahdatapajak'));  
const Ppn = lazy(() => import('../pages/pajak/ppn'));  
const Pph23 = lazy(() => import('../pages/pajak/pph23'));  
const Pph21 = lazy(() => import('../pages/pajak/pph21'));  
const SemuaJabatan = lazy(() => import('../pages/jabatan/semuajabatan'));  
const TambahJabatan = lazy(() => import('../pages/jabatan/tambahjabatan'));  
const EditJabatan = lazy(() => import('../pages/jabatan/editjabatan'));  
const DetailJabatan = lazy(() => import('../pages/jabatan/detailjabatan'));  
const TambahPVSI = lazy(() => import('../pages/invoice/pengajuanvsinvoice/tambahpengajuanvsinvoice'));  
const SemuaPVSI = lazy(() => import('../pages/invoice/pengajuanvsinvoice/semuapengajuanvsinvoice'));  
const EditPVSI = lazy(() => import('../pages/invoice/pengajuanvsinvoice/editpvsi'));  
  
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
const Users = lazy(() => import('../pages/Users/Users'));  
const TambahUsers = lazy(() => import('../pages/Users/TambahUsers'));  
const SemuaBpjs = lazy(() => import('../pages/bpjs/semuabpjs'));  
const TambahDataBpjs = lazy(() => import('../pages/bpjs/tambahdatabpjs'));  
const UpdateDataBpjs = lazy(() => import('../pages/bpjs/editdatabpjs'));  
  
const Roles = lazy(() => import('../pages/Roles/Roles'));  
  
const Login = lazy(() => import('../pages/Auth/Login'));  
  
const routes = [  
    {  
        path: '/login',  
        element: (  
            <PublicRoute>  
                <Login />  
            </PublicRoute>  
        ),  
        layout: 'blank',  
    },  
    // dashboard  
    {  
        path: '/',  
        element: (  
            <ProtectedRoute>  
                <Index />  
            </ProtectedRoute>  
        ),  
        layout: 'default',  
    },  
    {  
        path: '/invoice/mastercode/semuamastercode',  
        element: (  
            <ProtectedRoute>  
                <SemuaMC />  
            </ProtectedRoute>  
        ),  
    },  
    {  
        path: '/invoice/mastercode/detailmastercode/:id',  
        element: (  
            <ProtectedRoute>  
                <DetailMC />  
            </ProtectedRoute>  
        ),  
    },  
    {  
        path: '/invoice/mastercode/editmastercode/:id',  
        element: (  
            <ProtectedRoute>  
                <EditMC />  
            </ProtectedRoute>  
        ),  
    },  
    {  
        path: '/invoice/mastercode/tambahmastercode',  
        element: (  
            <ProtectedRoute>  
                <TambahMC />  
            </ProtectedRoute>  
        ),  
    },  
    {  
        path: '/invoice/semuainvoice',  
        element: (  
            <ProtectedRoute>  
                <SemuaInvoice />  
            </ProtectedRoute>  
        ),  
    },  
    {  
        path: '/invoice/detailinvoice/:id',  
        element: (  
            <ProtectedRoute>  
                <DetailInvoice />  
            </ProtectedRoute>  
        ),  
    },  
    {  
        path: '/invoice/tambahinvoice',  
        element: (  
            <ProtectedRoute>  
                <TambahInvoice />  
            </ProtectedRoute>  
        ),  
    },  
    {  
        path: '/invoice/editinvoice/:id',  
        element: (  
            <ProtectedRoute>  
                <EditInvoice />  
            </ProtectedRoute>  
        ),  
    },  
    {  
        path: '/invoice/semualates',  
        element: (  
            <ProtectedRoute>  
                <SemuaLates />  
            </ProtectedRoute>  
        ),  
    },  
    {  
        path: '/invoice/detaillates/:id',  
        element: (  
            <ProtectedRoute>  
                <DetailLates />  
            </ProtectedRoute>  
        ),  
    },  
    {  
        path: '/invoice/tambahlates',  
        element: (  
            <ProtectedRoute>  
                <TambahLates />  
            </ProtectedRoute>  
        ),  
    },  
    {  
        path: '/invoice/editlates/:id',  
        element: (  
            <ProtectedRoute>  
                <EditLates />  
            </ProtectedRoute>  
        ),  
    },  
    {  
        path: '/pelanggan/semuapelanggan',  
        element: (  
            <ProtectedRoute>  
                <SemuaCustomer />  
            </ProtectedRoute>  
        ),  
    },  
    {  
        path: '/pelanggan/detailpelanggan/:id',  
        element: (  
            <ProtectedRoute>  
                <DetailCustomer />  
            </ProtectedRoute>  
        ),  
    },  
    {  
        path: '/pelanggan/tambahpelanggan',  
        element: (  
            <ProtectedRoute>  
                <TambahCustomer />  
            </ProtectedRoute>  
        ),  
    },  
    {  
        path: '/pelanggan/editpelanggan/:id',  
        element: (  
            <ProtectedRoute>  
                <EditCustomer />  
            </ProtectedRoute>  
        ),  
    },  
    {  
        path: '/nonpenggajian/semuapengeluaran',  
        element: (  
            <ProtectedRoute>  
                <SemuaPengeluaran />  
            </ProtectedRoute>  
        ),  
    },  
    {  
        path: '/nonpenggajian/detailpengeluaran/:id',  
        element: (  
            <ProtectedRoute>  
                <DetailPengeluaran />  
            </ProtectedRoute>  
        ),  
    },  
    {  
        path: '/nonpenggajian/tambahpengeluaran',  
        element: (  
            <ProtectedRoute>  
                <TambahPengeluaran />  
            </ProtectedRoute>  
        ),  
    },  
    {  
        path: '/nonpenggajian/editpengeluaran/:id',  
        element: (  
            <ProtectedRoute>  
                <EditPengeluaran />  
            </ProtectedRoute>  
        ),  
    },  
    {  
        path: '/pajak/semuadatapajak',  
        element: (  
            <ProtectedRoute>  
                <SemuaDataPajak />  
            </ProtectedRoute>  
        ),  
    },  
    {  
        path: '/pajak/tambahdatapajak',  
        element: (  
            <ProtectedRoute>  
                <TambahDataPajak />  
            </ProtectedRoute>  
        ),  
    },  
    {  
        path: '/pajak/ppn',  
        element: (  
            <ProtectedRoute>  
                <Ppn />  
            </ProtectedRoute>  
        ),  
    },  
    {  
        path: '/pajak/pph23',  
        element: (  
            <ProtectedRoute>  
                <Pph23 />  
            </ProtectedRoute>  
        ),  
    },  
    {  
        path: '/pajak/pph21',  
        element: (  
            <ProtectedRoute>  
                <Pph21 />  
            </ProtectedRoute>  
        ),  
    },  
    {  
        path: '/jabatan/semuajabatan',  
        element: (  
            <ProtectedRoute>  
                <SemuaJabatan />  
            </ProtectedRoute>  
        ),  
    },  
    {  
        path: '/jabatan/tambahjabatan',  
        element: (  
            <ProtectedRoute>  
                <TambahJabatan />  
            </ProtectedRoute>  
        ),  
    },  
    {  
        path: '/jabatan/editjabatan/:id',  
        element: (  
            <ProtectedRoute>  
                <EditJabatan />  
            </ProtectedRoute>  
        ),  
    },  
    {  
        path: '/jabatan/detailjabatan/:id',  
        element: (  
            <ProtectedRoute>  
                <DetailJabatan />  
            </ProtectedRoute>  
        ),  
    },  
    {  
        path: '/invoice/pengajuanvsinvoice/semuapengajuanvsinvoice',  
        element: (  
            <ProtectedRoute>  
                <SemuaPVSI />  
            </ProtectedRoute>  
        ),  
    },  
    {  
        path: '/invoice/pengajuanvsinvoice/tambahpengajuanvsinvoice/',  
        element: (  
            <ProtectedRoute>  
                <TambahPVSI />  
            </ProtectedRoute>  
        ),  
    },  
    {  
        path: '/invoice/pengajuanvsinvoice/editpengajuanvsinvoice/:id',  
        element: (  
            <ProtectedRoute>  
                <EditPVSI />  
            </ProtectedRoute>  
        ),  
    },  
    {  
        path: '/pengajuan/semuapengajuan',  
        element: (  
            <ProtectedRoute>  
                <SemuaPengajuan />  
            </ProtectedRoute>  
        ),  
    },  
    {  
        path: '/pengajuan/tambahpengajuan',  
        element: (  
            <ProtectedRoute>  
                <TambahPengajuan />  
            </ProtectedRoute>  
        ),  
    },  
    {  
        path: '/pengajuan/editpengajuan/:id',  
        element: (  
            <ProtectedRoute>  
                <UpdatePengajuan />  
            </ProtectedRoute>  
        ),  
    },  
    {  
        path: '/pengajuan/reviewpengajuan',  
        element: (  
            <ProtectedRoute>  
                <ReviewPengajuan />  
            </ProtectedRoute>  
        ),  
    },  
    {  
        path: '/pengajuan/detailpengajuan',  
        element: (  
            <ProtectedRoute>  
                <DetailPengajuan />  
            </ProtectedRoute>  
        ),  
    },  
    {  
        path: '/penggajian/semuapenggajian',  
        element: (  
            <ProtectedRoute>  
                <SemuaPenggajian />  
            </ProtectedRoute>  
        ),  
    },  
    {  
        path: '/penggajian/tambahpenggajian',  
        element: (  
            <ProtectedRoute>  
                <TambahPenggajian />  
            </ProtectedRoute>  
        ),  
    },  
    {  
        path: '/penggajian/editpenggajian/:id',  
        element: (  
            <ProtectedRoute>  
                <UpdatePenggajian />  
            </ProtectedRoute>  
        ),  
    },  
    {  
        path: '/gajidimuka/semuadatagdm',  
        element: (  
            <ProtectedRoute>  
                <SemuaDataGdm />  
            </ProtectedRoute>  
        ),  
    },  
    {  
        path: '/gajidimuka/tambahdatagdm',  
        element: (  
            <ProtectedRoute>  
                <TambahDataGdm />  
            </ProtectedRoute>  
        ),  
    },  
    {  
        path: '/gajidimuka/edit/:id',  
        element: (  
            <ProtectedRoute>  
                <UpdateDataGdm />  
            </ProtectedRoute>  
        ),  
    },  
    {  
        path: '/data/roles',  
        element: (  
            <ProtectedRoute>  
                <Roles />  
            </ProtectedRoute>  
        ),  
    },  
    {  
        path: '/data/users',  
        element: (  
            <ProtectedRoute>  
                <Users />  
            </ProtectedRoute>  
        ),  
    },  
    {  
        path: '/data/users/tambah',  
        element: (  
            <ProtectedRoute>  
                <TambahUsers />  
            </ProtectedRoute>  
        ),  
    },  
    {  
        path: '/bpjs/semuabpjs',  
        element: (  
            <ProtectedRoute>  
                <SemuaBpjs />  
            </ProtectedRoute>  
        ),  
    },  
    {  
        path: '/bpjs/tambahdatabpjs',  
        element: (  
            <ProtectedRoute>  
                <TambahDataBpjs />  
            </ProtectedRoute>  
        ),  
    },  
    {  
        path: '/bpjs/editdatabpjs/:id',  
        element: (  
            <ProtectedRoute>  
                <UpdateDataBpjs />  
            </ProtectedRoute>  
        ),  
    },  
];  
  
export { routes };  
