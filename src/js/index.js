import Notiflix from 'notiflix';
import { GetDataFromPixabay } from './makerequest';

const searchForm = document.querySelector('#search-form');
const galleryEl = document.querySelector('.gallery');
const moreBtn = document.querySelector('.load-more');

searchForm.addEventListener('submit', getNewImages);
moreBtn.addEventListener('click', getNextImages);

let page = 1;
let getdata;

const params = {
    root: null,
    rootMargin: "50px",
    threshold: 1.0,
}
const io = new IntersectionObserver(scrollPage, params);

function getNewImages(e) {
    e.preventDefault();   
    const searchQuery = e.currentTarget.elements.searchQuery.value.trim();
    page = 1;    
    galleryEl.innerHTML = '';  
    moreBtn['hidden'] = true;
    getdata = new GetDataFromPixabay(searchQuery, page, moreBtn, galleryEl);
    getdata.createGalleryPage().then(res => {             
        if (res) Notiflix.Notify.success(`Hooray! We found ${getdata.totalHits} images.`);
        io.observe(moreBtn);
    });       
}

function getNextImages(e) {
    page += 1;
    if (page > getdata.totalPages) {
        Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
        moreBtn['hidden'] = true;
        io.unobserve(moreBtn);  
        return;
    }    
    getdata.page = page;     
    getdata.createGalleryPage()
    .then(scrollDown);    
}

function scrollDown() {    
    window.scrollBy({
        top: 715,
        behavior: "smooth",
      });
}

function scrollPage(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // uncomment next line to enable autoload new page when scrolling
            //getNextImages();            
        }
    })    
}

