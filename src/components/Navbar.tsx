import Link from "next/link";
import React from "react";

function Navbar() {
  return (
    <nav className="flex justify-between py-4 flex-col">
      
      <ul className="flex gap-4 justify-center">
        <li>
          <Link href="/" className="text-slate-600 hover:text-slate-400 text-xl">
          <h3 className="text-2xl">Next CRUD - Welcome to the homepage!</h3>
          </Link>
        </li>
        <li>
          <Link href="/new" className="text-slate-600 hover:text-slate-400 text-xl">
          <h3 className="text-2xl"> Nueva Tarea</h3>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
