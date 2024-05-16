import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { useNavigate } from 'react-router-dom';
import FetchUserProfile from './FetchUserProfile';


const ProfilePage: React.FC = () => {
  const { user, testData } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  const handleGoToLogin = () => {
    navigate('/');
  };

  return (
    <div>
      <h1>Profile</h1>
      {user ? (
        <div>
          <p>ID: {user._id}</p>
          <p>Email: {user.email}</p>
          <p>First Name: {user.firstName}</p>
          <p>Last Name: {user.lastName}</p>
          <p>Created At: {user.createdAt}</p>
          <p>Updated At: {user.updatedAt}</p>
        </div>
      ) : (
        <p>Please log in to view your profile.</p>
      )}

      <h2>Test Data</h2>
      {testData ? (
        <p>Test Data Message: {testData.message}</p>
      ) : (
        <p>No test data available.</p>
      )}
       <button onClick={handleGoToLogin} className="bg-sky-800 py-2 px-4 rounded-lg text-white">Go to Index</button>
       <FetchUserProfile />
    </div>
  );
};

export default ProfilePage;
