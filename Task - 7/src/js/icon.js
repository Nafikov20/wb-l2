const  iconSettingsRed = {
    mapIconUrl: '<svg version="1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 149 178"><path fill="{mapIconColor}" stroke="#FFF" stroke-width="6" stroke-miterlimit="10" d="M126 23l-6-6A69 69 0 0 0 74 1a69 69 0 0 0-51 22A70 70 0 0 0 1 74c0 21 7 38 22 52l43 47c6 6 11 6 16 0l48-51c12-13 18-29 18-48 0-20-8-37-22-51z"/><circle fill="{mapIconColorInnerCircle}" cx="74" cy="75" r="61"/><circle fill="#FFF" cx="74" cy="75" r="{pinInnerCircleRadius}"/></svg>',
    mapIconColor: '#ce210d',
    mapIconColorInnerCircle: '#fff',
    pinInnerCircleRadius:48
};

const  iconSettingsGreen = {
    mapIconUrl: '<svg version="1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 149 178"><path fill="{mapIconColor}" stroke="#FFF" stroke-width="6" stroke-miterlimit="10" d="M126 23l-6-6A69 69 0 0 0 74 1a69 69 0 0 0-51 22A70 70 0 0 0 1 74c0 21 7 38 22 52l43 47c6 6 11 6 16 0l48-51c12-13 18-29 18-48 0-20-8-37-22-51z"/><circle fill="{mapIconColorInnerCircle}" cx="74" cy="75" r="61"/><circle fill="#FFF" cx="74" cy="75" r="{pinInnerCircleRadius}"/></svg>',
    mapIconColor: 'rgba(41,110,0,0.82)',
    mapIconColorInnerCircle: '#fff',
    pinInnerCircleRadius:48
};


const  iconSettingsBlue = {
    mapIconUrl: '<svg version="1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 149 178"><path fill="{mapIconColor}" stroke="#FFF" stroke-width="6" stroke-miterlimit="10" d="M126 23l-6-6A69 69 0 0 0 74 1a69 69 0 0 0-51 22A70 70 0 0 0 1 74c0 21 7 38 22 52l43 47c6 6 11 6 16 0l48-51c12-13 18-29 18-48 0-20-8-37-22-51z"/><circle fill="{mapIconColorInnerCircle}" cx="74" cy="75" r="61"/><circle fill="#FFF" cx="74" cy="75" r="{pinInnerCircleRadius}"/></svg>',
    mapIconColor: '#1081f1',
    mapIconColorInnerCircle: '#fff',
    pinInnerCircleRadius:48
};

const  iconSettingsDefault = {
    mapIconUrl: '<svg version="1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 149 178"><path fill="{mapIconColor}" stroke="#FFF" stroke-width="6" stroke-miterlimit="10" d="M126 23l-6-6A69 69 0 0 0 74 1a69 69 0 0 0-51 22A70 70 0 0 0 1 74c0 21 7 38 22 52l43 47c6 6 11 6 16 0l48-51c12-13 18-29 18-48 0-20-8-37-22-51z"/><circle fill="{mapIconColorInnerCircle}" cx="74" cy="75" r="61"/><circle fill="#FFF" cx="74" cy="75" r="{pinInnerCircleRadius}"/></svg>',
    mapIconColor: '#000000',
    mapIconColorInnerCircle: '#fff',
    pinInnerCircleRadius:48
};



const divIconRed = L.divIcon({
    className: "leaflet-data-marker",
    html: L.Util.template(iconSettingsRed.mapIconUrl, iconSettingsRed), //.replace('#','%23'),
    iconAnchor  : [12, 32],
    iconSize    : [25, 30],
    popupAnchor : [0, -28]
});

const divIconGreen = L.divIcon({
    className: "leaflet-data-marker",
    html: L.Util.template(iconSettingsGreen.mapIconUrl, iconSettingsGreen), //.replace('#','%23'),
    iconAnchor  : [12, 32],
    iconSize    : [25, 30],
    popupAnchor : [0, -28]
});

const divIconBlue = L.divIcon({
    className: "leaflet-data-marker",
    html: L.Util.template(iconSettingsBlue.mapIconUrl, iconSettingsBlue), //.replace('#','%23'),
    iconAnchor  : [12, 32],
    iconSize    : [25, 30],
    popupAnchor : [0, -28]
});
const divIconDefault = L.divIcon({
    className: "leaflet-data-marker",
    html: L.Util.template(iconSettingsDefault.mapIconUrl, iconSettingsDefault), //.replace('#','%23'),
    iconAnchor  : [12, 32],
    iconSize    : [25, 30],
    popupAnchor : [0, -28]
});

export {divIconDefault, divIconBlue, divIconGreen, divIconRed};