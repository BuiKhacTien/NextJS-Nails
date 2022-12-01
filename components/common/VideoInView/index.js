import React, { useEffect, useState } from "react";
import HLSSource from "./hls";
import { useDispatch } from "react-redux";
import productApi from "../../../api/productApi";
import { showSuccess } from "../../../utils/app";
import ReactPlayer from "react-player";
import Hls from "hls.js";

function Index({
  videoDetail = false,
  onChangeEnded,
  src,
  poster,
  height,
  width = "100%",
  fluid = false,
  isPlay,
  autoPlay,
  propsPlay,
  propsPause,
  product = {},
}) {
  const isMobile = useWindowSize().width < 768;
  const [needAction, setNeedAction] = useState("");
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);
  const [paused, setPaused] = useState(false);
  const [ended, setEnded] = useState(false);

  useEffect(() => {
    if (isMobile) {
      if (playing === true) {
        updateWatching("PLAY");
      } else {
        updateWatching("PAUSE");
      }
    }
  }, [playing]);

  // useEffect(() => {
  //   if (ended) {
  //     updateViewed(product);
  //     setNeedAction("");
  //     setPaused(true);
  //     productApi.removeWatching(product.id, product.feature_Id);
  //   }
  // }, [ended]);

  useEffect(() => {
    // if (refs) {
    //   if (autoPlay) onPlay();
    //   refs.subscribeToStateChange(handleStateChange);
    // }
    let observer = null;
    if (!!window.IntersectionObserver && isMobile) {
      observer = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (entry.intersectionRatio < 1) {
              entry.target.pause();
            } else {
              setTimeout(() => {
                entry.target.muted = true;
                entry.target.play &&
                  entry.target
                    .play()
                    .then((_) => {})
                    .catch((error) => {
                      entry.target.play();
                    });
              }, 200);
            }
          });
        },
        { threshold: 1 }
      );
      const list = document.querySelectorAll("video");
      list.forEach((item) => {
        observer.observe(item);
      });
    }
    if (!isMobile && observer) observer.disconnect();
  }, [isMobile]);

  // const updateViewed = (product) => {
  //   productApi.viewed(product?.id, product?.feature_Id);
  // };

  const updateWatching = (action) => {
    if (product.id && action === "PLAY" && needAction !== "WATCHING") {
      setNeedAction("WATCHING");
      const payload = {
        feature_id: product.feature_Id,
        num: Number(product.watching_Times) + 1,
      };
      return productApi.addWatching(product.id, product.feature_Id);
    }
    if (!needAction) return;
    if (product.id && needAction === "WATCHING" && action === "PAUSE") {
      setNeedAction("");
      const payload = {
        feature_id: product.feature_Id,
        num:
          product.watching_Times <= 0 ? 0 : Number(product.watching_Times) - 1,
      };
      productApi.removeWatching(product.id, product.feature_Id);
    }
  };

  const onPlay = () => {
    setPlaying(true);
    if (propsPlay) propsPlay();
    updateWatching("PLAY");
  };

  const onPause = () => {
    setPlaying(false);
    if (propsPause) propsPause();
    updateWatching("PAUSE");
  };

  useEffect(() => {
    if (isPlay === true) {
      setPlaying(true);
    } else if (isPlay === false){
      setPlaying(false);
    }
  }, [isPlay])

  const handleChangeEndedTrue = () => {
    if (videoDetail === true) {
      onChangeEnded(true);
    }
  }

  const handleChangeEndedFalse = () => {
    if (videoDetail === true) {
      onChangeEnded(false);
    }
  }

  const is_ios = /iP(ad|od|hone)/i.test(window.navigator.userAgent);
  return (
    <div>
      <div
        className="video-in-view"
        style={{
          background: `url(${poster || ""})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "100%",
        }}
      >
        <div
          onMouseOver={onPlay}
          onMouseLeave={onPause}
          className="card-video__block"
          style={{ opacity: ready ? 1 : 0 }}
        >
          {/* <Player
          fluid={fluid}
          height={height}
          width={width}
          playsInline={true}
          muted={true}
          // poster={poster}
          preload={"auto"}
          ref={(node) => (refs = node)}
          // autoPlay={autoPlay}
        >
          <HLSSource isVideoChild src={src} />
          <BigPlayButton position="center" />
          <LoadingSpinner />
        </Player> */}
          <ReactPlayer
            url={src}
            playing={playing}
            onPlay={handleChangeEndedFalse}
            onReady={() => setReady(true)}
            onEnded={handleChangeEndedTrue}
            width={width}
            height={height ? height : undefined}
            controls
            muted
            playsinline
            config={{
              file: {
                forceHLS: !is_ios,
                forceVideo: true,
                hlsVersion: "1.2.3",
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default React.memo(Index);

// Hook
function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });
  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount
  return windowSize;
}

// const [player, setPlayer] = useState(null);
// const [ready, setReady] = useState(false);
// const isMobile = useWindowSize().width < 768;
// const [needAction, setNeedAction] = useState("");
// const [paused, setPaused] = useState(false);
// const [ended, setEnded] = useState(false);
// let refs;
// const dispatch = useDispatch();
// React.useEffect(() => {
//   if (isMobile) {
//     if (!paused) {
//       updateWatching("PLAY");
//     } else {
//       updateWatching("PAUSE");
//     }
//   }
// }, [paused]);
// React.useEffect(() => {
//   if (ended) {
//     updateViewed(product);
//     setNeedAction("");
//     setPaused(true);
//     productApi.removeWatching(product.id, product.feature_Id);
//   }
// }, [ended]);
// useEffect(() => {
//   if (refs) {
//     if (autoPlay) onPlay();
//     refs.subscribeToStateChange(handleStateChange);
//   }
//   let observer = null;
//   if (!!window.IntersectionObserver && isMobile) {
//     observer = new IntersectionObserver(
//       (entries, observer) => {
//         entries.forEach((entry) => {
//           if (entry.intersectionRatio < 1) {
//             entry.target.pause();
//           } else {
//             setTimeout(() => {
//               entry.target.muted = true;
//               entry.target.play &&
//                 entry.target
//                   .play()
//                   .then((_) => {})
//                   .catch((error) => {
//                     entry.target.play();
//                   });
//             }, 200);
//           }
//         });
//       },
//       { threshold: 1 }
//     );
//     const list = document.querySelectorAll("video");
//     list.forEach((item) => {
//       observer.observe(item);
//     });
//   }
//   if (!isMobile && observer) observer.disconnect();
// }, [isMobile]);
// const handleStateChange = (state) => {
//   setPaused(state.paused);
//   setEnded(state.ended);
//   if (state.readyState === 4) {
//     setPlayer(state);
//     setReady(true);
//   }
// };
// const updateViewed = (product) => {
//   productApi.viewed(product?.id, product?.feature_Id);
// };
// const onPlay = () => {
//   refs.muted = true;
//   refs.play();
//   if (propsPlay) propsPlay();
//   updateWatching("PLAY");
// };
// const updateWatching = (action) => {
//   if (product.id && action === "PLAY" && needAction !== "WATCHING") {
//     setNeedAction("WATCHING");
//     const payload = {
//       feature_id: product.feature_Id,
//       num: Number(product.watching_Times) + 1,
//     };
//     return productApi.addWatching(product.id, product.feature_Id);
//   }
//   if (!needAction) return;
//   if (product.id && needAction === "WATCHING" && action === "PAUSE") {
//     setNeedAction("");
//     const payload = {
//       feature_id: product.feature_Id,
//       num:
//         product.watching_Times <= 0 ? 0 : Number(product.watching_Times) - 1,
//     };
//     productApi.removeWatching(product.id, product.feature_Id);
//   }
// };
// const onPause = () => {
//   refs.pause();
//   if (propsPause) propsPause();
//   updateWatching("PAUSE");
// };
