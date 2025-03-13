import React, { useContext } from 'react'
import LoginIcon from '../assets/userProfile.png'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import summaryAPI from '../common/index';
import AppContext from '../context';

const Login = () => {
    const navigate = useNavigate();
    const { fetchUserDetails } = useContext(AppContext)

    const [showPassword, setShowPassword] = React.useState(false);
    const [data, setData] = React.useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((preve) => {
            return{
                ...preve,
                [name]: value
            }
        })
    }

    const handleSubmit = async(e) => {
        e.preventDefault();

        if (!data.email || !data.password) {
            toast.error('All fields are required.', { position: "top-center" });
            return;
        }
        const dataResponse = await fetch(summaryAPI.Login.url, {
            method: summaryAPI.Login.method,
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        const dataResult = await dataResponse.json();
        if (dataResult.error) {
            toast.error(dataResult.message, { position: "top-center" });
        }
        if (dataResult.success) {
            toast.success(dataResult.message, { position: "top-center" });
            navigate('/')
            fetchUserDetails()
        }
        console.log("login data", data)
    }

  return (
    <section id="login">
        <div className='container mx-auto p-4'>
            <div className='w-full bg-white max-w-md p-2 py-5 mx-auto shadow-[#ff8c42] shadow-md'>
                <div className='w-20 h-20 mx-auto '>
                    <img src={LoginIcon} alt="Login" />
                </div>

                <form className='pt-6 flex flex-col gap-4' onSubmit={handleSubmit}>
                    <div className='grid mb-2'>
                        <label className='text-[#333333]'>Email: </label>
                        <div className='bg-slate-100 p-2 '>
                            <input
                            type="email"
                            placeholder='enter email'
                            name= 'email'
                            value= {data.email}
                            onChange={handleChange}
                            className='w-full h-full outline-none'
                            />
                        </div>
                    </div>

                    <div>
                        <label className='text-[#333333]'>Password: </label>
                        <div className='bg-slate-100 p-2 flex items-center'>
                            <input
                            type={showPassword ? 'password' : 'text'}
                            placeholder='enter password'
                            name= 'password'
                            value= {data.password}
                            onChange={handleChange}
                            className='w-full h-full outline-none' />
                            <div>
                                <span className='cursor-pointer text-xl'>
                                    {
                                    showPassword ? (
                                        <FaEye onClick={() => setShowPassword(!showPassword)} />
                                    ) : (
                                        <FaEyeSlash onClick={() => setShowPassword(!showPassword)} />
                                    )
                                    }
                                </span>
                            </div>
                        </div>
                        <Link to='/forgot-password' className='block text-right text-[#ff8c42] hover:text-[#E76F51] transition-all'>
                            Forgot Password?
                        </Link>
                    </div>

                    <button type='submit' onClick={handleSubmit} className='cursor-pointer bg-[#ff8c42] text-white w-full max-w-[150px] px-6 py-2 mx-auto block mt-6 rounded-full hover:scale-105 hover:bg-[#E76F51] transition-all'>
                        Login
                    </button>
                </form>

                <p className='mt-2 text-[#333333]'>
                    Don't have an account?
                    <Link to='/sign-up' className='text-[#ff8c42] hover:text-[#E76F51] transition-all'> Register here!</Link>
                </p>
            </div>
        </div>
    </section>
  )
}

export default Login
