import React from 'react'
import { Link, useNavigate } from "react-router-dom";

const Section_a = () => {
  const navigate = useNavigate()
    return (
        <section>
            <h>Home Page</h>
            <button
            onClick={() => navigate('/Register')}
                type="submit"
                className="w-40 mt-50 ml-10 bg-[#0C1125] text-white py-2 rounded-md hover:bg-[#1a1f3b] transition"
            >
                Register
            </button>
        </section>
    )
}

export default Section_a