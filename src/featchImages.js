import axios from "axios";
const baseUrl = 'https://pixabay.com/api'
const yourApiKey ='31238546-2d57ca86913699ca663b56d8b'; 
const image_type = 'photo';
const orientation = 'horizontal';
const safesearch = 'true';


    export const getImage = async (searchQuery, page, per_page) => {                                   
          const {data} = await axios.get(`${baseUrl}/?page=${page}&per_page=${per_page}&key=${yourApiKey}&q=${searchQuery}&image_type=${image_type}&orientation=${orientation}&safesearch=${safesearch}`);
          return data;         
      };