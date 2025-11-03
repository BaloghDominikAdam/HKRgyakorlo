const udvozloCont = document.querySelector(".udvozloContainer");
const jatekDiv = document.querySelector(".jatekDiv");
const jatekGomb = document.querySelector(".jatekGomb");

const kerdesElem = document.querySelector(".kerdesDiv h3");
const valaszokDiv = document.querySelector(".valaszokDiv");
const ujraGomb = document.querySelector(".ujraGomb");
const osszegDiv = document.querySelector(".osszegDiv p");

let aktualisKerdes = 0;
let jagerSzamlalo = 1;

// kérdések
const kerdesek = [
  {
    kerdes: "Hány tagja van kari szinten a Diákjóléti Bizottságnak (DJB)?",
    valaszok: [
      { szoveg: "5 fő", helyes: true },
      { szoveg: "3 fő", helyes: false },
      { szoveg: "10 fő", helyes: false },
      { szoveg: "8 fő", helyes: false }
    ]
  },
  {
    kerdes: "Ki a DJB kari szintű elnöke?",
    valaszok: [
      { szoveg: "Kari DJB elnök", helyes: true },
      { szoveg: "Rektorhelyettes", helyes: false },
      { szoveg: "HKR vezető", helyes: false },
      { szoveg: "Kari HÖK elnök", helyes: false }
    ]
  },
  {
    kerdes: "Milyen feladata van a DJB-nek?",
    valaszok: [
      { szoveg: "Ösztöndíjak előkészítése és bírálata", helyes: true },
      { szoveg: "Tantárgyfelvétel engedélyezése", helyes: false },
      { szoveg: "Térítési díjak kiszabása", helyes: false },
      { szoveg: "Szabályzatírás", helyes: false }
    ]
  },
  {
    kerdes: "Hány tagja van az egyetemi szintű HTJB-nak?",
    valaszok: [
      { szoveg: "10 fő", helyes: true },
      { szoveg: "5 fő", helyes: false },
      { szoveg: "8 fő", helyes: false },
      { szoveg: "12 fő", helyes: false }
    ]
  },
  {
    kerdes: "Ki az egyetemi HTJB elnöke?",
    valaszok: [
      { szoveg: "Dr. Jancsik András", helyes: true },
      { szoveg: "Dr. Király Éva", helyes: false },
      { szoveg: "Varga Anna", helyes: false },
      { szoveg: "Balázsiné Dr. Farkas Katalin", helyes: false }
    ]
  },
  {
    kerdes: "Melyik karhoz tartozik Dr. Buday-Sántha Judit Andrea?",
    valaszok: [
      { szoveg: "MÜKK", helyes: true },
      { szoveg: "NGK", helyes: false },
      { szoveg: "MK", helyes: false },
      { szoveg: "PSZK", helyes: false }
    ]
  },
  {
    kerdes: "Hány tagból áll a Hallgatói Térítések és Juttatások Bizottsága (HTJB)?",
    valaszok: [
      { szoveg: "3 kari DJB elnök + hallgatói delegált", helyes: true },
      { szoveg: "5 kari DJB elnök", helyes: false },
      { szoveg: "10 kari delegált", helyes: false },
      { szoveg: "4 oktatói delegált", helyes: false }
    ]
  },
  {
    kerdes: "Mely ösztöndíj NEM teljesítmény alapú?",
    valaszok: [
      { szoveg: "Rendszeres szociális támogatás", helyes: true },
      { szoveg: "Tanulmányi ösztöndíj", helyes: false },
      { szoveg: "Nemzeti felsőoktatási ösztöndíj", helyes: false },
      { szoveg: "BGE ösztöndíj", helyes: false }
    ]
  },
  {
    kerdes: "Hol kell leadni a tanulmányi ösztöndíj pályázatát?",
    valaszok: [
      { szoveg: "Neptun → Ügyintézés → Kérvények", helyes: true },
      { szoveg: "Modulo", helyes: false },
      { szoveg: "Emailben a DJB-nek", helyes: false },
      { szoveg: "Személyesen a HÖK irodában", helyes: false }
    ]
  },
  {
    kerdes: "Mennyi a minimális KKI a tanulmányi ösztöndíjhoz?",
    valaszok: [
      { szoveg: "4,4", helyes: true },
      { szoveg: "3,5", helyes: false },
      { szoveg: "4,0", helyes: false },
      { szoveg: "5,0", helyes: false }
    ]
  },
  {
    kerdes: "Mennyi kreditet kell teljesíteni tanulmányi ösztöndíjhoz?",
    valaszok: [
      { szoveg: "Legalább 27 kreditet", helyes: true },
      { szoveg: "Legalább 20 kreditet", helyes: false },
      { szoveg: "Legalább 30 kreditet", helyes: false },
      { szoveg: "Legalább 24 kreditet", helyes: false }
    ]
  },
  {
    kerdes: "Mely karokon érhető el a tanulmányi ösztöndíj Zuglói Kampuszon?",
    valaszok: [
      { szoveg: "PSZK, MK", helyes: true },
      { szoveg: "NGK, MÜKK", helyes: false },
      { szoveg: "MK, MÜKK", helyes: false },
      { szoveg: "PSZK, NGK", helyes: false }
    ]
  },
  {
    kerdes: "Hol kell beadni a Kiemelt Tanulmányi Ösztöndíj pályázatát?",
    valaszok: [
      { szoveg: "Modulo", helyes: true },
      { szoveg: "Neptun", helyes: false },
      { szoveg: "Emailben", helyes: false },
      { szoveg: "Papíron", helyes: false }
    ]
  },
  {
    kerdes: "Mennyi teljesített kredit szükséges a Nemzeti Felsőoktatási Ösztöndíjhoz?",
    valaszok: [
      { szoveg: "Legalább 55 kredit", helyes: true },
      { szoveg: "Legalább 30 kredit", helyes: false },
      { szoveg: "Legalább 40 kredit", helyes: false },
      { szoveg: "Legalább 60 kredit", helyes: false }
    ]
  },
  {
    kerdes: "Milyen pályázatokhoz tartozik a szakmai munka (pl. TDK, publikáció)?",
    valaszok: [
      { szoveg: "Szakmai-tudományos ösztöndíj", helyes: true },
      { szoveg: "Közéleti ösztöndíj", helyes: false },
      { szoveg: "Szociális támogatás", helyes: false },
      { szoveg: "Sport ösztöndíj", helyes: false }
    ]
  },
  {
    kerdes: "Milyen gyakran kell pályázni a közéleti ösztöndíjra?",
    valaszok: [
      { szoveg: "Havonta", helyes: true },
      { szoveg: "Évente", helyes: false },
      { szoveg: "Félévente", helyes: false },
      { szoveg: "Egyszer", helyes: false }
    ]
  },
  {
    kerdes: "Melyik ösztöndíjhoz kell legalább 3,0 KKI?",
    valaszok: [
      { szoveg: "Sportösztöndíj", helyes: true },
      { szoveg: "Tanulmányi ösztöndíj", helyes: false },
      { szoveg: "Bursa Hungarica", helyes: false },
      { szoveg: "Közéleti ösztöndíj", helyes: false }
    ]
  },
  {
    kerdes: "Mi a BGE ösztöndíj célja?",
    valaszok: [
      { szoveg: "Önköltséges, kiemelkedő és rászoruló hallgatók támogatása", helyes: true },
      { szoveg: "Sporttevékenység jutalmazása", helyes: false },
      { szoveg: "TDK részvétel ösztönzése", helyes: false },
      { szoveg: "Egyetemi rendezvény támogatása", helyes: false }
    ]
  },
  {
    kerdes: "A BGE ösztöndíj maximum hány százaléka lehet az önköltségi díjnak?",
    valaszok: [
      { szoveg: "50%", helyes: true },
      { szoveg: "25%", helyes: false },
      { szoveg: "75%", helyes: false },
      { szoveg: "100%", helyes: false }
    ]
  },
  {
    kerdes: "Melyik ösztöndíj nem igényel pályázatot?",
    valaszok: [
      { szoveg: "Átsorolási ösztöndíj", helyes: true },
      { szoveg: "Tanulmányi ösztöndíj", helyes: false },
      { szoveg: "Rendszeres szociális támogatás", helyes: false },
      { szoveg: "Kiemelt tanulmányi ösztöndíj", helyes: false }
    ]
  },
  {
    kerdes: "Mennyi időn belül lehet fellebbezni egy határozat ellen?",
    valaszok: [
      { szoveg: "15 munkanapon belül", helyes: true },
      { szoveg: "8 napon belül", helyes: false },
      { szoveg: "30 napon belül", helyes: false },
      { szoveg: "10 munkanapon belül", helyes: false }
    ]
  },
  {
    kerdes: "Hol lehet beadni a fellebbezést?",
    valaszok: [
      { szoveg: "Neptun → Ügyintézés → Kérvények → Felülbírálati kérelem", helyes: true },
      { szoveg: "Modulo", helyes: false },
      { szoveg: "E-mailben", helyes: false },
      { szoveg: "Papíron", helyes: false }
    ]
  },
  {
    kerdes: "Lehet-e új dokumentumot csatolni fellebbezéskor?",
    valaszok: [
      { szoveg: "Nem, csak kivételes esetben", helyes: true },
      { szoveg: "Igen, bármikor", helyes: false },
      { szoveg: "Igen, de csak az első 5 napban", helyes: false },
      { szoveg: "Nem, soha", helyes: false }
    ]
  },
  {
    kerdes: "Ki dönt a kollégiumi felvételről?",
    valaszok: [
      { szoveg: "Kollégiumi Felvételi Bizottság (KFB)", helyes: true },
      { szoveg: "HTJB", helyes: false },
      { szoveg: "Rektori Hivatal", helyes: false },
      { szoveg: "HSZB", helyes: false }
    ]
  },
  {
    kerdes: "Milyen szempontok alapján bírálják a kollégiumi jelentkezést?",
    valaszok: [
      { szoveg: "Szociális helyzet, tanulmányi eredmény, sport, közösségi munka", helyes: true },
      { szoveg: "Életkor, lakhely, nem", helyes: false },
      { szoveg: "Tanulmányi átlag és fizetési hajlandóság", helyes: false },
      { szoveg: "Csak tanulmányi eredmény", helyes: false }
    ]
  },
  {
    kerdes: "Melyik ösztöndíjhoz tartozik önkormányzati és intézményi rész?",
    valaszok: [
      { szoveg: "Bursa Hungarica", helyes: true },
      { szoveg: "Tanulmányi ösztöndíj", helyes: false },
      { szoveg: "BGE ösztöndíj", helyes: false },
      { szoveg: "Sport ösztöndíj", helyes: false }
    ]
  },
  {
    kerdes: "Mennyi ideig folyósítják a Bursa Hungarica ösztöndíjat?",
    valaszok: [
      { szoveg: "10 hónapig", helyes: true },
      { szoveg: "6 hónapig", helyes: false },
      { szoveg: "12 hónapig", helyes: false },
      { szoveg: "4 hónapig", helyes: false }
    ]
  },
  {
    kerdes: "Kik pályázhatnak Alaptámogatásra?",
    valaszok: [
      { szoveg: "Első államilag támogatott félévüket töltő hallgatók", helyes: true },
      { szoveg: "Mesterképzéses hallgatók", helyes: false },
      { szoveg: "Önköltséges hallgatók", helyes: false },
      { szoveg: "Sportösztöndíjas hallgatók", helyes: false }
    ]
  },
  {
    kerdes: "Hol kell beadni a Rendszeres Szociális Támogatás pályázatát?",
    valaszok: [
      { szoveg: "Modulo", helyes: true },
      { szoveg: "Neptun", helyes: false },
      { szoveg: "Papíron", helyes: false },
      { szoveg: "E-mailben", helyes: false }
    ]
  },
  {
    kerdes: "Mi a Rendkívüli Szociális Támogatás célja?",
    valaszok: [
      { szoveg: "A hallgató helyzetének váratlan romlásának enyhítése", helyes: true },
      { szoveg: "Tanulmányi eredmények jutalmazása", helyes: false },
      { szoveg: "Kiemelt sportteljesítmény díjazása", helyes: false },
      { szoveg: "TDK részvétel ösztönzése", helyes: false }
    ]
  }
];


// egyszerű keverés
function kever(tomb) {
    return tomb.sort(() => Math.random() - 0.5);
}

// játék indítása
jatekGomb.addEventListener("click", (e) => {
    e.preventDefault();
    udvozloCont.style.display = "none";
    jatekDiv.style.display = "grid";
    kever(kerdesek);
    aktualisKerdes = 0;
    jagerSzamlalo = 1;
    frissitJager();
    mutatKerdes();
});

function mutatKerdes() {
    if (aktualisKerdes >= kerdesek.length) {
        kerdesElem.textContent = `🎉 Gratulálok, vége a játéknak! A nyereményed: ${jagerSzamlalo} db Jäger shot`;
        valaszokDiv.innerHTML = "";
        return;
    }

    const kerdes = kerdesek[aktualisKerdes];
    kerdesElem.textContent = kerdes.kerdes;

    // válaszok megkeverve
    valaszokDiv.innerHTML = "";
    kever(kerdes.valaszok).forEach(v => {
        const div = document.createElement("div");
        div.classList.add("valaszElso");
        div.textContent = v.szoveg;

        div.addEventListener("click", () => {
      const osszesValasz = valaszokDiv.querySelectorAll(".valaszElso");
      osszesValasz.forEach((val) => (val.style.pointerEvents = "none")); // lezárás kattintás után

      if (v.helyes) {
        div.style.backgroundColor = "green";
        jagerSzamlalo++;
        frissitJager();
        setTimeout(() => {
          aktualisKerdes++;
          mutatKerdes();
        }, 1000);
      } else {
        div.style.backgroundColor = "red";

        // helyes válasz megmutatása zölddel
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
    

        valaszokDiv.appendChild(div);
    });
}

// frissíti a „Jäger shot” kijelzést
function frissitJager() {
    osszegDiv.textContent = `${jagerSzamlalo} Jäger shot`;
}

// vissza gomb
ujraGomb.addEventListener("click", () => {
    location.reload();
});
