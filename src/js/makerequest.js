import axios from 'axios';
import createGallery from '../templates/image-card.hbs';
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

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

    async createGalleryPage() { 
        try {
            const responce = await getPhotos(`${this.url}?page=${this.page}&${this.config}`);                   
            const resultArray = responce.data.hits;                
            if (!resultArray.length) {
                this.moreBtn['hidden'] = true;                
                throw new Error("Sorry, there are no images matching your search query. Please try again.");                    
            }    
            this.moreBtn['hidden'] = false;  
            this.totalHits = responce.data.totalHits;
            this.totalPages = Math.ceil(this.totalHits / perPage);                       
            this.gallery.insertAdjacentHTML("beforeend", createGallery(resultArray));
            const lightbox = new SimpleLightbox('.gallery a', {
                captions: true, captionsData: 'alt', captionDelay: 250
            });
            return true;
        } catch(err) {            
            Notiflix.Notify.failure(`${err.message}`);  
            return false;          
        };
    }
}

async function getPhotos(request) {
    try {
        const responce = await axios.get(request);
        return responce;       
    } catch (err) { 
        throw new Error(err);      
    };
}