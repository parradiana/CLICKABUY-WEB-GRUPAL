import Fade from 'react-reveal/Fade';
import { FaApple } from 'react-icons/fa'
const HeroHome = () => {
    return (
        <div className="galleryContainer">
            <div className="galleryItem">
                <video src="./assets/nikeBanner.mp4" autoPlay loop muted className="videoHeroHome"></video>
                <Fade left>
                    <span style={{ color: 'white', position: 'absolute', zIndex: -1, left: '8vw', top:'80vh', fontSize:'5em'}} className="fraseBannerNike">JUST DO IT.</span>
                </Fade>
            </div>
            <div className="galleryItem">
                <div style={{ backgroundImage: "url('https://webdesing881317710.files.wordpress.com/2021/06/airpodsbanner.jpg')" }} className="galleryImg" >
                    <Fade right>
                        <div style={{display: 'flex', flexDirection: 'column', alignItems:'flex-start'}}>
                            {/* <span style={{ color: 'white', fontSize: '1.2em' }}>New Airpods</span> */}
                            <FaApple style={{ color: 'white', fontSize: '3em'}}/>
                        </div>
                    </Fade>
                </div>
            </div>
            <div className="galleryItem">
                <div style={{ backgroundImage: "url('https://webdesing881317710.files.wordpress.com/2021/06/furniturebanner.jpg')" }} className="galleryImg">

                </div>
                {/* <div>
                </div> */}
            </div>
        </div>
    )
}
export default HeroHome