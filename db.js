/* ==========================================
   SABİT İNCE CLIENT-SIDE DATABASE ENGINE (V3 - Webnode & Freeservers Integrated Data)
   ========================================== */

const DB_KEY = 'sabit_ince_database_v3';
const COUNTER_KEY = 'sabit_ince_counters_v3';

const INITIAL_DATABASE = {
  poems: [
    {
      id: 1,
      title: "Aşkın Ateşi",
      category: "tasavvuf",
      categoryName: "Tasavvuf & Aşk",
      excerpt: "Bir kıvılcım düştü özün bağına,\nYandı şu yüreğim aşkın koruna.\nBakmadım dünyanın şan u bağına,\nGözüm diktim dostun yüce yoluna.",
      fullPoem: "Bir kıvılcım düştü özün bağına,\nYandı şu yüreğim aşkın koruna.\nBakmadım dünyanın şan u bağına,\nGözüm diktim dostun yüce yoluna.\n\nNe malda gözüm var ne mülkte aklım,\nGönül kafesinde bir sırrım saklım.\nVuslat arzusuyla kalmadı takat,\nDostun bahçesinde güllerim haklım.\n\nÂşık İnce söyler hakikat kelam,\nAşkla çarpan her bir yüreğe selam.\nGönülden gönüle kurulsun köprü,\nSevgiyle tamamlansın dünyada kelam.",
      year: "1994",
      book: "Aşkın Ateşi",
      likes: 342
    },
    {
      id: 2,
      title: "Ve Aynı Rüzgârla Savrulduk",
      category: "duygusal",
      categoryName: "Duygusal & Hasret",
      excerpt: "Fırtına koptu da yaprak misali,\nAyrı yönlere düştü yolumuz.\nKimi bozkırda har, kimi gül hali,\nAynı rüzgârla savruldu ömrümüz.",
      fullPoem: "Fırtına koptu da yaprak misali,\nAyrı yönlere düştü yolumuz.\nKimi bozkırda har, kimi gül hali,\nAynı rüzgârla savruldu ömrümüz.\n\nGençliğin çağlayan coşkun suları,\nBirgün durgunlaşır bir akşamüstü.\nAnıların o tatlı, esrarengiz diyarı,\nMaziye bakınca göze tül düştü.\n\nTürkmenoğlu İnce der ki zaman az,\nAyrılık acısı sineye sığmaz.\nNe bahar geride kalır ne de yaz,\nSavrulan yapraklar dönmez geri hiç.",
      year: "2002",
      book: "Ve Aynı Rüzgârla Savrulduk",
      likes: 512
    },
    {
      id: 3,
      title: "Anadolu Sevdam (Gerce Köyü)",
      category: "vatan",
      categoryName: "Vatan & Memleket",
      excerpt: "Kozaklı'nın toprağından öz aldım,\nKapadokya diyarında iz aldım.\nAnadolu buram buram türküdür,\nTürkülerden içe doğan köz aldım.",
      fullPoem: "Kozaklı'nın toprağından öz aldım,\nKapadokya diyarında iz aldım.\nAnadolu buram buram türküdür,\nTürkülerden içe doğan köz aldım.\n\nErciyes'in başı dumanlı mağrur,\nKızılırmak kıvrım kıvrım sevdadır.\nHacı Bektaş Veli, Yunus'un özü,\nBu topraklar bize kutsal yuvadır.\n\nÂşık Garip söyler burda sözünü,\nTürk kültürüne dönderir yüzünü.\nEzelden ebede bir meşaledir,\nHiç kimse söndüremez bu közünü.",
      year: "2010",
      book: "Anadolu Hececileri",
      likes: 420
    },
    {
      id: 4,
      title: "İnce Zımba (Halk Taşlaması)",
      category: "taslama",
      categoryName: "Taşlama & Hiciv",
      excerpt: "Doğruyu söyleyene darılır eler,\nYalanı sarmalayıp bal diye yerler.\nCahil kürsüye geçip vaazlar verir,\nÂlime susup kenarda dur demek düşer.",
      fullPoem: "Doğruyu söyleyene darılır eler,\nYalanı sarmalayıp bal diye yerler.\nCahil kürsüye geçip vaazlar verir,\nÂlime susup kenarda dur demek düşer.\n\nParaya kul olmuş niceleri var,\nEdep ve hayadan kalmamış zerre.\nMasa başındakiler caka satarken,\nEmekçi hakkını arar bir zerre.\n\nGarip İnce der ki taşlarım haksızı,\nYüreğimde duyarsam mazlum sızıyı.\nKalemim kılıçtır, haktan yana durur,\nYazarım korkusuz haksız yazıyı.",
      year: "2015",
      book: "Sırlı Söz Suskun Satırlar",
      likes: 680
    },
    {
      id: 5,
      title: "Sırlı Söz Suskun Satırlar",
      category: "tasavvuf",
      categoryName: "Tasavvuf & Derinlik",
      excerpt: "Kelam ki gönülden çıkmazsa eğer,\nKulaktan kulağa boşa sürünür.\nBir sır ki sinede saklıdır meğer,\nGece çökünce yıldız gibi görünür.",
      fullPoem: "Kelam ki gönülden çıkmazsa eğer,\nKulaktan kulağa boşa sürünür.\nBir sır ki sinede saklıdır meğer,\nGece çökünce yıldız gibi görünür.\n\nSuskun satırlarda çığlıklar gizli,\nKâğıt ağlar da kalem sızlar durur.\nKimi insan vardır derin ve gizli,\nKimi de boş bir fıçı gibi vurur.",
      year: "2018",
      book: "Sırlı Söz Suskun Satırlar",
      likes: 290
    },
    {
      id: 6,
      title: "Dizelerde Bir Hayat",
      category: "duygusal",
      categoryName: "Duygusal & Otobiyografi",
      excerpt: "Kozaklı'dan başladım ömür yoluna,\nKalemimi adadım Türk'ün soyuna.\nGazeteler, yazılar, beste ve türkü,\nBir aşktır ki doyulmaz derin huyuna.",
      fullPoem: "Kozaklı'dan başladım ömür yoluna,\nKalemimi adadım Türk'ün soyuna.\nGazeteler, yazılar, beste ve türkü,\nBir aşktır ki doyulmaz derin huyuna.\n\nBizim Anadolu, Tercüman derken,\nANASAN çatısı kuruldu erken.\nKültür abideleri diktik sinede,\nYarınlara miras kalsın biz varken.",
      year: "2020",
      book: "Dizelerde Bir Hayat",
      likes: 310
    }
  ],

  books: [
    {
      id: 1,
      title: "Anadolu ve Azerbaycan Ağıtları (Altın Kalem Ödüllü)",
      type: "Folklor & Araştırma (2018 Altın Kalem Ödülü)",
      year: "2018",
      pages: "380 Sayfa",
      desc: "Türk dünyasının ortak acılarını, ağıt kültürünü ve etnomüzikolojik bağlarını belgeleyen, 2018 Altın Kalem Ödülü'ne layık görülen başyapıt.",
      isbn: "978-605-8291-15-7",
      fileUrl: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 2,
      title: "Aşkın Ateşi",
      type: "Şiir Kitabı",
      year: "1994",
      pages: "160 Sayfa",
      desc: "Sabit İnce'nin ilk şiir kitabı. Tasavvufi derinlik, lirik duyarlılık ve halk şiiri hece vezninin usta işi örnekleri.",
      isbn: "978-975-6742-01-2",
      fileUrl: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 3,
      title: "Ve Aynı Rüzgârla Savrulduk",
      type: "Şiir Kitabı",
      year: "2002",
      pages: "220 Sayfa",
      desc: "İnsan ilişkileri, gurbet, özlem ve zamanın akışına dair derin sorgulamalar içeren duygu yüklü şiir seçkisi.",
      isbn: "978-975-6742-05-9",
      fileUrl: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 4,
      title: "Anadolu Hececileri (1-6 Cilt Külliyat)",
      type: "Antoloji & Belgeler",
      year: "2008 - 2018",
      pages: "1850 Sayfa (Toplam 6 Cilt)",
      desc: "Anadolu'da hece ölçüsüyle yazan yüzlerce şair ve ozanın biyografisini ve eserlerini kapsayan devasa araştırma külliyatı.",
      isbn: "978-975-6742-12-7",
      fileUrl: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 5,
      title: "Sırlı Söz Suskun Satırlar",
      type: "Şiir & Taşlama",
      year: "2018",
      pages: "192 Sayfa",
      desc: "Toplumsal eleştiriler, felsefi hece şiirleri ve İnce Zımbalar köşesinin taşlama öğelerini barındıran eser.",
      isbn: "978-605-8291-03-4",
      fileUrl: "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 6,
      title: "ANASAN / ANASAM Şiir Antolojisi (1-3 Cilt)",
      type: "Kültür & Derleme",
      year: "2012 - 2020",
      pages: "960 Sayfa",
      desc: "ANASAN (Anadolu Şair, Yazar, Ozan, Bilim Adamları Birliği) şairlerinin seçkin eserlerinden oluşan anıt antoloji.",
      isbn: "978-605-8291-09-6",
      fileUrl: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 7,
      title: "Dizelerde Bir Hayat",
      type: "Otobiyografi & Şiir Seçkisi",
      year: "2020",
      pages: "240 Sayfa",
      desc: "Sabit İnce'nin yaşam öyküsü, ödülleri ve şiir yolculuğunu detaylandıran otobiyografik çalışma.",
      isbn: "978-605-8291-22-5",
      fileUrl: "https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&w=600&q=80"
    }
  ],

  audio: [
    {
      id: 1,
      title: "Kozaklı Güzellemesi",
      album: "Bozkırın Nefesi Albümü",
      duration: "03:45",
      type: "Söz & Beste: Sabit İnce",
      freq: 220,
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
    },
    {
      id: 2,
      title: "Gönülden Gönüle Anadolu",
      album: "ANASAN Türküleri",
      duration: "04:12",
      type: "Söz & Beste: Sabit İnce",
      freq: 261,
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
    },
    {
      id: 3,
      title: "Sıla Rüzgârı & Aşkın Ateşi",
      album: "Şiir Dinletisi & Ney",
      duration: "05:08",
      type: "Şiir Seslendirme & Bağlama",
      freq: 293,
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
    },
    {
      id: 4,
      title: "Sevdanın Adı ANASAN",
      album: "Ozanlar Ocağı",
      duration: "03:55",
      type: "Söz & Beste: Sabit İnce",
      freq: 330,
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3"
    }
  ],

  media: [
    {
      id: 1,
      title: "Sabit İnce & TRT Bizim Âşıklarımız Programı",
      type: "video",
      url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      caption: "TRT ve Yerel Televizyon Halk Şiiri Program Çekimleri"
    },
    {
      id: 2,
      title: "2018 Altın Kalem Ödül Töreni (İstanbul)",
      type: "photo",
      url: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80",
      caption: "Anadolu ve Azerbaycan Ağıtları Eseri İle Yılın Yayımlanmış Araştırma Ödülü"
    },
    {
      id: 3,
      title: "ANASAN Şairler Buluşması ve Şiir Gecesi",
      type: "photo",
      url: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&w=800&q=80",
      caption: "Anadolu Şair, Yazar, Ozan ve Bilim Adamları Birliği Etkinliği"
    }
  ],

  articles: [
    {
      id: 1,
      title: "Halk Şiirinde Hece Ölçüsünün Yarını",
      date: "14 Mart 2026",
      excerpt: "Modern zamanların getirdiği dijitalleşme karşısında hece ölçülü halk şiirimizin direnişi ve yeni nesillere aktarılmasında ozanlarımızın sorumlulukları...",
      content: "Modern zamanların getirdiği dijitalleşme karşısında hece ölçülü halk şiirimizin direnişi ve yeni nesillere aktarılmasında ozanlarımızın sorumlulukları büyüktür. Anadolu insanının sevinci, tasası, ağıdı heceye sığmıştır. Bu miras yaşatılmalıdır."
    },
    {
      id: 2,
      title: "Sanatçının Telif Hakkı ve ANASAN Mücadelesi",
      date: "22 Ocak 2026",
      excerpt: "Edebiyat eseri sahiplerinin haklarının korunması, korsan yayıncılıkla mücadele ve Anadolu şairlerinin hak ettiği değeri bulması üzerine bir çağrı...",
      content: "Edebiyat eseri sahiplerinin haklarının korunması, korsan yayıncılıkla mücadele ve Anadolu şairlerinin hak ettiği değeri bulması üzerine ANASAN olarak 30 yıldır aralıksız mücadele veriyoruz."
    },
    {
      id: 3,
      title: "2003'ten Günümüze Sabit İnce Edebiyat Ödülleri",
      date: "10 Aralık 2025",
      excerpt: "Edebiyat dünyamızın genç yeteneklerini teşvik etmek amacıyla başlatılan Sabit İnce Edebiyat Ödülleri'nin geleneksel yolculuğu...",
      content: "2003 yılından bu yana edebiyat sevdalılarının ve dostlarımızın katkılarıyla düzenlenen Sabit İnce Edebiyat Ödülleri, hece şiirine ve araştırmalarına emek veren nice gencimize ışık olmuştur."
    }
  ],

  guestbook: [
    {
      id: 1,
      name: "Dr. Mehmet Yılmaz",
      date: "02 Ağustos 2026",
      text: "Sabit İnce beyefendinin Anadolu hece şiirine yaptığı katkılar paha biçilemez. ANASAN çatısı altında yürüttüğü edebiyat seferberliğini ve Altın Kalem ödüllü eserlerini takdirle takip ediyoruz."
    },
    {
      id: 2,
      name: "Ayşe Özkan (Edebiyat Öğretmeni)",
      date: "28 Temmuz 2026",
      text: "'Aşkın Ateşi' şiirini öğrencilerimle her yıl derslerimizde işliyoruz. Sazının ve kaleminin bereketi daim olsun."
    },
    {
      id: 3,
      name: "Ozan Hüseyin Çelik",
      date: "15 Temmuz 2026",
      text: "Kayseri ve Nevşehir kültürünün canlı hafızası. İnce Zımbalar köşesini ve sabitince.webnode.com.tr sayfanızı yıllardır takip ederim. Hürmetlerimle."
    }
  ]
};

// Database Initializer Class
class AppDatabase {
  constructor() {
    this.data = this.loadData();
    this.counters = this.loadCounters();
  }

  loadData() {
    const stored = localStorage.getItem(DB_KEY);
    if (stored) {
      try { return JSON.parse(stored); } catch (e) { console.error(e); }
    }
    this.saveData(INITIAL_DATABASE);
    return INITIAL_DATABASE;
  }

  saveData(dataObj) {
    this.data = dataObj;
    localStorage.setItem(DB_KEY, JSON.stringify(dataObj));
  }

  loadCounters() {
    const stored = localStorage.getItem(COUNTER_KEY);
    if (stored) {
      try { return JSON.parse(stored); } catch (e) {}
    }
    const initCounters = { visitors: 28450, poemsRead: 74120, audioListened: 29840, worksCount: 24 };
    localStorage.setItem(COUNTER_KEY, JSON.stringify(initCounters));
    return initCounters;
  }

  incrementVisitor() {
    this.counters.visitors += 1;
    localStorage.setItem(COUNTER_KEY, JSON.stringify(this.counters));
    return this.counters;
  }

  incrementPoemRead() {
    this.counters.poemsRead += 1;
    localStorage.setItem(COUNTER_KEY, JSON.stringify(this.counters));
    return this.counters;
  }

  // --- CRUD OPERATIONS ---
  addPoem(poemObj) {
    poemObj.id = Date.now();
    poemObj.likes = 0;
    this.data.poems.unshift(poemObj);
    this.saveData(this.data);
    return poemObj;
  }

  deletePoem(id) {
    this.data.poems = this.data.poems.filter(p => p.id !== id);
    this.saveData(this.data);
  }

  addBook(bookObj) {
    bookObj.id = Date.now();
    this.data.books.unshift(bookObj);
    this.saveData(this.data);
    return bookObj;
  }

  deleteBook(id) {
    this.data.books = this.data.books.filter(b => b.id !== id);
    this.saveData(this.data);
  }

  addAudio(audioObj) {
    audioObj.id = Date.now();
    this.data.audio.unshift(audioObj);
    this.saveData(this.data);
    return audioObj;
  }

  deleteAudio(id) {
    this.data.audio = this.data.audio.filter(a => a.id !== id);
    this.saveData(this.data);
  }

  addMedia(mediaObj) {
    mediaObj.id = Date.now();
    this.data.media.unshift(mediaObj);
    this.saveData(this.data);
    return mediaObj;
  }

  deleteMedia(id) {
    this.data.media = this.data.media.filter(m => m.id !== id);
    this.saveData(this.data);
  }

  addArticle(articleObj) {
    articleObj.id = Date.now();
    this.data.articles.unshift(articleObj);
    this.saveData(this.data);
    return articleObj;
  }

  deleteArticle(id) {
    this.data.articles = this.data.articles.filter(a => a.id !== id);
    this.saveData(this.data);
  }

  addGuestbook(commentObj) {
    commentObj.id = Date.now();
    this.data.guestbook.unshift(commentObj);
    this.saveData(this.data);
    return commentObj;
  }

  exportJSON() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.data, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `Sabit_Ince_Tüm_Veriler_Yedek_${new Date().toISOString().slice(0,10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  }

  importJSON(jsonString) {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.poems && parsed.books) {
        this.saveData(parsed);
        return true;
      }
    } catch(e) {
      console.error("Geçersiz JSON Veritabanı", e);
    }
    return false;
  }

  resetToDefault() {
    this.saveData(INITIAL_DATABASE);
  }
}

const db = new AppDatabase();
