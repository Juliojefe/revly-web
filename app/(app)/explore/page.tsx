'use client'

import { useRouter } from 'next/navigation';
import styles from "./explore.module.css";
import { useUser } from '@/context/UserContext';
import { PostType } from '@/types/post';
import { useEffect, useState } from 'react';
import axios from 'axios';
import PostList from '@/components/PostList';


export default function explore() {
  const router = useRouter();
  const { user, logout } = useUser();
  const [postData, setPostData] = useState<PostType[]>([]);
  const [currPage, setCurrPage] = useState(0);
  const [first, setFirst] = useState(false);
  const [last, setLast] = useState(false);
  const pageSize = 5;

  async function handleLogout() {
    logout();
    router.push("/login");
  }

  useEffect(() => {  // Load posts when the page loads
    console.log("useEffect fired");
    fetchPosts();
  }, []);

async function fetchPosts() {
  if (last) return;
  let endpoint;
  if (user) {
    endpoint = `${process.env.NEXT_PUBLIC_API_URL}/api/post/explore?page=${currPage}&size=${pageSize}`;
  } else {
    endpoint = `${process.env.NEXT_PUBLIC_API_URL}/api/post/explore/guest?page=${currPage}&size=${pageSize}`;
  }
  try {
    const res = await axios.get(endpoint, {
      headers: user
        ? { Authorization: `Bearer ${user.accessToken}` }
        : undefined,
    });
    const page = res.data;
    setFirst(page.first);
    setLast(page.last);
    setCurrPage(page.number + 1);
    setPostData(prev => [...prev, ...page.content]);
  } catch (err) {
    console.error("Failed to fetch posts", err);
  }
}


  return (
    <div className={styles.container}>
      <div className={styles.postContentContainer}>
        <h2>My Explore Page</h2>
        <PostList postDataArray={postData} />
      </div>
    </div>
  );
}