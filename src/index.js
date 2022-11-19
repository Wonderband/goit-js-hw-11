import Notiflix from 'notiflix';
import { GetDataFromPixabay } from './makerequest';

const searchForm = document.querySelector('#search-form');
const galleryEl = document.querySelector('.gallery');
const moreBtn = document.querySelector('.load-more');

searchForm.addEventListener('submit', getNewImages);
moreBtn.addEventListener('click', getNextImages);

let page = 1;
let getdata;

function getNewImages(e) {
    e.preventDefault();   
    const searchQuery = e.currentTarget.elements.searchQuery.value.trim();
    page = 1;    
    galleryEl.innerHTML = '';  
    moreBtn['hidden'] = true;
    getdata = new GetDataFromPixabay(searchQuery, page, moreBtn, galleryEl);
    getdata.createGalleryPage();
}

function getNextImages(e) {
    page += 1;
    if (page > getdata.totalPages) {
        Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
        moreBtn['hidden'] = true;
        return;
    }
    getdata.page = page;     
    getdata.createGalleryPage();
}