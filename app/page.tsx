'use client'; // For state
import { useState } from 'react';
import { Button } from 'react-bootstrap';

export default function Home() {
  const [count, setCount] = useState(0);
  return (
    <div className="container">
      <h1>Counter: {count}</h1>
      <Button variant="success" onClick={() => setCount(count + 1)}>Increment</Button>
    </div>
  );
}