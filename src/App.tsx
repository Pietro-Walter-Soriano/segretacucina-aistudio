import { motion, AnimatePresence } from "motion/react";
import { Menu, X, MapPin, Smile, Sun } from "lucide-react";
import React, { useState, useEffect } from "react";
import ScrollStack, { ScrollStackItem } from "./components/ScrollStack";

import CircularGallery from "./components/CircularGallery";
import Lanyard from "./components/Lanyard";

const fadeUpVariant = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 100, damping: 12 } }
};

const BouncyBtn = ({ children, primary }: { children: React.ReactNode, primary?: boolean }) => (
  <motion.button
    whileHover={{ scale: 1.1, rotate: -3 }}
    whileTap={{ scale: 0.95, rotate: 3 }}
    className={`font-bold py-3 px-8 rounded-full shadow-lg text-xl border-4 ${
      primary 
        ? "bg-giallo text-blu-scuro border-bianco" 
        : "bg-bianco text-blu-scuro border-giallo"
    }`}
  >
    {children}
  </motion.button>
);

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const LOGO_URL = "/logo.png"; // Replace with your uploaded logo
  const TABLES_URL = "https://storage.googleapis.com/aistudio-yeti-public-assets/k8p8x0k44n89.jpeg";

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  return (
    <div className="bg-bianco min-h-screen text-blu-scuro overflow-x-hidden font-sans relative">
      
      {/* Vip Pass Fixed to Top Right */}
      <div className="fixed -top-16 md:-top-24 right-4 md:right-12 z-40 w-48 h-[450px] md:w-72 md:h-[700px] pointer-events-auto">
        <Lanyard 
          position={[0, 0, 25]} 
          gravity={[0, -40, 0]} 
          frontImage="https://images.unsplash.com/photo-1544148103-0773bf10d330?q=80&w=600&auto=format&fit=crop"
          backImage="https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=600&auto=format&fit=crop"
          imageFit="cover"
          lanyardWidth={1.5}
        />
      </div>

      {/* Navigation */}
      <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ease-out ${isScrolled ? "bg-bianco/95 backdrop-blur-md shadow-lg py-3" : "bg-gradient-to-b from-azzurro-dark/50 to-transparent py-6"}`}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between">
          
          <motion.div 
            whileHover={{ scale: 1.05, rotate: -2 }}
            className="flex items-center gap-3 cursor-pointer origin-left transition-transform duration-300"
            style={{ transform: isScrolled ? "scale(0.85)" : "scale(1)" }}
          >
            <img src={LOGO_URL} alt="SeGreta Logo" className="h-16 w-auto object-contain drop-shadow-md" />
            <span className={`font-bold hidden md:block text-3xl transition-colors duration-300 ${isScrolled ? "text-blu-scuro" : "text-bianco drop-shadow-lg"}`}>
              SeGreta
            </span>
          </motion.div>
          
          <div className="hidden md:flex items-center gap-6 font-bold text-lg">
            {[ {name: "Relax", id: "relax"}, {name: "Gallery", id: "gallery"}, {name: "Il Lido", id: "il-lido"} ].map((item) => (
              <a 
                key={item.name} 
                href={`#${item.id}`} 
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById(item.id);
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`hover:text-giallo bg-bianco/20 px-4 py-2 rounded-full transition-colors duration-300 ${isScrolled ? "text-blu-scuro hover:bg-giallo/30" : "text-bianco drop-shadow-md backdrop-blur-sm"}`}
              >
                {item.name}
              </a>
            ))}
          </div>
          
          <div className="hidden md:block">
            <BouncyBtn primary>Prenota</BouncyBtn>
          </div>
          
          <button className="md:hidden bg-giallo p-2 rounded-full shadow-md" onClick={() => setIsMobileMenuOpen(true)}>
            <Menu className="text-blu-scuro" size={32} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ type: "spring", damping: 20, stiffness: 150 }}
            className="fixed top-0 left-0 w-full h-[100dvh] bg-azzurro z-[60] flex flex-col items-center justify-center text-bianco"
          >
            <button className="absolute top-8 right-6 bg-giallo rounded-full p-2 text-blu-scuro" onClick={() => setIsMobileMenuOpen(false)}>
              <X size={32} />
            </button>
            <img src={LOGO_URL} alt="SeGreta Logo" className="w-40 h-auto object-contain drop-shadow-xl mb-8" />
            <div className="flex flex-col gap-6 text-center text-4xl font-bold">
              {[ {name: "Relax", id: "relax"}, {name: "Gallery", id: "gallery"}, {name: "Il Lido", id: "il-lido"} ].map((item) => (
                <a 
                  key={item.name} 
                  href={`#${item.id}`} 
                  onClick={(e) => {
                    e.preventDefault();
                    setIsMobileMenuOpen(false);
                    const el = document.getElementById(item.id);
                    if (el) {
                      setTimeout(() => {
                        el.scrollIntoView({ behavior: 'smooth' });
                      }, 100);
                    }
                  }} 
                  className="hover:text-giallo border-b-2 border-transparent hover:border-giallo transition-all duration-300"
                >
                  {item.name}
                </a>
              ))}
              <div className="mt-8">
                <BouncyBtn primary>Prenota</BouncyBtn>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Hero Section */}
      <section className="relative h-[100svh] w-full flex flex-col items-center justify-center overflow-hidden bg-azzurro text-center border-b-8 border-giallo">
        <div className="absolute inset-0 bg-azzurro">
          {/* Carica la tua immagine rinominandola "sfondo-segreta.jpg" e inserendola nella cartella public usando l'esplora risorse a sinistra */}
          <img src="/sfondo-segreta.jpg" className="w-full h-full object-cover opacity-90" alt="SeGreta Riapre" />
        </div>
        
        {/* Floating polaroids / images in Hero - Commented out to enjoy the new background */}
        {/*
        <motion.div 
           className="absolute top-[15%] left-[5%] w-32 md:w-56 rotate-[-8deg] shadow-2xl border-4 md:border-8 border-bianco rounded-2xl overflow-hidden z-20 hidden md:block"
           ... (rest of the polaroids)
        */}

        {/* Fun Overlay gradient to ensure text readability */}
        {/* <div className="absolute inset-0 bg-gradient-to-t from-azzurro/90 via-transparent to-azzurro/30 pointer-events-none"></div> */}

        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeUpVariant}
          className="relative z-30 px-4 mt-auto mb-24 flex flex-col items-center w-full"
        >
          {/* Sfondo in risalto. Titoli nascosti. Solo bottoni. */}
          <div className="flex flex-col sm:flex-row gap-6 mt-32">
            <BouncyBtn primary>Scopri il Menu 🍹</BouncyBtn>
            <BouncyBtn>Prenota un Lettino 🏖️</BouncyBtn>
          </div>
        </motion.div>
        
        {/* Wavy bottom divider */}
        <div className="absolute bottom-[-1px] left-0 w-full overflow-hidden leading-none z-20">
          <svg className="relative block w-full h-12 md:h-24 fill-bianco" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C52.16,112.5,108.5,116,162.77,109.83,217.18,103.53,263.34,67.23,321.39,56.44Z"></path>
          </svg>
        </div>
      </section>

      {/* The Vibe Section */}
      <section id="relax" className="py-24 relative bg-bianco">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeUpVariant}
              className="flex-1 w-full"
            >
              <div className="relative w-full pb-10">
                {/* The chill seating frame */}
                <div className="rounded-[2.5rem] md:rounded-[4rem] overflow-hidden border-[6px] md:border-8 border-azzurro shadow-xl relative z-10 bg-bianco mx-auto">
                  {/* Sostituisci il link qui sotto con il tuo link di Google Drive o con il percorso dell'immagine caricata (es: "/mia-immagine.jpg") */}
                  <img src="https://images.unsplash.com/photo-1544148103-0773bf10d330?q=80&w=2940&auto=format&fit=crop" alt="La tua immagine" className="w-full aspect-video md:aspect-[4/3] object-cover block" />
                </div>
                
                <div className="flex justify-between items-center -mt-8 md:-mt-12 px-8 md:px-12 relative z-20">
                  <motion.div 
                    className="w-20 h-20 md:w-32 md:h-32 bg-giallo rounded-full float-anim flex items-center justify-center shadow-lg border-4 border-bianco"
                  >
                    <Sun className="text-blu-scuro w-10 h-10 md:w-14 md:h-14" />
                  </motion.div>
                  
                  <motion.div 
                    className="w-24 h-24 md:w-36 md:h-36 bg-azzurro rounded-[2.5rem] organic-shape shadow-lg flex items-center justify-center border-4 border-bianco hover:scale-110 transition-transform"
                    style={{ animationDelay: '-2s' }}
                  >
                    <Smile className="text-bianco w-12 h-12 md:w-16 md:h-16" />
                  </motion.div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUpVariant}
              className="flex-1 text-center md:text-left pt-10 md:pt-0"
            >
              <h2 className="text-5xl md:text-6xl font-bold text-azzurro-dark mb-6 leading-tight">
                Stacca la spina. <br/>Zero Stress. 
              </h2>
              <p className="text-2xl font-bold text-blu-scuro mb-6 bg-giallo/30 inline-block px-6 py-3 rounded-full border-2 border-giallo">
                Lasciati cullare dall'atmosfera di SeGreta.
              </p>
              <p className="text-xl text-blu-scuro/80 mb-8 max-w-lg mx-auto md:mx-0 font-medium leading-relaxed">
                A SeGreta troverai un'atmosfera informale, colorata e vibrante. Accomodati tra i nostri tavoli di legno sotto le stelle, goditi un cocktail rinfrescante sul prato e lasciati trasportare dalle good vibes della nostra oasi sul mare.
              </p>
              <BouncyBtn primary>Esplora 🌅</BouncyBtn>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="relative w-full bg-blu-scuro overflow-hidden py-12 border-y-8 border-giallo">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
        
        <div className="text-center mb-6 relative z-10">
          <h2 className="text-4xl md:text-5xl text-bianco font-bold drop-shadow-md">I Tuoi Momenti</h2>
          <p className="text-giallo font-medium text-xl mt-2">Scorri per scoprire</p>
        </div>

        <div style={{ height: '600px', position: 'relative' }} className="z-10 cursor-grab active:cursor-grabbing">
          <CircularGallery
            bend={3}
            textColor="#ffffff"
            borderRadius={0.05}
            scrollEase={0.02}
            fontUrl="https://fonts.googleapis.com/css2?family=Orbitron:wght@700&display=swap"
            font="bold 30px Orbitron"
            items={[
               { image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=2940&auto=format&fit=crop', text: 'Spiaggia' },
               { image: 'https://images.unsplash.com/photo-1544148103-0773bf10d330?q=80&w=2940&auto=format&fit=crop', text: 'Lido' },
               { image: 'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?q=80&w=2940&auto=format&fit=crop', text: 'Cocktails' },
               { image: 'https://images.unsplash.com/photo-1541804245451-2796ac6c2fa9?q=80&w=2940&auto=format&fit=crop', text: 'Tramonti' },
               { image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=2874&auto=format&fit=crop', text: 'Food' },
               { image: 'https://images.unsplash.com/photo-1470337458703-4f5afd5272a2?q=80&w=2938&auto=format&fit=crop', text: 'Vibes' },
               { image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=2929&auto=format&fit=crop', text: 'Relax' },
               { image: 'https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?q=80&w=2940&auto=format&fit=crop', text: 'Coffee' },
            ]}
          />
        </div>
      </section>

      {/* The 3 Areas */}
      <section id="il-lido" className="bg-azzurro relative border-y-8 border-giallo pt-12 pb-24">
        {/* Background bubbles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute top-10 left-10 w-24 h-24 bg-bianco/30 rounded-full float-anim hidden md:block"></div>
          <div className="absolute top-40 right-10 w-16 h-16 bg-bianco/30 rounded-full float-anim"></div>
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-bianco/20 rounded-full float-anim" style={{animationDelay: '1s'}}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUpVariant}
            className="text-center mb-10 pt-12"
          >
            <h2 className="text-5xl md:text-7xl text-bianco font-bold drop-shadow-md">Esplora SeGreta</h2>
          </motion.div>
        </div>

        <ScrollStack
          useWindowScroll={true}
          itemDistance={60}
          itemScale={0.05}
          baseScale={0.9}
        >
          <ScrollStackItem>
            <div className="bg-bianco rounded-[2rem] md:rounded-[3rem] p-6 md:p-12 text-center shadow-[0_8px_0_rgba(253,224,71,1)] md:shadow-[0_12px_0_rgba(253,224,71,1)] border-4 border-giallo relative flex flex-col md:flex-row items-center gap-6 md:gap-10">
              <div id="food-drink" className="w-40 h-40 md:w-56 md:h-56 shrink-0 rounded-full overflow-hidden border-4 md:border-8 border-bianco shadow-lg relative bg-bianco">
                <img src="https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=2874&auto=format&fit=crop" className="w-full h-full object-cover" alt="Food & Drink" />
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-4xl md:text-5xl text-blu-scuro font-bold mb-3 md:mb-4">Food & Drink</h3>
                <p className="text-blu-scuro/80 text-xl md:text-2xl font-medium mb-6 md:mb-8">Sapore di mare, street food gourmet e cocktail d'autore per accompagnare ogni momento della tua giornata.</p>
                <button className="bg-giallo text-blu-scuro font-bold text-lg md:text-xl py-3 px-8 md:py-4 md:px-10 rounded-full shadow-md hover:scale-105 hover:bg-giallo-dark transition-all border-2 border-transparent">
                  Il Nostro Menu
                </button>
              </div>
            </div>
          </ScrollStackItem>

          <ScrollStackItem>
             <div className="bg-giallo rounded-[2rem] md:rounded-[3rem] p-6 md:p-12 text-center shadow-[0_8px_0_rgba(2,132,199,1)] md:shadow-[0_12px_0_rgba(2,132,199,1)] border-4 border-azzurro relative flex flex-col md:flex-row items-center gap-6 md:gap-10">
              <div className="text-center md:text-left w-full order-2 md:order-1">
                <h3 className="text-4xl md:text-5xl text-blu-scuro font-bold mb-3 md:mb-4">Beach & Lido</h3>
                <p className="text-blu-scuro/80 text-xl md:text-2xl font-medium mb-6 md:mb-8">Lasciati cullare dal rumore del mare. Ombra, comfort e un servizio super rilassato pensato solo per te.</p>
                <button className="bg-azzurro text-bianco font-bold text-lg md:text-xl py-3 px-8 md:py-4 md:px-10 rounded-full shadow-md hover:scale-105 hover:bg-azzurro-dark transition-all border-2 border-transparent">
                  Prenota Lettino
                </button>
              </div>
              <div className="w-40 h-40 md:w-56 md:h-56 shrink-0 rounded-full overflow-hidden border-4 md:border-8 border-azzurro shadow-lg relative bg-bianco order-1 md:order-2">
                <img src="https://images.unsplash.com/photo-1544148103-0773bf10d330?q=80&w=2940&auto=format&fit=crop" className="w-full h-full object-cover" alt="Beach & Lido" />
              </div>
            </div>
          </ScrollStackItem>

          <ScrollStackItem>
            <div className="bg-bianco rounded-[2rem] md:rounded-[3rem] p-6 md:p-12 text-center shadow-[0_8px_0_rgba(253,224,71,1)] md:shadow-[0_12px_0_rgba(253,224,71,1)] border-4 border-giallo relative flex flex-col md:flex-row items-center gap-6 md:gap-10">
              <div className="w-40 h-40 md:w-56 md:h-56 shrink-0 rounded-full overflow-hidden border-4 md:border-8 border-bianco shadow-lg relative bg-bianco">
                <img src="/sunset.jpg" className="w-full h-full object-cover" alt="Sunset & Vibes" />
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-4xl md:text-5xl text-blu-scuro font-bold mb-3 md:mb-4">Sunset & Vibes</h3>
                <p className="text-blu-scuro/80 text-xl md:text-2xl font-medium mb-6 md:mb-8">Quando il sole cala, la magia inizia. Goditi i nostri aperitivi chic e vivi sere d'estate indimenticabili.</p>
                <a href="https://segreta-cucina2.odoo.com/event" target="_blank" rel="noopener noreferrer" className="inline-block bg-giallo text-blu-scuro font-bold text-lg md:text-xl py-3 px-8 md:py-4 md:px-10 rounded-full shadow-md hover:scale-105 hover:bg-giallo-dark transition-all border-2 border-transparent">
                  Gli Eventi
                </a>
              </div>
            </div>
          </ScrollStackItem>
        </ScrollStack>
      </section>

      {/* Playful Footer */}
      <footer className="bg-bianco pt-24 pb-12 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="bg-blu-scuro rounded-[3rem] p-8 md:p-16 text-center text-bianco border-8 border-giallo shadow-[0_15px_30px_rgba(0,0,0,0.2)] relative overflow-hidden">
            
            {/* Playful background suns in footer card */}
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-azzurro border-8 border-bianco rounded-full opacity-40 float-anim"></div>
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-giallo rounded-full opacity-40 float-anim" style={{animationDelay: '2s'}}></div>

            <div className="relative z-10">
              <h2 className="text-5xl md:text-7xl font-bold mb-6 drop-shadow-md">Unisciti a Noi 🏖️</h2>
              <p className="text-2xl md:text-3xl mb-12 font-medium">Goditi l'estate perfetta insieme a noi, un drink alla volta.</p>
              
              <div className="flex flex-col md:flex-row justify-center items-center gap-6 mb-12">
                <div className="flex items-center gap-3 bg-bianco text-blu-scuro px-8 py-4 rounded-full font-bold shadow-lg border-4 border-giallo">
                  <MapPin size={28} className="text-azzurro-dark" />
                  <span className="text-xl">SeGreta Cucina, Panoramica Umberto Paternostro, 16, 76011 Bisceglie BT</span>
                </div>
                <div className="flex items-center gap-3 bg-bianco text-blu-scuro px-8 py-4 rounded-full font-bold shadow-lg border-4 border-azzurro">
                  <span className="text-3xl">📞</span>
                  <span className="text-xl">+39 083 456 7890</span>
                </div>
              </div>

            </div>
          </div>
          
          <div className="text-center mt-12 text-blu-scuro font-bold opacity-70 text-lg">
            <p>SeGreta Cucina & Lido © {new Date().getFullYear()} - L'anima fresca e spensierata della tua estate in spiaggia!</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

