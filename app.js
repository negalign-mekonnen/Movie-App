const APIURL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=c8c1492684925c00d15af26721f6790d&page=1'
const image_path = "https://image.tmdb.org/t/p/w1280"
const searchapi = 'https://api.themoviedb.org/3/search/movie?&api_key=c8c1492684925c00d15af26721f6790d&query='
const container = document.getElementById("movie-section")
const form = document.getElementById("form")
const search = document.getElementById("query")

getMovies(APIURL)
async function getMovies(url) {
    const res = await fetch(url)
    const datas = await res.json() 
    console.log(datas)
    const notNull = datas.results.filter((data)=>{
        return data.poster_path != null
    })
    notNull.forEach(data => {
        const div = document.createElement("div")
        div.setAttribute("class", "movies")
        const movie_image = document.createElement("div")
        movie_image.setAttribute("class", "movie-image")
        div.appendChild(movie_image)
        const img = document.createElement("img")
        img.setAttribute("class", "img")
        img.src = image_path + data.poster_path
        movie_image.appendChild(img)
        const movie_info = document.createElement("div")
        div.appendChild(movie_info)
        movie_info.setAttribute("class", "movie-info")
        const title = document.createElement("h3")
        title.innerText = data.title
        movie_info.appendChild(title)
        const rate = document.createElement("span")
        rate.innerText = data.vote_average
        movie_info.appendChild(rate)
        const id = document.createElement("span")
        id.setAttribute("class", "id")
        id.innerText = data.id
        movie_info.appendChild(id)
        container.appendChild(div)
    });
    
    return datas
}
form.addEventListener("submit", (e) => {
    console.log("searched")
    e.preventDefault()
    container.innerHTML = ""

    const searchitem = search.value

    if(searchitem){
        getMovies(searchapi + searchitem)
    }
})

window.addEventListener("click",(e)=>{
    const searchapi = 'https://api.themoviedb.org/3/search/movie?&api_key=c8c1492684925c00d15af26721f6790d&query='
    const image_path = "https://image.tmdb.org/t/p/w1280"
    const header = document.getElementById("header")
    const main = document.getElementById("main")
    const cont = document.getElementById("movies")
    const selectedElem = e.target;
    const selectedImageClassName = e.target.className
    const selectedImageParent = e.target.parentElement.parentElement
    const selectedParentSibling = selectedImageParent.lastElementChild
    const title = selectedParentSibling.firstElementChild
    const titleText = title.innerText
    const id = selectedParentSibling.lastElementChild
    const idText = id.innerText
    if (selectedImageClassName == "img"){
        console.log(titleText)
        console.log(idText)
    
        
        console.log("boom")

        
        getMoviesReview(searchapi + titleText)
        async function getMoviesReview(url){
            const res = await fetch(url)
            const resData = await res.json()
            
            const selectedMovie = resData.results.filter(data => {
                return data.id == idText
            });
            console.log(selectedMovie)
            const cardArray = selectedMovie[0]
            const cards = document.createElement("div")
            const card = document.createElement("div")
            cards.setAttribute("class", "cards")
            card.setAttribute("class", "card")
            const cardImage = document.createElement("div")
            cardImage.setAttribute("class", "card-image")
            const img = document.createElement("img")
            img.src = image_path + cardArray.poster_path
            cardImage.appendChild(img)
            const cardInfo = document.createElement("div")
            cardInfo.setAttribute("class", "card-info")
            const title = document.createElement("h3")
            title.innerText = cardArray.title
            cardInfo.appendChild(title)
            const rate = document.createElement("span")
            rate.innerText = cardArray.vote_average
            cardInfo.appendChild(rate)
            const id = document.createElement("span")
            id.setAttribute("class", "id")
            id.innerText = cardArray.id
            cardInfo.appendChild(id)
            const btnCont = document.createElement("div")
            btnCont.setAttribute("class", "btn-cont")
            const backBtn = document.createElement("a")
            const btn = document.createElement("button");
            backBtn.href = "index.html"
            btn.innerText = "Back"
            backBtn.appendChild(btn)
            backBtn.setAttribute("class", "btn-link")
            btn.setAttribute("class", "btn")
            btnCont.appendChild(backBtn)
            const movieOverview = document.createElement("div")
            const overview = document.createElement("p")
            const originalTitle = document.createElement("h1")
            originalTitle.innerText = cardArray.original_title
            movieOverview.appendChild(originalTitle)
            overview.innerText = cardArray.overview
            movieOverview.appendChild(overview)
            movieOverview.setAttribute("class", "overview")

            header.innerHTML = ""
            main.innerHTML = ""
            card.appendChild(cardImage)
            card.appendChild(cardInfo)
            cards.appendChild(card)
            main.append(cards)
            card.appendChild(btnCont)
            card.appendChild(movieOverview)
            
            
        }   
          
    }else{
        console.log("click the image")
    }
    
    
})
