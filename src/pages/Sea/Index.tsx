import { FaTrashAlt } from "react-icons/fa";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Header from "../../components/Header";

const Sea = () => {
  const [fileName, setFileName] = useState<string>("No file chosen");
  const [isFileUploaded, setIsFileUploaded] = useState<boolean>(false);
  const [fromLocation, setFromLocation] = useState<string>("");
  const [toLocation, setToLocation] = useState<string>("");
  const [fromSuggestions, setFromSuggestions] = useState<any[]>([]);
  const [toSuggestions, setToSuggestions] = useState<any[]>([]);
  const [countries, setCountries] = useState<string[]>([]);
  const [selectedContainer, setSelectedContainer] = useState<string>("");

  const fromRef = useRef<HTMLDivElement>(null);
  const toRef = useRef<HTMLDivElement>(null);

  const handleContainerSelect = (containerType: string) => {
    setSelectedContainer(containerType);
  };

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

  const fetchLocationSuggestions = async (query: string, setSuggestions: any) => {
    if (query.trim() === "") {
      setSuggestions([]);
      return;
    }

    try {
      const response = await axios.get("https://nominatim.openstreetmap.org/search", {
        params: {
          q: query,
          format: "json",
          addressdetails: 1,
        },
      });
      setSuggestions(response.data);
    } catch (error) {
      console.error("Error fetching location suggestions:", error);
    }
  };


  
  const handleClickOutside = (event: MouseEvent) => {
    if (
      fromRef.current &&
      !fromRef.current.contains(event.target as Node) &&
      toRef.current &&
      !toRef.current.contains(event.target as Node)
    ) {
      setFromSuggestions([]);
      setToSuggestions([]);
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
                    Sea Cargo
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
                            <div ref={fromRef} className="relative w-1/2">
                                <input
                                    type="text"
                                    value={fromLocation}
                                    onChange={(e) => {
                                    setFromLocation(e.target.value);
                                    fetchLocationSuggestions(e.target.value, setFromSuggestions);
                                    }}
                                    placeholder="Port/From"
                                    className="w-full border border-gray-300 text-black rounded-md p-2 h-14 px-8 font-light"
                                />
                                {fromSuggestions.length > 0 && (
                                    <ul className="absolute bg-white border w-full rounded-md z-10">
                                    {fromSuggestions.map((suggestion, index) => (
                                        <li
                                        key={index}
                                        className="p-2 cursor-pointer hover:bg-gray-100"
                                        onClick={() => {
                                            setFromLocation(suggestion.display_name);
                                            setFromSuggestions([]);
                                        }}
                                        >
                                        {suggestion.display_name}
                                        </li>
                                    ))}
                                    </ul>
                                )}
                            </div>
                            <div ref={toRef} className="relative w-1/2">
                                <input
                                    type="text"
                                    value={toLocation}
                                    onChange={(e) => {
                                    setToLocation(e.target.value);
                                    fetchLocationSuggestions(e.target.value, setToSuggestions);
                                    }}
                                    placeholder="Port/To"
                                    className="w-full border border-gray-300 text-black rounded-md p-2 h-14 px-8 font-light"
                                />
                                {toSuggestions.length > 0 && (
                                    <ul className="absolute bg-white border w-full rounded-md z-10">
                                    {toSuggestions.map((suggestion, index) => (
                                        <li
                                        key={index}
                                        className="p-2 cursor-pointer hover:bg-gray-100"
                                        onClick={() => {
                                            setToLocation(suggestion.display_name);
                                            setToSuggestions([]);
                                        }}
                                        >
                                        {suggestion.display_name}
                                        </li>
                                    ))}
                                    </ul>
                                )}
                            </div>

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
                        </div>
                    </div>
                 </div>


                <div className="flex gap-10 mt-6 items-center">
                    <div className="w-3/5 h-full flex items-center justify-between">
                        <p className="text-lg font-semibold">Container Type</p>
                        <div className="flex gap-4 w-3/4 justify-between">
                            {/* 20 ft Container */}
                            <div
                                onClick={() => handleContainerSelect("20 ft Container")}
                                className={`w-2/4 h-12 flex items-center justify-center border-2 rounded-full cursor-pointer ${
                                    selectedContainer === "20 ft Container" ? "border-customgreen bg-customgreen" : "border-gray-300"
                                }`}
                            >
                                20 ft Container
                            </div>

                            {/* 40 ft Container */}
                            <div
                                onClick={() => handleContainerSelect("40 ft Container")}
                                className={`w-2/4 h-12 flex items-center justify-center border-2 rounded-full cursor-pointer ${
                                    selectedContainer === "40 ft Container" ? "border-customgreen bg-customgreen" : "border-gray-300"
                                }`}
                            >
                                40 ft Container
                            </div>
                        </div>
                    </div>
                    <div className="w-2/5 h-full flex gap-4">

                        <input
                            type="number"
                            placeholder="Qty"
                            className="border border-gray-300 text-black rounded-md p-2 w-2/5 h-14 px-8 font-light"
                        />
                        <button className="py-3 rounded-full bg-customblue text-white w-3/5 font-semibold hover:bg-customgreen hover:text-black">Calculate Estimate</button>
                    
                    </div>
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

export default Sea;
