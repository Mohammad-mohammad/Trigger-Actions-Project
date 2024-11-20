import React, { useState } from 'react';

const App = ({ triggers, actions }) => {
    const handleTriggerClick = (triggerName) => {
        const relatedActions = actions.filter(action => action.trigger === triggerName);
        relatedActions.forEach(action => {
            alert(action.message);
        });
    };

    return (
        <div>
            <h1>Trigger Actions</h1>
            {triggers.map(trigger => (
                <button key={trigger} onClick={() => handleTriggerClick(trigger)}>
                    {trigger}
                </button>
            ))}
        </div>
    );
};

export default App;
