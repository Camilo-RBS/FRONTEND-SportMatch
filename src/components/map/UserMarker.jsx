import { Marker, Popup } from 'react-leaflet';
import { currentUserIcon, otherUserIcon } from '../../utils/maplcons.js';
import { ADMIN_EMAIL } from '../../lib/constants';

export const UserMarker = ({ user, currentUserId, onChatClick }) => {
    // Don't render marker for admin user
    if (user.email === ADMIN_EMAIL) {
        return null;
    }

    const isCurrentUser = user._id === currentUserId;

    return (
        <Marker
            position={[
                user.location.coordinates[1],
                user.location.coordinates[0]
            ]}
            icon={isCurrentUser ? currentUserIcon : otherUserIcon}
        >
            <Popup>
                <div className="p-2">
                    <h3 className="font-semibold">{user.name}</h3>
                    <p className="text-sm capitalize">{user.role}</p>
                    {!isCurrentUser && (
                        <button
                            onClick={() => onChatClick(user._id)}
                            className="mt-2 bg-emerald-500 text-white px-4 py-1 rounded-md text-sm hover:bg-emerald-600 transition-colors"
                        >
                            Chatear
                        </button>
                    )}
                </div>
            </Popup>
        </Marker>
    );
};