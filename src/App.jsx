import React from 'react';
import { Navigate, BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Blogs from './components/Blogs';
import Services from './components/Services';
import Contact from './components/Contact';
import LoginSignup from './components/LoginSignUp';

import {MarketIntegration, DataAnalytics,FarmerTraining,CommunityBuilding} from './components/ServicesPages';
import FarmerDashboard from './Dashboards/FarmerDashboard';
import {TermsOfService,PrivacyPolicy,FAQ} from './components/LegalPages';
import Layout from './components/Layout';
import BuyersLayout from './BuyersDashboard/BuyersLayout';
import TransactionManagement from './BuyersDashboard/TransactionManagement';
import RelationshipManagement from './BuyersDashboard/RelationshipManagement';
import SupplyDiscovery from './BuyersDashboard/SupplyDiscovery';
import LogisticsPlanning from './BuyersDashboard/LogisticsPlanning';
import DashboardOverview from './BuyersDashboard/DashboardOverview';

import AgroLayout from './AgronomistDashboard/AgroLayout';
import AgroDash from './AgronomistDashboard/AgroDash';

import AgroSoilAnalysis from './AgronomistDashboard/AgroSoilAnalysis';
import Calendar from "./AgronomistDashboard/Calendar"
import Alerts from "./AgronomistDashboard/Alerts"
import Performance from "./AgronomistDashboard/Performace"
import Pests from "./AgronomistDashboard/Pests"
import Climate from "./AgronomistDashboard/Climate"
import Practices from "./AgronomistDashboard/Practices"

import LayoutDash from './Dashboards/LayoutDash';
import MessagingHub from './Dashboards/MessagingHub';

import OperationsManagement from './Dashboards/OperationManagement';
import MarketAccess from './Dashboards/Market';
import Space from './Dashboards/Space';
import  Library  from './Dashboards/Library';
import TrainingPrograms from './Dashboards/Trainings';
function App() {
  return ( 
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout/>}>
          <Route path="/" index element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/contact" element={<Contact />} />

         
          <Route path="/market-integration" element={<MarketIntegration />} />
            <Route path="/data-analytics" element={<DataAnalytics />} />
            <Route path="/farmer-training" element={<FarmerTraining />} />
            <Route path="/community-building" element={<CommunityBuilding />} />
            
          
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/faq" element={<FAQ />} />
            </Route>
       
        <Route path='/login' element ={<LoginSignup/>}/>
        <Route path='/' element={<LayoutDash/>}>
        <Route path='/dashboard' element ={<FarmerDashboard/>}/>
        <Route path='/operations' element ={<OperationsManagement/>}/>
        <Route path='/market' element ={<MarketAccess/>}/>
        <Route path='/community' element ={<MessagingHub/>}/>
        <Route path='/space' element ={<Space/>}/>
        <Route path='/library' element ={<Library/>}/>
        <Route path='/trainings' element ={<TrainingPrograms/>}/>
        </Route>
        
        <Route path="/" element={<BuyersLayout />}>
          <Route index element={<DashboardOverview />} />
          <Route path="/buyersoverview" element={<DashboardOverview />} />
          <Route path="/supply" element={<SupplyDiscovery />} />
          <Route path="/transactions" element={<TransactionManagement />} />
          <Route path="/logistics" element={<LogisticsPlanning />} />
          <Route path="/relationships" element={<RelationshipManagement />} />
        </Route>

        <Route path='/' element ={<AgroLayout/>}>
        <Route index element={<AgroDash />} />
        <Route path="/agrodash" element={<AgroDash />} />
        <Route path="/farmers" element={<AgroSoilAnalysis />} />
        <Route path="/calendar" element={<Calendar />} />
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/performance" element={<Performance />} />
            <Route path="/pests" element={<Pests />} />
            <Route path="/climate" element={<Climate />} />
            <Route path="/practices" element={<Practices/>} />

        </Route>
        </Routes>
      
      
      
      
    </BrowserRouter>
  );
}

export default App;
