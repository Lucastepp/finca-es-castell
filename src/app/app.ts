import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy, QueryList, ViewChild, ViewChildren, signal } from '@angular/core';

interface JourneyPhoto {
  src: string;
  alt: string;
  portrait?: boolean;
}

type Language = 'en' | 'es' | 'de';

const languages: { code: Language; label: string; name: string }[] = [
  { code: 'en', label: 'EN', name: 'English' },
  { code: 'es', label: 'ES', name: 'Espanol' },
  { code: 'de', label: 'DE', name: 'Deutsch' },
];

const copy = {
  en: {
    homeLabel: 'Finca Es Castell home',
    toggleNavigation: 'Toggle navigation',
    primaryNavigation: 'Primary navigation',
    languageLabel: 'Website language',
    navEstate: 'The estate',
    navFilms: 'Films',
    navStay: 'Stay',
    navExperiences: 'Experiences',
    navBook: 'Book your stay',
    heroEyebrow: 'Agroturismo - Mallorca',
    heroTitle: 'Where Mallorca',
    heroTitleEm: 'slows down.',
    heroIntro: 'A stone-built retreat at the foot of the Serra de Tramuntana.',
    heroLink: 'Enter the estate',
    playBackground: 'Play background film',
    pauseBackground: 'Pause background film',
    playFilm: 'Play film',
    pauseFilm: 'Pause film',
    estateEyebrow: 'The estate',
    estateTitle: 'A quieter kind of luxury.',
    estateLead: 'Not marble lobbies or velvet ropes. Stone warmed by the afternoon sun. Olive trees moving in the breeze. A long table, an open door, and nowhere else you need to be.',
    estateNote: 'Finca Es Castell brings the character of rural Mallorca into every part of the stay - unhurried, grounded and close to the landscape.',
    storyLabel: 'The character of Finca Es Castell',
    storyCaption: 'Stone, timber and mountain air',
    storyEyebrow: 'Made by time',
    storyTitle: 'Old walls.',
    storyTitleBreak: 'Open skies.',
    storyBody: 'The estate carries its history in the details: worn steps, timber doors, green shutters and courtyards where the boundary between indoors and outdoors almost disappears.',
    storyLink: 'See the grounds',
    galleryEyebrow: 'A day in frames',
    galleryTitle: 'The finca,',
    galleryTitleEm: 'as it feels.',
    galleryAside: 'Follow the light from stone courtyards to quiet rooms and open windows - a slow portrait made entirely at Es Castell.',
    photoLabel: 'Photographs of Finca Es Castell',
    playPhotographs: 'Play photographs',
    pausePhotographs: 'Pause photographs',
    swipeNote: 'Swipe to wander through the finca',
    filmsEyebrow: 'Es Castell in motion',
    filmsTitle: 'Stay a little',
    filmsTitleEm: 'longer.',
    filmsIntro: 'Three original films made at the finca - stone, light and the small movements that make a place stay with you.',
    film01Meta: 'Film 01 - 02:01',
    film01Title: 'Through the old walls',
    film02Meta: 'Film 02 - 00:56',
    film02Title: 'A slower arrival',
    film03Meta: 'Film 03 - 00:55',
    film03Title: 'Light on stone',
    view4k: 'View in 4K',
    film01Aria: 'A cinematic journey through Finca Es Castell',
    film02Aria: "Vertical film of the finca's stone paths and architecture",
    film03Aria: 'Vertical film of the gardens and green shutters at Es Castell',
    filmCopyOneEyebrow: 'The arrival',
    filmCopyOneTitle: 'First you feel the quiet.',
    filmCopyOneBody: 'Finca Es Castell sits at the foot of the Serra de Tramuntana, where old stone paths, garden shadows and mountain air slow the whole day down.',
    filmCopyTwoEyebrow: 'The atmosphere',
    filmCopyTwoTitle: 'Luxury without losing the finca.',
    filmCopyTwoBody: 'The story is in the texture: green shutters, terracotta floors, olive trees and simple moments that feel deeply Mallorcan.',
    fourKMessage: 'the 4K YouTube link will be connected for launch.',
    experiencesEyebrow: 'Living the estate',
    experiencesTitle: 'Experiences that',
    experiencesTitleEm: 'nourish the soul.',
    experiencesIntro: 'Days here follow the landscape: mountain paths in the morning, ancient olive trees in the afternoon and a sky full of stars after dark.',
    expHikingTitle: 'Hiking',
    expHikingBody: 'Guided routes through the Serra de Tramuntana, a UNESCO World Heritage landscape.',
    expOlivesTitle: 'Century-old olive trees',
    expOlivesBody: 'Walk among sculptural trunks shaped by time, alongside carob, fig and seasonal fruit trees.',
    expWellnessTitle: 'Wellness',
    expWellnessBody: 'Yoga, meditation and massages with essential oils, arranged around the rhythm of your stay.',
    expStarsTitle: 'Stargazing',
    expStarsBody: 'Far from city light, the night sky above the estate becomes a spectacle of its own.',
    expWildlifeTitle: 'Local wildlife',
    expWildlifeBody: 'Look out for mountain goats and the eagles, falcons and vultures that cross the open sky.',
    expWineTitle: 'Wine tasting',
    expWineBody: 'Discover Mallorcan wines and the distinctive aromas of the Serra in a tasting arranged for you.',
    stayEyebrow: 'Your stay',
    stayTitle: 'Rooms that still feel like part of the finca.',
    stayBody: 'Original stone and timber give every room its own character, while considered comforts make it easy to settle in. Wake to the garden, the valley or the changing light across the mountains.',
    stayPointOne: 'Traditional Mallorcan character',
    stayPointTwo: 'Garden, terrace and valley settings',
    stayPointThree: 'A direct route to secure booking',
    stayCta: 'View rooms and availability',
    bookingEyebrow: 'Your Mallorca escape',
    bookingTitle: 'Let the world',
    bookingTitleBreak: 'wait a while.',
    bookingCta: 'Book your stay',
    footerBackTop: 'Finca Es Castell - back to top',
    footerIntro: 'Agroturismo at the foot of the Serra de Tramuntana, Mallorca. A place where luxury is authenticity.',
    footerContact: 'Contact',
    footerSocial: 'Follow us',
    footerCopyright: '2026 Finca Es Castell - Agroturismo - Mallorca',
    footerConcept: 'Concept website - Social links to be confirmed before launch',
  },
  es: {
    homeLabel: 'Inicio de Finca Es Castell',
    toggleNavigation: 'Abrir o cerrar navegacion',
    primaryNavigation: 'Navegacion principal',
    languageLabel: 'Idioma del sitio',
    navEstate: 'La finca',
    navFilms: 'Videos',
    navStay: 'Estancia',
    navExperiences: 'Experiencias',
    navBook: 'Reservar estancia',
    heroEyebrow: 'Agroturismo - Mallorca',
    heroTitle: 'Donde Mallorca',
    heroTitleEm: 'baja el ritmo.',
    heroIntro: 'Un refugio de piedra a los pies de la Serra de Tramuntana.',
    heroLink: 'Entrar en la finca',
    playBackground: 'Reproducir video de fondo',
    pauseBackground: 'Pausar video de fondo',
    playFilm: 'Reproducir video',
    pauseFilm: 'Pausar video',
    estateEyebrow: 'La finca',
    estateTitle: 'Un lujo mas tranquilo.',
    estateLead: 'No hay vestibulos de marmol ni cordones de terciopelo. Piedra calentada por el sol de la tarde. Olivos moviendose con la brisa. Una mesa larga, una puerta abierta y ningun otro lugar al que ir.',
    estateNote: 'Finca Es Castell lleva el caracter de la Mallorca rural a cada parte de la estancia: sin prisa, con raiz y cerca del paisaje.',
    storyLabel: 'El caracter de Finca Es Castell',
    storyCaption: 'Piedra, madera y aire de montana',
    storyEyebrow: 'Hecha por el tiempo',
    storyTitle: 'Muros antiguos.',
    storyTitleBreak: 'Cielos abiertos.',
    storyBody: 'La finca conserva su historia en los detalles: escalones gastados, puertas de madera, persianas verdes y patios donde el interior y el exterior casi se confunden.',
    storyLink: 'Ver los exteriores',
    galleryEyebrow: 'Un dia en imagenes',
    galleryTitle: 'La finca,',
    galleryTitleEm: 'tal como se siente.',
    galleryAside: 'Sigue la luz desde los patios de piedra hasta las habitaciones tranquilas y las ventanas abiertas: un retrato pausado hecho integramente en Es Castell.',
    photoLabel: 'Fotografias de Finca Es Castell',
    playPhotographs: 'Reproducir fotografias',
    pausePhotographs: 'Pausar fotografias',
    swipeNote: 'Desliza para recorrer la finca',
    filmsEyebrow: 'Es Castell en movimiento',
    filmsTitle: 'Quedate un poco',
    filmsTitleEm: 'mas.',
    filmsIntro: 'Tres videos originales realizados en la finca: piedra, luz y esos pequenos movimientos que hacen que un lugar se quede contigo.',
    film01Meta: 'Video 01 - 02:01',
    film01Title: 'Entre muros antiguos',
    film02Meta: 'Video 02 - 00:56',
    film02Title: 'Una llegada mas lenta',
    film03Meta: 'Video 03 - 00:55',
    film03Title: 'Luz sobre la piedra',
    view4k: 'Ver en 4K',
    film01Aria: 'Recorrido cinematografico por Finca Es Castell',
    film02Aria: 'Video vertical de los caminos de piedra y la arquitectura de la finca',
    film03Aria: 'Video vertical de los jardines y las persianas verdes de Es Castell',
    filmCopyOneEyebrow: 'La llegada',
    filmCopyOneTitle: 'Primero se siente el silencio.',
    filmCopyOneBody: 'Finca Es Castell se encuentra a los pies de la Serra de Tramuntana, donde los caminos de piedra, las sombras del jardin y el aire de montana hacen que todo el dia vaya mas despacio.',
    filmCopyTwoEyebrow: 'La atmosfera',
    filmCopyTwoTitle: 'Lujo sin perder la finca.',
    filmCopyTwoBody: 'La historia esta en la textura: persianas verdes, suelos de terracota, olivos y momentos sencillos con un caracter profundamente mallorquin.',
    fourKMessage: 'el enlace de YouTube en 4K se conectara para el lanzamiento.',
    experiencesEyebrow: 'Vivir la finca',
    experiencesTitle: 'Experiencias que',
    experiencesTitleEm: 'alimentan el alma.',
    experiencesIntro: 'Los dias siguen el paisaje: senderos de montana por la manana, olivos centenarios por la tarde y un cielo lleno de estrellas al anochecer.',
    expHikingTitle: 'Senderismo',
    expHikingBody: 'Rutas guiadas por la Serra de Tramuntana, paisaje declarado Patrimonio Mundial por la UNESCO.',
    expOlivesTitle: 'Olivos centenarios',
    expOlivesBody: 'Pasea entre troncos escultoricos moldeados por el tiempo, junto a algarrobos, higueras y frutales de temporada.',
    expWellnessTitle: 'Bienestar',
    expWellnessBody: 'Yoga, meditacion y masajes con aceites esenciales, organizados segun el ritmo de tu estancia.',
    expStarsTitle: 'Observacion de estrellas',
    expStarsBody: 'Lejos de la luz urbana, el cielo nocturno sobre la finca se convierte en un espectaculo propio.',
    expWildlifeTitle: 'Fauna local',
    expWildlifeBody: 'Busca cabras de montana y las aguilas, halcones y buitres que cruzan el cielo abierto.',
    expWineTitle: 'Cata de vinos',
    expWineBody: 'Descubre vinos mallorquines y los aromas distintivos de la Serra en una cata preparada para ti.',
    stayEyebrow: 'Tu estancia',
    stayTitle: 'Habitaciones que siguen siendo parte de la finca.',
    stayBody: 'La piedra original y la madera dan a cada habitacion su propio caracter, mientras que las comodidades cuidadas hacen facil instalarse. Despierta con el jardin, el valle o la luz cambiante sobre las montanas.',
    stayPointOne: 'Caracter mallorquin tradicional',
    stayPointTwo: 'Jardin, terraza y vistas al valle',
    stayPointThree: 'Reserva directa y sencilla',
    stayCta: 'Ver habitaciones y disponibilidad',
    bookingEyebrow: 'Tu escapada a Mallorca',
    bookingTitle: 'Deja que el mundo',
    bookingTitleBreak: 'espere un poco.',
    bookingCta: 'Reservar estancia',
    footerBackTop: 'Finca Es Castell - volver arriba',
    footerIntro: 'Agroturismo a los pies de la Serra de Tramuntana, Mallorca. Un lugar donde el lujo es autenticidad.',
    footerContact: 'Contacto',
    footerSocial: 'Siguenos',
    footerCopyright: '2026 Finca Es Castell - Agroturismo - Mallorca',
    footerConcept: 'Sitio conceptual - Enlaces sociales por confirmar antes del lanzamiento',
  },
  de: {
    homeLabel: 'Finca Es Castell Startseite',
    toggleNavigation: 'Navigation oeffnen oder schliessen',
    primaryNavigation: 'Hauptnavigation',
    languageLabel: 'Sprache der Website',
    navEstate: 'Die Finca',
    navFilms: 'Filme',
    navStay: 'Aufenthalt',
    navExperiences: 'Erlebnisse',
    navBook: 'Aufenthalt buchen',
    heroEyebrow: 'Agroturismo - Mallorca',
    heroTitle: 'Wo Mallorca',
    heroTitleEm: 'langsamer wird.',
    heroIntro: 'Ein Rueckzugsort aus Stein am Fuss der Serra de Tramuntana.',
    heroLink: 'Die Finca betreten',
    playBackground: 'Hintergrundfilm abspielen',
    pauseBackground: 'Hintergrundfilm pausieren',
    playFilm: 'Film abspielen',
    pauseFilm: 'Film pausieren',
    estateEyebrow: 'Die Finca',
    estateTitle: 'Eine ruhigere Art von Luxus.',
    estateLead: 'Keine Marmorlobbys, keine Samtkordeln. Stein, warm von der Nachmittagssonne. Olivenbaeume in der Brise. Ein langer Tisch, eine offene Tuer und kein anderer Ort, an dem man sein muesste.',
    estateNote: 'Finca Es Castell bringt den Charakter des laendlichen Mallorcas in jeden Teil des Aufenthalts - unaufgeregt, geerdet und nah an der Landschaft.',
    storyLabel: 'Der Charakter von Finca Es Castell',
    storyCaption: 'Stein, Holz und Bergluft',
    storyEyebrow: 'Von der Zeit geformt',
    storyTitle: 'Alte Mauern.',
    storyTitleBreak: 'Offener Himmel.',
    storyBody: 'Die Finca traegt ihre Geschichte in den Details: abgetretene Stufen, Holztueren, gruene Fensterlaeden und Innenhoefe, in denen drinnen und draussen fast ineinander uebergehen.',
    storyLink: 'Das Gelaende ansehen',
    galleryEyebrow: 'Ein Tag in Bildern',
    galleryTitle: 'Die Finca,',
    galleryTitleEm: 'wie sie sich anfuehlt.',
    galleryAside: 'Folge dem Licht von steinernen Hoefen zu ruhigen Zimmern und offenen Fenstern - ein langsames Portraet, vollstaendig in Es Castell aufgenommen.',
    photoLabel: 'Fotografien von Finca Es Castell',
    playPhotographs: 'Fotografien abspielen',
    pausePhotographs: 'Fotografien pausieren',
    swipeNote: 'Wische, um durch die Finca zu wandern',
    filmsEyebrow: 'Es Castell in Bewegung',
    filmsTitle: 'Bleib noch ein',
    filmsTitleEm: 'bisschen.',
    filmsIntro: 'Drei Originalfilme, aufgenommen auf der Finca - Stein, Licht und die kleinen Bewegungen, durch die ein Ort bei dir bleibt.',
    film01Meta: 'Film 01 - 02:01',
    film01Title: 'Durch die alten Mauern',
    film02Meta: 'Film 02 - 00:56',
    film02Title: 'Eine langsamere Ankunft',
    film03Meta: 'Film 03 - 00:55',
    film03Title: 'Licht auf Stein',
    view4k: 'In 4K ansehen',
    film01Aria: 'Eine filmische Reise durch Finca Es Castell',
    film02Aria: 'Vertikaler Film der Steinwege und Architektur der Finca',
    film03Aria: 'Vertikaler Film der Gaerten und gruenen Fensterlaeden von Es Castell',
    filmCopyOneEyebrow: 'Die Ankunft',
    filmCopyOneTitle: 'Zuerst spuerst du die Ruhe.',
    filmCopyOneBody: 'Finca Es Castell liegt am Fuss der Serra de Tramuntana, wo alte Steinwege, Gartenschatten und Bergluft den ganzen Tag langsamer machen.',
    filmCopyTwoEyebrow: 'Die Atmosphaere',
    filmCopyTwoTitle: 'Luxus, ohne die Finca zu verlieren.',
    filmCopyTwoBody: 'Die Geschichte liegt in der Textur: gruene Fensterlaeden, Terrakottaboeden, Olivenbaeume und einfache Momente, die sich zutiefst mallorquinisch anfuehlen.',
    fourKMessage: 'der 4K-YouTube-Link wird zum Launch verbunden.',
    experiencesEyebrow: 'Die Finca erleben',
    experiencesTitle: 'Erlebnisse, die',
    experiencesTitleEm: 'die Seele naehren.',
    experiencesIntro: 'Die Tage folgen der Landschaft: morgens Bergwege, nachmittags jahrhundertealte Olivenbaeume und nach Einbruch der Dunkelheit ein Himmel voller Sterne.',
    expHikingTitle: 'Wandern',
    expHikingBody: 'Gefuehrte Routen durch die Serra de Tramuntana, eine UNESCO-Welterbelandschaft.',
    expOlivesTitle: 'Jahrhundertealte Olivenbaeume',
    expOlivesBody: 'Spaziere zwischen skulpturalen Staemmen, die von der Zeit geformt wurden, neben Johannisbrot-, Feigen- und saisonalen Obstbaeumen.',
    expWellnessTitle: 'Wellness',
    expWellnessBody: 'Yoga, Meditation und Massagen mit aetherischen Oelen, abgestimmt auf den Rhythmus deines Aufenthalts.',
    expStarsTitle: 'Sterne beobachten',
    expStarsBody: 'Fern vom Stadtlicht wird der Nachthimmel ueber der Finca zu einem eigenen Schauspiel.',
    expWildlifeTitle: 'Lokale Tierwelt',
    expWildlifeBody: 'Halte Ausschau nach Bergziegen und nach Adlern, Falken und Geiern, die den offenen Himmel kreuzen.',
    expWineTitle: 'Weinverkostung',
    expWineBody: 'Entdecke mallorquinische Weine und die besonderen Aromen der Serra bei einer fuer dich arrangierten Verkostung.',
    stayEyebrow: 'Dein Aufenthalt',
    stayTitle: 'Zimmer, die sich weiterhin wie Teil der Finca anfuehlen.',
    stayBody: 'Originaler Stein und Holz geben jedem Zimmer seinen eigenen Charakter, waehrend durchdachte Annehmlichkeiten das Ankommen leicht machen. Wache mit dem Garten, dem Tal oder dem wechselnden Licht ueber den Bergen auf.',
    stayPointOne: 'Traditioneller mallorquinischer Charakter',
    stayPointTwo: 'Garten-, Terrassen- und Tallagen',
    stayPointThree: 'Ein direkter Weg zur sicheren Buchung',
    stayCta: 'Zimmer und Verfuegbarkeit ansehen',
    bookingEyebrow: 'Deine Auszeit auf Mallorca',
    bookingTitle: 'Lass die Welt',
    bookingTitleBreak: 'einen Moment warten.',
    bookingCta: 'Aufenthalt buchen',
    footerBackTop: 'Finca Es Castell - zurueck nach oben',
    footerIntro: 'Agroturismo am Fuss der Serra de Tramuntana, Mallorca. Ein Ort, an dem Luxus Authentizitaet bedeutet.',
    footerContact: 'Kontakt',
    footerSocial: 'Folge uns',
    footerCopyright: '2026 Finca Es Castell - Agroturismo - Mallorca',
    footerConcept: 'Konzept-Website - Social Links vor dem Launch zu bestaetigen',
  },
} as const;

const exteriorPhotos: JourneyPhoto[] = [
  { src: '/media/photos/dsc05690.webp', alt: 'Stone facade with green shutters at Finca Es Castell' },
  { src: '/media/photos/dsc05702.webp', alt: 'Arched timber door in a traditional stone facade' },
  { src: '/media/photos/dsc05703.webp', alt: 'Courtyard facade with shutters, planters and an olive tree' },
  { src: '/media/photos/dsc05704.webp', alt: 'Vine-covered entrance and outdoor table at the finca' },
  { src: '/media/photos/dsc05709.webp', alt: 'Garden path winding around an old olive tree', portrait: true },
  { src: '/media/photos/dsc05715.webp', alt: 'Stone garden steps leading through the estate', portrait: true },
  { src: '/media/photos/dsc05737.webp', alt: 'Rustic covered terrace with long wooden tables' },
  { src: '/media/photos/dsc05740.webp', alt: 'Courtyard framed by an old stone passage' },
  { src: '/media/photos/dsc05742.webp', alt: 'Arched passage into a quiet stone room', portrait: true },
  { src: '/media/photos/dsc05753.webp', alt: 'View of the mountain path from a covered walkway', portrait: true },
];

const interiorPhotos: JourneyPhoto[] = [
  { src: '/media/photos/dsc05759.webp', alt: 'Traditional tools displayed against an old wall', portrait: true },
  { src: '/media/photos/dsc05765.webp', alt: 'Terracotta flowers against the stone wall', portrait: true },
  { src: '/media/photos/dsc05769.webp', alt: 'Dining room set beside an open window' },
  { src: '/media/photos/dsc05772.webp', alt: 'Open window looking out across the green valley', portrait: true },
  { src: '/media/photos/dsc05779.webp', alt: 'Finca facade glimpsed through soft garden foliage' },
  { src: '/media/photos/dsc05785.webp', alt: 'Calm whitewashed lounge with timber furniture' },
  { src: '/media/photos/dsc05792.webp', alt: 'Bright sitting room arranged around a fireplace' },
  { src: '/media/photos/dsc05795.webp', alt: 'Built-in sofa against a textured stone wall' },
  { src: '/media/photos/dsc05813.webp', alt: 'Terracotta steps inside the old finca', portrait: true },
  { src: '/media/photos/dsc05819.webp', alt: 'Garden table tucked beneath mature trees', portrait: true },
];

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements AfterViewInit, OnDestroy {
  @ViewChild('heroVideo') private heroVideo?: ElementRef<HTMLVideoElement>;
  @ViewChildren('reelVideo') private reelVideos?: QueryList<ElementRef<HTMLVideoElement>>;
  private heroObserver?: IntersectionObserver;
  private reelObserver?: IntersectionObserver;
  private heroPausedByUser = false;
  private fourKTimer?: ReturnType<typeof setTimeout>;

  protected readonly menuOpen = signal(false);
  protected readonly videoPaused = signal(false);
  protected readonly photoMotionPaused = signal(false);
  protected readonly fourKMessage = signal('');
  protected readonly language = signal<Language>('en');
  protected readonly languages = languages;
  protected readonly exteriorPhotos = exteriorPhotos;
  protected readonly interiorPhotos = interiorPhotos;

  constructor() {
    if (typeof window !== 'undefined') {
      const storedLanguage = window.localStorage.getItem('finca-es-castell-language') as Language | null;
      if (storedLanguage && storedLanguage in copy) {
        this.language.set(storedLanguage);
      }
    }

    this.syncDocumentLanguage();
  }

  ngAfterViewInit(): void {
    const video = this.heroVideo?.nativeElement;
    if (!video) return;
    video.muted = true;
    video.defaultMuted = true;

    if (typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      video.pause();
      this.heroPausedByUser = true;
      this.videoPaused.set(true);
      return;
    }

    if (typeof IntersectionObserver !== 'undefined') {
      this.heroObserver = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting && !this.heroPausedByUser) {
          void video.play().catch(() => undefined);
        } else if (!entry.isIntersecting) {
          video.pause();
        }
      }, { threshold: 0.1 });
      this.heroObserver.observe(video);

      this.reelObserver = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          const reel = entry.target as HTMLVideoElement;
          if (entry.isIntersecting) {
            void reel.play().catch(() => undefined);
          } else {
            reel.pause();
          }
        }
      }, { threshold: 0.28 });

      for (const reel of this.reelVideos ?? []) {
        const reelVideo = reel.nativeElement;
        reelVideo.muted = true;
        reelVideo.defaultMuted = true;
        reelVideo.loop = true;
        this.reelObserver.observe(reelVideo);
      }
    }
  }

  ngOnDestroy(): void {
    this.heroObserver?.disconnect();
    this.reelObserver?.disconnect();
    if (this.fourKTimer) clearTimeout(this.fourKTimer);
  }

  protected toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  protected closeMenu(): void {
    this.menuOpen.set(false);
  }

  protected setLanguage(language: Language): void {
    this.language.set(language);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('finca-es-castell-language', language);
    }
    this.syncDocumentLanguage();
    this.closeMenu();
  }

  protected t(key: keyof typeof copy.en): string {
    return copy[this.language()][key];
  }

  protected toggleVideo(): void {
    const video = this.heroVideo?.nativeElement;
    if (!video) return;

    if (video.paused) {
      this.heroPausedByUser = false;
      void video.play().catch(() => undefined);
      this.videoPaused.set(false);
    } else {
      this.heroPausedByUser = true;
      video.pause();
      this.videoPaused.set(true);
    }
  }

  protected togglePhotoMotion(): void {
    this.photoMotionPaused.update((paused) => !paused);
  }

  protected showFourKPlaceholder(film: string): void {
    this.fourKMessage.set(`${film} - ${this.t('fourKMessage')}`);
    if (this.fourKTimer) clearTimeout(this.fourKTimer);
    this.fourKTimer = setTimeout(() => this.fourKMessage.set(''), 4200);
  }

  @HostListener('document:keydown.escape')
  protected onEscape(): void {
    this.closeMenu();
  }

  private syncDocumentLanguage(): void {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = this.language();
    }
  }
}
