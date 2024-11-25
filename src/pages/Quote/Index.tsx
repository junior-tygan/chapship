import Header from "../../components/Header";

const Door = () => {

  return (
    <div className="w-full h-screen">
        {/* Header */}
        <Header />

        <div className="w-2/4 h-[85%] mx-auto flex flex-col items-start justify-center">
            <p className="w-full p-5 px-10 bg-gray-100 flex items-left justify-left rounded-lg mb-10">Shipper Details</p>
            <div className="flex w-full justify-between gap-6 mt-2">
                <input
                    type="text"
                    placeholder="Name"
                    className="w-2/4 border border-gray-300 text-black rounded-md p-2 h-14 px-8 font-light"
                />
                <input
                    type="email"
                    placeholder="Email"
                    className="w-2/4 border border-gray-300 text-black rounded-md p-2 h-14 px-8 font-light"
                />
            </div>
            <div className="flex w-full justify-between gap-6 mt-6">
                <input
                    type="text"
                    placeholder="Address"
                    className="w-2/4 border border-gray-300 text-black rounded-md p-2 h-14 px-8 font-light"
                />
                <input
                    type="email"
                    placeholder="Phone"
                    className="w-2/4 border border-gray-300 text-black rounded-md p-2 h-14 px-8 font-light"
                />
            </div>
            <div className="flex w-full justify-between gap-6 my-6">
                <input
                    type="text"
                    placeholder="Street"
                    className="w-2/4 border border-gray-300 text-black rounded-md p-2 h-14 px-8 font-light"
                />
                <input
                    type="email"
                    placeholder="Nearest landmark"
                    className="w-2/4 border border-gray-300 text-black rounded-md p-2 h-14 px-8 font-light"
                />
            </div>
            <button className="w-full px-14 py-3 rounded-3xl bg-customgreen text-black font-semibold hover:bg-customblue hover:text-white mt-10">Calculate Estimate</button>
            <button className="w-full px-14 py-3 rounded-3xl bg-[#25D366] text-white font-semibold hover:bg-customgreen hover:text-black mt-6">Whatsapp</button>
        </div>
    </div>
  );
};

export default Door;
