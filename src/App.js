import React from 'react';
import { Router } from '@reach/router';
import Home from './Pages/Home';
import RealtimeDataChart from './Pages/RealtimeDataChart';
import './App.scss';

export default function App() {
  return (
    <Router>
      <Home path="/" />
      <RealtimeDataChart path="/realtime-data-chart" />
    </Router>
  );
}
