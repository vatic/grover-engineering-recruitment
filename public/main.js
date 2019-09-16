(function({ filter, baseUrl, checkboxId, selectId, tableBodyId }) {

	const availabilityCheckbox = document.getElementById(checkboxId);
	const storeSelect = document.getElementById(selectId);
	const productsTableBody = document.getElementById(tableBodyId);
	const tableHeader = productsTableBody.innerHTML;

	fetchData(baseUrl, renderProductsTable);

	availabilityCheckbox.addEventListener('click', function() {
		changeFilter({ availability: this.checked })
	});

	storeSelect.addEventListener('change', function() {
		changeFilter({ store: this.value });
	});

	function changeFilter({ availability, store }) {

		if (typeof availability === 'boolean') {
			filter = Object.assign({}, filter, { availability });
		}
		if (store) {
			filter = Object.assign({}, filter, { store });
		}

		fetchData(buildUrl(filter), renderProductsTable);

	}

	function buildUrl({ availability, store }) {
		return `${baseUrl}?store=${filter.store}${filter.availability ? '':'&&unavailable'}`;
	}

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

}(
	{
		filter: { availability: true, store: 'grover-de' },
		baseUrl: 'http://localhost:3000/api/products',
		checkboxId: 'products-availability-checkbox',
		selectId: 'products-store-select',
		tableBodyId: 'products-table-body'
	}
));

