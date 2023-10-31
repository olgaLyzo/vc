
const key = "AIzaSyA3N1CIrjiVgYj-yYCNfuGdXAudtnFyQQQ";
const requestResult = document.querySelector(".request");
const apiURL = `https://www.googleapis.com/books/v1/volumes`;
const btnMore = document.querySelector(".more-button");

let totalClickCount = 0;
let doubleClick = 0;
const itemsCountInBag = document.querySelector(".circle");
let storageBook = [];
// Параметры для запроса списка книг
const params = new URLSearchParams();
		params.append("q",`"subject:"Architecture"`);
		params.append("key",`${key}`);
		params.append("printType",`books`);
		params.append("startIndex",`0`);
		params.append("maxResults",`6`);
		params.append("langRestrict",`en`);
// --------------Функция прокрутки изо звезного рейтинга--------------------------------------------------
function ratingSectionTopPosition(averageRating){
	const topPositionValues = [1,-10,-22,-32,-43,-54];
	return averageRating ? topPositionValues[averageRating] : topPositionValues[randomNumber(0, 5)];
}
// -------------Функция запроса------------------------------------------------

async function initRequest() {
		try{
			const response = await fetch(`${apiURL}?${params}`);
			if (!response.ok) {
				throw new Error("Network response was not OK");
			}
  	const responseJson = await response.json();
		return responseJson;
		}catch(error) {
			console.error("There has been a problem with your fetch operation:", error);
		}
	}
// -------------Функция отображения книг--------------------------------------------------------------
function getBooksHTML(booksList){
		for (let i = 0; i < booksList.items.length; i++) {
			let imageLink;
			const book = booksList.items[i];
			// Проверка доступности свойств
			if(!book.saleInfo.listPrice || book.saleInfo.listPrice.amount === undefined){
				book.saleInfo.listPrice = {};
				book.saleInfo.listPrice.amount = randomNumber(10, 50);
			}
			if(!book.saleInfo.currencyCode){
				book.saleInfo.listPrice.currencyCode = "USD";
			}
			if(!book.volumeInfo.imageLinks || !book.volumeInfo.imageLinks.smallThumbnail){
				imageLink = "https://picsum.photos/200/300";
			}else{
				imageLink = book.volumeInfo.imageLinks.smallThumbnail;
			}
			if(!book.volumeInfo.ratingsCount){
				book.volumeInfo.ratingsCount = randomNumber(0, 200);
			}	
			const topPosition = ratingSectionTopPosition(book.volumeInfo.averageRating);
			// Формирование карточки книги
			const bookCard = 
					`<div class = "books">
						<img class = "image" src=${imageLink}>
						<div class = "card">
							<span class = "author">${book.volumeInfo.authors}</span>
							<span class = "title">${book.volumeInfo.title}</span>
							<div class="rating">
								<div class="stars" style = "background-position: left 0px top ${topPosition}px"></div>
								<div class="rating-count">
									<div class="count">${book.volumeInfo.ratingsCount} reviews</div>
								</div>
							</div>
							<p class="description">${book.volumeInfo.description}</p>
							<span class = "price">${book.saleInfo.listPrice.currencyCode} ${book.saleInfo.listPrice.amount}</span>
							<button class="buy-button">BUY NOW</button>
						</div>
						
					</div>`;
			requestResult.innerHTML += bookCard;
			
					// Добавление книг в корзину по клику
			const btnBuy = document.querySelectorAll(".buy-button");
			btnBuy.forEach(element => {element.addEventListener("click", function addBookToBag(){
				if(!element.classList.contains("active-buy-button") || doubleClick == 0){
					element.classList.add("active-buy-button");
					element.innerHTML = "ALREADY ADDED";
					itemsCountInBag.innerHTML = totalClickCount += 1;
					doubleClick += 1;
					// Сохранение инфы в localStorage 
					let addedBook = `{
						image: ${imageLink}, 
						author: ${book.volumeInfo.authors}, 
						title: ${book.volumeInfo.title}, 
						rating:${book.volumeInfo.ratingsCount}, 
						description: ${book.volumeInfo.description},
						price:${book.saleInfo.listPrice.currencyCode} ${book.saleInfo.listPrice.amount} `;
					storageBook.push(addedBook);
					console.log(storageBook);
					localStorage.setItem("addedBooks",storageBook);
				}else{
					element.innerHTML = "BUY NOW";
					element.classList.remove("active-buy-button");
					itemsCountInBag.innerHTML = totalClickCount -= 1;
					}
				})
			})	
		}
		
		
		
		
	}
// -----------------Функция очистки результата-----------------------------------------------
	function clearResult(){
		requestResult.innerHTML = '';
	}
// ------------------Функция получения рандомного числа----------------------------------------------
	function randomNumber(min, max){
    const r = Math.random()*(max-min) + min
    return Math.floor(r)
	}
// -------------------Функция инициализации получения и отображения книг----------------------------------------------
async function getBooks() {
	const result = await initRequest();
	getBooksHTML(result);
	
}
// Инициализация категорий книг
function chooseBookcategory(){
	const kindBookArray = document.querySelectorAll(".scrollmenu-items a");
	kindBookArray.forEach(element => {
		element.addEventListener("click", (event) => {
			params.set("q",`"subject:${event.target.innerHTML}"`);
			clearResult();
			getBooks();
		})
	})
}
function initMore(){
	btnMore.addEventListener("click", function addMoreBooks(){
		getBooks();	
	})
}
// -------------------Функция-обертка----------------------------------------------
function mainFunction() {
	  getBooks();
		initMore();
		chooseBookcategory();	
}
document.addEventListener("DOMContentLoaded", mainFunction);