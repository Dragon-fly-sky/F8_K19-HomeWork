import {renderTable, renderModal, headers} from './utils';

// Work with API
const apiUrl = 'http://localhost:3000/customers'
const getCustomerList = async () => {
    try {
        const response = await fetch(apiUrl);
        return await response.json();
    } catch (e) {
        console.log("Failed to get customers data");
        return [];
    }
}

const createCustomer = async (data) => {
    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        });
        return await response.json();
    } catch (e) {
        console.log('Failed to create', e);
    }
}

const updateCustomer = async (id, data) => {
    try {
        const response = await fetch(`${apiUrl}/${id}`, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        })
        return await response.json();
    } catch (e) {
        console.log('Failed to update', e)
    }
}

const deleteCustomerData = async (id) => {
    try {
        const response = await fetch(`${apiUrl}/${id}`, {
            method: 'DELETE'
        })
        return response.ok;
    } catch (e) {
        console.log("Failed to delete customer data", e);
        return false;
    }
}

const addDataBtn = document.querySelector('.btn-add-new')
if (addDataBtn) {
    addDataBtn.addEventListener('click', () => {
        renderModal('addModal', 'Add new', headers)
        const addDataModal = document.querySelector('#addModal')
        addDataModal.classList.add('open')
    })
}

const onEditClick = (customers) => {
    const editDataBtns = document.querySelectorAll('.edit-btn')
    editDataBtns.forEach(editBtn => {
        editBtn.addEventListener('click', () => {
            const id = editBtn.dataset.id
            const customerData = customers.find(item => item.id == id)
            if (customerData) {
                renderModal('editModal', 'Update Customer', headers, customerData)
                const editDataModal = document.querySelector('#editModal')
                editDataModal.classList.add('open')
            }
        })
    })
}

const onDeleteClick = () => {
    const deleteBtns = document.querySelectorAll('.delete-btn')
    deleteBtns.forEach(deleteBtn => {
        deleteBtn.addEventListener('click', async () => {
            const id = deleteBtn.dataset.id
            const confirmDialog = confirm('Do you really want to delete?')
            if (confirmDialog) {
                const isSuccess = await deleteCustomerData(id)
                if (isSuccess) {
                    init();
                }
            }
        })
    })
}

const initCloseModalHandler = () => {
    document.addEventListener('click', (e) => {
        if (e.target.closest('.modal-close-btn') || e.target.closest('.cancel-btn')) {
            const modalOverlay = e.target.closest('.modal-overlay');
            if (modalOverlay) {
                modalOverlay.classList.remove('open');
                setTimeout(() => modalOverlay.remove(), 200);
            }
        }
    })
}

const init = async () => {
    const customers = await getCustomerList();
    const customerTableClass = document.querySelector('.customer-table')

    renderTable(headers, customers, customerTableClass);
    onEditClick(customers);
    onDeleteClick();
}

initCloseModalHandler();
init();