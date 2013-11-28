ymaps.ready(init);

function init () {
    var myMap = new ymaps.Map("contacts_map", {
            center: [55.775353, 37.6168],
            zoom: 17
        }),

        myPlacemark2 = new ymaps.Placemark([55.775353, 37.6168], {
            // Свойства.
            hintContent: '127473, г. Москва, 2-й Волконский переулок, д. 10'
        });
        
    myMap.controls
        // Кнопка изменения масштаба.
        .add('zoomControl', { left: 5, top: 5 })
        

    // Добавляем все метки на карту.
    myMap.geoObjects.add(myPlacemark2);
}
