import React from 'react'
import AllBlogSection from './AllBlogSection'
import { jwtDecode } from "jwt-decode";
import Section1 from './Section1';

export default function Homepage() {

  
  let decoded = null;

  if (localStorage.getItem("token")) {
    decoded = jwtDecode(localStorage.getItem("token"));
  }


  return (
    
    <div>

      <div> 
        <Section1/>
        {decoded == null ? (
          <h3 className='plzloginfirst'></h3>
                  ) : (
              <AllBlogSection/>
            )}
      </div>
      
    </div>
  )
}
