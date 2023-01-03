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
import { SearchIcon } from "../components/SearchIcon";
import { searchClient } from "../utils/meili";

const refinementClasses = {
  root: "form-control",
  checkbox: "checkbox rounded",
  label: "label gap-2 cursor-pointer justify-start",
  labelText: "label-text",
  count: "hidden",
};

const Home: NextPage = () => {
  const [touched, setTouched] = useState(false);

  return (
    <div className="ais-InstantSearch">
      <InstantSearch indexName="cheats" searchClient={searchClient}>
        <div className="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg focus-within:shadow-accent/50 bg-white overflow-hidden">
          <div className="grid place-items-center h-full w-12 text-gray-300">
            <SearchIcon />
          </div>

          <SearchBox
            placeholder="Search for your favorite game"
            onChangeCapture={() => setTouched(true)}
            classNames={{
              input: "peer",
            }}
          />
        </div>

        {touched && (
          <div className="flex gap-6 mt-8">
            <div className="min-w-[300px] hidden sm:block">
              <Configure hitsPerPage={40} />
              <ClearRefinements
                classNames={{
                  button: "btn",
                }}
              />
              <h2 className="text-xl my-2 block">Console</h2>
              <RefinementList
                classNames={refinementClasses}
                attribute="console"
                limit={50}
              />
              <h2 className="text-xl my-2 block">Cheat System</h2>
              <RefinementList
                classNames={refinementClasses}
                attribute="system"
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
