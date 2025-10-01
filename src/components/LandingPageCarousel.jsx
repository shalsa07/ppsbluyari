'use client'
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react'
import WhatsAppComponent from './WhatsAppComponent';
import RollOverStateWrapper from './RollOverStateWrapper';
import { settings } from '@/libs/settings';
import { useRouter } from 'next/navigation';

export default function LandingPageCarousel() {

    const [currentSlide, setCurrentSlide] = useState(0);
    const [autoScrollPaused, setAutoScrollPaused] = useState(false);
    const [isVisible, setIsVisible] = useState({});
    const sectionRefs = useRef({});
    const router=useRouter()


    // Portfolio projects
    const heroImages = [
        {
        image: '/hero/0003_Opt1.jpg',
        title: 'Modern Residential',
        category: 'Exterior Visualization'
        },
        {
        image: '/hero/0003_Opt2.jpg',
        title: 'Contemporary Villa',
        category: 'Exterior Visualization'
        },
        {
        image: '/hero/0005.jpg',
        title: 'Urban Apartment',
        category: 'Interior Visualization'
        },
        {
        image: '/hero/0006.jpg',
        title: 'Luxury Residence',
        category: 'Exterior Visualization'
        }
    ];

    // Auto-scroll for hero carousel
    useEffect(() => {
        if (autoScrollPaused) return;

        const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % heroImages.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [autoScrollPaused, heroImages.length]);

    // Handle manual navigation
    const goToSlide = (index) => {
        setCurrentSlide(index);
        setAutoScrollPaused(true);

        // Resume auto-scroll after 15 seconds
        setTimeout(() => {
        setAutoScrollPaused(false);
        }, 15000);
    };

    // Intersection observer for animations
    useEffect(() => {
        const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
        };

        const observerCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
            }
        });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        // Observe all section refs
        Object.keys(sectionRefs.current).forEach(key => {
        if (sectionRefs.current[key]) {
            observer.observe(sectionRefs.current[key]);
        }
        });

        return () => {
        Object.keys(sectionRefs.current).forEach(key => {
            if (sectionRefs.current[key]) {
            observer.unobserve(sectionRefs.current[key]);
            }
        });
        };
    }, []);

    // Register a section ref
    const registerSectionRef = (id, el) => {
        if (el && !sectionRefs.current[id]) {
        sectionRefs.current[id] = el;
        }
    };

    const handleSignInClick = (params) => {
      
    }

    const handleExploreClick = (params) => {
      router.push('/projects')
    }
    

    // console.log(heroImages)

  return (
    <div className='w-full h-svh flex items-center text-white justify-center'>
        {/* Hero Carousel */}
        <div className='flex z-10 absolute w-full h-full'>
          {heroImages.map((i, index) => (
            // (console.log(image)),
            <div 
              key={index}
              className={`absolute w-full h-full overflow-hidden transition-opacity duration-1000 ${currentSlide === index ? 'opacity-100' : 'opacity-0'}`}
               style={{
                backgroundImage: `url(${i})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
              aria-label={`Architectural visualization ${index + 1}`}
            >
              <div className='images-wrapper flex w-full h-full'>
                <Image
                  key={index}
                  src={i?.image}
                  alt={`Architectural visualization ${index + 1}`}
                  fill
                  priority={index === 0}
                  sizes="100vw"
                  quality={90}
                  className="object-cover brightness-50"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Sigin And Explore */}
        <div className='CarouselWrapp absolute flex-col m-auto z-10 flex justify-center items-center h-fit w-fit'>
          <div className='flex items-center justify-center h-full md:w-auto w-[280px] mb-8'>
            <img src="/assets/ppsb_logo.png" alt="" />
          </div>
          <div className='flex items-center justify-center h-full md:w-auto w-[220px]'>
            <img src="/assets/luyari_logo.png" alt="" />
          </div>
          <div className='flex items-center justify-center h-14 w-full uppercase text-center'>
            your property developement portal
          </div>
          <div className='flex justify-center items-center h-fit w-full'>
            <RollOverStateWrapper 
              ftn={handleSignInClick} 
              src={settings.btnsImages.signin_1}
            />
            <RollOverStateWrapper 
              ftn={handleExploreClick} 
              src={settings.btnsImages.explore}
            />
          </div>
        </div>

        {/* Carousel Navigation */}
        <div className="CarouselWrapp absolute bottom-10 left-0 right-0 z-10 flex justify-center space-x-2">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full cursor-pointer transition-colors ease-linear duration-300 ${
                currentSlide === index ? 'bg-white w-10 ' : 'bg-white/40 w-2'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Whatsapp Contact Section */}
        <WhatsAppComponent/>
    </div>
  )
}