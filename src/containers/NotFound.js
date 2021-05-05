import React from 'react'
import {Helmet} from 'react-helmet'
export default function NotFound() {
    return (
        <>
        <Helmet>
            <title>404 Not Found</title>
            <meta name="description" content="404 not found"/>

        </Helmet>
        <div className="notFound mt-80">
            <div className="notFound_container">
                <h1 className="notFound_container_h1">404</h1>
                <p className="notFound_container_p">Opps..! That page could not found</p>

            </div>
            
        </div>
        </>
    )
}
