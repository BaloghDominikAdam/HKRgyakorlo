const udvozloCont = document.querySelector(".udvozloContainer");
const jatekDiv = document.querySelector(".jatekDiv");
const jatekGomb = document.querySelector(".jatekGomb");
const insideContainer = document.querySelector(".insideContainer")

const kerdesElem = document.querySelector(".kerdesDiv h3");
const valaszokDiv = document.querySelector(".valaszokDiv");
const ujraGomb = document.querySelector(".ujraGomb");
const osszegDiv = document.querySelector(".osszegDiv p");

const overlay = document.querySelector(".overlayNyeremeny");
const listaElemek = document.querySelectorAll(".nyeremenyLista li");


const focimAudio = document.querySelector(".focimAudio");
const rosszAudio = document.querySelector(".rosszAudio");
const joValaszAudio = document.querySelector(".joValaszAudio");
const kerdesAudio = document.querySelector(".kerdesAudio");
const cheering = document.querySelector(".cheering");


let aktualisKerdes = 0;
let jagerSzamlalo = 1;

let idozitoInterval;


focimAudio.volume = 0.04;
kerdesAudio.volume = 0.25;
joValaszAudio.volume = 0.2;
rosszAudio.volume = 0.2;
cheering.volume = 0.3;

function stopAllAudio() {
  [focimAudio, rosszAudio, joValaszAudio, kerdesAudio, cheering].forEach((audio) => {
    audio.pause();
    audio.currentTime = 0;
  });
}


const kerdesek = [
  {
    kerdes: "Mennyi idő áll rendelkezésre, az oklevél megszerzésére ?",
    valaszok: [
      { szoveg: "a képzési idő másfélszerese", helyes: true },
      { szoveg: "a képzési idő kétszerese", helyes: false },
      { szoveg: "az adott szak meghirdetett félévei", helyes: false },
      { szoveg: "az adott szak meghirdetett félévei plusz 3 hónap", helyes: false }
    ]
  },
  {
    kerdes: "Mit rövidít a 'TB' ?",
    valaszok: [
      { szoveg: "Tanulmányi Bizottság", helyes: true },
      { szoveg: "Tanulási Bíztatás", helyes: false },
      { szoveg: "Tantermi Biztonság", helyes: false },
      { szoveg: "Tudományos Bizottság", helyes: false }
    ]
  },
  {
    kerdes: "Mit rövidít a 'DJB' ?",
    valaszok: [
      { szoveg: "Diákjóléti Bizottság", helyes: true },
      { szoveg: "Diákigazolvány Jegyzési Bizottság", helyes: false },
      { szoveg: "Diákszövetségi Juttatási Bizottság", helyes: false },
      { szoveg: "Diákjogvédelmi Bizottság", helyes: false }
    ]
  },
  {
    kerdes: "Az alábbiak közül melyik NEM egy elérhetőségi email cím a DJBhez?",
    valaszok: [
      { szoveg: "djb.ngm@unibge.hu", helyes: true },
      { szoveg: "djb.pszk@unibge.hu", helyes: false },
      { szoveg: "djb.mukk@unibge.hu", helyes: false },
      { szoveg: "djb.mk@unibge.hu", helyes: false }
    ]
  },
  {
    kerdes: "Miért felel a DJB?",
    valaszok: [
      { szoveg: "Ösztöndíjak bírálatáért, valamint előterjesztéséért felel (előkészíti a pályázatokat a HTJB döntéséhez)", helyes: true },
      { szoveg: "A hallgatói rendezvények szervezéséért és lebonyolításáért", helyes: false },
      { szoveg: "A vizsgaidőszakok beosztásáért és az oktatók értékeléséért", helyes: false },
      { szoveg: "Az egyetemi sportprogramok és versenyek koordinálásáért", helyes: false }
    ]
  },
  {
    kerdes: "Mi a feladata a Tanulmányi Bizottságnak?",
    valaszok: [
      { szoveg: "Kérvények bírálása", helyes: true },
      { szoveg: "Tantermi beosztás megírása", helyes: false },
      { szoveg: "Tantárgyfelvételi lehetőségek biztosítása", helyes: false },
      { szoveg: "Ösztöndíjakra való jogosultság bírálás", helyes: false }
    ]
  },
  {
    kerdes: "Milyen jogviszony keletkezik a beiratkozással?",
    valaszok: [
      { szoveg: "Hallgatói jogviszony", helyes: true },
      { szoveg: "Munkaviszony", helyes: false },
      { szoveg: "Tanulói jogviszony", helyes: false },
      { szoveg: "Ideiglenes státusz", helyes: false }
    ]
  },
  {
    kerdes: "Melyik ösztöndíj nem teljesítmény alapú?",
    valaszok: [
      { szoveg: "Rendszeres szociális támogatás", helyes: true },
      { szoveg: "Tanulmányi ösztöndíj", helyes: false },
      { szoveg: "BGE ösztöndíj", helyes: false },
      { szoveg: "Nemzeti felsőoktatási ösztöndíj", helyes: false }
    ]
  },
  {
    kerdes: "Mit rövidít a 'FEB' ?",
    valaszok: [
      { szoveg: "Fegyelmi Bizottság", helyes: true },
      { szoveg: "Felelős Edukációs Bizottság", helyes: false },
      { szoveg: "Felelős Bizottság", helyes: false },
      { szoveg: "Független Elnöki Bizottság ", helyes: false }
    ]
  },
  {
    kerdes: "Mennyi ideig tart egy vizsgaidőszak általában?",
    valaszok: [
      { szoveg: "6 hét", helyes: true },
      { szoveg: "2 hét", helyes: false },
      { szoveg: "4 hét", helyes: false },
      { szoveg: "8 hét", helyes: false }
    ]
  },
  {
    kerdes: "Ki felel a tantárgy meghirdetéséért?",
    valaszok: [
      { szoveg: "A tantárgyfelelős oktató", helyes: true },
      { szoveg: "A dékán", helyes: false },
      { szoveg: "A DJB", helyes: false },
      { szoveg: "A tanulmányi osztály", helyes: false }
    ]
  },
  {
    kerdes: "Mi a passzív félév?",
    valaszok: [
      { szoveg: "A hallgatói jogviszony ideiglenes szüneteltetése", helyes: true },
      { szoveg: "A hallgató kizárása", helyes: false },
      { szoveg: "A vizsgák megismétlése", helyes: false },
      { szoveg: "A tanulmányok lezárása", helyes: false }
    ]
  },
  {
    kerdes: "Melyik dokumentumban szerepelnek a hallgatói kötelezettségek?",
    valaszok: [
      { szoveg: "Tanulmányi és Vizsgaszabályzatban (TVSZ)", helyes: true },
      { szoveg: "HKR-ben", helyes: false },
      { szoveg: "DJB szabályzatban", helyes: false },
      { szoveg: "Kari rendtartásban", helyes: false }
    ]
  },
  {
    kerdes: "Mit rövidít az 'OB'?",
    valaszok: [
      { szoveg: "Oktatási Bizottság", helyes: true },
      { szoveg: "Országos Bizottság", helyes: false },
      { szoveg: "Operatív Bizottság", helyes: false },
      { szoveg: "Oktatási Bírálóbizottság", helyes: false }
    ]
  },
  {
    kerdes: "Milyen formában zajlik a fellebbezés beadása?",
    valaszok: [
      { szoveg: "Neptun kérvény formájában", helyes: true },
      { szoveg: "Emailben", helyes: false },
      { szoveg: "Személyesen", helyes: false },
      { szoveg: "Telefonon", helyes: false }
    ]
  },
  {
    kerdes: "Egy hallgató kérelmére hány nap a elbírálási idő?",
    valaszok: [
      { szoveg: "15 nap + 30 nap hosszabbítással", helyes: true },
      { szoveg: "10 nap", helyes: false },
      { szoveg: "20 nap", helyes: false },
      { szoveg: "14 nap", helyes: false }
    ]
  },
  {
    kerdes: "Mikor jön létre a hallgatói jogviszony?",
    valaszok: [
      { szoveg: "A beiratkozással", helyes: true },
      { szoveg: "A felvételi döntéssel", helyes: false },
      { szoveg: "A tandíj befizetésével", helyes: false },
      { szoveg: "Az első órán való részvétellel", helyes: false }
    ]
  },
  {
    kerdes: "Mely tagokból áll össze, az OB",
    valaszok: [
      { szoveg: " EHÖK ELNÖK + EHÖK Tanulmányi Alelnök", helyes: true },
      { szoveg: "EHÖK elnök +   kari elnökök", helyes: false },
      { szoveg: "Elnök, DJB elnökök", helyes: false },
      { szoveg: "A bizottság elnöke az általános rektorhelyettes, a bizottság alelnöke az EHÖK delegáltja", helyes: false }
    ]
  },
  {
    kerdes: "Mely tagokból áll össze a Szenátus?",
    valaszok: [
      { szoveg: "EHÖK elnök + kari elnökök", helyes: true },
      { szoveg: " EHÖK ELNÖK + EHÖK Tanulmányi Alelnök", helyes: false },
      { szoveg: "Elnök, DJB elnökök", helyes: false },
      { szoveg: "A bizottság elnöke az általános rektorhelyettes, a bizottság alelnöke az EHÖK delegáltja", helyes: false }
    ]
  },
  {
    kerdes: "Mi a TVSZ rövidítés jelentése?",
    valaszok: [
      { szoveg: "Tanulmányi és Vizsgaszabályzat", helyes: true },
      { szoveg: "Tanulmányi Vizsga Szolgálat", helyes: false },
      { szoveg: "Tantervi Vizsgarend Szabályzat", helyes: false },
      { szoveg: "Tudományos Vizsgarendszer Szabályzat", helyes: false }
    ]
  },
  {
    kerdes: "Melyik bizottság dönt a juttatások és térítések ügyében?",
    valaszok: [
      { szoveg: "HTJB", helyes: true },
      { szoveg: "DJB", helyes: false },
      { szoveg: "HÖK", helyes: false },
      { szoveg: "Szenátus", helyes: false }
    ]
  },
  {
    kerdes: "Mi a minimum KKI a tanulmányi ösztöndíjhoz?",
    valaszok: [
      { szoveg: "4,4", helyes: true },
      { szoveg: "3,9", helyes: false },
      { szoveg: "4,0", helyes: false },
      { szoveg: "4,8", helyes: false }
    ]
  },
  {
    kerdes: "Mi a HKR rövidítés jelentése?",
    valaszok: [
      { szoveg: "Hallgatói Követelményrendszer", helyes: true },
      { szoveg: "Hallgatói Képzési Rend", helyes: false },
      { szoveg: "Hallgatói Kreditrendszer", helyes: false },
      { szoveg: "Hallgatói Kifizetési Rendszer", helyes: false }
    ]
  },
  {
    kerdes: "Mely tagok alkotját az FB-t?",
    valaszok: [
      { szoveg: "A bizottság elnöke, továbbá karonként egy-egy oktató és két hallgató", helyes: true },
      { szoveg: "EHÖK elnök + kari elnökök", helyes: false },
      { szoveg: "Elnök, DJB elnökök, karonként 1-1 oktató", helyes: false },
      { szoveg: " EHÖK ELNÖK + EHÖK Tanulmányi Alelnök", helyes: false }
    ]
  },
  {
    kerdes: "Mit rövidít, az FB",
    valaszok: [
      { szoveg: "Felülbírálati Bizottság", helyes: true },
      { szoveg: "FaceBook", helyes: false },
      { szoveg: "Felelős Bizottság", helyes: false },
      { szoveg: "Forgalmi Bizottság", helyes: false }
    ]
  },
  {
    kerdes: "Hány hónapra lehet pályázni évente a 'Bursa Hungarica' nevű ösztöndíjra?",
    valaszok: [
      { szoveg: "10 hónapra", helyes: true },
      { szoveg: "12 hónapra / 1 évre", helyes: false },
      { szoveg: "8 hónapra", helyes: false },
      { szoveg: "6 hónapra / 1 félévre", helyes: false }
    ]
  },
  {
    kerdes: "Milyen lehet a pályázók köre, a BGE ösztöndíjra?",
    valaszok: [
      { szoveg: "Alapképzés, nappali, önköltséges finanszírozási forma", helyes: true },
      { szoveg: "Mesterképzés, nappali, önköltséges finanszírozási forma", helyes: false },
      { szoveg: "Alapképzés, nappali, állami támogatott forma", helyes: false },
      { szoveg: "Mesterképzés, nappali, állami támogatott forma", helyes: false }
    ]
  },
  {
    kerdes: "Mi a célja, a BGE ösztöndíjnak?",
    valaszok: [
      { szoveg: "Kiemelkedő tanulmánnyal eredménnyel és szociálisan rászoruló ÖNKÖLTSÉGES hallgatók támogatása.", helyes: true },
      { szoveg: "Állami támogatott, kiemelkedő tanulmányi eredménnyel rendelkező hallgatók további ösztönzése.", helyes: false },
      { szoveg: "Önköltséges, gyenge tanulmányi eredménnyel rendelkező hallgatók ösztönzése.", helyes: false },
      { szoveg: "Külföldi tanulmányiutak finanszírozása kiemelkedő tanulmányi eredménnyel rendelkezŐ hallgatóknak.", helyes: false }
    ]
  },
  {
    kerdes: "Melyik NEM feltétel a BGE ösztöndíj megszerzéséhez?",
    valaszok: [
      { szoveg: "Aktív részvétel legalább két egyetemi sportversenyen.", helyes: true },
      { szoveg: "Legalább 2 lezárt aktív félév", helyes: false },
      { szoveg: "Féléves átlagban legalább 30 kredit teljesítése", helyes: false },
      { szoveg: "Az összesített limitált korrigált kreditindexe vagy összesített korrigált kreditindexminimum 3,5", helyes: false }
    ]
  },
  {
    kerdes: "A BGE ösztöndíj keretein belül, hány %-át kaphatják vissza a hallgatók, az adott félévre?",
    valaszok: [
      { szoveg: "50%", helyes: true },
      { szoveg: "75%", helyes: false },
      { szoveg: "25%", helyes: false },
      { szoveg: "62%", helyes: false }
    ]
  }
  ,
  {
    kerdes: "Melyik felületen kell pályázni a BGE ösztöndíjra?",
    valaszok: [
      { szoveg: "Modulo", helyes: true },
      { szoveg: "Emailben", helyes: false },
      { szoveg: "Neptunnon keresztül", helyes: false },
      { szoveg: "Az adott egyetem ügyfélszolgálatánál", helyes: false }
    ]
  },
  {
    kerdes: "Milyen lehet a pályázók köre, az Egyetemi sportösztöndíjra?",
    valaszok: [
      { szoveg: "Alapképzés, nappali, finanszírozási formától független", helyes: true },
      { szoveg: "Alapképzés, nappali, önköltséges", helyes: false },
      { szoveg: "Alapképzés, nappali, állami", helyes: false },
      { szoveg: "Mesterképzps, nappali, önköltséges", helyes: false }
    ]
  },
  {
    kerdes: "Milyen lehet a pályázók köre, a Közéleti ösztöndíjra?",
    valaszok: [
      { szoveg: "FOSZK, alap- és mesterképzés, nappali, finanszírozási formától független", helyes: true },
      { szoveg: "Alapképzés, nappali, finanszírozási formától független", helyes: false },
      { szoveg: "FOSZK, nappali, finanszírozási formától független", helyes: false },
      { szoveg: "Mesterképzps, nappali, önköltséges", helyes: false }
    ]
  },
  {
    kerdes: "Milyen lehet a pályázók köre, a Szakmai-tudományos ösztöndíjra?",
    valaszok: [
      { szoveg: "FOSZK, alap- és mesterképzés, nappali, finanszírozási formától független", helyes: true },
      { szoveg: "Alapképzés, nappali, finanszírozási formától független", helyes: false },
      { szoveg: "FOSZK, nappali, finanszírozási formától független", helyes: false },
      { szoveg: "Mesterképzps, nappali, önköltséges", helyes: false }
    ]
  },
  {
    kerdes: "Milyen lehet a pályázók köre, a Kiemelt Tanulmányi ösztöndíjra?",
    valaszok: [
      { szoveg: "Alapképzés, nappali, finanszírozási formától független", helyes: true },
      { szoveg: "FOSZK, alap- és mesterképzés, nappali, finanszírozási formától független", helyes: false },
      { szoveg: "FOSZK, nappali, finanszírozási formától független", helyes: false },
      { szoveg: "Mesterképzps, nappali, önköltséges", helyes: false }
    ]
  },
  {
    kerdes: "Milyen lehet a pályázók köre, a Nemzeti-felsőoktatási ösztöndíjra?",
    valaszok: [
      { szoveg: "Alap- és mesterképzés, nappali, finanszírozási formától független", helyes: true },
      { szoveg: "Alapképzés, nappali, finanszírozási formától független", helyes: false },
      { szoveg: "FOSZK, nappali, finanszírozási formától független", helyes: false },
      { szoveg: "Mesterképzps, nappali, önköltséges", helyes: false }
    ]
  }
  ,
  {
    kerdes: "Milyen lehet a pályázók köre, a Tanulmányi ösztöndíjra?",
    valaszok: [
      { szoveg: "FOSZK, alap- és mesterképzés, nappali, államis", helyes: true },
      { szoveg: "Alapképzés, nappali, finanszírozási formától független", helyes: false },
      { szoveg: "FOSZK, nappali, finanszírozási formától független", helyes: false },
      { szoveg: "Mesterképzps, nappali, önköltséges", helyes: false }
    ]
  },
  {
    kerdes: "Hány félévre, és milyen gyakorisággal jár a Tanulmányi ösztöndíj?",
    valaszok: [
      { szoveg: "Egy félévre jár havi szinten", helyes: true },
      { szoveg: "Két félévre jár havi szinten", helyes: false },
      { szoveg: "Három félévre jár havi szinten", helyes: false },
      { szoveg: "Négy félévre jár havi szinten", helyes: false }
    ]
  }
  ,
  {
    kerdes: "Az intézmény államilag támogatott teljes idejű képzésben részt vevő hallgatóinak legfeljebb hány % részesülhet Tanulmányi ösztöndíjban?",
    valaszok: [
      { szoveg: "50%", helyes: true },
      { szoveg: "60%", helyes: false },
      { szoveg: "70%", helyes: false },
      { szoveg: "40%", helyes: false }
    ]
  },
  {
    kerdes: "Melyik felületen kell pályázni a Nemzeti-felsőoktatási ösztöndíjra?",
    valaszok: [
      { szoveg: "Modulo", helyes: true },
      { szoveg: "Emailben", helyes: false },
      { szoveg: "Neptunnon keresztül", helyes: false },
      { szoveg: "Az adott egyetem ügyfélszolgálatánál", helyes: false }
    ]
  },
  {
    kerdes: "Melyik felületen kell pályázni a Kiemelt Tanulmányi ösztöndíjra?",
    valaszok: [
      { szoveg: "Neptunon keresztül", helyes: true },
      { szoveg: "Emailben", helyes: false },
      { szoveg: "Modulo", helyes: false },
      { szoveg: "Az adott egyetem ügyfélszolgálatánál", helyes: false }
    ]
  }
  ,
  {
    kerdes: "Mennyi a jutattása a Kiemelt Tanulmányi ösztöndíjnak?",
    valaszok: [
      { szoveg: "Félévente, 150.000Ft egyszeri jutattása", helyes: true },
      { szoveg: "Az egész képzés során, 150.000Ft egyszeri jutattása", helyes: false },
      { szoveg: "Havonta, 150.000Ft egyszeri jutattása", helyes: false },
      { szoveg: "Félévente 200.000Ft egyszeri jutattása", helyes: false }
    ]
  },
  {
    kerdes: "Karonként MAX hány fő részesülhet a Kiemelt Tanulmányi ösztöndíjban?",
    valaszok: [
      { szoveg: "Karonként 8 fő", helyes: true },
      { szoveg: "Karonként 10 fő", helyes: false },
      { szoveg: "Karonként 5 fő", helyes: false },
      { szoveg: "Karonként 20 fő", helyes: false }
    ]
  }
  ,
  {
    kerdes: "Az alábbiak közül melyik feltétel IGAZ a Kiemelt Tanulmányi ösztöndíj megszerzésére?",
    valaszok: [
      { szoveg: "Legalább 27 felvett és teljesített kredit, valamint minimum 4,4 KKI", helyes: true },
      { szoveg: "Legalább 28 felvett és teljesített kredit, valamint minimum 4,5 KKI", helyes: false },
      { szoveg: "Legalább 27 felvett és teljesített kredit, valamint minimum 4,5 KKI", helyes: false },
      { szoveg: "Legalább 28 felvett és teljesített kredit, valamint minimum 4,4 KKI", helyes: false }
    ]
  }
  ,
  {
    kerdes: "Melyik állítás IGAZ a Kiemelt Tanulmányi ösztöndíjjal kapcsolatban?",
    valaszok: [
      { szoveg: "Csak a Zuglói Kampuszon van (PSZK,MK)", helyes: true },
      { szoveg: "Karonként akár 20 fő is részesülhet benne", helyes: false },
      { szoveg: "Minden hallgató automatikusan megkapja az első félév után, aki elért minimum 4,4KKI-et.", helyes: false },
      { szoveg: "Csak mesterképzésen részt vevő hallgatók pályázhatnak rá.", helyes: false }
    ]
  }
  ,
  {
    kerdes: "Melyik NEM feltétele a Nemzeti-felsőoktatási ösztöndíj megszerzésére?",
    valaszok: [
      { szoveg: "Kötelező részvétel minden egyetemi rendezvényen a tanév során.", helyes: true },
      { szoveg: "Legalább 55 teljesített kredit 2 aktív félév során", helyes: false },
      { szoveg: "Előző 2 félévben 4,00 kreditindex, és szakmai munka (pl.: TDK, publikáció, szakkollégium)", helyes: false },
      { szoveg: "Mintatantervben meghatározott kreditmennyiség időarányosan legalább 90%-os teljesítése elvárt", helyes: false }
    ]
  },
  {
    kerdes: "Melyik felületen kell pályázni az Egyetemi sportösztöndíjra?",
    valaszok: [
      { szoveg: "Modulo", helyes: true },
      { szoveg: "Emailben", helyes: false },
      { szoveg: "Neptunnon keresztül", helyes: false },
      { szoveg: "Az adott egyetem ügyfélszolgálatánál", helyes: false }
    ]
  }
  ,
  {
    kerdes: "Melyik felületen kell pályázni a Szakmai-tudományos ösztöndíjra?",
    valaszok: [
      { szoveg: "Neptun", helyes: true },
      { szoveg: "Emailben", helyes: false },
      { szoveg: "Modulo", helyes: false },
      { szoveg: "Az adott egyetem ügyfélszolgálatánál", helyes: false }
    ]
  },
  {
    kerdes: "Milyen gyakoriságú, a Szakmai-tudományos ösztöndíj?",
    valaszok: [
      { szoveg: "Egyösszegű támogatás félévente", helyes: true },
      { szoveg: "Egyösszegű támogatás évente", helyes: false },
      { szoveg: "Egyösszegű támogatás havonta", helyes: false },
      { szoveg: "Egyösszegű támogatás a képzés teljes ideje alatt", helyes: false }
    ]
  },
  {
    kerdes: "Melyik felületen kell pályázni a Közéleti ösztöndíjra?",
    valaszok: [
      { szoveg: "Modulo", helyes: true },
      { szoveg: "Emailben", helyes: false },
      { szoveg: "Neptunnon keresztül", helyes: false },
      { szoveg: "Az adott egyetem ügyfélszolgálatánál", helyes: false }
    ]
  },
  {
    kerdes: "Milyen gyakorisággal kell pályázni a Közéleti ösztöndíjra?",
    valaszok: [
      { szoveg: "Havonta", helyes: true },
      { szoveg: "Félévente", helyes: false },
      { szoveg: "Évente", helyes: false },
      { szoveg: "Képzés során csak egyszer lehet", helyes: false }
    ]
  }
  ,
  {
    kerdes: "Mennyi kell legyen LEGALÁBB az utolsó aktív félévben elért KKI, az Egyetemi sportösztöndíjra való jelentkezésre?",
    valaszok: [
      { szoveg: "3,0 KKI", helyes: true },
      { szoveg: "3,5 KKI", helyes: false },
      { szoveg: "4,0 KKI", helyes: false },
      { szoveg: "4,5 KKI", helyes: false }
    ]
  },
  {
    kerdes: "Milyen formában kell jelentkezni kollégiumi helyért?",
    valaszok: [
      { szoveg: "Modulo felületen", helyes: true },
      { szoveg: "Emailen keresztül", helyes: false },
      { szoveg: "Neptun felületen", helyes: false },
      { szoveg: "Az adott egyetem ügyfélszolgálatán", helyes: false }
    ]
  }
  ,
  {
    kerdes: "Milyen lehet a pályázók köre, a 'Bursa Hungarica'-ra?",
    valaszok: [
      { szoveg: "FOSZK, alap- és mesterképzés, nappali, finanszírozási formától független", helyes: true },
      { szoveg: "Alap- és mesterképzés, nappali, finanszírozási formától független", helyes: false },
      { szoveg: "FOSZK, nappali, finanszírozási formától független", helyes: false },
      { szoveg: "FOSZK, nappali, állami", helyes: false }
    ]
  },
  {
    kerdes: "Mi történik, ha a hallgató háromszor megbukik egy tárgyból?",
    valaszok: [
      { szoveg: "A tárgyból eltilthatják", helyes: true },
      { szoveg: "Újra felveheti korlátlanul", helyes: false },
      { szoveg: "Átírják más tárgyra", helyes: false },
      { szoveg: "Fizetési kedvezményt kap", helyes: false }
    ]
  },
  {
    kerdes: "Hogyan lehet szüneteltetni a hallgatói jogviszonyt?",
    valaszok: [
      { szoveg: "Passzív félév igénylésével", helyes: true },
      { szoveg: "Leiratkozással", helyes: false },
      { szoveg: "Vizsgamentességgel", helyes: false },
      { szoveg: "Tanulmányi engedéllyel", helyes: false }
    ]
  },
  {
    kerdes: "Hol kell elintézni ha egy hallgató szeretne passzíváltatni?",
    valaszok: [
      { szoveg: "Neptun", helyes: true },
      { szoveg: "Emailben", helyes: false },
      { szoveg: "A modulo felületén", helyes: false },
      { szoveg: "Az adott egyetem ügyfélszolgáltán", helyes: false }
    ]
  },
  {
    kerdes: "Mely esetben NEM szűnik meg a hallgatói jogviszony?",
    valaszok: [
      { szoveg: "Ha a hallgató megbukott az egyik vizsgáján", helyes: true },
      { szoveg: "Ha a hallgató abszolutóriumot szerzett", helyes: false },
      { szoveg: "Ha a hallgatót egy másik felsőoktatás intézménybe felvettek", helyes: false },
      { szoveg: "Ha a hallgató úgy dönt és végrehajtja a szükséges lépéseket", helyes: false }
    ]
  },
  {
    kerdes: "Mennyi a maximális vizsgalehetőség egy tárgyból?",
    valaszok: [
      { szoveg: "Három alkalom", helyes: true },
      { szoveg: "Egy alkalom", helyes: false },
      { szoveg: "Korlátlan", helyes: false },
      { szoveg: "Kettő alkalom", helyes: false }
    ]
  },
  {
    kerdes: "Melyik szervezet képviseli a hallgatók érdekeit?",
    valaszok: [
      { szoveg: "HÖK", helyes: true },
      { szoveg: "DJB", helyes: false },
      { szoveg: "HTJB", helyes: false },
      { szoveg: "KFB", helyes: false }
    ]
  },
  {
    kerdes: "Mi a félév lezárásának feltétele?",
    valaszok: [
      { szoveg: "A vizsgák teljesítése", helyes: true },
      { szoveg: "A beiratkozás", helyes: false },
      { szoveg: "A tandíj befizetése", helyes: false },
      { szoveg: "A szorgalmi időszak kezdete", helyes: false }
    ]
  },
  {
    kerdes: "Mit jelent a kredit?",
    valaszok: [
      { szoveg: "A tanulmányi munka mennyiségi mértéke", helyes: true },
      { szoveg: "A vizsga eredménye", helyes: false },
      { szoveg: "A tantárgy ára", helyes: false },
      { szoveg: "A hallgatói státusz", helyes: false }
    ]
  },
  {
    kerdes: "Hány félévet lehet passzíválni egymás után?",
    valaszok: [
      { szoveg: "Legfeljebb két félévet", helyes: true },
      { szoveg: "Három félévet", helyes: false },
      { szoveg: "Egy félévet", helyes: false },
      { szoveg: "Korlátlan számban", helyes: false }
    ]
  },
  {
    kerdes: "Mi a definiciója az abszolutóriumnak?",
    valaszok: [
      { szoveg: "Vizsgák eredményes letétele (kivéve diplomamunka), tanulmányoki követelmények igazolja értékelés nélkül", helyes: true },
      { szoveg: "Teljes mértékben 'osztályelső', neki van a legjobb félévvégi eredménye és ezért ösztöndíjat kap", helyes: false },
      { szoveg: "Csak a kötelező tantárgyak teljesítését jelenti, a szabadon választható tárgyakat nem számítják bele", helyes: false },
      { szoveg: "Azonnali diploma megszerzését biztosító okirat, függetlenül a teljesített vizsgáktól", helyes: false }
    ]
  },
  {
    kerdes: "Hány félévet lehet passzíválni egy képzésen összesen?",
    valaszok: [
      { szoveg: "Négy félévet", helyes: true },
      { szoveg: "Három félévet", helyes: false },
      { szoveg: "Egy félévet", helyes: false },
      { szoveg: "Korlátlan számban", helyes: false }
    ]
  },
  {
    kerdes: "Mennyi a költsége egy tantárgy újrafelvételének?",
    valaszok: [
      { szoveg: "1. alkalom: 4500Ft, további: 9000Ft", helyes: true },
      { szoveg: "1. alkalom: 5000Ft, további: 10000Ft", helyes: false },
      { szoveg: "1. alkalom: 5500Ft, további: 11000Ft", helyes: false },
      { szoveg: "1. alkalom: 6000Ft, további: 12000Ft", helyes: false },

    ]
  },
  {
    kerdes: "Mennyi a költsége az Oklevélmelléklet kiállításának?",
    valaszok: [
      { szoveg: "12000Ft", helyes: true },
      { szoveg: "13000Ft", helyes: false },
      { szoveg: "14000Ft", helyes: false },
      { szoveg: "15000Ft", helyes: false },

    ]
  },
  {
    kerdes: "Mennyi a költsége egy Záróvizsgának jogviszonyon kívül",
    valaszok: [
      { szoveg: "20000Ft", helyes: true },
      { szoveg: "25000Ft", helyes: false },
      { szoveg: "15000Ft", helyes: false },
      { szoveg: "17000Ft", helyes: false },

    ]
  },
  {
    kerdes: "Melyik NEM IGAZ a 2025/26os tanévben kezdett hallgatói nyelvi követelményekre?",
    valaszok: [
      { szoveg: "Bemeneti szint C1", helyes: true },
      { szoveg: "Üzleti és társadalomtudományi idegen nyelv", helyes: false },
      { szoveg: "nyelvvizsgával nem kiváltható", helyes: false },
      { szoveg: "Üzleti és társadalomtudományi idegen nyelv C1-es kurzus", helyes: false },

    ]
  },
  {
    kerdes: "Mennyi a költsége a kredittúllépésnek 10%on felül?",
    valaszok: [
      { szoveg: "6000Ft / kredit", helyes: true },
      { szoveg: "6500Ft / kredit", helyes: false },
      { szoveg: "7000Ft / kredit", helyes: false },
      { szoveg: "5000Ft / kredit", helyes: false },

    ]
  },
  {
    kerdes: "Mit rövidít, a HTJB?",
    valaszok: [
      { szoveg: "Hallgatói Térítések és Juttatások Bizottsága", helyes: true },
      { szoveg: "Hallgatói Tudás Bővítési Bizottsága", helyes: false },
      { szoveg: "Halasztott Tanórai Jelenléti Bizottság", helyes: false },
      { szoveg: "Halmozott Tehetetlenség Jobbléti Bizottsága", helyes: false }
    ]
  },{
    kerdes: "Mit jelent a HKR rövidítés?",
    valaszok: [
      { szoveg: "Hallgatói Követelményrendszer", helyes: true },
      { szoveg: "Hallgatói Kifizetési Rendszer", helyes: false },
      { szoveg: "Hallgatói Képzési Rend", helyes: false },
      { szoveg: "Hivatalos Kreditrendszer", helyes: false }
    ]
  },
  {
    kerdes: "Ki hagyja jóvá a tanulmányi szabályzatot?",
    valaszok: [
      { szoveg: "A Szenátus", helyes: true },
      { szoveg: "A dékán", helyes: false },
      { szoveg: "A HÖK", helyes: false },
      { szoveg: "A DJB", helyes: false }
    ]
  },
  {
    kerdes: "Mely tagokból áll össze, a HTJB?",
    valaszok: [
      { szoveg: "A bizottság elnöke és az általános rektorhelyettes", helyes: true },
      { szoveg: "Elnök, DJB elnökök, karonként 1-1 oktató", helyes: false },
      { szoveg: "Az elnök, továbbá karonként egy-egy oktató", helyes: false },
      { szoveg: "EHÖK elnök + kari elnökök", helyes: false }
    ]
  },
  {
    kerdes: "Mit rövidít az SHSB",
    valaszok: [
      { szoveg: "Sajátos Szükségletű Hallgatókat Segítő Bizottság", helyes: true },
      { szoveg: "Sportolói Habilitációs és Szabadidős Bizottság", helyes: false },
      { szoveg: "Speciális Hallgatói Szolgáltatások Bizottsága", helyes: false },
      { szoveg: "Szociális Helyzetű Hallgatók Segítő Bizottság", helyes: false }
    ]
  },
  {
    kerdes: "Mely tagokból áll össze az SHSB",
    valaszok: [
      { szoveg: "Elnök, DJB elnökök, karonként 1-1 oktató", helyes: true },
      { szoveg: "EHÖK elnök +   kari elnökök", helyes: false },
      { szoveg: "Az elnök, továbbá karonként egy-egy oktató", helyes: false },
      { szoveg: "A bizottság elnöke, továbbá karonként egy-egy oktató és két hallgató", helyes: false }
    ]
  },
  {
    kerdes: "Mit rövidít a KÁB?",
    valaszok: [
      { szoveg: "Kreditátviteli Bizottság", helyes: true },
      { szoveg: "Kultúrát Átívelési Bizottság", helyes: false },
      { szoveg: "Költség Átváltási Bizottság", helyes: false },
      { szoveg: "Környezet Ápoló Bizottság", helyes: false }
    ]
  },
  {
    kerdes: "Mely tagokból áll a KÁB?",
    valaszok: [
      { szoveg: "Az elnök, továbbá karonként egy-egy oktató", helyes: true },
      { szoveg: "Elnök, DJB elnökök, karonként 1-1 oktató", helyes: false },
      { szoveg: "EHÖK elnök +   kari elnökök", helyes: false },
      { szoveg: " EHÖK ELNÖK + EHÖK Tanulmányi Alelnök", helyes: false }
    ]
  },
  {
    kerdes: "Hogy hívják a Rektorunkat?",
    valaszok: [
      { szoveg: "Dr. Andor György", helyes: true },
      { szoveg: "Dr. habil. Andor György", helyes: false },
      { szoveg: "Prof. Andor György", helyes: false },
      { szoveg: "Dr. Antal György", helyes: false }
    ]
  },
  {
    kerdes: "Ki hagyja jóvá a fegyelmi határozatot?",
    valaszok: [
      { szoveg: "A rektor", helyes: true },
      { szoveg: "A dékán", helyes: false },
      { szoveg: "A HÖK elnök", helyes: false },
      { szoveg: "A DJB elnök", helyes: false }
    ]
  },
  {
    kerdes: "Hogy hívják az Oktatási Központ vezetőjét?",
    valaszok: [
      { szoveg: "Szőke Erika Annamária", helyes: true },
      { szoveg: "Dr. Kalló Noémi", helyes: false },
      { szoveg: "Dr. habil. Szegedi Krisztina", helyes: false },
      { szoveg: "Dr. Jancsik András", helyes: false }
    ]
  },
  {
    kerdes: "Hogy hívják a PSZK általános rektorhelyettest?",
    valaszok: [
      { szoveg: "Dr. Jancsik András", helyes: true },
      { szoveg: "Dr. Kiss Kornélia", helyes: false },
      { szoveg: "Dr. Kardos Barbara", helyes: false },
      { szoveg: "Prof. Dr. Király Gábor", helyes: false }
    ]
  },
  {
    kerdes: "Mikor jár tanulmányi ösztöndíj?",
    valaszok: [
      { szoveg: "Kiemelkedő tanulmányi eredmény esetén", helyes: true },
      { szoveg: "Közéleti tevékenységért", helyes: false },
      { szoveg: "Sporteredményért", helyes: false },
      { szoveg: "Rendszeres jelenlétért", helyes: false }
    ]
  },
  {
    kerdes: "Hogy hívják a PSZK Oktatási rektorhelyettest?",
    valaszok: [
      { szoveg: "Dr. Kalló Noémi", helyes: true },
      { szoveg: "Dr. habil. Szegedi Krisztina", helyes: false },
      { szoveg: "Dr. Jancsik András", helyes: false },
      { szoveg: "Forman Norbert", helyes: false }
    ]
  },
  {
    kerdes: "Hogy hívják a Tudományos rektorhelyettest?",
    valaszok: [
      { szoveg: "Dr. habil. Szegedi Krisztina", helyes: true },
      { szoveg: "Szőke Erika Annamária", helyes: false },
      { szoveg: "Dr. Borzán Anita", helyes: false },
      { szoveg: "Dr. Frányó Zsófia Zsuzsanna", helyes: false }
    ]
  },
  {
    kerdes: "Hogy hívják a MÜKK Dékánt?",
    valaszok: [
      { szoveg: "Dr. habil. Zelena András", helyes: true },
      { szoveg: "Szőke Erika Annamária", helyes: false },
      { szoveg: "Dr. Jancsik András", helyes: false },
      { szoveg: "Dr. Frányó Zsófia Zsuzsanna", helyes: false }
    ]
  },
  {
    kerdes: "Hogy hívják az NGK Dékánt?",
    valaszok: [
      { szoveg: "Dr. Kiss Kornélia ", helyes: true },
      { szoveg: "Szőke Erika Annamária", helyes: false },
      { szoveg: "Dr. Jancsik András", helyes: false },
      { szoveg: "Dr. habil. Szegedi Krisztina", helyes: false }
    ]
  },
  {
    kerdes: "Hogy hívják az MK Dékánt?",
    valaszok: [
      { szoveg: "Prof. Dr. Király Gábor", helyes: true },
      { szoveg: "Szőke Erika Annamária", helyes: false },
      { szoveg: "Dr. Jancsik András", helyes: false },
      { szoveg: "Dr. habil. Szegedi Krisztina", helyes: false }
    ]
  },
  {
    kerdes: "Hogy hívják a PSZK Dékánunkat?",
    valaszok: [
      { szoveg: "Dr. Kardos Barbara", helyes: true },
      { szoveg: "Szőke Erika Annamária", helyes: false },
      { szoveg: "Dr. Jancsik András", helyes: false },
      { szoveg: "Dr. habil. Szegedi Krisztina", helyes: false }
    ]
  },
  {
    kerdes: "Hogy hívják a PSZK általános dékánhelyettest?",
    valaszok: [
      { szoveg: "Dr. Németh Krisztina", helyes: true },
      { szoveg: "Szőke Erika Annamária", helyes: false },
      { szoveg: "Prof. Dr. Király Gábor", helyes: false },
      { szoveg: "Dr. habil. Szegedi Krisztina", helyes: false }
    ]
  },
  {
    kerdes: "Hogy hívják a PSZK Oktatási dékánhelyettest?",
    valaszok: [
      { szoveg: "Dr. Pollák Zoltán", helyes: true },
      { szoveg: "Szőke Erika Annamária", helyes: false },
      { szoveg: "Dr. Kardos Barbara", helyes: false },
      { szoveg: "Dr. habil. Szegedi Krisztina", helyes: false }
    ]
  },
  {
    kerdes: "Hogy hívják a PSZK Nemzetközi kari vezetőt?",
    valaszok: [
      { szoveg: "Dr. Siklósi Ágnes", helyes: true },
      { szoveg: "Dr. Pollák Zoltán", helyes: false },
      { szoveg: "Dr. Kardos Barbara", helyes: false },
      { szoveg: "Dr. habil. Szegedi Krisztina", helyes: false }
    ]
  },
  {
    kerdes: "Hogy hívják a PSZK Tudományos kari vezetőt?",
    valaszok: [
      { szoveg: "Dr. Hegedűs Szilárd", helyes: true },
      { szoveg: "Dr. Pollák Zoltán", helyes: false },
      { szoveg: "Dr. Kardos Barbara", helyes: false },
      { szoveg: "Dr. Siklósi Ágnes", helyes: false }
    ]
  },
  {
    kerdes: "Hogy hívják a PSZK Informatika Tanszék vezetőt?",
    valaszok: [
      { szoveg: "Forman Norbert", helyes: true },
      { szoveg: "Dr. Pollák Zoltán", helyes: false },
      { szoveg: "Dr. Frányó Zsófia Zsuzsanna", helyes: false },
      { szoveg: "Dr. Fellegi Miklós", helyes: false }
    ]
  },
  {
    kerdes: "Hogy hívják a PSZK Kontrolling Tanszék vezetőt?",
    valaszok: [
      { szoveg: "Dr. Borzán Anita", helyes: true },
      { szoveg: "Forman Norbert", helyes: false },
      { szoveg: "Dr. Frányó Zsófia Zsuzsanna", helyes: false },
      { szoveg: "Dr. Fellegi Miklós", helyes: false }
    ]
  },
  {
    kerdes: "Hogy hívják a PSZK Pénzügyi Tanszék vezetőt?",
    valaszok: [
      { szoveg: "Dr. Fellegi Miklós", helyes: true },
      { szoveg: "Forman Norbert", helyes: false },
      { szoveg: "Dr. Frányó Zsófia Zsuzsanna", helyes: false },
      { szoveg: "Dr. Pollák Zoltán", helyes: false }
    ]
  },
  {
    kerdes: "Hogy hívják a PSZK Számviteli Tanszék vezetőt?",
    valaszok: [
      { szoveg: "Dr. Frányó Zsófia Zsuzsanna", helyes: true },
      { szoveg: "Forman Norbert", helyes: false },
      { szoveg: "Dr. Fellegi Miklós", helyes: false },
      { szoveg: "Dr. Pollák Zoltán", helyes: false }
    ]
  },
  {
    kerdes: "Hogy hívják az MK általános dékánhelyettest?",
    valaszok: [
      { szoveg: "Dr. Szászvári Karina Ágnes", helyes: true },
      { szoveg: "Szirtesné Kiss Ágota", helyes: false },
      { szoveg: "Dr. Fellegi Miklós", helyes: false },
      { szoveg: "Dr. habil. Kozma Tímea", helyes: false }
    ]
  },
  {
    kerdes: "Hogy hívják az MK Oktatási dékánhelyettest?",
    valaszok: [
      { szoveg: "Dr. Németh Szilárd", helyes: true },
      { szoveg: "Szirtesné Kiss Ágota", helyes: false },
      { szoveg: "Dr. Fellegi Miklós", helyes: false },
      { szoveg: "Dr. habil. Kozma Tímea", helyes: false }
    ]
  },
  {
    kerdes: "Hogy hívják az MK Nemzetközi kari vezetőt?",
    valaszok: [
      { szoveg: "Szirtesné Kiss Ágota", helyes: true },
      { szoveg: "Dr. Szászvári Karina Ágnes", helyes: false },
      { szoveg: "Dr. Fellegi Miklós", helyes: false },
      { szoveg: "Dr. habil. Kozma Tímea", helyes: false }
    ]
  },
  {
    kerdes: "Hogy hívják az MK Tudományos kari vezetőt?",
    valaszok: [
      { szoveg: "Dr. habil. Kozma Tímea", helyes: true },
      { szoveg: "Dr. Szászvári Karina Ágnes", helyes: false },
      { szoveg: "Dr. Fellegi Miklós", helyes: false },
      { szoveg: "Szirtesné Kiss Ágota", helyes: false }
    ]
  },
  {
    kerdes: "Hogy hívják az MK Emberi Erőforrás Fejlesztéi tanszék vezetőjét?",
    valaszok: [
      { szoveg: "Prof. Dr. Csillag Sára", helyes: true },
      { szoveg: "Dr. Szászvári Karina Ágnes", helyes: false },
      { szoveg: "Dr. Pecze Krisztina", helyes: false },
      { szoveg: "Szirtesné Kiss Ágota", helyes: false }
    ]
  },
  {
    kerdes: "Hogy hívják az MK Folyamatmenedzsment tanszék vezetőjét?",
    valaszok: [
      { szoveg: "Dr. habil. Kása Richárd", helyes: true },
      { szoveg: "Dr. Szászvári Karina Ágnes", helyes: false },
      { szoveg: "Dr. Pecze Krisztina", helyes: false },
      { szoveg: "Prof. Dr. Csillag Sára", helyes: false }
    ]
  },
  {
    kerdes: "Hogy hívják az MK Vállakozás és Innováció tanszék vezetőjét?",
    valaszok: [
      { szoveg: "Dr. Pecze Krisztina", helyes: true },
      { szoveg: "Dr. Szászvári Karina Ágnes", helyes: false },
      { szoveg: "Dr. habil. Kása Richárd", helyes: false },
      { szoveg: "Prof. Dr. Csillag Sára", helyes: false }
    ]
  },
  {
    kerdes: "Hogy hívják az MK Vállakozás és Innováció tanszék vezetőjét?",
    valaszok: [
      { szoveg: "Dr. Pecze Krisztina", helyes: true },
      { szoveg: "Dr. Szászvári Karina Ágnes", helyes: false },
      { szoveg: "Dr. habil. Kása Richárd", helyes: false },
      { szoveg: "Prof. Dr. Csillag Sára", helyes: false }
    ]
  },
  {
    kerdes: "Hogy hívják az MK Vezetés és Szervezés tanszék vezetőjét?",
    valaszok: [
      { szoveg: "Dr. Dén-Nagy Ildikó", helyes: true },
      { szoveg: "Dr. Szászvári Karina Ágnes", helyes: false },
      { szoveg: "Dr. habil. Kása Richárd", helyes: false },
      { szoveg: "Prof. Dr. Csillag Sára", helyes: false }
    ]
  },
  {
    kerdes: "Mit rövidít a 'HSZB'?",
    valaszok: [
      { szoveg: "Hallgatói Szociális Bizottság", helyes: true },
      { szoveg: "Hallgatói Szervezési Bizottság", helyes: false },
      { szoveg: "Hallgatói Szabályzat Bizottság", helyes: false },
      { szoveg: "Hallgatói Sport Bizottság", helyes: false }
    ]
  },
  {
    kerdes: "Hogy hívják a HSZB elnökét?",
    valaszok: [
      { szoveg: "Varga Anna", helyes: true },
      { szoveg: "Dr. Andor György", helyes: false },
      { szoveg: "Dr. Urbán Liliána", helyes: false },
      { szoveg: "Dr. Dén-Nagy Ildikó", helyes: false }
    ]
  },
  {
    kerdes: "Milyen döntésekról hozhat döntést a Rektor az alábbiak közül?",
    valaszok: [
      { szoveg: "Hallgatói jogviszony megszüntetése fizetési hátralék miatt", helyes: true },
      { szoveg: "Félév utólagos aktiválása", helyes: false },
      { szoveg: "Vizsgáról való távolmaradás igazolása", helyes: false },
      { szoveg: "Hallgatói kreditátviteli kérelmek", helyes: false }
    ]
  },
  {
    kerdes: "Milyen döntésekról hozhat döntést a HSZI az alábbiak közül?",
    valaszok: [
      { szoveg: "Hallgatói kreditátviteli kérelmek", helyes: true },
      { szoveg: "Kollégiumi méltányosság", helyes: false },
      { szoveg: "Vendéghallgatói jogviszony létrehozása", helyes: false },
      { szoveg: "Részképzés engedélyezése", helyes: false }
    ]
  },
  {
    kerdes: "Milyen döntésekról hozhat döntést a Dékán az alábbiak közül?",
    valaszok: [
      { szoveg: "Kollégiumi térítési díj megfizetésére adható kedvezmény", helyes: true },
      { szoveg: "Neptunban szereplő eredmények javítása", helyes: false },
      { szoveg: "Hallgatói jogviszony megszüntetése fizetési hátralék miatt", helyes: false },
      { szoveg: "Félév utólagos aktiválása", helyes: false }
    ]
  },
  {
    kerdes: "Ha egy jelentkező pótfelvételizni szeretne, akkor hány helyre tudja beadni a kérelmét?",
    valaszok: [
      { szoveg: "Csak 1 helyre", helyes: true },
      { szoveg: "Összesen 2 helyre", helyes: false },
      { szoveg: "Akár 3 helyre is", helyes: false },
      { szoveg: "Bármennyi helyre", helyes: false }
    ]
  },
  {
    kerdes: "Ha egy jelentkező pótfelvételizni szeretne, akkor hány helyre tudja beadni a kérelmét?",
    valaszok: [
      { szoveg: "Csak 1 helyre", helyes: true },
      { szoveg: "Összesen 2 helyre", helyes: false },
      { szoveg: "Akár 3 helyre is", helyes: false },
      { szoveg: "Bármennyi helyre", helyes: false }
    ]
  },
  {
    kerdes: "Mi formában lehet lebonyolítani a beiratkozást?",
    valaszok: [
      { szoveg: "Neptun -> Ügyintézés -> Féléves regisztráció", helyes: true },
      { szoveg: "Email formátumban", helyes: false },
      { szoveg: "A modulo felületén", helyes: false },
      { szoveg: "Az adott egyetem ügyfélszolgáltán", helyes: false }
    ]
  },
  {
    kerdes: "Mi NEM az aktív félévre beirtakozás feltétele?",
    valaszok: [
      { szoveg: "Budapesti Lakcím", helyes: true },
      { szoveg: "Ne legyen pénzügyi tartozás", helyes: false },
      { szoveg: "Önköltségi díj első részlet befizetése", helyes: false },
      { szoveg: "Legalább 1 tárgy felvétele", helyes: false }
    ]
  },
  {
    kerdes: "Melyik időszakban lehet felvenni a tárgyakat az adott félévre?",
    valaszok: [
      { szoveg: "A szorgalmi időszak 1. hetében", helyes: true },
      { szoveg: "A félév első 1 hónapjában", helyes: false },
      { szoveg: "Bármikor szabadon felvehető, és leadható", helyes: false },
      { szoveg: "A félév első felében", helyes: false }
    ]
  },
  {
    kerdes: "Az ajánlott kreditmennyiség maximum mennyi kredittel térhet el 30tól?",
    valaszok: [
      { szoveg: "Maximum 3", helyes: true },
      { szoveg: "Maximum 6", helyes: false },
      { szoveg: "Maximum 12", helyes: false },
      { szoveg: "Maximum 9", helyes: false }
    ]
  },
  {
    kerdes: "Mi a kreditérték meghatározása?",
    valaszok: [
      { szoveg: "Az összes hallgatói tanulmányi munkaóra alapján", helyes: true },
      { szoveg: "Egy bizonyos vizsgán elért eredmény", helyes: false },
      { szoveg: "Egy tantárgy ára, ha a hallgató önköltséges formán lenne (kredit * 10.000Ft)", helyes: false },
      { szoveg: "Egy ösztöndíj pályázása után lesz lehetőségünk ezeket gyűjteni", helyes: false }
    ]
  },
  {
    kerdes: "Az alapképzésen az első 5 aktív félévben hány db kreditet kell teljesíteni?",
    valaszok: [
      { szoveg: "75", helyes: true },
      { szoveg: "55", helyes: false },
      { szoveg: "150", helyes: false },
      { szoveg: "90", helyes: false }
    ]
  },
  {
    kerdes: "Mi a definíciója a következőnek: 'A korábban tanult tárgyaid mennyire egyeznek meg a mostani tantervednek (75% egyezőség szükséges)'?",
    valaszok: [
      { szoveg: "ekvivalenciavizsgálat", helyes: true },
      { szoveg: "Kreditátvitel", helyes: false },
      { szoveg: "Abszolutórium", helyes: false },
      { szoveg: "HKR", helyes: false }
    ]
  },
  {
    kerdes: "Ki NEM kezdeményezhet kreditelismerést?",
    valaszok: [
      { szoveg: "Az általános Dékánhelyettes", helyes: true },
      { szoveg: "Hallgató", helyes: false },
      { szoveg: "Oktató", helyes: false },
      { szoveg: "Szakfelelős", helyes: false }
    ]
  },
  {
    kerdes: "Melyik NEM IGAZ a megajánlot jeggyel kapcsolatban?",
    valaszok: [
      { szoveg: "Önköltséges hallgató kell legyél", helyes: true },
      { szoveg: "Nem kötelező elfogadni", helyes: false },
      { szoveg: "Vizsgaközpontban kell megírni", helyes: false },
      { szoveg: "Első zh minimum 50%-osan teljesíteni kell", helyes: false }
    ]
  },
  {
    kerdes: "Melyik NEM IGAZ a megajánlot jeggyel kapcsolatban?",
    valaszok: [
      { szoveg: "Önköltséges hallgató kell legyél", helyes: true },
      { szoveg: "Nem kötelező elfogadni", helyes: false },
      { szoveg: "Vizsgaközpontban kell megírni", helyes: false },
      { szoveg: "Első zh minimum 50%-osan teljesíteni kell", helyes: false }
    ]
  },
  {
    kerdes: "Mennyi a költsége minden 3. és további ismétlő- és javítóvizsga esetén?",
    valaszok: [
      { szoveg: "4500Ft", helyes: true },
      { szoveg: "5000Ft", helyes: false },
      { szoveg: "6000Ft", helyes: false },
      { szoveg: "5500Ft", helyes: false }
    ]
  },
  {
    kerdes: "Mennyi a költsége egy vizsgáról való igazolatlan távolmaradásnak?",
    valaszok: [
      { szoveg: "Első alkalommal 6000Ft, minden további alkalom 12000Ft", helyes: true },
      { szoveg: "Első alkalommal 5000Ft, minden további alkalom 10000Ft", helyes: false },
      { szoveg: "Első alkalommal 5500Ft, minden további alkalom 11000Ft", helyes: false },
      { szoveg: "Első alkalommal 6500Ft, minden további alkalom 13000Ft", helyes: false }
    ]
  },
  {
    kerdes: "Mit NEM SZABAD vinned egy Vizsgaközpontban megírt ZH-ra",
    valaszok: [
      { szoveg: "Nem zárható italt", helyes: true },
      { szoveg: "Fényképes igazolványt", helyes: false },
      { szoveg: "Számológépet", helyes: false },
      { szoveg: "Tollat", helyes: false }
    ]
  },
  {
    kerdes: "Mit NEM SZABAD vinned egy Vizsgaközpontban megírt ZH-ra",
    valaszok: [
      { szoveg: "Nem zárható italt", helyes: true },
      { szoveg: "Fényképes igazolványt", helyes: false },
      { szoveg: "Számológépet", helyes: false },
      { szoveg: "Tollat", helyes: false }
    ]
  }



]


window.addEventListener("load", () => {
  stopAllAudio();
  focimAudio.volume = 0.05;

  // Ha az első kattintás a "Játék" gomb, akkor ne induljon el a főcímzene
  document.addEventListener("click", (event) => {
    const jatekGomb = document.querySelector(".jatekGomb");
    
    // Ha NEM a játék gombra kattintott, akkor indítja el a zenét
    if (!jatekGomb.contains(event.target)) {
      focimAudio.play();
    }
  }, { once: true });
});

function playKerdesHang() {
  stopAllAudio();
  kerdesAudio.currentTime = 0;
  kerdesAudio.play();
}


function kever(tomb) {
    return tomb.sort(() => Math.random() - 0.5);
}

function inditIdozito() {
  const regIdozito = document.querySelector(".idozito");
  if (regIdozito) regIdozito.remove(); 

  let ido = 60; 
  const idozito = document.createElement("p");
  idozito.className = "idozito";
  idozito.textContent = `⏱️ Idő: ${ido} mp`;
  kerdesElem.parentElement.appendChild(idozito);

  clearInterval(idozitoInterval);
  idozitoInterval = setInterval(() => {
    ido--;
    idozito.textContent = `⏱️ Idő: ${ido} mp`;

    if (ido <= 0) {
      clearInterval(idozitoInterval);
      // idozito.textContent = "⏰ Lejárt az idő!";
      rosszValaszIdozitesLejarat();
    }
  }, 1000);
}


function mutatNyeremeny() {
  overlay.style.display = "flex";
  listaElemek.forEach((li) => li.classList.remove("active"));

  const index = 15 - jagerSzamlalo; 
  if (listaElemek[index]) listaElemek[index].classList.add("active");

  const gombok = document.querySelector(".kiszallasGombok");
  const tovabbBtn = document.getElementById("tovabbBtn");
  const kiszallokBtn = document.getElementById("kiszallokBtn");

  
  gombok.style.display = "none";

  
  const kiszallasOverlay = document.querySelector(".overlayKiszallas");
  const kiszallasUzenet = document.getElementById("kiszallasUzenet");
  const visszaMenuBtn = document.getElementById("visszaMenuBtn");

  
  if ([5, 10, 15].includes(jagerSzamlalo)) {
    gombok.style.display = "flex";

    
    if (jagerSzamlalo === 15) {
      tovabbBtn.style.display = "none";
    } else {
      tovabbBtn.style.display = "inline-block";
    }

    
    tovabbBtn.onclick = () => {
      gombok.style.display = "none";
      overlay.style.display = "none";
      aktualisKerdes++;
      mutatKerdes();
    };


    kiszallokBtn.onclick = () => {

    stopAllAudio();
    cheering.currentTime = 0;
    cheering.play();
      
      overlay.style.display = "none";
      kiszallasOverlay.style.display = "flex";
      kiszallasUzenet.textContent = `Elértél a ${jagerSzamlalo}. szintre és ${jagerSzamlalo} Jäger shotot szereztél! 🍀`;
    };


    visszaMenuBtn.onclick = () => {
      kiszallasOverlay.style.display = "none";
      jatekDiv.style.display = "none";
      udvozloCont.style.display = "flex";
      insideContainer.style.display = "none"
      jagerSzamlalo = 1;
      frissitJager();
    };
  } else {
    
    setTimeout(() => {
      overlay.style.display = "none";
      aktualisKerdes++;
      mutatKerdes();
    }, 5000);
  }
}





function rosszValaszIdozitesLejarat() {
  const osszesValasz = valaszokDiv.querySelectorAll(".valaszElso");
  if (osszesValasz.length === 0) return;

  osszesValasz.forEach((el) => (el.style.pointerEvents = "none"));

 
  osszesValasz.forEach((el) => {
    if (el.dataset.helyes === "true") el.style.backgroundColor = "green";
    else el.style.backgroundColor = "red";
  });

  rosszAudio.currentTime = 0;
  rosszAudio.play();

  kerdesElem.textContent = "⏰ Lejárt az idő! Újrakezdés...";
  jagerSzamlalo = 1;
  frissitJager();

  setTimeout(() => {
    jatekDiv.style.display = "none";
    udvozloCont.style.display = "flex";
    insideContainer.style.display = "none"
  }, 3000);
}


// function playKerdesHang(){
//     kerdesaudio.play();
//     kerdesaudio.volume = 0.5;
// }




jatekGomb.addEventListener("click", (e) => {
    e.preventDefault();
    udvozloCont.style.display = "none";
    jatekDiv.style.display = "grid";
    insideContainer.style.display = "flex"
    kerdesek.sort(() => Math.random() - 0.5);
    aktualisKerdes = 0;
    jagerSzamlalo = 1;
    frissitJager();
    mutatKerdes();
    
});



function mutatKerdes() {
  playKerdesHang();
  inditIdozito();
  kerdesAudio.currentTime = 0;
  kerdesAudio.play();
    if (aktualisKerdes >= kerdesek.length) {
        kerdesElem.textContent = `🎉 Gratulálok, vége a játéknak! A nyereményed: ${jagerSzamlalo} db Jäger shot`;
        valaszokDiv.innerHTML = "";
        return;
    }

   

    const kerdes = kerdesek[aktualisKerdes];
    kerdesElem.textContent = kerdes.kerdes;

    
    valaszokDiv.innerHTML = "";
    kever(kerdes.valaszok).forEach(v => {


        const div = document.createElement("div");
        div.classList.add("valaszElso");

        const pszoveg = document.createElement("p")
        pszoveg.textContent = v.szoveg;
        div.dataset.helyes = v.helyes ? "true" : "false";


        

        div.addEventListener("click", () => {

          clearInterval(idozitoInterval); 


      const osszesValasz = valaszokDiv.querySelectorAll(".valaszElso");
      osszesValasz.forEach((val) => (val.style.pointerEvents = "none")); 

      if (v.helyes) {
  div.style.backgroundColor = "green";
  jagerSzamlalo++;
  frissitJager();

  stopAllAudio();
  joValaszAudio.currentTime = 0;
        joValaszAudio.play();
  
  
  setTimeout(() => {
    mutatNyeremeny();
  }, 400);
}
     else {
        div.style.backgroundColor = "red";

        stopAllAudio();
        rosszAudio.currentTime = 0;
        rosszAudio.play();
       
        const helyesValasz = Array.from(osszesValasz).find((valElem, index) =>
          kerdes.valaszok.some(
            (valObj) =>
              valObj.helyes && valElem.textContent.trim() === valObj.szoveg.trim()
          )
        );
        if (helyesValasz) {
          helyesValasz.style.backgroundColor = "green";
        }

        kerdesElem.textContent = "❌ Rossz válasz! Újrakezdés...";
        jagerSzamlalo = 1;
        frissitJager();
        setTimeout(() => {
          location.reload();
        }, 2000);
      }
    });
    
        div.appendChild(pszoveg);
        valaszokDiv.appendChild(div);
    });
}


function frissitJager() {
    osszegDiv.textContent = `${jagerSzamlalo} Jäger shot`;
}


ujraGomb.addEventListener("click", () => {
    location.reload();
});





