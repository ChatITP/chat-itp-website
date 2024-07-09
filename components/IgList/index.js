import React from "react";
import IgPost from "@/components/IgPost";

const IgList = () => {
  const posts = [
    {
      id: 1,
      embedCode: `
     <blockquote class="instagram-media" data-instgrm-captioned data-instgrm-permalink="https://www.instagram.com/p/C8-QzcFx_Fg/?utm_source=ig_embed&amp;utm_campaign=loading" data-instgrm-version="14" style="background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; width:250px; height:355px; padding:0;">
       <div style="padding:16px;">
         <a href="https://www.instagram.com/p/C8-QzcFx_Fg/?utm_source=ig_embed&amp;utm_campaign=loading" style="background:#FFFFFF; line-height:0; padding:0; text-align:center; text-decoration:none; width:100%;" target="_blank">
           <div style="display: flex; flex-direction: column; align-items: center;">
             <img src="https://scontent-lga3-2.cdninstagram.com/v/t51.29350-15/440415366_414956677842121_4350571250961465761_n.jpg?stp=dst-jpg_e15&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xMDgweDEwODAuc2RyLmYyOTM1MCJ9&_nc_ht=scontent-lga3-2.cdninstagram.com&_nc_cat=101&_nc_ohc=trqcdBusNNIQ7kNvgGWGK2S&edm=AEhyXUkBAAAA&ccb=7-5&ig_cache_key=MzM1Mjg2MTkxMzUxOTUxMzM2OA%3D%3D.2-ccb7-5&oh=00_AYD5-4WflTA-EbJ1dmAjToxMMfVFOq6IFR_IqUfHNobg2A&oe=6692BCC0&_nc_sid=8f1549" alt="Instagram Post" style="width: 100%; height: auto; border-radius: 8px;"/>
           </div>
         </a>
       </div>
     </blockquote>
      `,
    },
    {
        id: 2,
        embedCode: `
       <blockquote class="instagram-media" data-instgrm-captioned data-instgrm-permalink="https://www.instagram.com/p/C8-QzcFx_Fg/?utm_source=ig_embed&amp;utm_campaign=loading" data-instgrm-version="14" style="background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; width:250px; height:355px; padding:0;">
         <div style="padding:16px;">
           <a href="https://www.instagram.com/p/C8-QzcFx_Fg/?utm_source=ig_embed&amp;utm_campaign=loading" style="background:#FFFFFF; line-height:0; padding:0; text-align:center; text-decoration:none; width:100%;" target="_blank">
             <div style="display: flex; flex-direction: column; align-items: center;">
               <img src="https://scontent-lga3-2.cdninstagram.com/v/t51.29350-15/440415366_414956677842121_4350571250961465761_n.jpg?stp=dst-jpg_e15&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xMDgweDEwODAuc2RyLmYyOTM1MCJ9&_nc_ht=scontent-lga3-2.cdninstagram.com&_nc_cat=101&_nc_ohc=trqcdBusNNIQ7kNvgGWGK2S&edm=AEhyXUkBAAAA&ccb=7-5&ig_cache_key=MzM1Mjg2MTkxMzUxOTUxMzM2OA%3D%3D.2-ccb7-5&oh=00_AYD5-4WflTA-EbJ1dmAjToxMMfVFOq6IFR_IqUfHNobg2A&oe=6692BCC0&_nc_sid=8f1549" alt="Instagram Post" style="width: 100%; height: auto; border-radius: 8px;"/>
             </div>
           </a>
         </div>
       </blockquote>
        `,
      },
      {
        id: 3,
        embedCode: `
       <blockquote class="instagram-media" data-instgrm-captioned data-instgrm-permalink="https://www.instagram.com/p/C8-QzcFx_Fg/?utm_source=ig_embed&amp;utm_campaign=loading" data-instgrm-version="14" style="background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; width:250px; height:355px; padding:0;">
         <div style="padding:16px;">
           <a href="https://www.instagram.com/p/C8-QzcFx_Fg/?utm_source=ig_embed&amp;utm_campaign=loading" style="background:#FFFFFF; line-height:0; padding:0; text-align:center; text-decoration:none; width:100%;" target="_blank">
             <div style="display: flex; flex-direction: column; align-items: center;">
               <img src="https://scontent-lga3-2.cdninstagram.com/v/t51.29350-15/440415366_414956677842121_4350571250961465761_n.jpg?stp=dst-jpg_e15&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xMDgweDEwODAuc2RyLmYyOTM1MCJ9&_nc_ht=scontent-lga3-2.cdninstagram.com&_nc_cat=101&_nc_ohc=trqcdBusNNIQ7kNvgGWGK2S&edm=AEhyXUkBAAAA&ccb=7-5&ig_cache_key=MzM1Mjg2MTkxMzUxOTUxMzM2OA%3D%3D.2-ccb7-5&oh=00_AYD5-4WflTA-EbJ1dmAjToxMMfVFOq6IFR_IqUfHNobg2A&oe=6692BCC0&_nc_sid=8f1549" alt="Instagram Post" style="width: 100%; height: auto; border-radius: 8px;"/>
             </div>
           </a>
         </div>
       </blockquote>
        `,
      },
      {
        id: 4,
        embedCode: `
       <blockquote class="instagram-media" data-instgrm-captioned data-instgrm-permalink="https://www.instagram.com/p/C8-QzcFx_Fg/?utm_source=ig_embed&amp;utm_campaign=loading" data-instgrm-version="14" style="background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; width:250px; height:355px; padding:0;">
         <div style="padding:16px;">
           <a href="https://www.instagram.com/p/C8-QzcFx_Fg/?utm_source=ig_embed&amp;utm_campaign=loading" style="background:#FFFFFF; line-height:0; padding:0; text-align:center; text-decoration:none; width:100%;" target="_blank">
             <div style="display: flex; flex-direction: column; align-items: center;">
               <img src="https://scontent-lga3-2.cdninstagram.com/v/t51.29350-15/440415366_414956677842121_4350571250961465761_n.jpg?stp=dst-jpg_e15&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xMDgweDEwODAuc2RyLmYyOTM1MCJ9&_nc_ht=scontent-lga3-2.cdninstagram.com&_nc_cat=101&_nc_ohc=trqcdBusNNIQ7kNvgGWGK2S&edm=AEhyXUkBAAAA&ccb=7-5&ig_cache_key=MzM1Mjg2MTkxMzUxOTUxMzM2OA%3D%3D.2-ccb7-5&oh=00_AYD5-4WflTA-EbJ1dmAjToxMMfVFOq6IFR_IqUfHNobg2A&oe=6692BCC0&_nc_sid=8f1549" alt="Instagram Post" style="width: 100%; height: auto; border-radius: 8px;"/>
             </div>
           </a>
         </div>
       </blockquote>
        `,
      },
      {
        id: 5,
        embedCode: `
       <blockquote class="instagram-media" data-instgrm-captioned data-instgrm-permalink="https://www.instagram.com/p/C8-QzcFx_Fg/?utm_source=ig_embed&amp;utm_campaign=loading" data-instgrm-version="14" style="background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; width:250px; height:355px; padding:0;">
         <div style="padding:16px;">
           <a href="https://www.instagram.com/p/C8-QzcFx_Fg/?utm_source=ig_embed&amp;utm_campaign=loading" style="background:#FFFFFF; line-height:0; padding:0; text-align:center; text-decoration:none; width:100%;" target="_blank">
             <div style="display: flex; flex-direction: column; align-items: center;">
               <img src="https://scontent-lga3-2.cdninstagram.com/v/t51.29350-15/440415366_414956677842121_4350571250961465761_n.jpg?stp=dst-jpg_e15&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xMDgweDEwODAuc2RyLmYyOTM1MCJ9&_nc_ht=scontent-lga3-2.cdninstagram.com&_nc_cat=101&_nc_ohc=trqcdBusNNIQ7kNvgGWGK2S&edm=AEhyXUkBAAAA&ccb=7-5&ig_cache_key=MzM1Mjg2MTkxMzUxOTUxMzM2OA%3D%3D.2-ccb7-5&oh=00_AYD5-4WflTA-EbJ1dmAjToxMMfVFOq6IFR_IqUfHNobg2A&oe=6692BCC0&_nc_sid=8f1549" alt="Instagram Post" style="width: 100%; height: auto; border-radius: 8px;"/>
             </div>
           </a>
         </div>
       </blockquote>
        `,
      },
      {
        id: 6,
        embedCode: `
       <blockquote class="instagram-media" data-instgrm-captioned data-instgrm-permalink="https://www.instagram.com/p/C8-QzcFx_Fg/?utm_source=ig_embed&amp;utm_campaign=loading" data-instgrm-version="14" style="background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; width:250px; height:355px; padding:0;">
         <div style="padding:16px;">
           <a href="https://www.instagram.com/p/C8-QzcFx_Fg/?utm_source=ig_embed&amp;utm_campaign=loading" style="background:#FFFFFF; line-height:0; padding:0; text-align:center; text-decoration:none; width:100%;" target="_blank">
             <div style="display: flex; flex-direction: column; align-items: center;">
               <img src="https://scontent-lga3-2.cdninstagram.com/v/t51.29350-15/440415366_414956677842121_4350571250961465761_n.jpg?stp=dst-jpg_e15&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xMDgweDEwODAuc2RyLmYyOTM1MCJ9&_nc_ht=scontent-lga3-2.cdninstagram.com&_nc_cat=101&_nc_ohc=trqcdBusNNIQ7kNvgGWGK2S&edm=AEhyXUkBAAAA&ccb=7-5&ig_cache_key=MzM1Mjg2MTkxMzUxOTUxMzM2OA%3D%3D.2-ccb7-5&oh=00_AYD5-4WflTA-EbJ1dmAjToxMMfVFOq6IFR_IqUfHNobg2A&oe=6692BCC0&_nc_sid=8f1549" alt="Instagram Post" style="width: 100%; height: auto; border-radius: 8px;"/>
             </div>
           </a>
         </div>
       </blockquote>
        `,
      },
      {
        id: 7,
        embedCode: `
       <blockquote class="instagram-media" data-instgrm-captioned data-instgrm-permalink="https://www.instagram.com/p/C8-QzcFx_Fg/?utm_source=ig_embed&amp;utm_campaign=loading" data-instgrm-version="14" style="background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; width:250px; height:355px; padding:0;">
         <div style="padding:16px;">
           <a href="https://www.instagram.com/p/C8-QzcFx_Fg/?utm_source=ig_embed&amp;utm_campaign=loading" style="background:#FFFFFF; line-height:0; padding:0; text-align:center; text-decoration:none; width:100%;" target="_blank">
             <div style="display: flex; flex-direction: column; align-items: center;">
               <img src="https://scontent-lga3-2.cdninstagram.com/v/t51.29350-15/440415366_414956677842121_4350571250961465761_n.jpg?stp=dst-jpg_e15&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xMDgweDEwODAuc2RyLmYyOTM1MCJ9&_nc_ht=scontent-lga3-2.cdninstagram.com&_nc_cat=101&_nc_ohc=trqcdBusNNIQ7kNvgGWGK2S&edm=AEhyXUkBAAAA&ccb=7-5&ig_cache_key=MzM1Mjg2MTkxMzUxOTUxMzM2OA%3D%3D.2-ccb7-5&oh=00_AYD5-4WflTA-EbJ1dmAjToxMMfVFOq6IFR_IqUfHNobg2A&oe=6692BCC0&_nc_sid=8f1549" alt="Instagram Post" style="width: 100%; height: auto; border-radius: 8px;"/>
             </div>
           </a>
         </div>
       </blockquote>
        `,
      },
      {
        id: 8,
        embedCode: `
       <blockquote class="instagram-media" data-instgrm-captioned data-instgrm-permalink="https://www.instagram.com/p/C8-QzcFx_Fg/?utm_source=ig_embed&amp;utm_campaign=loading" data-instgrm-version="14" style="background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; width:250px; height:355px; padding:0;">
         <div style="padding:16px;">
           <a href="https://www.instagram.com/p/C8-QzcFx_Fg/?utm_source=ig_embed&amp;utm_campaign=loading" style="background:#FFFFFF; line-height:0; padding:0; text-align:center; text-decoration:none; width:100%;" target="_blank">
             <div style="display: flex; flex-direction: column; align-items: center;">
               <img src="https://scontent-lga3-2.cdninstagram.com/v/t51.29350-15/440415366_414956677842121_4350571250961465761_n.jpg?stp=dst-jpg_e15&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xMDgweDEwODAuc2RyLmYyOTM1MCJ9&_nc_ht=scontent-lga3-2.cdninstagram.com&_nc_cat=101&_nc_ohc=trqcdBusNNIQ7kNvgGWGK2S&edm=AEhyXUkBAAAA&ccb=7-5&ig_cache_key=MzM1Mjg2MTkxMzUxOTUxMzM2OA%3D%3D.2-ccb7-5&oh=00_AYD5-4WflTA-EbJ1dmAjToxMMfVFOq6IFR_IqUfHNobg2A&oe=6692BCC0&_nc_sid=8f1549" alt="Instagram Post" style="width: 100%; height: auto; border-radius: 8px;"/>
             </div>
           </a>
         </div>
       </blockquote>
        `,
      },
      {
        id: 9,
        embedCode: `
       <blockquote class="instagram-media" data-instgrm-captioned data-instgrm-permalink="https://www.instagram.com/p/C8-QzcFx_Fg/?utm_source=ig_embed&amp;utm_campaign=loading" data-instgrm-version="14" style="background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; width:250px; height:355px; padding:0;">
         <div style="padding:16px;">
           <a href="https://www.instagram.com/p/C8-QzcFx_Fg/?utm_source=ig_embed&amp;utm_campaign=loading" style="background:#FFFFFF; line-height:0; padding:0; text-align:center; text-decoration:none; width:100%;" target="_blank">
             <div style="display: flex; flex-direction: column; align-items: center;">
               <img src="https://scontent-lga3-2.cdninstagram.com/v/t51.29350-15/440415366_414956677842121_4350571250961465761_n.jpg?stp=dst-jpg_e15&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xMDgweDEwODAuc2RyLmYyOTM1MCJ9&_nc_ht=scontent-lga3-2.cdninstagram.com&_nc_cat=101&_nc_ohc=trqcdBusNNIQ7kNvgGWGK2S&edm=AEhyXUkBAAAA&ccb=7-5&ig_cache_key=MzM1Mjg2MTkxMzUxOTUxMzM2OA%3D%3D.2-ccb7-5&oh=00_AYD5-4WflTA-EbJ1dmAjToxMMfVFOq6IFR_IqUfHNobg2A&oe=6692BCC0&_nc_sid=8f1549" alt="Instagram Post" style="width: 100%; height: auto; border-radius: 8px;"/>
             </div>
           </a>
         </div>
       </blockquote>
        `,
      },
  ];

  return (
    <div className=" grid grid-rows-3 grid-cols-3 place-items-center">
      {posts.map((post) => (
        <IgPost key={post.id} embedCode={post.embedCode} />
      ))}
    </div>
  );
};

export default IgList;

