import React from 'react';

const CustomBadge = (props: {color: string}) => {
    const { color } = props;
    return (
        <div>
            <span  style={{
                backgroundColor: color,
                color: "white",
                padding: "4px 8px",
                textAlign: "center",
                borderRadius: "5px"
            }}>
f
            </span>

        </div>
    );
}

export default CustomBadge;
