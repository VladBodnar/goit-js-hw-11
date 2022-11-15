import axios from "axios";

const yourApiKey ='31238546-2d57ca86913699ca663b56d8b'; 
const image_type = 'photo';
const orientation = 'horizontal';
const safesearch = 'true';
let page = 1 ;
let per_page = 10;
    export const getImage = async (searchQuery) => {                           
          const {data} = await axios.get(`https://pixabay.com/api/?page=${page}&per_page=${per_page}&key=${yourApiKey}&q=${searchQuery}&image_type=${image_type}&orientation=${orientation}&safesearch=${safesearch}`);
          console.log(data);
          return data;         
      };