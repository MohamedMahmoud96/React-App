
import { useQuery } from "@tanstack/react-query";

const dataFetch = async ({queryKey}) => {
    const [, url] = queryKey; 
    if (!url) return [];
    const res = await fetch(url);
    return res.json();
}

const useFetch  = (key: string , url : string) => {
 return useQuery([key, url], dataFetch)
}

export default useFetch;












// if null => all url 
// params 
// const url = 'api';
// let params = "";
// if(arr != null){

//     url += '?';
//     arr.array.forEach(([element,index]) => {
//         params += index=element
//         params += "&&";
//     });
//     params.trimEnd();
// }