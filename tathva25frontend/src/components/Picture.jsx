

import React from 'react'

const Picture = ({imageSrc}) => {
  return (
    <div className="w-full">
      <div className="w-full">
        {/* Use the imageSrc prop here */}
        <ImgtoImage src={imageSrc} alt="robowars" />
      </div>
    </div>
  );
}

export default Picture