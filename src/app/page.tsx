"use client";

import Image from "next/image";
import arrowIcon from "../../public/images/icon-arrow.svg";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { getIpAddress, fetchData } from "@/lib/data";

export default function Home() {
  const Map = dynamic(() => import("@/ui/map"), {
    ssr: false,
    loading: () => <p>Loading Map...</p>,
  });

  const [ipAddress, setIpAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [timezone, setTimezone] = useState("");
  const [isp, setIsp] = useState("");
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  const fetchIpData = async () => {
    try {
      const ipData = await fetchData({ targetIpAddress: ipAddress });
      setCity(ipData.city);
      setCountry(ipData.country);
      setTimezone(ipData.timezone);
      setIsp(ipData.isp);
      setLatitude(ipData.latitude);
      setLongitude(ipData.longitude);
    } catch (error) {
      console.log("There's an error: ", error);
    }
  };

  const getInitialIp = async () => {
    const initialIp = await getIpAddress();
    setIpAddress(initialIp);
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      ipInput: { value: string };
    };
    const ipInput = target.ipInput.value;
    setIpAddress(ipInput);
  };

  useEffect(() => {
    getInitialIp();
  }, []);

  useEffect(() => {
    if (ipAddress) {
      fetchIpData();
    }
  }, [ipAddress]);

  return (
    <main className="relative flex h-screen flex-col items-center">
      <div
        id="search-container"
        className="relative z-10 min-w-full h-2/5 flex flex-col items-center justify-start p-4 md:p-10 gap-5 bg-fixed bg-contain bg-pattern-mobile md:bg-pattern-desktop"
      >
        <h1 className="font-semibold text-white text-center text-2xl">
          IP Address Tracker
        </h1>
        <form
          id="search-input"
          className="flex flex-row min-w-max"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            name="ipInput"
            id="ipInput"
            placeholder="Search for any IP address or domain"
            className="p-4 text-base md:text-lg w-full text-[#2b2b2b] rounded-l-2xl md:min-w-[35rem] focus:outline-none placeholder:text-[0.8rem] md:placeholder:text-base"
          />
          <button
            type="submit"
            className="flex items-center justify-center bg-black hover:bg-[#2b2b2b] rounded-e-2xl p-5"
          >
            <Image src={arrowIcon} alt="arrow icon" width={14} height={14} />
          </button>
        </form>
        <div className="absolute -bottom-[8.3rem] md:-bottom-[4.5rem] md:h-40 z-20 flex flex-col justify-center items-center md:flex-row md:justify-start md:items-start md:divide-x max-w-[60rem] gap-3 md:gap-0 px-12 py-4 md:px-4 md:py-8 bg-white rounded-xl drop-shadow-xl">
          <div
            id="ipAddress"
            className="flex flex-col h-full items-center justify-center md:items-start md:justify-start md:pr-8 md:gap-2 md:max-w-60"
          >
            <p className="uppercase font-semibold text-[#969696] text-xs">
              Ip Address
            </p>
            <p className="font-semibold text-[#2b2b2b] text-xl md:text-2xl">
              {ipAddress}
            </p>
          </div>
          <div
            id="location"
            className="flex flex-col h-full items-center justify-center md:items-start md:justify-start md:px-8 md:gap-2 max-w-60"
          >
            <p className="uppercase font-semibold text-[#969696] text-xs">
              Location
            </p>
            <p className="font-semibold text-[#2b2b2b] text-xl md:text-2xl">
              {country && (
                <>
                  {city}, {country}
                </>
              )}
            </p>
          </div>
          <div
            id="timezone"
            className="flex flex-col h-full items-center justify-center md:items-start md:justify-start md:px-8 md:gap-2 max-w-60"
          >
            <p className="uppercase font-semibold text-[#969696] text-xs">
              Timezone
            </p>
            <p className="font-semibold text-[#2b2b2b] text-xl md:text-2xl">
              {timezone && <>UTC {timezone}</>}
            </p>
          </div>
          <div
            id="isp"
            className="flex flex-col h-full items-center justify-center md:items-start md:justify-start md:px-8 md:gap-2 max-w-60"
          >
            <p className="uppercase font-semibold text-[#969696] text-xs">
              ISP
            </p>
            <p className="font-semibold text-[#2b2b2b] text-xl md:text-2xl">
              {isp}
            </p>
          </div>
        </div>
      </div>
      <div id="map" className="relative z-0 flex min-w-full h-full ">
        <Map latitude={latitude} longitude={longitude} />
      </div>
    </main>
  );
}
