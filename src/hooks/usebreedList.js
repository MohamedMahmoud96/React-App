
// import { useState, useEffect } from "react";

// const localCashe = [];
// const useBreed = (animal) => {


//     const [breed, setBreed] = useState([]);
//     const fetchBreed = async() => { 
//         const res = await fetch( `http://pets-v2.dev-apis.com/breeds?animal=${animal}`);
//         const data = await res.json();
//         localCashe[animal] = data.breeds;
//         setBreed(data.breeds);
//     }

//     useEffect(() => {
//         if(!animal)
//         {
//             setBreed([]);
//         }else if (localCashe[animal])
//         {
//             setBreed(localCashe[animal]);
//         }
       
//         else{
            
//             fetchBreed();
//         }

//     }, [animal])
  
//     return breed;

// }

// export default useBreed;