'use client'

import { useRouter } from 'next/navigation';
import styles from "./explore.module.css";
import { useUser } from '@/context/UserContext';
import { PostType } from '@/types/post';
import { useEffect, useState } from 'react';
import axios from 'axios';


export default function explore() {
  const router = useRouter();
  const { user, logout } = useUser();
  const testPostIds = [1, 47, 48];    //  text only, one image, two images
  const [postData, setPostData] = useState<PostType[]>([]);

  async function handleLogout() {
    logout();
    router.push("/login");
  }

  useEffect(() => {  // Load posts when the page loads
    async function fetchPosts() {
      for (const id of testPostIds) {
        try {
          const rawPost = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/post/${id}`);
          postData.push(rawPost.data);
        } catch (err) {
          console.error(`Failed to fetch post ${id}`, err);
        }
      }
      setPostData(postData);
      // console.log(postData);
    }
      fetchPosts();
    }, []);

  return (
    <div className={styles.container}>
      <div className={styles.postContentContainer}>
        <h2>My explore Page</h2>
      </div>
    </div>
  );
}