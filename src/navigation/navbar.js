import React from 'react'

export default function Navbar(){
    return(
        <nav className="navbar" > 
            <h1> NextFM </h1>
            <div className="links">
                <a href='/' >  Agent </a>
                <a href='/unicasts' > Unicasts  </a>
                <a href='/conversations' > Conversations  </a>
                <a href='/logout' > login  </a>
            </div>
        </nav>
    )
}