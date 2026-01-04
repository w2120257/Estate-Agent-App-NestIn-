import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import propertiesData from '../data/Properties.json';
import './PropertyPage.css';

const PropertyPage = ({ onAddFav, onRemoveFav, favourites }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [property, setProperty] = useState(null);
    const [displayImage, setDisplayImage] = useState(null);

    useEffect(() => {
        const dataList = propertiesData.properties || propertiesData;
        const found = dataList.find(p => p.id === id);
        setProperty(found);

        if (found) {
            if (found.images && found.images.length > 0) {
                setDisplayImage(found.images[0]);
            } else if (found.picture) {
                setDisplayImage(found.picture);
            } else {
                setDisplayImage(found.floorPlan);
            }
        }
    }, [id]);

    if (!property) return <div className="loading">Loading...</div>;

    const isFav = favourites.some(fav => fav.id === property.id);

    const getImagePath = (path) => {
        if (!path) return '';

        if (path.includes('Estate-Agent-App-NestIn-')) {
            return path;
        }

        const cleanPath = path.startsWith('/') ? path : `/${path}`;
        return `/Estate-Agent-App-NestIn-${cleanPath}`;
    };

    const handleContactSubmit = (e) => {
        e.preventDefault();
        alert(`Enquiry sent for ${property.location}!`);
    };
    return (

        <div className="property-page-container">
            <button
                className="back-btn"
                onClick={() => navigate(-1)}
                style={{ marginBottom: '1rem', cursor: 'pointer', padding: '0.5rem 1rem' }}
            >
                ← Back to Search
            </button>

            {/* HERO SECTION */}
            <div className="hero-section">
                {displayImage ? (
                    <img

                        src={getImagePath(displayImage)}
                        alt="Main view"
                        className={`hero-img ${displayImage === property.floorPlan ? 'fit-mode' : 'fill-mode'}`}
                    />
                ) : (
                    <div className="placeholder-img">No Image Available</div>
                )}
            </div>

            {/* HEADER */}
            <div className="property-header">
                <div className="header-left">
                    <h1>{property.location}</h1>
                    <h2 className="price">£{property.price.toLocaleString()}</h2>
                </div>
                <button
                    onClick={() => isFav ? onRemoveFav(property.id) : onAddFav(property)}
                    className={`fav-action-btn ${isFav ? 'remove' : 'add'}`}
                >
                    {isFav ? (<><span>♥</span> Saved to Favourites</>) : (<><span>♡</span> Add to Favourites</>)}
                </button>
            </div>

            {/* TABS */}
            <Tabs className="property-tabs">
                <TabList>
                    <Tab>Description</Tab>
                    <Tab>Gallery ({property.images ? property.images.length : 0})</Tab>
                    <Tab>Floor Plan</Tab>
                    <Tab>Map</Tab>
                    <Tab>Contact</Tab>
                </TabList>

                <TabPanel>
                    <div className="tab-content">
                        <h3>Property Details</h3>
                        <p className="long-desc" dangerouslySetInnerHTML={{ __html: property.longDescription || property.description }}></p>
                        <ul className="specs-list">
                            <li><strong>Type:</strong> {property.type}</li>
                            <li><strong>Bedrooms:</strong> {property.bedrooms}</li>
                            <li><strong>Postcode:</strong> {property.postcode}</li>
                            <li><strong>Date Added:</strong> {property.dateAdded}</li>
                        </ul>
                    </div>
                </TabPanel>

                <TabPanel>
                    <div className="gallery-grid">
                        {property.images && property.images.map((img, index) => (
                            <img
                                key={index}

                                src={getImagePath(img)}
                                alt={`View ${index + 1}`}
                                onClick={() => setDisplayImage(img)}
                                className={`gallery-item ${displayImage === img ? 'selected' : ''}`}
                            />
                        ))}
                    </div>
                </TabPanel>

                <TabPanel>
                    <div className="tab-content center">
                        {property.floorPlan ? (
                            <>
                                <img

                                    src={getImagePath(property.floorPlan)}
                                    alt="Floorplan"
                                    className="floorplan-img clickable"
                                    onClick={() => setDisplayImage(property.floorPlan)}
                                    style={{ maxWidth: '100%', cursor: 'pointer' }}
                                />
                                <p className="hint-text">* Click floor plan to view it above</p>
                            </>
                        ) : (
                            <p>No floorplan available.</p>
                        )}
                    </div>
                </TabPanel>

                <TabPanel>
                    <div className="tab-content">
                        <iframe
                            width="100%"
                            height="400"
                            src={`https://maps.google.com/maps?q=${encodeURIComponent(property.location)}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                            frameBorder="0"
                            title="map"
                        ></iframe>
                    </div>
                </TabPanel>

                <TabPanel>
                    <div className="tab-content contact-section">
                        <h3>Arrange a Viewing</h3>
                        <div className="agent-info" style={{ marginBottom: '1rem', padding: '1rem', background: '#f5f5f5', borderRadius: '8px' }}>
                            <p><strong>Agent:</strong> Premium Estates</p>
                            <p><strong>Ref:</strong> {property.id}</p>
                            <p><strong>Phone:</strong> <a href="tel:01234567890">01234 567 890</a></p>
                        </div>
                        <form onSubmit={handleContactSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '400px' }}>
                            <input type="text" placeholder="Your Name" required style={{ padding: '8px' }} />
                            <input type="email" placeholder="Your Email" required style={{ padding: '8px' }} />
                            <input type="tel" placeholder="Your Phone Number" style={{ padding: '8px' }} />
                            <textarea rows="4" placeholder="I am interested in this property..." defaultValue={`Hi, I'm interested in ${property.location}.`} style={{ padding: '8px' }}></textarea>
                            <button type="submit" style={{ padding: '10px', backgroundColor: '#333', color: 'white', border: 'none', cursor: 'pointer' }}>Send Enquiry</button>
                        </form>
                    </div>
                </TabPanel>
            </Tabs>
        </div>
    );
};

export default PropertyPage;