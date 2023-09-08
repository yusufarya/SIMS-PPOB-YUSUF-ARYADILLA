import { AiOutlineCreditCard } from "react-icons/ai"
import AuthService from "../services/authService";
import { getToken } from "../authorization/getToken";
import Swal from "sweetalert2";
import { NumericFormat } from 'react-number-format';
import { useLocation } from "react-router-dom";
import logo from "../assets/img/Logo.png"

const Payment = () => {
    
    const location = useLocation();
    const { state } = location;

    const userToken = getToken()
    const handleBayar = async () => {
        const nilai = state.service.service_tariff.toLocaleString('en-US');
        Swal.fire({
            imageUrl: logo,
            imageWidth: 80,
            imageHeight: 80,
            imageAlt: 'Logo',
            html:
            'Bayar '+state.service.service_name+' senilai ? '+ '<br/>'+
            `<b style="font-size: 34px;">${nilai}</b> <br/>`,
            showConfirmButton: false,
            showCancelButton: true,
            showDenyButton: true,
            denyButtonText: 'Ya, Lanjutkan bayar',
        }).then((result) => {
            if (result.isDenied) {
                nextBayar()
            }
        })
    }

    const nextBayar = async () => {
        const nilai = state.service.service_tariff.toLocaleString('en-US');
        const result = await AuthService.payment(userToken, state.service.service_code)
        if(result.status == 'success') {
            Swal.fire({
                icon: 'success',
                title: 'Berhasil',
                html:
                `<b style="font-size: 34px;">${nilai}</b> <br/>` +
                result.response.message+ '<br/><br/>'+
                '<a href="/home" style="color: #b8022f; margin : 5px 0;">Kembali Ke Beranda</a> <br/>',
                showConfirmButton: false,
            })
        } else {
            Swal.fire({
                icon: 'error',
                html:
                'Proses Pembayaran Gagal'+ '<br/>'+
                `Hubungi Administrator<br/> <br/>` +
                '<a href="/home" style="color: #b8022f; margin : 5px 0;">Kembali Ke Beranda</a> <br/>',
                showConfirmButton: false,
            })
        }
    }

    return (
        <>
            <div className="flex h-auto bg-transparent justify-center">
                <div className="w-full lg:w-10/12 md:w-10/12 sm:w-10/12 mt-24 ">
                    <h2 className="text-md font-sans">Pembayaran</h2>
                    <h2 className="text-xl font-sans font-bold">
                        <img src={state.service.service_icon} className="inline h-9 pb-1 me-2" />
                        {state.service.service_name}
                    </h2>
                </div>
            </div>
            <div className="flex h-auto bg-transparent justify-center">
                <div className="grid grid-cols-10 gap-3 w-full lg:w-10/12 md:w-10/12 sm:w-10/12 mt-8">
                    <div className="col-span-12">
                        <AiOutlineCreditCard className="icon_input"/>
                        <NumericFormat
                        allowLeadingZeros thousandSeparator=","
                            value={state.service.service_tariff}
                            id="password"
                            name="password"
                            type="text"
                            autoComplete="current-password"
                            placeholder="masukkan password anda"
                            required
                            className="px-2 block w-full rounded border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 bg-white"
                        />
                    </div>
                    <div className="col-span-12">
                        <button
                            onClick={() => handleBayar()}
                            className="px-2 w-full rounded bg-red-500 text-white sm:text-sm sm:leading-6 h-9 mt-1.5"
                        > Bayar
                        </button>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Payment   
