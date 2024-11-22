import React from 'react';

const CustomEvent = ({ event, labels }) => {
    const label = labels.find(label => label.id === event.label);
    const backgroundColor = label ? label.color : 'transparent';

    return (
        <div style={{ backgroundColor, borderRadius: '8px', padding: '2px 4px', color: '#fff' }}>
            {event.title}
        </div>
    );
};

export default CustomEvent;