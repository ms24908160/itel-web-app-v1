import React from 'react';

interface ExampleComponentProps {
    title: string;
    description: string;
}

const ExampleComponent: React.FC<ExampleComponentProps> = ({ title, description }) => {
    const [count, setCount] = React.useState(0);

    const handleIncrement = () => {
        setCount(count + 1);
    };

    return (
        <div className="example-component">
            <h1>{title}</h1>
            <p>{description}</p>
            <button onClick={handleIncrement}>Increment Count</button>
            <p>Current Count: {count}</p>
        </div>
    );
};

export default ExampleComponent;