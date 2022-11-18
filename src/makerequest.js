import axios from 'axios';
import createGallery from './templates/image-card.hbs';
import Notiflix from 'notiflix';

const perPage = 40;
export class GetDataFromPixabay {
    constructor(query, pageNumber, btn, galleryEl) {
        this.url = "https://pixabay.com/api/";        
        this.config = new URLSearchParams({
            key: "31399452-9d47890bb90445954f5179866",
            image_type: "photo",
            orientation: "horizontal",
            safesearch: true,
            q: query,
            per_page: perPage,            
        });  
        this.page = pageNumber;
        this.moreBtn = btn; 
        this.gallery = galleryEl;
    }
    createGalleryPage() {        
        const pageTempl = `page=${this.page}`;
        return getPhotos(`${this.url}?${pageTempl}&${this.config}`)
        .then(responce => {
            console.log(responce);
                const resultArray = responce.data.hits;                
                if (!resultArray.length) {
                    Notiflix.Notify.failure
                    ("Sorry, there are no images matching your search query. Please try again.");
                    this.moreBtn['hidden'] = true;
                    return;        
                }    
                this.moreBtn['hidden'] = false;  
                this.totalPages = Math.ceil(responce.data.totalHits / perPage);                 
                return resultArray;        
            })
            .then(data => {                    
                    this.gallery.insertAdjacentHTML("beforeend", createGallery(data));                    
                })
            .catch(err => console.log(err));
    }    
}

async function getPhotos(request) {
    try {
        const responce = await axios.get(request);
        return responce;       
    } catch (err) { 
        console.log(err)
    };
}