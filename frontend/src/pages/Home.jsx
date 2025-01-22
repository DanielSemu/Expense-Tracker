import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { profile } from '../api/auth';  // Assuming this is an API call to fetch the profile

const Home = () => {
  const [userProfile, setUserProfile] = useState(null);  // Use userProfile as a more descriptive state name

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await profile();  // Fetch profile data
        setUserProfile(res);  // Set the profile data to state
      } catch (error) {
        console.error('Failed to fetch profile:', error);
      }
    };
    fetchProfile();
  }, []);

  return (
    <div className='text-center'>
      <h1>Home Page</h1>
      {userProfile ? (
        <p>{userProfile.username}</p>  
      ) : (
        <p>Loading...</p>
      )}
      <Link to="/">Dashboard</Link>
    </div>
  );
};

export default Home;
