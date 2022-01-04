import type { NextPage } from 'next';
import { useState } from 'react';
import { useUploadMutation } from '../lib/graphql/upload.graphql';

const Home: NextPage = () => {
  const [mutation] = useUploadMutation();
  return (
    <div>
      <form onSubmit={async (e) => {
        e.preventDefault();
        //@ts-ignore
        const file = e.target[0].files[0];
        if (file) {
          await mutation({
            variables: {
              file,
            },
          });
          // console.log(file);
        }
      }}>
        <input type="file" />
        <button type='submit'>Odeslat</button>
      </form>
    </div>
  )
}

export default Home
