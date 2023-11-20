import * as controls from './modules/control.js';
import {renderPhoneBook, renderContacts} from './modules/render.js';
import {getStorage, setStorage} from './modules/serviceStorage.js';

{
  const init = (selectorApp, title) => {
    const app = document.querySelector(selectorApp);
    const data = getStorage('phonebook');

    const {
      list,
      logo,
      btnAdd,
      form,
      formOverlay,
      btnDel,
    } = renderPhoneBook(app, title);

    const allRow = renderContacts(list, data);
    const {closeModal} = controls.modalControl(btnAdd, formOverlay);

    controls.hoverRow(allRow, logo);
    controls.deleteControl(btnDel, list);
    controls.formControl(form, list, closeModal);

    const table = document.querySelector('.table');
    const tableBody = table.querySelector('tbody');

    const sortTable = (columnIndex) => {
      const rows = Array.from(document.querySelectorAll('.contact'));

      const sortedRows = rows.sort((a, b) => {
        const aValue = a.cells[columnIndex].textContent;
        const bValue = b.cells[columnIndex].textContent;

        return aValue.localeCompare(bValue);
      });

      tableBody.textContent = '';
      tableBody.append(...sortedRows);

      setStorage('sortedCol', columnIndex);
    };

    table.addEventListener('click', (evt) => {
      if (evt.target.tagName === 'TH') {
        // eslint-disable-next-line max-len
        const columnIndex = Array.from(evt.target.parentNode.cells).indexOf(evt.target);

        sortTable(columnIndex);
      }
    });

    const sortCol = getStorage('sortedCol');
    sortTable(sortCol);
  };
  window.phoneBookInit = init;
}
