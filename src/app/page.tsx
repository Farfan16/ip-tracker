"use client";

import Image from "next/image";
import arrowIcon from "../../public/images/icon-arrow.svg";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

export default function Home() {
  const Map = dynamic(() => import("@/ui/map"), { ssr: false });

  const [mounted, setMounted] = useState(false);

  const getIpAddress = async () => {
    const res = await fetch(`https://api.ipify.org?format=json`);
    const ipData = await res.json();
    return ipData.ip;
  };

  const [ipAddress, setIpAddress] = useState(getIpAddress);
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [timezone, setTimezone] = useState("");
  const [isp, setIsp] = useState("");
  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);

  const inputHandler = (event: string) => {
    setIpAddress(event.target.value);
  };

  const fetchData = async () => {
    const ipAddress = await getIpAddress();
    const response = await fetch(
      `https://geo.ipify.org/api/v2/country,city?apiKey=at_xYqpMZD1roLNOGOlBMiMQN6kMJmow&ipAddress=${ipAddress}`
    );
    const data = await response.json();
    console.log(ipAddress);
    setCity(data.location.city);
    setCountry(data.location.country);
    setTimezone(data.location.timezone);
    setIsp(data.isp);
    setLatitude(data.location.lat);
    setLongitude(data.location.lng);
  };

  useEffect(() => {
    // fetchData();
    setMounted(true);
  }, []);

  if (!mounted) {
    return <></>;
  }
  return (
    <main className="flex h-screen flex-col items-center">
      <div
        id="search-container"
        className="relative z-10 min-w-full h-2/5 flex flex-col items-center justify-start p-10 gap-5 bg-fixed bg-pattern-desktop"
      >
        <h1 className="font-semibold text-white text-center text-2xl">
          IP Address Tracker
        </h1>
        <form id="search-input" className="flex flex-row min-w-max">
          <input
            type="text"
            name="ipInput"
            id="ipInput"
            placeholder="Search for any IP address or domain"
            className="p-4 text-lg w-full text-[#2b2b2b] rounded-l-2xl min-w-[35rem] focus:outline-none"
            value={ipAddress}
            onChange={inputHandler}
          />
          <button
            onClick={fetchData}
            className="flex items-center justify-center bg-black hover:bg-[#2b2b2b] rounded-e-2xl p-5"
          >
            <Image src={arrowIcon} alt="arrow icon" width={14} height={14} />
          </button>
        </form>
        <div className="absolute -bottom-[4.5rem] z-20 flex flex-row justify-start items-start divide-x max-w-[50rem] px-4 py-8 bg-white rounded-xl drop-shadow-xl">
          <div
            id="ipAddress"
            className="flex flex-col justify-start pr-8 gap-2 max-w-60"
          >
            <p className="uppercase font-semibold text-[#969696] text-xs">
              Ip Address
            </p>
            <p className="font-semibold text-[#2b2b2b] text-2xl">{ipAddress}</p>
          </div>
          <div
            id="location"
            className="flex flex-col justify-start  px-8 gap-2 max-w-60"
          >
            <p className="uppercase font-semibold text-[#969696] text-xs">
              Location
            </p>
            <p className="font-semibold text-[#2b2b2b] text-2xl">
              {city}, {country}
            </p>
          </div>
          <div
            id="timezone"
            className="flex flex-col justify-start  px-8 gap-2 max-w-60"
          >
            <p className="uppercase font-semibold text-[#969696] text-xs">
              Timezone
            </p>
            <p className="font-semibold text-[#2b2b2b] text-2xl">
              UTC {timezone}
            </p>
          </div>
          <div
            id="isp"
            className="flex flex-col justify-start px-8 gap-2 max-w-60"
          >
            <p className="uppercase font-semibold text-[#969696] text-xs">
              ISP
            </p>
            <p className="font-semibold text-[#2b2b2b] text-2xl">{isp}</p>
          </div>
        </div>
      </div>
      <div id="map" className="relative z-0 flex min-w-full h-full ">
        <Map latitude={latitude} longitude={longitude} />
      </div>
    </main>
  );
}
