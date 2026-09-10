// javascriptcode

// preloader
$(window).on('load', function() {
  setTimeout(function() {
    $('#preloader').css('opacity', '0');
    setTimeout(function() { $('#preloader').hide(); }, 800);
  }, 2200);
});

// navbarscroll
$(window).on('scroll', function() {
  if ($(this).scrollTop() > 60) $('#navbar').addClass('scrolled');
  else $('#navbar').removeClass('scrolled');
  revealOnScroll();
});

// revealscroll
function revealOnScroll() {
  $('.reveal').each(function() {
    const top = $(this)[0].getBoundingClientRect().top;
    if (top < window.innerHeight - 80) $(this).addClass('visible');
  });
}

$(document).ready(function() { 
  revealOnScroll(); 
  setTimeout(initLeafletMap, 500);
});

const destinations = [
  {
    id: 1,
    name: 'ボロブドゥール寺院',
    island: 'java',
    region: '中部ジャワ州',
    category: ['culture', 'heritage'],
    rating: 4.9,
    img: './images/borobudur.avif',
    thumb: './images/borobudurThumb.avif',
    desc: '世界最大の仏教寺院であり、ユネスコ世界遺産。8世紀に建設された壮大な石造建築物で、1,460枚のレリーフパネルを誇ります。',
    tags: ['世界遺産', '仏教', 'ジャワ', '歴史'],
    lat: -7.6079,
    lng: 110.2038,
    hours: '06:00〜17:00',
    price: '¥3,000〜',
    best: '4月〜10月'
  },
  {
    id: 2,
    name: 'バリ島 棚田（テガララン）',
    island: 'bali',
    region: 'バリ州 ウブド',
    category: ['nature', 'culture'],
    rating: 4.8,
    img: './images/ubud.avif',
    thumb: './images/ubudThumb.avif',
    desc: 'バリ島ウブド近郊に広がる美しい棚田。ユネスコ世界遺産「バリのスバックシステム」の一部で、緑豊かな農業文化の象徴です。',
    tags: ['棚田', 'バリ', 'ユネスコ', '自然'],
    lat: -8.4315,
    lng: 115.2755,
    hours: '日の出〜日没',
    price: '¥300〜',
    best: '5月〜9月'
  },
  {
    id: 3,
    name: 'ブロモ山',
    island: 'java',
    region: '東ジャワ州',
    category: ['nature', 'adventure'],
    rating: 4.9,
    img: './images/bromo.avif',
    thumb: './images/bromoThumb.avif',
    desc: 'ブロモ・テンゲル・スメル国立公園内の活火山。幻想的な日の出とカルデラの絶景が世界中の旅行者を魅了します。',
    tags: ['火山', '国立公園', '日の出', '冒険'],
    lat: -7.9425,
    lng: 112.9530,
    hours: '04:00〜18:00',
    price: '¥1,500〜',
    best: '4月〜10月'
  },
  {
    id: 4,
    name: 'ラジャ・アンパット',
    island: 'papua',
    region: '西パプア州',
    category: ['nature', 'beach', 'adventure'],
    rating: 5.0,
    img: './images/rajaampat.avif',
    thumb: './images/rajaampatThumb.avif',
    desc: '世界で最も生物多様性が豊かな海域の一つ。エメラルドグリーンの海と石灰岩の島々が織りなす絶景は「地球最後の楽園」と呼ばれます。',
    tags: ['ダイビング', '海', 'パプア', '絶景'],
    lat: -0.2338,
    lng: 130.5253,
    hours: '通年',
    price: '¥5,000〜',
    best: '10月〜4月'
  },
  {
    id: 5,
    name: 'コモド国立公園',
    island: 'flores',
    region: '東ヌサ・トゥンガラ州',
    category: ['nature', 'adventure', 'heritage'],
    rating: 4.9,
    img: './images/komodo.avif',
    thumb: './images/komodoThumb.avif',
    desc: 'コモドドラゴンの唯一の生息地であるユネスコ世界遺産。ピンクビーチや豊かな海中生物も見どころです。',
    tags: ['コモドドラゴン', '世界遺産', 'ダイビング', '希少動物'],
    lat: -8.5500,
    lng: 119.4880,
    hours: '06:00〜18:00',
    price: '¥4,000〜',
    best: '4月〜12月'
  },
  {
    id: 6,
    name: 'トバ湖',
    island: 'sumatra',
    region: '北スマトラ州',
    category: ['nature', 'culture'],
    rating: 4.7,
    img: './images/danautoba.avif',
    thumb: './images/danautobaThumb.avif',
    desc: '世界最大のカルデラ湖。約74,000年前の超巨大噴火で形成されたこの湖は、バタック民族の文化の中心地でもあります。',
    tags: ['湖', 'スマトラ', 'バタック文化', '絶景'],
    lat: 2.6845,
    lng: 98.8756,
    hours: '通年',
    price: '¥500〜',
    best: '6月〜8月'
  },
  {
    id: 7,
    name: 'タナ・トラジャ',
    island: 'sulawesi',
    region: '南スラウェシ州',
    category: ['culture', 'adventure'],
    rating: 4.8,
    img: './images/tanatoraja.avif',
    thumb: './images/tanatorajaThumb.avif',
    desc: 'トラジャ族の独特な葬儀文化と伝統的家屋「トンコナン」で知られる高地地域。精巧な木彫りと独自の死生観が世界を魅了します。',
    tags: ['文化', '葬儀', 'トラジャ', 'スラウェシ'],
    lat: -3.0469,
    lng: 119.8225,
    hours: '通年',
    price: '¥2,000〜',
    best: '7月〜9月'
  },
  {
    id: 8,
    name: 'プランバナン寺院',
    island: 'java',
    region: 'ジョグジャカルタ特別州',
    category: ['culture', 'heritage'],
    rating: 4.8,
    img: './images/prambanan.avif',
    thumb: './images/prambananThumb.avif',
    desc: '9世紀に建設されたヒンドゥー教の壮大な寺院群。ユネスコ世界遺産であり、シヴァ神を祀る主塔は高さ47メートルに達します。',
    tags: ['世界遺産', 'ヒンドゥー', 'ジャワ', '歴史'],
    lat: -7.7520,
    lng: 110.4914,
    hours: '06:00〜17:00',
    price: '¥2,500〜',
    best: '4月〜10月'
  },
  {
    id: 9,
    name: 'バリ島 ウルワトゥ寺院',
    island: 'bali',
    region: 'バリ州 ウルワトゥ',
    category: ['culture', 'beach'],
    rating: 4.7,
    img: './images/ulawatu.avif',
    thumb: './images/ulawatuThumb.avif',
    desc: 'バリ島南端の断崖絶壁にそびえる神秘的なヒンドゥー寺院。インド洋を望む夕日とケチャクダンスが最大の見どころです。',
    tags: ['バリ', '寺院', '断崖', '夕日'],
    lat: -8.8291,
    lng: 115.0849,
    hours: '07:00〜19:00',
    price: '¥800〜',
    best: '通年'
  },
  {
    id: 10,
    name: 'ブナケン国立公園',
    island: 'sulawesi',
    region: '北スラウェシ州 マナド',
    category: ['nature', 'beach', 'adventure'],
    rating: 4.9,
    img: './images/bunaken.avif',
    thumb: './images/bunakenThumb.avif',
    desc: 'インドネシア最初の海洋国立公園のひとつ。垂直に切り立ったサンゴ礁と豊かな海洋生物で、世界トップクラスのダイビングスポットです。',
    tags: ['ダイビング', 'サンゴ礁', 'スラウェシ', '国立公園'],
    lat: 1.6256,
    lng: 124.7490,
    hours: '通年',
    price: '¥3,500〜',
    best: '5月〜10月'
  },
  {
    id: 11,
    name: 'リンジャニ山',
    island: 'lombok',
    region: '西ヌサ・トゥンガラ州',
    category: ['nature', 'adventure'],
    rating: 4.8,
    img: './images/lombok.avif',
    thumb: './images/lombokThumb.avif',
    desc: 'ロンボク島に位置するインドネシア第2位の高さを誇る火山（3,726m）。カルデラ内の火口湖セガラ・アナクが絶景です。',
    tags: ['火山', 'トレッキング', 'ロンボク', '絶景'],
    lat: -8.4183,
    lng: 116.4661,
    hours: '通年（許可証必要）',
    price: '¥2,000〜',
    best: '7月〜8月'
  },
  {
    id: 12,
    name: 'デラワン諸島',
    island: 'kalimantan',
    region: '東カリマンタン州',
    category: ['nature', 'beach', 'adventure'],
    rating: 4.7,
    img: './images/delawan.avif',
    thumb: './images/delawanThumb.avif',
    desc: 'ウミガメとマンタエイの聖地。透明度の高い海と白砂ビーチが広がる楽園で、クラゲ湖でのスノーケリングも体験できます。',
    tags: ['ウミガメ', 'ダイビング', 'カリマンタン', 'ビーチ'],
    lat: 2.2869,
    lng: 118.2310,
    hours: '通年',
    price: '¥3,000〜',
    best: '3月〜10月'
  }
];

// islandmap
const islandConfigs = {
  sumatra: { lat: 0.5897, lng: 101.3431, zoom: 6, name: 'スマトラ島' },
  java: { lat: -7.6145, lng: 110.7122, zoom: 7, name: 'ジャワ島' },
  kalimantan: { lat: 1.6815, lng: 113.3824, zoom: 6, name: 'カリマンタン島' },
  sulawesi: { lat: -2.0, lng: 120.0, zoom: 6, name: 'スラウェシ島' },
  bali: { lat: -8.4095, lng: 115.1889, zoom: 9, name: 'バリ島' },
  lombok: { lat: -8.5657, lng: 116.3496, zoom: 9, name: 'ロンボク島' },
  flores: { lat: -8.6574, lng: 120.4267, zoom: 8, name: 'フローレス島・コモド' },
  maluku: { lat: -3.2385, lng: 130.1453, zoom: 7, name: 'マルク諸島' },
  papua: { lat: -4.2699, lng: 138.0804, zoom: 6, name: 'パプア' }
};

// regionleafet
const leafletRegions = {
  sumatra: {
    label: "スマトラ",
    title: "スマトラ",
    img: "./images/sumatra.png",
    desc: "壮大なトバ湖の美しさを探索し、オランウータンなどの希少な野生動物を見るためにグヌン・ルーサー国立公園で冒険し、メンタワイ諸島で世界クラスの波に挑戦しましょう。",
    tags: ["湖", "野生動物", "国立公園", "サーフィン"],
    labelPos: [0.5, 101.5],
    searchQuery: "Sumatra+Indonesia+tourist+attractions"
  },
  kalimantan: {
    label: "カリマンタン",
    title: "カリマンタン",
    img: "./images/kalimantan.jpg",
    desc: "力強い川を探索し、熱帯雨林の冒険を体験しましょう。ボルネオオランウータンやその他のユニークな野生動物の宝庫です。",
    tags: ["熱帯雨林", "オランウータン", "川", "野生動物"],
    labelPos: [1, 114.5],
    searchQuery: "Kalimantan+Indonesia+tourist+attractions"
  },
  jawa: {
    label: "ジャワ",
    title: "ジャワ",
    img: "./images/jawa.webp",
    desc: "歴史あるカラフルな都市と世界遺産の永遠の魅力を探索：壮大なボロブドゥール寺院、プランバナン寺院、ジョグジャカルタの活気ある文化。",
    tags: ["世界遺産", "寺院", "歴史", "文化"],
    labelPos: [-7.3, 110.4],
    searchQuery: "Java+Indonesia+tourist+attractions"
  },
  sulawesi: {
    label: "スラウェシ",
    title: "スラウェシ",
    img: "./images/sulawesi.webp",
    desc: "リクパンやブナケンの美しい海域で水中の美しさを堪能し、何千年も続くユニークな伝統を持つ豊かなトラジャ文化を発見しましょう。",
    tags: ["ダイビング", "トラジャ", "文化", "火山"],
    labelPos: [-1.5, 121.5],
    searchQuery: "Sulawesi+Indonesia+tourist+attractions"
  },
  "bali-nt": {
    label: "バリ & ヌサ・トゥンガラ",
    title: "バリとヌサ・トゥンガラ",
    img: "./images/balinusatenggara.jpg",
    desc: "ドラマチックな風景、豊かな文化、伝説のコモド、多様な海洋生物で知られるバリとヌサ・トゥンガラ地域の美しさと多様性を発見しましょう。",
    tags: ["ビーチ", "文化", "コモド", "ダイビング"],
    labelPos: [-9, 118.5],
    searchQuery: "Bali+Nusa+Tenggara+Indonesia+tourist+attractions"
  },
  "maluku-papua": {
    label: "マルク & パプア",
    title: "マルクとパプア",
    img: "./images/malukupapua.webp",
    desc: "世界で最も魅惑的な手つかずの自然と海中の美しさを探索しましょう。香辛料諸島マルクからパプアのラジャ・アンパットの海中楽園まで。",
    tags: ["ラジャ・アンパット", "ダイビング", "手つかずの自然", "海中"],
    labelPos: [-3.5, 133.5],
    searchQuery: "Maluku+Papua+Indonesia+tourist+attractions"
  }
};

let leafletMap = null;
let leafletActiveRegion = null;
let leafletRegionLayers = {};

// leafetmapint
function initLeafletMap() {
  Object.keys(leafletRegions).forEach(key => {
    leafletRegionLayers[key] = [];
  });

  // ZOOM DISABLED - semua fitur zoom dimatikan
  leafletMap = L.map('leafletMap', {
    center: [-2.5, 118],
    zoom: 5,
    zoomControl: false,
    scrollWheelZoom: false,
    doubleClickZoom: false,
    touchZoom: false,
    boxZoom: false,
    keyboard: false,
    attributionControl: false,
    dragging: true,
    zoomSnap: 0,
    zoomDelta: 0,
    fadeAnimation: false,
    zoomAnimation: false,
    markerZoomAnimation: false
  });

  // // Kunci zoom level agar tidak berubah
  // leafletMap.setMaxZoom(5);
  // leafletMap.setMinZoom(5);

  const defaultStyle = {
    fillColor: '#8095ab',
    weight: 0.8,
    opacity: 0.6,
    color: '#ffffff',
    fillOpacity: 0.82
  };

  const hoverStyle = {
    fillColor: '#4a6d8c',
    weight: 1,
    opacity: 0.8,
    color: '#ffffff',
    fillOpacity: 0.92
  };

  const activeStyle = {
    fillColor: '#2c5282',
    weight: 1.5,
    opacity: 0.9,
    color: '#c9a84c',
    fillOpacity: 0.95
  };

  function getLeafletRegionName(provinceName) {
    const name = (provinceName || '').toLowerCase();
    if (/aceh|sumatera|sumatra|riau|jambi|bengkulu|lampung|bangka|belitung|kepulauan riau/.test(name)) {
      return 'sumatra';
    }
    if (/kalimantan|borneo/.test(name)) {
      return 'kalimantan';
    }
    if (/jakarta|banten|jawa|java|yogyakarta/.test(name)) {
      return 'jawa';
    }
    if (/sulawesi|celebes|gorontalo/.test(name)) {
      return 'sulawesi';
    }
    if (/bali|nusa tenggara|ntb|ntt|lombok|sumbawa|flores|timor/.test(name)) {
      return 'bali-nt';
    }
    if (/maluku|ternate|ambon|papua|irian/.test(name)) {
      return 'maluku-papua';
    }
    return null;
  }

  const geoJsonUrl = 'https://raw.githubusercontent.com/superpikar/indonesia-geojson/master/indonesia-province-simple.json';

  fetch(geoJsonUrl)
    .then(response => {
      if (!response.ok) throw new Error('HTTP ' + response.status);
      return response.json();
    })
    .then(data => {
      L.geoJSON(data, {
        style: defaultStyle,
        onEachFeature: function(feature, layer) {
          const props = feature.properties || {};
          const regionKey = getLeafletRegionName(props.NAME || props.name || props.Propinsi || '');
          
          if (regionKey && leafletRegionLayers[regionKey]) {
            leafletRegionLayers[regionKey].push(layer);
          }

          layer.on('mouseover', function() {
            if (leafletActiveRegion !== regionKey) {
              leafletRegionLayers[regionKey]?.forEach(l => l.setStyle(hoverStyle));
            }
          });

          layer.on('mouseout', function() {
            if (leafletActiveRegion !== regionKey) {
              leafletRegionLayers[regionKey]?.forEach(l => l.setStyle(defaultStyle));
            }
          });

          layer.on('click', function(e) {
            L.DomEvent.stopPropagation(e);
            showLeafletRegion(regionKey);
          });
        }
      }).addTo(leafletMap);

      leafletMap.fitBounds([[6.5, 94.5], [-11.5, 141.5]]);

      Object.keys(leafletRegions).forEach(key => {
        const region = leafletRegions[key];
        const labelHtml = region.label.split('\n').map(text => 
          `<span style="display:block">${text}</span>`
        ).join('');
        
        const icon = L.divIcon({
          className: 'regionLabel',
          html: labelHtml,
          iconSize: [170, region.label.split('\n').length > 1 ? 46 : 26],
          iconAnchor: [85, region.label.split('\n').length > 1 ? 23 : 13]
        });
        
        L.marker(region.labelPos, {
          icon: icon,
          interactive: false
        }).addTo(leafletMap);
      });

      leafletMap.on('click', closeLeafletCard);
    })
    .catch(err => {
      console.error('GeoJSONの読み込みに失敗:', err);
      showFallbackRegions();
    });
}

// regionfallbak
function showFallbackRegions() {
  Object.keys(leafletRegions).forEach(key => {
    const region = leafletRegions[key];
    const marker = L.circleMarker(region.labelPos, {
      radius: 15,
      fillColor: '#c9a84c',
      color: '#fff',
      weight: 2,
      opacity: 0.8,
      fillOpacity: 0.6
    }).addTo(leafletMap);
    
    marker.on('click', function() {
      showLeafletRegion(key);
    });
    
    const icon = L.divIcon({
      className: 'regionLabel',
      html: `<span style="display:block">${region.label}</span>`,
      iconSize: [120, 26],
      iconAnchor: [60, 13]
    });
    
    L.marker([region.labelPos[0] + 1.5, region.labelPos[1]], {
      icon: icon,
      interactive: false
    }).addTo(leafletMap);
  });
}

// closeleaft
function showLeafletRegion(regionKey) {
  if (!regionKey || !leafletRegions[regionKey]) return;

  if (leafletActiveRegion) {
    leafletRegionLayers[leafletActiveRegion]?.forEach(l => l.setStyle({
      fillColor: '#8095ab',
      weight: 0.8,
      opacity: 0.6,
      color: '#ffffff',
      fillOpacity: 0.82
    }));
  }

  leafletActiveRegion = regionKey;
  leafletRegionLayers[regionKey]?.forEach(l => {
    l.setStyle({
      fillColor: '#2c5282',
      weight: 1.5,
      opacity: 0.9,
      color: '#c9a84c',
      fillOpacity: 0.95
    });
    if (l.bringToFront) l.bringToFront();
  });

  const region = leafletRegions[regionKey];
  $('#cardImage').attr('src', region.img);
  $('#cardImage').attr('alt', region.title);
  $('#cardTitle').text(region.title);
  $('#cardDesc').text(region.desc);
  
  const tagsHtml = (region.tags || []).map(t => `<span class="cardTag">${t}</span>`).join('');
  $('#cardTags').html(tagsHtml);
  
  $('#infoCard').addClass('active');
}

function closeLeafletCard() {
  if (leafletActiveRegion) {
    leafletRegionLayers[leafletActiveRegion]?.forEach(l => l.setStyle({
      fillColor: '#8095ab',
      weight: 0.8,
      opacity: 0.6,
      color: '#ffffff',
      fillOpacity: 0.82
    }));
    leafletActiveRegion = null;
  }
  $('#infoCard').removeClass('active');
}

// eventlist
$('#closeCard').on('click', closeLeafletCard);

$('#detailBtn').on('click', function() {
  if (leafletActiveRegion && leafletRegions[leafletActiveRegion]) {
    const region = leafletRegions[leafletActiveRegion];
    window.open(`https://www.google.com/maps/search/${region.searchQuery || region.title + '+Indonesia+tourist+attractions'}/`, '_blank');
  }
});

$(document).on('keydown', function(e) {
  if (e.key === 'Escape') closeLeafletCard();
});

// destinationfolder
function buildCards(filter) {
  const grid = $('#destGrid');
  grid.empty();
  const filtered = filter === 'all' ?
    destinations :
    destinations.filter(d => d.category.includes(filter));

  filtered.forEach((d, i) => {
    const tagsHtml = d.tags.map(t => `<span class="cardTag">${t}</span>`).join('');
    const card = $(`
      <div class="destCard reveal" data-id="${d.id}" data-island="${d.island}" style="transition-delay:${i * 0.06}s">
        <div class="cardImgWrap">
          <img src="${d.thumb}" alt="${d.name}" loading="lazy"/>
          <span class="cardBadge">${d.region}</span>
          <span class="cardRating"><i class="fas fa-star"></i> ${d.rating}</span>
        </div>
        <div class="cardBody">
          <div class="cardLocation"><i class="fas fa-map-pin"></i> ${d.island.toUpperCase()} 島</div>
          <h3 class="cardTitle">${d.name}</h3>
          <p class="cardDesc">${d.desc}</p>
          <div class="cardTags">${tagsHtml}</div>
          <div class="cardActions">
            <button class="btnPrimary openGmapBtn" data-id="${d.id}">
              <i class="fas fa-map-marked-alt"></i> 地図で見る
            </button>
            <button class="btnSecondary showDetailBtn" data-id="${d.id}">
              <i class="fas fa-info-circle"></i> 詳細
            </button>
          </div>
        </div>
      </div>
    `);
    grid.append(card);
  });
  setTimeout(revealOnScroll, 50);
}

// filter
$(document).on('click', '.filterBtn', function() {
  $('.filterBtn').removeClass('active');
  $(this).addClass('active');
  buildCards($(this).data('filter'));
});

// mapfuntion
let modalMap = null;
let modalMarkers = [];
let modalInfoWindow = null;

function buildModalMap(islandKey) {
  const cfg = islandConfigs[islandKey] || { lat: -2.5, lng: 118.0, zoom: 5, name: 'インドネシア' };
  const islandDests = destinations.filter(d => d.island === islandKey);

  if (!modalMap) {
    modalMap = new google.maps.Map(document.getElementById('googleMap'), {
      center: { lat: cfg.lat, lng: cfg.lng },
      zoom: cfg.zoom,
      mapTypeId: 'hybrid',
      disableDefaultUI: false,
      zoomControl: true,
      streetViewControl: false
    });
  } else {
    modalMap.setCenter({ lat: cfg.lat, lng: cfg.lng });
    modalMap.setZoom(cfg.zoom);
    modalMarkers.forEach(m => m.setMap(null));
    modalMarkers = [];
    if (modalInfoWindow) { modalInfoWindow.close();
      modalInfoWindow = null; }
  }

  const side = $('#sidePanel');
  side.find('.sideDestItem').remove();

  const destsToShow = islandDests.length > 0 ? islandDests : destinations;

  destsToShow.forEach(d => {
    const marker = new google.maps.Marker({
      position: { lat: d.lat, lng: d.lng },
      map: modalMap,
      title: d.name,
      icon: {
        url: './images/yellowdot.png',
      },
      animation: google.maps.Animation.DROP
    });
    modalMarkers.push(marker);

    const iwContent = buildInfoWindowHTML(d);
    const iw = new google.maps.InfoWindow({ content: iwContent, maxWidth: 320 });

    marker.addListener('click', function() {
      if (modalInfoWindow) modalInfoWindow.close();
      iw.open(modalMap, marker);
      modalInfoWindow = iw;
      modalMap.panTo({ lat: d.lat, lng: d.lng });
      $('#sidePanel .sideDestItem').removeClass('active');
      $(`#sidePanel .sideDestItem[data-id="${d.id}"]`).addClass('active');
    });

    const sideItem = $(`
      <div class="sideDestItem" data-id="${d.id}">
        <img class="sideDestThumb" src="${d.thumb}" alt="${d.name}"/>
        <div class="sideDestInfo">
          <h5>${d.name}</h5>
          <p><i class="fas fa-star" style="color:#c9a84c;font-size:0.7rem;"></i> ${d.rating} &nbsp;|&nbsp; ${d.region}</p>
        </div>
      </div>
    `);
    sideItem.on('click', function() {
      google.maps.event.trigger(marker, 'click');
      modalMap.panTo({ lat: d.lat, lng: d.lng });
      modalMap.setZoom(10);
    });
    side.append(sideItem);
  });

  $('#gmapModalTitle').html(`<i class="fas fa-map-marker-alt" style="color:#c9a84c;margin-right:8px;"></i>${cfg.name} — 観光地マップ`);
  $('#modalIslandChip').html(`<i class="fas fa-map-pin"></i> ${cfg.name}`);
}

function buildInfoWindowHTML(d) {
  return `
    <div style="font-family:'Noto Sans JP',sans-serif;width:260px;background:#141b26;border-radius:12px;overflow:hidden;border:1px solid rgba(201,168,76,0.3);">
      <img src="${d.thumb || d.img}" alt="${d.name}" style="width:100%;height:120px;object-fit:cover;display:block;"/>
      <div style="padding:12px;">
        <div style="font-size:0.65rem;color:#c9a84c;margin-bottom:3px;font-weight:700;">
          <i class="fas fa-map-pin"></i> ${d.region}
        </div>
        <h3 style="font-size:0.9rem;font-weight:800;color:#fff;margin-bottom:4px;">${d.name}</h3>
        <p style="font-size:0.75rem;color:#9aacb8;line-height:1.5;margin-bottom:6px;">${d.desc.substring(0, 80)}...</p>
        <div style="display:flex;gap:8px;font-size:0.65rem;color:#9aacb8;border-top:1px solid rgba(255,255,255,0.06);padding-top:6px;">
          <span><i class="fas fa-star" style="color:#c9a84c;"></i> ${d.rating}</span>
          <span><i class="fas fa-clock" style="color:#c9a84c;"></i> ${d.hours}</span>
        </div>
      </div>
    </div>
  `;
}

function openGmapModal(islandKey) {
  $('#gmapOverlay').addClass('active');
  $('body').css('overflow', 'hidden');
  
  const modalContent = $('#googleMap');
  modalContent.html(`
    <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;min-height:400px;background:#0a2040;">
      <div style="width:48px;height:48px;border:3px solid rgba(201,168,76,0.2);border-top-color:#c9a84c;border-radius:50%;animation:spin 1s linear infinite;"></div>
      <p style="color:#9aacb8;margin-top:16px;">マップを読み込み中...</p>
    </div>
  `);
  
  setTimeout(function() {
    if (window.mapsReady) {
      modalContent.empty();
      const mapDiv = document.createElement('div');
      mapDiv.id = 'googleMap';
      mapDiv.style.cssText = 'flex:1;min-height:500px;';
      document.getElementById('googleMap').replaceWith(mapDiv);
      buildModalMap(islandKey);
      google.maps.event.trigger(modalMap, 'resize');
    } else {
      modalContent.html(`
        <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;min-height:400px;padding:40px;text-align:center;background:#0a2040;">
          <div style="font-size:4rem;margin-bottom:16px;">🗺️</div>
          <h3 style="color:#c9a84c;font-size:1.2rem;">マップを読み込めませんでした</h3>
          <p style="color:#9aacb8;max-width:400px;line-height:1.8;margin-bottom:16px;">インターネット接続を確認して、再試行してください。</p>
          <button onclick="location.reload()" class="heroBtn" style="padding:8px 20px;font-size:0.85rem;">
            <i class="fas fa-sync-alt"></i> 再試行
          </button>
        </div>
      `);
    }
  }, 500);
}

// buttonmap
$(document).on('click', '.openGmapBtn', function() {
  const id = parseInt($(this).data('id'));
  const dest = destinations.find(d => d.id === id);
  if (!dest) return;
  openGmapModal(dest.island);
  setTimeout(function() {
    if (modalMap && window.mapsReady) {
      modalMap.setCenter({ lat: dest.lat, lng: dest.lng });
      modalMap.setZoom(10);
    }
  }, 500);
});

$(document).on('click', '.showDetailBtn', function() {
  const id = parseInt($(this).data('id'));
  const d = destinations.find(x => x.id === id);
  if (!d) return;

  const html = `
    <div class="infoWindowContent">
      <img class="infoWindowImg" src="${d.img}" alt="${d.name}"/>
      <div class="infoWindowBody">
        <div class="iwLocation"><i class="fas fa-map-pin"></i> ${d.region}</div>
        <h3>${d.name}</h3>
        <p>${d.desc}</p>
        <div class="iwTags">${d.tags.map(t => `<span class="iwTag">${t}</span>`).join('')}</div>
        <div class="iwMeta">
          <span><i class="fas fa-clock" style="color:#c9a84c;"></i> ${d.hours}</span>
          <span><i class="fas fa-yen-sign" style="color:#c9a84c;"></i> ${d.price}</span>
          <span><i class="fas fa-sun" style="color:#c9a84c;"></i> ${d.best}</span>
          <span><i class="fas fa-star" style="color:#c9a84c;"></i> ${d.rating}</span>
        </div>
      </div>
    </div>
  `;

  $('#iwDialog').html(html);
  $('#iwDialog').dialog({
    title: d.name,
    width: 400,
    modal: true,
    resizable: false,
    draggable: true,
    closeText: '✕',
    open: function() {
      $('.ui-widget-overlay').css({ background: 'rgba(0,0,0,0.7)', opacity: 1 });
    },
    buttons: {
      '地図で見る': function() {
        $(this).dialog('close');
        openGmapModal(d.island);
      },
      '閉じる': function() { $(this).dialog('close'); }
    }
  });
});

// galery
let gallCurrent = 0;
const gallItems = 8;
const gallVisible = window.innerWidth < 600 ? 1 : window.innerWidth < 900 ? 2 : 3;
const gallMax = gallItems - gallVisible;

function buildGallDots() {
  const nav = $('#gallNav');
  nav.empty();
  for (let i = 0; i <= gallMax; i++) {
    const dot = $(`<div class="galleryDot ${i === 0 ? 'active' : ''}"></div>`);
    dot.on('click', (function(idx) { return function() { moveGall(idx); }; })(i));
    nav.append(dot);
  }
}

function moveGall(idx) {
  gallCurrent = Math.max(0, Math.min(idx, gallMax));
  const itemW = 425;
  const gap = 20;
  $('#gallTrack').css('transform', `translateX(-${gallCurrent * (itemW + gap)}px)`);
  $('.galleryDot').removeClass('active').eq(gallCurrent).addClass('active');
}

$('#gallPrev').on('click', function() { moveGall(gallCurrent - 1); });
$('#gallNext').on('click', function() { moveGall(gallCurrent + 1); });

//modal
$('#gmapClose').on('click', function() {
  $('#gmapOverlay').removeClass('active');
  $('body').css('overflow', '');
});

$('#gmapOverlay').on('click', function(e) {
  if ($(e.target).is('#gmapOverlay')) {
    $('#gmapOverlay').removeClass('active');
    $('body').css('overflow', '');
  }
});

$(document).on('keydown', function(e) {
  if (e.key === 'Escape') {
    if ($('#gmapOverlay').hasClass('active')) {
      $('#gmapOverlay').removeClass('active');
      $('body').css('overflow', '');
    }
    closeLeafletCard();
  }
});

// init
$(document).ready(function() {
  buildCards('all');
  buildGallDots();
  
  $('.filterBtn').tooltip({ position: { my: 'center bottom-10', at: 'center top' } });

  $('a[href^="#"]').on('click', function(e) {
    e.preventDefault();
    const target = $($(this).attr('href'));
    if (target.length) {
      $('html,body').animate({ scrollTop: target.offset().top - 70 }, 700, 'swing');
    }
  });
});

// mapinit
function initMap() {
  window.mapsReady = true;
  if (window.onMapsReady) window.onMapsReady();
}

let inlineMap = null;
let inlineInfoWindow = null;

window.onMapsReady = function() {
  if (!inlineMap) {
    const center = { lat: -2.5, lng: 118.0 };
    inlineMap = new google.maps.Map(document.getElementById('inlineMap'), {
      center: center,
      zoom: 5,
      mapTypeId: 'hybrid',
      disableDefaultUI: false,
      zoomControl: true,
      mapTypeControl: true,
      fullscreenControl: true,
      streetViewControl: false
    });

    destinations.forEach(d => {
      const marker = new google.maps.Marker({
        position: { lat: d.lat, lng: d.lng },
        map: inlineMap,
        title: d.name,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 10,
          fillColor: '#c9a84c',
          fillOpacity: 0.95,
          strokeColor: '#fff',
          strokeWeight: 2
        },
        animation: google.maps.Animation.DROP
      });

      const iwContent = buildInfoWindowHTML(d);
      const iw = new google.maps.InfoWindow({ content: iwContent, maxWidth: 300 });

      marker.addListener('click', function() {
        if (inlineInfoWindow) inlineInfoWindow.close();
        iw.open(inlineMap, marker);
        inlineInfoWindow = iw;
        inlineMap.panTo({ lat: d.lat, lng: d.lng });
      });
    });

    // hideindicator
    $('#mapLoadingIndicator').hide();
  }
};