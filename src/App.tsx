import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import MarketDashboard from './components/MarketDashboard';
import HomePage from './components/HomePage';
import TrendsPage from './components/TrendsPage';
import GetQuotePage from './components/GetQuotePage';
import AluminumShorts from './components/AluminumShorts';

type Page = 'home' | 'dashboard' | 'trends' | 'aluminum-shorts' | 'mcx-orders' | 'quote';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Show sidebar for all pages except home
  const showSidebar = currentPage !== 'home';

  return (
    <div className={`${isDarkMode ? 'dark' : ''}`}>
      <div className={showSidebar ? 'dashboard-layout' : ''}>
        {showSidebar && (
          <Sidebar 
            currentPage={currentPage} 
            onPageChange={setCurrentPage}
            isCollapsed={isSidebarCollapsed}
            onCollapse={setIsSidebarCollapsed}
            isDarkMode={isDarkMode}
            onThemeChange={setIsDarkMode}
          />
        )}
        
        <div className={`transition-all duration-300 ${
          showSidebar ? (isSidebarCollapsed ? 'pl-16' : 'pl-64') : ''
        }`}>
          <main className={`${currentPage === 'home' ? '' : 'dashboard-content py-6'}`}>
            {currentPage === 'home' && (
              <HomePage onNavigateToDashboard={() => setCurrentPage('dashboard')} />
            )}
            {currentPage === 'dashboard' && <MarketDashboard />}
            {currentPage === 'trends' && <TrendsPage />}
            {currentPage === 'aluminum-shorts' && <AluminumShorts />}
            {currentPage === 'mcx-orders' && <div className="max-w-7xl mx-auto px-4">MCX Orders Content</div>}
            {currentPage === 'quote' && <GetQuotePage />}
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;