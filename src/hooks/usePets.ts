import { QueryFunction, useQuery } from "@tanstack/react-query";
import {SearchParams as paramsType, SearchPetsAPIResponse} from "../types/common";


const fetchPet: QueryFunction<SearchPetsAPIResponse, ['pet', string |  number]> = async ({ queryKey }) => {
  
  const [, params] = queryKey;

  const res = await fetch(`http://pets-v2.dev-apis.com/pets${params}`);
  return res.json();
};

const usePet = (params : object | null ) => {
  if (params) {

    params.searchParams ? (params = params.searchParams) : "";
    const length = Object.keys(params).length;
    const key = Object.keys(params);
    const value = Object.values(params);
    let query = "?";
    for (let index = 0; index < length; index++) {
      query += key[index] + "=" + value[index] + "&&";
    }
    query = query.slice(0, -2);

    return useQuery(["pet", query], fetchPet);
  }

  return useQuery(["pet", ""], fetchPet);
};

export default usePet;
