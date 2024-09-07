import {useRef} from 'react';
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { useEffect } from "react";
import Profile from './Profile/Profile';
import Default from './Layout/Default';
import Slider from './Layout/Slider';
import SingleItem from './Layout/SingleItem';
import Justified from './Layout/Justified';
import { loadingIcon } from '../../utils/icons';
import JustifiedPackage from './Layout/JustifiedPackage';

const Layout = ({attributes, pins, elId, status, loading}) => {
    const { elements, layout, columns, rowGap, columnGap, fancyApps} = attributes;
    const {isProfile, isPins} = elements;
    const {left, middle, right} = fancyApps;
    const {infobar} = left;
    const {zoomIn,zoomOut,toggle1to1,rotateCCW,rotateCW,flipX,flipY} = middle;
    const {slideshow, thumbs, close} = right;
    const justifiedEle = useRef();

    useEffect(() => {
		  Fancybox.bind(`[data-fancybox='bpinterest-dialog-${elId}']`, {
            Toolbar: {
                display: {
                  left: [
                    infobar && "infobar"
                ],
                  middle: [
                    zoomIn && "zoomIn",
                    zoomOut && "zoomOut",
                    toggle1to1 && "toggle1to1",
                    rotateCCW && "rotateCCW",
                    rotateCW && "rotateCW",
                    flipX && "flipX",
                    flipY && "flipY",
                  ],
                  right: [
                    slideshow && "slideshow",
                    thumbs && "thumbs",
                    close && "close"
                ],
                },
              },
		});
	  }, [fancyApps]);

    console.log(`bpinterest-dialog-${elId}`);
    
    if(loading) {
      return <div className='loadingArea'>{loadingIcon}</div>
    }

    if(status == 404 || status == 403){
      return <div className='noticeArea'>Board name not found</div>
    }

    console.log(layout, justifiedEle)

    return <div className='mainLayout'>
      {isProfile && <Profile attributes={attributes} pins={pins}/>}
      
      {isPins && <div ref={justifiedEle} className={`layout ${layout != 'justified' ? layout : 'justified' } columns-${columns.desktop} columns-tablet-${columns.tablet} columns-mobile-${columns.mobile}`}>
          {layout == "default" && <Default pins={pins} elId={elId}/>}
         
          {layout == "masonry" && (
            <ResponsiveMasonry columnsCountBreakPoints={{ 0: columns?.mobile, 576: columns?.tablet, 768: columns?.desktop }}> 
              <Masonry columnsCount={3} gutter={`${rowGap} ${columnGap}`}>
                { pins?.pins?.map((pin, index) => {
                  return <SingleItem key={index} pin={pin} elId={elId}/>
                })}
              </Masonry>
            </ResponsiveMasonry>
          ) }
        
          {layout == "slider" && <Slider attributes={attributes} pins={pins} elId={elId} />}
         
          {layout == "justified" &&
            <Justified justifiedEle={justifiedEle} attributes={attributes} pins={pins} elId={elId} />
          }

          {/* {layout == "justified" && <JustifiedPackage attributes={attributes} pins={pins} elId={elId} />} */}
      </div>}
    </div>
}
export default Layout;