import './Upload.scss';
import Image from '../../image/img.png';
import Map from '../../image/map.png';
import Friend from '../../image/friend.png';
import tong from '../../image/thanhtong.jpg';
// import { useContext } from 'react';
// import { AuthContext } from '../../context/authContext';

const Upload = () => {
    // const { currentUser } = useContext(AuthContext);
    return (
        <div className="share">
            <div className="container">
                <div className="top">
                    <img src={tong} alt="loi hinh anh" />
                    <input type="text" placeholder={`What's on your mind Tòng?`} />
                </div>
                <hr />
                <div className="bottom">
                    <div className="left">
                        <input type="file" id="file" style={{ display: 'none' }} />
                        <label htmlFor="file">
                            <div className="item">
                                <img src={Image} alt="" />
                                <span>Add Image</span>
                            </div>
                        </label>
                        <div className="item">
                            <img src={Map} alt="" />
                            <span>Add Place</span>
                        </div>
                        <div className="item">
                            <img src={Friend} alt="" />
                            <span>Tag Friends</span>
                        </div>
                    </div>
                    <div className="right">
                        <button>Share</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Upload;
