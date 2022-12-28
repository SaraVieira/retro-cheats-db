import type { NextPage } from "next";
import React, { useState } from "react";

import {
  InstantSearch,
  SearchBox,
  InfiniteHits,
  RefinementList,
  ClearRefinements,
  Configure,
} from "react-instantsearch-hooks-web";
import { Game } from "../components/Game";
import { searchClient } from "../utils/meili";

const Home: NextPage = () => {
  const [touched, setTouched] = useState(false);
  return (
    <div className="ais-InstantSearch">
      <InstantSearch indexName="cheats" searchClient={searchClient}>
        <div className="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg focus-within:shadow-accent/50 bg-white overflow-hidden">
          <div className="grid place-items-center h-full w-12 text-gray-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <SearchBox
            placeholder="Search for your favorite game"
            onChangeCapture={() => setTouched(true)}
            classNames={{
              submitIcon: "hidden",
              loadingIcon: "hidden",
              resetIcon: "hidden",
              input:
                "peer h-full w-full outline-none text-sm text-gray-700 !p-0 !pr-2 !border-none !rounded-none bg-transparent",
            }}
          />
        </div>

        {touched && (
          <div className="flex gap-6 mt-8">
            <div className="min-w-[300px]">
              <Configure hitsPerPage={40} />
              <ClearRefinements
                classNames={{
                  button: "btn",
                }}
              />
              <h2 className="text-xl my-2 block">Console</h2>
              <RefinementList
                classNames={{
                  root: "form-control",
                  checkbox: "checkbox rounded",
                  label: "label gap-2 cursor-pointer justify-start",
                  labelText: "label-text",
                  count: "hidden",
                }}
                attribute="console"
                limit={50}
              />
            </div>
            <InfiniteHits hitComponent={Game} />
          </div>
        )}
      </InstantSearch>
    </div>
  );
};

export default Home;
