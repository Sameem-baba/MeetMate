import Image from 'next/image'
import React from 'react'


interface HomeCardProps {
    className: string;
    img: string;
    title: string;
    description: string;
    handleClick: () => void;
}

const HomeCard = ({ img, title, description, handleClick, className }: HomeCardProps) => {
    return (
        <div
            className={`${className} px-4 py-6 flex flex-col justify-between w-full xl:max-w-[270px] cursor-pointer min-h-[260px] rounded-[14px]`}
            onClick={() => handleClick()}
        >
            <div className="flex-center glassmorphism size-12 rounded-[10px]">
                <Image src={img} alt="" width={27} height={27} />
            </div>

            <div className=" flex flex-col gap-2">
                <h1 className="text-2xl font-bold">{title}</h1>
                <p className="font-normal text-lg">{description}</p>
            </div>
        </div>
    )
}

export default HomeCard