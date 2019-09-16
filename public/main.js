const availabilityCheckbox = document.getElementById('products-availability-checkbox');
const productsTableBody = document.getElementById('products-table-body');
const tableHeader = productsTableBody.innerHTML;
let url = 'http://localhost:3000/api/products/';

availabilityCheckbox.checked = true;
fetchData(url, renderProductsTable);

availabilityCheckbox.addEventListener('click', function() {

	if (!this.checked) {
		url = 'http://localhost:3000/api/products?unavailable';
	} else {
		url = 'http://localhost:3000/api/products/';
	}

	fetchData(url, renderProductsTable);
});

async function fetchData(url, renderFn) {
	const response = await fetch(url);

	if (response.ok) {
		const products = await response.json();
		renderFn(products);
	} else {
		console.error("HTTP Error loading products: " + response.status);
	}
}

function renderProductsTable(products) {
	productsTableBody.innerHTML = tableHeader;

	products.forEach(p => {
		const tr = document.createElement('tr');
		Object.keys(p).forEach(k => {
			tr.appendChild(td(p[k]));
		})
		productsTableBody.appendChild(tr);
	});
}

function td(data) {
	const td = document.createElement('td');
	const content = document.createTextNode(data);
	td.appendChild(content);
	return td;
}
