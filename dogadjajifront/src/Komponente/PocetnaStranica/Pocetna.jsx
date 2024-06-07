// HomePage.js
import React from 'react';
import './HomePage.css'; // Import the CSS file
import { FaLightbulb, FaNetworkWired, FaMapMarkerAlt } from 'react-icons/fa';

const HomePage = () => {
  return (
    <div>
      <section id="home" className="welcome-hero">
        <div className="container">
          <div className="welcome-hero-txt">
            <h2>Najbolje mesto za pronalazak i istraživanje događaja u Beogradu</h2>
            <p>
              Pronađite najbolje događaje, koncerte, izložbe, festivale i mnoge druge događaje u Beogradu na samo jedan klik.
            </p>
          </div>
          <div className="welcome-hero-serch-box">
            <div className="welcome-hero-form">
              <div className="single-welcome-hero-form">
                <h3>Šta tražite?</h3>
                <form action="index.html">
                  <input type="text" placeholder="Npr: koncert, izložba, festival" />
                </form>
                <div className="welcome-hero-form-icon">
                  <i className="flaticon-list-with-dots"></i>
                </div>
              </div>
              <div className="single-welcome-hero-form">
                <h3>Lokacija</h3>
                <form action="index.html">
                  <input type="text" placeholder="Npr: Kalemegdan, Sava Centar, Tašmajdan" />
                </form>
                <div className="welcome-hero-form-icon">
                  <i className="flaticon-gps-fixed-indicator"></i>
                </div>
              </div>
            </div>
            <div className="welcome-hero-serch">
              <button className="welcome-hero-btn" onClick={() => window.location.href = '#'}>
                Pretraži <i data-feather="search"></i> 
              </button>
            </div>
          </div>
        </div>
      </section>

      <section id="list-topics" className="list-topics">
        <div className="container">
          <div className="list-topics-content">
            <ul>
              <li>
                <div className="single-list-topics-content">
                  <div className="single-list-topics-icon">
                    <i className="flaticon-music"></i>
                  </div>
                  <h2><a href="#">Koncerti</a></h2>
                  <p>150 događaja</p>
                </div>
              </li>
              <li>
                <div className="single-list-topics-content">
                  <div className="single-list-topics-icon">
                    <i className="flaticon-exhibition"></i>
                  </div>
                  <h2><a href="#">Izložbe</a></h2>
                  <p>214 događaja</p>
                </div>
              </li>
              <li>
                <div className="single-list-topics-content">
                  <div className="single-list-topics-icon">
                    <i className="flaticon-festival"></i>
                  </div>
                  <h2><a href="#">Festivali</a></h2>
                  <p>185 događaja</p>
                </div>
              </li>
              <li>
                <div className="single-list-topics-content">
                  <div className="single-list-topics-icon">
                    <i className="flaticon-theater"></i>
                  </div>
                  <h2><a href="#">Pozorišne predstave</a></h2>
                  <p>200 događaja</p>
                </div>
              </li>
              <li>
                <div className="single-list-topics-content">
                  <div className="single-list-topics-icon">
                    <i className="flaticon-sports"></i>
                  </div>
                  <h2><a href="#">Sportski događaji</a></h2>
                  <p>120 događaja</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section id="works" className="works">
        <div className="container">
          <div className="section-header">
            <h2>Kako funkcioniše</h2>
            <p>Saznajte više o tome kako naš sajt funkcioniše</p>
          </div>
          <div className="works-content">
            <div className="row">
              <div className="col-md-4 col-sm-6">
                <div className="single-how-works">
                  <div className="single-how-works-icon">
                    <FaLightbulb />
                  </div>
                  <h2><a href="#">Izaberite <span> šta želite</span> raditi</a></h2>
                  <p>
                    Pronađite događaj koji vam najviše odgovara i saznajte sve potrebne informacije.
                  </p>
                  <button className="welcome-hero-btn how-work-btn" onClick={() => window.location.href = '#'}>
                    Pročitaj više
                  </button>
                </div>
              </div>
              <div className="col-md-4 col-sm-6">
                <div className="single-how-works">
                  <div className="single-how-works-icon">
                    <FaNetworkWired />
                  </div>
                  <h2><a href="#">Pronađite <span> šta vam treba</span></a></h2>
                  <p>
                    Koristite našu pretragu da brzo pronađete događaje po vašim interesovanjima.
                  </p>
                  <button className="welcome-hero-btn how-work-btn" onClick={() => window.location.href = '#'}>
                    Pročitaj više
                  </button>
                </div>
              </div>
              <div className="col-md-4 col-sm-6">
                <div className="single-how-works">
                  <div className="single-how-works-icon">
                    <FaMapMarkerAlt />
                  </div>
                  <h2><a href="#">Istražite <span> nevjerovatna</span> mesta</a></h2>
                  <p>
                    Otkrijte najbolje lokacije za događaje i doživite nezaboravne trenutke.
                  </p>
                  <button className="welcome-hero-btn how-work-btn" onClick={() => window.location.href = '#'}>
                    Pročitaj više
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="explore" className="explore">
        <div className="container">
          <div className="section-header">
            <h2>Istražite</h2>
            <p>Istražite nova mesta, događaje i kulturu u Beogradu i mnogo više</p>
          </div>
          <div className="explore-content">
            <div className="row">
              {/* Add explore items here */}
            </div>
          </div>
        </div>
      </section>

      <section id="reviews" className="reviews">
        <div className="section-header">
          <h2>Recenzije klijenata</h2>
          <p>Šta naši klijenti kažu o nama</p>
        </div>
        <div className="reviews-content">
          <div className="testimonial-carousel">
            {/* Add testimonials here */}
          </div>
        </div>
      </section>

      <section id="statistics" className="statistics">
        <div className="container">
          <div className="statistics-counter"> 
            <div className="col-md-3 col-sm-6">
              <div className="single-ststistics-box">
                <div className="statistics-content">
                  <div className="counter">90 </div> <span>K+</span>
                </div>
                <h3>Događaja</h3>
              </div>
            </div>
            <div className="col-md-3 col-sm-6">
              <div className="single-ststistics-box">
                <div className="statistics-content">
                  <div className="counter">40</div> <span>k+</span>
                </div>
                <h3>Kategorija događaja</h3>
              </div>
            </div>
            <div className="col-md-3 col-sm-6">
              <div className="single-ststistics-box">
                <div className="statistics-content">
                  <div className="counter">65</div> <span>k+</span>
                </div>
                <h3>Posetilaca</h3>
              </div>
            </div>
            <div className="col-md-3 col-sm-6">
              <div className="single-ststistics-box">
                <div className="statistics-content">
                  <div className="counter">50</div> <span>k+</span>
                </div>
                <h3>Zadovoljnih klijenata</h3>
              </div>
            </div>
          </div>  
        </div>
      </section>

      <section id="blog" className="blog">
        <div className="container">
          <div className="section-header">
            <h2>Novosti i članci</h2>
            <p>Uvek budite u toku sa najnovijim vestima i člancima</p>
          </div>
          <div className="blog-content">
            <div className="row">
              {/* Add blog items here */}
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="subscription">
        <div className="container">
          <div className="subscribe-title text-center">
            <h2>
              Želite da dodate svoj događaj kod nas?
            </h2>
            <p>
              Listrace vam nudi mogućnost da dodate svoj događaj i mi ćemo ga promovirati.
            </p>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <div className="subscription-input-group">
                <form action="#">
                  <input type="email" className="subscription-input-form" placeholder="Unesite vašu email adresu" />
                  <button className="appsLand-btn subscribe-btn" onClick={() => window.location.href = '#'}>
                    Kreiraj nalog
                  </button>
                </form>
              </div>
            </div>  
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
