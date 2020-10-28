// @ts-ignore No typescript support.
import { HowLongToBeatService, HowLongToBeatEntry } from "howlongtobeat";

export const getHltbData = async (name: string) => {
  let hltbService = new HowLongToBeatService();

  try {
    const data = await hltbService.search(name);

    if (!data) {
      return;
    }
    return data[0];
  } catch (err) {
    console.log(err);
    return;
  }
};
