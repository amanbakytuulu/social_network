import React from 'react'
import avatar2 from "../assets/images/avatar2.png"

function Notifications({ show }) {
    return (
        <div className={`notification ${show ? 'show' : ''}`} style={{ color: 'black' }}>
            <h4>Notifications</h4>
            <ul>
                <li>
                    <div className="image is-64x64">
                        <img src={avatar2} alt="Placeholder image" className="is-rounded" />
                    </div>
                    <div>
                        <div>
                            <a href="#"><strong>Adrian Pohn </strong> </a>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        </div>
                        <span>2 hours ago</span>
                    </div>
                </li>
                <li>
                    <div className="image is-64x64">
                        <img src={avatar2} alt="Placeholder image" className="is-rounded" />
                    </div>
                    <div>
                        <div>
                            <a href="#"><strong>Adrian Pohn </strong> </a>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        </div>
                        <span>2 hours ago</span>
                    </div>
                </li>
                <li>
                    <div className="image is-64x64">
                        <img src={avatar2} alt="Placeholder image" className="is-rounded" />
                    </div>
                    <div>
                        <div>
                            <a href="#"><strong>Adrian Pohn </strong> </a>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        </div>
                        <span >2 hours ago</span>
                    </div>
                </li>
                <li>
                    <div className="image is-64x64">
                        <img src={avatar2} alt="Placeholder image" className="is-rounded" />
                    </div>
                    <div>
                        <div>
                            <a href="#"><strong>Adrian Pohn </strong> </a>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        </div>
                        <span >2 hours ago</span>
                    </div>
                </li>
                <li>
                    <div className="image is-64x64">
                        <img src={avatar2} alt="Placeholder image" className="is-rounded" />
                    </div>
                    <div>
                        <div>
                            <a href="#"><strong>Adrian Pohn </strong> </a>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        </div>
                        <span >2 hours ago</span>
                    </div>
                </li>
                <li>
                    <div className="image is-64x64">
                        <img src={avatar2} alt="Placeholder image" className="is-rounded" />
                    </div>
                    <div>
                        <div>
                            <a href="#"><strong>Adrian Pohn </strong> </a>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        </div>
                        <span >2 hours ago</span>
                    </div>
                </li>
            </ul>
            <div className="has-text-centered p-2 notification__all">
                See all
            </div>
        </div>
    )
}

export default Notifications