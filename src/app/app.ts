import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy, QueryList, ViewChild, ViewChildren, signal } from '@angular/core';

interface JourneyPhoto {
  src: string;
  alt: string;
  portrait?: boolean;
}

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
  protected readonly exteriorPhotos = exteriorPhotos;
  protected readonly interiorPhotos = interiorPhotos;

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
    this.fourKMessage.set(`${film} — the 4K YouTube link will be connected for launch.`);
    if (this.fourKTimer) clearTimeout(this.fourKTimer);
    this.fourKTimer = setTimeout(() => this.fourKMessage.set(''), 4200);
  }

  @HostListener('document:keydown.escape')
  protected onEscape(): void {
    this.closeMenu();
  }
}
