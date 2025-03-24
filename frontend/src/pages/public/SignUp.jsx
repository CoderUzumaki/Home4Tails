import React from 'react'
import SignUpIcon from '../../assets/userProfile.png'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import summaryAPI from '../../common/index';

const SignUp = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = React.useState(false);
    const [data, setData] = React.useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((preve) => {
            return{
                ...preve,
                [name]: value
            }
        });
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        if (!data.name || !data.email || !data.password || !data.confirmPassword) {
            toast.error('All fields are required.', { position: "top-center" });
            return;
        }
        if (data.password.length < 8) {
            toast.error('Password must be at least 8 characters long.', { position: "top-center" });
            return;
        }
        if (data.password !== data.confirmPassword) {
            toast.error('Passwords do not match!', { position: "top-center" });
            return;
        }

        try {
            const dataResponse = await fetch(summaryAPI.SignUp.url, {
                method: summaryAPI.SignUp.method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
            const dataResult = await dataResponse.json();
            if (dataResult.error) {
                toast.error(dataResult.message, { position: "top-center" });
                return;
            }
            toast.success(dataResult.message, { position: "top-center" });
            navigate('/login');
        } catch(error) {
            toast.error('Something went wrong!', { position: "top-center" });
        }
    }

  return (
    <section id="sign-up">
        <div className='container mx-auto p-4 flex items-center min-h-[calc(100vh-120px)]'>
            <div className='w-full bg-white max-w-md p-2 py-5 mx-auto shadow-md'>
                <div className='w-20 h-20 mx-auto flex'>
                    <img src={SignUpIcon} alt="Sign Up" />
                </div>

                <form className='pt-6 flex flex-col gap-4' onSubmit={handleSubmit}>
                <div className='grid mb-2'>
                        <label className='text-[#333333]'>Name: </label>
                        <div className='bg-slate-100 p-2 '>
                            <input
                            type="text"
                            placeholder='enter name'
                            name= 'name'
                            value= {data.name}
                            onChange={handleChange}
                            className='w-full h-full outline-none'
                            aria-label="Name" />
                        </div>
                    </div>

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
                            aria-label="Email" />
                        </div>
                    </div>

                    <div>
                        <label className='text-[#333333]'>Password: </label>
                        <div className='bg-slate-100 p-2 flex items-center'>
                            <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder='enter password'
                            name= 'password'
                            value= {data.password}
                            onChange={handleChange}
                            className='w-full h-full outline-none'
                            aria-label="Password"/>
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
                    </div>

                    <div>
                        <label className='text-[#333333]'>Confirm Password: </label>
                        <div className='bg-slate-100 p-2 flex items-center'>
                            <input
                            type='password'
                            placeholder='confirm your password'
                            name= 'confirmPassword'
                            value= {data.confirmPassword}
                            onChange={handleChange}
                            className='w-full h-full outline-none'
                            aria-label="Confirm Password" />
                        </div>
                    </div>

                    <button type='submit' className='cursor-pointer bg-[#ff8c42] text-white w-full max-w-[150px] px-6 py-2 mx-auto block mt-6 rounded-full hover:scale-105 hover:bg-[#E76F51] transition-all'>
                        Sign Up
                    </button>
                </form>

                <p className='mt-2 text-[#333333]'>
                    Already have an account?
                    <Link to='/login' className='text-[#ff8c42] hover:text-[#E76F51] transition-all'> Login here!</Link>
                </p>
            </div>
        </div>
    </section>
  )
}

export default SignUp
