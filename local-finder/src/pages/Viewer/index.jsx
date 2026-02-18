import React from 'react';
import { SearchBar } from '../../components/SearchBar/Index';
import { SomeOtherComponent } from '../../components/SomeOtherComponent';

const Viewer = () => {
    return (
        <div>
            <SearchBar />
            <SomeOtherComponent />
        </div>
    );
};

export default Viewer;