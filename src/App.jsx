import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from '../components/LogInPage';
import SignUpPage from '../components/SignUpPage';
import LandingPage from '../components/LandingPage';
import AboutPage from '../components/About';
import MainPage from '../components/Mainpage';
import BMICalculator from '../components/BMICalculator';
import Diseases from '../components/Diseases';
import Layout from '../components/Layout';
import Drugs from '../components/Drugs';
import MedicalResearchArticles from '../components/MedicalResearchArticles';
import CommunityHealth from '../components/communityhealth';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element= {<LandingPage/>}/>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/About" element={<AboutPage />} />
        <Route path="/mainpage" element={<MainPage />} />
        <Route path="/BMICalculator" element={<BMICalculator />} />
        <Route path="/diseases" element={<Diseases />} />
        <Route path="/drugs" element={<Drugs />} />
        <Route path="/research" element={<MedicalResearchArticles />} />
        <Route path="/community-health" element={<CommunityHealth />} />
      </Routes>
    </Router>
  );
};

export default App;
