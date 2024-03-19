import Link from "next/link";
import './home.css'

export default function Home() {
  return (
    <main>
      <div className="bg-teal-300 h-8 pl-16 text-black text-[13px] text-xl overflow-hidden">
        <div className="scrolling-text text-sm justify-center items-center">Today's best offer - Discount up to 50% off on selected items! Hurry up! Today's best offer - Discount up to 50% off on selected items! Hurry up!</div>
      </div>
      <div className="bg-fuchsia-950 w- full h-16 justify-center flex space-x-60 items-center pl-16 text-white text-xl">
        <input type="text" placeholder="Search for Medicines, Products, Brands and More" className="text-sm mx-[-90px] py-2 pl-4 text-neutral-950 block w-[700px] outline-none" />
        <Link className="pl-[650px]" href="/login">Login</Link>
      </div>
      <div className="w-full min-h-screen bg-cyan-950"></div>
    </main>
  );
}
