import { useEffect, useState } from "react";
import { getPromotionList } from "../../api/promotion";
import { getPhotographerList } from "../../api/photographer";
import SearchBar from "./SearchBar";
import Overview from "./Overview";
import Promotions from "./Promotions";
import Photographers from "./Photographers";

export default function SearchPage() {
  const [promotionList, setPromotionList] = useState<any[]>([]);
  const [photographerList, setPhotographerList] = useState<any[]>([]);
  const [state, setState] = useState("OVERVIEW");
  const [searchKeyword, setSearchKeyword] = useState("");

  useEffect(() => {
    if (!searchKeyword) return;
    getListFunc(searchKeyword);
  }, [state]);

  const onSubmit = (input: string) => {
    if (!input) return;
    else if (state === "OVERVIEW") getListFunc(input);
    setSearchKeyword(input);
  };

  const getListFunc = async (input: string) => {
    try {
      const res1 = await getPromotionList(`searchKeyword=${input}`);
      const res2 = await getPhotographerList(`searchKeyword=${input}`);
      setPromotionList(res1.items);
      setPhotographerList(res2.items);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="flex flex-col w-full min-h-screen">
      <SearchBar onSubmit={onSubmit} state={state} setState={setState} />
      {state === "OVERVIEW" && searchKeyword && (
        <Overview
          promotionList={promotionList}
          photographerList={photographerList}
          setState={setState}
        />
      )}
      {state === "PROMOTION" && (
        <Promotions data={promotionList} searchKeyword={searchKeyword} />
      )}
      {state === "PHOTOGRAPHER" && (
        <Photographers data={photographerList} searchKeyword={searchKeyword} />
      )}
    </div>
  );
}
