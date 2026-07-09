const renderTable = async (cols, rows, containerClass) => {
    if (!containerClass) return;
    containerClass.innerHTML = '';

    const table = document.createElement('table');
    const thead = document.createElement('thead')
    const tbody = document.createElement('tbody')

    containerClass.appendChild(table);
    table.appendChild(thead);
    table.appendChild(tbody);

    const headerRow = document.createElement('tr')
    thead.appendChild(headerRow)
    for (const col of cols) {
        const th = document.createElement('th')
        th.innerText = col.text
        headerRow.appendChild(th)
    }
    const actionRow = document.createElement('th')
    actionRow.textContent = "Action";
    headerRow.appendChild(actionRow)

    for (const row of rows) {
        const tr = document.createElement('tr')

        for (const col of cols) {
            const td = document.createElement('td')
            td.innerText = row[col.key] !== undefined ? row[col.key] : '';
            tr.appendChild(td)
        }
        tbody.appendChild(tr)

        const action = document.createElement('td')
        const actionDiv = document.createElement('div')
        actionDiv.classList.add('action-btns')

        const editBtn = document.createElement('button')
        editBtn.classList.add('action-btn', 'edit-btn')
        editBtn.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
            </svg>`
        editBtn.dataset.id = row.id

        const deleteBtn = document.createElement('button')
        deleteBtn.classList.add('action-btn', 'delete-btn')
        deleteBtn.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                <line x1="10" y1="11" x2="10" y2="17"></line>
                <line x1="14" y1="11" x2="14" y2="17"></line>
            </svg>`
        deleteBtn.dataset.id = row.id

        actionDiv.appendChild(editBtn)
        actionDiv.appendChild(deleteBtn)
        action.appendChild(actionDiv)
        tr.appendChild(action)
    }
}

export {
    renderTable
}