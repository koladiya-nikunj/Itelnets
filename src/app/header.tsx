import Link from "next/link";
import './home.css'
import { Button } from "antd";

export default function Header() {
  return (
    <main>
      <div className="sm:h-[40px] h-8 text-[13px] md:text-sm flex overflow-hidden justify-center items-center bg-[#e2de90] text-black">
        <div className="scrolling-text text-[11px] sm:text-sm">
          Today's best offer - Discount up to 50% off on selected items! Hurry up! Today's best offer - Discount up to 50% off on selected items! Hurry up!
        </div>
      </div>
      <div className="md:h-16 h-[56px] md:text-xl pl-8 w-full justify-center flex items-center bg-[#35bcbc] text-white">
        <img className="md:w-36 w-20 md:h-28 h-16 mx-4 mt-1" src="itelnets.png" alt="" />
        <input type="text" placeholder="Search for Medicines, Products, Brands and More" 
        className="md:text-sm sm:text-[12px] text-[10px] md:py-3 py-[9px] sm:pl-4 pl-2 block md:w-[600px] sm:w-[400px] w-[300px] outline-none text-neutral-950" />
        <Button
      href='/login'
            type='primary'
            htmlType='submit'
            className='bg-blue-700 hover:bg-blue-600 text-white leading-0 sm:text-[15px] text-[12px] sm:px-3 px-2 sm:py-[3px] py-[5px] rounded focus:outline-none focus:shadow-outline lg:ml-[20rem] sm:ml-16 ml-8 mx-4'
          >
            Login
          </Button>
      </div>
     
    </main>
  );
}