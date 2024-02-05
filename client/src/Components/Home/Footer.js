import React from "react";
import "../CSS/Footer.css"

export default function Footer() {
  return (
    <>
    
      <section className="footer">

        <div className="footer-row">

          <div className="footer-col">

            <h4>Info</h4>

            <ul className="links">

              <li>
                <a href="#">About Us</a>
              </li>
              <li>
                <a href="#">Contact</a>
              </li>
              <li>
                <a href="#">Blog</a>
              </li>

            </ul>

          </div>


          <div className="footer-col">

            <h4>Explore</h4>

            <ul className="links">

              <li>
                <a href="#">Featured Articles</a>
              </li>
              <li>
                <a href="#">Trending Topics</a>
              </li>
              <li>
                <a href="#">Categories</a>
              </li>

            </ul>

          </div>



          <div className="footer-col">

            <h4>Legal</h4>

            <ul className="links">

              <li>
                <a href="#">Terms of Service</a>
              </li>
              <li>
                <a href="#">Privacy Policy</a>
              </li>
              <li>
                <a href="#">Cookie Policy</a>
              </li>

            </ul>

          </div>


          <div className="footer-col">

            <h4>Newsletter</h4>

            <p>
              Stay informed with our blog updates. Subscribe for the latest
              articles, tips, and exclusive content.
            </p>

            <form action="#">
              <input type="text" placeholder="Your email" required="" />
              
            </form>
           
          </div>

        </div>

      </section>
      
    </>
  );
}
