import debounce from "lodash/debounce";
import getRating from "./api/getRating";

function initializeScript() {
  console.log("STARTING");

  // const shouldInititialize = window.location.search.includes(
  //   "categoryLevel1=Vin"
  // );

  // if (!shouldInititialize) {
  //   return;
  // }

  appendRatings();

  // can't use MutationObserver unfortunately :(
  window.addEventListener("scroll", debounce(appendRatings, 1000));
}

function appendRatings() {
  const wineListItems = document.querySelectorAll('.catalog__product-style > .ui > .product-row > .sixteen > .ui')

  // wineListItems.forEach((item) => {
  //   if (!item.parentNode.style.position) {
  //     appendRating(item);
  //   }
  // });

  for(let i = 4; i < wineListItems[0].children.length; i++) {  
    appendRating(wineListItems[0].children[i]);
  }

}

async function appendRating(element) {
  console.log("appendRating");

  //element.parentElement.style.position = "relative";

  const wineName = element.querySelector("div.grocery-item-range").innerText;
  const typeName = element.querySelector("p").innerText;

  try {
    console.log(`Trouvé pour : ${wineName}`);
    const { score, numOfReviews, url } = await getRating(wineName);
    console.log(`Vivino: ${score} - ${numOfReviews} + ${url}`);
    const priceElement = document.createElement("a");
    priceElement.href = url;
    priceElement.innerText = `Vivino score: ${score} (${numOfReviews} reviews)`;
    priceElement.style.position = "absolute";
    priceElement.style.bottom = "14px";
    priceElement.style.right = "14px";

    // element.parentElement.appendChild(priceElement);
    element.children[4].children[0].children[0].appendChild(priceElement);
  } catch (e) {
    console.error(`${wineName} is not found on Vivino`);
  }
}

window.addEventListener("load", initializeScript);
