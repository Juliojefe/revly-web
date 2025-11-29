'use client'

import { useRouter } from 'next/navigation';
import styles from "./explore.module.css";
import { useUser } from '@/context/UserContext';
import { PostType } from '@/types/post';
import { useEffect, useState, useRef } from 'react';  // Add useRef
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
  const hasFetched = useRef(false);  // Add this ref

  async function handleLogout() {
    logout();
    router.push("/login");
  }

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;
    console.log("useEffect fired");
    fetchPosts();
  }, []);

  async function fetchPosts() {
    if (last) return;

    try {
      if (user) {
        const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/api/post/explore?page=${currPage}&size=${pageSize}`;
        try {
          const res = await axios.get(endpoint, {
            headers: { Authorization: `Bearer ${user.accessToken}` },
          });
          const page = res.data;
          setFirst(page.first);
          setLast(page.last);
          setCurrPage(page.number + 1);
          setPostData(prev => [...prev, ...page.content]);
          console.log(user);
          console.log(page.content);
        } catch (err) {
          console.error("Failed to fetch posts (authenticated user)", err);
        }
      } else {
        const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/api/post/explore/guest?page=${currPage}&size=${pageSize}`;
        try {
          const res = await axios.get(endpoint);
          const page = res.data;
          setFirst(page.first);
          setLast(page.last);
          setCurrPage(page.number + 1);
          setPostData(prev => [...prev, ...page.content]);
        } catch (err) {
          console.error("Failed to fetch posts (guest)", err);
        }
      }
    } catch (err) {
      console.error("Unexpected error in fetchPosts", err);
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