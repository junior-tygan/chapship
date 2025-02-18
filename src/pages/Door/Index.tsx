import { FaTrashAlt } from "react-icons/fa";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import { API_DOMAIN } from "../../utils/env";
import { toast } from "react-toastify";

type DoorToDoorRequest = {
  destination: string;
  weight: number;
};

const Door = () => {
  const [fileName, setFileName] = useState<string>("No file chosen");
  const [isFileUploaded, setIsFileUploaded] = useState<boolean>(false);
  const fromRef = useRef<HTMLDivElement>(null);
  const toRef = useRef<HTMLDivElement>(null);

  const [fromLocation, setFromLocation] = useState<string>(
    "United Arab Emirates"
  );
  const [destinationCountry, setDestinationCountry] = useState<string>("");
  const [countries, setCountries] = useState<string[]>([]);
  const [estimate, setEstimate] = useState<string>("0");
  const [weight, setWeight] = useState<number>(1);

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

  const getEstimate = async () => {
    const request: DoorToDoorRequest = {
      destination: destinationCountry,
      weight,
    };
    const response = await axios.get(`${API_DOMAIN}/api/door-to-door`, {
      params: request,
    });
    if (response.data.status == "success") {
      setEstimate(response.data.data.estimate);
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    const fetchCountries = async () => {
      try {
        const response = await axios.get(`${API_DOMAIN}/api/countries`);
        const countryNames = response.data.data;
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    getEstimate();
  };

  return (
    <form onSubmit={handleSubmit} className="w-full h-screen">
      {/* Header */}
      <Header />

      {/* Container */}
      <div className="h-[85%] w-full">
        <div className="max-w-screen-60 h-auto py-3 mx-auto">
          <h1 className="w-full px-14 py-4 bg-gray-200 rounded-xl text-black text-lg mt-10">
            Door to Door
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
                  <img
                    src={`/icon/icon${index + 1}.png`}
                    alt={`Icon ${index + 1}`}
                  />
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
                <input
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                />
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
              <p className="w-1/4 p-3 bg-gray-100 flex items-center justify-center rounded-lg">
                Locations
              </p>
              <div className="w-3/4 flex items-center gap-3">
                <div ref={fromRef} className="relative w-1/2">
                  <input
                    type="text"
                    value={fromLocation}
                    disabled={true}
                    onChange={(e) => {
                      setFromLocation(e.target.value);
                    }}
                    placeholder="From"
                    className="w-full border border-gray-300 text-black rounded-md p-2 h-14 px-8 font-light"
                  />
                </div>
                <div ref={toRef} className="relative w-1/2">
                  <select
                    name="countries"
                    id="countries"
                    required
                    value={destinationCountry}
                    onChange={(e) => setDestinationCountry(e.target.value)}
                    className="w-fit border border-gray-300 text-black rounded-md p-2 h-14 px-8 font-light"
                  >
                    <option value="">Destination Country</option>
                    {countries.map((country, index) => (
                      <option key={index} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                </div>
                <input
                  type="date"
                  className="w-1/4 border border-gray-300 text-black rounded-md p-2 h-14 px-8 font-light"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 mt-3">
            <div className="flex w-full justify-between gap-3 mt-3">
              <p className="w-1/4 p-3 bg-gray-100 flex items-center justify-center rounded-lg">
                Parcel info
              </p>
              <div className="w-3/4 flex gap-3">
                <input
                  type="number"
                  placeholder="Weight"
                  onChange={(e) => setWeight(Number(e.target.value))}
                  className="w-1/4 border border-gray-300 text-black rounded-md p-2 h-14 px-8 font-light"
                />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center mt-10">
            <button className="px-14 py-3 rounded-3xl bg-customgreen text-black font-semibold hover:bg-customblue hover:text-white">
              Calculate Estimate
            </button>
          </div>
        </div>
      </div>

      {/* Estimate */}
      <div className="w-full py-8 bg-gray-100">
        <div className="max-w-screen-60 h-auto py-3 mx-auto">
          <div className="flex w-full justify-between gap-5 mt-3 items-center">
            <p className="">Estimate</p>
            <p className="w-1/4 text-3xl font-bold">{estimate}</p>
            <Link
              to="/Quote"
              className="px-20 w-2/5 py-4 rounded-3xl bg-customblue text-white text-center font-semibold hover:bg-customgreen hover:text-black"
            >
              Request Quote
            </Link>
            <button className="px-20 w-2/5 py-4 rounded-3xl bg-[#25D366] text-black font-semibold hover:bg-customblue hover:text-white">
              Whatsapp
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Door;
