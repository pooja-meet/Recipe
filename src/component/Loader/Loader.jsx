import React from 'react'
import './loader.css'
export default function Loader({ loading, error }) {
    if (loading) {
        return <h2 className="message">Loading recipes...</h2>;
    }

    if (error) {
        return <h2 className="message">{error}</h2>;
    }
  
    return null;
}
