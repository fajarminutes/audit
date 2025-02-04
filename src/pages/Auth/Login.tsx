import { Link, useNavigate, useLocation } from 'react-router-dom';  
import { useDispatch } from 'react-redux';  
import { useEffect, useState } from 'react';  
import { setPageTitle } from '../../store/themeConfigSlice';  
import Swal from 'sweetalert2';  
import withReactContent from 'sweetalert2-react-content';  
import IconMail from '../../components/Icon/IconMail';  
import IconLockDots from '../../components/Icon/IconLockDots';  
  
const MySwal = withReactContent(Swal);  
  
const LoginBoxed = () => {  
    const dispatch = useDispatch();  
    const navigate = useNavigate();  
    const location = useLocation();  
  
    const [alertDisplayed, setAlertDisplayed] = useState(false);  
    const [isLoading, setIsLoading] = useState(false); // State untuk tombol loading  
   const showToast = (icon, title) => {                
          const toast = Swal.mixin({                
              toast: true,                
              position: 'top-end',                
              showConfirmButton: false,                
              timer: 3000,                
              padding: '10px 20px',                
          });                
          toast.fire({                
              icon: icon,                
              title: title,                
              padding: '10px 20px',                
          });                
      };   

    useEffect(() => {  
        dispatch(setPageTitle('Login'));  
  
        const alertShown = sessionStorage.getItem('alertDisplayed');  
        if (!alertShown && location.state?.alert) {  
            MySwal.fire({  
                title: 'Peringatan',  
                text: location.state.alert,  
                icon: 'warning',  
                confirmButtonText: 'OK',  
            }).then(() => {  
                sessionStorage.setItem('alertDisplayed', 'true');  
                setAlertDisplayed(true);  
            });  
        }  
    }, [dispatch, location.state]);  
  
    const [username, setUsername] = useState('');  
    const [password, setPassword] = useState('');  
  
    const submitForm = async (e) => {    
        e.preventDefault();    
      
        if (!username || !password) {    
            showToast('warning', 'Username dan kata sandi harus diisi!');  
            return;    
        }    
      
        setIsLoading(true); // Mulai loading    
      
        try {    
            const response = await fetch('https://intranet.sinarjernihsuksesindo.id/api/users/login', {    
                method: 'POST',    
                headers: {    
                    'Content-Type': 'application/json',    
                },    
                body: JSON.stringify({ username, password }),    
            });    
      
            const result = await response.json();    
      
            if (response.ok) {    
                showToast('success', 'Login berhasil, selamat datang!');      
      
                // Simpan semua data ke localStorage  
                localStorage.setItem('access_token', result.token);    
                localStorage.setItem('token_expired_at', result.expires_at);    
                localStorage.setItem('user_data', JSON.stringify(result.user)); // Simpan data pengguna  
      
                setTimeout(() => {      
                    sessionStorage.removeItem('alertDisplayed');      
                    navigate('/');          
                }, 2000);      
      
            } else {    
                showToast('warning', result.message || 'Username atau kata sandi salah.');  
            }    
        } catch (error) {    
            console.error('Error:', error);    
            showToast('error', 'Terjadi kesalahan pada server. Silakan coba lagi nanti');  
        } finally {    
            setIsLoading(false); // Akhiri loading    
        }    
    };    
      
  
    return (  
        <div>  
            <div className="absolute inset-0">  
                <img src="/assets/images/auth/bg-gradient.png" alt="image" className="h-full w-full object-cover" />  
            </div>  
  
            <div className="relative flex min-h-[calc(100vh-100px)] items-center justify-center bg-[url(/assets/images/auth/map.png)] bg-cover bg-center bg-no-repeat px-6 py-10 dark:bg-[#060818] sm:px-16">  
                <div className="relative w-full max-w-[870px] rounded-md bg-[linear-gradient(45deg,#fff9f9_0%,rgba(255,255,255,0)_25%,rgba(255,255,255,0)_75%,_#fff9f9_100%)] p-2 dark:bg-[linear-gradient(52.22deg,#0E1726_0%,rgba(14,23,38,0)_18.66%,rgba(14,23,38,0)_51.04%,rgba(14,23,38,0)_80.07%,#0E1726_100%)]">  
                    <div className="relative flex flex-col justify-center rounded-md bg-white/60 backdrop-blur-lg dark:bg-black/50 px-6 lg:min-h-[10px] py-20">  
                        <div className="mx-auto w-full max-w-[440px]">  
                            <div className="mb-10">  
                                <div className="flex justify-center mb-4">  
                                    <img  
                                        src="/Audtrack.png"  
                                        alt="NESIPANDU Logo"  
                                        className="h-16 w-auto"  
                                    />   
                                </div>  
                                <p className="text-base font-bold leading-normal text-white-dark text-center">  
                                    Masukkan username dan kata sandi untuk login  
                                </p>  
                            </div>  
                            <form className="space-y-5 dark:text-white" onSubmit={submitForm}>  
                                <div>  
                                    <label htmlFor="Username">Username</label>  
                                    <div className="relative text-white-dark">  
                                        <input  
                                            id="Username"  
                                            type="text"  
                                            value={username}  
                                            onChange={(e) => setUsername(e.target.value)}  
                                            placeholder="Masukkan Username"  
                                            className="form-input ps-10 placeholder:text-white-dark"  
                                        />  
                                        <span className="absolute start-4 top-1/2 -translate-y-1/2">  
                                            <IconMail fill={true} />  
                                        </span>  
                                    </div>  
                                </div>  
                                <div>  
                                    <label htmlFor="Password">Password</label>  
                                    <div className="relative text-white-dark">  
                                        <input  
                                            id="Password"  
                                            type="password"  
                                            value={password}  
                                            onChange={(e) => setPassword(e.target.value)}  
                                            placeholder="Masukkan Kata Sandi"  
                                            className="form-input ps-10 placeholder:text-white-dark"  
                                        />  
                                        <span className="absolute start-4 top-1/2 -translate-y-1/2">  
                                            <IconLockDots fill={true} />  
                                        </span>  
                                    </div>  
                                </div>  
                                <button  
                                    type="submit"  
                                    disabled={isLoading}  
                                    className={`btn btn-gradient !mt-6 w-full border-0  shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)] ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}  
                                >  
                                    {isLoading ? 'Loading...' : 'Login to Admin'}  
                                </button>  
                            </form>  
                        </div>  
                    </div>  
                </div>  
            </div>  
        </div>  
    );  
};  
  
export default LoginBoxed;  
