import SearchIcon from "../icons/SearchIcon";

export default function Search() {
  return (
    <button type="button" className="cursor-pointer group">
      <SearchIcon className="text-white xl:group-hover:text-main group-focus-visible:text-main group-active:text-main transition duration-300 ease-in-out" />
    </button>
  );
}
