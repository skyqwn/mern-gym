import React from "react";
import { Link } from "react-router-dom";

import { GalleryTypes } from "../../reducers/gallery/gallerySlice";

const GalleryBlock = ({ gallery }: { gallery: GalleryTypes }) => {
  return (
    <div>
      <Link key={gallery.id} to={`${gallery.id}`} state={{ gallery }}>
        <div key={gallery.id} className="text-red-500">
          <div>
            <img className="w-20 h-52" src={gallery.thumbnail} />
          </div>
          <div>{gallery.title}</div>
        </div>
      </Link>
    </div>
  );
};

export default GalleryBlock;
