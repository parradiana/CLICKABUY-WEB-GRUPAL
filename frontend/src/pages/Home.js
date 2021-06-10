import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import CategoriesBanner from '../components/CategoriesBanner'
import MainHome from '../components/MainHome'
import HeroHome from '../components/HeroHome'
import { connect } from 'react-redux'
import authActions from '../redux/actions/authActions'
import WebsiteAperture from './WebsiteAperture'
import Fade from 'react-reveal/Fade';
import Reveal from 'react-reveal/Reveal';

class Home extends React.Component {
    componentDidMount() {
        window.scrollTo(0, 0)
    }
    render() {
        if (this.props.firstAnimation) {
            setTimeout(() => this.props.animationState(), 2400)
            return <WebsiteAperture />
        }
        return (
            <div className="contenedorHome">
                <Fade bottom>
                    <Header />
                </Fade>
                <Fade bottom>
                    <HeroHome />
                </Fade>
                <CategoriesBanner />
                <MainHome />
                <Footer />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        firstAnimation: state.authReducer.firstAnimation
    };
};
const mapDispatchToProps = {
    animationState: authActions.animationState

};

export default connect(mapStateToProps, mapDispatchToProps)(Home);