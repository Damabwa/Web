import { useState } from "react";
import { usePromotionList } from "../../hooks/usePromotionList";
import { usePhotographerList } from "../../hooks/usePhotographerList";
import SearchBar from "./SearchBar";
import Overview from "./Overview";
import Promotions from "./Promotions";
import Photographers from "./Photographers";

export default function SearchPage() {
  const [state, setState] = useState("OVERVIEW");
  const [searchKeyword, setSearchKeyword] = useState("");

  const isOverview = state === "OVERVIEW" && !!searchKeyword;
  const { promotions: promotionList } = usePromotionList(
    new URLSearchParams({ searchKeyword }).toString(),
    isOverview
  );
  const { photographers: photographerList } = usePhotographerList(
    new URLSearchParams({ searchKeyword }).toString(),
    isOverview
  );

  const onSubmit = (input: string) => {
    if (!input) return;
    setSearchKeyword(input);
  };

  return (
    <div className="flex flex-col w-full min-h-dvh-safe">
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
