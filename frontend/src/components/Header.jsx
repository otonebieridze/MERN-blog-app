import { Link } from "react-router-dom";

function Header() {
  return (
    <ul className="w-full h-20 bg-white border flex justify-center items-center">
      <Link to="/"><li className=" text-xl uppercase cursor-pointer">Home</li></Link>
      <Link to="/about"><li className=" ml-11 text-xl uppercase cursor-pointer">About</li></Link>
    </ul>
  )
}

export default Header;