import type { NextPage } from "next";
import Link from "next/link";
import React, { useState } from "react";

import {
  InstantSearch,
  SearchBox,
  InfiniteHits,
  Highlight,
  RefinementList,
  ClearRefinements,
  Configure,
} from "react-instantsearch-hooks-web";
import { searchClient } from "../utils/meili";
import type { Hit } from "../utils/meili";
import { Badge } from "../components/Badge";

const Home: NextPage = () => {
  const [touched, setTouched] = useState("");
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
            onChangeCapture={setTouched}
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
            <InfiniteHits hitComponent={Hit} />
          </div>
        )}
      </InstantSearch>
    </div>
  );
};

const Hit = ({ hit }: { hit: Hit }) => {
  const newHit = {
    objectID: hit.id,
    ...hit,
  };
  return (
    <div
      key={newHit.id}
      onClick={() => console.log(newHit)}
      className="relative flex space-x-3 rounded-lg border border-gray-800 shadow shadow-cyan-500/20 bg-[#1a1c1c] px-6 py-5 focus-within:ring-2 focus-within:ring-accent focus-within:ring-offset-2 hover:border-gray-600 h-full grow"
    >
      <div className="min-w-0 flex-1">
        <Link href={newHit.id} className="focus:outline-none">
          <span className="absolute inset-0" aria-hidden="true" />
          <p className="text-sm font-medium text-gray-50">
            <Highlight attribute="game" hit={newHit} />
          </p>
          <p className="truncate text-sm text-gray-500">
            <Highlight attribute="console" hit={newHit} />
          </p>
          <Badge game={newHit} />
        </Link>
      </div>
    </div>
  );
};
export default Home;
