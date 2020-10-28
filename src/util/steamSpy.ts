const fetch = require("node-fetch");

export const getSteamSpy = async (steamAppid: number | string) => {
  const data = await fetch(
    `https://steamspy.com/api.php?request=appdetails&appid=${steamAppid}`
  );

  if (!data) {
    return;
  }
  const dataJson = await data.json();

  if (!dataJson.name) {
    return;
  }

  return dataJson;
};
