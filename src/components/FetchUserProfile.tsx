import React, { useState } from 'react';
import axios from 'axios';

interface User {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: string;
  updatedAt: string;
}

const FetchUserProfile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      console.log('Token from localStorage:', token);

      if (!token) {
        setError('No token found in localStorage');
        console.log('No token found in localStorage');
        return;
      }

      console.log('Sending GET request to fetch user profile');
      const response = await axios.get<User>('http://localhost:3001/api/v1/user/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Response from server:', response.data);

      setUser(response.data);
      setError(null);
      console.log('User profile fetched successfully');
    } catch (error) {
      console.error('Error fetching user profile:', error);
      setError('Failed to fetch user profile');
      setUser(null);
      console.log('Failed to fetch user profile');
    }
  };

  return (
    <div>
      <button onClick={fetchUserProfile}>Fetch User Profile</button>
      {error && <p>{error}</p>}
      {user && (
        <div>
          <p>ID: {user._id}</p>
          <p>Email: {user.email}</p>
          <p>First Name: {user.firstName}</p>
          <p>Last Name: {user.lastName}</p>
          <p>Created At: {user.createdAt}</p>
          <p>Updated At: {user.updatedAt}</p>
        </div>
      )}
    </div>
  );
};

export default FetchUserProfile;
