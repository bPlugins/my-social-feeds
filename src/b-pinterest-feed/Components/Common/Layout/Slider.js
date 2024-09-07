
import { Navigation, A11y, Autoplay, Mousewheel, EffectCards, EffectFlip, EffectCoverflow, EffectCube, EffectFade} from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-cards';
import 'swiper/css/effect-flip';
import 'swiper/css/effect-coverflow';
import 'swiper/css/effect-cube';
import 'swiper/css/effect-fade';
import SingleItem from './SingleItem';

 
const Slider =({ attributes, pins, elId}) => {
    const { columns, columnGap, slider} = attributes;
    const {isLoop, isAutoPlay, autoPlayDelay, isMouseWheel, effect, isGrabCursor} = slider;
    
    const modules = [Navigation, A11y, Autoplay, Mousewheel, EffectCards, EffectFlip, EffectCoverflow, EffectCube, EffectFade ];
    const loop = isLoop ? true: false;
    const mousewheel = isMouseWheel ? true : false;
    const autoPlay = isAutoPlay ? { delay: autoPlayDelay } : false;

    const SwiperEl = () => <Swiper modules={modules} navigation pagination={{ clickable: true }} loop={loop} autoplay = {autoPlay} mousewheel={mousewheel } effect={effect} grabCursor={ true } coverflowEffect={{ rotate: 50, stretch: 0, depth: 100, modifier: 1, slideShadows: true,}}
      breakpoints={{
        0: {
            slidesPerView: columns?.mobile,
            spaceBetween: columnGap
        },
        577: {
            slidesPerView: columns?.tablet,
            spaceBetween: columnGap
        },
       // Small Desktop devices (769px to 1024px)
        769: {
            slidesPerView: columns?.desktop,
            spaceBetween: columnGap
        },
        // Large Desktop devices (1025px and above)
        1025: {
            slidesPerView: columns?.desktop,
            spaceBetween: columnGap
        }
        }}>
        { pins?.pins?.map((pin, index) => {
            return <SwiperSlide key={index}>
                <SingleItem key={index} pin={pin} elId={elId}/>
            </SwiperSlide>
        })}
    </Swiper>

    return <SwiperEl />;
}
export default Slider;