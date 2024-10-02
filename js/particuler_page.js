// URL에서 productId를 가져옴

const urlParams = new URLSearchParams(window.location.search);
const productId = parseInt(urlParams.get(`id`), 10);

// 상품 상세 정보 렌더링

function renderProductDetail(product) {
  const productDetail = document.getElementById("product-detail");
  productDetail.innerHTML = `<div class="p-d-left"><img src="../img/${product.image}" alt="${product.name}"></div>
  </div>
  <div class="p-d-right">
  <h2>${product.name}</h2>
  <span>${product.description}</span>
  <p>가격 : ${product.price}</p>
    <div class="quantity-container">
    <button id="decrease">-</button>
    <input type="text" id="quantity" value="1" readonly>
    <button id="increase">+</button>
  </div>

  <div class="total-price">
    총 금액: <span id="total">${product.price}</span>
  </div>
  <button onclick="addToCart(${product.id})">장바구니</button>
  </div>`;
}

// 페이지 로드 시 상품 이미지, 정보 렌더링

window.onload = () => {
  const product = products.find((p) => p.id === productId);
  if (product) {
    // renderProductImg(product);
    renderProductDetail(product);
  } else {
    document.getElementById("product-detail").innerHTML =
      "이미지를 찾을 수 없습니다.";
  }
};

// 장바구니 담기
function addToCart() {
  // 로컬스토리지에서 기존 장바구니 데이터를 가져옴
  let shoppingList = localStorage.getItem("shoppingList");

  // shoppingList가 null인 경우 빈 배열로 초기화
  shoppingList = shoppingList ? JSON.parse(shoppingList) : [];
  let id = urlParams.get("id");
  let productCount = document.querySelector("#quantity").value;
  shoppingList.push([id, productCount]); // 새로운 상품 ID 추가
  console.log(shoppingList);
  localStorage.setItem("shoppingList", JSON.stringify(shoppingList)); // 다시 로컬스토리지에 저장
}
