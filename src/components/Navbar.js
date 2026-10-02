"use client";
import React from 'react';

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-12 py-4 bg-transparent text-black absolute top-0 w-full z-40  text-white ">
      <div className="flex flex-col">
        <span className="text-xs text-orange-500 font-medium">studio</span>
        <h1 className="text-4xl font-normal leading-none tracking-tighter">ia.d</h1>
        <span className="text-xs text-gray-400 uppercase tracking-widest mt-1">ishan ahluwalia design</span>
      </div>
      <ul className="flex gap-12 text-xs tracking-widest font-medium">
        <li><a href="#home" className="hover:opacity-70 transition-opacity">HOME</a></li>
        <li><a href="#projects" className="hover:opacity-70 transition-opacity">PROJECTS</a></li>
        <li><a href="#awards" className="hover:opacity-70 transition-opacity">AWARDS & PRESS</a></li>
        <li><a href="#contact" className="hover:opacity-70 transition-opacity">CONTACT</a></li>
      </ul>
    </nav>
  );
}
