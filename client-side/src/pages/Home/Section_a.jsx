import React from 'react'
import { Link } from "react-router-dom";

const Section_a = () => {
    return (
        <section>
            <h>Home Page</h>
            <button
                type="submit"
                className="w-40 mt-50 ml-10 bg-[#0C1125] text-white py-2 rounded-md hover:bg-[#1a1f3b] transition"
            >
                Register
            </button>
        </section>
    )
}

export default Section_a