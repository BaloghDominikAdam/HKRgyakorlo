const udvozloCont = document.querySelector(".udvozloContainer");
const jatekDiv = document.querySelector(".jatekDiv");
const jatekGomb = document.querySelector(".jatekGomb");

const kerdesElem = document.querySelector(".kerdesDiv h3");
const valaszokDiv = document.querySelector(".valaszokDiv");
const ujraGomb = document.querySelector(".ujraGomb");
const osszegDiv = document.querySelector(".osszegDiv p");

const overlay = document.querySelector(".overlayNyeremeny");
const listaElemek = document.querySelectorAll(".nyeremenyLista li");





let aktualisKerdes = 0;
let jagerSzamlalo = 1;

let idozitoInterval;


const kerdesek = [
  {
    kerdes: "Mennyi a minimális tanulmányi átlag a tanulmányi ösztöndíjhoz?",
    valaszok: [
      { szoveg: "4,4", helyes: true },
      { szoveg: "3,0", helyes: false },
      { szoveg: "4,0", helyes: false },
      { szoveg: "5,0", helyes: false }
    ]
  },
  {
    kerdes: "Ki kezdeményezheti a fegyelmi eljárást a BGE-n?",
    valaszok: [
      { szoveg: "Bármely egyetemi polgár", helyes: true },
      { szoveg: "Csak a rektor", helyes: false },
      { szoveg: "Csak a DJB elnök", helyes: false },
      { szoveg: "Csak a dékán", helyes: false }
    ]
  },
  {
    kerdes: "Hány kreditet kell teljesíteni a tanulmányi ösztöndíjhoz?",
    valaszok: [
      { szoveg: "Legalább 27 kredit", helyes: true },
      { szoveg: "Legalább 20 kredit", helyes: false },
      { szoveg: "Legalább 30 kredit", helyes: false },
      { szoveg: "Legalább 24 kredit", helyes: false }
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
    kerdes: "Milyen esetben szűnik meg a hallgatói jogviszony?",
    valaszok: [
      { szoveg: "Ha a hallgató elvégzi a képzést", helyes: true },
      { szoveg: "Ha a hallgató szabadságra megy", helyes: false },
      { szoveg: "Ha szünetelteti a félévet", helyes: false },
      { szoveg: "Ha átiratkozik másik szakra", helyes: false }
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
      { szoveg: "A hallgató ideiglenes szüneteltetése", helyes: true },
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
    kerdes: "Ki dönt a kollégiumi felvételről?",
    valaszok: [
      { szoveg: "Kollégiumi Felvételi Bizottság (KFB)", helyes: true },
      { szoveg: "HTJB", helyes: false },
      { szoveg: "Rektorhelyettes", helyes: false },
      { szoveg: "HÖK", helyes: false }
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
    kerdes: "Hány napon belül lehet fellebbezni egy határozat ellen?",
    valaszok: [
      { szoveg: "15 munkanapon belül", helyes: true },
      { szoveg: "30 napon belül", helyes: false },
      { szoveg: "8 napon belül", helyes: false },
      { szoveg: "5 munkanapon belül", helyes: false }
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
    kerdes: "Mi történik, ha a hallgató nem fizeti be az önköltséget?",
    valaszok: [
      { szoveg: "Megszűnik a hallgatói jogviszonya", helyes: true },
      { szoveg: "Csak figyelmeztetést kap", helyes: false },
      { szoveg: "Elhalasztják a fizetést", helyes: false },
      { szoveg: "Mentesül a díj alól", helyes: false }
    ]
  },
  {
    kerdes: "Milyen dokumentum szabályozza a vizsgák rendjét?",
    valaszok: [
      { szoveg: "Tanulmányi és Vizsgaszabályzat (TVSZ)", helyes: true },
      { szoveg: "HKR melléklet", helyes: false },
      { szoveg: "Kari határozat", helyes: false },
      { szoveg: "Fegyelmi szabályzat", helyes: false }
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
      { szoveg: "Senátus", helyes: false }
    ]
  },
  {
    kerdes: "Mi a minimum KKI a tanulmányi ösztöndíjhoz?",
    valaszok: [
      { szoveg: "4,4", helyes: true },
      { szoveg: "3,0", helyes: false },
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
    kerdes: "Milyen esetben indulhat fegyelmi eljárás?",
    valaszok: [
      { szoveg: "Ha a hallgató megszegi a szabályzatot", helyes: true },
      { szoveg: "Ha nem ír vizsgát", helyes: false },
      { szoveg: "Ha késik az óráról", helyes: false },
      { szoveg: "Ha szóbeli vizsgát választ", helyes: false }
    ]
  },
  {
    kerdes: "Mi számít tanulmányi teljesítménynek?",
    valaszok: [
      { szoveg: "A megszerzett kredit és érdemjegyek", helyes: true },
      { szoveg: "A részvétel az órákon", helyes: false },
      { szoveg: "A hallgatói aktivitás", helyes: false },
      { szoveg: "A közéleti tevékenység", helyes: false }
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
    kerdes: "Mennyi a maximális vizsgalehetőség egy tárgyból?",
    valaszok: [
      { szoveg: "Három alkalom", helyes: true },
      { szoveg: "Egy alkalom", helyes: false },
      { szoveg: "Korlátlan", helyes: false },
      { szoveg: "Kétszer", helyes: false }
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
      { szoveg: "Korlátlanul", helyes: false }
    ]
  },
  {
    kerdes: "Melyik dokumentum tartalmazza a képzési követelményeket?",
    valaszok: [
      { szoveg: "Képzési és Kimeneti Követelmények (KKK)", helyes: true },
      { szoveg: "Tanulmányi szerződés", helyes: false },
      { szoveg: "TVSZ melléklet", helyes: false },
      { szoveg: "Rektori utasítás", helyes: false }
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
    kerdes: "Mikor kell beiratkozni az első félévre?",
    valaszok: [
      { szoveg: "A beiratkozási időszakban", helyes: true },
      { szoveg: "A vizsgaidőszakban", helyes: false },
      { szoveg: "A passzív időszakban", helyes: false },
      { szoveg: "Bármikor a félév alatt", helyes: false }
    ]
  },
  {
    kerdes: "Mi történik, ha a hallgató fegyelmi vétséget követ el?",
    valaszok: [
      { szoveg: "Fegyelmi eljárás indul ellene", helyes: true },
      { szoveg: "Megrovást kap szóban", helyes: false },
      { szoveg: "Tanulmányi figyelmeztetést kap", helyes: false },
      { szoveg: "Csak a DJB dönthet róla", helyes: false }
    ]
  },
  {
    kerdes: "Milyen értékelési formák léteznek a BGE-n?",
    valaszok: [
      { szoveg: "Érdemjegy és aláírás", helyes: true },
      { szoveg: "Csak vizsga", helyes: false },
      { szoveg: "Pontszám alapú", helyes: false },
      { szoveg: "Szóbeli értékelés", helyes: false }
    ]
  },
  {
    kerdes: "Mit jelent az abszolutórium?",
    valaszok: [
      { szoveg: "A tanulmányok lezárása vizsgák nélkül", helyes: true },
      { szoveg: "A diploma kiállítása", helyes: false },
      { szoveg: "A beiratkozás első félévre", helyes: false },
      { szoveg: "A tantárgyfelvétel lezárása", helyes: false }
    ]
  },
  {
    kerdes: "Mikor adható meg a hallgatói jogviszony szüneteltetése?",
    valaszok: [
      { szoveg: "Kérelem alapján", helyes: true },
      { szoveg: "Automatikusan", helyes: false },
      { szoveg: "A DJB döntése alapján", helyes: false },
      { szoveg: "Csak betegség esetén", helyes: false }
    ]
  },
  {
    kerdes: "Mi a vizsgaidőszak célja?",
    valaszok: [
      { szoveg: "A féléves tantárgyak teljesítése", helyes: true },
      { szoveg: "A tantárgyak újrafelvétele", helyes: false },
      { szoveg: "A tanterv jóváhagyása", helyes: false },
      { szoveg: "A hallgatói státusz ellenőrzése", helyes: false }
    ]
  },
  {
    kerdes: "Mit jelent a 'megajánlott jegy'?",
    valaszok: [
      { szoveg: "Vizsga nélküli értékelést", helyes: true },
      { szoveg: "Szóbeli vizsgát", helyes: false },
      { szoveg: "Kötelező újravizsgát", helyes: false },
      { szoveg: "Csak elméleti jegyet", helyes: false }
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
    kerdes: "Hány kredit szükséges a diploma megszerzéséhez alapképzésen?",
    valaszok: [
      { szoveg: "180 kredit", helyes: true },
      { szoveg: "150 kredit", helyes: false },
      { szoveg: "200 kredit", helyes: false },
      { szoveg: "240 kredit", helyes: false }
    ]
  },
  {
    kerdes: "Melyik időszakban nem lehet vizsgázni?",
    valaszok: [
      { szoveg: "A szorgalmi időszakban", helyes: true },
      { szoveg: "A vizsgaidőszakban", helyes: false },
      { szoveg: "A pótlási időszakban", helyes: false },
      { szoveg: "A tanév végén", helyes: false }
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
    kerdes: "Mi a záróvizsga célja?",
    valaszok: [
      { szoveg: "A tanulmányok lezárása és diploma megszerzése", helyes: true },
      { szoveg: "A vizsgaidőszak megnyitása", helyes: false },
      { szoveg: "A tantárgyfelvétel ellenőrzése", helyes: false },
      { szoveg: "A szorgalmi jegyek kiosztása", helyes: false }
    ]
  },
  {
    kerdes: "Mennyi a maximális tanulmányi idő alapképzésen?",
    valaszok: [
      { szoveg: "12 félév", helyes: true },
      { szoveg: "8 félév", helyes: false },
      { szoveg: "10 félév", helyes: false },
      { szoveg: "14 félév", helyes: false }
    ]
  }


]




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
      overlay.style.display = "none";
      kiszallasOverlay.style.display = "flex";
      kiszallasUzenet.textContent = `Elértél a ${jagerSzamlalo}. szintre és ${jagerSzamlalo} Jäger shotot szereztél! 🍀`;
    };


    visszaMenuBtn.onclick = () => {
      kiszallasOverlay.style.display = "none";
      jatekDiv.style.display = "none";
      udvozloCont.style.display = "flex";
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

  kerdesElem.textContent = "⏰ Lejárt az idő! Újrakezdés...";
  jagerSzamlalo = 1;
  frissitJager();

  setTimeout(() => {
    jatekDiv.style.display = "none";
    udvozloCont.style.display = "flex";
  }, 3000);
}







jatekGomb.addEventListener("click", (e) => {
    e.preventDefault();
    udvozloCont.style.display = "none";
    jatekDiv.style.display = "grid";
    kerdesek.sort(() => Math.random() - 0.5);
    aktualisKerdes = 0;
    jagerSzamlalo = 1;
    frissitJager();
    mutatKerdes();
});



function mutatKerdes() {
  inditIdozito();
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

  
  setTimeout(() => {
    mutatNyeremeny();
  }, 400);
}
     else {
        div.style.backgroundColor = "red";

       
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
