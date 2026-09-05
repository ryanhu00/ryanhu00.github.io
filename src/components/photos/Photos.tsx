import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../layout/Footer';
import WebThreads from '../ui/WebThreads/WebThreads';
import Folder from '../ui/Folder/Folder';
import {
  photoCategories,
  type PhotoCategoryId
} from '../../data/photos';
import rhuLogoWhite from '../../assets/rhu_logo_w.png';

const Photos: React.FC = () => {
  const [activeId, setActiveId] = useState<PhotoCategoryId | null>(null);
  const [enlargedIndex, setEnlargedIndex] = useState<number | null>(null);
  const touchStartX = useRef<number | null>(null);
  const activeCategory = photoCategories.find((c) => c.id === activeId) ?? null;
  const items = activeCategory?.items ?? [];
  const enlargedSrc =
    enlargedIndex !== null ? items[enlargedIndex]?.image ?? null : null;

  const closeLightbox = () => setEnlargedIndex(null);
  const closeGallery = () => {
    setEnlargedIndex(null);
    setActiveId(null);
  };

  const showPrev = () => {
    if (!items.length || enlargedIndex === null) return;
    setEnlargedIndex((enlargedIndex - 1 + items.length) % items.length);
  };

  const showNext = () => {
    if (!items.length || enlargedIndex === null) return;
    setEnlargedIndex((enlargedIndex + 1) % items.length);
  };

  useEffect(() => {
    if (!activeId && enlargedIndex === null) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (enlargedIndex !== null) {
        if (event.key === 'Escape') {
          setEnlargedIndex(null);
          return;
        }
        if (event.key === 'ArrowLeft') {
          event.preventDefault();
          setEnlargedIndex((current) => {
            if (current === null || !items.length) return current;
            return (current - 1 + items.length) % items.length;
          });
          return;
        }
        if (event.key === 'ArrowRight') {
          event.preventDefault();
          setEnlargedIndex((current) => {
            if (current === null || !items.length) return current;
            return (current + 1) % items.length;
          });
          return;
        }
        return;
      }

      if (event.key === 'Escape') setActiveId(null);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [activeId, enlargedIndex, items.length]);

  const onTouchStart = (event: React.TouchEvent) => {
    touchStartX.current = event.changedTouches[0]?.clientX ?? null;
  };

  const onTouchEnd = (event: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const endX = event.changedTouches[0]?.clientX ?? touchStartX.current;
    const deltaX = endX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(deltaX) < 48) return;
    if (deltaX > 0) showPrev();
    else showNext();
  };

  return (
    <div className="app photos-page">
      <div className="photos-bg" aria-hidden="true">
        <WebThreads
          threadCount={3}
          frequency={3.5}
          position={0.25}
          speed={0.55}
          shimmer
          brightness={0.3}
          glow={0.03}
          taper={0.95}
          mouseStrength={0.24}
          grainIntensity={0.06}
          color1="#5a3ad7"
          color2="#523451"
          color3="#eba677"
          backgroundColor="#000000"
          lightMode={false}
          mouseInteraction
        />
      </div>
      <header className="photos-topbar">
        <Link to="/" className="photos-home-link" aria-label="Back to home">
          <img src={rhuLogoWhite} alt="" />
          <span>← Back</span>
        </Link>
      </header>
      <main className="photos-main site-main">
        <div className="photos-shell">
          <p className="photos-lede">
            rhu's plain snapshots
          </p>

          <div className="photos-folders">
            {photoCategories.map((category) => (
              <div key={category.id} className="photos-folder-card">
                <Folder
                  color={category.color}
                  size={1.15}
                  open={activeId === category.id}
                  label={`Open ${category.label} photos`}
                  onOpenChange={(open) => {
                    setActiveId(open ? category.id : null);
                  }}
                  items={category.items.slice(0, 3).map((item) => (
                    <img
                      key={item.image}
                      src={item.image}
                      alt=""
                      className="photos-folder-thumb"
                      draggable={false}
                    />
                  ))}
                />
                <p className="photos-folder-label">{category.label}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer
        description={
          <>
            “Nothing's perfect, the world's not perfect, but it's there for us,
            trying the best it can. That's what makes it so damn beautiful.” -
            fullmetal alchemist
          </>
        }
      />

      {activeCategory && (
        <div
          className="photos-modal"
          role="dialog"
          aria-modal="true"
          aria-label={`${activeCategory.label} photos`}
          onClick={closeGallery}
        >
          <div className="photos-modal-backdrop" aria-hidden="true" />
          <button
            type="button"
            className="photos-modal-close"
            aria-label="Close folder"
            onClick={(event) => {
              event.stopPropagation();
              closeGallery();
            }}
          >
            ×
          </button>
          <div
            className="photos-modal-panel"
            onClick={(event) => {
              if (!(event.target as HTMLElement).closest('.photos-grid-item')) {
                closeGallery();
              }
              event.stopPropagation();
            }}
          >
            <div className="photos-grid">
              {activeCategory.items.map((item, index) => (
                <button
                  key={item.image}
                  type="button"
                  className="photos-grid-item"
                  onClick={(event) => {
                    event.stopPropagation();
                    setEnlargedIndex(index);
                  }}
                  aria-label="Enlarge photo"
                >
                  <img src={item.image} alt="" loading="lazy" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {enlargedSrc && (
        <div
          className="photos-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Enlarged photo"
          onClick={closeLightbox}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <div className="photos-lightbox-backdrop" aria-hidden="true" />
          <button
            type="button"
            className="photos-lightbox-close"
            aria-label="Close photo"
            onClick={(event) => {
              event.stopPropagation();
              closeLightbox();
            }}
          >
            ×
          </button>
          <img
            className="photos-lightbox-image"
            src={enlargedSrc}
            alt=""
            draggable={false}
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};

export default Photos;
