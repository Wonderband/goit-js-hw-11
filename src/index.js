// import Notiflix from 'notiflix';
// import axios from 'axios';
// import createGallery from './templates/image-card.hbs';
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
    // const dataObj = new GetDataFromPixabay(searchQuery, page)
    // console.log(dataObj);
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
    console.log(getdata.config);    
    getdata.createGalleryPage();
}

// function getImages(e) {
//     e.preventDefault();
    // galleryEl.innerHTML = '';
    // if (e.target.name === moreBtn)/
    // const searchQuery = e.currentTarget.elements.searchQuery.value.trim();
    // const config = new URLSearchParams({
    //     key: "31399452-9d47890bb90445954f5179866",
    //     image_type: "photo",
    //     orientation: "horizontal",
    //     safesearch: true,
    //     q: searchQuery,
    //     per_page: 40,
    //     page: page,
    // });    
    // const url = `https://pixabay.com/api/?${config}`;    
    // getPhotos(url).then(responce => {
    //     const resultArray = responce.data.hits;
    //     if (!resultArray.length) {
    //         Notiflix.Notify.failure
    //         ("Sorry, there are no images matching your search query. Please try again.");
    //         return;        
    //     }  

    //     return resultArray;        
    // })
    // .then(data => {
    //     if (page === 1) galleryEl.innerHTML = '';
    //     galleryEl.insertAdjacentHTML("beforeend", createGallery(data));
    //     moreBtn['hidden'] = false;
    //     page+=1;
    // })
    // .catch(err => console.log(err));    
// }

// async function getPhotos(request) {
//     try {
//         const responce = await axios.get(request);
//         return responce;       
//     } catch (err) { 
//         console.log(err)
//     };
// }

// function createGallery(dataArray) {

// }

// function addNextImages() {
//     page += 1;
// }

