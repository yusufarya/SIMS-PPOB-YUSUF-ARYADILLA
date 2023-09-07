import { useState } from "react"
import DataRedux from "../utils/data"
import { AiOutlineCreditCard } from "react-icons/ai"
import AuthService from "../services/authService";
import { getToken } from "../authorization/getToken";
import Swal from "sweetalert2";
import { NumericFormat } from 'react-number-format';

const Topup = () => {
    
    DataRedux()

    const [nominal, setNominal] = useState(0)

    function handleInput(e) {
        setNominal(e.target.value) 
    }
    
    function clickNominal (nilai) {
        setNominal(nilai) 
    }

    const userToken = getToken()
    const handleTopUp = async () => {
        const nilai = nominal.toLocaleString('en-US');
        if(isNaN(nominal)) {
            var nominalFix = parseFloat(nominal.replaceAll(",", ""))
        } else {
            var nominalFix = nominal
        }
        
        const result = await AuthService.topup(userToken, nominalFix)
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
                title: 'Proses Gagal',
                text: 'Nominal hanya boleh angka dan tidak boleh lebih kecil dari 0',
            })
        }
    }

    return (
        <>
            <div className="flex h-auto bg-transparent justify-center">
                <div className="w-full lg:w-10/12 md:w-10/12 sm:w-10/12 mt-24 ">
                    <h2 className="text-md font-sans">Silahkan Masukan</h2>
                    <h2 className="text-2xl font-sans font-bold">Nominal Topup</h2>
                </div>
            </div>
            <div className="flex h-auto bg-transparent justify-center">
                <div className="grid grid-cols-10 gap-3 w-full lg:w-10/12 md:w-10/12 sm:w-10/12 mt-8">
                    <div className="col-span-7">
                        <AiOutlineCreditCard className="icon_input"/>
                        <NumericFormat
                        allowLeadingZeros thousandSeparator=","
                            value={nominal}
                            onChange={(e) => handleInput(e)}
                            id="password"
                            name="password"
                            type="text"
                            autoComplete="current-password"
                            placeholder="masukkan password anda"
                            required
                            className="px-2 block w-full rounded border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 bg-white"
                        />
                    </div>
                    <button className="col-span-1 border-2 border-gray-300 rounded h-9 mt-1.5 text-center pt-1"
                    onClick={() => clickNominal(10000)}>Rp. 10.000</button>
                    <button className="col-span-1 border-2 border-gray-300 rounded h-9 mt-1.5 text-center pt-1"
                    onClick={() => clickNominal(20000)}>Rp. 20.000</button>
                    <button className="col-span-1 border-2 border-gray-300 rounded h-9 mt-1.5 text-center pt-1"
                    onClick={() => clickNominal(50000)}>Rp. 50.000</button>
                    <div className="col-span-7">
                        <button
                            onClick={() => handleTopUp()}
                            disabled={nominal != 0 ? '' : 'disabled'}
                            className={`px-2 w-full rounded text-white sm:text-sm sm:leading-6 h-9 mt-1.5 ${nominal != 0 ? 'bg-red-500' : 'bg-red-300'}`}
                        > Top Up
                        </button>
                    </div>
                    <button className="col-span-1 border-2 border-gray-300 rounded h-9 mt-1.5 text-center pt-1"
                    onClick={() => clickNominal(100000)}>Rp. 100.000</button>
                    <button className="col-span-1 border-2 border-gray-300 rounded h-9 mt-1.5 text-center pt-1"
                    onClick={() => clickNominal(250000)}>Rp. 250.000</button>
                    <button className="col-span-1 border-2 border-gray-300 rounded h-9 mt-1.5 text-center pt-1"
                    onClick={() => clickNominal(500000)}>Rp. 500.000</button>
                </div>
            </div>

        </>
    )
}

export default Topup   
