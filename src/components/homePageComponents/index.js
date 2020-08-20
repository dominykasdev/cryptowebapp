import React from 'react';
import CryptoList from './cryptoList';
import UserStats from './UserStats';

const HomePage = () => {
    return (
        <div className="mainContent">
            <UserStats />
            <CryptoList />
        </div>
    )
}

export default HomePage;