var mapSW =[0, 8192],
	mapNE =[8192, 0];

//initialize map object
var map = L.map('map').setView([0,0], 4);

//Reference tiles
L.tileLayer('map/{z}/{x}/{y}.png', {
	minZoom: 3,
	maxZoom: 5,
	continuousWorld: false,
	noWrap: true,
	crs: L.CRS.Simple,
	edgeBufferTiles: 2,
}).addTo(map)

map.setMaxBounds(new L.LatLngBounds(
	map.unproject(mapSW, map.getMaxZoom()),
	map.unproject(mapNE, map.getMaxZoom())
	));


//Icons

var venatori = L.icon({
	iconUrl: '/images/Venatori_banner.png',
	iconSize: [53, 100],
	iconAnchor: [35, 96],
	popupAnchor: [-15, -95],
	shadowUrl: '/images/Venatori_fade.png',
	shadowSize: [53, 100],
	shadowAnchor: [35, 96],
})

var inquisition = L.icon({
	iconUrl: '/images/Inquisition_banner.png',
	iconSize: [53, 100],
	iconAnchor: [29, 89],
	popupAnchor: [26, -4],
	shadowUrl: '/images/Inquisition_fade.png',
	shadowSize: [53, 100],
	shadowAnchor: [29, 89],
})

var Tevinter = L.icon({
	iconUrl: '/images/Tevinter_banner.png',
	iconSize: [53, 100],
	iconAnchor: [29, 91],
	popupAnchor: [26, -4],
	shadowUrl: '/images/Tevinter_fade.png',
	shadowSize: [53, 100],
	shadowAnchor: [29, 91],
})

var battle = L.icon({
	iconUrl: '/images/battle.png',
	iconSize: [60, 60],
	iconAnchor: [30, 30],
	popupAnchor: [2, -23],
	shadowUrl: '/images/battle_fade.png',
	shadowSize: [60, 60],
	shadowAnchor: [22, 38],
})

var dragon = L.icon({
	iconUrl: '/images/dragon.png',
	iconSize: [100, 120],
	iconAnchor: [50, 60],
	popupAnchor: [0, -28],
	shadowUrl: '/images/dragon_fade.png',
	shadowSize: [100, 120],
	shadowAnchor: [50, 60],
})

var neutral = L.icon({
	iconUrl: '/images/Neitral.png',
	iconSize: [53, 100],
	iconAnchor: [35, 96],
	popupAnchor: [-10, -95],
	shadowUrl: '/images/Neitral_fade.png',
	shadowSize: [53, 100],
	shadowAnchor: [35, 96],
})


//Markers (flags)
var referenceflag = L.marker([0, 0], {
	draggable: true,
}).addTo(map);
referenceflag.bindPopup('<b>REFERENCE</b>').openPopup();
//текущая гео
referenceflag.on('dragend', function(e) {
	referenceflag.getPopup().setContent(referenceflag.getLatLng().toString() + "<br />" + 'Pixels ' + map.project(referenceflag.getLatLng(), map.getMaxZoom().toString())).openOn(map);
});

//Flags neutral

var mital = L.marker([-67.892086, -26.323242], {icon: neutral})
.bindPopup('<center><b>Храм Митал</b></center><hr>Предположительно заброшен')

var lost_dirtamena = L.marker([-42.032974, -22.543945], {icon: neutral})
.bindPopup('<center><b>Потерянный храм Диртамена</b></center><hr>Заброшен')

var grey_guardians = L.marker([-24.647017, 35.771484], {icon: neutral})
.bindPopup('<center><b>Темница Серых Стражей</b></center><hr>Бывшая тюрьма Корифея. Заброшена')

var ostagar = L.marker([-64.699105, 42.231445], {icon: neutral})
.bindPopup('<center><b>Остагар</b></center><hr>Заброшенные руины древней тевинтерской крепости')

var eonar = L.marker([-50.680797, 8.657227], {icon: neutral})
.bindPopup('<center><b>Эонар</b></center><hr>Бывшая тевинтерская крепость. Ныне тюрьма для магов')

var velanis = L.marker([58.170702, 8.217773], {icon: neutral})
.bindPopup('<center><b>Ас Веланис</b></center><hr>Тевинтерская крепость. Ныне занята кунари')

var velabanchel = L.marker([29.152161, 77.299805], {icon: neutral})
.bindPopup('<center><b>Велабанчель</b></center><hr>Тюрьма под контролем Антиванских воронов')

var akhaaz = L.marker([63.587675, 14.326172], {icon: neutral})
.bindPopup('<center><b>Акхааз</b></center><hr>Крепость под контролем кунари')

var elim = L.marker([-2.196727, 45.791016], {icon: neutral})
.bindPopup('<center><b>Форт Элим</b></center><hr>Укреплённое поселение неподалёку от Кайтена')

//Flags inqusition group
var skyhold = L.marker([-53.618579, -0.878906], {icon: inquisition})
.bindPopup('<b>Скайхолд</b><hr>Стан Инквизиции')

var gessarian_camp = L.marker([-39.943436, 32.827148], {icon: inquisition})
.bindPopup('<b>Лагерь Клинков Гессариана</b><hr>Крупный лагерь Инквизиции на Штормовом берегу')

var du_cordo = L.marker([-61.918271, -29.750977], {icon: inquisition})
.bindPopup('<b>Цитадель дю Корбо</b><hr>Одна из крепостей Орлесианского Сопротивления')

var revasan = L.marker([-62.734601, -29.267578], {icon: inquisition})
.bindPopup('<b>Форт Ревасан</b><hr>Одна из крепостей Орлесианского Сопротивления')

var bronak = L.marker([-46.528635, 28.959961], {icon: inquisition})
.bindPopup('<b>Каэр Бронак</b><hr>Крепость Инквизиции возле Крествуда')

//Flags Elder group
var suledin = L.marker([-57.844751, -10.371094], {icon: venatori})
.bindPopup('<center><b>Крепость Суледин</b></center><hr>Руины древней эльфийской крепости. Захвачены красными храмовниками')

var adamant = L.marker([-53.383328, -75.498047], {icon: venatori})
.bindPopup('<center><b>Адамант</b></center><hr>Стан Орлесианских Серых Стражей, союзных Корифею')

var amarantain = L.marker([-38.444985, 61.259766], {icon: venatori})
.bindPopup('<center><b>Амарантайн</b></center><hr>Бывший стан Ферелденских Серых Стражей. Захвачен венатори и красными храмовниками')

var korifei_camp = L.marker([-0.351256, -17.753906], {icon: venatori})
.bindPopup('<center><b>Лагерь Корифея</b></center><hr>Временный лагерь основных сил Корифея')

var dumat = L.marker([-13.068777, -44.472656], {icon: venatori})
.bindPopup('<center><b>Храм Думата</b></center><hr>Древний храм, отданнй Корифеем своему генералу')

var terinfall = L.marker([-59.578851, 57.480469], {icon: venatori})
.bindPopup('<center><b>Цитадель Теринфаль</b></center><hr>Бывший тренировочный полигон Искателей Истины. Ныне стан красных храмовников в Ферелдене')

var kaer_oswin = L.marker([-50.007739, 51.108398], {icon: venatori})
.bindPopup('<center><b>Каэр Освин</b></center><hr>Бывшая вотчина банна Лорена. Пристанище Ордена Пламенного Обета')

var griphon_wing = L.marker([-57.421294, -87.099609], {icon: venatori})
.bindPopup('<center><b>Крепость Грифоновы Крылья</b></center><hr>Под контроллем венатори и Серых Стражей Орлея')

var soldier_height = L.marker([-38.513788, 52.382813], {icon: venatori})
.bindPopup('<center><b>Пик Солдата</b></center><hr>Бывшая крепость Серых Стражей Ферелдена. Захвачена венатори')

//Flags battles

var amarantain_battle = L.marker([-38.651198, 61.21582], {icon: battle})
.bindPopup('<center><b>Битва за Амарантайн</b></center><hr>7 Жнивеня, 9:42 Века Дракона')

var west_holm = L.marker([-43.897892, 33.793945], {icon: battle})
.bindPopup('<center><b>Битва за Западный Холм</b></center><hr>4 Первопада, 9:42 Века Дракона')

var korifei_tewinter = L.marker([9.579084, -9.008789], {icon: battle})
.bindPopup('<center><b>Битва армии Корифея и легионов Тевинтера</b></center><hr>14 Царепути, 9:42 Века Дракона')

//Flags Dragons group

var tellari_swamp = L.marker([19.394068, 55.810547], {icon: dragon})
.bindPopup('<center><b>Болота Теллари</b></center><hr>Кладка, охраняемая несколькими высшими драконицами, которые по неизвестной причине не передрались')

var kirkwall = L.marker([-29.113775, 26.850586], {icon: dragon})
.bindPopup('<center><b>Шахты близ Киркволла</b></center><hr>Кладка, лишившаяся самой большой драконицы несколько лет назад')

var inner_place = L.marker([-61.522695, 30.146484], {icon: dragon})
.bindPopup('<center><b>Внутренние земли</b></center><hr>Ферелденская морозница')

var stormshore = L.marker([-41.607228, 29.487305], {icon: dragon})
.bindPopup('<center><b>Штормовой берег</b></center><hr>Винсомер')

var du_lion = L.marker([-57.844751, -6.020508], {icon: dragon})
.bindPopup('<center><b>Эмприз-дю-Лион</b></center><hr>В горах замечены: Хивернал, Кальтенцан и Нагорный губитель')

var holyplains = L.marker([-64.206377, -29.619141], {icon: dragon})
.bindPopup('<center><b>Священные равнины</b></center><hr>Гаморданский бурегон')

var emerald_graves = L.marker([-64.774125, -16.259766], {icon: dragon})
.bindPopup('<center><b>Изумрудные могилы</b></center><hr>Большой Мистраль')

var west_rich = L.marker([-55.776573, -87.055664], {icon: dragon})
.bindPopup('<center><b>Западный предел</b></center><hr>Глубинная высшая драконица')

var hissing_wastes = L.marker([-49.15297, -84.243164], {icon: dragon})
.bindPopup('<center><b>Свистящие пустоши</b></center><hr>Песчаный плакальщик')

var crosswood = L.marker([-46.377254, 27.421875], {icon: dragon})
.bindPopup('<center><b>Крествуд</b></center><hr>Северный охотник')

var frostback_basin = L.marker([-68.007571, 4.570313], {icon: dragon})
.bindPopup('<center><b>Морозная котловина</b></center><hr>Огромный морозный дракон (на самом деле ― Гаккон Зимодых, возрождённый в теле дракона)')

var hundred_pillars = L.marker([38.099983, 28.740234], {icon: dragon})
.bindPopup('<center><b>Сто Столпов</b></center><hr>Местный дракон держится подальше от дворцов магистров, но порой нападает на караваны')

var perendeil = L.marker([-1.537901, -56.777344], {icon: dragon})
.bindPopup('<center><b>Перендейл</b></center><hr>Хантерхорнский шрайк')

var donark = L.marker([64.848937, -67.851563], {icon: dragon})
.bindPopup('<center><b>Донарк</b></center><hr>Дракон преимущественно держится ближе к горам')

var high_reaches = L.marker([45.890008, -39.638672], {icon: dragon})
.bindPopup('<center><b>Дальние обзоры</b></center><hr>Местный дракон периодически нападает на смотровые башни')

var white_peak = L.marker([51.013755, 59.018555], {icon: dragon})
.bindPopup('<center><b>Гора Белый Шпиль</b></center><hr>Кладка, охраняемая одной белой высшей драконицей')

//Tewinter Force

var west_legion = L.marker([8.450639, -9.580078], {icon: Tevinter})
.bindPopup('<center><b>Западный легион</b></center><hr>Общая численность ~50 тысяч душ<br>Управляется советом трибунов и префекта в отсутсвие Маркуса Люция')

var watchers_fleet = L.marker([54.72462, 31.552734], {icon: Tevinter})
.bindPopup('<center><b>Дозорный флот</b></center><hr>temp')

var south_legion_fleet = L.marker([-25.324167, 86.484375], {icon: Tevinter})
.bindPopup('<center><b>Флот южного легиона</b></center><hr>Полупустые корабли для переправки легиона из Камберленда в Джейдер<br>Ожидают воронов с приказами')

var north_lefion = L.marker([39.97712, -29.443359], {icon: Tevinter})
.bindPopup('<center><b>Северный легион</b></center><hr>Отозван с Сегерона в 9:41 ВД')

var east_legion = L.marker([42.098222, 19.863281], {icon: Tevinter})
.bindPopup('<center><b>Восточный легион</b></center><hr>temp')

var south_legion = L.marker([-4.127285, -6.152344], {icon: Tevinter})
.bindPopup('<center><b>Южный легион</b></center><hr>Продвигается в сторону Скайхолда под знаменами Инквизиции')

var donarks_base = L.marker([66.548263, -73.916016], {icon: Tevinter})
.bindPopup('<center><b>Ставка в Донарксе</b></center><hr>Хорошо охраняемая местность, где разводят редких боевых слонов для армии Тевинтера. Тут же проходят отбор и обучение воины из местных племен, пожелавшие вступить в легионы.')

var central_legion = L.marker([24.527135, 5.449219], {icon: Tevinter})
.bindPopup('<center><b>Легион центрального округа</b></center><hr>temp')

//Layer Groups

var lg_1 = L.layerGroup([skyhold, gessarian_camp, du_cordo, revasan, bronak]).addTo(map);
var lg_2 = L.layerGroup([suledin, adamant, amarantain, korifei_camp, dumat, terinfall, kaer_oswin, griphon_wing, soldier_height]).addTo(map);
var lg_3 = L.layerGroup([mital, lost_dirtamena, grey_guardians, ostagar, eonar, velanis, velabanchel, akhaaz, elim]).addTo(map);
var lg_4 = L.layerGroup([amarantain_battle, west_holm, korifei_tewinter]).addTo(map)
var lg_5 = L.layerGroup([tellari_swamp, kirkwall, inner_place, stormshore, du_lion, holyplains, emerald_graves, west_rich, hissing_wastes, crosswood, frostback_basin, hundred_pillars, perendeil, donark, high_reaches, white_peak]).addTo(map)
var lg_6 = L.layerGroup([west_legion, watchers_fleet, south_legion_fleet, north_lefion, east_legion, south_legion, donarks_base, central_legion]).addTo(map);


var overlays = {
	"Инквизиция и союзники" : lg_1,
	"Силы Старшего" : lg_2,
	"Силы Тевинтера" : lg_6,
	"Нейтральные крепости" : lg_3,
	"Места сражений" : lg_4,
	"Гнезда драконов" : lg_5,
}

//Layer control
L.control.layers(null, overlays, {
	collapsed: false,
}).addTo(map);

////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////

//Иконки маркеров для путей
// var test_mark = L.icon({
//   iconUrl: '/images/ship2.png',
//   iconSize: [77, 58],
//   iconAnchor: [36, 50],
//   // popupAnchor: [0, -80],
// });

var wagon_marker = L.icon({
  iconUrl: '/images/wagon.png',
  iconSize: [57, 38],
  iconAnchor: [24, 38],
  // popupAnchor: [0, -80],
});

var ship_marker = L.icon({
  iconUrl: '/images/Ship.png',
  iconSize: [45, 38],
  iconAnchor: [20, 35],
  // popupAnchor: [0, -80],
});




////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
/////////////////////Морские пути/////////////////////////


var Antiva_Dairsmuid = [ [23.84565, 75.058594], [37.649034, 95.537109], [23.84565, 75.058594] ];
var Antiva_Dairsmuid_line = L.polyline([ [23.84565, 75.058594], [37.649034, 95.537109] ], {
	className: 'water-route', //try to animate route and add average speed for marker
});
Antiva_Dairsmuid_line.addTo(map);

var Antiva_Dairsmuid_marker = L.Marker.movingMarker(Antiva_Dairsmuid, [6000, 6000], {
	destination: Antiva_Dairsmuid,
    autostart: true,
    loop: true,
    icon: ship_marker,
}).addTo(map);
map.addLayer(Antiva_Dairsmuid_marker);

Antiva_Dairsmuid_marker.start();

//////

var Cumberland_Jader = [ [-32.916485, -7.646484], [-44.496505, 6.899414], [-32.916485, -7.646484] ];
var Cumberland_Jader_line = L.polyline([ [-32.916485, -7.646484], [-44.496505, 6.899414] ], {
	className: 'water-route', //try to animate route and add average speed for marker
});
Cumberland_Jader_line.addTo(map);

var Cumberland_Jader_marker = L.Marker.movingMarker(Cumberland_Jader, [6000, 6000], {
	destination: Cumberland_Jader,
    autostart: true,
    loop: true,
    icon: ship_marker,
}).addTo(map);
map.addLayer(Cumberland_Jader_marker);

Cumberland_Jader_marker.start();

//////

var Qunandar_Kont_arr = [ [68.704486, 76.157227], [67.424364, 73.959961], [59.512029, 93.339844], [56.511018, 93.603516], [59.512029, 93.339844], [67.424364, 73.959961], [68.704486, 76.157227] ];
var Qunandar_Kont_arr_line = L.polyline([ [68.704486, 76.157227], [67.424364, 73.959961], [59.512029, 93.339844], [56.511018, 93.603516] ], {
	className: 'water-route', //try to animate route and add average speed for marker
});
Qunandar_Kont_arr_line.addTo(map);

var Qunandar_Kont_arr_marker = L.Marker.movingMarker(Qunandar_Kont_arr, [2000, 6000, 2000, 2000, 6000, 2000], {
	destination: Qunandar_Kont_arr,
    autostart: true,
    loop: true,
    icon: ship_marker,
}).addTo(map);
map.addLayer(Qunandar_Kont_arr_marker);

Qunandar_Kont_arr_marker.start();

//////

