import React from 'react'
import { Link, useNavigate } from "react-router-dom";

const Section_a = () => {
    const navigate = useNavigate()
    return (
        <section className='flex flex-col items-center justify-center'>
            <h className='mt-10'>Home Page</h>
         <div className='flex flex-col gap-6 mt-9 '>

               <button
                onClick={() => navigate('/Register')}
                type="submit"
                className="w-40 mt-50 ml-10 bg-[#0C1125] text-white py-2 rounded-md hover:bg-[#1a1f3b] transition"
            >
                Register
            </button>

            <button
                onClick={() => navigate('/TeamMember')}
                type="submit"
                className="w-40 mt-50 ml-10 bg-[#0C1125] text-white py-2 rounded-md hover:bg-[#1a1f3b] transition"
            >
                Team Member
            </button>
               <button
                onClick={() => navigate('/TeamMember')}
                type="submit"
                className="w-40 mt-50 ml-10 bg-[#0C1125] text-white py-2 rounded-md hover:bg-[#1a1f3b] transition"
            >
                All Project
            </button>
         </div>
        </section>
    )
}

export default Section_a