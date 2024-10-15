
'use client'; 


import { SignUp } from "@clerk/nextjs";
export default function Page() {
  return (
    <>
      <div style={{ textAlign: 'center', margin: '20px' }}>
        <h1 className="responsive-heading">
          Something is Discussed Now!
        </h1>
        <img 
          src="https://raw.githubusercontent.com/awkward-py/Open-Source-Off-Topics/main/assets/images/logoo.png" 
          alt="OT-Discussion"
          className="responsive-image"
        />
      </div>
      <SignUp />;

      <style jsx>{`
         .responsive-heading {
          display: none; 
          font-size: 5rem;
          margin-bottom: 20px;
          background: linear-gradient(129deg, #8800ff 40%, red 80%);
          -webkit-background-clip: text;
          color: transparent;
           text-align: left; 
          margin-left: -70px;
          margin-right: 70px;
 font-family: 'Brush Script MT', cursive; 
        }

        .responsive-image {
          max-width: 100%;
          height: auto;
          margin-bottom: 10px;
        }

        @media (min-width: 768px) {
          .responsive-heading {
            display: block; /* Show the heading on larger screens */
          }
        }
      `}</style>
    </>
  );
}
