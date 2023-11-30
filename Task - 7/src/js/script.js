// Импортируем иконки
import { divIconDefault, divIconBlue, divIconGreen, divIconRed } from './icon.js';

// Инициализация карты
const map = L.map('map').setView([55.75, 37.62], 11);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

// Загрузка маркеров из localStorage
const savedMarkers = JSON.parse(localStorage.getItem('markers')) || [];

// Функция для отображения маркеров на карте
function displayMarkers() {
    savedMarkers.forEach((markerData) => {
        const { id, lat, lng, type, name, description, color } = markerData;
        const markerOptions = getMarkerOptions(color);
        const marker = L.marker([lat, lng], { icon: markerOptions, id }).addTo(map);

        // Добавляем popup с информацией о маркере
        marker.bindPopup(`<b>${name}</b><br>${description}<br>Type: ${type}<br><button class="edit-marker">Редактировать</button><button class="delete-marker">Удалить</button>`);
    });
}

// Функция для получения опций маркера в зависимости от цвета
function getMarkerOptions(color) {
    switch (color) {
        case 'red':
            return divIconRed;
        case 'green':
            return divIconGreen;
        case 'blue':
            return divIconBlue;
        default:
            return divIconDefault;
    }
}

// Отображаем сохраненные маркеры на карте
displayMarkers();

// Обработчик клика по карте для добавления нового маркера
function onMapClick(e) {
    const dialog = document.querySelector('dialog');
    dialog.showModal();

    // Очищаем форму при открытии диалога
    const form = dialog.querySelector('form');
    form.reset();

    // Показываем кнопку "Создать", так как она нужна при добавлении нового маркера
    form.querySelector('.button-submit').style.display = 'block';

    // Обработчик отправки формы в диалоговом окне
    function onFormSubmit(submitEvent) {
        submitEvent.preventDefault();

        const formData = new FormData(submitEvent.target);
        const markerData = {
            id: Date.now(), // Уникальный идентификатор
            lat: e.latlng.lat,
            lng: e.latlng.lng,
            type: formData.get('type'),
            name: formData.get('name'),
            description: formData.get('description'),
            color: formData.get('color'),
        };

        const markerOptions = getMarkerOptions(markerData.color);
        const marker = L.marker([markerData.lat, markerData.lng], { icon: markerOptions, id: markerData.id }).addTo(map);

        // Добавляем popup с информацией о маркере
        marker.bindPopup(`<b>${markerData.name}</b><br>${markerData.description}<br>Type: ${markerData.type}<br><button class="edit-marker">Редактировать</button><button class="delete-marker">Удалить</button>`);

        // Добавляем маркер в сохраненные
        savedMarkers.push(markerData);

        // Сохраняем обновленные маркеры в localStorage
        localStorage.setItem('markers', JSON.stringify(savedMarkers));

        dialog.removeEventListener('submit', onFormSubmit); // Удаляем обработчик события submit
        dialog.close();
    }

    form.addEventListener('submit', onFormSubmit);

    // Обработчик закрытия диалогового окна
    function onDialogClose() {
        form.removeEventListener('submit', onFormSubmit);
        dialog.removeEventListener('close', onDialogClose);
    }

    dialog.addEventListener('close', onDialogClose);
}

map.on('click', onMapClick);


// Добавляем обработчик для редактирования, перемещения и удаления маркеров
map.on('popupopen', (e) => {
    const marker = e.popup._source;

    // Редактирование маркера
    e.popup._contentNode.querySelector('.edit-marker').addEventListener('click', () => {
        const dialog = document.querySelector('dialog');
        dialog.showModal();

        // Очищаем форму при открытии диалога
        const form = dialog.querySelector('form');
        form.reset();

        // Заполняем форму текущими данными маркера
        const markerData = savedMarkers.find((m) => m.id === marker.options.id);
        form.querySelector('input[name="type"]').value = markerData.type;
        form.querySelector('input[name="name"]').value = markerData.name;
        form.querySelector('input[name="description"]').value = markerData.description;
        form.querySelector('select[name="color"]').value = markerData.color;

        form.querySelector('.button-submit').textContent = 'Редактировать';

        // Обработчик отправки формы в диалоговом окне
        form.addEventListener('submit', (submitEvent) => {
            submitEvent.preventDefault();

            const formData = new FormData(submitEvent.target);

            // Обновляем данные маркера
            markerData.type = formData.get('type');
            markerData.name = formData.get('name');
            markerData.description = formData.get('description');
            markerData.color = formData.get('color');

            // Обновляем маркер на карте
            marker.setLatLng([markerData.lat, markerData.lng]);
            marker.setIcon(getMarkerOptions(markerData.color));

            // Обновляем контент попапа
            marker.getPopup().setContent(`<b>${markerData.name}</b><br>${markerData.description}<br>Type: ${markerData.type}<br><button class="edit-marker">Редактировать</button><button class="delete-marker">Удалить</button>`);

            // Сохраняем обновленные маркеры в localStorage
            localStorage.setItem('markers', JSON.stringify(savedMarkers));

            dialog.close();
        });
    });

    // Удаление маркера
    e.popup._contentNode.querySelector('.delete-marker').addEventListener('click', () => {
        map.removeLayer(marker);

        // Удаляем маркер из сохраненных
        const index = savedMarkers.findIndex((m) => m.id === marker.options.id);
        savedMarkers.splice(index, 1);
        localStorage.setItem('markers', JSON.stringify(savedMarkers));
    });
});

// Закрытие попапа при создании маркера
map.on('popupclose', () => {
    const dialog = document.querySelector('dialog');
    dialog.close();
});

// Закрытие диалогового окна по кнопке "Закрыть"
document.querySelector('.button-close').addEventListener('click', () => {
    const dialog = document.querySelector('dialog');
    dialog.close();
});

document.querySelector('.filter').addEventListener('input', (e) => {
    const searchText = e.target.value.toLowerCase();

    map.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
            const markerData = savedMarkers.find(
                (m) => m.id === layer.options.id
            );

            if (markerData) {
                const popupContent = `${markerData.name}<br>${markerData.description}<br>Type: ${markerData.type}`;
                if (popupContent.toLowerCase().includes(searchText)) {
                    layer.setOpacity(1);
                } else {
                    layer.setOpacity(0);
                }
            }
        }
    });
});