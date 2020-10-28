const rp = require("request-promise");
const $ = require("cheerio");

export const getSteamChartsData = async (steamAppid: number | string) => {
  try {
    const responseHTML = await rp(`https://steamcharts.com/app/${steamAppid}`);

    const responseLength: number = $("div.app-stat > span", responseHTML)
      .length;

    // For some reason responseLength is treated as Boolean. Fix this later
    // @ts-ignore
    if (!responseLength == 3) {
      return;
    }
    const currentlyPlaying = $("div.app-stat > span", responseHTML)[0]
      .children[0].data;
    const peak24hour = $("div.app-stat > span", responseHTML)[1].children[0]
      .data;
    const peakAlltime = $("div.app-stat > span", responseHTML)[2].children[0]
      .data;

    return {
      curPlayers: currentlyPlaying,
      todayPeak: peak24hour,
      allPeak: peakAlltime,
    };
  } catch (err) {
    return;
  }
};
