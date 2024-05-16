import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

interface User {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: string;
  updatedAt: string;
}

interface ServerResponse {
  status: number;
  message: string;
  body: User;
}

const FetchUserProfile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [editedFirstName, setEditedFirstName] = useState('');
  const [editedLastName, setEditedLastName] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log('Token from localStorage:', token);

        if (!token) {
          console.log('No token found in localStorage');
          return;
        }

        console.log('Sending GET request to fetch user profile');
        const response = await axios.get<ServerResponse>('http://localhost:3001/api/v1/user/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('Response from server:', response.data);

        setUser(response.data.body);
        console.log('User profile fetched successfully');
      } catch (error) {
        console.error('Error fetching user profile:', error);
        setUser(null);
        console.log('Failed to fetch user profile');
      }
    };

    fetchUserProfile();
  }, []);

  const handleEdit = () => {
    setEditedFirstName(user?.firstName || '');
    setEditedLastName(user?.lastName || '');
    setIsEditing(true);
  };

  const handleSaveProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.log('No token found in localStorage');
        return;
      }
  
      const response = await axios.put(
        'http://localhost:3001/api/v1/user/profile',
        {
          firstName: editedFirstName,
          lastName: editedLastName,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      console.log('Profile updated successfully:', response.data);
      setUser(response.data.body);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };
  
  const handleCancelEdit = () => {
    setIsEditing(false);
  };
 
  const handleSignOut = () => {
    console.log('Signing out...');
    localStorage.removeItem('token');
    console.log('Token removed from localStorage');
    setUser(null);
    console.log('User state cleared');
    navigate('/');
    console.log('Navigated to the index page');
  };


  return (
    <>
      <nav className="main-nav">
        <Link className="main-nav-logo" to="/">
          <img
            className="main-nav-logo-image"
            src="./img/argentBankLogo.png"
            alt="Argent Bank Logo"
          />
          <h1 className="sr-only">Argent Bank</h1>
        </Link>
        <div>
          <Link className="main-nav-item" to="/user">
            <i className="fa fa-user-circle"></i>
            {user?.firstName}
          </Link>
          <button className="main-nav-item" onClick={handleSignOut}>
            <i className="fa fa-sign-out"></i>
            Sign Out
          </button>
        </div>
      </nav>
      <main className="main bg-dark min-h-[calc(100vh-150px)]">
        <div className="header">
        {isEditing ? (
            <>
            <h1 className="pt-8 text-2xl pb-4">Welcome Back</h1>
            <div className="flex items-center justify-center gap-6">
              <input
                type="text"
                value={editedFirstName}
                onChange={(e) => setEditedFirstName(e.target.value)}
                className="max-w-sm py-2 rounded-sm outline outline-gray-600 text-gray-400 px-2 text-[18px]"
              />
              <input
                type="text"
                value={editedLastName}
                onChange={(e) => setEditedLastName(e.target.value)}
                className="max-w-sm py-2 rounded-sm outline outline-gray-600 text-gray-400 px-2 text-[18px]"
              />
              </div>
              <div className="flex items-center justify-center gap-6 pt-6">
              <button className="w-[140px] py-2 px-2 outline outline-2 outline-blue-700 rounded-sm text-blue-700 bg-white font-semibold"
              onClick={handleSaveProfile}>Save</button>
                 <button className="w-[140px] py-2 px-2 outline outline-2 outline-blue-700 rounded-sm text-blue-700 bg-white font-semibold"
              onClick={handleCancelEdit}>Cancel</button>
              </div>
            </>
          ) : (
            <>
                <h1 className="pt-8 text-2xl">Welcome Back</h1>
                <br />
                <p className="text-lg pb-4">{user?.firstName} {user?.lastName}!</p>
              
              <button className="edit-button" onClick={handleEdit}>
                Edit Name
              </button>
            </>
          )}
        </div>
        <h2 className="sr-only">Accounts</h2>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Checking (x8349)</h3>
            <p className="account-amount">$2,082.79</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Savings (x6712)</h3>
            <p className="account-amount">$10,928.42</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
            <p className="account-amount">$184.30</p>
            <p className="account-amount-description">Current Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
      </main>
      <footer className="footer">
        <p className="footer-text">Copyright 2020 Argent Bank</p>
      </footer>
    </>
  );
};

export default FetchUserProfile;
