
import { Link } from "react-router-dom";
import Header from "../components/Header";
const Home = () => {
  return (
    <div className="w-full h-screen bg-gray-200">

        {/* Header */}
        <Header />




        {/* Container */}
        <div className="h-[85%] w-full relative">
            <div 
                className="w-full h-full absolute z-40 flex flex-col justify-center items-center gap-12"
                style={{ backgroundColor: 'rgba(17, 17, 17, 0.8)' }} 
            >
                <h1 className="text-white text-4xl font-black">RIGHT SHIPPING DECISIONS</h1>
                <p className="text-white text-xl text-center font-light">Join thousands of businesses making the right shipping decisions <br /> with our all-in-one intelligent freight platform</p>
                <div className="h-auto flex justify-between gap-10">
                    <Link to='/Door' className="px-14 py-2 rounded-3xl bg-customblue text-white font-semibold hover:bg-customgreen hover:text-black">Door to Door</Link>
                    <Link to ='/Air' className="px-14 py-2 rounded-3xl bg-customblue text-white font-semibold hover:bg-customgreen hover:text-black">Air Cargo</Link>
                    <Link to='/Sea' className="px-14 py-2 rounded-3xl bg-customblue text-white font-semibold hover:bg-customgreen hover:text-black">Sea Cargo</Link>
                </div>
            </div>
            <img src="./banner.png" className="h-full w-full object-cover" alt="" />
        </div>

    </div>
  );
};

export default Home;
