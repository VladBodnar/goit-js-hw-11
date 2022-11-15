import axios from "axios";
import {getImage } from "./featchImages";
import {createMarkur } from "./createMarkup";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const searchFormRef = document.querySelector('.search-form');
const submitBtnRef = searchFormRef.querySelector('button');
const inputRef = searchFormRef.querySelector('input');
const galleryBox =  document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
    
      const handelSubmit = event => {
        event.preventDefault();
        galleryBox.innerHTML = "";
        const searchQuery = inputRef.value.trim().toLowerCase();
                 
         const creatter = async () => {
          try {
            const  data  = await getImage(searchQuery);
             console.log(data);
             const markup = await createMarkur(data);                 
                        
                      await galleryBox.insertAdjacentHTML('beforeend', markup);                 
                      if(total > page * per_page) {
                        console.log(total - (page * per_page));
                      }
                       page += 1 ;               
              
          } catch (error) {
            
          }
         }
  
        creatter ();
   };   
    
   const loadMoreImg = event => {
    event.preventDefault();
    const searchQuery = inputRef.value.trim().toLowerCase();
    getImage(searchQuery)
   }
 
    submitBtnRef.addEventListener('click', handelSubmit);
    loadMoreBtn.addEventListener('click', loadMoreImg);


    galleryBox.addEventListener("click", (etven) => {
      etven.preventDefault();
      
      new SimpleLightbox(".gallery a ", {
        captions: true,
        captionsData: "alt",
        captionDelay: 250,
        captionSelector: "img",
        captionType: "attr",
        captionPosition: "bottom",
        captionClass: "",
      });
    });

    // `<li class="img__item";>      
    // <img src=${previewURL} alt = ${tags}>           
    // `

    // imgGalery.classList.add(".list__item");
//  imgGalery.style.display = "flex";
//  imgGalery.style.flexWrap = "wrap";

// await console.log(imgGalery);             
                // await bodyRef.append(imgGalery);