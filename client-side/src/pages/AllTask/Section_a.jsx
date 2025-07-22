import React from 'react';
import { CalendarDays } from 'lucide-react';
const projects = [
  { title: 'sdfg', description: 'adfg' },
  { title: 'Graph_test', description: 'asdf' },
];
const Section_a=()=>{
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">All Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl ">
        {projects.map((project, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md p-6 flex flex-col gap-2"
          >
            <h3 className="font-semibold text-gray-800">{project.title}</h3>
            <p className="text-gray-600">{project.description}</p>
            <div className="flex items-center text-gray-500 text-sm mt-auto">
              <CalendarDays className="w-4 h-4 mr-1.5" />
              No dates set
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Section_a;