
export const getIpAddress = async () => {
  const res = await fetch(`https://api.ipify.org?format=json`);
  if (res.status != 200) {
    console.log("Error fetch ip address ipify", Error);
  }
  const ipData = await res.json();
  return ipData.ip;
};

export const fetchData = async ({
  targetIpAddress,
}: {
  targetIpAddress: string;
}) => {
  const response = await fetch(
    `https://geo.ipify.org/api/v2/country,city?apiKey=at_ufPPzSinZRCppqbnRQr9GTqFkhAKh&ipAddress=${targetIpAddress}`
  );
  if (response.status != 200) {
    console.log("Error fetch ipify IP Data", Error);
  }
  const data = await response.json();
  const city = data.location.city;
  const country = data.location.country;
  const timezone = data.location.timezone;
  const isp = data.isp;
  const latitude = data.location.lat;
  const longitude = data.location.lng;
  return { city, country, timezone, isp, latitude, longitude };
};
