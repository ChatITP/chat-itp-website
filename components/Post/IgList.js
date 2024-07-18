"use client";
import React from 'react';
import IgPost from '@/components/Post/IgPost';

const IgList = ({ feed = [] }) => {
  return (
    <div className="grid grid-rows-3 grid-cols-3 place-items-center">
      {feed.map((post) => (
        <IgPost
          key={post.id}
          embedCode={`
            <blockquote class="instagram-media" data-instgrm-captioned data-instgrm-permalink="${post.permalink}" data-instgrm-version="14" style="background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; width:250px; height:355px; padding:0;">
              <div style="padding:16px;">
                <a href="${post.permalink}" style="background:#FFFFFF; line-height:0; padding:0; text-align:center; text-decoration:none; width:100%;" target="_blank">
                  <div style="display: flex; flex-direction: column; align-items: center;">
                    <img src="${post.media_url}" alt="Instagram Post" style="width: 100%; height: auto; border-radius: 8px;"/>
                  </div>
                </a>
              </div>
            </blockquote>
          `}
        />
      ))}
    </div>
  );
};

export default IgList;




