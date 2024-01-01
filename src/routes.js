import Index from "views/Index.js";
import Register from "views/examples/Register.js";
import Login from "views/examples/Login.js";
import FansRequestingSkype from "views/examples/FansRequestingSkype";
import SetProfile from "views/examples/LicenseFee";
import ChangePassword from "views/examples/ChangePassword";
import RegistrationFee from "views/examples/RegistrationFee";
import Profile from "views/examples/Profile";
import ForgotPassword from "views/examples/ForgotPassword";
import ComplaintForm from "views/examples/ComplaintForm";
import MyStore from "views/examples/MyStore";
import ImproveChanceToSellLicenses from "views/examples/ImproveChanceToSellLicenses";
import HowTeamRosterWorks from "views/examples/HowTeamRosterWorks";
import RequestedCities from "views/examples/RequestedCities";
import RequestedSports from "views/examples/RequestedSports";
import InstructionsReadFirst from "views/examples/InstructionsReadFirst";
import CollectiveAlumJoin from "views/examples/CollectiveAlumJoin";
import YourCards from "views/examples/YourCards";
import HowYouSucceed from "views/examples/HowYouSucceed";
// import ConfirmConsert from 'views/examples/confirmConsent';
import Ambassador4Brand from "views/examples/Ambassador4Brand&Unkle501";
import AthletePostThisPage from "views/examples/AthletePostThisPage";
import ScrollSign from "views/examples/ScrollSign";
import Tutorials from "views/examples/Tutorials";
import SeasonalBadges from "views/examples/SeasonalBadges";
import AddMementos from "views/AddMementos";

var routes = [
  {
    path: "/tutorials",
    name: "Video Tutorials",
    icon: "ni ni-tv-2 text-primary",
    component: Tutorials,
    layout: "/admin",
  },
  {
    path: "/add-mementos",
    name: "Add Mementos",
    icon: "ni ni-tv-2 text-primary",
    component: AddMementos,
    layout: "/admin",
  },
  {
    path: "/index",
    name: "Instructions - Read FIRST",
    icon: "ni ni-tv-2 text-primary",
    component: InstructionsReadFirst,
    layout: "/admin",
  },
  {
    path: "/Improve-Chances-To-Sell-Licenses",
    name: "Improve Your Chances To Sell Licenses Here",
    icon: "ni ni-tv-2 text-primary",
    component: ImproveChanceToSellLicenses,
    layout: "/admin",
  },
  {
    path: "/how-team-roster-works",
    name: "H0W TEAM ROSTER WORKS",
    icon: "ni ni-tv-2 text-primary",
    component: HowTeamRosterWorks,
    layout: "/admin",
  },
  {
    path: "/fans-request",
    name: "Fans Requesting Skype Call from Athlete",
    icon: "ni ni-tv-2 text-primary",
    component: FansRequestingSkype,
    layout: "/admin",
  },
  // {
  //   path: "/license-fee",
  //   name: "License Fee",
  //   icon: "ni ni-tv-2 text-primary",
  //   component: SetProfile,
  //   layout: "/admin",
  // },
  {
    path: "/profile",
    name: "Profile",
    icon: "ni ni-tv-2 text-primary",
    component: Profile,
    layout: "/admin",
  },
  {
    path: "/how-you-succeed",
    name: "HOW YOU SUCCEED",
    icon: "ni ni-tv-2 text-primary",
    component: HowYouSucceed,
    layout: "/admin",
  },
  // AthletePostThisPage
  {
    path: "/athlete-post-this-ad",
    name: "Athlete Posts This Ad",
    icon: "ni ni-tv-2 text-primary",
    component: AthletePostThisPage,
    layout: "/admin",
  },
  {
    path: "/scroll-sign",
    name: "Scroll Sign & Posters",
    icon: "ni ni-tv-2 text-primary",
    component: ScrollSign,
    layout: "/admin",
  },
  {
    path: "/cards",
    name: "Your Card",
    icon: "ni ni-tv-2 text-primary",
    component: YourCards,
    layout: "/admin",
  },
  {
    path: "/CollectiveAlums&Match4Future",
    name: "CollectiveAlums.com & Match4Future.com",
    icon: "ni ni-tv-2 text-primary",
    component: CollectiveAlumJoin,
    layout: "/admin",
  },

  // home
  {
    path: "/Ambassador4Brand&Unkle501",
    name: "Chat - Ambassador4Brand & Unkle501",
    icon: "ni ni-tv-2 text-primary",
    component: Ambassador4Brand,
    layout: "/admin",
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/admin",
  },
  {
    path: "/change-password",
    name: "Change Password",
    icon: "ni ni-tv-2 text-primary",
    component: ChangePassword,
    layout: "/admin",
  },
  {
    path: "/raise-issue",
    name: "Raise an Issue",
    icon: "ni ni-tv-2 text-primary",
    component: ComplaintForm,
    layout: "/admin",
  },
  {
    path: "/requested-cities",
    name: "Requested Cities",
    icon: "ni ni-tv-2 text-primary",
    component: RequestedCities,
    layout: "/admin",
  },
  {
    path: "/requested-sports",
    name: "Requested Sports",
    icon: "ni ni-tv-2 text-primary",
    component: RequestedSports,
    layout: "/admin",
  },

  // {
  // 	path: '/consert-confirmation',
  // 	name: 'Consert Confirmation',
  // 	icon: 'ni ni-tv-2 text-primary',
  // 	component: ConfirmConsert,
  // 	layout: '/admin',
  // },
  {
    path: "/store",
    name: "Store",
    icon: "ni ni-tv-2 text-primary",
    component: MyStore,
    layout: "/admin",
  },
  {
    path: "/seasonal-badges",
    name: "Seasonal Badges",
    icon: "ni ni-tv-2 text-primary",
    component: SeasonalBadges,
    layout: "/admin",
  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/auth",
  },
  {
    path: "/register",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    component: Register,
    layout: "/auth",
  },
  {
    path: "/forgot-password",
    name: "Forgot Password",
    icon: "ni ni-circle-08 text-pink",
    component: ForgotPassword,
    layout: "/auth",
  },
  {
    path: "/registration-fee",
    name: "Registeration Fee",
    icon: "ni ni-circle-08 text-pink",
    component: RegistrationFee,
    layout: "/auth",
  },
];
export default routes;
