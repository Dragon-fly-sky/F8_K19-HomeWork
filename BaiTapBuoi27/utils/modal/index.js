const renderModal = (modalId, title, fields, data = null) => {
    const existingModal = document.getElementById(modalId);
    if (existingModal) existingModal.remove();

    const htmlBody = document.querySelector('body')
    const modalOverlay = document.createElement('div')
    modalOverlay.classList.add('modal-overlay')
    modalOverlay.id = modalId

    const modalContainer = document.createElement('div')
    modalContainer.classList.add('modal-container')

    const modalHeader = document.createElement('div')
    const modalTitle = document.createElement('h3')
    modalTitle.textContent = title

    const closeButton = document.createElement('button')
    closeButton.classList.add('modal-close-btn')
    closeButton.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>`

    modalHeader.appendChild(modalTitle)
    modalHeader.appendChild(closeButton)
    modalContainer.appendChild(modalHeader)

    const form = document.createElement('form')
    for (const field of fields) {
        const label = document.createElement('label')
        label.setAttribute('for', field.key)
        label.textContent = field.text

        let inputField;

        if (field.key === 'status') {
            inputField = document.createElement('select');

            const statusOptions = ['Active', 'Inactive', 'Pending'];
            statusOptions.forEach(statusText => {
                const option = document.createElement('option');
                option.value = statusText;
                option.textContent = statusText;
                inputField.appendChild(option);
            });
        } else {
            inputField = document.createElement('input');
        }

        inputField.setAttribute('id', field.key)

        if (data && data[field.key] !== undefined) {
            inputField.value = data[field.key];
        }

        if (field.key === 'id' && data) {
            inputField.disabled = true;
        }

        form.appendChild(label)
        form.appendChild(inputField)
    }
    modalContainer.appendChild(form)

    const modalFooter = document.createElement('div')
    const actionButton = document.createElement('button')
    actionButton.textContent = data ? 'Save' : 'Add'
    actionButton.classList.add('add-btn')

    actionButton.addEventListener('click', async (e) => {
        e.preventDefault();

        const formData = {};
        fields.forEach(field => {
            const input = document.getElementById(field.key);
            formData[field.key] = input.value;
        });

        if (data && data.id) {
            await updateCustomer(data.id, formData);
        } else {
            await createCustomer(formData);
        }

        modalOverlay.classList.remove('open');
        setTimeout(() => modalOverlay.remove(), 200);
        init();
    });

    const cancelButton = document.createElement('button')
    cancelButton.textContent = 'Cancel'
    cancelButton.classList.add('cancel-btn')

    modalFooter.appendChild(cancelButton)
    modalFooter.appendChild(actionButton)
    modalContainer.appendChild(modalFooter)

    modalOverlay.appendChild(modalContainer)
    htmlBody.appendChild(modalOverlay)
}

export {
    renderModal
}