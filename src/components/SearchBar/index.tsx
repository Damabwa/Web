import icn_search from "../../assets/svgs/icn_search.svg";

export default function SearchBar() {
  return (
    <div className="flex w-full px-3 py-2 bg-gray rounded-3xl">
      <img alt="검색" src={icn_search} />
      <input className="flex-1 mx-1 bg-transparent border-none outline-none bg-gray" />
    </div>
  );
}
