import { NavLink, useNavigate } from "react-router-dom"
import { AiOutlineLock, AiOutlineEye, AiOutlineEyeInvisible, AiOutlineMail, AiOutlineUser } from "react-icons/ai";
import gb_page from "../assets/img/Illustrasi_Login.png" 
import logo from "../assets/img/Logo.png"
import { useEffect, useRef, useState } from "react"
import "../App.css"
import { useDispatch, useSelector } from "react-redux";
import { clearMessage } from "../redux/slices/message";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { registerSlice } from "../redux/slices/auth";

const Register = () => {
    
    const navigate = useNavigate()
    const [successful, setSuccessful] = useState(false);

    const sectionStyle = {
        backgroundImage: `url(${gb_page})`,
    }

    const { message } = useSelector((state) => state.message);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(clearMessage());
    }, [dispatch]);

    const [isOpenEyeConfirm, setIsOpenEyeConfirm] = useState(false)
    const [isOpenEye, setIsOpenEye] = useState(false)
    const [onFocus, setOnFocus] = useState(false)
    
    function openEye(toogleEye) {
        setIsOpenEye(!toogleEye)
    }
    
    function openEyeConfirm(toogleEye1) {
        setIsOpenEyeConfirm(!toogleEye1)
    }

    const formSchema = Yup.object().shape({
        email: Yup.string()
          .required('Email harus diisi.'),
        first_name: Yup.string()
          .required('Nama depan harus diisi.'),
        last_name: Yup.string()
          .required('Nama belakang harus diisi.'),
        password: Yup.string()
          .required('Password harus diisi.')
          .min(3, 'Password must be at 3 char long'),
        password1: Yup.string()
          .required('Password konfirmasi harus diisi.')
          .oneOf([Yup.ref('password')], 'Passwords does not match'),
    })
    const formOptions = { resolver: yupResolver(formSchema) }
    const { register, handleSubmit, reset, formState } = useForm(formOptions)
    const { errors } = formState

    function handleFocus(e) {
        setOnFocus(e.target.name)
    }

    function xclose() {
        dispatch(clearMessage());
    }

    function onSubmit(data) {
        setSuccessful(false);

        dispatch(registerSlice(data))
        .unwrap()
        .then(() => {
            setSuccessful(true);
            setTimeout(() => {
                navigate('/login')
            }, 1500)
        })
        .catch(() => {
            setSuccessful(false);
        });
    }

    return (
        <>
            <div className="w-full h-screen justify-center bg-white text-gray-800">
                <div className="grid grid-cols-2 h-screen">
                    <div className="w-full grid place-content-center">
                        <div className="m-5 justify-center">
                            <div className="flex justify-center">
                                <img src={logo} className="h-8 pe-2 pt-1"/>
                                <h2 className="text-2xl font-bold font-sans">SIMS PPOB</h2>
                            </div>
                            <div className="w-2/3 text-center mx-auto mt-8 text-3xl font-bold font-sans block">Lengkapi data atau membuat akun</div>

                            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
                                {!successful && message &&
                                    <div className="bg-red-400 text-white p-2 rounded-sm text-sm w-full">{message}
                                    <div className="cursor-pointer float-right" onClick={() => xclose()}>X</div>
                                    </div>
                                }
                                {successful && message &&
                                    <div className="bg-green-600 text-white p-2 rounded-sm text-sm w-full">{message}
                                    <div className="cursor-pointer float-right" onClick={() => xclose()}>X</div>
                                    </div>
                                }

                                <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                                    <div className="mt-0">
                                        <AiOutlineMail className={onFocus == 'email' ? 'icon_input text-black' : 'icon_input'}/>
                                        <input
                                            onFocus={(e) => handleFocus(e)}
                                            id="email"
                                            name="email"
                                            type="email"
                                            autoComplete="email"
                                            placeholder="masukkan email anda"
                                            {...register('email', {required : true})}
                                            className={`px-2 block w-full rounded border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 bg-white ${errors.email ? 'is-invalid' : ''}`}
                                        />
                                        <div className="text-red-400 text-sm">{errors.email?.message}</div>
                                    </div>
                                    
                                    <div className="mt-0">
                                        <AiOutlineUser className={onFocus == 'first_name' ? 'icon_input text-black' : 'icon_input'}/>
                                        <input
                                             onFocus={(e) => handleFocus(e)}
                                            id="first_name"
                                            name="first_name"
                                            type="text"
                                            autoComplete="off"
                                            placeholder="nama depan"
                                            {...register('first_name', {required : true})}
                                            className={`px-2 block w-full rounded border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 bg-white ${errors.first_name ? 'is-invalid' : ''}`}
                                        />
                                        <div className="text-red-400 text-sm">{errors.first_name?.message}</div>
                                    </div>
                                    
                                    <div className="mt-0">
                                        <AiOutlineUser className={onFocus == 'last_name' ? 'icon_input text-black' : 'icon_input'}/>
                                        <input
                                             onFocus={(e) => handleFocus(e)}
                                            id="last_name"
                                            name="last_name"
                                            type="text"
                                            autoComplete="off"
                                            placeholder="nama belakang"
                                            {...register('last_name', {required : true})}
                                            className={`px-2 block w-full rounded border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 bg-white ${errors.last_name ? 'is-invalid' : ''}`}
                                        />
                                        <div className="text-red-400 text-sm">{errors.last_name?.message}</div>
                                    </div>

                                    <div className="mt-0">
                                        <AiOutlineLock className="icon_input float-left"/>
                                        <div className="cursor-pointer" onClick={() => openEye(isOpenEye)}>
                                            {
                                                !isOpenEye ? 
                                                <AiOutlineEyeInvisible className="icon_input_eye float-right" />
                                                :
                                                <AiOutlineEye className="icon_input_eye float-right" />
                                            }
                                        </div>
                                        <input
                                             onFocus={(e) => handleFocus(e)}
                                            id="password"
                                            name="password"
                                            type={!isOpenEye ? "password" : "text"}
                                            autoComplete="current-password"
                                            placeholder="buat password"
                                            {...register('password', {required : true})}
                                            className={`px-2 block w-full rounded border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 bg-white ${errors.password ? 'is-invalid' : ''}`}
                                        />
                                        <div className="text-red-400 text-sm">{errors.password?.message}</div>
                                    </div>

                                    <div className="mt-0">
                                        <AiOutlineLock className="icon_input float-left"/>
                                        <div className="cursor-pointer" onClick={() => openEyeConfirm(isOpenEyeConfirm)}>
                                            {
                                                !isOpenEyeConfirm ? 
                                                <AiOutlineEyeInvisible className="icon_input_eye float-right" />
                                                :
                                                <AiOutlineEye className="icon_input_eye float-right" />
                                            }
                                        </div>
                                        <input
                                             onFocus={(e) => handleFocus(e)}
                                            id="password1"
                                            name="password1"
                                            type={!isOpenEyeConfirm ? "password" : "text"}
                                            autoComplete="current-password"
                                            placeholder="Konfirmasi password"
                                            {...register('password1', {required : true})}
                                            className={`px-2 block w-full rounded border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 bg-white ${errors.password1 ? 'is-invalid' : ''}`}
                                        />
                                        <div className="text-red-400 text-sm">{errors.password1?.message}</div>
                                    </div>

                                    <div>
                                        <button
                                            type="submit"
                                            className="flex w-full justify-center rounded bg-red-600 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                                        >
                                            Masuk
                                        </button>
                                    </div>
                                </form>

                                <p className="mt-10 text-center text-sm text-gray-500">
                                    Sudah punya akun?{' '}
                                    <NavLink to="/login" className="font-semibold leading-6 text-red-600 hover:text-red-500">
                                        Login disini.
                                    </NavLink>
                                </p>
                                
                            </div>
                        </div>
                    </div>
                    <div className="w-full max-h-screen" style={sectionStyle}>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Register