'use strict';

const data = [
  {
    name: 'Иван',
    surname: 'Петров',
    phone: '+79514545454',
  },
  {
    name: 'Игорь',
    surname: 'Семёнов',
    phone: '+79999999999',
  },
  {
    name: 'Семён',
    surname: 'Иванов',
    phone: '+79800252525',
  },
  {
    name: 'Мария',
    surname: 'Попова',
    phone: '+79876543210',
  },
];

const svgEdit = `
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M19.001 3.17163C18.7609 3.17163 18.5231 3.21892 18.3013 3.31081C18.0795 3.4027 17.8779 3.53738 17.7081 3.70716L4.39589 17.0194L3.42622 20.5748L6.98167 19.6052L20.2939 6.29295C20.4637 6.12317 20.5984 5.9216 20.6902 5.69977C20.7821 5.47793 20.8294 5.24017 20.8294 5.00006C20.8294 4.75994 20.7821 4.52218 20.6902 4.30035C20.5984 4.07852 20.4637 3.87695 20.2939 3.70716C20.1241 3.53738 19.9225 3.4027 19.7007 3.31081C19.4789 3.21892 19.2411 3.17163 19.001 3.17163ZM17.5359 1.46305C18.0004 1.27066 18.4982 1.17163 19.001 1.17163C19.5038 1.17163 20.0016 1.27066 20.4661 1.46305C20.9306 1.65545 21.3526 1.93745 21.7081 2.29295C22.0636 2.64845 22.3456 3.07049 22.538 3.53498C22.7304 3.99947 22.8294 4.4973 22.8294 5.00006C22.8294 5.50281 22.7304 6.00064 22.538 6.46513C22.3456 6.92962 22.0636 7.35166 21.7081 7.70716L8.20811 21.2072C8.08505 21.3302 7.93201 21.419 7.76412 21.4648L2.26412 22.9648C1.9179 23.0592 1.54764 22.9609 1.29389 22.7072C1.04014 22.4534 0.941814 22.0832 1.03624 21.7369L2.53624 16.2369C2.58203 16.069 2.67084 15.916 2.79389 15.793L16.2939 2.29295C16.6494 1.93745 17.0714 1.65545 17.5359 1.46305Z" fill="#212529"/>
  </svg>
`;

{
  const createContainer = () => {
    const container = document.createElement('div');
    container.classList.add('container');

    return container;
  };

  const createHeader = () => {
    const header = document.createElement('header');
    header.classList.add('header');
    const headerContainer = createContainer();
    header.append(headerContainer);
    header.headerContainer = headerContainer;

    return header;
  };

  const createLogo = (title) => {
    const h1 = document.createElement('h1');
    h1.classList.add('logo');
    h1.textContent = `Телефонный справочник. ${title}`;
    return h1;
  };

  const createMain = () => {
    const main = document.createElement('main');
    const mainContainer = createContainer();
    main.append(mainContainer);
    main.mainContainer = mainContainer;

    return main;
  };

  const createButtonsGroup = (params) => {
    const btnWrapper = document.createElement('div');
    btnWrapper.classList.add('btn-wrapper');

    const btns = params.map(({className, type, text}) => {
      const button = document.createElement('button');
      button.className = className;
      button.type = type;
      button.textContent = text;

      return button;
    });

    btnWrapper.append(...btns);

    return {
      btnWrapper,
      btns,
    };
  };

  const createTable = () => {
    const table = document.createElement('table');
    table.classList.add('table', 'table-striped');

    const thead = document.createElement('thead');
    thead.insertAdjacentHTML('beforeend', `
      <tr>
        <th class='delete'>Удалить</th>
        <th class= 'cell-name'>Имя</th>
        <th class= 'cell-surname'>Фамилия</th>
        <th>Телефон</th>
      </tr>
    `);

    const tbody = document.createElement('tbody');

    table.append(thead, tbody);
    table.tbody = tbody;

    return table;
  };

  const createForm = () => {
    const overlay = document.createElement('div');
    overlay.classList.add('form-overlay');

    const form = document.createElement('form');
    form.classList.add('form');
    form.insertAdjacentHTML('beforeend', `
      <button class='close' type='button'></button>
      <h2 class='form-title'></h2>
      <div class='form-group'>
        <label class='form-label' for='name'>Имя:</label>
        <input class='form-input' name='name'
          id ='name' type='text' required>
      </div>
      <div class='form-group'>
      <label class='form-label' for='surname'>Фамилия:</label>
      <input class='form-input' name='surname'
        id ='surname' type='text' required>
    </div>
    <div class='form-group'>
      <label class='form-label' for='phone'>Имя:</label>
      <input class='form-input' name='phone'
        id ='phone' type='number' required>
    </div>
    `);

    const buttonGroup = createButtonsGroup([
      {
        className: 'btn btn-primary mr-3 js-add',
        type: 'submit',
        text: 'Добавить',
      },
      {
        className: 'btn btn-danger',
        type: 'reset',
        text: 'Отмена',
      },
    ]);

    form.append(...buttonGroup.btns);
    overlay.append(form);

    return {
      overlay,
      form,
    };
  };

  const createFooter = () => {
    const footer = document.createElement('footer');
    footer.classList.add('footer');
    footer.textContent = 'Все права защищены ©Юля';

    return footer;
  };

  const renderPhoneBook = (app, title) => {
    const header = createHeader();
    const logo = createLogo(title);
    const main = createMain();
    const footer = createFooter();
    const buttonGroup = createButtonsGroup([
      {
        className: 'btn btn-primary mr-3',
        type: 'button',
        text: 'Добавить',
      },
      {
        className: 'btn btn-danger',
        type: 'button',
        text: 'Удалить',
      },
    ]);
    const table = createTable();
    const form = createForm();

    header.headerContainer.append(logo);
    // eslint-disable-next-line max-len
    main.mainContainer.append(buttonGroup.btnWrapper, table, form.overlay);
    app.append(header, main, footer);

    return {
      list: table.tbody,
      logo,
      btnAdd: buttonGroup.btns[0],
      btnDel: buttonGroup.btns[1],
      formOverlay: form.overlay,
      form: form.form,
    };
  };

  const createRow = ({name: firstName, surname, phone}) => {
    const tr = document.createElement('tr');
    tr.classList.add('contact');

    const tdDel = document.createElement('td');
    tdDel.classList.add('delete');
    const buttonDel = document.createElement('button');
    buttonDel.classList.add('del-icon');
    tdDel.append(buttonDel);

    const tdName = document.createElement('td');
    tdName.classList.add('name');
    tdName.textContent = firstName;

    const tdSurname = document.createElement('td');
    tdSurname.classList.add('surname');
    tdSurname.textContent = surname;

    const tdPhone = document.createElement('td');
    const phoneLink = document.createElement('a');
    phoneLink.href = `tel:${phone}`;
    phoneLink.textContent = phone;
    tr.phoneLink = phoneLink;
    tdPhone.append(phoneLink);

    const tdEdit = document.createElement('td');
    const buttonEdit = document.createElement('button');
    buttonEdit.classList.add('btn');
    buttonEdit.type = 'button';
    buttonEdit.innerHTML = svgEdit;
    tdEdit.append(buttonEdit);

    tr.append(tdDel, tdName, tdSurname, tdPhone, tdEdit);
    return tr;
  };

  const renderContacts = (elem, data) => {
    const allRow = data.map(createRow);
    elem.append(...allRow);
    return allRow;
  };

  const hoverRow = (allRow, logo) => {
    const text = logo.textContent;
    allRow.forEach(contact => {
      contact.addEventListener('mouseenter', () => {
        logo.textContent = contact.phoneLink.textContent;
      });
      contact.addEventListener('mouseleave', () => {
        logo.textContent = text;
      });
    });
  };

  const init = (selectorApp, title) => {
    const app = document.querySelector(selectorApp);
    const phoneBook = renderPhoneBook(app, title);

    const {
      list,
      logo,
      btnAdd,
      formOverlay,
      btnDel,
    } = phoneBook;

    const allRow = renderContacts(list, data);

    hoverRow(allRow, logo);

    btnAdd.addEventListener('click', () => {
      formOverlay.classList.add('is-visible');
    });

    formOverlay.addEventListener('click', (evt) => {
      const target = evt.target;
      if (target === formOverlay || target.classList.contains('close')) {
        formOverlay.classList.remove('is-visible');
      }
    });

    btnDel.addEventListener('click', () => {
      document.querySelectorAll('.delete').forEach(el => {
        el.classList.toggle('is-visible');
      });
    });

    list.addEventListener('click', evt => {
      const target = evt.target;
      if (target.closest('.del-icon')) {
        target.closest('.contact').remove();
      }
    });

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
    };

    table.addEventListener('click', (evt) => {
      if (evt.target.tagName === 'TH') {
        // eslint-disable-next-line max-len
        const columnIndex = Array.from(evt.target.parentNode.cells).indexOf(evt.target);

        sortTable(columnIndex);
      }
    });
  };

  window.phoneBookInit = init;
}
