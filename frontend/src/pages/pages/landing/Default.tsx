import AddressSection from 'components/modules/landing/default/address/AddressSection';
import Brands from 'components/modules/landing/default/Brands';
import Features from 'components/modules/landing/default/features/Features';
import Footer from 'components/modules/landing/default/Footer';
import FunFacts from 'components/modules/landing/default/fun-facts/FunFacts';
import Gallery from 'components/modules/landing/default/Gallery';
import Testimonial from 'components/modules/landing/default/testimonial/Testimonial';
import DefaultLandingNavbar from 'components/navbars/default-landing-navbar/DefaultLandingNavbar';
import useSettingsMountEffect from 'hooks/useSettingsMountEffect';
import HeroHeader from '../../apps/travel-agency/landing/HeroHeader';

const Default = () => {
  useSettingsMountEffect({
    disableNavigationType: true,
    disableHorizontalNavbarAppearance: true,
    disableVerticalNavbarAppearance: true,
    disableHorizontalNavbarShape: true
  });

  return (
    <div className="bg-body-emphasis">
      <DefaultLandingNavbar />
      <HeroHeader />
      <Brands className="py-5 pt-xl-13" />
      <Features />
      <Testimonial />
      <FunFacts />
      <Gallery />
      <AddressSection />
      <Footer />
    </div>
  );
};

export default Default;
