/* eslint-disable react/prop-types */
import { useState } from "react";

const Search = ({ setSearch }) => {
  const [inputValue, setInputValue] = useState("");
  return (
    <form className="min-w-[400px] bg-white">
      <label
        htmlFor="default-search"
        className="mb-2 text-sm font-medium text-gray-900 sr-only "
      >
        Search
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500 "
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);

            if (!e.target.value) setSearch("");
          }}
          type="search"
          id="default-search"
          className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
          placeholder="Search Courses"
          required=""
        />
        <button
          onClick={(e) => {
            e.preventDefault();

            setSearch(inputValue);
          }}
          type="submit"
          className="text-black absolute end-2.5 bottom-[5px] border-2 hover:bg-slate-200 bg-white focus:outline-none  font-medium rounded-lg text-sm px-2 py-[2px] "
        >
          Search
        </button>
      </div>
    </form>
  );
};
export default Search;
