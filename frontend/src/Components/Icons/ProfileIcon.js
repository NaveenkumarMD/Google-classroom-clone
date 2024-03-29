import React from 'react';

const ProfileIcon = () => {
  return (
    <div>
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        width="200"
        height="200"
        fill="white">

        <title>Abstract user icon</title>

        <defs>
          <clipPath id="circular-border">
            <circle cx="300" cy="300" r="280" />
          </clipPath>
          <clipPath id="avoid-antialiasing-bugs">
            <rect width="100%" height="498" />
          </clipPath>
        </defs>

        <circle cx="300" cy="300" r="280" fill="black" clip-path="url(#avoid-antialiasing-bugs)" />
        <circle cx="300" cy="230" r="115" />
        <circle cx="300" cy="550" r="205" clip-path="url(#circular-border)" />
      </svg>
    </div>
  );
}

export default ProfileIcon;
