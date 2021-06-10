import { useState } from 'react';
import Lottie from 'react-lottie';
import animationData from '../lotties/clickabuy-animation.json';
import { FaTags } from 'react-icons/fa'
import Slide from 'react-reveal/Slide';

const WebsiteAperture = () => {
  const [logoVisible, setLogoVisible] = useState(true)
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };
  if (logoVisible) {   
    setTimeout(() => setLogoVisible(false), 2000)
    return <div className="logoVisible">
      <Slide right cascade><FaTags/> clickabuy</Slide>
    </div>
  }
  return (
    <div className="contenedorAnimation">
      <Lottie
        options={defaultOptions}
        height={657}
        width={1365}
        speed={0}
      />
    </div>
  )
}
export default WebsiteAperture