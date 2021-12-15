(function () {
    function createTitle(title) {
        let titleOfApp = document.createElement('h2');
        titleOfApp.innerHTML = title;
        return titleOfApp;
    }


    function createForm() {
        let form = document.createElement('form');
        let input = document.createElement('input');
        let butWrapper = document.createElement('div');
        let button = document.createElement('button');

        form.classList.add('input-group', 'mb-3');
        input.classList.add('form-control');
        butWrapper.classList.add('input-group-append');
        button.classList.add('btn', 'btn-primary');

        input.placeholder = 'Enter your text';
        button.textContent = 'Add your todo';

        input.addEventListener('input', setAttrOfButton);

        function setAttrOfButton() {
            if (input.value == '') {
                button.disabled = true;
            } else {
                button.disabled = false;
            }
        }

        setAttrOfButton();

        butWrapper.append(button);
        form.append(input);
        form.append(butWrapper);

        return {
            form,
            input,
            button,
        };
    }


    function createList() {
        let list = document.createElement('ul');
        list.classList.add('list-group');
        return list;
    }




    function createItem(name) {
        let item = document.createElement('li');

        let buttonsGroup = document.createElement('div');
        let buttonDone = document.createElement('button');
        let buttonDelete = document.createElement('button');

        item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');

        item.textContent = name;

        buttonsGroup.classList.add('btn-group', 'btn-group-sm');
        buttonDone.classList.add('btn', 'btn-success');
        buttonDelete.classList.add('btn', 'btn-danger');
        buttonDone.textContent = 'Done';
        buttonDelete.textContent = 'Remove';


        buttonsGroup.append(buttonDone);
        buttonsGroup.append(buttonDelete);
        item.append(buttonsGroup);

        return {
            item,
            buttonDone,
            buttonDelete
        }

    }


    let initialList = [
        {
            name: 'Поспать',
            done: false
        },
        {
            name: 'Умыться',
            done: false
        },
        {
            name: 'Поесть',
            done: false
        }
    ];



    let valuesArray = [];




    function createApp(container, title = "List of to do") {

        let appTitleOfTodo = createTitle(title);
        let appForm = createForm();
        let appList = createList();

        container.append(appTitleOfTodo);
        container.append(appForm.form);
        container.append(appList);


        for (let i = 0; i < initialList.length; i++) {
            let initialListItem = createItem(initialList[i].name);

            appList.append(initialListItem.item);

            initialListItem.buttonDone.addEventListener('click', () => {
                initialListItem.item.classList.toggle('list-group-item-success');
            })
            initialListItem.buttonDelete.addEventListener('click', () => {
                if (confirm('Are you sure?')) {
                    initialListItem.item.remove();
                }
            })
        }



        if (localStorage.getItem('motherKeys')) {
            let newValuesArray = JSON.parse(localStorage.getItem('motherKeys'));
            console.log(newValuesArray);

            for (let i = 0; i < newValuesArray.length; i++) {
                let newValuesArrayItem = createItem(newValuesArray[i].name);

                valuesArray.push(newValuesArray[i]);

                appList.append(newValuesArrayItem.item);





                for (let item of valuesArray) {
                    if (item['done']) {
                        newValuesArrayItem.item.classList.add('list-group-item-success');
                    }
                }



                newValuesArrayItem.buttonDone.addEventListener('click', () => {
                    for (let item of valuesArray) {
                        if (item['name'] === valuesArray[i].name) {
                            item['done'] = !item['done'];
                            localStorage.setItem('motherKeys', JSON.stringify(valuesArray));
                        }
                    }
                    newValuesArrayItem.item.classList.toggle('list-group-item-success');
                })
                newValuesArrayItem.buttonDelete.addEventListener('click', () => {
                    if (confirm('Are you sure?')) {
                        newValuesArrayItem.item.remove();
                        valuesArray = valuesArray.filter(function (item) {
                            console.log(valuesArray[i].name)
                            return item.name !== valuesArray[i].name;
                        });
                        localStorage.setItem('motherKeys', JSON.stringify(valuesArray));
                    }

                })
            }
        } else {
            valuesArray.push();
        }



        appForm.form.addEventListener('submit', (e) => {

            e.preventDefault();


            if (!appForm.input.value) {
                return;
            }


            let totalItem = createItem(appForm.input.value);


            totalItem.buttonDone.addEventListener('click', () => {
                totalItem.item.classList.toggle('list-group-item-success');
            })
            totalItem.buttonDelete.addEventListener('click', () => {
                if (confirm('Are you sure?')) {
                    totalItem.item.remove();
                }
            })


            appList.append(totalItem.item);

            valuesArray.push({ name: appForm.input.value, done: false });
            localStorage.setItem('motherKeys', JSON.stringify(valuesArray));

            appForm.input.value = '';

        })

    }


    window.createApp = createApp;
})();
