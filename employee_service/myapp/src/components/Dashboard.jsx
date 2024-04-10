import React, { useState } from 'react';
import UpcomingEventsScreen from './UpcomingEventsScreen';
import LeaveBalanceScreen from './LeaveBalanceScreen';
import AnnouncementsScreen from './AnnouncementsScreen';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCalendarAlt, faBriefcase, faFile, faChartBar, faGraduationCap, faBullhorn, faComments } from '@fortawesome/free-solid-svg-icons';
import LeaveRequestForm from './LeaveRequestForm';
import Profile from './Profile';
import PayrollList from './PayrollList';
import EmployeePerformanceReviewForm from './EmployeePerformanceReviewForm';
import TrainingDevelopment from './TrainingDevelopment';
import AnnouncementsAndNews from './AnnouncementsAndNews';
import CommunicationScreen from './CommunicationScreen';
import Document from './Document';
import './Dashboard.css';

function Dashboard() {
  const [selectedScreen, setSelectedScreen] = useState('');

  const handleScreenSelect = (screen) => {
    setSelectedScreen(screen);
  };

  return (
    <div className="dashboard">
      <div className="top-grid">
        <div className="top-grid-item" onClick={() => handleScreenSelect('upcomingEvents')}>
          <UpcomingEventsScreen />
        </div>
        <div className="top-grid-item" onClick={() => handleScreenSelect('leaveBalance')}>
          <LeaveBalanceScreen />
        </div>
        <div className="top-grid-item" onClick={() => handleScreenSelect('announcements')}>
          <AnnouncementsScreen />
        </div>
      </div>
      <div className="content">
        <div className="sidebar">
          <div className="sidebar-item" onClick={() => handleScreenSelect('profile')}>
            <FontAwesomeIcon icon={faUser} />
            <span>Profile</span>
          </div>
          <div className="sidebar-item" onClick={() => handleScreenSelect('leaveRequest')}>
            <FontAwesomeIcon icon={faCalendarAlt} />
            <span>Leave Request</span>
          </div>
          <div className="sidebar-item" onClick={() => handleScreenSelect('payroll')}>
            <FontAwesomeIcon icon={faBriefcase} />
            <span>Payroll</span>
          </div>
          <div className="sidebar-item" onClick={() => handleScreenSelect('document')}>
            <FontAwesomeIcon icon={faFile} />
            <span>Document</span>
          </div>
          <div className="sidebar-item" onClick={() => handleScreenSelect('employeePerformance')}>
            <FontAwesomeIcon icon={faChartBar} />
            <span>Employee Performance & Review</span>
          </div>
          <div className="sidebar-item" onClick={() => handleScreenSelect('training')}>
            <FontAwesomeIcon icon={faGraduationCap} />
            <span>Training</span>
          </div>
          <div className="sidebar-item" onClick={() => handleScreenSelect('announcement')}>
            <FontAwesomeIcon icon={faBullhorn} />
            <span>Announcement</span>
          </div>
          <div className="sidebar-item" onClick={() => handleScreenSelect('communication')}>
            <FontAwesomeIcon icon={faComments} />
            <span>Communication</span>
          </div>
        </div>
        <div className="main-content">
          {selectedScreen && (
            <div className="screen">
              {/* Render respective screen based on selectedScreen state */}
              {selectedScreen === 'profile' && <Profile />}
              {selectedScreen === 'leaveRequest' && <LeaveRequestForm />}
              {selectedScreen === 'payroll' && <PayrollList />}
              {selectedScreen === 'document' && <Document />} {/* Include Document component */}
              {selectedScreen === 'employeePerformance' && <EmployeePerformanceReviewForm />}
              {selectedScreen === 'training' && <TrainingDevelopment />}
              {selectedScreen === 'announcement' && <AnnouncementsAndNews />}
              {selectedScreen === 'communication' && <CommunicationScreen />}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
