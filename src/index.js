import axios from 'axios';
import { getImage } from './featchImages';
import { createMarkur } from './createMarkup';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const searchFormRef = document.querySelector('.search-form');
const submitBtnRef = searchFormRef.querySelector('button');
const inputRef = searchFormRef.querySelector('input');
const galleryBox = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

loadMoreBtn.hidden = true;

let searchQuery = '';
let page = 1;
let per_page = 10;
let total;

const auditTotal = async totalImg => {
  if ((Number(totalImg) - galleryBox.children.length > 0) & (totalImg > 0)) {
    loadMoreBtn.hidden = false;
  } else {
    loadMoreBtn.hidden = true;
  }
};

const pageHeart = async searchQuery => {
  try {
    const data = await getImage(searchQuery, page, per_page);
    total = data.total;
    const markup = await createMarkur(data);
    await galleryBox.insertAdjacentHTML('beforeend', markup);
    await lightbox.refresh();
    await auditTotal(total);
    const { height: cardHeight } =
      await galleryBox.firstElementChild.getBoundingClientRect();
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
    Notify.success('The results of your search query');
  } catch (error) {
    Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
};

const handelSubmit = async event => {
  event.preventDefault();
  galleryBox.innerHTML = '';
  page = 1;
  searchQuery = inputRef.value.trim().toLowerCase();
  await pageHeart(searchQuery);
};

const loadMoreImg = async event => {
  event.preventDefault();
  page += 1;
  await pageHeart(searchQuery);
};

var lightbox = new SimpleLightbox('.gallery__item a ', {
  captions: true,
  captionsData: 'alt',
  captionDelay: 250,
  captionSelector: 'img',
  captionType: 'attr',
  captionPosition: 'bottom',
  captionClass: '',
});

submitBtnRef.addEventListener('click', handelSubmit);
loadMoreBtn.addEventListener('click', loadMoreImg);
galleryBox.addEventListener('click', etven => {
  etven.preventDefault();
  lightbox.open(event.target);
});
