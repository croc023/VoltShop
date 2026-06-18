document.addEventListener("DOMContentLoaded", function() {

    function postaviKolacic(ime, vrednost, dani) {
        let datum = new Date();
        datum.setTime(datum.getTime() + (dani * 24 * 60 * 60 * 1000));
        let expires = "expires=" + datum.toUTCString();
        document.cookie = ime + "=" + vrednost + ";" + expires + ";path=/";
    }

    function dohvatiKolacic(ime) {
        let naziv = ime + "=";
        let dekodiraniKolacic = decodeURIComponent(document.cookie);
        let delovi = dekodiraniKolacic.split(';');
        for(let i = 0; i < delovi.length; i++) {
            let c = delovi[i].trim();
            if (c.indexOf(naziv) == 0) {
                return c.substring(naziv.length, c.length);
            }
        }
        return "";
    }

    const dugmeTema = document.getElementById("dugme-tema");
    const dugmeFont = document.getElementById("dugme-font");
    const teloIspis = document.body;

    let sacuvanaTema = dohvatiKolacic("korisnicka_tema");
    let sacuvanFont = dohvatiKolacic("korisnicki_font");

    if (sacuvanaTema === "tamna") {
        teloIspis.classList.remove("svetla-tema");
        teloIspis.classList.add("tamna-tema");
    }
    if (sacuvanFont === "veliki") {
        teloIspis.classList.add("veliki-font");
    }

    if (dugmeTema) {
        dugmeTema.addEventListener("click", function() {
            if (teloIspis.classList.contains("svetla-tema")) {
                teloIspis.classList.remove("svetla-tema");
                teloIspis.classList.add("tamna-tema");
                postaviKolacic("korisnicka_tema", "tamna", 7);
            } else {
                teloIspis.classList.remove("tamna-tema");
                teloIspis.classList.add("svetla-tema");
                postaviKolacic("korisnicka_tema", "svetla", 7);
            }
        });
    }

    if (dugmeFont) {
        dugmeFont.addEventListener("click", function() {
            teloIspis.classList.toggle("veliki-font");
            if (teloIspis.classList.contains("veliki-font")) {
                postaviKolacic("korisnicki_font", "veliki", 7);
            } else {
                postaviKolacic("korisnicki_font", "standardni", 7);
            }
        });
    }

    const hamburgerDugme = document.getElementById("hamburger-dugme");
    const navigacioniMeni = document.getElementById("navigacioni-meni");

    if (hamburgerDugme && navigacioniMeni) {
        hamburgerDugme.addEventListener("click", function() {
            navigacioniMeni.classList.toggle("prikazi");
        });
    }

    const slajdovi = document.querySelectorAll(".slajd");
    let trenutniSlajd = 0;

    if (slajdovi.length > 0) {
        setInterval(function() {
            slajdovi[trenutniSlajd].classList.remove("aktivni-slajd");
            trenutniSlajd = (trenutniSlajd + 1) % slajdovi.length;
            slajdovi[trenutniSlajd].classList.add("aktivni-slajd");
        }, 5000); 
    }

    const slajdoviSlike = document.querySelectorAll(".slajd-slika");
    let trenutniSlajdSlika = 0;
    const intervalSmenaSlike = 4000; 

    function sledecaSlika() {
        if (slajdoviSlike.length > 0) {
            slajdoviSlike[trenutniSlajdSlika].classList.remove("aktivna");
            trenutniSlajdSlika = (trenutniSlajdSlika + 1) % slajdoviSlike.length;
            slajdoviSlike[trenutniSlajdSlika].classList.add("aktivna");
        }
    }

    if (slajdoviSlike.length > 0) {
        setInterval(sledecaSlika, intervalSmenaSlike);
    }

    const kontaktForma = document.getElementById("kontakt-forma");
    
    if (kontaktForma) {
        kontaktForma.addEventListener("submit", function(dogadjaj) {
            dogadjaj.preventDefault(); 
            
            let validno = true;
            
            const ulazIme = document.getElementById("ime");
            const ulazEmail = document.getElementById("email");
            const ulazPoruka = document.getElementById("poruka");
            
            const greskaIme = document.getElementById("greska-ime");
            const greskaEmail = document.getElementById("greska-email");
            const greskaPoruka = document.getElementById("greska-poruka");
            const porukaUspeh = document.getElementById("poruka-uspeh");

            greskaIme.textContent = "";
            greskaEmail.textContent = "";
            greskaPoruka.textContent = "";
            porukaUspeh.style.display = "none";

            if (ulazIme.value.trim().length < 4) {
                greskaIme.textContent = "Ime i prezime moraju imati najmanje 4 karaktera.";
                validno = false;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(ulazEmail.value.trim())) {
                greskaEmail.textContent = "Unesite validnu e-mail adresu.";
                validno = false;
            }

            if (ulazPoruka.value.trim().length < 10) {
                greskaPoruka.textContent = "Poruka mora sadržati barem 10 karaktera.";
                validno = false;
            }

            if (validno) {
                porukaUspeh.style.display = "block";
                const zvuk = document.getElementById("zvuk-uspeh");
                if (zvuk) {
                    zvuk.play();
                }
                kontaktForma.reset();
            }
        });
    }

    const ytOmotac = document.getElementById('yt-omotač');
    if (ytOmotac) {
        ytOmotac.addEventListener('click', function() {
            if (window.location.protocol === 'file:') {
                window.open('https://youtu.be/OkZvMqQ_uAc', '_blank');
            } else {
                this.innerHTML = `<iframe 
                    width="100%" 
                    height="100%" 
                    src="https://www.youtube.com/embed/OkZvMqQ_uAc?autoplay=1" 
                    title="YouTube video player" 
                    style="border:0; display: block; position: absolute; top:0; left:0;" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    allowfullscreen>
                </iframe>`;
            }
        });
    }
});