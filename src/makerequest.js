import axios from 'axios';
import createGallery from './templates/image-card.hbs';
export class GetDataFromPixabay {

    constructor(query, pageNumber, btn, galleryEl) {
        this.url = "https://pixabay.com/api/";        
        this.config = new URLSearchParams({
            key: "31399452-9d47890bb90445954f5179866",
            image_type: "photo",
            orientation: "horizontal",
            safesearch: true,
            q: query,
            per_page: 4,
            
        });  
        this.page = pageNumber;
        this.moreBtn = btn; 
        this.gallery = galleryEl;
    }
    createGalleryPage() {
        console.log(this.page);
        console.log(this.config);
        const pageTempl = `page=${this.page}`;
        return getPhotos(`${this.url}?${pageTempl}&${this.config}`)
        .then(responce => {
                const resultArray = responce.data.hits;
                if (!resultArray.length) {
                    Notiflix.Notify.failure
                    ("Sorry, there are no images matching your search query. Please try again.");
                    this.moreBtn['hidden'] = true;
                    return;        
                }    
                this.moreBtn['hidden'] = false;     
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