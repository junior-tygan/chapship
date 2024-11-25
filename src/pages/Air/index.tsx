import { FaTrashAlt } from "react-icons/fa";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Header from "../../components/Header";

const Air = () => {
  const [fileName, setFileName] = useState<string>("No file chosen");
  const [isFileUploaded, setIsFileUploaded] = useState<boolean>(false);
  const [countries, setCountries] = useState<string[]>([]);

  const fromRef = useRef<HTMLDivElement>(null);
  const toRef = useRef<HTMLDivElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setIsFileUploaded(true);
    }
  };

  const handleFileDelete = () => {
    setFileName("No file chosen");
    setIsFileUploaded(false);
  };


  const handleClickOutside = (event: MouseEvent) => {
    if (
      fromRef.current &&
      !fromRef.current.contains(event.target as Node) &&
      toRef.current &&
      !toRef.current.contains(event.target as Node)
    ) {
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    const fetchCountries = async () => {
        try {
          const response = await axios.get("https://restcountries.com/v3.1/all");
          const countryNames = response.data.map((country: any) => country.name.common);
          setCountries(countryNames.sort()); // Sort alphabetically for better UX
        } catch (error) {
          console.error("Error fetching countries:", error);
        }
      };
  
      fetchCountries();
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };


  }, []);

  return (
    <div className="w-full h-screen">
        
        {/* Header */}
        <Header />



        {/* Container */}
        <div className="h-[85%] w-full">
            <div className="max-w-screen-60 h-auto flex flex-col justify-center py-3 mx-auto">
                <h1 className="w-full px-14 py-4 bg-gray-200 rounded-xl text-black text-lg mt-10">
                    Air Cargo
                </h1>

                {/* Select Package */}
                <div className="w-full text-center mt-10">
                    <p className="text-lg">What are you shipping?</p>

                    <div className="w-full flex justify-between mt-5">
                    {[...Array(8)].map((_, index) => (
                        <div
                        key={index}
                        className="h-20 w-20 rounded-full p-6 bg-greensmall hover:bg-customgreen"
                        >
                            <img src={`/icon/icon${index + 1}.png`} alt={`Icon ${index + 1}`} />
                        </div>
                    ))}
                    </div>
                </div>

               {/* Describe Package */}
                <div className="flex flex-wrap w-full mt-8 items-center space-y-4">
                    <div className="w-full flex gap-2">
                    {/* Text Input */}
                    <input
                        type="text"
                        placeholder="Describe your Shipment"
                        className="border border-gray-300 text-black rounded-md p-2 w-4/5 h-14 px-8 font-light"
                    />

                    {/* Upload Button */}
                    <label className="flex items-center justify-center bg-customblue text-white rounded-md px-4 py-2 w-1/5 text-center cursor-pointer hover:bg-customgreen hover:text-black">
                        <input type="file" className="hidden" onChange={handleFileChange} />
                        Upload Image
                    </label>
                    </div>

                    {/* File Name and Delete Icon */}
                    <div className="flex items-center gap-2">
                    <p className="text-sm text-gray-500">{fileName}</p>
                    {isFileUploaded && (
                        <button
                        className="text-customblue text-xs hover:text-customgreen"
                        onClick={handleFileDelete}
                        >
                        <FaTrashAlt />
                        </button>
                    )}
                    </div>
                </div>


                {/* Information */}
                <div className="flex flex-col gap-3 mt-3">
                    <div className="flex w-full justify-between gap-3 mt-3">
                        <div className="w-full flex items-center gap-3">
                            {/* country api */}
                             <select
                                name="countries"
                                id="countries"
                                className="w-1/3 border border-gray-300 text-black rounded-md p-2 h-14 px-8 font-light"
                            >
                                <option value="">Origin country</option>
                                {countries.map((country, index) => (
                                    <option key={index} value={country}>
                                    {country}
                                    </option>
                                ))}
                                </select>
                                {/* country api */}
                                <select
                                    name="countries"
                                    id="countries"
                                    className="w-1/3 border border-gray-300 text-black rounded-md p-2 h-14 px-8 font-light"
                                >
                                <option value="">Destination Country</option>
                                {countries.map((country, index) => (
                                    <option key={index} value={country}>
                                    {country}
                                    </option>
                                ))}
                            </select>
                            <input
                                type="date"
                                className="w-1/3 border border-gray-300 text-black rounded-md p-2 h-14 px-8 font-light"
                            />
                        </div>
                    </div>
                 </div>


                 <div className="flex flex-col gap-3 mt-3">
                    <div className="flex w-full justify-between gap-3 mt-3">
                        <p className="w-1/4 p-3 bg-gray-100 flex items-center justify-center rounded-lg">Parcel info</p>
                        <div className="w-3/4 flex gap-3">
                            <input
                                type="NUmber"
                                placeholder="Weight"
                                className="w-1/4 border border-gray-300 text-black rounded-md p-2 h-14 px-8 font-light"
                            />
                            <input
                                type="number"
                                placeholder="Length"
                                className="w-1/4 border border-gray-300 text-black rounded-md p-2 h-14 px-8 font-light"
                            />
                            <input
                                type="number"
                                placeholder="Width"
                                className="w-1/4 border border-gray-300 text-black rounded-md p-2 h-14 px-8 font-light"
                            />
                            <input
                                type="number"
                                placeholder="Height"
                                className="w-1/4 border border-gray-300 text-black rounded-md p-2 h-14 px-8 font-light"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-center mt-10">
                    <button className="px-14 py-3 rounded-3xl bg-customgreen text-black font-semibold hover:bg-customblue hover:text-white">Calculate Estimate</button>
                </div>
                
            </div>
        </div>
        <div className="w-full py-8 bg-gray-100">

            <div className="max-w-screen-60 h-auto py-3 mx-auto">

                <div className="flex w-full justify-between gap-5 mt-3 items-center">

                    <p className="">Estimate</p>
                    <p className="w-1/4 text-3xl font-bold">100.00 AED</p>
                    <Link to="/Quote" className="px-20 w-2/5 py-4 rounded-3xl bg-customblue text-white text-center font-semibold hover:bg-customgreen hover:text-black">Request Quote</Link>
                    <button className="px-20 w-2/5 py-4 rounded-3xl bg-[#25D366] text-black font-semibold hover:bg-customblue hover:text-white">Whatsapp</button>

                </div>
            </div>

        </div>
    </div>
  );
};

export default Air;
