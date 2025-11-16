'use client'; // For state
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/navigation';


export default function Home() {
  const [count, setCount] = useState(0);
  const router = useRouter();

  return (
    <div className="container">
      <h1>Counter: {count}</h1>
      <Button variant="success" onClick={() => setCount(count + 1)}>Increment</Button>
      <Button variant="success" onClick={async() => router.push("/signUp")}>signUp</Button>
    </div>
  );
}