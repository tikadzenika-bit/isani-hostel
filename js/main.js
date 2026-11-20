/* Hostel in Isani — demo site logic.
   CONTACT, ROOMS and TEXT hold all content. Prices and contacts are samples (ნიმუში). */
document.documentElement.classList.add('js');

const CONTACT = {
  whatsapp: '',            // e.g. '995555123456' — empty: WhatsApp opens with the message and no recipient
  email: 'hello@hostelinisani.ge'
};

const ROOMS = [
  { id: 'dorm8',  price: 25, img: 'dorm-blue.jpg',  w: 1024, h: 768 },
  { id: 'dorm6f', price: 28, img: 'dorm-wood.jpg',  w: 1024, h: 683 },
  { id: 'dorm4',  price: 32, img: 'dorm-blue.jpg',  w: 1024, h: 768 },
  { id: 'double', price: 90, img: 'room-double.jpg', w: 1024, h: 683, perRoom: true },
  { id: 'twin',   price: 85, img: 'room-twin.jpg',  w: 1600, h: 1200, perRoom: true },
  { id: 'family', price: 130, img: 'dorm-wood.jpg', w: 1024, h: 683, perRoom: true }
];

/* Metro line 1 from Isani towards Didube; Samgori is one stop the other way. ~2 min between stations. */
const LINE = ['isani', 'aragveli', 'avlabari', 'liberty', 'rustaveli', 'marjanishvili', 'station', 'nadzaladevi', 'gotsiridze', 'didube'];
const DESTS = [
  { id: 'oldtown', to: 'liberty' },
  { id: 'rustaveli', to: 'rustaveli' },
  { id: 'railway', to: 'station' },
  { id: 'busst', to: 'didube' },
  { id: 'samgori', to: 'samgori' }
];
const WALK_HOSTEL = 3, PER_STOP = 2;

const TILES = [
  { img: 'dorm-blue.jpg', w: 1024, h: 768, k: 'tDorm' },
  { img: 'isani-metro.jpg', w: 1600, h: 1200, k: 'tMetro' },
  { img: 'kitchen.jpg', w: 1600, h: 1068, k: 'tKitchen' },
  { img: 'room-twin.jpg', w: 1600, h: 1200, k: 'tTwin' },
  { img: 'lounge.jpg', w: 1600, h: 1067, k: 'tLounge' },
  { img: 'old-town.jpg', w: 1600, h: 1063, k: 'tOld' },
  { img: 'room-double.jpg', w: 1024, h: 683, k: 'tDouble' },
  { img: 'metro-train.jpg', w: 1600, h: 1099, k: 'tTrain' }
];

const TEXT = {
  ka: {
    skip: 'გადადი ოთახებზე', heroLine: 'მეტრო „ისანი“ · თბილისი',
    h1: 'ჰოსტელი ისანის<br>მეტროსთან',
    lead: 'საწოლი საერთო ოთახში 25 ₾-დან, კერძო ოთახები და საერთო სამზარეულო. ძველ თბილისამდე მეტროთი სამი გაჩერებაა.',
    cta: 'აირჩიე თარიღი და დაჯავშნე', cta2: 'დაჯავშნე',
    navRooms: 'ოთახები', navRoute: 'გზა ქალაქში', navFaq: 'კითხვები', navContact: 'კონტაქტი',
    aboutH: 'წერილი მასპინძლებისგან',
    about1: 'ჩვენი ჰოსტელი ქალაქის ცენტრში არ არის, და ეს მისი ყველაზე დიდი უპირატესობაა. ისანი ჩვეულებრივი თბილისია: ბაზარი, საცხობი კუთხეში, მეზობლები, რომლებიც ერთმანეთს სახელით იცნობენ.',
    about2: 'კარიდან მეტრომდე სამი წუთია. იქიდან <mark>ძველ თბილისამდე სამი გაჩერება</mark>, რუსთაველამდე ოთხი. ღამე აქ წყნარია, ფასი კი ცენტრზე დაბალი.',
    about3: 'გვაქვს საერთო ოთახები ოთხ, ექვს და რვა საწოლზე, ცალკე ოთახი ქალებისთვის და რამდენიმე კერძო ოთახი. ყველა საწოლს აქვს ფარდა, ნათურა, როზეტი და საკეტიანი კარადა.',
    about4: 'სამზარეულო ყველასია: ჩაი და ყავა უფასოა, მაცივარში თაროს სახელით მოგცემთ. მოდი, დაგხვდებით.',
    signName: 'ჰოსტელის მასპინძლები', signRole: 'ისანი, თბილისი', stubText: 'მოგვწერე ნებისმიერ დროს',
    roomsH: 'ოთახები და ფასები',
    roomsFoot: 'ექვსი ტიპის ოთახი. ფასი ერთ ღამეზეა, საწოლის თეთრეული და პირსახოცი შედის.',
    perBed: '₾ საწოლი / ღამე', perRoom: '₾ ოთახი / ღამე', book: 'დაჯავშნე ეს',
    rooms: {
      dorm8: ['საერთო ოთახი, 8 საწოლი', 'ყველაზე იაფი ვარიანტი. ორსართულიანი საწოლები ფარდებით, თითოეულს თავისი ნათურა და როზეტი.', 'კონდიციონერი · კარადა საკეტით · საერთო აბაზანა'],
      dorm6f: ['ქალების ოთახი, 6 საწოლი', 'მხოლოდ ქალებისთვის, საკუთარი აბაზანით ოთახის გვერდით.', 'ფენი და სარკე · კარადა საკეტით'],
      dorm4: ['საერთო ოთახი, 4 საწოლი', 'პატარა და წყნარი ოთახი მათთვის, ვისაც ნაკლები მეზობელი ურჩევნია.', 'ფანჯარა ეზოში · კარადა საკეტით'],
      double: ['ორადგილიანი ოთახი', 'ერთი დიდი საწოლი, საკუთარი აბაზანა და სამუშაო მაგიდა.', 'პირადი აბაზანა · კონდიციონერი · პირსახოცები'],
      twin: ['ოთახი ორი საწოლით', 'ორი ცალკე საწოლი მეგობრებისთვის ან კოლეგებისთვის.', 'საერთო აბაზანა დერეფანში · კარადა'],
      family: ['ოჯახის ოთახი, 4 ადგილი', 'დიდი საწოლი და ორსართულიანი საწოლი, საკუთარი აბაზანა.', 'პირადი აბაზანა · ბავშვის საწოლი მოთხოვნით']
    },
    routeH: 'ისანიდან ყველგან',
    routeP: 'აირჩიე, სად მიდიხარ, და ბილეთზე დაინახავ გაჩერებებს და დროს. მეტრო პირველი ხაზია, გადაჯდომა არ გჭირდება.',
    slipFrom: 'ბილეთი:',
    dests: { oldtown: 'ძველი თბილისი', rustaveli: 'რუსთაველი', railway: 'რკინიგზის სადგური', busst: 'დიდუბის ავტოსადგური', samgori: 'სამგორი' },
    st: { isani: 'ისანი', aragveli: '300 არაგველი', avlabari: 'ავლაბარი', liberty: 'თავისუფლების მოედანი', rustaveli: 'რუსთაველი', marjanishvili: 'მარჯანიშვილი', station: 'სადგურის მოედანი', nadzaladevi: 'ნაძალადევი', gotsiridze: 'გოცირიძე', didube: 'დიდუბე', samgori: 'სამგორი' },
    gWalk: 'ფეხით', gMetro: 'მეტროთი', walkToMetro: 'ჰოსტელიდან მეტრომდე', exitAt: 'ჩადი სადგურზე',
    min: 'წთ', stops: n => `${n} გაჩერება`, total: 'სულ, დაახლოებით',
    slipNote: 'დრო მიახლოებითია: სადგურებს შორის დაახლოებით 2 წუთია.',
    galH: 'როგორ გამოიყურება', sample: 'ნიმუში ფოტო',
    tiles: {
      tDorm: ['საერთო ოთახი', ['8 საწოლი', 'ფარდა', 'ნათურა', 'როზეტი'], ['მეორე სართული', 'ნიმუში']],
      tMetro: ['მეტრო „ისანი“', ['3 წთ', 'ხაზი 1', '06:00', '00:00'], ['კარიდან ფეხით', 'ისანი']],
      tKitchen: ['სამზარეულო', ['ჩაი', 'ყავა', 'მაცივარი', 'ქურა'], ['ყველასთვის', 'ნიმუში']],
      tTwin: ['ოთახი ორი საწოლით', ['2 საწოლი', 'ფანჯარა', 'მაგიდა', 'კარადა'], ['კერძო', 'ნიმუში']],
      tLounge: ['მისაღები', ['დივანი', 'Wi-Fi', 'წიგნები', 'რუკები'], ['პირველი სართული', 'ნიმუში']],
      tOld: ['ძველი თბილისი', ['3 გაჩერება', '~11 წთ', 'აბანოები', 'ციხე'], ['თავისუფლების მოედანი', 'ქალაქი']],
      tDouble: ['ორადგილიანი ოთახი', ['1 საწოლი', 'აბაზანა', 'კონდ.', 'მაგიდა'], ['კერძო', 'ნიმუში']],
      tTrain: ['თბილისის მეტრო', ['ხაზი 1', '2 წთ', 'ბარათი', 'სწრაფი'], ['ქალაქის ცენტრამდე', 'ქალაქი']]
    },
    faqH: 'რაც ყველას აინტერესებს',
    fact1: 'შემოსვლა 14:00-დან, გასვლა 12:00-მდე', fact2: 'მიმღები 24 საათი, ღამითაც', fact3: 'მეტრო „ისანი“ ფეხით 3 წუთში',
    faqLink: 'ნახე გზა ქალაქში',
    qa: [
      ['როგორ მოვიდე აეროპორტიდან?', 'ტაქსით ან Bolt-ით დაახლოებით 20–25 წუთია. თუ წინასწარ მოგვწერ, შეგიძლია ტრანსფერიც დაჯავშნო.'],
      ['შეიძლება ადრე შემოსვლა ან ბარგის დატოვება?', 'ბარგს ნებისმიერ დროს შეგინახავთ, უფასოდ. ადრე შემოსვლა შესაძლებელია, თუ საწოლი თავისუფალია.'],
      ['არის თუ არა Wi-Fi და კონდიციონერი?', 'Wi-Fi უფასოა მთელ შენობაში. საერთო და კერძო ოთახებს კონდიციონერი აქვს.'],
      ['როგორ ვიხდი?', 'ნაღდი ფულით ან ბარათით ადგილზე, ლარში. წინასწარი გადახდა არ გჭირდება.'],
      ['შემიძლია გაუქმება?', 'უფასოდ, ჩამოსვლამდე 24 საათით ადრე. უბრალოდ მოგვწერე.'],
      ['არის თუ არა სარეცხი მანქანა?', 'კი, სარეცხი და საშრობი, მცირე საფასურად. სარეცხი ფხვნილი გვაქვს.']
    ],
    contactH: 'დაჯავშნე საწოლი', addr: 'ისანი, თბილისი<br>მეტრო „ისანის“ მახლობლად',
    hRecep: 'მიმღები', hRecepV: '24 საათი', hIn: 'შემოსვლა', hOut: 'გასვლა',
    fIn: 'ჩამოსვლა', fOut: 'წასვლა', fGuests: 'სტუმარი', fRoom: 'ოთახი',
    send: 'გაგზავნე WhatsApp-ით',
    est: (n, sum) => `${n} ღამე · დაახლოებით ${sum} ₾`, estNo: 'აირჩიე თარიღები და ნახავ ფასს',
    msg: (r, a, b, g, s) => `გამარჯობა! მინდა დაჯავშნა Hostel in Isani-ში.\nოთახი: ${r}\nჩამოსვლა: ${a}\nწასვლა: ${b}\nსტუმარი: ${g}\nფასი საიტზე: ~${s} ₾`,
    footH: 'გნახავთ ისანში',
    footP: 'ჩამოხვალ გვიან ღამით? დაგვიწერე, დაგხვდებით და ჩაის დაგისხამთ. ბარგს გასვლის შემდეგაც შეგინახავთ.',
    footStreet: 'ისანი, თბილისი', footSocial: 'Instagram · Facebook',
    demo: 'დემო ვერსია: ფასები, კონტაქტები და ოთახების ფოტოები ნიმუშია.', credits: 'ფოტოების წყაროები',
    altDorm: 'ორსართულიანი საწოლები საერთო ოთახში', altLounge: 'საერთო მისაღები დივნებით', altKitchen: 'საერთო სამზარეულო და სასადილო მაგიდები',
    altMetro: 'ისანის მეტროსადგურის ტალღისებრი სახურავი', altMetroTall: 'ისანის მეტროსადგურის შესასვლელი', altStreet: 'ქუჩა ისანში', altTrain: 'თბილისის მეტროს მატარებელი'
  },

  en: {
    skip: 'Skip to rooms', heroLine: 'Isani metro · Tbilisi',
    h1: 'A hostel by<br>Isani metro',
    lead: 'Dorm beds from 25 ₾, private rooms and a shared kitchen. The Old Town is three metro stops away.',
    cta: 'Pick your dates and book', cta2: 'Book a bed',
    navRooms: 'Rooms', navRoute: 'Getting around', navFaq: 'Questions', navContact: 'Contact',
    aboutH: 'A note from your hosts',
    about1: 'Our hostel is not in the city centre, and that is the best thing about it. Isani is everyday Tbilisi: the market, a bakery on the corner, neighbours who know each other by name.',
    about2: 'From our door to the metro is three minutes. From there <mark>the Old Town is three stops</mark>, Rustaveli four. Nights are quiet here, and prices are lower than in the centre.',
    about3: 'We have dorms with four, six and eight beds, a women-only room and a few private rooms. Every bed has a curtain, a reading light, a socket and a locker.',
    about4: 'The kitchen belongs to everyone: tea and coffee are free, and you get a fridge shelf with your name on it. Come by, we will be waiting.',
    signName: 'Your hosts', signRole: 'Isani, Tbilisi', stubText: 'Write to us any time',
    roomsH: 'Rooms and prices',
    roomsFoot: 'Six kinds of room. Prices are per night; bed linen and a towel are included.',
    perBed: '₾ per bed / night', perRoom: '₾ per room / night', book: 'Book this',
    rooms: {
      dorm8: ['8-bed dorm', 'The cheapest way to stay. Bunks with curtains, each with its own light and socket.', 'Air conditioning · locker · shared bathroom'],
      dorm6f: ['Women-only dorm, 6 beds', 'For women only, with its own bathroom next door.', 'Hairdryer and mirror · locker'],
      dorm4: ['4-bed dorm', 'A small, quiet room for those who prefer fewer roommates.', 'Window onto the yard · locker'],
      double: ['Double room', 'One large bed, a private bathroom and a desk.', 'Private bathroom · air conditioning · towels'],
      twin: ['Twin room', 'Two separate beds for friends or colleagues.', 'Shared bathroom in the hall · wardrobe'],
      family: ['Family room, sleeps 4', 'A double bed and a bunk bed, with a private bathroom.', 'Private bathroom · cot on request']
    },
    routeH: 'From Isani, anywhere',
    routeP: 'Choose where you are going and the ticket shows the stops and the time. It is all line 1, no changes.',
    slipFrom: 'Ticket to',
    dests: { oldtown: 'Old Town', rustaveli: 'Rustaveli', railway: 'Railway station', busst: 'Didube bus station', samgori: 'Samgori' },
    st: { isani: 'Isani', aragveli: '300 Aragveli', avlabari: 'Avlabari', liberty: 'Liberty Square', rustaveli: 'Rustaveli', marjanishvili: 'Marjanishvili', station: 'Station Square', nadzaladevi: 'Nadzaladevi', gotsiridze: 'Gotsiridze', didube: 'Didube', samgori: 'Samgori' },
    gWalk: 'On foot', gMetro: 'By metro', walkToMetro: 'Hostel to the metro', exitAt: 'Get off at',
    min: 'min', stops: n => `${n} ${n === 1 ? 'stop' : 'stops'}`, total: 'In total, about',
    slipNote: 'Times are approximate: about 2 minutes between stations.',
    galH: 'What it looks like', sample: 'Sample photo',
    tiles: {
      tDorm: ['Dorm', ['8 beds', 'curtain', 'light', 'socket'], ['Second floor', 'sample']],
      tMetro: ['Isani metro', ['3 min', 'line 1', '06:00', '00:00'], ['On foot from the door', 'Isani']],
      tKitchen: ['Kitchen', ['tea', 'coffee', 'fridge', 'stove'], ['For everyone', 'sample']],
      tTwin: ['Twin room', ['2 beds', 'window', 'desk', 'wardrobe'], ['Private', 'sample']],
      tLounge: ['Lounge', ['sofa', 'Wi-Fi', 'books', 'maps'], ['Ground floor', 'sample']],
      tOld: ['Old Tbilisi', ['3 stops', '~11 min', 'baths', 'fortress'], ['Liberty Square', 'city']],
      tDouble: ['Double room', ['1 bed', 'bathroom', 'A/C', 'desk'], ['Private', 'sample']],
      tTrain: ['Tbilisi metro', ['line 1', '2 min', 'card', 'fast'], ['To the centre', 'city']]
    },
    faqH: 'What everyone asks',
    fact1: 'Check-in from 14:00, check-out by 12:00', fact2: 'Reception open 24 hours', fact3: 'Isani metro is a 3-minute walk',
    faqLink: 'See how to get around',
    qa: [
      ['How do I get here from the airport?', 'By taxi or Bolt it is about 20–25 minutes. Write to us in advance and we can arrange a transfer.'],
      ['Can I check in early or leave my bags?', 'We keep bags for free at any time. Early check-in is possible when a bed is free.'],
      ['Is there Wi-Fi and air conditioning?', 'Free Wi-Fi throughout the building. Dorms and private rooms have air conditioning.'],
      ['How do I pay?', 'Cash or card on arrival, in lari. No prepayment needed.'],
      ['Can I cancel?', 'Free of charge up to 24 hours before arrival. Just send us a message.'],
      ['Is there a washing machine?', 'Yes, a washer and a dryer for a small fee. Detergent is provided.']
    ],
    contactH: 'Book a bed', addr: 'Isani, Tbilisi<br>by Isani metro station',
    hRecep: 'Reception', hRecepV: '24 hours', hIn: 'Check-in', hOut: 'Check-out',
    fIn: 'Arrive', fOut: 'Leave', fGuests: 'Guests', fRoom: 'Room',
    send: 'Send via WhatsApp',
    est: (n, sum) => `${n} ${n === 1 ? 'night' : 'nights'} · about ${sum} ₾`, estNo: 'Choose dates to see the price',
    msg: (r, a, b, g, s) => `Hello! I would like to book at Hostel in Isani.\nRoom: ${r}\nArrive: ${a}\nLeave: ${b}\nGuests: ${g}\nPrice on the site: ~${s} ₾`,
    footH: 'See you in Isani',
    footP: 'Arriving late at night? Write to us: we will meet you and put the kettle on. We keep bags after check-out too.',
    footStreet: 'Isani, Tbilisi', footSocial: 'Instagram · Facebook',
    demo: 'Demo version: prices, contacts and room photos are samples.', credits: 'Photo credits',
    altDorm: 'Bunk beds in a dorm', altLounge: 'Shared lounge with sofas', altKitchen: 'Shared kitchen and dining tables',
    altMetro: 'The wave-shaped roof of Isani metro station', altMetroTall: 'Entrance to Isani metro station', altStreet: 'A street in Isani', altTrain: 'A Tbilisi metro train'
  },

  ru: {
    skip: 'К номерам', heroLine: 'Метро «Исани» · Тбилиси',
    h1: 'Хостел у метро<br>«Исани»',
    lead: 'Место в общем номере от 25 ₾, отдельные комнаты и общая кухня. До Старого города три станции метро.',
    cta: 'Выбрать даты и забронировать', cta2: 'Забронировать',
    navRooms: 'Номера', navRoute: 'Как добраться', navFaq: 'Вопросы', navContact: 'Контакты',
    aboutH: 'Письмо от хозяев',
    about1: 'Наш хостел не в центре, и в этом его главное достоинство. Исани — обычный Тбилиси: рынок, пекарня на углу, соседи, которые знают друг друга по имени.',
    about2: 'От двери до метро три минуты. Оттуда <mark>до Старого города три станции</mark>, до Руставели четыре. Ночью здесь тихо, а цены ниже, чем в центре.',
    about3: 'У нас общие номера на четыре, шесть и восемь мест, отдельный женский номер и несколько отдельных комнат. У каждой кровати есть шторка, лампа, розетка и шкафчик с замком.',
    about4: 'Кухня общая: чай и кофе бесплатно, полку в холодильнике подпишем вашим именем. Приезжайте, встретим.',
    signName: 'Хозяева хостела', signRole: 'Исани, Тбилиси', stubText: 'Пишите в любое время',
    roomsH: 'Номера и цены',
    roomsFoot: 'Шесть типов номеров. Цена за ночь, постельное бельё и полотенце включены.',
    perBed: '₾ место / ночь', perRoom: '₾ номер / ночь', book: 'Забронировать',
    rooms: {
      dorm8: ['Общий номер, 8 мест', 'Самый недорогой вариант. Двухъярусные кровати со шторками, у каждой своя лампа и розетка.', 'Кондиционер · шкафчик с замком · общая ванная'],
      dorm6f: ['Женский номер, 6 мест', 'Только для женщин, своя ванная рядом с номером.', 'Фен и зеркало · шкафчик с замком'],
      dorm4: ['Общий номер, 4 места', 'Небольшой тихий номер для тех, кто хочет меньше соседей.', 'Окно во двор · шкафчик с замком'],
      double: ['Двухместный номер', 'Одна большая кровать, своя ванная и рабочий стол.', 'Своя ванная · кондиционер · полотенца'],
      twin: ['Номер с двумя кроватями', 'Две отдельные кровати для друзей или коллег.', 'Общая ванная в коридоре · шкаф'],
      family: ['Семейный номер, 4 места', 'Большая кровать и двухъярусная, своя ванная.', 'Своя ванная · детская кроватка по запросу']
    },
    routeH: 'Из Исани куда угодно',
    routeP: 'Выберите, куда едете, и на билете появятся станции и время. Это первая линия, пересадок нет.',
    slipFrom: 'Билет:',
    dests: { oldtown: 'Старый город', rustaveli: 'Руставели', railway: 'Ж/д вокзал', busst: 'Автовокзал Дидубе', samgori: 'Самгори' },
    st: { isani: 'Исани', aragveli: '300 Арагвели', avlabari: 'Авлабари', liberty: 'Площадь Свободы', rustaveli: 'Руставели', marjanishvili: 'Марджанишвили', station: 'Вокзальная площадь', nadzaladevi: 'Надзаладеви', gotsiridze: 'Гоциридзе', didube: 'Дидубе', samgori: 'Самгори' },
    gWalk: 'Пешком', gMetro: 'На метро', walkToMetro: 'От хостела до метро', exitAt: 'Выход на станции',
    min: 'мин', stops: n => `${n} ${n === 1 ? 'станция' : n < 5 ? 'станции' : 'станций'}`, total: 'Всего, примерно',
    slipNote: 'Время примерное: между станциями около 2 минут.',
    galH: 'Как это выглядит', sample: 'Пример фото',
    tiles: {
      tDorm: ['Общий номер', ['8 мест', 'шторка', 'лампа', 'розетка'], ['Второй этаж', 'пример']],
      tMetro: ['Метро «Исани»', ['3 мин', 'линия 1', '06:00', '00:00'], ['Пешком от двери', 'Исани']],
      tKitchen: ['Кухня', ['чай', 'кофе', 'холодильник', 'плита'], ['Для всех', 'пример']],
      tTwin: ['Две кровати', ['2 места', 'окно', 'стол', 'шкаф'], ['Отдельный', 'пример']],
      tLounge: ['Гостиная', ['диван', 'Wi-Fi', 'книги', 'карты'], ['Первый этаж', 'пример']],
      tOld: ['Старый Тбилиси', ['3 станции', '~11 мин', 'бани', 'крепость'], ['Площадь Свободы', 'город']],
      tDouble: ['Двухместный', ['1 кровать', 'ванная', 'конд.', 'стол'], ['Отдельный', 'пример']],
      tTrain: ['Тбилисское метро', ['линия 1', '2 мин', 'карта', 'быстро'], ['До центра', 'город']]
    },
    faqH: 'Что спрашивают все',
    fact1: 'Заезд с 14:00, выезд до 12:00', fact2: 'Ресепшен круглосуточно', fact3: 'До метро «Исани» 3 минуты пешком',
    faqLink: 'Как добраться по городу',
    qa: [
      ['Как добраться из аэропорта?', 'На такси или Bolt около 20–25 минут. Напишите заранее, и мы закажем трансфер.'],
      ['Можно заехать раньше или оставить багаж?', 'Багаж храним бесплатно в любое время. Ранний заезд возможен, если место свободно.'],
      ['Есть ли Wi-Fi и кондиционер?', 'Бесплатный Wi-Fi во всём здании. В общих и отдельных номерах есть кондиционер.'],
      ['Как оплатить?', 'Наличными или картой на месте, в лари. Предоплата не нужна.'],
      ['Можно отменить бронь?', 'Бесплатно за 24 часа до заезда. Просто напишите нам.'],
      ['Есть ли стиральная машина?', 'Да, стиральная и сушильная, за небольшую плату. Порошок есть.']
    ],
    contactH: 'Забронировать место', addr: 'Исани, Тбилиси<br>рядом с метро «Исани»',
    hRecep: 'Ресепшен', hRecepV: '24 часа', hIn: 'Заезд', hOut: 'Выезд',
    fIn: 'Заезд', fOut: 'Выезд', fGuests: 'Гостей', fRoom: 'Номер',
    send: 'Отправить в WhatsApp',
    est: (n, sum) => `Ночей: ${n} · примерно ${sum} ₾`, estNo: 'Выберите даты, чтобы увидеть цену',
    msg: (r, a, b, g, s) => `Здравствуйте! Хочу забронировать в Hostel in Isani.\nНомер: ${r}\nЗаезд: ${a}\nВыезд: ${b}\nГостей: ${g}\nЦена на сайте: ~${s} ₾`,
    footH: 'До встречи в Исани',
    footP: 'Прилетаете поздно ночью? Напишите — встретим и поставим чайник. Багаж храним и после выезда.',
    footStreet: 'Исани, Тбилиси', footSocial: 'Instagram · Facebook',
    demo: 'Демо-версия: цены, контакты и фото номеров — примеры.', credits: 'Источники фото',
    altDorm: 'Двухъярусные кровати в общем номере', altLounge: 'Общая гостиная с диванами', altKitchen: 'Общая кухня и столы',
    altMetro: 'Волнообразная крыша станции метро «Исани»', altMetroTall: 'Вход на станцию «Исани»', altStreet: 'Улица в Исани', altTrain: 'Поезд тбилисского метро'
  }
};

let lang = (new URLSearchParams(location.search).get('lang') || localStorage.getItem('isani.lang') || 'ka');
if (!TEXT[lang]) lang = 'ka';
let dest = 'oldtown';
const $ = (s, r = document) => r.querySelector(s);
const T = () => TEXT[lang];
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

/* ---------- render ---------- */
function renderRooms() {
  const t = T();
  $('#deck').innerHTML = ROOMS.map((r, i) => {
    const [name, desc, feat] = t.rooms[r.id];
    return `<article class="card" data-i="${i}" tabindex="-1">
      <span class="spine" aria-hidden="true">${esc(name)}</span>
      <div class="card-text">
        <h3>${esc(name)}</h3>
        <p class="desc">${esc(desc)}</p>
        <p class="feat">${esc(feat)}</p>
        <p class="price"><span><strong>${r.price}</strong> ${r.perRoom ? t.perRoom : t.perBed}</span><a href="#contact" data-room="${r.id}">${t.book}</a></p>
      </div>
      <img src="img/${r.img}" width="${r.w}" height="${r.h}" alt="${esc(name)}" loading="lazy">
    </article>`;
  }).join('');
  $('#room-select').innerHTML = ROOMS.map(r => `<option value="${r.id}">${esc(t.rooms[r.id][0])} · ${r.price} ₾</option>`).join('');
  updateSpines();
}

function renderDest() {
  const t = T();
  $('#dest').innerHTML = DESTS.map(d =>
    `<button type="button" role="radio" aria-checked="${d.id === dest}" data-dest="${d.id}">${esc(t.dests[d.id])}</button>`).join('');
  renderSlip();
}

function renderSlip() {
  const t = T(), d = DESTS.find(x => x.id === dest);
  const path = d.to === 'samgori' ? ['isani', 'samgori'] : LINE.slice(0, LINE.indexOf(d.to) + 1);
  const stops = path.length - 1;
  const ride = stops * PER_STOP;
  const total = WALK_HOSTEL + ride + 2;
  const row = (l, r, cls = '') => `<div class="row ${cls}"><span>${l}</span><span class="dots"></span><span>${r}</span></div>`;
  let h = `<h3>${t.gWalk}</h3>` + row(esc(t.walkToMetro), `${WALK_HOSTEL} ${t.min}`);
  h += `<h3>${t.gMetro} · ${t.stops(stops)}</h3>`;
  path.forEach((s, i) => { h += row(esc(t.st[s]), i === 0 ? '0' : `+${i * PER_STOP} ${t.min}`); });
  h += `<h3>${t.gWalk}</h3>` + row(`${t.exitAt} ${esc(t.st[d.to])}`, `2 ${t.min}`);
  h += row(`${esc(t.dests[dest])} · ${t.total}`, `~${total} ${t.min}`, 'total');
  h += `<p class="note">${t.slipNote}</p>`;
  $('#slip-dest').textContent = t.dests[dest];
  $('#slip-rows').innerHTML = h;
}

function renderTiles() {
  const t = T();
  $('#tiles').innerHTML = TILES.map(x => {
    const [title, four, two] = t.tiles[x.k];
    return `<figure class="tile">
      <div class="ph"><img src="img/${x.img}" width="${x.w}" height="${x.h}" alt="${esc(title)}" loading="lazy"></div>
      <figcaption><span class="t">${esc(title)}</span>
        <span class="r">${four.map(esc).map(s => `<span>${s}</span>`).join('')}</span>
        <span class="r"><span>${esc(two[0])}</span><span>${esc(two[1])}</span></span>
      </figcaption></figure>`;
  }).join('');
  observe(document.querySelectorAll('.tile'));
}

function renderQA() {
  $('#qa').innerHTML = T().qa.map(([q, a]) => `<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join('');
}

function applyText() {
  const t = T();
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-t]').forEach(el => { const v = t[el.dataset.t]; if (typeof v === 'string') el.innerHTML = v; });
  document.querySelectorAll('[data-alt]').forEach(el => { const v = t[el.dataset.alt]; if (v) el.alt = v; });
  document.querySelectorAll('.lang button').forEach(b => b.setAttribute('aria-pressed', b.dataset.lang === lang));
  renderRooms(); renderDest(); renderTiles(); renderQA(); estimate();
}

/* ---------- rooms: fold into spines while pinned ---------- */
const desktop = matchMedia('(min-width: 861px)');
function updateSpines() {
  const cards = [...document.querySelectorAll('.card')];
  if (!desktop.matches) { cards.forEach(c => c.classList.remove('is-spine')); return; }
  const sec = $('#rooms'), r = sec.getBoundingClientRect();
  const span = sec.offsetHeight - innerHeight;
  const p = Math.min(1, Math.max(0, -r.top / span));
  const active = Math.round(p * (cards.length - 1));
  cards.forEach((c, i) => c.classList.toggle('is-spine', i < active));
}
$('#deck').addEventListener('click', e => {
  const c = e.target.closest('.card.is-spine'); if (!c) return;
  const sec = $('#rooms'), n = document.querySelectorAll('.card').length;
  const span = sec.offsetHeight - innerHeight;
  scrollTo({ top: sec.offsetTop + span * (+c.dataset.i / (n - 1)) - 2, behavior: 'smooth' });
});
addEventListener('scroll', () => requestAnimationFrame(updateSpines), { passive: true });
addEventListener('resize', updateSpines);

/* ---------- route picker ---------- */
$('#dest').addEventListener('click', e => {
  const b = e.target.closest('[data-dest]'); if (!b) return;
  dest = b.dataset.dest; renderDest();
  $(`[data-dest="${dest}"]`).focus();
});
$('#dest').addEventListener('keydown', e => {
  if (!['ArrowRight', 'ArrowLeft'].includes(e.key)) return;
  const i = DESTS.findIndex(d => d.id === dest);
  dest = DESTS[(i + (e.key === 'ArrowRight' ? 1 : DESTS.length - 1)) % DESTS.length].id;
  renderDest(); $(`[data-dest="${dest}"]`).focus(); e.preventDefault();
});

/* ---------- booking ---------- */
const form = $('#book');
function nights() {
  const a = new Date(form.in.value), b = new Date(form.out.value);
  const n = Math.round((b - a) / 864e5);
  return n > 0 ? n : 0;
}
function priceSum() {
  const r = ROOMS.find(x => x.id === form.room.value) || ROOMS[0];
  const g = Math.max(1, +form.guests.value || 1);
  return nights() * r.price * (r.perRoom ? 1 : g);
}
function estimate() {
  const n = nights();
  $('#estimate').textContent = n ? T().est(n, priceSum()) : T().estNo;
}
form.addEventListener('input', estimate);
form.addEventListener('submit', e => {
  e.preventDefault();
  if (!nights()) { form.out.focus(); estimate(); return; }
  const t = T(), r = ROOMS.find(x => x.id === form.room.value);
  const text = t.msg(t.rooms[r.id][0], form.in.value, form.out.value, form.guests.value, priceSum());
  window.open(`https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
});
document.addEventListener('click', e => {
  const a = e.target.closest('[data-room]'); if (a) { form.room.value = a.dataset.room; estimate(); }
});
(function defaultDates() {
  const d = new Date(), f = x => x.toISOString().slice(0, 10);
  form.in.min = f(d); form.out.min = f(d);
})();

/* ---------- language ---------- */
document.querySelectorAll('.lang button').forEach(b => b.addEventListener('click', () => {
  lang = b.dataset.lang; localStorage.setItem('isani.lang', lang); applyText();
}));

/* ---------- hero crossfade ---------- */
(function crossfade() {
  const imgs = [...document.querySelectorAll('.hero-photo img')];
  if (matchMedia('(prefers-reduced-motion: reduce)').matches || imgs.length < 2) return;
  let i = 0;
  setInterval(() => {
    if (document.hidden) return;
    imgs[i].classList.remove('is-on'); i = (i + 1) % imgs.length; imgs[i].classList.add('is-on');
  }, 5600);
})();

/* ---------- reveal ---------- */
const io = 'IntersectionObserver' in window ? new IntersectionObserver(es => es.forEach(en => {
  if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
}), { threshold: 0.12 }) : null;
function observe(list) { list.forEach(el => io ? io.observe(el) : el.classList.add('is-in')); }
observe(document.querySelectorAll('[data-reveal]'));
/* at the very bottom, show everything that is still waiting (short last screens never cross the threshold) */
addEventListener('scroll', () => {
  if (innerHeight + scrollY >= document.documentElement.scrollHeight - 8)
    document.querySelectorAll('[data-reveal]:not(.is-in), .tile:not(.is-in)').forEach(el => el.classList.add('is-in'));
}, { passive: true });

applyText();
