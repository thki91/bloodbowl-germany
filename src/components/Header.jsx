import { useState } from "react"
import { useInterval } from "../hooks/useInterval"

const headerImg1 = '/public/header.JPG'
const headerImg2 = '/public/header2.JPG'

const Header = () => {
    const [headerImg, setHeaderImg] = useState(headerImg1)

    useInterval(
        () => {
        if (headerImg === headerImg1) setHeaderImg(headerImg2)
        if (headerImg === headerImg2) setHeaderImg(headerImg1)
        },
        10000
      )

    return <header style={{backgroundImage: `url("${headerImg}")`}} className="p-10 sm:min-h-[450px] bg-center bg-cover bg-no-repeat relative flex items-center transition-[background-image] duration-200 ease-in-out">
        <div className="absolute bg-slate-800 bg-opacity-50 w-full h-full top-0 left-0" />
        <div className="absolute bg-gradient-to-r from-slate-500 from-10% via-1% to-transparent w-1/2 h-full top-0 left-0" />
        <div className="hover:transform hover:scale-105 transition">
        <h1 className="text-white text-l relative uppercase font-semibold mb-4 tracking-widest">Bloodbowl 🇩🇪</h1>
        <h1 className="text-white text-6xl relative max-w-[200px]">Team Germany</h1>
        </div>
    </header>
}

export default Header