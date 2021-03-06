var customControl = L.Control.extend({

    options: {
        position: 'topleft'
    },

    onAdd: function(map) {
        var container = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom');

        container.style.backgroundColor = "rgb(226, 190, 94)";
        container.style.backgroundImage = "url(./images/custom_marker_icon.png)";
        container.style.backgroundSize = "28px 28px";
        container.style.width = '28px';
        container.style.height = '28px';

        container.onclick = function() {
            console.log('buttonClicked');
            $("#modal").css("display", "block");
        }
        container.onclick = function() {
            $("#modal").css("display", "block");
        }
        $("#close_modal").click(function() {
            $("#modal").css("display", "none")
        })

        return container;
    }
});




$("#save_marker").click(function() {
    $.post($("#add_marker").attr("action"),
        $("#add_marker :input").serializeArray(),
        function(info) {
            $("#result").html(info);
        });
    clearInput();
});

$("#add_marker").submit(function() {
    return false;
});

function clearInput() {
    $("#add_marker :input").each(function() {
        $(this).val('');
    });
}


// 8192
var mapNE = [700, 6750],
    mapSW = [7500, 1500];
var map = L.map("map").setView([0, 0], 4);
L.tileLayer("map/{z}/{x}/{y}.png", {
    minZoom: 3,
    maxZoom: 5,
    continuousWorld: false,
    noWrap: true,
    crs: L.CRS.Simple,
    edgeBufferTiles: 2
}).addTo(map);
map.setMaxBounds(new L.LatLngBounds(map.unproject(mapSW, map.getMaxZoom()), map.unproject(mapNE, map.getMaxZoom())));
var venatori = L.icon({
    iconUrl: "/images/Venatori_banner.png",
    iconSize: [53, 100],
    iconAnchor: [35, 96],
    popupAnchor: [-15, -95],
    shadowUrl: "/images/Venatori_fade.png",
    shadowSize: [53, 100],
    shadowAnchor: [35, 96]
});
var inquisition = L.icon({
    iconUrl: "/images/Inquisition_banner2.png",
    iconSize: [53, 100],
    iconAnchor: [29, 89],
    popupAnchor: [-5, -90],
    shadowUrl: "/images/Inquisition_fade.png",
    shadowSize: [53, 100],
    shadowAnchor: [31, 90]
});
var Tevinter = L.icon({
    iconUrl: "/images/Tevinter_banner.png",
    iconSize: [53, 100],
    iconAnchor: [29, 91],
    popupAnchor: [-5, -90],
    shadowUrl: "/images/Tevinter_fade.png",
    shadowSize: [53, 100],
    shadowAnchor: [29, 91]
});
var battle = L.icon({
    iconUrl: "/images/battle.png",
    iconSize: [60, 60],
    iconAnchor: [30, 30],
    popupAnchor: [2, -23],
    shadowUrl: "/images/battle_fade.png",
    shadowSize: [60, 60],
    shadowAnchor: [22, 38]
});
var dragon = L.icon({
    iconUrl: "/images/dragon.png",
    iconSize: [100, 120],
    iconAnchor: [50, 60],
    popupAnchor: [0, -28],
    shadowUrl: "/images/dragon_fade.png",
    shadowSize: [100, 120],
    shadowAnchor: [50, 60]
});
var neutral = L.icon({
    iconUrl: "/images/Neitral.png",
    iconSize: [53, 100],
    iconAnchor: [35, 96],
    popupAnchor: [-10, -95],
    shadowUrl: "/images/Neitral_fade.png",
    shadowSize: [53, 100],
    shadowAnchor: [35, 96]
});

var custom_marker = L.icon({
    iconUrl: "/images/custom_marker.png",
    iconSize: [89, 98],
    iconAnchor: [45, 79],
    popupAnchor: [1.5, -85],
    shadowUrl: "/images/custom_marker_fade.png",
    shadowSize: [89, 98],
    shadowAnchor: [45, 79]
});





var referenceflag = L.marker([70, -141], {
    icon: custom_marker,
    draggable: true
}).addTo(map);
referenceflag.bindPopup("<b>REFERENCE</b>");
referenceflag.on("dragend", function(a) {
    referenceflag.getPopup().setContent(referenceflag.getLatLng().toString() + "<br />Pixels " + map.project(referenceflag.getLatLng(), map.getMaxZoom().toString()) + "").openOn(map);
    console.log(referenceflag.getLatLng().toString());
});

var lat_save;
var lng_save;

referenceflag.on("dragend", function(e) {
    var temp = referenceflag.getLatLng().toString()
    var temp2 = temp.slice(7, -1)

    lat_save = temp2.split(",")[0];
    lng_save = temp2.split(",")[1].slice(1);

    $lat = lat_save
    $lng = lng_save

    document.getElementById('lat_input').setAttribute('value', lat_save);
    document.getElementById('lng_input').setAttribute('value', lng_save);

    console.log("latitude:" + $lat, "\n", "longitude:" + $lng)
})


// var custom_markers = []



$(function() {
    $.ajax({
        url: 'https://0xsauel.000webhostapp.com/resources/select.php',
        data: "",

        dataType: 'json',
        success: function(data) {
            $('#output').html("");
            var i = 0

            for (i in data) {
                var id = data[i][0];
                var lat = data[i][1];
                var lng = data[i][2];
                var name = data[i][3];
                var desc = data[i][4];

                for (var xi in id) {
                    new L.marker([lat, lng], { icon: custom_marker }).bindPopup("<center><b>" + name + "</b></center><hr>" + desc).addTo(lg_9);
                }
            }
        }
    })
})

var mital = L.marker([-67.892086, -26.323242], {
    icon: neutral
}).bindPopup("<center><b>Храм Митал</b></center><hr>Предположительно заброшен");
var lost_dirtamena = L.marker([-42.032974, -22.543945], {
    icon: neutral
}).bindPopup("<center><b>Потерянный храм Диртамена</b></center><hr>Заброшен");
var grey_guardians = L.marker([-24.647017, 35.771484], {
    icon: neutral
}).bindPopup("<center><b>Темница Серых Стражей</b></center><hr>Бывшая тюрьма Корифея. Заброшена");
var ostagar = L.marker([-64.699105, 42.231445], {
    icon: neutral
}).bindPopup("<center><b>Остагар</b></center><hr>Заброшенные руины древней тевинтерской крепости");
var eonar = L.marker([-50.680797, 8.657227], {
    icon: neutral
}).bindPopup("<center><b>Эонар</b></center><hr>Бывшая тевинтерская крепость. Ныне тюрьма для магов");
var velanis = L.marker([58.170702, 8.217773], {
    icon: neutral
}).bindPopup("<center><b>Ас Веланис</b></center><hr>Тевинтерская крепость. Ныне занята кунари");
var velabanchel = L.marker([29.152161, 77.299805], {
    icon: neutral
}).bindPopup("<center><b>Велабанчель</b></center><hr>Тюрьма под контролем Антиванских воронов");
var akhaaz = L.marker([63.587675, 14.326172], {
    icon: neutral
}).bindPopup("<center><b>Акхааз</b></center><hr>Крепость под контролем кунари");
var elim = L.marker([-2.196727, 45.791016], {
    icon: neutral
}).bindPopup("<center><b>Форт Элим</b></center><hr>Укреплённое поселение неподалёку от Кайтена");
var skyhold = L.marker([-53.618579, -0.878906], {
    icon: inquisition
}).bindPopup("<b>Скайхолд</b><hr>Стан Инквизиции");
var gessarian_camp = L.marker([-39.943436, 32.827148], {
    icon: inquisition
}).bindPopup("<b>Лагерь Клинков Гессариана</b><hr>Крупный лагерь Инквизиции на Штормовом берегу");
var du_cordo = L.marker([-61.918271, -29.750977], {
    icon: inquisition
}).bindPopup("<b>Цитадель дю Корбо</b><hr>Одна из крепостей Орлесианского Сопротивления");
var revasan = L.marker([-62.734601, -29.267578], {
    icon: inquisition
}).bindPopup("<b>Форт Ревасан</b><hr>Одна из крепостей Орлесианского Сопротивления");
var bronak = L.marker([-46.528635, 28.959961], {
    icon: inquisition
}).bindPopup("<b>Каэр Бронак</b><hr>Крепость Инквизиции возле Крествуда");
var suledin = L.marker([-57.844751, -10.371094], {
    icon: venatori
}).bindPopup("<center><b>Крепость Суледин</b></center><hr>Руины древней эльфийской крепости. Захвачены красными храмовниками");
var adamant = L.marker([-53.383328, -75.498047], {
    icon: venatori
}).bindPopup("<center><b>Адамант</b></center><hr>Стан Орлесианских Серых Стражей, союзных Корифею");
var amarantain = L.marker([-38.444985, 61.259766], {
    icon: venatori
}).bindPopup("<center><b>Амарантайн</b></center><hr>Бывший стан Ферелденских Серых Стражей. Захвачен венатори и красными храмовниками");
var korifei_camp = L.marker([-0.351256, -17.753906], {
    icon: venatori
}).bindPopup("<center><b>Лагерь Корифея</b></center><hr>Временный лагерь основных сил Корифея");
var dumat = L.marker([-13.068777, -44.472656], {
    icon: venatori
}).bindPopup("<center><b>Храм Думата</b></center><hr>Древний храм, отданнй Корифеем своему генералу");
var terinfall = L.marker([-59.578851, 57.480469], {
    icon: venatori
}).bindPopup("<center><b>Цитадель Теринфаль</b></center><hr>Бывший тренировочный полигон Искателей Истины. Ныне стан красных храмовников в Ферелдене");
var kaer_oswin = L.marker([-50.007739, 51.108398], {
    icon: venatori
}).bindPopup("<center><b>Каэр Освин</b></center><hr>Бывшая вотчина банна Лорена. Пристанище Ордена Пламенного Обета");
var griphon_wing = L.marker([-57.421294, -87.099609], {
    icon: venatori
}).bindPopup("<center><b>Крепость Грифоновы Крылья</b></center><hr>Под контроллем венатори и Серых Стражей Орлея");
var soldier_height = L.marker([-38.513788, 52.382813], {
    icon: venatori
}).bindPopup("<center><b>Пик Солдата</b></center><hr>Бывшая крепость Серых Стражей Ферелдена. Захвачена венатори");
var amarantain_battle = L.marker([-38.651198, 61.21582], {
    icon: battle
}).bindPopup("<center><b>Битва за Амарантайн</b></center><hr>7 Жнивеня, 9:42 Века Дракона");
var west_holm = L.marker([-43.897892, 33.793945], {
    icon: battle
}).bindPopup("<center><b>Битва за Западный Холм</b></center><hr>4 Первопада, 9:42 Века Дракона");
var korifei_tewinter = L.marker([9.579084, -9.008789], {
    icon: battle
}).bindPopup("<center><b>Битва армии Корифея и легионов Тевинтера</b></center><hr>14 Царепути, 9:42 Века Дракона");
var tellari_swamp = L.marker([19.394068, 55.810547], {
    icon: dragon
}).bindPopup("<center><b>Болота Теллари</b></center><hr>Кладка, охраняемая несколькими высшими драконицами, которые по неизвестной причине не передрались");
var kirkwall = L.marker([-29.113775, 26.850586], {
    icon: dragon
}).bindPopup("<center><b>Шахты близ Киркволла</b></center><hr>Кладка, лишившаяся самой большой драконицы несколько лет назад");
var inner_place = L.marker([-61.522695, 30.146484], {
    icon: dragon
}).bindPopup("<center><b>Внутренние земли</b></center><hr>Ферелденская морозница");
var stormshore = L.marker([-41.607228, 29.487305], {
    icon: dragon
}).bindPopup("<center><b>Штормовой берег</b></center><hr>Винсомер");
var du_lion = L.marker([-57.844751, -6.020508], {
    icon: dragon
}).bindPopup("<center><b>Эмприз-дю-Лион</b></center><hr>В горах замечены: Хивернал, Кальтенцан и Нагорный губитель");
var holyplains = L.marker([-64.206377, -29.619141], {
    icon: dragon
}).bindPopup("<center><b>Священные равнины</b></center><hr>Гаморданский бурегон");
var emerald_graves = L.marker([-64.774125, -16.259766], {
    icon: dragon
}).bindPopup("<center><b>Изумрудные могилы</b></center><hr>Большой Мистраль");
var west_rich = L.marker([-55.776573, -87.055664], {
    icon: dragon
}).bindPopup("<center><b>Западный предел</b></center><hr>Глубинная высшая драконица");
var hissing_wastes = L.marker([-49.15297, -84.243164], {
    icon: dragon
}).bindPopup("<center><b>Свистящие пустоши</b></center><hr>Песчаный плакальщик");
var crosswood = L.marker([-46.377254, 27.421875], {
    icon: dragon
}).bindPopup("<center><b>Крествуд</b></center><hr>Северный охотник");
var frostback_basin = L.marker([-68.007571, 4.570313], {
    icon: dragon
}).bindPopup("<center><b>Морозная котловина</b></center><hr>Огромный морозный дракон (на самом деле ― Гаккон Зимодых, возрождённый в теле дракона)");
var hundred_pillars = L.marker([38.099983, 28.740234], {
    icon: dragon
}).bindPopup("<center><b>Сто Столпов</b></center><hr>Местный дракон держится подальше от дворцов магистров, но порой нападает на караваны");
var perendeil = L.marker([-1.537901, -56.777344], {
    icon: dragon
}).bindPopup("<center><b>Перендейл</b></center><hr>Хантерхорнский шрайк");
var donark = L.marker([64.848937, -67.851563], {
    icon: dragon
}).bindPopup("<center><b>Донарк</b></center><hr>Дракон преимущественно держится ближе к горам");
var high_reaches = L.marker([45.890008, -39.638672], {
    icon: dragon
}).bindPopup("<center><b>Дальние обзоры</b></center><hr>Местный дракон периодически нападает на смотровые башни");
var white_peak = L.marker([51.013755, 59.018555], {
    icon: dragon
}).bindPopup("<center><b>Гора Белый Шпиль</b></center><hr>Кладка, охраняемая одной белой высшей драконицей");
var west_legion = L.marker([8.450639, -9.580078], {
    icon: Tevinter
}).bindPopup("<center><b>Западный легион</b></center><hr>Общая численность ~50 тысяч душ<br>Управляется советом трибунов и префекта в отсутсвие Маркуса Люция");
var watchers_fleet = L.marker([54.72462, 31.552734], {
    icon: Tevinter
}).bindPopup("<center><b>Дозорный флот</b></center><hr>");
var south_legion_fleet = L.marker([-25.324167, 86.484375], {
    icon: Tevinter
}).bindPopup("<center><b>Флот южного легиона</b></center><hr>Полупустые корабли для переправки легиона из Камберленда в Джейдер<br>Ожидают воронов с приказами");
var north_lefion = L.marker([39.97712, -29.443359], {
    icon: Tevinter
}).bindPopup("<center><b>Северный легион</b></center><hr>Отозван с Сегерона в 9:41 ВД");
var east_legion = L.marker([42.098222, 19.863281], {
    icon: Tevinter
}).bindPopup("<center><b>Восточный легион</b></center><hr>");
var south_legion = L.marker([-4.127285, -6.152344], {
    icon: Tevinter
}).bindPopup("<center><b>Южный легион</b></center><hr>Продвигается в сторону Скайхолда под знаменами Инквизиции");
var donarks_base = L.marker([66.548263, -73.916016], {
    icon: Tevinter
}).bindPopup("<center><b>Ставка в Донарксе</b></center><hr>Хорошо охраняемая местность, где разводят редких боевых слонов для армии Тевинтера. Тут же проходят отбор и обучение воины из местных племен, пожелавшие вступить в легионы.</center>");
var central_legion = L.marker([24.527135, 5.449219], {
    icon: Tevinter
}).bindPopup("<center><b>Легион центрального округа</b></center><hr>");
var wagon_marker = L.icon({
    iconUrl: "/images/wagon.png",
    iconSize: [43, 24],
    iconAnchor: [20, 19]
});
var ship_marker = L.icon({
    iconUrl: "/images/Ship.png",
    iconSize: [45, 38],
    iconAnchor: [20, 35]
});
var Antiva_Dairsmuid = [
    [23.84565, 75.058594],
    [37.649034, 95.537109],
    [23.84565, 75.058594]
];
var Antiva_Dairsmuid_line = L.polyline([
    [23.84565, 75.058594],
    [37.649034, 95.537109]
], {
    className: "water-route"
});
Antiva_Dairsmuid_line.addTo(map);
var Antiva_Dairsmuid_marker = L.Marker.movingMarker(Antiva_Dairsmuid, 40000, {
    destination: Antiva_Dairsmuid,
    autostart: true,
    loop: true,
    icon: ship_marker
}).addTo(map);
map.addLayer(Antiva_Dairsmuid_marker);
Antiva_Dairsmuid_marker.start();
var Cumberland_Jader = [
    [-32.916485, -7.646484],
    [-44.496505, 6.899414],
    [-32.916485, -7.646484]
];
var Cumberland_Jader_line = L.polyline([
    [-32.916485, -7.646484],
    [-44.496505, 6.899414]
], {
    className: "water-route"
});
Cumberland_Jader_line.addTo(map);
var Cumberland_Jader_marker = L.Marker.movingMarker(Cumberland_Jader, 40000, {
    destination: Cumberland_Jader,
    autostart: true,
    loop: true,
    icon: ship_marker
}).addTo(map);
map.addLayer(Cumberland_Jader_marker);
Cumberland_Jader_marker.start();
var Qunandar_Kont_arr = [
    [68.704486, 76.157227],
    [67.424364, 73.959961],
    [59.512029, 93.339844],
    [56.511018, 93.603516],
    [59.512029, 93.339844],
    [67.424364, 73.959961],
    [68.704486, 76.157227]
];
var Qunandar_Kont_arr_line = L.polyline([
    [68.704486, 76.157227],
    [67.424364, 73.959961],
    [59.512029, 93.339844],
    [56.511018, 93.603516]
], {
    className: "water-route"
});
Qunandar_Kont_arr_line.addTo(map);
var Qunandar_Kont_arr_marker = L.Marker.movingMarker(Qunandar_Kont_arr, 40000, {
    destination: Qunandar_Kont_arr,
    autostart: true,
    loop: true,
    icon: ship_marker
}).addTo(map);
map.addLayer(Qunandar_Kont_arr_marker);
Qunandar_Kont_arr_marker.start();
var Qunandar_Seheron = [
    [68.704486, 76.157227],
    [62.69431, 38.452148],
    [62.308794, 35.332031],
    [60.413852, 30.102539],
    [60.152442, 20.083008],
    [60.413852, 30.102539],
    [62.308794, 35.332031],
    [62.69431, 38.452148],
    [68.704486, 76.157227]
];
var Qunandar_Seheron_line = L.polyline([
    [68.704486, 76.157227],
    [62.69431, 38.452148],
    [62.308794, 35.332031],
    [60.413852, 30.102539],
    [60.152442, 20.083008]
], {
    className: "water-route"
});
Qunandar_Seheron_line.addTo(map);
var Qunandar_Seheron_marker = L.Marker.movingMarker(Qunandar_Seheron, 40000, {
    destination: Qunandar_Seheron,
    autostart: true,
    loop: true,
    icon: ship_marker
}).addTo(map);
map.addLayer(Qunandar_Seheron_marker);
Qunandar_Seheron_marker.start();
var Ostwick_Highever_Kirkwall = [
    [-24.726875, 61.347656],
    [-25.720735, 63.500977],
    [-28.110749, 63.105469],
    [-37.230328, 41.308594],
    [-32.175612, 26.850586],
    [-32.435613, 32.563477],
    [-27.839076, 62.53418],
    [-26.115986, 63.588867],
    [-24.726875, 61.347656],
    [-26.115986, 63.588867],
    [-27.839076, 62.53418],
    [-32.435613, 32.563477],
    [-32.175612, 26.850586],
    [-37.230328, 41.308594],
    [-28.110749, 63.105469],
    [-25.720735, 63.500977],
    [-24.726875, 61.347656]
];
var Ostwick_Highever_Kirkwall_line = L.polyline([
    [-24.726875, 61.347656],
    [-25.720735, 63.500977],
    [-28.110749, 63.105469],
    [-37.230328, 41.308594],
    [-32.175612, 26.850586],
    [-32.435613, 32.563477],
    [-27.839076, 62.53418],
    [-26.115986, 63.588867],
    [-24.726875, 61.347656]
], {
    className: "water-route"
});
Ostwick_Highever_Kirkwall_line.addTo(map);
var Ostwick_Highever_Kirkwall_marker = L.Marker.movingMarker(Ostwick_Highever_Kirkwall, 40000, {
    destination: Ostwick_Highever_Kirkwall,
    autostart: true,
    loop: true,
    icon: ship_marker
}).addTo(map);
map.addLayer(Ostwick_Highever_Kirkwall_marker);
Ostwick_Highever_Kirkwall_marker.start();
var Denerim_Gwaren = [
    [-48.400032, 67.368164],
    [-44.087585, 74.882813],
    [-44.370987, 78.09082],
    [-57.938183, 93.251953],
    [-61.143235, 92.548828],
    [-65.820782, 71.323242],
    [-61.143235, 92.548828],
    [-57.938183, 93.251953],
    [-44.370987, 78.09082],
    [-44.087585, 74.882813],
    [-48.400032, 67.368164]
];
var Denerim_Gwaren_line = L.polyline([
    [-48.400032, 67.368164],
    [-44.087585, 74.882813],
    [-44.370987, 78.09082],
    [-57.938183, 93.251953],
    [-61.143235, 92.548828],
    [-65.820782, 71.323242]
], {
    className: "water-route"
});
Denerim_Gwaren_line.addTo(map);
var Denerim_Gwaren_marker = L.Marker.movingMarker(Denerim_Gwaren, 40000, {
    destination: Denerim_Gwaren,
    autostart: true,
    loop: true,
    icon: ship_marker
}).addTo(map);
map.addLayer(Denerim_Gwaren_marker);
Denerim_Gwaren_marker.start();
var Antiva_Denerim = [
    [23.84565, 75.058594],
    [24.046464, 80.81543],
    [14.85985, 92.460938],
    [-39.436193, 82.089844],
    [-48.400032, 67.368164],
    [-39.436193, 82.089844],
    [14.85985, 92.460938],
    [24.046464, 80.81543],
    [23.84565, 75.058594]
];
var Antiva_Denerim_line = L.polyline([
    [23.84565, 75.058594],
    [24.046464, 80.81543],
    [14.85985, 92.460938],
    [-39.436193, 82.089844],
    [-48.400032, 67.368164]
], {
    className: "water-route"
});
Antiva_Denerim_line.addTo(map);
var Antiva_Denerim_marker = L.Marker.movingMarker(Antiva_Denerim, 40000, {
    destination: Antiva_Denerim,
    autostart: true,
    loop: true,
    icon: ship_marker
}).addTo(map);
map.addLayer(Antiva_Denerim_marker);
Antiva_Denerim_marker.start();
var Minrathous_Qarinus = [
    [52.802761, -22.324219],
    [51.944265, -11.425781],
    [48.57479, -4.921875],
    [51.508742, 3.076172],
    [55.178868, 11.337891],
    [52.961875, 21.269531],
    [47.872144, 20.390625],
    [52.961875, 21.269531],
    [55.178868, 11.337891],
    [51.508742, 3.076172],
    [48.57479, -4.921875],
    [51.944265, -11.425781],
    [52.802761, -22.324219]
];
var Minrathous_Qarinus_line = L.polyline([
    [52.802761, -22.324219],
    [51.944265, -11.425781],
    [48.57479, -4.921875],
    [51.508742, 3.076172],
    [55.178868, 11.337891],
    [52.961875, 21.269531],
    [47.872144, 20.390625]
], {
    className: "water-route"
});
Minrathous_Qarinus_line.addTo(map);
var Minrathous_Qarinus_marker = L.Marker.movingMarker(Minrathous_Qarinus, 40000, {
    destination: Minrathous_Qarinus,
    autostart: true,
    loop: true,
    icon: ship_marker
}).addTo(map);
map.addLayer(Minrathous_Qarinus_marker);
Minrathous_Qarinus_marker.start();
var QarinusW_Antiva = [
    [47.872144, 20.390625],
    [53.278353, 27.773438],
    [55.776573, 41.748047],
    [54.876607, 73.212891],
    [56.897004, 82.705078],
    [61.980267, 92.197266],
    [62.593341, 104.238281],
    [59.933, 109.951172],
    [28.998532, 111.884766],
    [22.674847, 105.205078],
    [22.105999, 102.65625],
    [19.186678, 100.634766],
    [18.604601, 97.163086],
    [23.80545, 81.254883],
    [23.84565, 75.498047],
    [23.80545, 81.254883],
    [18.604601, 97.163086],
    [19.186678, 100.634766],
    [22.105999, 102.65625],
    [22.674847, 105.205078],
    [28.998532, 111.884766],
    [59.933, 109.951172],
    [62.593341, 104.238281],
    [61.980267, 92.197266],
    [56.897004, 82.705078],
    [54.876607, 73.212891],
    [55.776573, 41.748047],
    [53.278353, 27.773438],
    [47.872144, 20.390625]
];
var QarinusW_Antiva_line = L.polyline([
    [47.872144, 20.390625],
    [53.278353, 27.773438],
    [55.776573, 41.748047],
    [54.876607, 73.212891],
    [56.897004, 82.705078],
    [61.980267, 92.197266],
    [62.593341, 104.238281],
    [59.933, 109.951172],
    [28.998532, 111.884766],
    [22.674847, 105.205078],
    [22.105999, 102.65625],
    [19.186678, 100.634766],
    [18.604601, 97.163086],
    [23.80545, 81.254883],
    [23.84565, 75.498047]
], {
    className: "water-route"
});
QarinusW_Antiva_line.addTo(map);
var QarinusW_Antiva_marker = L.Marker.movingMarker(QarinusW_Antiva, 40000, {
    destination: QarinusW_Antiva,
    autostart: true,
    loop: true,
    icon: ship_marker
}).addTo(map);
map.addLayer(QarinusW_Antiva_marker);
QarinusW_Antiva_marker.start();
var Minrathous_Vol = [
    [52.375599, -22.763672],
    [52.160455, -23.686523],
    [51.289406, -25.180664],
    [50.708634, -25.576172],
    [50.317408, -26.323242],
    [49.979488, -26.674805],
    [49.61071, -27.905273],
    [46.012224, -30.454102],
    [43.675818, -31.508789],
    [43.2932, -31.948242],
    [42.940339, -31.904297],
    [42.358544, -32.563477],
    [41.046217, -32.563477],
    [39.232253, -33.442383],
    [37.822802, -35.068359],
    [36.949892, -35.90332],
    [36.279707, -35.419922],
    [35.85344, -35.551758],
    [34.813803, -36.430664],
    [34.415973, -36.386719],
    [34.198173, -36.210938],
    [33.063924, -36.958008],
    [31.802893, -37.177734],
    [31.54109, -37.397461],
    [30.524413, -37.485352],
    [30.334954, -37.30957],
    [29.688053, -37.353516],
    [29.343875, -36.782227],
    [28.188244, -36.254883],
    [27.683528, -36.298828],
    [26.39187, -35.771484],
    [25.681137, -34.233398],
    [25.562265, -32.915039],
    [24.806681, -32.124023],
    [23.200961, -31.728516],
    [22.105999, -30.19043],
    [22.390714, -28.344727],
    [21.002471, -25.927734],
    [21.166484, -24.916992],
    [20.797201, -24.345703],
    [19.47695, -24.697266],
    [19.47695, -23.730469],
    [18.604601, -22.587891],
    [17.895114, -22.675781],
    [16.88866, -21.796875],
    [17.014768, -21.181641],
    [13.966054, -18.500977],
    [13.11158, -18.588867],
    [8.537565, -14.458008],
    [8.276727, -12.832031],
    [6.533645, -9.404297],
    [9.102097, -6.416016],
    [10.53102, -3.999023],
    [11.953349, -2.109375],
    [12.168226, 0.65918],
    [12.425848, 1.801758],
    [13.239945, 3.603516],
    [12.425848, 5.273438],
    [11.738302, 5.449219],
    [10.919618, 6.328125],
    [10.876465, 7.338867],
    [10.444598, 8.217773],
    [10.401378, 11.777344],
    [10.444598, 8.217773],
    [10.876465, 7.338867],
    [10.919618, 6.328125],
    [11.738302, 5.449219],
    [12.425848, 5.273438],
    [13.239945, 3.603516],
    [12.425848, 1.801758],
    [12.168226, 0.65918],
    [11.953349, -2.109375],
    [10.53102, -3.999023],
    [9.102097, -6.416016],
    [6.533645, -9.404297],
    [8.276727, -12.832031],
    [8.537565, -14.458008],
    [13.11158, -18.588867],
    [13.966054, -18.500977],
    [17.014768, -21.181641],
    [16.88866, -21.796875],
    [17.895114, -22.675781],
    [18.604601, -22.587891],
    [19.47695, -23.730469],
    [19.47695, -24.697266],
    [20.797201, -24.345703],
    [21.166484, -24.916992],
    [21.002471, -25.927734],
    [22.390714, -28.344727],
    [22.105999, -30.19043],
    [23.200961, -31.728516],
    [24.806681, -32.124023],
    [25.562265, -32.915039],
    [25.681137, -34.233398],
    [26.39187, -35.771484],
    [27.683528, -36.298828],
    [28.188244, -36.254883],
    [29.343875, -36.782227],
    [29.688053, -37.353516],
    [30.334954, -37.30957],
    [30.524413, -37.485352],
    [31.54109, -37.397461],
    [31.802893, -37.177734],
    [33.063924, -36.958008],
    [34.198173, -36.210938],
    [34.415973, -36.386719],
    [34.813803, -36.430664],
    [35.85344, -35.551758],
    [36.279707, -35.419922],
    [36.949892, -35.90332],
    [37.822802, -35.068359],
    [39.232253, -33.442383],
    [41.046217, -32.563477],
    [42.358544, -32.563477],
    [42.940339, -31.904297],
    [43.2932, -31.948242],
    [43.675818, -31.508789],
    [46.012224, -30.454102],
    [49.61071, -27.905273],
    [49.979488, -26.674805],
    [50.317408, -26.323242],
    [50.708634, -25.576172],
    [51.289406, -25.180664],
    [51.289406, -25.180664],
    [52.160455, -23.686523],
    [52.375599, -22.763672]
];
var Minrathous_Vol_marker = L.Marker.movingMarker(Minrathous_Vol, 40000, {
    destination: Minrathous_Vol,
    autostart: true,
    loop: true,
    icon: wagon_marker
}).addTo(map);
map.addLayer(Minrathous_Vol_marker);
Minrathous_Vol_marker.start();
var Qarinus_Antiva = [
    [46.980252, 20.170898],
    [41.771312, 32.695313],
    [22.350076, 58.051758],
    [20.385825, 58.359375],
    [20.13847, 58.930664],
    [21.125498, 61.171875],
    [20.673905, 62.314453],
    [20.879343, 63.457031],
    [20.303418, 65.34668],
    [21.289374, 67.236328],
    [23.200961, 67.236328],
    [24.166802, 69.785156],
    [23.200961, 71.499023],
    [23.926013, 72.861328],
    [23.765237, 75.058594],
    [23.926013, 72.861328],
    [23.200961, 71.499023],
    [24.166802, 69.785156],
    [23.200961, 67.236328],
    [21.289374, 67.236328],
    [20.303418, 65.34668],
    [20.879343, 63.457031],
    [20.673905, 62.314453],
    [21.125498, 61.171875],
    [20.13847, 58.930664],
    [20.385825, 58.359375],
    [22.350076, 58.051758],
    [41.771312, 32.695313],
    [46.980252, 20.170898]
];
var Qarinus_Antiva_line = L.polyline([
    [46.980252, 20.170898],
    [41.771312, 32.695313],
    [22.350076, 58.051758],
    [20.385825, 58.359375],
    [20.13847, 58.930664],
    [21.125498, 61.171875],
    [20.673905, 62.314453],
    [20.879343, 63.457031],
    [20.303418, 65.34668],
    [21.289374, 67.236328],
    [23.200961, 67.236328],
    [24.166802, 69.785156],
    [23.200961, 71.499023],
    [23.926013, 72.861328],
    [23.765237, 75.058594]
], {
    className: "water-route"
});
Qarinus_Antiva_line.addTo(map);
var Qarinus_Antiva_marker = L.Marker.movingMarker(Qarinus_Antiva, 40000, {
    destination: Qarinus_Antiva,
    autostart: true,
    loop: true,
    icon: wagon_marker
}).addTo(map);
map.addLayer(Qarinus_Antiva_marker);
Qarinus_Antiva_marker.start();
var Orzammar_Denerim = [
    [-48.951366, 8.745117],
    [-49.267805, 8.789063],
    [-49.639177, 9.360352],
    [-49.866317, 10.327148],
    [-50.148746, 10.458984],
    [-50.317408, 11.733398],
    [-50.120578, 12.480469],
    [-50.317408, 12.612305],
    [-50.513427, 12.041016],
    [-50.986099, 11.733398],
    [-51.426614, 12.700195],
    [-52.268157, 13.40332],
    [-52.268157, 14.106445],
    [-52.079506, 14.633789],
    [-52.187405, 14.941406],
    [-51.781436, 15.46875],
    [-51.672555, 15.952148],
    [-51.096623, 16.523438],
    [-50.708634, 17.314453],
    [-50.261254, 18.369141],
    [-49.809632, 18.676758],
    [-49.353756, 18.808594],
    [-49.009051, 19.599609],
    [-48.487486, 19.819336],
    [-47.960502, 20.214844],
    [-47.546872, 21.09375],
    [-47.338823, 21.75293],
    [-47.040182, 24.741211],
    [-47.249407, 25.839844],
    [-47.635784, 26.71875],
    [-47.219568, 27.949219],
    [-47.338823, 28.740234],
    [-47.249407, 29.355469],
    [-46.739861, 29.53125],
    [-46.377254, 29.970703],
    [-44.871443, 30.146484],
    [-44.465151, 30.629883],
    [-44.056012, 30.849609],
    [-42.940339, 32.695313],
    [-42.650122, 33.486328],
    [-42.617791, 35.683594],
    [-42.358544, 36.738281],
    [-42.293564, 38.012695],
    [-42.423457, 39.243164],
    [-42.650122, 40.78125],
    [-42.617791, 41.704102],
    [-42.358544, 42.583008],
    [-42.326062, 43.242188],
    [-42.682435, 43.242188],
    [-42.714732, 43.725586],
    [-42.5207, 43.945313],
    [-42.455888, 44.384766],
    [-42.163403, 44.648438],
    [-42.130821, 45.351563],
    [-42.455888, 46.230469],
    [-42.488302, 48.383789],
    [-42.163403, 50.493164],
    [-41.574361, 52.602539],
    [-41.541478, 53.833008],
    [-41.47566, 55.239258],
    [-41.574361, 56.162109],
    [-41.771312, 57.128906],
    [-41.705729, 58.359375],
    [-41.672912, 59.0625],
    [-42.032974, 60.029297],
    [-42.5207, 61.567383],
    [-42.811522, 61.611328],
    [-42.940339, 62.006836],
    [-42.875964, 62.62207],
    [-43.325178, 63.325195],
    [-43.580391, 63.413086],
    [-43.866218, 63.764648],
    [-44.245199, 63.984375],
    [-45.95115, 64.291992],
    [-46.255847, 64.511719],
    [-46.498392, 65.039063],
    [-46.860191, 65.126953],
    [-47.010226, 65.126953],
    [-47.189712, 65.610352],
    [-47.606163, 65.961914],
    [-47.754098, 65.698242],
    [-47.872144, 65.698242],
    [-47.901614, 66.225586],
    [-48.166085, 66.708984],
    [-48.283193, 66.972656],
    [-49.095452, 66.665039],
    [-48.283193, 66.972656],
    [-48.166085, 66.708984],
    [-47.901614, 66.225586],
    [-47.872144, 65.698242],
    [-47.754098, 65.698242],
    [-47.606163, 65.961914],
    [-47.189712, 65.610352],
    [-47.010226, 65.126953],
    [-46.860191, 65.126953],
    [-46.498392, 65.039063],
    [-46.255847, 64.511719],
    [-45.95115, 64.291992],
    [-44.245199, 63.984375],
    [-43.866218, 63.764648],
    [-43.580391, 63.413086],
    [-43.325178, 63.325195],
    [-42.875964, 62.62207],
    [-42.940339, 62.006836],
    [-42.811522, 61.611328],
    [-42.5207, 61.567383],
    [-42.032974, 60.029297],
    [-41.672912, 59.0625],
    [-41.705729, 58.359375],
    [-41.771312, 57.128906],
    [-41.574361, 56.162109],
    [-41.47566, 55.239258],
    [-41.541478, 53.833008],
    [-41.574361, 52.602539],
    [-42.163403, 50.493164],
    [-42.488302, 48.383789],
    [-42.455888, 46.230469],
    [-42.130821, 45.351563],
    [-42.163403, 44.648438],
    [-42.455888, 44.384766],
    [-42.5207, 43.945313],
    [-42.714732, 43.725586],
    [-42.682435, 43.242188],
    [-42.326062, 43.242188],
    [-42.358544, 42.583008],
    [-42.617791, 41.704102],
    [-42.650122, 40.78125],
    [-42.423457, 39.243164],
    [-42.293564, 38.012695],
    [-42.358544, 36.738281],
    [-42.617791, 35.683594],
    [-42.650122, 33.486328],
    [-42.940339, 32.695313],
    [-44.056012, 30.849609],
    [-44.465151, 30.629883],
    [-44.871443, 30.146484],
    [-46.377254, 29.970703],
    [-46.739861, 29.53125],
    [-47.249407, 29.355469],
    [-47.338823, 28.740234],
    [-47.219568, 27.949219],
    [-47.635784, 26.71875],
    [-47.249407, 25.839844],
    [-47.040182, 24.741211],
    [-47.338823, 21.75293],
    [-47.546872, 21.09375],
    [-47.960502, 20.214844],
    [-48.487486, 19.819336],
    [-49.009051, 19.599609],
    [-49.353756, 18.808594],
    [-49.809632, 18.676758],
    [-50.261254, 18.369141],
    [-50.708634, 17.314453],
    [-51.096623, 16.523438],
    [-51.672555, 15.952148],
    [-51.781436, 15.46875],
    [-52.187405, 14.941406],
    [-52.079506, 14.633789],
    [-52.268157, 14.106445],
    [-52.268157, 13.40332],
    [-51.426614, 12.700195],
    [-50.986099, 11.733398],
    [-50.513427, 12.041016],
    [-50.317408, 12.612305],
    [-50.120578, 12.480469],
    [-50.317408, 11.733398],
    [-50.148746, 10.458984],
    [-49.866317, 10.327148],
    [-49.639177, 9.360352],
    [-49.267805, 8.789063],
    [-48.951366, 8.745117]
];
var Orzammar_Denerim_marker = L.Marker.movingMarker(Orzammar_Denerim, 40000, {
    destination: Orzammar_Denerim,
    autostart: true,
    loop: true,
    icon: wagon_marker
}).addTo(map);
map.addLayer(Orzammar_Denerim_marker);
Orzammar_Denerim_marker.start();
var Val_Royeaux_Adamant = [
    [-45.336702, -32.651367],
    [-43.802819, -30.146484],
    [-42.617791, -31.201172],
    [-41.508577, -34.321289],
    [-40.044438, -36.738281],
    [-41.574361, -37.353516],
    [-42.55308, -37.924805],
    [-44.746733, -38.276367],
    [-44.559163, -40.253906],
    [-44.559163, -42.055664],
    [-44.964798, -43.417969],
    [-44.902578, -45.395508],
    [-44.653024, -46.40625],
    [-45.95115, -47.109375],
    [-46.498392, -47.636719],
    [-47.576526, -47.900391],
    [-49.781264, -51.196289],
    [-51.590723, -55.458984],
    [-51.508742, -69.960938],
    [-53.383328, -75.498047],
    [-51.508742, -69.960938],
    [-51.590723, -55.458984],
    [-49.781264, -51.196289],
    [-47.576526, -47.900391],
    [-46.498392, -47.636719],
    [-45.95115, -47.109375],
    [-44.653024, -46.40625],
    [-44.902578, -45.395508],
    [-44.964798, -43.417969],
    [-44.559163, -42.055664],
    [-44.559163, -40.253906],
    [-44.746733, -38.276367],
    [-42.55308, -37.924805],
    [-41.574361, -37.353516],
    [-40.044438, -36.738281],
    [-41.508577, -34.321289],
    [-42.617791, -31.201172],
    [-43.802819, -30.146484],
    [-45.336702, -32.651367]
];
var Val_Royeaux_Adamant_line = L.polyline([
    [-51.590723, -55.458984],
    [-51.508742, -69.960938],
    [-53.383328, -75.498047]
], {
    className: "water-route"
});
Val_Royeaux_Adamant_line.addTo(map);
var Val_Royeaux_Adamant_marker = L.Marker.movingMarker(Val_Royeaux_Adamant, 40000, {
    destination: Val_Royeaux_Adamant,
    autostart: true,
    loop: true,
    icon: wagon_marker
}).addTo(map);
map.addLayer(Val_Royeaux_Adamant_marker);
Val_Royeaux_Adamant_marker.start();
var Nevarra_Cumberland = [
    [-15.199386, -14.282227],
    [-17.769612, -5.361328],
    [-20.385825, -5.449219],
    [-22.958393, -6.503906],
    [-28.613459, -5.405273],
    [-30.751278, -5.712891],
    [-32.916485, -7.69043],
    [-30.751278, -5.712891],
    [-28.613459, -5.405273],
    [-22.958393, -6.503906],
    [-20.385825, -5.449219],
    [-17.769612, -5.361328],
    [-15.199386, -14.282227]
];
var Nevarra_Cumberland_line = L.polyline([
    [-15.199386, -14.282227],
    [-17.769612, -5.361328]
], {
    className: "water-route"
});
Nevarra_Cumberland_line.addTo(map);
var Nevarra_Cumberland_marker = L.Marker.movingMarker(Nevarra_Cumberland, 40000, {
    destination: Nevarra_Cumberland,
    autostart: true,
    loop: true,
    icon: wagon_marker
}).addTo(map);
map.addLayer(Nevarra_Cumberland_marker);
Nevarra_Cumberland_marker.start();
var Qarinus_Minrathous = [
    [47.219568, 20.170898],
    [42.779275, 7.514648],
    [35.317366, 5.185547],
    [33.870416, 0.483398],
    [29.764377, -0.439453],
    [25.958045, -10.151367],
    [25.443275, -17.797852],
    [32.694866, -26.630859],
    [35.960223, -27.773438],
    [49.809632, -24.65332],
    [52.722986, -22.543945],
    [49.809632, -24.65332],
    [35.960223, -27.773438],
    [32.694866, -26.630859],
    [25.443275, -17.797852],
    [25.958045, -10.151367],
    [29.764377, -0.439453],
    [33.870416, 0.483398],
    [35.317366, 5.185547],
    [42.779275, 7.514648],
    [47.219568, 20.170898]
];
var Qarinus_Minrathous_line = L.polyline([
    [47.219568, 20.170898],
    [42.779275, 7.514648],
    [35.317366, 5.185547],
    [33.870416, 0.483398],
    [29.764377, -0.439453],
    [25.958045, -10.151367],
    [25.443275, -17.797852],
    [32.694866, -26.630859],
    [35.960223, -27.773438],
    [49.809632, -24.65332],
    [52.722986, -22.543945]
], {
    className: "water-route"
});
Qarinus_Minrathous_line.addTo(map);
var Qarinus_Minrathous_marker = L.Marker.movingMarker(Qarinus_Minrathous, 40000, {
    destination: Qarinus_Minrathous,
    autostart: true,
    loop: true,
    icon: wagon_marker
}).addTo(map);
map.addLayer(Qarinus_Minrathous_marker);
Qarinus_Minrathous_marker.start();
var farelden = [
    [-45.58329, 9.316406],
    [-48.283193, 4.042969],
    [-51.289406, -5.976563],
    [-60.802064, -4.833984],
    [-66.337505, -3.867188],
    [-70.318738, 0.087891],
    [-69.503765, 19.248047],
    [-65.256706, 35.595703],
    [-64.886265, 52.910156],
    [-69.503765, 62.138672],
    [-61.980267, 93.955078],
    [-56.12106, 93.427734],
    [-39.707187, 70.839844],
    [-37.788081, 63.193359],
    [-34.307144, 52.822266],
    [-36.668419, 24.873047],
    [-40.780541, 14.0625],
    [-45.58329, 9.316406]
];
var farelden_poly = L.polygon(farelden, {
    className: "farelden_reg"
}).bindPopup('<center><h2><b>Ферелден</b></h2><hr><img src="images/Theirin_heraldry.png" width="100" height="100"><br><b>Столица:</b> Денерим<br><b>Форма правления:</b> феодальная монархия<br><b>Правители:</b> король Алистер Тейрин, королева Анора Тейрин (Мак Тир)<br><b>Население:</b> ~ 1 500 000 душ<br><b>Государственный язык:</b> торговый<br><b>Государственная религия:</b> андрастианство<br><b>Политико-экономическое состояние:</b> гражданская война между королём Алистером и королевой Анорой. Сторонники Алистера официально в состоянии войны с Корифеем.</center>').addTo(map);
var orlais = [
    [-45.58329, 9.316406],
    [-48.283193, 4.042969],
    [-51.289406, -5.976563],
    [-60.802064, -4.833984],
    [-66.337505, -3.867188],
    [-70.318738, 0.087891],
    [-70.289117, -5.185547],
    [-66.998844, -9.755859],
    [-65.838776, -24.433594],
    [-66.652977, -43.769531],
    [-70.259452, -51.679688],
    [-70.318738, -81.826172],
    [-62.593341, -98.173828],
    [-52.536273, -107.226563],
    [-46.55886, -124.013672],
    [-37.579413, -134.560547],
    [-16.720385, -130.429688],
    [-7.885147, -110.742188],
    [0.527336, -72.421875],
    [-3.864255, -58.535156],
    [-8.581021, -56.953125],
    [-26.509905, -36.914063],
    [-36.244273, -12.744141],
    [-45.58329, 9.316406]
];
var orlais_poly = L.polygon(orlais, {
    className: "orlais_reg"
}).bindPopup('<center><h2><b>Орлей</b></h2><hr><img src="images/Orlei_heraldry.png" width="100" height="100"><br><b>Столица: </b> Вал Руайо<br><b>Форма правления: </b> абсолютная монархия<br><b>Правитель:</b> императрица Флорианна де Шалон<br><b>Население: </b> ~ 4 500 000 душ<br><b>Государственный язык: </b> орлейский <br><b>Государственная религия: </b> андрастианство (до переворота)<br><b>Политико-экономическое состояние: </b> захвачен Корифеем. Ведутся попытки организовать сопротивление.</center>').addTo(map);
var nevarra = [
    [0.527336, -72.421875],
    [-3.864255, -58.535156],
    [-8.581021, -56.953125],
    [-26.509905, -36.914063],
    [-36.244273, -12.744141],
    [-33.72434, -1.450195],
    [0.878872, 7.382813],
    [2.986927, -21.621094],
    [7.885147, -36.386719],
    [0.527336, -72.421875]
];
var nevarra_poly = L.polygon(nevarra, {
    className: "nevarra_reg"
}).bindPopup('<center><h2><b>Неварра</b></h2><hr><img src="images/nevarra_heraldry.png" width="100" height="100"><br><b>Столица: </b> Неварра<br><b>Форма правления: </b> монархия<br><b>Правитель: </b> король Маркус Пентагаст<br><b>Население: </b> ~ 2 200 000 душ<br><b>Государственный язык: </b> орлейский (орлесианский)<br><b>Государственная религия: </b> андрастианство<br><b>Политико-экономическое положение: </b> сохраняет нейтралитет.</center>').addTo(map);
var anderfels = [
    [-16.720385, -130.429688],
    [-7.885147, -110.742188],
    [0.527336, -72.421875],
    [25.165173, -42.451172],
    [47.040182, -41.572266],
    [65.766727, -51.328125],
    [60.673179, -86.748047],
    [49.267805, -126.650391],
    [48.166085, -134.736328],
    [-16.720385, -130.429688]
];
var anderfels_poly = L.polygon(anderfels, {
    className: "anderfels_reg"
}).bindPopup('<center><h2><b>Андерфелс</b></h2><hr><img src="images/Anderfels_heraldry.png" width="100" height="100"><br><b>Столица: </b> Хоссберг<br><b>Форма правления: </b> монархия<br><b>Правитель: </b> король Вильгельм Августин<br><b>Население: </b> ~ 1 400 000 душ<br><b>Государственный язык: </b> андерский<br><b>Государственная религия: </b> андрастианство<br><b>Политико-экономическое положение: </b> сохраняет нейтралитет.</center>').addTo(map);
var tevinter = [
    [0.527336, -72.421875],
    [25.165173, -42.451172],
    [47.040182, -41.572266],
    [64.320872, -30.498047],
    [66.443107, -24.873047],
    [65.330178, -19.6875],
    [59.623325, -16.699219],
    [52.961875, -11.469727],
    [48.864715, 1.054688],
    [55.627996, 10.942383],
    [56.992883, 15.117188],
    [53.330873, 60.205078],
    [40.979898, 54.09668],
    [21.248422, 34.628906],
    [11.350797, 28.828125],
    [1.318243, 21.005859],
    [0.878872, 7.382813],
    [2.986927, -21.621094],
    [7.885147, -36.386719],
    [0.527336, -72.421875]
];
var tevinter_poly = L.polygon(tevinter, {
    className: "tevinter_reg"
}).bindPopup('<center><h2><b>Тевинтер</b></h2><hr><img src="images/Tevinter_imperium_heraldry.png" width="100" height="100"><br><b>Столица: </b> Минратос<br><b>Форма правления: </b> магократия<br><b>Правитель: </b> архонт Радонис<br><b>Население: </b> ~ 7 200 000 душ<br><b>Государственный язык: </b> тевин (практически вытеснен торговым)<br><b>Государственная религия: </b> северное андрастианство<br><b>Политико-экономическая ситуация: </b> назревает гражданская война. Официально в состоянии войны с Корифеем.</center>').addTo(map);
var free_marches = [
    [11.350797, 28.828125],
    [1.318243, 21.005859],
    [0.878872, 7.382813],
    [-33.72434, -1.450195],
    [-39.095963, 2.988281],
    [-35.675147, 27.597656],
    [-27.916767, 63.632813],
    [-16.467695, 87.626953],
    [4.477856, 92.373047],
    [11.350797, 28.828125]
];
var free_marches_poly = L.polygon(free_marches, {
    className: "free_marches_reg"
}).bindPopup('<center><h2><b>Вольная Марка</b></h2><hr><img src="images/starkheaven_heraldry.png" width="100" height="100"><br><b>Форма правления: </b> конфедерация городов-государств<br><b>Население: </b> ~ 3 250 000 душ<br><b>Государственный язык: </b> торговый<br><b>Государственная религия: </b> андрастианство<br><b>Политико-экономическая ситуация: </b> гражданская война. Большинство городов сохраняют нейтралитет в войне с Корифеем.</center>').addTo(map);
var antiva = [
    [4.477856, 92.373047],
    [11.350797, 28.828125],
    [21.248422, 34.628906],
    [40.979898, 54.09668],
    [53.330873, 60.205078],
    [53.014783, 69.521484],
    [49.239121, 72.861328],
    [20.468189, 90.087891],
    [5.703448, 91.801758],
    [4.477856, 92.373047]
];
var antiva_poly = L.polygon(antiva, {
    className: "antiva_reg"
}).bindPopup('<center><h2><b>Антива</b></h2><hr><img src="images/Antivan_Crows_heraldry.png" width="100" height="100"><br><b>Столица: </b> Антива<br><b>Форма правления: </b> плутократия<br><b>Правитель: </b> король Фульгено II<br><b>Население: </b> ~ 2 900 000 душ<br><b>Государственный язык: </b> антиванский<br><b>Государственная религия: </b> андрастианство<br><b>Политико-экономическая ситуация: </b> сохраняет нейтралитет. Поддерживает торговые отношения с Инквизицией.</center>').addTo(map);
var rivain = [
    [49.239121, 72.861328],
    [20.550509, 90.087891],
    [7.841615, 100.019531],
    [9.492408, 107.797852],
    [44.590467, 113.730469],
    [60.457218, 106.435547],
    [62.062733, 98.4375],
    [55.078367, 78.662109],
    [49.239121, 72.861328]
];
var rivain_poly = L.polygon(rivain, {
    className: "rivain_reg"
}).bindPopup('<center><h2><b>Ривейн</b></h2><hr><img src="images/rivain_heraldry.png" width="100" height="100"><br><b>Столица: </b> Дарсмуд<br><b>Форма правления: </b> монархия<br><b>Правитель: </b> королева Ривейна<br><b>Население: </b> ~ 2 150 000 душ<br><b>Государственный язык: </b> ривейнски<br><b>Государственные религии: </b> андрастианство (только в столице), пантеизм, Кун<br><b>Политико-экономическая ситуация: </b> сохраняет нейтралитет.</center>').addTo(map);
var donarks = [
    [65.766727, -51.328125],
    [60.673179, -86.748047],
    [49.267805, -126.650391],
    [48.166085, -134.736328],
    [62.995158, -134.560547],
    [70.524897, -134.560547],
    [70.554179, -54.931641],
    [69.240579, -52.294922],
    [68.688521, -53.525391],
    [67.991108, -51.987305],
    [65.766727, -51.328125]
];
var donarks_poly = L.polygon(donarks, {
    className: "tevinter_reg"
}).bindPopup('<center><h2><b>Донаркс</b></h2><hr><img src="images/Tevinter_imperium_heraldry.png" width="100" height="100"><br><b>Столица: </b> Минратос<br><b>Форма правления: </b> магократия<br><b>Правитель: </b> архонт Радонис<br><b>Население: </b> ~ 7 200 000 душ<br><b>Государственный язык: </b> тевин (практически вытеснен торговым)<br><b>Государственная религия: </b> северное андрастианство<br><b>Политико-экономическая ситуация: </b> назревает гражданская война. Официально в состоянии войны с Корифеем.</center>').addTo(map);
var seheron_and_par_vollen = [
    [70.539543, -16.962891],
    [70.524897, 125.463867],
    [64.774125, 118.300781],
    [56.511018, 31.464844],
    [57.160078, 15.996094],
    [50.819818, -3.295898],
    [58.745407, -17.226563],
    [66.231457, -20.039063],
    [70.539543, -16.962891]
];
var seheron_and_par_vollen_poly = L.polygon(seheron_and_par_vollen, {
    className: "seheron_and_par_vollen_reg"
}).bindPopup('<center><h2><b>Сегерон и Пар Воллен</b></h2><hr><img src="images/Qunari_House_of_Tides_heraldry.png" width="100" height="100"><br><b>Столица: </b> Кунандар<br><b>Форма правления: </b> триумвират<br><b>Правители: </b> Аришок, Аригена, Арикун<br><b>Население: </b> ~ 3 250 000 душ<br><b>Государственный язык: </b> кунлат<br><b>Государственная религия: </b> Кун<br><b>Политико-экономическая ситуация: </b> сохраняют нейтралитет и наблюдают за ситуацией на континенте, готовясь нанести удар по победителю для последующего завоевания.</center>').addTo(map);


// 
// 
// GRID
// Changes
// var mapNE = [700, 6750],
//     mapSW = [7500, 1500];
// + import
var rects = {};

function coordsToKey(coords) {
    return coords.x + ':' + coords.y + ':' + coords.z;
}

// var screenwidth = 1366;
// make a new VirtualGrid
var grid = new VirtualGrid({
    cellSize: 6000 / 64
});

// when new cells come into view...
grid.on('cellcreate', function(e) {
    rects[coordsToKey(e.coords)] = L.rectangle(e.bounds, {
        color: '#000',
        weight: 1.5,
        opacity: 0.8,
        fillOpacity: 0
    }).addTo(map);
});

grid.on('cellenter', function(e) {
    var rect = rects[coordsToKey(e.coords)];
    map.addLayer(rect);
});

grid.on('cellleave', function(e) {
    var rect = rects[coordsToKey(e.coords)];
    map.removeLayer(rect);
});

// grid.addTo(map);



var lg_1 = L.layerGroup([skyhold, gessarian_camp, du_cordo, revasan, bronak]);
var lg_2 = L.layerGroup([suledin, adamant, amarantain, korifei_camp, dumat, terinfall, kaer_oswin, griphon_wing, soldier_height]);
var lg_3 = L.layerGroup([mital, lost_dirtamena, grey_guardians, ostagar, eonar, velanis, velabanchel, akhaaz, elim]);
var lg_4 = L.layerGroup([amarantain_battle, west_holm, korifei_tewinter]);
var lg_5 = L.layerGroup([tellari_swamp, kirkwall, inner_place, stormshore, du_lion, holyplains, emerald_graves, west_rich, hissing_wastes, crosswood, frostback_basin, hundred_pillars, perendeil, donark, high_reaches, white_peak]);
var lg_6 = L.layerGroup([west_legion, watchers_fleet, south_legion_fleet, north_lefion, east_legion, south_legion, donarks_base, central_legion]);
var lg_7 = L.layerGroup([farelden_poly, orlais_poly, nevarra_poly, anderfels_poly, tevinter_poly, free_marches_poly, antiva_poly, rivain_poly, donarks_poly, seheron_and_par_vollen_poly]).addTo(map);
var lg_8 = L.layerGroup([grid]);
var lg_9 = L.layerGroup().addTo(map);
var overlays = {
    "Инквизиция и союзники": lg_1,
    "Силы Старшего": lg_2,
    "Силы Тевинтера": lg_6,
    "Нейтральные крепости": lg_3,
    "Места сражений": lg_4,
    "Гнезда драконов": lg_5,
    "Границы стран": lg_7,
    "Координатная сетка": lg_8,
    "Метки игроков": lg_9
};
L.control.layers(null, overlays, {
    collapsed: false
}).addTo(map);
L.control.fullscreen({
    position: "topleft",
    title: "",
    titleCancel: "",
    content: null,
    forceSeparateButton: true,
    forcePseudoFullscreen: false,
    fullscreenElement: false
}).addTo(map);

map.addControl(new customControl());