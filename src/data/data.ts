export const getIpAddress = async () => {
  const res = await fetch(`https://api.ipify.org?format=json`);
  const ipData = await res.json();
  return ipData.ip;
};

export const fetchData = async ({ targetIpAddress }: { targetIpAddress: string }) => {
  const response = await fetch(
    `https://geo.ipify.org/api/v2/country,city?apiKey=at_xYqpMZD1roLNOGOlBMiMQN6kMJmow&ipAddress=${targetIpAddress}`
  );
  const data = await response.json();
  const city = data.location.city;
  const country = data.location.country;
  const timezone = data.location.timezone;
  const isp = data.isp;
  const latitude = data.location.lat;
  const longitude = data.location.lng;
  return { city, country, timezone, isp, latitude, longitude };
};
